import PropTypes from 'prop-types'

export const propTypes = {
  candleData: PropTypes.object.isRequired,
  activeMarket: PropTypes.object.isRequired,
  activeExchange: PropTypes.string.isRequired,
}

export const defaultProps = {}
