import React from 'react'

import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'
import { propTypes, defaultProps } from './DefiControlToolbar.props'
import './style.css'

export default class DefiControlToolbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      layouts, tradingEnabled, onAddLayout, onDeleteLayout, onSaveLayout,
      onAddComponent, activeLayout, layoutDirty, onChangeLayout, activeLayoutID,
    } = this.props


    return (
      <div className='hfui-layoutcontroltoolbar__wrapper'>

        <Button
          green
          label={[
            <p key='text'>Protocols</p>,
          ]}
        />

        <Button
          green
          label={[
            <p key='text'>Holdings</p>,
          ]}
        />

      </div>
    )
  }
}
