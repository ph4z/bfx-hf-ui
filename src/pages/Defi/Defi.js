import React from 'react'

import StatusBar from '../../components/StatusBar'
import ExchangeInfoBar from '../../components/ExchangeInfoBar'
import DefiControlToolbar from '../../components/DefiControlToolbar'
import DefiProtocolsTable from '../../components/DefiProtocolsTable'

import { propTypes, defaultProps } from './Defi.props'
import './style.css'

export default class Defi extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.grid = React.createRef()
    this.onChangeMarket = this.onChangeMarket.bind(this)
  }

  onChangeMarket({ value }) {
    const { saveActiveMarket } = this.props
    saveActiveMarket(value)
  }

  onHoldings({ value }) {
    const { saveActiveMarket } = this.props
    saveActiveMarket(value)
  }

  render() {
    const { activeMarket } = this.props
    return (
      <>
        <div className='hfui-defipage__wrapper'>
          <DefiControlToolbar
          />

          <div className='hfui-defipage__inner'>
            <div className='hfui-defipage__column center'>
              <DefiProtocolsTable
                selectedMarket={activeMarket}
                onChangeMarket={this.onChangeMarket}
              />
            </div>
          </div>

          <StatusBar />
        </div>
      </>
    )
  }
}
