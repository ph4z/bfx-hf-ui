import bitfinex from './bitfinex'
import binance from './binance'
import binance_futures from './binance_futures'
import binance_coins from './binance_coins'
import kraken from './kraken'
import ftx from './ftx'

// TODO get TF from info.exchanges (from ccxt.exchange.timeframes)

export default {
  bitfinex,
  binance,
  binance_futures,
  binance_coins,
  kraken,
  ftx,
}
