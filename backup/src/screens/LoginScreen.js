import React from 'react'
import { LoginContainer } from 'features/videocall/components'

class LoginScreen extends React.Component {
  render() {
    return <LoginContainer navigation={this.props.navigation} />
  }
}

export default LoginScreen
