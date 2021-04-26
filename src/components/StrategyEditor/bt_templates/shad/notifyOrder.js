/* eslint-disable */

export default `def notify_order(self, order):
        if order.status in [order.Submitted, order.Accepted]:
            # Buy/Sell order submitted/accepted to/by broker - Nothing to do
            return
        # Check if an order has been completed
        # Attention: broker could reject order if not enough cash
        if order.status in [order.Completed]:
            if order.isbuy():
                self.log(
                        '%s BUY EXECUTED, Price: %.8f, Cost: %.8f, Comm %.8f '% 
                        (order.data._name,
                            order.executed.price,
                            order.executed.value,
                            order.executed.comm), doprint=False
                        )
            elif order.issell():
                self.log(
                        '%s SELL EXECUTED, Price: %.8f, Cost: %.8f, Comm %.8f '% 
                        (order.data._name,
                            order.executed.price,
                            order.executed.value,
                            order.executed.comm), doprint=False
                        )
        elif order.status in [order.Canceled, order.Margin, order.Rejected]:
            self.log('Order Canceled/Margin/Rejected')
        # Write down: no pending order
        self.o[order.data] = None`