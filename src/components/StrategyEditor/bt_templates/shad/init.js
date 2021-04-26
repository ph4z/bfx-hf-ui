/* eslint-disable */

export default `def __init__(self):
        # To keep track of pending orders and buy price/commission
        self.order = None
        self.buyprice = None
        self.sellprice = None
        self.buycomm = None
        self.sellcomm = None
        # To keep track of TP
        self.TP = dict()
        # To keep track of orders
        self.o = dict()
        # Initialize indicators for all feeds
        #self.obv = list()
        #self.ema = list()
        self.OBVema = list()
        self.athl = list()
        # Initialize all indicators
        for d in self.datas:
            # Disable data output to csv writer
            d.csv = False
            # Calc OBV
            obv = bt.talib.OBV(d.close, d.volume)
            #self.obv.append(obv)
            # Calc EMA on OBV
            self.OBVema.append(EMA(obv, period=self.params.obvema))
            # Initialize athl array with 0 as ATH and inf as ATL
            self.athl.append([0.0, float('inf')])`