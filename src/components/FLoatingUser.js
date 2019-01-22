import React, { Component } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { RowContainer } from 'components/common/SComponent'
import AnimatedShape from './AnimatedShape'
import { stylesLive } from './styles'

class FloatingUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: null,
    }
  }

  handleOnLayout = (e) => {
    const height = e.nativeEvent.layout.height

    this.setState({ height })
  };

  render() {
    const { height } = this.state
    const { user } = this.props
    const isReady = height !== null
    if (!user) return null
    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this.handleOnLayout}
        pointerEvents="none"
        onComplete={() => {}}
      >

        {isReady
          && (
            <AnimatedShape
              key={user._id}
              height={height}
              style={{ right: getRandomNumber(50, 150) }}
            >
              <RowContainer>
                <Image
                  source={require('../assets/avatar_1.png')}
                  style={stylesLive.iconAvatar}
                />
                <Text style={stylesLive.name}>{user.username}</Text>
              </RowContainer>
            </AnimatedShape>
          )}
      </View>
    )
  }
}

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

const getRandomNumber = (min, max) => Math.random() * (max - min) + min

export default FloatingUser
