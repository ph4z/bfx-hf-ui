import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'

import './index.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css'
import '@blueprintjs/select/lib/css/blueprint-select.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import 'codemirror/mode/javascript/javascript'

import HFUI from './components/HFUI'
import registerServiceWorker from './registerServiceWorker'
import StoreWrapper from './StoreWrapper'

const history = createBrowserHistory()

ReactDOM.render((
  <StoreWrapper>
    <ConnectedRouter history={history}>
      <HFUI />
    </ConnectedRouter>
  </StoreWrapper>
), document.getElementById('root'))

registerServiceWorker()