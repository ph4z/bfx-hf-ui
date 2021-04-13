import React from 'react'
import ClassNames from 'classnames'

import Scrollbars from '../../ui/Scrollbars'
import { propTypes, defaultProps } from './TransferFormModal.props'

export default class TransferFormModal extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const {
      content, className, icon, title, form, buttons, onClick, titleColor, apiClientConnecting, isModal = true,
    } = this.props

    return (
      <div className={ClassNames([{ 'hfui-transferform__modal-wrapper': isModal, 'hfui-transferform__wrapper-nomodal': !isModal }, className])}>
        <Scrollbars>
          <div
            role='button'
            tabIndex={0}
            className='hfui-transferform__modal-inner fullheight'
            onClick={onClick}
          >
            {icon && (<i className={icon} />)}
            {title && (
              <p
                style={!titleColor ? {} : {
                  color: titleColor,
                }}
              >
                {title}
              </p>
            )}

            {content && (content)}

            {form && (
              <div className='hfui-transferform__modal-form'>
                {form}
              </div>
            )}

            {buttons && (
              <div className='hfui-transferform__modal-buttons'>
                {buttons}
              </div>
            )}

            {apiClientConnecting && (
              <span>
                Connecting to exchange...
              </span>
            )}
          </div>
        </Scrollbars>
      </div>
    )
  }
}
