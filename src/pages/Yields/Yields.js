import React from 'react'

import StatusBar from '../../components/StatusBar'

import { propTypes, defaultProps } from './Yields.props'
import './style.css'

export default class Portfolio extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.grid = React.createRef()
  }


  render() {
    const yieldsURL = process.env.REACT_APP_YIELD_URL
    return (
      <>
        <div className='hfui-yields__wrapper'>
          <div className='hfui-yields__content'>
            <iframe title="report" src={ yieldsURL }  frameBorder="0" style={{height: '90%', width: '100%'}} allowFullScreen></iframe>
          </div>
          <StatusBar />
        </div>
      </>
    )
  }
}
