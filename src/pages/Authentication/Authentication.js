import React from 'react'

// import HFIcon from '../../ui/HFIcon'
import FHGif from '../../ui/Icons/FHGif.gif'
import AuthenticationInitForm from './AuthenticationInitForm'
import AuthenticationUnlockForm from './AuthenticationUnlockForm'
import AuthenticationConnectingForm from './AuthenticationConnectingForm'
import { propTypes, defaultProps } from './Authentication.props'
import { version } from '../../../package.json'

import './style.css'

export default class Authentication extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      wsConnected, configured, onUnlock, onInit, onReset,
    } = this.props

    return (
      <div className='hfui-authenticationpage__wrapper'>
        <div className='hfui-authenticationpage__inner'>
          <div className='hfui-authenticationpage__inner-left'>
            <img src={FHGif} alt='Loading...' />
            <div className='hfui-authenticationpage__inner-left-version-container'>
              <div className='hfui-authenticationpage__inner-left-version'>
                <h6>Crafted by the Money Maker Boy Army.</h6>
                <p>
                  v
                  {version}
                </p>
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
            />
          )}
        </div>
      </div>
    )
  }
}
