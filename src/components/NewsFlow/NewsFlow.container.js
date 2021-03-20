import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'
import { getExchanges, getMarkets } from '../../redux/selectors/meta'
import {
  getComponentState, getActiveExchange, getActiveMarket,
} from '../../redux/selectors/ui'

import NewsFlow from './NewsFlow'

const mapStateToProps = (state = {}, ownProps = {}) => {
  const { layoutID, layoutI: id } = ownProps
  const { ui = {} } = state
  const { settings = {} } = ui
  const { chart } = settings
  const activeExchange = ownProps.activeExchange || getActiveExchange(state)

  return {
    activeExchange,
    chart,
    exchanges: getExchanges(state),
    savedState: getComponentState(state, layoutID, 'newsflow', id),
    activeMarket: getActiveMarket(state),
    allMarkets: getMarkets(state),
  }
}

const mapDispatchToProps = dispatch => ({
  saveState: (layoutID, componentID, state) => {
    dispatch(UIActions.saveComponentState({
      state,
      layoutID,
      componentID,
    }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NewsFlow)
