import React from 'react'
import _capitalize from 'lodash/capitalize'
import _isEqual from 'lodash/isEqual'
import ClassNames from 'classnames'

import {
  renderLayout,
  processFieldData,
  marketToQuoteBase,
  defaultDataForLayout,
  COMPONENTS_FOR_ID,
} from './TransferForm.helpers'

import nearestMarket from '../../util/nearest_market'

import Panel from '../../ui/Panel'
import Select from '../../ui/Select'
import Scrollbars from '../../ui/Scrollbars'
import MarketSelect from '../MarketSelect'

import UnconfiguredModal from './Modals/UnconfiguredModal'
import SubmitAPIKeysModal from './Modals/SubmitAPIKeysModal'
import Transfer from '../../transfers'

import { propTypes, defaultProps } from './TransferForm.props'
import './style.css'

const HELP_ICON_DISABLED = true // not in design
const form = Object.values(Transfer).map(uiDef => uiDef())

export default class TransferForm extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    fieldData: {},
    validationErrors: {},
    creationError: null,
    helpOpen: false,
    configureModalOpen: false,
  }

  constructor(props) {
    super(props)

    const { savedState = {}, activeMarket, activeExchange } = props
    const {
      currentExchange = activeExchange, currentMarket = activeMarket,
      exchangeDirty, marketDirty,
    } = savedState

    this.state = {
      ...this.state,

      currentMarket,
      currentExchange,
      exchangeDirty,
      marketDirty,

      fieldData: {},
      currentLayout: null,
    }

    this.onChangeExchange = this.onChangeExchange.bind(this)
    this.onChangeMarket = this.onChangeMarket.bind(this)
    this.onFieldChange = this.onFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onToggleHelp = this.onToggleHelp.bind(this)
    this.onToggleConfigureModal = this.onToggleConfigureModal.bind(this)
    this.onSubmitAPIKeys = this.onSubmitAPIKeys.bind(this)
    this.onUnlock = this.onUnlock.bind(this)
  }

  componentDidMount() {
    const layout = this.createLayout()
    
    this.setState(() => ({
      currentLayout: layout,
      fieldData: defaultDataForLayout(layout),
    }))
  }

  createLayout = () => {
    const { currentExchange, currentMarket } = this.state
    const { allMarkets } = this.props
    let allWallets = {}
    // if(currentExchange === 'binance_futures' || currentExchange === 'binance_coins' || currentExchange === 'binance') {
      // currentExchange = 'binance'
      // allWallets = {
      //  binance: 'Spot',
      //  binance_margin: 'Margin',
      //  binance_futures: 'Binance Futures',
      //  binance_coins: 'Binance Coins',
      // }
    // } else {
    allWallets = {
       spot: 'Spot',
       margin: 'Margin',
       future: 'Futures',
    }
    //}
    //delete allExchanges[currentExchange]
    const markets = allMarkets[currentExchange] || []
    form[0].fields.exchange.default = currentExchange.toUpperCase()
    form[0].fields.toWallet.options = allWallets
    form[0].fields.fromWallet.options = allWallets
    form[0].fields.symbol.default = currentMarket.base
    Object.values(markets).forEach(market => (
       form[0].fields.symbol.options[market.base] = market.base))
    return form[0]
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(_isEqual(nextProps, this.props)) || !(_isEqual(this.state, nextState))
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { activeExchange, activeMarket } = nextProps
    const {
      marketDirty, currentMarket, exchangeDirty, currentExchange,
    } = prevState

    if ((marketDirty || exchangeDirty) || (
      activeMarket === currentMarket && activeExchange === currentExchange
    )) {
      return {}
    }

    return {
      currentExchange: activeExchange,
      currentMarket: activeMarket,
    }
  }

  onChangeMarket(market) {
    const { currentMarket } = this.state

    if (market.restID === currentMarket.restID) {
      return
    }

    this.setState(() => ({
      currentMarket: market,
      marketDirty: true,
    }))

    this.deferSaveState()
  }

  onUnlock({ password }) {
    const { unlockAPIKeys } = this.props
    const { currentExchange } = this.state

    unlockAPIKeys({ password, exID: currentExchange })
  }

  onSubmitAPIKeys({ apiKey, apiSecret, password }) {
    const { submitAPIKeys, authToken } = this.props
    const { currentExchange } = this.state

    submitAPIKeys({
      authToken,
      exID: currentExchange,
      apiKey,
      apiSecret,
      password,
    })
  }

  onToggleHelp() {
    this.setState(({ helpOpen }) => ({
      helpOpen: !helpOpen,
    }))
  }

  onToggleConfigureModal() {
    this.setState(({ configureModalOpen }) => ({
      configureModalOpen: !configureModalOpen,
    }))
  }

  onFieldChange(fieldName, value) {
    this.setState(({
      fieldData,
      currentLayout,
      validationErrors,
    }) => {
      const { fields = {} } = currentLayout
      const field = fields[fieldName] || {}
      const { component } = field
      const C = COMPONENTS_FOR_ID[component]
      const validationError = (C && C.validateValue)
        ? C.validateValue(value)
        : null

      return {
        creationError: null,

        fieldData: {
          ...fieldData,
          [fieldName]: value,
        },

        validationErrors: {
          ...validationErrors,
          [fieldName]: validationError,
        },
      }
    })
  }

  onSubmit(action) {
    const { currentLayout, fieldData, currentExchange } = this.state

    const { submitTransfer, authToken } = this.props
    const { generateTransfer } = currentLayout
    const data = processFieldData({
      layout: currentLayout,
      fieldData,
      action,
    })

    try {
      const packet = generateTransfer(data)
      submitTransfer({
        exID: currentExchange,
        authToken,
        packet,
      })
    } catch (e) {
      this.setState(() => ({ creationError: e.message }))
    }
  }

  onChangeExchange(option) {
    const { value: exchange } = option
    const { currentExchange, currentMarket } = this.state
    const { allMarkets } = this.props

    if (exchange === currentExchange) {
      return
    }

    const markets = allMarkets[exchange] || []
    const newMarket = nearestMarket(currentMarket, markets)

    this.setState(() => ({
      currentExchange: exchange,
      currentMarket: newMarket,
      exchangeDirty: true,
      marketDirty: true,
    }))

    this.deferSaveState()
  }

  deferSaveState() {
    setTimeout(() => {
      this.saveState()
    }, 0)
  }

  saveState() {
    const { saveState, layoutID, layoutI } = this.props
    const {
      currentExchange, currentMarket, exchangeDirty, marketDirty,
    } = this.state

    saveState(layoutID, layoutI, {
      currentExchange,
      currentMarket,
      exchangeDirty,
      marketDirty,
    })
  }

  renderExchangeDropdown() {
    const { exchangeDirty, currentExchange } = this.state
    const { exchanges, canChangeExchange } = this.props

    return (
      <Select
        key='exchange-dropdown'
        className={{ yellow: exchangeDirty }}
        onChange={this.onChangeExchange}
        disabled={!canChangeExchange}
        value={{
          label: _capitalize(currentExchange),
          value: currentExchange,
        }}
        options={exchanges.map(ex => ({
          label: _capitalize(ex),
          value: ex,
        }))}
      />
    )
  }

  renderMarketDropdown() {
    const { currentExchange, marketDirty, currentMarket } = this.state
    const { allMarkets, canChangeMarket } = this.props

    const markets = allMarkets[currentExchange] || []

    return (
      <MarketSelect
        key='market-dropdown'
        disabled={!canChangeMarket}
        className={{ yellow: marketDirty }}
        onChange={this.onChangeMarket}
        value={currentMarket}
        markets={markets}
      />
    )
  }

  render() {
    const { onRemove, apiClientStates, apiCredentials, moveable, removeable, showExchange, showMarket } = this.props

    const {
      fieldData, validationErrors, creationError, currentLayout,
      helpOpen, configureModalOpen, currentExchange, currentMarket,
    } = this.state

    const apiClientState = apiClientStates[currentExchange]
    const apiClientConnected = apiClientState === 2
    const apiClientConnecting = apiClientState === 1
    const apiClientDisconnected = !apiClientState
    const apiClientConfigured = !!(apiCredentials || {})[currentExchange]
    const renderData = marketToQuoteBase(currentMarket)

    // NOTE: Margin trading disabled on Binance
    return (
      <Panel
        key='execute-order'
        label='TRANSFER PANEL'
        className='hfui-orderform__panel'
        moveable={moveable}
        removeable={removeable}
        onRemove={onRemove}
        headerComponents={[
          showExchange && this.renderExchangeDropdown(),
          showMarket && this.renderMarketDropdown(),
        ]}
        extraIcons={(
          !HELP_ICON_DISABLED && apiClientConnected && currentLayout && currentLayout.customHelp && (
            <i
              role='button'
              tabIndex={0}
              onClick={this.onToggleHelp}
              className={ClassNames('fas fa-question', {
                yellow: helpOpen,
              })}
            />
          )
        )}
      >
        <div key='orderform-wrapper' className='hfui-orderform__wrapper'>
          {[
            apiClientDisconnected && !apiClientConfigured && !configureModalOpen && (
              <UnconfiguredModal
                key='unconfigured'
                exID={currentExchange}
                onClick={this.onToggleConfigureModal}
              />
            ),

            !apiClientConnected && !apiClientConfigured && configureModalOpen && (
              <SubmitAPIKeysModal
                key='submit-api-keys'
                onClose={this.onToggleConfigureModal}
                onSubmit={this.onSubmitAPIKeys}
                exID={currentExchange}
                apiClientConnecting={apiClientConnecting}
              />
            ),
          ]}

          {helpOpen && currentLayout && currentLayout.customHelp && (
            <div key='overlay-wrapper' className='hfui-orderform__overlay-wrapper'>
              <Scrollbars>
                <div className='hfui-orderform__help-inner'>
                  <p className='hfui-orderform__help-title'>
                    <span className='prefix'>HELP:</span>
                    {currentLayout.label}
                    <i
                      role='button'
                      tabIndex={0}
                      onClick={this.onToggleHelp}
                      className='far fa-times-circle'
                    />
                  </p>
                  <p className='hfui-orderform__help-content'>
                    {currentLayout.customHelp}
                  </p>
                </div>
              </Scrollbars>
            </div>
          )}

          {currentLayout && [
            <div className='hfui-orderform__layout-label' key='layout-label'>
              <div className='hfui-orderform__layout-label-inner'>
                <i className={`icon-${currentLayout.uiIcon}`} />
                <p>{currentLayout.label}</p>
              </div>
            </div>,

            renderLayout({
              onSubmit: this.onSubmit,
              onFieldChange: this.onFieldChange,
              layout: currentLayout,
              validationErrors,
              renderData,
              fieldData: {
                ...fieldData,
              },
            }),

            creationError && (
              <div className='hfui-orderform__creation-error' key='of-error'>
                <p>{creationError}</p>
              </div>
            ),
          ]}
        </div>
      </Panel>
    )
  }
}
