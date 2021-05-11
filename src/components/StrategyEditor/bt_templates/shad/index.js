import next from './next'
import notifyOrder from './notifyOrder'
import notifyTrade from './notifyTrade'
import start from './start'
import stop from './stop'
import init from './init'
import params from './params'
import log from './log'

export default {
  label: 'SHAD',

  params,
  init,
  log,
  start,
  stop,
  next,
  notifyOrder,
  notifyTrade,
}
