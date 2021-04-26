/* eslint-disable */

export default `def next(self):
        for i, d in enumerate(self.datas):
            # HACK backtest only: Sell all remaining open position if any on last-1 candle
            #if len(d) == (d.buflen()-1) :
                #close = self.close(d,exectype=bt.Order.Market)
            # go to next feed if any pending order or If data is missing 
            if d.close[0] == 0.0 or self.o.get(d, None):
                continue

            # Search ATH and ATL since ATH
            if d.high[0] > self.athl[i][0]:
                self.athl[i] = [d.high[0], d.low[0]]
            elif self.athl[i][0] > 0 and d.low[0] < self.athl[i][1]:
                self.athl[i][1] = d.low[0]

            # Compute fibonacci ratios
            #level = (self.athl[i][0] - self.athl[i][1]) * self.params.rlevel + self.athl[i][1]
            #entry = level / self.params.multi
            #gann = (self.ath - self.atl) * 0.5 + self.atl
            #first = (self.ath - self.atl) * 0.382 + self.atl
            #gold = (self.ath - self.atl) * 0.618 + self.atl

            # If we are not in the market try to buy and not on last candle (HACK backtest only)
            if not self.getposition(d): 
                # BUY if price above ATL and bewlow entry price & obv up
                if self.athl[i][1] < d.close[0] < ((self.athl[i][0] - self.athl[i][1]) * self.params.rlevel + self.athl[i][1]) / self.params.multi and len(d) != d.buflen() and self.OBVema[i][0] > self.OBVema[i][-1]:
                    self.log('%s BUY CREATE, %.8f' % (d._name, d.close[0]),doprint=False)
                    self.o[d] = self.buy(data=d, coo=True, coc=False, exectype=bt.Order.StopTrail, trailpercent=self.params.trailpercent)
                    # Track TP level 
                    self.TP[i] = [1, self.params.tpmulti]

                    #TODO send backtest request

            # Else try to sell
            else:
                # SELL half position if price double up since buy or last TP
                if d.close[0] >= self.getposition(d).price * self.TP[i][1]**self.TP[i][0]:
                    self.log('%s SELL CREATE, %.8f' % (d._name, d.close[0]), doprint=False)
                    self.o[d] = self.sell(data=d, size=self.getposition(d).size/self.params.tpdivi, coo=False, coc=True, exectype=bt.Order.StopTrail, trailpercent=self.params.trailpercent)
                    self.TP[i][0] += 1`