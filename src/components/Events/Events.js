import React from 'react'
// import { AutoSizer } from 'react-virtualized'

import { propTypes, defaultProps } from './Events.props'
import './style.css'

const HEIGHT_STEP_PX = 20
const MIN_HEIGHT_PX = 175

export default class Events extends React.Component {
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
      script.src = 'https://coinmarketcal.com/en/api/widget?limit=20&eventEvenColor=172D3E&eventOddColor=172D3E&bordersColor=E2E5E7&textColor=E2E5E7'
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
        <div className='cr-events-widget' style={{ width: 375, height: 490 }} ref={this._ref} />
        // </AutoSizer>
      )
    }
}
