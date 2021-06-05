import React from 'react'

import StatusBar from '../../components/StatusBar'
import ExchangeInfoBar from '../../components/ExchangeInfoBar'

import { propTypes, defaultProps } from './Santiment.props'
import './style.css'

export default class Santiment extends React.Component {
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

  render() {
    const { activeMarket } = this.props
    return (
      <>
        <ExchangeInfoBar
          selectedMarket={activeMarket}
          onChangeMarket={this.onChangeMarket}
        />
        <div className='hfui-santiment__wrapper'>
          <div className='hfui-santiment__inner'>
            <div className='hfui-santiment__column center'>
            </div>
          </div>

          <StatusBar />
        </div>
      </>
    )
  }
}
