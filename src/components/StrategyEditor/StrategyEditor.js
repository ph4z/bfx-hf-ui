import React from 'react'
import Debug from 'debug'
import ClassNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/python/python'
import Indicators from 'bfx-hf-indicators'
import { nonce } from 'bfx-api-node-util'
import HFS from 'bfx-hf-strategy'
import HFU from 'bfx-hf-util'
import _ from 'lodash'
import * as SRD from '@projectstorm/react-diagrams'
import PropTypes from 'prop-types'

import Templates from './templates'
import BT_Templates from './bt_templates'
import StrategyEditorPanel from './StrategyEditorPanel'
import CreateNewStrategyModal from '../CreateNewStrategyModal'
import OpenExistingStrategyModal from '../OpenExistingStrategyModal'
import ImportNewStrategyModal from '../ImportNewStrategyModal'

import './style.css'

const debug = Debug('hfui-ui:c:strategy-editor')
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

export default class StrategyEditor extends React.PureComponent {
  static propTypes = {
    moveable: PropTypes.bool,
    removeable: PropTypes.bool,
    strategyId: PropTypes.string,
    renderResults: PropTypes.bool,
    onSave: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired,
    onSaveBT: PropTypes.func.isRequired,
    onImportBT: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onRemoveBT: PropTypes.func.isRequired,
    authToken: PropTypes.string.isRequired,
    onStrategyChange: PropTypes.func.isRequired,
    onStrategySelect: PropTypes.func.isRequired,
    gaCreateStrategy: PropTypes.func.isRequired,
    onIndicatorsChange: PropTypes.func.isRequired,
    strategyContent: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.oneOf([null]).isRequired,
      ]),
    ),
  }
  static defaultProps = {
    strategyId: '',
    moveable: false,
    removeable: false,
    renderResults: true,
    strategyContent: {},
  }

  state = {
    strategy: null,
    backtrader: false,
    sectionErrors: {},
    strategyDirty: false,
    editorMode: 'visual',
    editorMaximised: false,
    isRemoveModalOpened: false,
    activeContent: 'defineIndicators',
    createNewStrategyModalOpen: false,
    openExistingStrategyModalOpen: false,
    importNewStrategyModalOpen: false,
  }

  componentDidMount() {
    this.setState(() => ({ strategy: null }))
  }

  onCreateNewStrategy = (label, editor, templateLabel) => {
    const strategy = { label }
    let template
    if(editor === 'backtest') {
      template = Templates.find(t => t.label === templateLabel)
      this.setState(() => ({ backtrader: false }))
    } else {
      template = BT_Templates.find(t => t.label === templateLabel)
      this.setState(() => ({ backtrader: true }))
    }

    if (!template) {
      debug('unknown template: %s', templateLabel)
    }

    const templateSections = Object.keys(template)

    templateSections.forEach((s) => {
      if (s === 'label') return

      strategy[s] = template[s]
    })
    strategy.editor = editor

    this.setState(() => ({
      sectionErrors: {},
      strategyDirty: true,
    }))
    this.selectStrategy(strategy)

    if (strategy.defineIndicators) {
      setTimeout(() => {
        this.onDefineIndicatorsChange()
      }, 0)
    }
  }

  onLoadStrategy = (strategy) => {
    this.setState(() => ({
      sectionErrors: {},
      strategyDirty: false,
      strategy,
    }))
    this.selectStrategy(strategy)

    if (strategy.defineIndicators) {
      setTimeout(() => {
        this.onDefineIndicatorsChange()
      }, 0)
    }
  }

  onOpenCreateModal = () => {
    this.setState(() => ({
      createNewStrategyModalOpen: true,
      openExistingStrategyModalOpen: false,
      isRemoveModalOpened: false,
      importNewStrategyModalOpen: false,
    }))
  }

  onOpenSelectModal = () => {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: true,
      isRemoveModalOpened: false,
      importNewStrategyModalOpen: false,
    }))
  }

  onExportStrategy = () => {
    const { strategy } = this.state
    let data =  JSON.stringify(strategy)
    const textFileAsBlob = new Blob([data], {type:'application/json'})
    const fileName = `${strategy.label}_exported_strategy.json`
    let downloadLink = document.createElement('a')
    downloadLink.download = fileName
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    downloadLink.click();
    this.onCloseModals()
  }

  onImportStrategyModal = () => {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: false,
      isRemoveModalOpened: false,
      importNewStrategyModalOpen: true,
    }))
  }

  onImportStrategy = (strategy) => {
    const { authToken, onImport, onImportBT } = this.props
    strategy.id = null
    if(strategy.editor === 'backtest') {
      onImport(authToken, strategy)
    } else {
      onImportBT(authToken, strategy)
    }
  }

  onCloseModals = () => {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: false,
      isRemoveModalOpened: false,
      importNewStrategyModalOpen: false,
    }))
  }

  onClearError = () => {
    this.setState(() => ({
      sectionErrors: {},
      execError: '',
    }))
  }

  onSaveStrategy = () => {
    const { authToken, onSave, onSaveBT, strategyId } = this.props
    const { strategy } = this.state
    if(strategy.editor === 'backtest') {
      onSave(authToken, { id: strategyId, ...strategy })
    } else {
      onSaveBT(authToken, { id: strategyId, ...strategy })
    }
    this.setState(() => ({ strategyDirty: false }))
    this.onCloseModals()
  }
  onOpenRemoveModal = () => {
    this.setState(() => ({
      createNewStrategyModalOpen: false,
      openExistingStrategyModalOpen: false,
      isRemoveModalOpened: true,
      importNewStrategyModalOpen: false,
    }))
  }
  onRemoveStrategy = () => {
    const {
      authToken, onRemove, onRemoveBT, onStrategyChange, strategyId,
    } = this.props
    const { strategy } = this.state
    const { id = strategyId } = strategy
    if(strategy.editor === 'backtest') {
      onRemove(authToken, id)
    } else {
      onRemoveBT(authToken, id)
    }
    
    this.setState(() => ({ strategy: null }))
    onStrategyChange(null)
    this.onCloseModals()
  }

  onEditorContentChange = (editor, data, code) => {
    const { activeContent, strategy } = this.state

    this.setState(() => ({ strategyDirty: true }))
    this.updateStrategy({
      ...strategy,
      [activeContent]: code,
    })

    setTimeout(() => {
      if (activeContent === 'defineIndicators') {
        this.onDefineIndicatorsChange() // tracks errors
      } else if (strategy.editor === 'backtest') {
        this.evalSectionContent(activeContent)
      }
    }, 0)
  }

  onActiveContentChange = (activeContent) => {
    this.setState(() => ({ activeContent }))
  }

  onDefineIndicatorsChange = () => {
    const { onIndicatorsChange } = this.props

    if (!onIndicatorsChange) {
      return
    }

    const indicatorFunc = this.evalSectionContent('defineIndicators')
    let indicators = {}

    if (indicatorFunc) {
      try {
        indicators = indicatorFunc(Indicators)
      } catch (e) {
        this.setSectionError('defineIndicators', e.message)
      }
    }

    Object.values(indicators).forEach((i) => {
      i.key = `${nonce()}` // eslint-disable-line
    })

    onIndicatorsChange(indicators)
  }

  onToggleMaximiseEditor = () => {
    this.setState(({ editorMaximised }) => ({
      editorMaximised: !editorMaximised,
    }))
  }

  onSwitchEditorMode = (editorMode) => {
    this.setState(() => ({ editorMode }))
  }

  setSectionError = (section, msg) => {
    this.setState(({ sectionErrors }) => ({
      sectionErrors: {
        ...sectionErrors,
        [section]: msg,
      },
    }))
  }
  selectStrategy = (strategy) => {
    const { onStrategySelect } = this.props
    this.setState(() => ({ strategy }))

    const strategyContent = {}
    let section
    if(strategy.editor === "backtest") {
      this.setState(() => ({ backtrader: false,
      activeContent: 'defineIndicators' }))
      for (let i = 0; i < STRATEGY_SECTIONS.length; i += 1) {
        section = STRATEGY_SECTIONS[i]
        const content = strategy[section]

        if (!_isEmpty(content)) {
          strategyContent[section] = content
        }
      }
    } else {
      this.setState(() => ({ backtrader: true,
      activeContent: 'params' }))
      for (let i = 0; i < BT_STRATEGY_SECTIONS.length; i += 1) {
        section = BT_STRATEGY_SECTIONS[i]
        const content = strategy[section]

        if (!_isEmpty(content)) {
          strategyContent[section] = content
        }
      }
    }
    
    onStrategySelect(strategyContent)
  }
  updateStrategy = (strategy) => {
    const { onStrategyChange } = this.props
    this.setState(() => ({ strategy }))

    const strategyContent = {}
    let section
    if(strategy.editor === "backtest") {
      this.setState(() => ({ backtrader: false }))
      for (let i = 0; i < STRATEGY_SECTIONS.length; i += 1) {
        section = STRATEGY_SECTIONS[i]
        const content = strategy[section]

        if (!_isEmpty(content)) {
          strategyContent[section] = content
        }
      }
    } else {
      this.setState(() => ({ backtrader: true }))
      for (let i = 0; i < BT_STRATEGY_SECTIONS.length; i += 1) {
        section = BT_STRATEGY_SECTIONS[i]
        const content = strategy[section]

        if (!_isEmpty(content)) {
          strategyContent[section] = content
        }
      }
    }
    onStrategyChange(strategyContent)
  }

  clearSectionError = (section) => {
    this.setSectionError(section, '')
  }

  evalSectionContent = (section, providedContent) => {
    const { strategy } = this.state
    const content = providedContent || strategy[section] || ''

    // We don't immediately exec the 2 possible 'define' methods
    if (section.substring(0, 6) === 'define') {
      try {
        const func = eval(content) // eslint-disable-line
        this.clearSectionError(section)
        return func
      } catch (e) {
        this.setSectionError(section, e.message)
        return null
      }
    } else if (section.substring(0, 2) === 'on') {
      try {
        const func = eval(content)({ HFS, HFU, _ }) // eslint-disable-line
        this.clearSectionError(section)
        return func
      } catch (e) {
        this.setSectionError(section, e.message)
        return null
      }
    } else {
      console.error(`unrecognised setion handler prefix: ${section}`)
      return null
    }
  }
  renderPanel = (content) => {
    const {
      strategy, execRunning, strategyDirty, editorMaximised,
      editorMode, dark, isRemoveModalOpened,
    } = this.state

    const {
      moveable, removeable, strategyId, onRemove,
    } = this.props

    return (
      <StrategyEditorPanel
        dark={dark}
        onRemove={onRemove}
        moveable={moveable}
        removeable={removeable}
        execRunning={execRunning}
        strategyDirty={strategyDirty}
        strategy={strategy}
        strategyId={strategyId}
        editorMode={editorMode}
        editorMaximised={editorMaximised}
        onOpenSelectModal={this.onOpenSelectModal}
        onImportStrategyModal={this.onImportStrategyModal}
        onExportStrategy={this.onExportStrategy}
        onOpenCreateModal={this.onOpenCreateModal}
        onOpenRemoveModal={this.onOpenRemoveModal}
        onCloseModals={this.onCloseModals}
        onSaveStrategy={this.onSaveStrategy}
        onRemoveStrategy={this.onRemoveStrategy}
        onSwitchEditorMode={this.onSwitchEditorMode}
        onToggleMaximiseEditor={this.onToggleMaximiseEditor}
        isRemoveModalOpened={isRemoveModalOpened}
      >
        {content}
      </StrategyEditorPanel>
    )
  }

  renderEmptyContent = () => {
    const {
      createNewStrategyModalOpen, openExistingStrategyModalOpen, importNewStrategyModalOpen
    } = this.state
    const { gaCreateStrategy } = this.props

    return (
      <div className='hfui-strategyeditor__empty-content'>
        <div>
          <p
            className='button'
            onClick={this.onOpenCreateModal}
          >
            Create
          </p>
          <p>a new strategy or</p>
          <p
            className='button'
            onClick={this.onOpenSelectModal}
          >
            open
          </p>
          <p>an existing one.</p>
        </div>

        {createNewStrategyModalOpen && (
          <CreateNewStrategyModal
            gaCreateStrategy={gaCreateStrategy}
            onClose={this.onCloseModals}
            onSubmit={this.onCreateNewStrategy}
          />
        )}

        {openExistingStrategyModalOpen && (
          <OpenExistingStrategyModal
            onClose={this.onCloseModals}
            onOpen={this.onLoadStrategy}
          />
        )}

        {importNewStrategyModalOpen && (
          <ImportNewStrategyModal
            onClose={this.onCloseModals}
            onImport={this.onImportStrategy}
          />
        )}
      </div>
    )
  }

  render() {
    const { renderResults, gaCreateStrategy } = this.props
    const {
      execError,
      strategy,
      backtrader,
      activeContent,
      sectionErrors,
      editorMaximised,
      createNewStrategyModalOpen,
      openExistingStrategyModalOpen,
      importNewStrategyModalOpen
    } = this.state

    if (!strategy || _isEmpty(strategy)) {
      return this.renderPanel(this.renderEmptyContent())
    }

    // 1) setup the diagram engine
    const engine = new SRD.DiagramEngine()
    engine.installDefaultFactories()

    // 2) setup the diagram model
    const model = new SRD.DiagramModel()

    // 3) create a default node
    const node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)')
    const port1 = node1.addOutPort('Out')
    node1.setPosition(100, 100)

    // 4) create another default node
    const node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)')
    const port2 = node2.addInPort('In')
    node2.setPosition(400, 100)

    // 5) link the ports
    const link1 = port1.link(port2)

    // 6) add the models to the root graph
    model.addAll(node1, node2, link1)

    // 7) load model into engine
    engine.setDiagramModel(model)

    return this.renderPanel(
      <div className='hfui-strategyeditor__wrapper'>

        {createNewStrategyModalOpen && (
          <CreateNewStrategyModal
            gaCreateStrategy={gaCreateStrategy}
            onClose={this.onCloseModals}
            onSubmit={this.onCreateNewStrategy}
          />
        )}

        {openExistingStrategyModalOpen && (
          <OpenExistingStrategyModal
            onClose={this.onCloseModals}
            onOpen={this.onLoadStrategy}
          />
        )}

        {importNewStrategyModalOpen && (
          <ImportNewStrategyModal
            onClose={this.onCloseModals}
            onImport={this.onImportStrategy}
          />
        )}

        <ul className='hfui-strategyeditor__func-select'>
          {!backtrader && STRATEGY_SECTIONS.map(section => (
            <li
              key={section}
              onClick={this.onActiveContentChange.bind(this, section)}
              className={ClassNames({
                active: activeContent === section,
                hasError: !!sectionErrors[section],
                empty: _isEmpty(strategy[section]),
              })}
            >
              <p>{section}</p>

              {_isEmpty(strategy[activeContent])
                ? null
                : _isEmpty(sectionErrors[activeContent])
                  ? <p>~</p>
                  : <p>*</p>}
            </li>
          ))}
          {backtrader && BT_STRATEGY_SECTIONS.map(section => (
            <li
              key={section}
              onClick={this.onActiveContentChange.bind(this, section)}
              className={ClassNames({
                active: activeContent === section,
                hasError: !!sectionErrors[section],
                empty: _isEmpty(strategy[section]),
              })}
            >
              <p>{section}</p>

              {_isEmpty(strategy[activeContent])
                ? null
                : _isEmpty(sectionErrors[activeContent])
                  ? <p>~</p>
                  : <p>*</p>}
            </li>
          ))}
        </ul>

        <div className='hfui-strategyeditor__content-wrapper'>
          <div
            className={ClassNames('hfui-strategyeditor__editor-wrapper', {
              noresults: !renderResults,
              maximised: editorMaximised,
            })}
          >

            {!backtrader && (
              <CodeMirror
              value={strategy[activeContent] || ''}
              onBeforeChange={this.onEditorContentChange}
              options={{
                mode: {
                  name: 'javascript',
                  json: true,
                },

                theme: 'monokai',
                lineNumbers: true,
                tabSize: 2,
              }}
            />
            )}

            {backtrader && (
              <CodeMirror
              value={strategy[activeContent] || ''}
              onBeforeChange={this.onEditorContentChange}
              options={{
                mode: {
                  name: 'python',
                },

                theme: 'monokai',
                lineNumbers: true,
                tabSize: 2,
              }}
            />
            )}
            

	    {/*<SRD.DiagramWidget diagramEngine={engine} />*/}

            {execError || sectionErrors[activeContent] ? (
              <div className='hfui-strategyeditor__editor-error-output'>
                <i
                  className='fas fa-times-circle'
                  onClick={this.onClearError}
                />

                <pre>{execError || sectionErrors[activeContent]}</pre>
              </div>
            ) : null}
          </div>
        </div>
      </div>,
    )
  }
}
