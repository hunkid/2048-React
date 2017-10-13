import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import './reset.css'
// import Board from './components/Board'
import Chess from './containers/Chess'
import registerServiceWorker from './registerServiceWorker'

import reducer from './reducers'

const store = createStore(reducer)
ReactDOM.render(
  <Provider store={store}>
    <Chess>
    </Chess>
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
