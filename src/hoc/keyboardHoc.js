import React, { Component } from 'react'
import { LayoutAnimation, Platform, Keyboard, AppState } from 'react-native'

export default function keyboardHoc(WrappedComponent) {
  return class extends Component {
    state = { moveAway: false }

    componentDidMount() {
      let keyboardShowEvent = 'keyboardWillShow'
      let keyboardHideEvent = 'keyboardWillHide'

      if (Platform.OS === 'android') {
        keyboardShowEvent = 'keyboardDidShow'
        keyboardHideEvent = 'keyboardDidHide'
      }
      this.keyboardShowListener = Keyboard.addListener(keyboardShowEvent, e => this.keyboardShow(e))
      this.keyboardHideListener = Keyboard.addListener(keyboardHideEvent, e => this.keyboardHide(e))
      AppState.addEventListener('change', this.handleAppStateChange)
    }

    componentWillUnmount() {
      this.navListenerBlur.remove()
      this.navListenerFocus.remove()
      AppState.removeEventListener('change', this.handleAppStateChange)
    }

    handleAppStateChange = (nextAppState) => {
      console.log(nextAppState)
    }

    keyboardShow() {
      LayoutAnimation.easeInEaseOut()
    }

    keyboardHide() {
      LayoutAnimation.easeInEaseOut()
    }

    render() {
      return (
        <WrappedComponent
          moveAway={this.state.moveAway}
          {...this.props}
        />
      )
    }
  }
}
