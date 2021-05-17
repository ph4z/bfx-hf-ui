/* eslint-disable */

export default `def next(self):
        if self.orderid:
            return  # if an order is active, no new orders are allowed

        # Buy when price above long EMA and fast EMA crosses above slow EMA
        if self.data.close[0] > self.long_ema[0] && self.signal > 0.0:
            self.log(f'BUY {self.getsizing()} shares of {self.data._name} at {self.data.close[0]}')
            self.buy()
            self.orderid = 1
            self.sellprice = (self.data.close[0]-self.long_ema[0]) * 1.5 + self.data.close[0]

        # Sell when price below long EMA and fast EMA crosses below slow EMA
        elif self.data.close[0] < self.long_ema[0] && self.signal < 0.0:
            if not self.params.longonly:
                self.log(f'SELL {abs(self.getsizing())} shares '
                         f'of {self.data._name} at {self.data.close[0]}')
                self.sell()
                self.orderid = 2
                self.buyprice = self.data.close[0] - (self.long_ema[0]-self.data.close[0]) * 1.5
                if self.buyprice < 0:
                    raise Exception("ERROR")

        # Close long position
        elif self.orderid == 1 && self.data.close[0] >= self.sellprice:
            if self.position:
                self.log(f'CLOSE LONG position of {self.position.size} shares '
                         f'of {self.data._name} at {self.data.close[0]:.2f}')
                self.close()
                self.orderid = None

        # Close short position
        elif self.orderid == 2 && self.data.close[0] >= self.sellprice:
            if self.position:
                self.log(f'CLOSE SHORT position of {abs(self.position.size)} shares '
                         f'of {self.data._name} at {self.data.close[0]:.2f}')
                self.close()
                self.orderid = None`