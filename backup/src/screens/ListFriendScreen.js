import React from 'react'
import { ListFriend } from 'features/videocall/components'
import MainContainerHOC from 'features/videocall/components/HOC/MainContainerHOC'
const Container = MainContainerHOC(ListFriend)

class ListFriendScreen extends React.Component {
  render() {
    return <Container navigation={this.props.navigation} />
  }
}
export default ListFriendScreen
