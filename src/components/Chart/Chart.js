import React from 'react'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import PropTypes from 'prop-types'

import './style.css'

export default class Chart extends React.Component {
  static propTypes = {
    activeMarket: PropTypes.object.isRequired,
    activeExchange: PropTypes.object.isRequired,
  }
  static defaultProps = {
    activeMarket: {},
    activeExchange: {},
  }

  render() {
    const { activeMarket, activeExchange } = this.props
    const { base, quote, restID} = activeMarket
    let sym = `${activeExchange.toUpperCase()}:${base}${quote}`
    if (activeExchange === 'binance_futures' || activeExchange === 'binance_coins') {
    	sym = `BINANCE:${base}${quote}PERP`
    } 
    if (activeExchange === 'kraken') {
    	sym = `${activeExchange.toUpperCase()}:${restID}`
    } 
    

    return (
      <div style={{
        display: 'flex',
        flex: 1,
        backgroundColor: '#131722',
        height: '100%',
      }}
      >
        <TradingViewWidget
          symbol={`${sym}`}
          theme={Themes.DARK}
          autosize
          allow_symbol_change={false}
          enable_publishing={false}
          hideideas
          save_image={false}
          toolbar_bg='#fff'
        />
      </div>
    )
  }
}
