import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import { createLogger } from 'redux-logger'
import './index.css'
import './reset.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// import reducer from './reducers'
import {store} from './store'

// export const store = createStore(reducer, applyMiddleware(createLogger()))
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'))
registerServiceWorker()
