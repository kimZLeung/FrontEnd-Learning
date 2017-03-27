import App from './container/App.js'
import ReactDOM from 'react-dom'
import React from 'react'
// import { Provider } from 'react-redux'
// import store from './store/store.js'
//
// document.getElementById('app').innerHTML = '666'
// var socket = io.connect();
// chatBox();


ReactDOM.render(
  // <Provider store={ store }>
  <div>
    <App />
  </div>,
  // </Provider>,
  document.getElementById('app')
)

// 启用JS的热部署
if(module.hot) {
	module.hot.accept()
}