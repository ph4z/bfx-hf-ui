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
  onStrategyLoad: PropTypes.func.isRequired,
}
  static defaultProps = {}

  state = {
    strategy: null,
    error: '',
  }

  jquerycode = () => {
    $(".upload").on("change", function () {
          onStrategyLoad(this.files[0])
      })
  }

  componentDidMount() {
    this.jquerycode()
  }

  onStrategyLoad = (file) => {
    const reader = new FileReader()
    reader.onload = function(evt) {
      const strategyRaw = evt.target.result
      console.log(strategyRaw)
      const strategy = JSON.parse(strategyRaw)
      this.setState(() => ({ strategy }))
      console.log(strategy)
    }
    reader.readAsText(file)
  }

  onSubmit = () => {
    const { strategy } = this.state
    const { onClose, onImport } = this.props
    console.log(strategy)
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

      <form>
        <Input
          type='file'
          accept='.json'
          className='upload'
        />
      </form>

        {!_isEmpty(error) && (
          <p className='error'>{error}</p>
        )}
      </Modal>
    )
  }
}
