import React, { PureComponent } from 'react'
import { FlatList, Text } from 'react-native'
import ItemFriend from './ItemFriend'
import { connect } from 'react-redux'
import { setCallStatus } from '../../authentication/AuthenAction'
import { FREE, TYPE_VIDEO, WAITING } from "../constains";

class ListFriend extends PureComponent {
  constructor() {
    super()
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(item, type) {
    if (this.props.callStatus === FREE) {
      this.props.setCallStatus(WAITING)
      this.props.navigation.navigate('Call', {
        receiver: item,
        roomID: this.props.me.id + '_' + item.id + '_' + new Date().getTime(),
        isVideoCall: type === TYPE_VIDEO,
      })
    }
  }
  render() {
    const { friends } = this.props
    if (!friends || friends.length < 1) {
      return <Text>Không có ai!</Text>
    }
    return (
      <FlatList
        data={friends}
        renderItem={({ item }) => <ItemFriend user={item} onPress={this.handlePress} />}
        keyExtractor={(item) => `${item.id}`}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  me: state.authSocket.user,
  friends: state.authSocket.friends,
  callStatus: state.authSocket.callStatus,
})

export default connect(
  mapStateToProps,
  {
    setCallStatus,
  }
)(ListFriend)
