import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  LayoutAnimation,
  StatusBar,
  Animated,
} from 'react-native'
import { RowContainer, Container, StartColumnContainer } from 'components/common/SComponent'
import KeyboardAccessory from 'react-native-sticky-keyboard-accessory'
import { NodePlayerView } from 'react-native-nodemediaclient'
import FloatingHearts from 'components/FloatingHearts'
import { connect } from 'react-redux'
import { getLinkStreamAction } from 'actions/streamAction'
import Message from 'components/Message'
import navigator from 'navigations/customNavigator'
import SocketUtils from '../SocketUtils'
import { stylesLive } from './styles'

class ViewStreamScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      keyboardHeight: 0,
      roomName: '',
      opacityMessage: new Animated.Value(1),
    }
    this.back = this.back.bind(this)
  }

  componentDidMount = () => {
    let keyboardShowEvent = 'keyboardWillShow'
    let keyboardHideEvent = 'keyboardWillHide'
    const { user } = this.props
    if (Platform.OS === 'android') {
      keyboardShowEvent = 'keyboardDidShow'
      keyboardHideEvent = 'keyboardDidHide'
    }
    this.keyboardShowListener = Keyboard.addListener(keyboardShowEvent, e => this.keyboardShow(e))
    this.keyboardHideListener = Keyboard.addListener(keyboardHideEvent, e => this.keyboardHide(e))
    const roomName = this.props.navigation.getParam('roomName')
    this.setState({ roomName })
    SocketUtils.emitJoinServer(roomName, user._id)
    this.props.getLinkStreamAction()
  };

  alertStreamerNotReady = () => {
    return Alert.alert('Alert', 'Streamer not ready to live stream yet', [
      {
        text: 'Close',
        onPress: () => {
          SocketUtils.emitLeaveServer(this.state.roomName, this.props.user._id)
          this.props.navigation.goBack()
        },
      },
    ])
  };

  keyboardShow(e) {
    LayoutAnimation.easeInEaseOut()
    this.setState({
      keyboardHeight: e.endCoordinates.height,
    })
  }

  keyboardHide() {
    LayoutAnimation.easeInEaseOut()
    this.setState({
      keyboardHeight: 0,
    })
  }

  onPressHeart = () => {
    SocketUtils.emitSendHeart(this.props.navigation.getParam('roomName'))
  };


  onChangeMessageText = (text) => {
    this.setState({ message: text })
  };

  onPressSend = () => {
    const {
      message,
    } = this.state
    const { user } = this.props
    if (message.trim() === '') return
    SocketUtils.emitSendMessage(this.props.navigation.getParam('roomName'), user._id, message, user.username)
    this.setState({ message: '' })
    Keyboard.dismiss()
  };

  onPressCancelViewer = () => {
    if (this.vbViewer !== null && this.vbViewer !== undefined) {
      this.vbViewer.stop()
      this.props.navigation.goBack()
    }

    SocketUtils.emitLeaveServer(this.props.navigation.getParam('roomName'), this.props.user._id)
  };

  renderCancelViewerButton = () => {
    return (
      <TouchableOpacity
        style={stylesLive.buttonCancel}
        onPress={this.onPressCancelViewer}
      >
        <Image
          source={require('../assets/ico_cancel.png')}
          style={stylesLive.iconCancel}
        />
      </TouchableOpacity>
    )
  };

  renderGroupInput = () => {
    const { message } = this.state
    if (Platform.OS === 'android') {
      return (
        <View
          style={{
            flex: 1,
            height: this.state.keyboardHeight,
            zIndex: 2,
          }}
        >
          <View style={stylesLive.wrapBottom}>

            <View style={stylesLive.wrapInputAndActionButton}>
              <TextInput
                style={stylesLive.textInput}
                placeholder="Comment input"
                underlineColorAndroid="transparent"
                onChangeText={this.onChangeMessageText}
                value={message}
                onEndEditing={this.onPressSend}
                autoCapitalize="none"
                autoCorrect={false}

              />
              <TouchableOpacity
                style={stylesLive.wrapIconSend}
                onPress={this.onPressSend}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/ico_send.png')}
                  style={stylesLive.iconSend}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesLive.wrapIconHeart}
                onPress={this.onPressHeart}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/ico_heart.png')}
                  style={stylesLive.iconHeart}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    return (
      <KeyboardAccessory backgroundColor="transparent">
        <View style={stylesLive.wrapBottomIOS}>
          <View style={stylesLive.col}>

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                height: 45,
                marginHorizontal: 10,
                marginBottom: 10,
                borderRadius: 10,
                alignItems: 'center',
              }}
              onLayout={this.setDropZoneValues}
            >
              <TextInput
                style={stylesLive.textInput}
                placeholder="Comment input"
                underlineColorAndroid="transparent"
                onChangeText={this.onChangeMessageText}
                value={message}
                onEndEditing={this.onPressSend}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={stylesLive.wrapIconSend}
                onPress={this.onPressSend}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/ico_send.png')}
                  style={stylesLive.iconSend}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesLive.wrapIconHeart}
                onPress={this.onPressHeart}
                activeOpacity={0.6}
              >
                <Image
                  source={require('../assets/ico_heart.png')}
                  style={stylesLive.iconHeart}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAccessory>
    )
  };

  displayOnfocus = () => {
    Animated.timing(
      this.state.opacityMessage,
    ).stop()

    Animated.timing(this.state.opacityMessage, {
      duration: 100,
      useNativeDriver: true,
      toValue: 1,
    }).start()
  }

  hideMessage = () => {
    Animated.timing(this.state.opacityMessage, {
      duration: 15000,
      useNativeDriver: true,
      toValue: 0,
    }).start()
  }

  renderListMessages = () => {
    const { detailRoom } = this.props

    if (!detailRoom.comments || detailRoom.comments.length === 0) {
      return null
    }
    const { comments } = detailRoom
    return (
      <TouchableWithoutFeedback
        onPressIn={this.displayOnfocus}
        onPressOut={this.hideMessage}
      >
        <Animated.View
          style={[stylesLive.wrapListMessages, { opacity: this.state.opacityMessage }]}
          onLayout={this.hideMessage}
        >
          <ScrollView
            ref={(ref) => { this.scrollView = ref }}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({ animated: true })
            }}
          >
            {comments.length > 0
            && comments.map((item) => {
              return (
                <Message message={item} />
              )
            })}
            {/* <Message /> */}
          </ScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  };

  back =() => {
    navigator.goBack()
  }

  renderLeaveRoom = () => {
    return (
      <TouchableOpacity
        onPress={this.back}
      >
        <View style={{ backgroundColor: 'red', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, marginHorizontal: 5 }}>

          <Text
            style={stylesLive.liveText}
          >
            Kết thúc
          </Text>
        </View>
      </TouchableOpacity>

    )
  };

  renderViewerUI = () => {
    const { detailRoom, link_stream } = this.props
    if (!detailRoom.roomName) navigator.goBack()
    return (

      <Container>
        <StartColumnContainer>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <View style={{ flex: 1, zIndex: 2 }}>
            <RowContainer
              alignItems="center"
              justifyContent="flex-start"
              style={[{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 300,
                flex: 1,
                zIndex: 2,
              }]}
            >
              <RowContainer>
                {this.renderLeaveRoom()}
                <RowContainer
                  alignItems="center"
                  justifyContents="flex-start"
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    backgroundColor: 'red',
                    borderRadius: 8,
                    marginHorizontal: 5,
                  }}
                >
                  <Image
                    source={require('../assets/ico_view.png')}
                    style={stylesLive.iconView}
                  />
                  <Text style={{
                    paddingHorizontal: 8,
                    fontSize: 18,
                    fontWeight: '400',
                    color: 'white' }}
                  >{detailRoom.countViewer || 0}
                  </Text>
                </RowContainer>
              </RowContainer>


            </RowContainer>

          </View>
          {link_stream && (
            <NodePlayerView
              style={stylesLive.streamerCameraView}
              ref={(vb) => {
                this.vbViewer = vb
              }}
              inputUrl={link_stream}
              scaleMode="ScaleToFill"
              bufferTime={300}
              maxBufferTime={1000}
              autoplay
            />
          )}

          <TouchableWithoutFeedback
            accessible={false}
            style={stylesLive.viewDismissKeyboard}
          >
            <FloatingHearts
              count={detailRoom.countHeart || 0}
              style={{ marginBottom: 0, zIndex: 2, flex: 1 }}
            />
          </TouchableWithoutFeedback>

          {this.renderGroupInput()}
          {this.renderListMessages()}

        </StartColumnContainer>
      </Container>
    )
  };

  render() {
    return this.renderViewerUI()
  }
}

const mapStateToProps = (state, ownprops) => {
  const res = {
    user: state.user.user,
    link_stream: state.stream.link_stream,
  }
  const { list_live } = state.stream
  const roomName = ownprops.navigation.getParam('roomName')
  res.detailRoom = list_live.filter(el => el.roomName === roomName)[0] || {}
  return res
}

export default connect(mapStateToProps, { getLinkStreamAction })(ViewStreamScreen)
