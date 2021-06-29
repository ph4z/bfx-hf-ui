import React from 'react'

import { Icon } from 'react-fa'
import HFIcon from '../../ui/HFIcon'
import DiscordIcon from '../../discord.svg'
import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import AuthenticationConnectingForm from './AuthenticationConnectingForm'
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
            <HFIcon />
            <div className='hfui-authenticationpage__inner-left-version-container'>
              <div className='hfui-authenticationpage__inner-left-version'>
                <h6>Crafted by Insolence Lab</h6>
                <Icon name='twitter' key='icon' />
                <span>&nbsp;&nbsp;</span>
                <Icon name='youtube-play' key='icon' />
                <span>&nbsp;&nbsp;</span>
                <Icon name='linkedin' key='icon' />
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
