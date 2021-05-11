import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Templates from '../StrategyEditor/templates'
import BT_Templates from '../StrategyEditor/bt_templates'

import Input from '../../ui/Input'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Dropdown from '../../ui/Dropdown'

import PropTypes from 'prop-types'
import './style.css'

export default class CreateNewStrategyModal extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    gaCreateStrategy: PropTypes.func,
  }
  static defaultProps = {
    gaCreateStrategy: () => {},
  }

  state = {
    label: '',
    error: '',
    editor: 'backtest',
    template: 'Blank',
    templates: Templates
  }

  onLabelChange = (label) => {
    this.setState(() => ({ label }))
  }

  onEditorChange = (editor) => {
    this.setState(() => ({ editor }))
    if(editor === "backtest") {
      this.setState(() => ({ templates: Templates  }))
    } else {
      this.setState(() => ({ templates: BT_Templates  }))
    }
    this.render()
  }

  onTemplateChange = (template) => {
    this.setState(() => ({ template }))
  }

  onSubmit = () => {
    const { label, editor, template } = this.state
    const { onSubmit, onClose, gaCreateStrategy } = this.props

    if (_isEmpty(label)) {
      this.setState(() => ({ error: 'Label empty' }))
      return
    }
    gaCreateStrategy()

    onSubmit(label, editor, template)
    onClose()
  }

  render() {
    const { onClose } = this.props
    const { label, error, editor, template, templates } = this.state
 
    return (
      <Modal
        onClose={onClose}
        className='hfui-createnewstrategymodal__wrapper'
        label='Create a New Strategy'
        actions={(
          <Button
            green
            label='Create'
            onClick={this.onSubmit}
          />
        )}
      >

        <Input
          type='text'
          placeholder='Label'
          value={label}
          onChange={this.onLabelChange}
        />

        <Dropdown
          value={editor}
          onChange={this.onEditorChange}
          options={
            [{
              label: "Backtest",
              value: "backtest"
            },
            {
              label: "Backtrader",
              value: "backtrader"
            }]
          }
        />

        <Dropdown
          value={template}
          onChange={this.onTemplateChange}
          options={templates.map(t => ({
            label: t.label,
            value: t.label,
          }))}
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
