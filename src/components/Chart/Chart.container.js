import { connect } from 'react-redux'

import { getActiveExchange, getActiveMarket } from '../../redux/selectors/ui'

import Chart from './Chart'

const mapStateToProps = (state = {}) => {
  return {
    activeExchange: getActiveExchange(state),
    activeMarket: getActiveMarket(state),
  }
}

const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
