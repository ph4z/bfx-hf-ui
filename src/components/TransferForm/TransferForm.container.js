import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Debug from 'debug'

import TransferForm from './TransferForm'
import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import {
  getAPIClientStates, getAuthToken, getAPICredentials,
} from '../../redux/selectors/ws'

import {
  getComponentState, getActiveExchange, getActiveMarket,
} from '../../redux/selectors/ui'

const debug = Debug('hfui:c:transfer-form')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps

  return {
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    apiClientStates: getAPIClientStates(state),
    allMarkets: getMarkets(state),
    savedState: getComponentState(state, layoutID, 'transferform', id),
    authToken: getAuthToken(state),
    apiCredentials: getAPICredentials(state),
  }
}

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },

  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },

  submitTransfer: ({ authToken, exID, packet }) => {
    debug('submitting transfer %j', packet)

    dispatch(WSActions.send(['transfer.submit', authToken, exID, {
      symbol: packet.symbol[exID === 'bitfinex' ? 'w' : 'r'],
      ...packet,
    }]))
  },

  submitAlgoTransfer: ({
    authToken, exID, id, market, context, data,
  }) => {
    debug('submitting algo transfer %s on %s [%s]', id, market.uiID, context)

    dispatch(WSActions.send(['algo_transfer.submit', authToken, exID, id, {
      ...data,
      _symbol: exID === 'bitfinex' ? market.wsID : market.restID,
      _margin: context === 'm',
      _futures: context === 'f',
    }]))
  },

  submitAPIKeys: ({
    exID, authToken, apiKey, apiSecret,
  }) => {
    dispatch(WSActions.send([
      'api_credentials.save',
      authToken,
      exID,
      apiKey,
      apiSecret,
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferForm)
