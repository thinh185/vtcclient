import React, { Component } from 'react'
import { Animated, View, Image, Text } from 'react-native'
import { stylesLive } from 'screens/styles'

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opacity: new Animated.Value(1),
    }
  }

  changeLayout = () => {
    // Animated.timing(this.state.opacity, {
    //   duration: 8000,
    //   useNativeDriver: true,
    //   toValue: 0,
    // }).start()
  }

  render() {
    const { opacity } = this.state
    const { message } = this.props
    return (
      <Animated.View
        style={[
          this.props.style,
          { opacity },
        ]}
        onLayout={this.changeLayout}
      >
        <View style={stylesLive.chatItem}>
          <View style={stylesLive.wrapAvatar}>
            <Image
              source={require('../assets/avatar_1.png')}
              style={stylesLive.iconAvatar}
            />
          </View>
          <View style={stylesLive.messageItem}>
            <Text style={stylesLive.name}>{message.username}</Text>
            <Text style={stylesLive.content}>{message.message}</Text>
          </View>
        </View>
      </Animated.View>
    )
  }
}
