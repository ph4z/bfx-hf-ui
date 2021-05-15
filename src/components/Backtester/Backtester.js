import React from 'react'
import PropTypes from 'prop-types'
import _isEmpty from 'lodash/isEmpty'

import RenderHistoricalReport from './reports/HistoricalReport'
import RenderHistoricalForm from './forms/HistoricalForm'

import './style.css'

const STRATEGY_SECTIONS = [
  'defineIndicators',
  'onPriceUpdate',
  'onEnter',
  'onUpdate',
  'onUpdateLong',
  'onUpdateShort',
  'onUpdateClosing',
  'onPositionOpen',
  'onPositionUpdate',
  'onPositionClose',
  'onStart',
  'onStop',
]

const BT_STRATEGY_SECTIONS = [
  'params',
  'init',
  'start',
  'stop',
  'next',
  'prenext',
  'nextstart',
]

export default class Backtester extends React.Component {
  static propTypes = {
    indicators: PropTypes.arrayOf(PropTypes.object),
    backtest: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      executing: PropTypes.bool.isRequired,
    }),
    backtestData: PropTypes.shape({
      trades: PropTypes.array.isRequired,
      candles: PropTypes.array.isRequired,
    }),
    strategyId: PropTypes.string,
    strategies: PropTypes.array,
    bt_strategies: PropTypes.array,
    allMarkets: PropTypes.objectOf(PropTypes.array),
    backtestResults: PropTypes.objectOf(PropTypes.any),
    backtestOptions: PropTypes.objectOf(PropTypes.any),
    dsExecuteBacktest: PropTypes.func.isRequired,
    dsExecuteBacktestBacktrader: PropTypes.func.isRequired,
    setBacktestOptions: PropTypes.func.isRequired,
  }

  static defaultProps = {
    indicators: [],
    backtest: {
      loading: true,
      executing: false,
    },
    backtestData: {
      trades: [],
      candles: [],
    },
    strategyId: '',
    strategies: {},
    bt_strategies: {},
    allMarkets: {},
    backtestResults: {},
    backtestOptions: {},
  }

  state = {
    backtestOptions: {},
    execError: null,
    loadingBacktest: false,
    execRunning: false,
    results: null,
    strategyContent: null,
  }

  constructor() {
    super()

    this.backtestMethods = [
      {
        type: 'Historical',
        form: RenderHistoricalForm,
        renderReport: RenderHistoricalReport,
      },
      // {
      //   type: 'Live',
      //   form: RenderLiveForm,
      //   renderReport: RenderLiveReport,
      // },
      // {
      //   type: 'Import',
      //   form: RenderImportForm,
      //   renderReport: RenderImportReport,
      // },
    ]
  }

  componentDidMount() {
    this.setStrategyContent()
  }

  backtestStrategy = (options) => {
    const strategyContent = this.setStrategyContent()
    const {
      activeExchange, activeMarket, startDate, endDate, tf, trades, candles,
    } = options
    const { dsExecuteBacktest, dsExecuteBacktestBacktrader, setBacktestOptions, } = this.props
    setBacktestOptions(options)
    const startNum = new Date(startDate).getTime()
    const endNum = new Date(endDate).getTime()

    this.setState(() => ({
      execError: undefined,
    }))
    
    if(!strategyContent['init']) {
      dsExecuteBacktest(activeExchange, startNum, endNum, activeMarket, tf, candles, trades, strategyContent)
    } else {
      dsExecuteBacktestBacktrader(activeExchange, startNum, endNum, activeMarket, tf, candles, trades, strategyContent)
    }
  }

  setStrategyContent = () => {
    const { bt_strategies, strategyId } = this.props
    let { strategies } = this.props
    strategies = [...strategies, ...bt_strategies]
    const strategy = strategies.find(s => s.id === strategyId)
    const strategyContent = {}
    let section
    if(strategy.editor === "backtest") {
      for (let i = 0; i < STRATEGY_SECTIONS.length; i += 1) {
        section = STRATEGY_SECTIONS[i]
        const content = strategy[section]

        if (!_isEmpty(content)) {
          strategyContent[section] = content
        }
      }
    } else {
      for (let i = 0; i < BT_STRATEGY_SECTIONS.length; i += 1) {
        section = BT_STRATEGY_SECTIONS[i]
        const content = strategy[section]

        if (!_isEmpty(content)) {
          strategyContent[section] = content
        }
      } 
    }
    return strategyContent
  }

  updateExecutionType = (value) => {
    const newType = this.backtestMethods.filter(f => f.type === value)[0]
    this.setState(() => ({ executionType: newType }))
  }

  updateError(errMessage) {
    this.setState(() => ({
      results: null,
      execError: errMessage,
    }))
  }

  render() {
    const {
      executionType = this.backtestMethods[0],
    } = this.state
    const {
      indicators,
      backtestData,
      allMarkets,
      strategyId,
      backtestResults,
      backtestOptions,
    } = this.props

    const formState = this.state[`${executionType.type}_formState`] || {} // eslint-disable-line
    const opts = {
      updateExecutionType: this.updateExecutionType,
      backtestMethods: this.backtestMethods,
      backtestStrategy: this.backtestStrategy,
      executionType: executionType.type,
      indicators,
      updateError: this.updateError,
      allMarkets,
      exId: 'bitfinex', // todo: add ability to specify exchange
      formState,
      setFormState: (setStateFunc) => {
        this.setState(() => ({
          [`${executionType.type}_formState`]: {
            ...formState,
            ...setStateFunc(),
          },
        }))
      },
    }
    if (strategyId === '') {
      return (
        <div className='hfui-backtester__wrapper'>
          <p>Create a strategy to begin backtesting.</p>
        </div>
      )
    }

    if (backtestResults.error) {
      return (
        <div className='hfui-backtester__wrapper'>
          <executionType.form {...opts} />
          <p style={{ color: 'red' }}>{backtestResults.error}</p>
        </div>
      )
    }

    if (!backtestResults.executing && !backtestResults.loading && backtestResults.finished) {
      return (
        <div className='hfui-backtester__wrapper'>
          <executionType.form {...opts} />
          { executionType.renderReport({ ...opts }, backtestResults, backtestData, backtestOptions) }
        </div>
      )
    }

    return (
      <div className='hfui-backtester__wrapper'>
        <executionType.form {...opts} disabled={backtestResults.loading} />
        <p>{backtestResults.loading ? 'Loading candles and executing strategy...' : 'Press start to begin backtesting.'}</p>
      </div>
    )
  }
}
