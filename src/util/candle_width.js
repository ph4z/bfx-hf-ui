import _flatten from 'lodash/flatten'
import _uniq from 'lodash/uniq'

import bitfinexTFs from './time_frames/bitfinex'
import binanceFuturesTFs from './time_frames/binance_futures'
import binanceCoinsTFs from './time_frames/binance_coins'
import binanceTFs from './time_frames/binance'
import krakenTFs from './time_frames/kraken'
import ftxTFs from './time_frames/ftx'

const tfs = _uniq(_flatten([
  Object.values(bitfinexTFs),
  Object.values(binanceTFs),
  Object.values(binanceFuturesTFs),
  Object.values(binanceCoinsTFs),
  Object.values(krakenTFs),
  Object.values(ftxTFs),
]))

const SUFFIX_WIDTHS = {
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  D: 24 * 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  W: 14 * 24 * 60 * 60 * 1000,
  w: 14 * 24 * 60 * 60 * 1000,
  M: 30 * 24 * 60 * 60 * 1000,
}

const CANDLE_WIDTHS = {}

tfs.forEach((tf) => {
  const suffix = tf.substring(tf.length - 1)
  const value = +tf.substring(0, tf.length - 1)

  CANDLE_WIDTHS[tf] = value * SUFFIX_WIDTHS[suffix]
})

export default tf => CANDLE_WIDTHS[tf]
