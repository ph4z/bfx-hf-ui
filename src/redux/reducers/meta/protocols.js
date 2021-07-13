import types from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default (state = getInitialState(), action = {}) => {
  const { type, payload = {} } = action

  switch (type) {
    case types.DATA_DEFI_PROTOCOLS: {
      const { protocols = [] } = payload
      return protocols
    }

    default: {
      return state
    }
  }
}
