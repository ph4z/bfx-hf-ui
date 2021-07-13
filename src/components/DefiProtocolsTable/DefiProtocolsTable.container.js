import { connect } from 'react-redux'

import DefiProtocolsTable from './DefiProtocolsTable'
import { getDefiProtocols } from '../../redux/selectors/meta'

const mapStateToProps = (state = {}, ownProps = {}) => ({
  allProtocols: getDefiProtocols(state),
})

const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(DefiProtocolsTable)
