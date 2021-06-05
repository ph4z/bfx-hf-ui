import getActiveMarket from './get_active_market'
import getActiveExchange from './get_active_exchange'

export default (state, type) => {
  switch (type) {
    case 'orderform': {
      return {
        currentExchange: getActiveExchange(state),
        exchangeDirty: false,
      }
    }

    case 'trades': {
      return {
        currentExchange: getActiveExchange(state),
        currentMarket: getActiveMarket(state),
        exchangeDirty: false,
        marketDirty: false,
      }
    }

    case 'book': {
      return {
        currentExchange: getActiveExchange(state),
        currentMarket: getActiveMarket(state),
        exchangeDirty: false,
        marketDirty: false,
      }
    }

    default: {
      return {}
    }
  }
}
