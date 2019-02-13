import React, { Component } from 'react'
import { Animated, View, Image, Text, StyleSheet } from 'react-native'

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
      <Animated.View style={[this.props.style, { opacity }]} onLayout={this.changeLayout}>
        <View style={styles.chatItem}>
          <View style={styles.wrapAvatar}>
            <Image source={require('assets/avatar_1.png')} style={styles.iconAvatar} />
          </View>
          <View style={styles.messageItem}>
            <Text style={styles.name}>{message.username}</Text>
            <Text style={styles.content}>{message.message}</Text>
          </View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  chatItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  messageItem: {
    flexDirection: 'column',
    marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  iconAvatar: {
    width: 44,
    height: 44,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
  },
  content: {
    fontSize: 13,
  },
})
