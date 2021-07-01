import { connect } from 'react-redux'

import FeaturesTable from './FeaturesTable'

const mapStateToProps = (state = {}) => ({
  filteredBalances: state.ui.filteredBalances,
}) // eslint-disable-line
const mapDispatchToProps = dispatch => ({}) // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesTable)
