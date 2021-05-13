/* eslint-disable */

export default `def next(self):
        # Send notification to HF server: ['bt.candle', null, null, candle] - individual BT candle
        if self.broker.hfclient:
            msg = ["bt.candle", None, None, [int(self.data.datetime.datetime(0).timestamp() *1000), self.data.open[0], self.data.high[0], self.data.low[0], self.data.close[0], self.data.volume[0]], self.datas[0]._name]
            self.broker.hfclient.sendMessage(orjson.dumps(msg), isBinary=False)
        # go to next feed if data is missing 
        if self.data.close[0] == 0.0 or self.o.get(self.data, None):
            return

        # Search for new ATH and ATL since ATH
        if self.data.high[0] > self.athl[0]:
            self.athl = [self.data.high[0], self.data.low[0]]
        elif self.athl[0] > 0 and self.data.low[0] < self.athl[1]:
            self.athl[1] = self.data.low[0]


        if not self.getposition(self.data): 
            # BUY if price above ATL and bewlow entry price & obv up
            entry =  ((self.athl[0] - self.athl[1]) * self.params.rlevel + self.athl[1]) / self.params.multi 
            if self.athl[1] < self.data.close[0] < ((self.athl[0] - self.athl[1]) * self.params.rlevel + self.athl[1]) / self.params.multi and self.OBVema[0] > self.OBVema[-1]:
            #if self.athl[1] < self.data.close[0] < ((self.athl[0] - self.athl[1]) * self.params.rlevel + self.athl[1]) / self.params.multi and len(self.data) != self.data.buflen() and self.OBVema[0] > self.OBVema[-1]:
                self.log('%s BUY CREATE, %.8f' % (self.data._name, self.data.close[0]),doprint=True)
                self.o[self.data] = self.buy(data=self.data, coo=True, coc=False, exectype=bt.Order.StopTrail, trailpercent=self.params.trailpercent)
                # Track TP level 
                self.TP = [1, self.params.tpmulti]

        # Else try to sell
        else:
            # SELL half position if price double up since buy or last TP
            if self.data.close[0] >= self.getposition(self.data).price * self.TP[1]**self.TP[0]:
                self.log('%s SELL CREATE, %.8f' % (self.data._name, self.data.close[0]), doprint=True)
                self.o[self.data] = self.sell(data=self.data, size=self.getposition(self.data).size/self.params.tpdivi, coo=False, coc=True, exectype=bt.Order.StopTrail, trailpercent=self.params.trailpercent)
                self.TP[0] += 1`