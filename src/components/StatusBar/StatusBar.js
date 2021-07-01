import React from 'react'
import ClassNames from 'classnames'
// import NavbarButton from '../NavbarButton'
// import MANIFEST from '../../../package.json'
import BinanceLogo from '../../ui/binance.png'
import BinanceFuturesLogo from '../../ui/binancefutures.png'
import BinanceCoinsLogo from '../../ui/binanceus.png'
import BitfinexLogo from '../../ui/bitfinex.png'
import FtxLogo from '../../ui/ftx.png'
import { propTypes, defaultProps } from './StatusBar.props'
import './style.css'

export default class StatusBar extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      wsConnected, apiClientStates, currentExchange,
    } = this.props

    const apiClientState = apiClientStates[currentExchange]
    const apiClientConnected = apiClientState === 2
    const apiClientConnecting = apiClientState === 1
    const apiClientDisconnected = !apiClientState

    return (
      <div className='hfui-statusbar__wrapper'>
        <div className='hfui-statusbar__left'>
	    {/*<p>
            {remoteVersion && remoteVersion !== MANIFEST.version ? (
              <NavbarButton
                label='Update to latest version'
                external='https://github.com/bitfinexcom/bfx-hf-ui/releases'
              />
            ) : null}
            &nbsp;
            v
            {MANIFEST.version}
          </p>*/}

          <p>
            {apiClientConnected ? 
              <div>
	        <img src={BitfinexLogo} alt='bitfinexlogo' />
                <img src={BinanceLogo} alt='binancelogo' />
                <img src={BinanceFuturesLogo} alt='binancefutureslogo' />
                <img src={BinanceCoinsLogo} alt='binancecoinslogo' />
                <img src={FtxLogo} alt='ftxlogo' /> 
              </div>
	     : 'LOCKED'}
          </p>
        </div>

        <div className='hfui-statusbar__right'>
          <p>
            {apiClientConnected
              ? 'HF Connected'
              : apiClientConnecting
                ? 'HF Connecting'
                : 'HF Disconnected'}
          </p>

          <span className={ClassNames('hfui-statusbar__statuscircle', {
            green: apiClientConnected,
            yellow: apiClientConnecting,
            red: apiClientDisconnected,
          })}
          />

          <p>{wsConnected ? 'WS Connected' : 'WS Disconnected'}</p>

          <span className={ClassNames('hfui-statusbar__statuscircle', {
            green: wsConnected,
            red: !wsConnected,
          })}
          />
        </div>
      </div>
    )
  }
}
