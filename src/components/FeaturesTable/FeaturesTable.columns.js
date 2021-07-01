import _capitalize from 'lodash/capitalize'
import { prepareAmount } from 'bfx-api-node-util'

export default () => [{
  label: 'Free',
  dataKey: 'exID',
  width: 120,
  cellRenderer: ({ rowData = {} }) => _capitalize(rowData.exID),
}, {
  label: 'Premuim',
  dataKey: 'available',
  width: 120,
  cellRenderer: ({ rowData = {} }) => prepareAmount(rowData.available),
}]
