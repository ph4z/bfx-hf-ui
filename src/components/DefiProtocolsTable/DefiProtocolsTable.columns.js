import React from 'react'
import BigN from 'bignumber.js'
import { prepareAmount } from 'bfx-api-node-util'
import PLNumber from '../../ui/PLNumber'

export default [{
  label: 'Name',
  dataKey: 'name',
  width: 100,
  cellRenderer: ({ rowData = {} }) => rowData.name
}, {
  label: 'Symbol',
  dataKey: 'symbol',
  width: 80,
  cellRenderer: ({ rowData = {} }) => rowData.symbol
}, {
  label: 'Chain',
  dataKey: 'chain',
  width: 100,
  cellRenderer: ({ rowData = {} }) => rowData.chain
}, {
  label: '1H Change',
  dataKey: 'change_1h',
  width: 80,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.change_1h}
      prepareFunc={() => new BigN(rowData.change_1h).toFixed(2).toString(10)}
    />
  ),
}, {
  label: '1D Change',
  dataKey: 'change_1d',
  width: 80,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.change_1d}
      prepareFunc={() => new BigN(rowData.change_1d).toFixed(2).toString(10)}
    />
  ),
}, {
  label: '1W Change',
  dataKey: 'change_1w',
  width: 80,
  cellRenderer: ({ rowData = {} }) => ( // eslint-disable-line
    <PLNumber
      value={rowData.change_7d}
      prepareFunc={() => new BigN(rowData.change_7d).toFixed(2).toString(10)}
    />
  ),
}, {
  label: 'TVL',
  dataKey: 'tvl',
  width: 120,
  cellRenderer: ({ rowData = {} }) => rowData.tvl.toFixed(2)
}]
