import { combineReducers } from 'redux'

import exchanges from './exchanges'
import markets from './markets'
import rest from './rest'
import currencies from './currencies'
import protocols from './protocols'

const reducers = combineReducers({
  exchanges,
  markets,
  currencies,
  protocols,
  rest,
})

export default reducers
