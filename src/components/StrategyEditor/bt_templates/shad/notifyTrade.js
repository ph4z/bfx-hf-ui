/* eslint-disable */

export default `def notify_trade(self, trade):
        if not trade.isclosed:
            return
        self.log('%s OPERATION PROFIT, GROSS %.8f, NET %.8f' % (trade.data._name, trade.pnl, trade.pnlcomm), doprint=False)`