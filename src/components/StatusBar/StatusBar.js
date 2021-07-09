import React from 'react'
// import ClassNames from 'classnames'
// import NavbarButton from '../NavbarButton'
// import MANIFEST from '../../../package.json'
import BinanceLogo from '../../ui/binance.png'
import BinanceFuturesLogo from '../../ui/binancefutures.png'
import BinanceCoinsLogo from '../../ui/binanceus.png'
import BitfinexLogo from '../../ui/bitfinex.png'
import FtxLogo from '../../ui/ftx.png'
import PotaraLogo from '../../ui/potara.png'
import KrakenLogo from '../../ui/kraken.png'
import { propTypes, defaultProps } from './StatusBar.props'
import './style.css'

export default class StatusBar extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      wsConnected, apiClientStates
    } = this.props

    // const apiClientState = apiClientStates[currentExchange]
    // const apiClientConnected = apiClientState === 2
    // const apiClientConnecting = apiClientState === 1
    // const apiClientDisconnected = !apiClientState

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

	    {/*{apiClientConnected ?*/}
              <div>
	        { apiClientStates['bitfinex'] === 2 ?
	          <img src={BitfinexLogo} title='Bitfinex' alt='bitfinexlogo' style={{border: '2px solid lightgreen', borderRadius: '50%', padding: '1px'}}/> :
	           <img src={BitfinexLogo} title='Bitfinex' alt='bitfinexlogo' /> }
	        { apiClientStates['binance'] === 2 ? 
	          <img src={BinanceLogo} title='Binance' alt='binancelogo' style={{border: '2px solid lightgreen', borderRadius: '50%', padding: '1px'}}/> :
	           <img src={BinanceLogo} title='Binance' alt='binancelogo' /> }
	        { apiClientStates['binance_futures'] === 2 ? 
	          <img src={BinanceFuturesLogo} title='Binance Futures' alt='binancefutureslogo' style={{border: '2px solid lightgreen', borderRadius: '50%', padding: '1px'}}/> :
	           <img src={BinanceFuturesLogo} title='Binance Futures' alt='binancefutureslogo' /> }
	        { apiClientStates['binance_coins'] === 2 ? 
	          <img src={BinanceCoinsLogo} title='Binance Coins' alt='binancecoinslogo' style={{border: '2px solid lightgreen', borderRadius: '50%', padding: '1px'}}/> :
	           <img src={BinanceCoinsLogo} title='Binance Coins' alt='binancecoinslogo' /> }
	        { apiClientStates['ftx'] === 2 ? 
	          <img src={FtxLogo} title='FTX' alt='ftxlogo' style={{border: '2px solid lightgreen', borderRadius: '50%', padding: '1px'}}/> :
	           <img src={FtxLogo} title='FTX' alt='ftxlogo' /> }
	        { apiClientStates['kraken'] === 2 ? 
	          <img src={KrakenLogo} title='Kraken' alt='krakenlogo' style={{border: '2px solid lightgreen', borderRadius: '50%', padding: '1px'}}/> :
	           <img src={KrakenLogo} title='Kraken' alt='krakenlogo' /> }
              </div>
	    {/*: 'LOCKED'}*/}
        </div>

        <div className='hfui-statusbar__right'>

          <p>{wsConnected ?
	      <img src={PotaraLogo} title='Kaio' alt='kaiologo' style={{border: '2px solid lightgreen', borderRadius: '50%', padding: '1px'}}/> :
	       <img src={PotaraLogo} title='Kaio' alt='kaiologo' style={{border: '2px solid red', borderRadius: '50%', padding: '1px'}}/> }
	  </p>

        </div>
      </div>
    )
  }
}
