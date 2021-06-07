export default () => ({
  label: 'Withdraw',
  customHelp: 'A Withdraw order will be sent between the current exchange and the destination exchange.',

  generateWithdraw: (data = {}, symbol) => {
    const { amount, exchangeDest, exchangeOrig } = data

    return {
      exchangeDest,
      exchangeOrig,
      quantity: Math.abs(+amount),
      symbol,
    }
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['amount'],
    ],
  }],

  fields: {
    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },
    symbol: {
      component: 'input.dropdown',
      label: 'Symbol To Withdraw',
    },
    exchangeOrig: {
      component: 'input.dropdown',
      label: 'Exchange To Withdraw',
      disabled: true,
    },
    exchangeDest: {
      component: 'input.dropdown',
      label: 'Exchange To Deposit',
      default: 'Bitfinex',
      options: {
        Bitfinex: 'Bitfinex',
        Binance: 'Binance',
        Kraken: 'Kraken',
        FTX: 'FTX',
      },
    },
  },

  actions: ['withdraw'],
})
