import { connect } from 'react-redux'

import WSActions from '../../redux/actions/ws'
import { getBacktestState, getBacktestData, getBacktestResults, getStrategies, getBTStrategies } from '../../redux/selectors/ws'
import { getMarkets } from '../../redux/selectors/meta'
import { getStrategyId } from '../../redux/selectors/ui'

import Backtester from './Backtester'

const mapStateToProps = (state = {}) => ({
  backtest: getBacktestState(state),
  backtestData: getBacktestData(state),
  allMarkets: getMarkets(state),
  backtestResults: getBacktestResults(state),
  strategyId: getStrategyId(state),
  strategies: getStrategies(state),
  bt_strategies: getBTStrategies(state),
  backtestOptions: state.ws.backtest.backtestOptions || {},
})

const mapDispatchToProps = dispatch => ({
  dsExecuteBacktest: (exchange, from, to, symbol, tf, candles, trades, strategy) => {
    dispatch(WSActions.purgeBacktestData())
    dispatch(WSActions.send([
      'exec.str', [exchange, from, to, symbol, tf, candles, trades, true, strategy],
    ]))
    dispatch(WSActions.setBacktestLoading())
  },
  dsExecuteBacktestBacktrader: (exchange, from, to, symbol, tf, candles, trades, strategy) => {
    dispatch(WSActions.purgeBacktestData())
    dispatch(WSActions.send([
      'exec.bt', [exchange, from, to, symbol, tf, candles, trades, true, strategy],
    ]))
    dispatch(WSActions.setBacktestLoading())
  },
  setBacktestOptions: options => {
    dispatch(WSActions.setBacktestOptions(options))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Backtester)
