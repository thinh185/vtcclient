import React, { Component } from 'react'
import { Animated, StyleSheet } from 'react-native'

export default class AnimatedShape extends Component {
  constructor(props) {
    super(props)

    this.state = {
      position: new Animated.Value(0),
      animationsReady: false,
    }
  }

  componentDidMount() {
    const { time } = this.props
    Animated.timing(this.state.position, {
      duration: time || 4800,
      useNativeDriver: true,
      toValue: this.props.height * -1,
    }).start(this.props.onComplete)
  }

  getAnimationStyle() {
    if (!this.state.animationsReady) {
      return { opacity: 0 }
    }

    return {
      transform: [
        { translateY: this.state.position },
        { translateX: this.xAnimation },
        { scale: this.scaleAnimation },
        { rotate: this.rotateAnimation },
      ],
      opacity: this.opacityAnimation,
    }
  }

  handleOnLayout = (e) => {
    if (this.rendered) {
      return null
    }

    this.rendered = true

    const height = Math.ceil(this.props.height)
    const negativeHeight = height * -1
    const shapeHeight = e.nativeEvent.layout.height

    this.yAnimation = this.state.position.interpolate({
      inputRange: [negativeHeight, 0],
      outputRange: [height, 0],
    })

    this.opacityAnimation = this.yAnimation.interpolate({
      inputRange: [0, height - shapeHeight],
      outputRange: [1, 0],
    })

    this.scaleAnimation = this.yAnimation.interpolate({
      inputRange: [0, 15, 30, height],
      outputRange: [0, 1.2, 1, 1],
    })

    this.xAnimation = this.yAnimation.interpolate({
      inputRange: [0, height / 2, height],
      outputRange: [0, 15, 0],
    })

    this.rotateAnimation = this.yAnimation.interpolate({
      inputRange: [0, height / 4, height / 3, height / 2, height],
      outputRange: ['0deg', '-2deg', '0deg', '2deg', '0deg'],
    })

    this.setState({ animationsReady: true })
    // setTimeout(() => this.setState({ animationsReady: true }), 16);
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.shapeWrapper,
          this.getAnimationStyle(),
          this.props.style,
        ]}
        onLayout={this.handleOnLayout}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

/**
 * Styles
 */

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },

  shapeWrapper: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
})
