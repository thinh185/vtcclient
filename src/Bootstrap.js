// Bootstrap services need to run first
import React from 'react'
import { configApi } from 'utils/apisaure'

class Bootstrap extends React.Component {
  componentWillMount() {
    configApi(this.props.token)
  }

  componentWillReceiveProps() {
    this.initWebSocketForChat()
  }

  render() {
    return this.props.children
  }
}

export default (Bootstrap)
