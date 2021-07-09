import React from 'react'

import StatusBar from '../../components/StatusBar'

import { propTypes, defaultProps } from './Reports.props'
import './style.css'

export default class Portfolio extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    this.grid = React.createRef()
  }


  render() {
    const reportURL = process.env.REACT_APP_REPORT_URL
    return (
      <>
        <div className='hfui-report__wrapper'>
          <div className='hfui-report__content'>
            <iframe title="report" src={ reportURL }  frameBorder="0" style={{height: '90%', width: '100%'}} allowFullScreen></iframe>
          </div>
          <StatusBar />
        </div>
      </>
    )
  }
}
