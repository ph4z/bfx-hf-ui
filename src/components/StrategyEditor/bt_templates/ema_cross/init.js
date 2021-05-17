/* eslint-disable */

export default `def __init__(self):
        self.buyprice = None
        self.sellprice = None
        self.orderid = None  # to control operation entries

        self.fast_ema = bt.indicators.EMA(period=self.params.fast)
        self.slow_ema = bt.indicators.EMA(period=self.params.slow)
        self.long_ema = bt.indicators.EMA(period=self.params.long)
        self.signal = bt.indicators.CrossOver(fast_ema, slow_ema)
        self.log(f'Initial portfolio value of {self.broker.get_value():.2f}\n')`