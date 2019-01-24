import React, { Component } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native'
import styles from './styles'
import SocketUtils from '~/SocketUtils'

class Reaction extends Component {
  constructor(props) {
    super(props)

    this.animatedValue = new Animated.Value(1)
    this.animatedMargin = new Animated.Value(0)
  }

  componentDidMount() {
    this[`animation${this.props.type}`].play()
  }

  getReactionJson = (type) => {
    switch (type) {
      case 'Angry':
        return require('../../assets/animations/angry_emoji.json')
      case 'Laugh':
        return require('../../assets/animations/laugh.json')
      case 'Wow':
        return require('../../assets/animations/wow.json')
      case 'Like':
        return require('../../assets/animations/like.json')
      case 'ThumpUp':
        return require('../../assets/animations/thumpup.json')
      default:
        return require('../../assets/animations/crying.json')
    }
  };

  onPressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 2,
    }).start()
    Animated.spring(this.animatedMargin, {
      toValue: 16,
    }).start()
  };

  onPressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
    }).start()
    Animated.spring(this.animatedMargin, {
      toValue: 0,
    }).start()
  };

  onPressSendInteraction = () => {
    const { type } = this.props
    // this.props.updateState()
    console.log('type ', type)

    SocketUtils.emitSendHeart(this.props.streamOnline.roomName, type)
  }

  render() {
    const { type } = this.props
    console.log('type Render request ', type)

    const animatedStyle = {
      transform: [{ scale: this.animatedValue }],
      paddingBottom: this.animatedMargin,
    }
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={this.onPressSendInteraction}
      >
        <Animated.View style={[styles.reactView, animatedStyle]}>
          <LottieView
            ref={(animation) => {
              this[`animation${type}`] = animation
            }}
            style={styles.reaction}
            source={this.getReactionJson(type)}
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  const { list_live, streamOnline } = state.stream

  const res = {
    user: state.user.user,
    streamOnline,
  }
  if (state.stream.streamOnline) {
    res.deltailStream = list_live.filter(el => el.roomName === streamOnline.roomName)[0] || {}
  } else {
    res.deltailStream = {}
  }
  return res
}

export default connect(mapStateToProps)(Reaction)
