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

    dispatch(WSActions.send(['transfer.submit', authToken, exID, packet]))
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
