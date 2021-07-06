import types from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = {} } = action

  switch (type) {
    case types.DATA_CURRENCIES: {
      const { exID, currencies = [] } = payload

      return {
        ...state,
        [exID]: currencies,
      }
    }

    default: {
      return state
    }
  }
}
