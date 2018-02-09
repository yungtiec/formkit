import 'normalize.css'
import './layout.scss'
import './utils.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'jQuery'
import 'Tether'
import 'bootstrap/dist/js/bootstrap.min.js'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)
