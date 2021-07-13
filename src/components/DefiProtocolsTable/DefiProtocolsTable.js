import React from 'react'
import _take from 'lodash/take'
import _isEqual from 'lodash/isEqual'

import Table from '../../ui/Table'
import DefiProtocolsTableColumns from './DefiProtocolsTable.columns'
import { propTypes, defaultProps } from './DefiProtocolsTable.props'
import './style.css'

const DISPLAY_LIMIT = 50

export default class DefiProtocolsTable extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  shouldComponentUpdate(nextProps) {
    let flag = false
    const { allProtocols } = this.props
    if (allProtocols.length !== nextProps.allProtocols.length) {
      return true
    }
    allProtocols.forEach((protocol, index) => {
      if (_isEqual(protocol, nextProps.allProtocols[index])) {
        flag = true
      }
    })

    return flag
  }
  render() {
    const { allProtocols } = this.props
    const limitedProtocols = _take(allProtocols, DISPLAY_LIMIT)

    return (
      <Table
      	width='70%'
      	height='100%'
        data={limitedProtocols}
        columns={DefiProtocolsTableColumns}
        onRowClick={this.onRowClick}
        defaultSortBy='tvl'
        defaultSortDirection='DESC'
      />
    )
  }
}
