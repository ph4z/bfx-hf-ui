import { connect } from 'react-redux'

import UIActions from '../../redux/actions/ui'

import {
  getLayouts, getActiveMarket, getActiveExchange,
} from '../../redux/selectors/ui'

import Portfolio from './Portfolio'

const mapStateToProps = (state = {}) => ({
  layouts: getLayouts(state),
  activeMarket: getActiveMarket(state),
  exID: getActiveExchange(state),
})

const mapDispatchToProps = dispatch => ({
  saveLayout: (layout, id) => {
    dispatch(UIActions.saveLayout(layout, id))
  },

  createLayout: (id) => {
    dispatch(UIActions.createLayout(id))
  },

  deleteLayout: (id) => {
    dispatch(UIActions.deleteLayout(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
