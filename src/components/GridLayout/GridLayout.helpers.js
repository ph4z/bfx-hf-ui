import React from 'react'

import OrderForm from '../OrderForm'
import OrderBookPanel from '../OrderBookPanel'
import ChartPanel from '../ChartPanel'
import AtomicOrdersTablePanel from '../AtomicOrdersTablePanel'
import AlgoOrdersTablePanel from '../AlgoOrdersTablePanel'
import OrderHistoryTable from '../OrderHistoryTable'
import TradesTablePanel from '../TradesTablePanel'
import PositionsTablePanel from '../PositionsTablePanel'
import BalancesTablePanel from '../BalancesTablePanel'
import TradingStatePanel from '../TradingStatePanel'
import MarketCap from '../MarketCap'
import HeatMap from '../HeatMap'
import Screener from '../Screener'
import Events from '../Events'
import WithdrawForm from '../WithdrawForm'

const COMPONENT_TYPES = {
  CHART: 'CHART',
  HEAT_MAP: 'HEAT_MAP',
  EVENTS: 'EVENTS',
  MARKET_CAP: 'MARKET_CAP',
  SCREENER: 'SCREENER',
  ORDER_BOOK: 'ORDER_BOOK',
  ORDER_FORM: 'ORDER_FORM',
  TRADES_TABLE: 'TRADES_TABLE',
  POSITIONS_TABLE: 'POSITIONS_TABLE',
  BALANCES_TABLE: 'BALANCES_TABLE',
  ALGO_ORDERS_TABLE: 'ALGO_ORDERS_TABLE',
  ATOMIC_ORDERS_TABLE: 'ATOMIC_ORDERS_TABLE',
  ORDER_HISTORY_TABLE: 'ORDER_HISTORY_TABLE',
  TRADING_STATE_PANEL: 'TRADING_STATE_PANEL',
  WITHDRAW_FORM: 'WITHDRAW_FORM',
}

const COMPONENT_LABELS = {
  [COMPONENT_TYPES.CHART]: 'Chart',
  [COMPONENT_TYPES.HEAT_MAP]: 'Heat Map',
  [COMPONENT_TYPES.EVENTS]: 'Events',
  [COMPONENT_TYPES.SCREENER]: 'Screener',
  [COMPONENT_TYPES.MARKET_CAP]: 'Market Capitalization',
  [COMPONENT_TYPES.ORDER_BOOK]: 'Order Book',
  [COMPONENT_TYPES.ORDER_FORM]: 'Order Form',
  [COMPONENT_TYPES.TRADES_TABLE]: 'Trades Table',
  [COMPONENT_TYPES.BALANCES_TABLE]: 'Balances Table',
  [COMPONENT_TYPES.POSITIONS_TABLE]: 'Positions Table',
  [COMPONENT_TYPES.ALGO_ORDERS_TABLE]: 'Algo Orders Table',
  [COMPONENT_TYPES.ATOMIC_ORDERS_TABLE]: 'Atomic Orders Table',
  [COMPONENT_TYPES.ORDER_HISTORY_TABLE]: 'Order History Table',
  [COMPONENT_TYPES.TRADING_STATE_PANEL]: 'Trading State Panel',
  [COMPONENT_TYPES.WITHDRAW_FORM]: 'Withdraw Form',
}

const COMPONENT_DIMENSIONS = {
  [COMPONENT_TYPES.CHART]: { w: 33, h: 10 },
  [COMPONENT_TYPES.HEAT_MAP]: { w: 1275, h: 490 },
  [COMPONENT_TYPES.EVENTS]: { w: 375, h: 490 },
  [COMPONENT_TYPES.MARKET_CAP]: { w: 1275, h: 490 },
  [COMPONENT_TYPES.SCREENER]: { w: 1275, h: 490 },
  [COMPONENT_TYPES.ORDER_BOOK]: { w: 24, h: 20 },
  [COMPONENT_TYPES.ORDER_FORM]: { w: 24, h: 10 },
  [COMPONENT_TYPES.TRADES_TABLE]: { w: 24, h: 10 },
  [COMPONENT_TYPES.BALANCES_TABLE]: { w: 20, h: 6 },
  [COMPONENT_TYPES.POSITIONS_TABLE]: { w: 40, h: 6 },
  [COMPONENT_TYPES.ALGO_ORDERS_TABLE]: { w: 40, h: 6 },
  [COMPONENT_TYPES.ATOMIC_ORDERS_TABLE]: { w: 40, h: 6 },
  [COMPONENT_TYPES.ORDER_HISTORY_TABLE]: { w: 40, h: 6 },
  [COMPONENT_TYPES.TRADING_STATE_PANEL]: { w: 40, h: 6 },
  [COMPONENT_TYPES.WITHDRAW_FORM]: { w: 24, h: 10 },
}

const componentForType = (c) => {
  switch (c) {
    case COMPONENT_TYPES.CHART:
      return ChartPanel

    case COMPONENT_TYPES.HEAT_MAP:
      return HeatMap

    case COMPONENT_TYPES.MARKET_CAP:
      return MarketCap

    case COMPONENT_TYPES.SCREENER:
      return Screener

    case COMPONENT_TYPES.EVENTS:
      return Events

    case COMPONENT_TYPES.ORDER_BOOK:
      return OrderBookPanel

    case COMPONENT_TYPES.ORDER_FORM:
      return OrderForm

    case COMPONENT_TYPES.TRADES_TABLE:
      return TradesTablePanel

    case COMPONENT_TYPES.ATOMIC_ORDERS_TABLE:
      return AtomicOrdersTablePanel

    case COMPONENT_TYPES.ALGO_ORDERS_TABLE:
      return AlgoOrdersTablePanel

    case COMPONENT_TYPES.ORDER_HISTORY_TABLE:
      return OrderHistoryTable

    case COMPONENT_TYPES.POSITIONS_TABLE:
      return PositionsTablePanel

    case COMPONENT_TYPES.BALANCES_TABLE:
      return BalancesTablePanel

    case COMPONENT_TYPES.TRADING_STATE_PANEL:
      return TradingStatePanel

    case COMPONENT_TYPES.WITHDRAW_FORM:
      return WithdrawForm

    default:
      return null
  }
}

const renderLayoutElement = (layoutID, def = {}, componentProps = {}, onRemoveComponent) => {
  const { i, c, props = {} } = def
  const C = componentForType(c)
  const cProps = {
    ...props,
    ...componentProps.sharedProps,
    layoutID,
    layoutI: i,
    onRemove: () => onRemoveComponent(i),
  }

  if (!C) {
    return (
      <p>
        Unknown component type:
        {c}
      </p>
    )
  }

  if (C === ChartPanel && componentProps.chart) {
    Object.assign(cProps, componentProps.chart)
  } else if (C === HeatMap && componentProps.heatmap) {
    Object.assign(cProps, componentProps.heatmap)
  } else if (C === MarketCap && componentProps.marketcap) {
    Object.assign(cProps, componentProps.marketcap)
  } else if (C === Events && componentProps.events) {
    Object.assign(cProps, componentProps.events)
  } else if (C === Screener && componentProps.screener) {
    Object.assign(cProps, componentProps.screener)
  } else if (C === OrderBookPanel && componentProps.book) {
    Object.assign(cProps, componentProps.book)
  } else if (C === TradesTablePanel && componentProps.trades) {
    Object.assign(cProps, componentProps.trades)
  } else if (C === OrderForm && componentProps.orderForm) {
    Object.assign(cProps, componentProps.orderForm)
  } else if (C === AtomicOrdersTablePanel && componentProps.orders) {
    Object.assign(cProps, componentProps.orders)
  } else if (C === WithdrawForm && componentProps.withdraw) {
    Object.assign(cProps, componentProps.withdraw)
  }
  return <C {...cProps} />
}

export {
  COMPONENT_TYPES,
  COMPONENT_DIMENSIONS,
  COMPONENT_LABELS,
  renderLayoutElement,
  componentForType,
}
