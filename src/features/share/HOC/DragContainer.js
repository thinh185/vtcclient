import React, { Component } from 'react'
import { PanResponder, Animated, Dimensions, StatusBar, Platform, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0
const { width, height } = Dimensions.get('window')
const widthScreen = width
const heightScreen = height - statusBarHeight
const halfWidthScreen = widthScreen / 2
const halfHeightScreen = heightScreen / 2
const dragComponent = (Comp) => {
  class DragComponent extends Component {
    constructor(props) {
      super(props)

      // Constant
      this.delta = {
        x: widthScreen - this.props.dragComponentStyle.width - props.paddingDragComponent,
        y: heightScreen - this.props.dragComponentStyle.height - props.paddingDragComponent,
      }

      // Position start of 4 corner
      this.fixedPosition = [
        { x: props.paddingDragComponent, y: props.paddingDragComponent, corner: 1 },
        { x: this.delta.x, y: props.paddingDragComponent, corner: 2 },
        { x: props.paddingDragComponent, y: this.delta.y, corner: 3 },
        { x: this.delta.x, y: this.delta.y, corner: 4 },
      ]

      // Add a listener for the delta value change
      this.corner = props.corner
      const initPosition = this.fixedPosition.filter((item) => item.corner === this.corner)[0]
      this._animatedValueX = initPosition.x
      this._animatedValueY = initPosition.y

      this.state = {
        pan: new Animated.ValueXY({ x: this._animatedValueX, y: this._animatedValueY }),
      }

      // Initialize PanResponder with move handling
      this._panResponder = this.initPanResponder()
    }

    initPanResponder() {
      return PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderGrant: () => {
          this.state.pan.setOffset({ x: this._animatedValueX, y: this._animatedValueY })
          this.state.pan.setValue({ x: 0, y: 0 })
        },
        onPanResponderMove: (e, gestureState) => {
          return Animated.event([null, { dx: this.state.pan.x, dy: this.state.pan.y }])(e, gestureState)
        },
        onPanResponderRelease: (e, gestureState) => this.onPanResponderRelease(gestureState),
      })
    }

    onPanResponderRelease(gestureState) {
      let newCorner
      if (gestureState.moveX >= halfWidthScreen && gestureState.moveY >= halfHeightScreen) {
        newCorner = 4
      } else if (gestureState.moveX >= halfWidthScreen && gestureState.moveY < halfHeightScreen) {
        newCorner = 2
      } else if (gestureState.moveX < halfWidthScreen && gestureState.moveY >= halfHeightScreen) {
        newCorner = 3
      } else {
        newCorner = 1
      }

      Animated.spring(this.state.pan, {
        toValue: this.setToValueAnimated(newCorner),
        useNativeDriver: false,
      }).start()
      this.corner = newCorner
    }

    setToValueAnimated(endCorner) {
      const startCorner = this.corner
      const startPosition = this.fixedPosition.filter((item) => item.corner === startCorner)[0]
      const endPosition = this.fixedPosition.filter((item) => item.corner === endCorner)[0]

      return { x: endPosition.x - startPosition.x, y: endPosition.y - startPosition.y }
    }

    componentDidMount() {
      this.state.pan.x.addListener((value) => (this._animatedValueX = value.value))
      this.state.pan.y.addListener((value) => (this._animatedValueY = value.value))
    }

    componentWillUnmount() {
      this.state.pan.x.removeAllListeners()
      this.state.pan.y.removeAllListeners()
    }

    getStyle() {
      return [
        this.props.dragComponentStyle,
        {
          transform: [
            {
              translateX: this.state.pan.x,
            },
            {
              translateY: this.state.pan.y,
            },
          ],
        },
      ]
    }

    render() {
      return (
        <Animated.View style={this.getStyle()} {...this._panResponder.panHandlers}>
          <TouchableWithoutFeedback>
            <Comp {...this.props} />
          </TouchableWithoutFeedback>
        </Animated.View>
      )
    }
  }

  DragComponent.defaultProps = {
    dragComponentStyle: {
      height: 100,
      width: 100,
      backgroundColor: 'black',
    },
    corner: 2,
    paddingDragComponent: 10,
  }
  DragComponent.propTypes = {
    dragComponentStyle: PropTypes.object,
    corner: PropTypes.number,
    paddingDragComponent: PropTypes.number,
  }
  return DragComponent
}

export default dragComponent
