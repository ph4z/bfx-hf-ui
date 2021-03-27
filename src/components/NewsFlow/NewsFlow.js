import React from 'react'
// import { AutoSizer } from 'react-virtualized'

import { propTypes, defaultProps } from './NewsFlow.props'
import './style.css'

const HEIGHT_STEP_PX = 20
const MIN_HEIGHT_PX = 490

export default class NewsFlow extends React.Component {
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
      script.src = 'https://bonux.co:81/cors/https://static.cryptopanic.com/static/js/widgets.min.js'
      script.async = true
      script.crossOrigin = 'credentials'
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
        <>
          <div className='cryptoPanicWidget' style={{ width: 275, height: 490 }} ref={this._ref} />
          <a href='https://cryptopanic.com/' target='_blank' rel='noreferrer' data-news_feed='recent' data-bg_color='#FFFFFF' data-text_color='#333333' data-link_color='#0091C2' data-header_bg_color='#30343B' data-header_text_color='#FFFFFF' data-posts_limit='10' className='CryptoPanicWidget'>News from Earth</a>
        </>
        // </AutoSizer>
      )
    }
}
