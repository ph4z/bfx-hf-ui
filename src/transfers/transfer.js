export default () => ({
  label: 'Transfer',
  customHelp: 'A Transfer order will be sent between the current wallet and the destination wallet.',

  generateTransfer: (data = {}) => {
    const { amount, walletDest, symbol } = data

    return {
      walletDest,
      quantity: Math.abs(+amount),
      symbol,
    }
  },

  sections: [{
    title: '',
    name: 'general',
    rows: [
      ['amount', 'symbol'],
      ['walletOrig', 'walletDest'],
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
    walletOrig: {
      component: 'input.text',
      label: 'Wallet To Withdraw',
      disabled: true,
    },
    walletDest: {
      component: 'input.dropdown',
      label: 'Wallet To Deposit',
      options: {},
    },
  },

  actions: ['transfer'],
})
