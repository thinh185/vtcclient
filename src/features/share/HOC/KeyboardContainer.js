import React, { Component } from 'react'
import { Platform, Keyboard } from 'react-native'

const PlatformIOS = Platform.OS === 'ios'

const KeyboardScreen = (Comp) => {
  class KeyboardContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        onShowKeyboard: false,
      }
    }

    componentDidMount() {
      if (PlatformIOS) {
        this.keyboardEventListeners = [
          Keyboard.addListener('keyboardWillShow', this.keyboardShow),
          Keyboard.addListener('keyboardWillHide', this.keyboardHide),
        ]
      } else {
        this.keyboardEventListeners = [
          Keyboard.addListener('keyboardDidShow', this.keyboardShow),
          Keyboard.addListener('keyboardDidHide', this.keyboardHide),
        ]
      }
    }

    componentWillUnmount() {
      this.keyboardEventListeners.forEach(eventListener => eventListener.remove())
    }

    keyboardShow = () => {
      this.setState({ onShowKeyboard: true })
    }

    keyboardHide = () => {
      this.setState({ onShowKeyboard: false })
    }

    render() {
      return (
        <Comp {...this.props} onShowKeyboard={this.state.onShowKeyboard} />
      )
    }
  }
  return KeyboardContainer
}

export default KeyboardScreen
