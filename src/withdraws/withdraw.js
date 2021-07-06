export default () => ({
  label: 'Withdraw',
  customHelp: 'A Withdraw order will be sent between the current exchange and the destination exchange.',

  generateWithdraw: (data = {}) => {
    const { amount, exchangeDest, symbol, networks } = data

    return {
      exchangeDest,
      quantity: Math.abs(+amount),
      symbol,
      networks,
    }
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['amount', 'symbol'],
      ['networks'],
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
    networks: {
      component: 'input.dropdown',
      label: 'Network To Use',
      options: {},
    },
    exchangeOrig: {
      component: 'input.dropdown',
      label: 'Exchange To Withdraw',
    },
    exchangeDest: {
      component: 'input.dropdown',
      label: 'Exchange To Deposit',
      options: {},
    },
  },

  actions: ['withdraw'],
})
