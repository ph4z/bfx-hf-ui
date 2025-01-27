import { connect } from 'react-redux'
import WSActions from '../../redux/actions/ws'
import GAActions from '../../redux/actions/google_analytics'
import { getAuthToken } from '../../redux/selectors/ws'
import { getActiveMarket, getActiveExchange, getStrategyId } from '../../redux/selectors/ui'

import StrategyEditor from './StrategyEditor'

const mapStateToProps = (state = {}) => ({
  activeExchange: getActiveExchange(state),
  activeMarket: getActiveMarket(state),
  authToken: getAuthToken(state),
  strategyId: getStrategyId(state),
  strategyContent: state.ui.content,
})

const mapDispatchToProps = dispatch => ({
  onSave: (authToken, strategy = {}) => {
    dispatch(WSActions.send(['strategy.save', authToken, strategy]))
  },
  onImport: (authToken, strategy = {}) => {
    dispatch(WSActions.send(['strategy.import', authToken, strategy]))
  },
  onSaveBT: (authToken, strategy = {}) => {
    dispatch(WSActions.send(['strategy.savebt', authToken, strategy]))
  },
  onImportBT: (authToken, strategy = {}) => {
    dispatch(WSActions.send(['strategy.importbt', authToken, strategy]))
  },
  onRemove: (authToken, id) => {
    dispatch(WSActions.send(['strategy.remove', authToken, id]))
  },
  onRemoveBT: (authToken, id) => {
    dispatch(WSActions.send(['strategy.removebt', authToken, id]))
  },
  gaCreateStrategy: () => {
    dispatch(GAActions.createStrategy())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StrategyEditor)
