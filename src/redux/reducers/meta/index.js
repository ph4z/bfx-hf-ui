import { combineReducers } from 'redux'

import exchanges from './exchanges'
import markets from './markets'
import rest from './rest'
import currencies from './currencies'

const reducers = combineReducers({
  exchanges,
  markets,
  currencies,
  rest,
})

export default reducers
