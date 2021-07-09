import _keyBy from 'lodash/keyBy'
import t from '../../constants/ws'

const getInitialState = () => {
  return {}
}

export default function (state = getInitialState(), action = {}) {
  const { type, payload = [] } = action

  switch (type) {
    case t.DATA_BT_STRATEGIES: {
      const { bt_strategies } = payload
      return _keyBy(bt_strategies, s => s.id)
    }

    default: {
      return state
    }
  }
}
