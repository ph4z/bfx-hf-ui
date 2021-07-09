import React from 'react'

import { Icon } from 'react-fa'
import Button from '../../ui/Button'
//import HFIcon from '../../ui/HFIcon'
import DiscordIcon from '../../discord.svg'
//import background from './ui/ontheroad.jpg'
import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import AuthenticationConnectingForm from './AuthenticationConnectingForm'
//import FeaturesTable from '../../components/FeaturesTable'
import { propTypes, defaultProps } from './Authentication.props'
//import { version } from '../../../package.json'

import './style.css'

export default class Authentication extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      wsConnected, configured, onUnlock, onInit, onReset, onRegister
    } = this.props

    return (
      <div className='hfui-authenticationpage__wrapper'>
        <div className='hfui-authenticationpage__inner'>
          <div className='hfui-authenticationpage__inner-left'>
            <table>
              <tbody>
                <tr>
                  <th>Free</th>
                  <th>Premuim</th>
                </tr>
                <tr>
                  <td>Trading Terminal</td>
                  <td>Trading Terminal</td>
                </tr>
                <tr>
                  <td>Strategy Backtest</td>
                  <td>Strategy Backtest</td>
                </tr>
                <tr>
                  <td>Multi Exchange</td>
                  <td>Multi Exchange</td>
                </tr>
                <tr>
                  <td> - </td>
                  <td>Strategy Live Exec</td>
                </tr>
                <tr>
                  <td> - </td>
                  <td>Defi Terminal</td>
                </tr>
                <tr>
                  <td> - </td>
                  <td>Algo orders</td>
                </tr>
                <tr>
                  <td>
                    <Button
                      // onClick={return false}
                      label='0$ / month'
                      green
                    />
                  </td>
                  <td>
                    <Button
                      // onClick={return false}
                      label='99$ / month'
                      green
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='hfui-authenticationpage__inner-left-version-container'>
              <div className='hfui-authenticationpage__inner-left-version'>
                <h6>Crafted by Insolence Lab</h6>
                <Icon name='twitter' key='twitter' />
                <span>&nbsp;&nbsp;</span>
                <Icon name='youtube-play' key='youtube-play' />
                <span>&nbsp;&nbsp;</span>
                <Icon name='linkedin' key='linkedin' />
                <span>&nbsp;&nbsp;</span>
                <img src={DiscordIcon} alt='discord'/>
              </div>
            </div>
          </div>

          {!wsConnected ? (
            <AuthenticationConnectingForm />
          ) : configured ? (
            <AuthenticationUnlockForm
              onUnlock={onUnlock}
              onReset={onReset}
            />
          ) : (
            <AuthenticationInitForm
              onInit={onInit}
              onRegister={onRegister}
            />
          )}
        </div>
      </div>
    )
  }
}
