export default () => ({
  label: 'Transfer',
  customHelp: 'A Transfer order will be sent between the current wallet and the destination wallet.',

  generateTransfer: (data = {}) => {
    const { amount, fromWallet, symbol, toWallet } = data

    return {
      fromWallet,
      toWallet,
      quantity: Math.abs(+amount),
      symbol,
    }
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['amount', 'symbol'],
      ['exchange'],
      ['fromWallet', 'toWallet'],
    ],
  }],

  fields: {
    amount: {
      component: 'input.amount',
      label: 'Amount $BASE',
    },
    symbol: {
      component: 'input.dropdown',
      label: 'Symbol To Transfer',
      options: {},
    },
    exchange: {
      component: 'input.text',
      label: 'Exchange For Transfer',
      // disabled: true,
    },
    fromWallet: {
      component: 'input.dropdown',
      label: 'Source wallet',
      options: {},
    },
    toWallet: {
      component: 'input.dropdown',
      label: 'Destination wallet',
      options: {},
    },
  },

  actions: ['transfer'],
})
