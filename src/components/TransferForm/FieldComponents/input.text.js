import React from 'react'
import ClassNames from 'classnames'
import _isEmpty from 'lodash/isEmpty'

import Input from '../../../ui/Input'
import { propTypes, defaultProps } from './input.text.props'
import {
  renderString, CONVERT_LABELS_TO_PLACEHOLDERS,
} from '../TransferForm.helpers'

export default class NumberInput extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static DEFAULT_VALUE = ''
  static processValue = v => +v
  static validateValue = (v) => {
    return _isEmpty(+v)
      ? null
      : 'Must be a text'
  }

  render() {
    const {
      def = {}, renderData = {}, value, disabled, onChange, validationError,
    } = this.props
    const { label } = def
    const renderedLabel = renderString(label, renderData)
    return (
      <div className={ClassNames('hfui-orderform__input', {
        disabled,
        invalid: !!validationError,
      })}
      >
        <Input
          type='text'
          onChange={onChange}
          disabled={disabled}
          value={value}
          placeholder={CONVERT_LABELS_TO_PLACEHOLDERS ? renderedLabel : undefined}
        />

        {!CONVERT_LABELS_TO_PLACEHOLDERS && (
          <p className='hfui-orderform__input-label'>
            {renderedLabel}
          </p>
        )}

        {validationError && (
          <p className='hfui-orderform__input-error-label'>
            {validationError}
          </p>
        )}
      </div>
    )
  }
}
