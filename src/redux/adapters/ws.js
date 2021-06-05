import { Position, Notification } from 'bfx-api-node-models'

const positionAdapter = (data = []) => {
  return new Position(data).toJS()
}

const balanceAdapter = (data = [], exID) => ({
  exID,
  currency: data[0],
  context: data[1],
  balance: data[2],
  available: data[3],
})

const orderAdapter = (data = {}) => ({
  id: data.id,
  gid: data.gid,
  cid: data.cid,
  symbol: data.symbol,
  created: data.mtsCreate,
  amount: data.amount,
  originalAmount: data.amountOrig,
  type: data.type.toUpperCase(),
  status: data.status.toUpperCase(),
  price: data.price,
})

const notificationAdapter = (data = []) => {
  if (data[1] === 'ucm-notify-ui') { // HF notification
    return {
      mts: data[0],
      type: data[1],
      status: data[4].level.toUpperCase(),
      text: data[4].message,
    }
  }
  return new Notification(data).toJS()
}

export {
  notificationAdapter,
  positionAdapter,
  balanceAdapter,
  orderAdapter,
}
