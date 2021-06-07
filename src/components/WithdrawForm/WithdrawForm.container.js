import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Debug from 'debug'

import WithdrawForm from './WithdrawForm'
import UIActions from '../../redux/actions/ui'
import WSActions from '../../redux/actions/ws'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import {
  getAPIClientStates, getAuthToken, getAPICredentials,
} from '../../redux/selectors/ws'

import {
  getComponentState, getActiveExchange, getActiveMarket,
} from '../../redux/selectors/ui'

const debug = Debug('hfui:c:withdraw-form')

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps

  return {
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
    exchanges: getExchanges(state),
    apiClientStates: getAPIClientStates(state),
    allMarkets: getMarkets(state),
    savedState: getComponentState(state, layoutID, 'withdrawform', id),
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

  submitWithdraw: ({ authToken, exID, packet }) => {
    debug('submitting withdraw %j', packet)

    dispatch(WSActions.send(['withdraw.submit', authToken, exID, packet]))
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

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawForm)
