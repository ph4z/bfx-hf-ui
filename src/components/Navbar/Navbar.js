import React from 'react'
import { Icon } from 'react-fa'

import HFIcon from '../../ui/HFIcon'
import NavbarButton from '../NavbarButton'
import { propTypes, defaultProps } from './Navbar.props'
import './style.css'


// Icon names: https://fontawesome.com/v4.7/icons/

const items = [
  {
    route: '/',
    label: [<Icon name='terminal' key='icon' />, <p key='label'>Terminal</p>],
  },
  {
    route: '/data',
    label: [<Icon name='binoculars' key='icon' />, <p key='label'>Market Data</p>],
  },
  {
    route: '/santiment',
    label: [<Icon name='heart' key='icon' />, <p key='label'>Santiment</p>],
  },
  {
    route: '/strategy-editor',
    label: [<Icon name='edit' key='icon' />, <p key='label'>Strategies</p>],
  },
  {
    route: '/portfolio',
    label: [<Icon name='pie-chart' key='icon' />, <p key='label'>Portfolio</p>],
  },
  {
    route: '/yields',
    label: [<Icon name='percent' key='icon' />, <p key='label'>Farming</p>],
  },
  {
    route: '/reports',
    label: [<Icon name='bar-chart' key='icon' />, <p key='label'>Reports</p>],
  },
  {
    route: '/ico',
    label: [<Icon name='tags' key='icon' />, <p key='label'>ICOs</p>],
  },
  {
    route: '/settings',
    label: [<Icon name='cog' key='cog' />, <p key='label'>Settings</p>],
  },
]

export default class Navbar extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    return (
      <div className='hfui-navbar__wrapper'>
        <HFIcon />

        <ul className='hfui-navbar__main-links'>
          {
            items.map(val => (
              <li key={val.route}>
                <NavbarButton
                  route={val.route}
                  label={val.label}
                />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
