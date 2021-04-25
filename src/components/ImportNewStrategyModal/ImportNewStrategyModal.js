import React from 'react'
import $ from 'jquery'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Input from '../../ui/Input'

import './style.css'

export default class ImportNewStrategyModal extends React.PureComponent {
  static propTypes = {
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
}
  static defaultProps = {}

  state = {
    strategy: null,
    error: '',
  }

  componentDidMount() {
    this.onStrategyLoad()
  }

  onStrategyLoad = () => {
    $(".upload").on("change", (res) => {
          const file = (res.target.files[0])
          const reader = new FileReader()
          reader.onload = (evt) => {
            const strategy = JSON.parse(evt.target.result)
            this.setState(() => ({ strategy }))
          }
          reader.readAsText(file)
      })
  }

  onSubmit = () => {
    const { strategy } = this.state
    const { onClose, onImport } = this.props
    if (!strategy) {
      console.log('strategy not found')
      return
    }

    onImport(strategy)
    onClose()
  }

  render() {
    const { onClose } = this.props
    const { error } = this.state

    return (
      <Modal
        onClose={onClose}
        className='hfui-importnewstrategymodal__wrapper'
        label='Import Strategy'
        actions={(
          <Button
            onClick={this.onSubmit}
            label='Import'
            green
          />
        )}
      >

        <Input
          type='file'
          accept='.json'
          className='upload'
        />

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
