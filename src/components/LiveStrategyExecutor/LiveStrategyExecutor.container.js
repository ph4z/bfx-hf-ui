import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import LiveStrategyExecutor from './LiveStrategyExecutor'
import { getMarkets } from '../../redux/selectors/meta'

const mapStateToProps = (state = {}) => ({
  allMarkets: getMarkets(state),
})

const mapDispatchToProps = dispatch => ({
  dsExecuteLiveStrategy: (exchange, symbol, tf, strategy) => {
  // dsExecuteLiveStrategy: () => {
    // TODO execute
    dispatch(WSActions.send([
      'exec.live', [exchange, 0, 0, symbol, tf, true, true, true, strategy],
    ]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveStrategyExecutor)
