/* eslint-disable */

export default `def stop(self):
        report = str(int(datetime.utcnow().timestamp()))+".html"
        sharpe = self.analyzers.getbyname("sharpe").get_analysis()
        sqn = self.analyzers.getbyname("sqn").get_analysis()
        vwr = self.analyzers.getbyname("vwr").get_analysis()
        #trades = self.analyzers.getbyname("positions").get_analysis()
        #print("trades:", trades)
        trades = self.analyzers.getbyname("trades").get_analysis()
        #print("positions:", positions)
        df_values = pd.DataFrame(self.analyzers.getbyname("cashmarket").get_analysis()).T
        df_values = df_values.iloc[:, 1]
        qs.extend_pandas()
        qs.reports.html(df_values, output='/data/backtrader/reports/'+report)
        if sharpe.get('sharperatio', None):
            pass
        else:
            sharpe = { 'sharperatio': 0.0 }
        if vwr.get('vwr', None):
            pass
        else:
            vwr = { 'vwr': 0.0 }
        if sqn.get('sqn', None):
            pass
        else:
            sqn = { 'sqn': 0.0 }
        #print(trades)
        #print(positions)
        html = '<tr><td>'+str(self.params.obvema)+'</td><td>'+str(self.params.rlevel)+'</td><td>'+str(self.params.multi)+'</td><td>'+str(self.params.tpmulti)+'</td><td>'+str(self.params.tpdivi)+'</td><td>'+str(self.params.trailpercent)+'</td><td>'+"{:.2f}".format(self.broker.getvalue())+'</td><td>'+str(sharpe["sharperatio"])+'</td><td>'+str(sqn["sqn"])+'</td><td>'+str(vwr["vwr"])+'</td><td><a href=/'+report+' target="_blank">report</a></td><td><a href=/ target="_blank">chart</a></td></tr>'
        with open('/data/backtrader/reports/index.html', 'a') as f:
            f.write(html)

        #self.log("%2d,%.3f,%2d,%2d,%d,%d" % (self.params.obvema, self.params.rlevel, self.params.multi, self.params.tpmulti, self.params.tpdivi, aum, doprint=True)
        
        #lines = { t["ticker"] for t in trades }
        #for i, d in enumerate(self.datas):
            #if self.getposition(d):
            #if d._name in lines:
                #d.plotinfo.plot = True
                #self.log('%s Pending position:,\n %s' % (d._name, self.getposition(d)), doprint=False)`