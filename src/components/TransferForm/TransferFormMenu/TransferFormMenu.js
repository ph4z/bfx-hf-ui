import React from 'react'
import { propTypes, defaultProps } from './TransferFormMenu.props'
import './style.css'

export default class TransferFormMenu extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { atomicOrderTypes, algoOrderTypes, onSelect } = this.props

    return (
      <div className='hfui-transferformmenu__wrapper'>
        <h4>Transfer</h4>
        <ul>
          {atomicOrderTypes.map(type => (
            <li
              key={type.label}
              onClick={() => onSelect(type)}
            >
              <i className={`icon-${type.uiIcon}`} />
              <div>
                <p>{type.label}</p>
              </div>
            </li>
          ))}
        </ul>

        <h4>Algorithmic Transfer</h4>
        <ul>
          {algoOrderTypes.map(type => (
            <li
              key={type.label}
              onClick={() => onSelect(type)}
            >
              <i className={`icon-${type.uiIcon}`} />
              <div>
                <p>{type.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
