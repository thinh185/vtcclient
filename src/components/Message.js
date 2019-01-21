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

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 4000,
      useNativeDriver: true,
      toValue: 0,
    }).start()
  }

  reverse = () => {
    Animated.timing(this.state.opacity, {
      duration: 4000,
      useNativeDriver: true,
      toValue: 1,
    }).start()
  }

  // handleOnLayout = () => {
  //   this.reverse()
  // };

  render() {
    const { opacity } = this.state
    return (
      <Animated.View
        style={[
          this.props.style,
          { opacity },
        ]}
      >
        <View style={stylesLive.chatItem}>
          <View style={stylesLive.wrapAvatar}>
            <Image
              source={require('../assets/ico_heart.png')}
              style={stylesLive.iconAvatar}
            />
          </View>
          <View style={stylesLive.messageItem}>
            <Text style={stylesLive.name}>thinh</Text>
            <Text style={stylesLive.content}>den vl</Text>
          </View>
        </View>
      </Animated.View>
    )
  }
}
