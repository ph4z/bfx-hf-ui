import React from 'react'
// import { AutoSizer } from 'react-virtualized'

import { propTypes, defaultProps } from './MarketCap.props'
import './style.css'

const HEIGHT_STEP_PX = 20
const MIN_HEIGHT_PX = 490

export default class MarketCap extends React.PureComponent {
    static propTypes = propTypes
    static defaultProps = defaultProps

    constructor(props) {
      super(props)

      const {
        savedState = {}, defaultHeight = 490, activeMarket, activeExchange,
      } = props

      const {
        currentExchange = activeExchange, currentMarket = activeMarket,
        height = defaultHeight,
      } = savedState

      this.state = {
        ...this.state,
        currentExchange,
        currentMarket,
        height,
      }

      this._ref = React.createRef()
      this.onIncreaseHeight = this.onIncreaseHeight.bind(this)
      this.onDecreaseHeight = this.onDecreaseHeight.bind(this)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //  const { height } = this.state
    //  if (nextState.height !== height) {
    //    return true
    //  }
    //  return false
    // }

    componentDidMount() {
      const script = document.createElement('script')
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
      script.async = true
      script.innerHTML = JSON.stringify({
        width: '1275', height: '490', defaultColumn: 'overview', screener_type: 'crypto_mkt', displayCurrency: 'USD', colorTheme: 'dark', locale: 'en',
      })

      this._ref.current.appendChild(script)
    }

    onIncreaseHeight() {
      this.setState(({ height }) => ({
        height: height + HEIGHT_STEP_PX,
      }))

      this.deferSaveState()
    }

    onDecreaseHeight() {
      this.setState(({ height }) => ({
        height: Math.max(height - HEIGHT_STEP_PX, MIN_HEIGHT_PX),
      }))

      this.deferSaveState()
    }

    deferSaveState() {
      setTimeout(() => {
        this.saveState()
      }, 0)
    }

    saveState() {
      const { height } = this.state
      const { saveState, layoutID, layoutI } = this.props

      saveState(layoutID, layoutI, {
        height,
      })
    }

    render() {
      return (
      // <AutoSizer>
      // {({ width, height }) => width > 0 && height > 0 && (
        <div className='tradingview-widget-container' ref={this._ref}>
          <div className='tradingview-widget-container__widget' />
        </div>
      // )}
      // </AutoSizer>
      )
    }
}
