import React from 'react'
import _capitalize from 'lodash/capitalize'

import WithdrawFormModal from '../../WithdrawFormModal'
import { propTypes, defaultProps } from './UnconfiguredModal.props'

export default class UnconfiguredModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { onClick, exID } = this.props

    return (
      <WithdrawFormModal
        title='NOT CONFIGURED'
        titleColor='#f05359'
        icon='icon-api'
        onClick={onClick}
        content={[
          <p key='a' className='underline'>
            Submit API keys for
            {` ${_capitalize(exID)}`}
          </p>,
        ]}
      />
    )
  }
}