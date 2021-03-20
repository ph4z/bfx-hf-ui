import React from 'react'
// import { AutoSizer } from 'react-virtualized'

import { propTypes, defaultProps } from './HeatMap.props'
import './style.css'

const HEIGHT_STEP_PX = 20
const MIN_HEIGHT_PX = 490

export default class HeatMap extends React.Component {
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

    componentDidMount() {
      const script = document.createElement('script')
      script.src = 'https://cryptorank.io/widget/market-state.js'
      script.async = true
      this._ref.current.appendChild(script)
    }

    shouldComponentUpdate(nextProps, nextState) {
      const { height } = this.state
      if (nextState.height !== height) {
        return true
      }
      return false
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
        <div className='cr-heatmap-widget' data-top='100' data-range='24H' data-order='cap' style={{ width: 1275, height: 490 }} ref={this._ref} />
        // </AutoSizer>
      )
    }
}
