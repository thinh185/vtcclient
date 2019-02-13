import React from 'react'
import ReceiveCallContainer from 'features/videocall/components/ReceiveCallContainer'

class SendCallScreen extends React.Component {
  render() {
    return <ReceiveCallContainer navigation={this.props.navigation} />
  }
}

export default SendCallScreen
