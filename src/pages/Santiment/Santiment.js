import React from 'react'

import StatusBar from '../../components/StatusBar'

import { propTypes, defaultProps } from './Santiment.props'
import './style.css'

export default class Santiment extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.grid = React.createRef()
  }


  render() {
    const santimentURL = process.env.REACT_APP_SANTIMENT_URL
    return (
      <>
        <div className='hfui-santiment__wrapper'>
          <div className='hfui-santiment__content'>
            <iframe title="report" src={ santimentURL }  frameBorder="0" style={{height: '90%', width: '100%'}} allowFullScreen></iframe>
          </div>
          <StatusBar />
        </div>
      </>
    )
  }
}