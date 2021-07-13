import PropTypes from 'prop-types'

export const propTypes = {
  layouts: PropTypes.object,
  tradingEnabled: PropTypes.bool,
  layoutDirty: PropTypes.bool,
  activeLayout: PropTypes.object,
  onAddLayout: PropTypes.func,
  onDeleteLayout: PropTypes.func,
  onSaveLayout: PropTypes.func,
  onAddComponent: PropTypes.func,
  onChangeLayout: PropTypes.func,
}

export const defaultProps = {
  layouts: {},
  tradingEnabled: false,
  layoutDirty: false,
}
