import PropTypes from 'prop-types'

export const propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
  layoutDef: PropTypes.object.isRequired,
  chartProps: PropTypes.object,
  marketcapProps: PropTypes.object,
  heatmapProps: PropTypes.object,
  newsflowProps: PropTypes.object,
  bookProps: PropTypes.object,
  tradesProps: PropTypes.object,
  orderFormProps: PropTypes.object,
  ordersProps: PropTypes.object,
  onRemoveComponent: PropTypes.func.isRequired,
  layoutID: PropTypes.string.isRequired,
  darkPanels: PropTypes.bool,
}

export const defaultProps = {
  chartProps: {},
  marketcapProps: {},
  heatmapProps: {},
  newsflowProps: {},
  bookProps: {},
  tradesProps: {},
  orderFormProps: {},
  ordersProps: {},
  darkPanels: false,
}
