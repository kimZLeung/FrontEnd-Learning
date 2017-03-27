import React from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import * as myAction from '../constants/actionType.js'
import Login from '../components/Login.js'
import ChatBox from '../components/ChatBox.js'
import Text from '../components/Text.js'
var io = require('io')


export default class App extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.socket = io.connect()
    var sk = this.socket
    sk.on('Login', function() {
      // todo
    })
  }


  render() {
    // const {  } = this.props
    return (
      <div id='container' ref = {(con) => (this.con = con)}>
        <Login />
        <ChatBox />
        <Text />
      </div>
    )
  }
}

// function mapStateToProps(state, ownProps) {
//   return {
//     chat: state.chat,
//     log: state.log
//   }
// }
//
// function mapDispatchToProps(dispatch, ownProps) {
//   return {
//     disp: bindActionCreators(myAction, dispatch)
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(App)
