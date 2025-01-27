import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Button from '../../ui/Button'
import Input from '../../ui/Input'
import { propTypes, defaultProps } from './AuthenticationInitForm.props'

export default class AuthenticationInit extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    password: '',
    username: '',
    confirmPassword: '',
    error: '',
  }

  constructor(props) {
    super(props)

    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onRegister = this.onRegister.bind(this)
  }

  onRegister() {
    const { onRegister } = this.props
    onRegister()
  }
  onPasswordChange(password) {
    this.setState(() => ({ password }))
  }

  onUsernameChange(username) {
    this.setState(() => ({ username }))
  }

  onConfirmPasswordChange(confirmPassword) {
    this.setState(() => ({ confirmPassword }))
  }

  onSubmit() {
    const { username, password, confirmPassword } = this.state
    const { onInit } = this.props

    if (password !== confirmPassword) {
      this.setState(() => ({ error: 'Passwords do not match' }))
      return
    }

    this.setState(() => ({ error: '' }))
    onInit(username, password)
  }

  render() {
    const { username, password, confirmPassword, error } = this.state
    const submitReady = (
      (!_isEmpty(password) && !_isEmpty(confirmPassword))
      && (password === confirmPassword)
    )

    return (
      <div className='hfui-authenticationpage__content'>
        <h2>Honey Framework UI</h2>
        <p>Create a new account</p>

        <form className='hfui-authenticationpage__inner-form'>
          <Input
            type='text'
            name='username'
            placeholder='Email'
            autocomplete='username'
            value={username}
            onChange={this.onUsernameChange}
            //style={{ display: 'none' }}
          />

          <Input
            type='password'
            autocomplete='new-password'
            placeholder='Password'
            value={password}
            onChange={this.onPasswordChange}
          />

          <Input
            type='password'
            autocomplete='new-password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={this.onConfirmPasswordChange}
          />

          <Button
            onClick={this.onSubmit}
            disabled={!submitReady}
            label='Save Credentials'
            green
          />

          <p>Already have an account ? Sign-In</p>

          <Button
            onClick={this.onRegister}
            label='Sign-In'
            green
          />

          {error && (
            <p className='hfui-authenticationpage__inner-error'>
              {error}
            </p>
          )}
        </form>
      </div>
    )
  }
}
