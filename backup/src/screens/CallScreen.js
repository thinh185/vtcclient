import React from 'react'
import CallContainer from 'features/videocall/components/CallContainer'

class CallScreen extends React.Component {
  render() {
    return <CallContainer navigation={this.props.navigation} />
  }
}

export default CallScreen
