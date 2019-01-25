import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Reaction from 'components/ReactionContainer/Reaction'
import AnimatedShape from './AnimatedShape'


class FloatingReaction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hearts: [],
      height: null,
    }
  }


  createHeart(index) {
    return {
      id: index,
      right: getRandomNumber(50, 150),
    }
  }

  removeHeart(id) {
    this.setState({
      hearts: this.state.hearts.filter(heart => heart.id !== id),
    })
  }

  componentWillUpdate(nextProps) {
    const oldCount = this.props.count
    const newCount = nextProps.count
    const numHearts = newCount - oldCount

    if (numHearts <= 0) {
      return
    }

    const items = Array(numHearts).fill()
    const newHearts = items
      .map((item, i) => oldCount + i)
      .map(this.createHeart)

    this.setState({ hearts: this.state.hearts.concat(newHearts) })
  }

  handleOnLayout = (e) => {
    const height = e.nativeEvent.layout.height

    this.setState({ height })
  };

  render() {
    const { height } = this.state
    const { color } = this.props
    const isReady = height !== null

    const heartProps = {}
    if (color !== null) {
      heartProps.color = color
    }
    console.log('floating emoji ', this.props.type)

    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={this.handleOnLayout}
        pointerEvents="none"
      >
        {isReady
          && this.state.hearts.map(({ id, right }) => (
            <AnimatedShape
              key={id}
              height={height}
              style={{ right }}
              onComplete={this.removeHeart.bind(this, id)}
            >
              {this.props.type === 'Sad' ? (
                <View style={{ backgroundColor: 'white', borderRadius: 50 }}>
                  <Reaction type={this.props.type} />
                </View>
              )
                : <Reaction type={this.props.type} />
              }


            </AnimatedShape>
          ))}
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

export default FloatingReaction
