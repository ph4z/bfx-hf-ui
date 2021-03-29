import { connect } from 'react-redux'

import LiveStrategyExecutor from './LiveStrategyExecutor'
import { getMarkets } from '../../redux/selectors/meta'

const mapStateToProps = (state = {}) => ({
  allMarkets: getMarkets(state),
})

const mapDispatchToProps = () => ({
  dsExecuteLiveStrategy: () => {
    // TODO execute
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveStrategyExecutor)
