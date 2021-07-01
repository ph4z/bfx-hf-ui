import React from 'react'
import FeaturesTableColumns from './FeaturesTable.columns'

import { propTypes, defaultProps } from './FeaturesTable.props'
import Table from '../../ui/Table'

import './style.css'

export default class FeaturesTable extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    //const { filteredBalances: balances = [], hideZeroBalances } = this.props

    //const filteredBalances = hideZeroBalances
    //  ? balances.filter(b => +b.balance > 0)
    //  : balances

    return (
      <Table
        //data={filteredBalances}
        data={['data1', 'data2']}
        columns={FeaturesTableColumns()}
        //defaultSortBy='mts'
        //defaultSortDirection='ASC'
      />
    )
  }
}
