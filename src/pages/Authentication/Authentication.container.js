import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import UIActions from '../../redux/actions/ui'
import { getSocket, getAuthConfigured } from '../../redux/selectors/ws'
import Authentication from './Authentication'

const mapStateToProps = (state = {}) => {
  const socket = getSocket(state)
  const { status: wsStatus } = socket

  return {
    wsConnected: wsStatus === 'online',
    configured: getAuthConfigured(state),
  }
}

const mapDispatchToProps = dispatch => ({ // eslint-disable-line
  onInit: (password) => {
    dispatch(WSActions.initAuth(password))
    dispatch(UIActions.firstLogin())
  },

  onUnlock: (username, password) => {
    dispatch(WSActions.auth(username, password))
  },

  onReset: () => {
    dispatch(WSActions.resetAuth())
  },

  onRegister: () => {
    dispatch(WSActions.registerAuth())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
