// @flow
import './index.css'

import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('root')
function mountTheApp () {
  console.log('Mount the app ')
  if (root !== null) {
    ReactDOM.render(<App />, root)
  }
}
function getEdgeProvider (callback: Function) {
  if (window.edgeProvider != null) {
    callback(window.edgeProvider)
  } else {
    document.addEventListener('edgeProviderReady', function () {
      callback(window.edgeProvider)
    })
  }
}

if (window.navigator.userAgent.indexOf('app.edge') >= 0) {
  getEdgeProvider(mountTheApp)
}
