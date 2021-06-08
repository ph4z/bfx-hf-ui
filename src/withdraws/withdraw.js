export default () => ({
  label: 'Withdraw',
  customHelp: 'A Withdraw order will be sent between the current exchange and the destination exchange.',

  generateWithdraw: (data = {}, exchangeOrig) => {
    const { amount, exchangeDest, symbol } = data

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
      ['amount', 'symbol'],
      ['exchangeOrig', 'exchangeDest'],
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
      options: {},
    },
    exchangeOrig: {
      component: 'input.text',
      label: 'Exchange To Withdraw',
      disabled: true,
    },
    exchangeDest: {
      component: 'input.dropdown',
      label: 'Exchange To Deposit',
      options: {},
    },
  },

  actions: ['withdraw'],
})
