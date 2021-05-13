/* eslint-disable */

export default `def __init__(self):
        # To keep track of pending orders and buy price/commission
        self.buyprice = None
        self.sellprice = None
        self.buycomm = None
        self.sellcomm = None
        self.btresult = {'strategy': {'trades': list()}, 'trades': list()}
        # HF sw client
        #self.hfclient = None
        # To keep track of TP
        self.TP = dict()
        # To keep track of orders
        self.o = dict()
        # Initialize indicators 
        self.OBVema = list()
        self.athl = list()
        # Calc OBV
        obv = bt.talib.OBV(self.data.close, self.data.volume)
        #self.obv.append(obv)
        # Calc EMA on OBV
        self.OBVema = bt.indicators.EMA(obv, period=self.params.obvema, plot=False)
        #self.OBVema.append(bt.indicators.EMA(obv, period=self.params.obvema))
        # Initialize athl array with 0 as ATH and inf as ATL
        self.athl = [0.0, float('inf')]
        #self.athl.append([0.0, float('inf')])`