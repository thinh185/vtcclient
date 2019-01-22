import React, { Component } from 'react'
import {
  View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
  ScrollView,
  LayoutAnimation,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAccessory,
  TouchableWithoutFeedback,
  AppState,
} from 'react-native'
import { NodeCameraView } from 'react-native-nodemediaclient'
import FloatingHearts from 'components/FloatingHearts'
import FLoatingUser from 'components/FLoatingUser'

import { connect } from 'react-redux'
import { RowContainer, StartColumnContainer, Container } from 'components/common/SComponent'
import Message from 'components/Message'
import { LiveStatus } from '../liveStatus'
import SocketUtils from '../SocketUtils'
import { stylesLive } from './styles'

const { width } = Dimensions.get('window')
class StreamScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props)
    this.state = {
      liveStatus: LiveStatus.REGISTER,
      countHeart: 0,
      listMessages: [],
      onMessage: false,
      message: '',
      opacityMessage: new Animated.Value(1),
    }
    this.Animation = new Animated.Value(0)
  }

  componentDidMount = () => {
    let keyboardShowEvent = 'keyboardWillShow'
    let keyboardHideEvent = 'keyboardWillHide'

    if (Platform.OS === 'android') {
      keyboardShowEvent = 'keyboardDidShow'
      keyboardHideEvent = 'keyboardDidHide'
    }
    this.keyboardShowListener = Keyboard.addListener(keyboardShowEvent, e => this.keyboardShow(e))
    this.keyboardHideListener = Keyboard.addListener(keyboardHideEvent, e => this.keyboardHide(e))

    this.setState({ liveStatus: LiveStatus.REGISTER })
    const { user } = this.props
    SocketUtils.emitRegisterLiveStream(user.streamKey, user._id)
    AppState.addEventListener('change', this.handleAppStateChange)
  };

  componentWillUnmount() {
    const { streamOnline } = this.props
    this.onFinishLiveStream(streamOnline.roomName)
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange = (nextAppState) => {
    const { streamOnline } = this.props
    console.log('rcsac ', nextAppState, streamOnline)

    if (nextAppState === 'background') {
      this.onFinishLiveStream(streamOnline.roomName)
    }
  }

  keyboardShow() {
    LayoutAnimation.easeInEaseOut()
  }

  keyboardHide() {
    LayoutAnimation.easeInEaseOut()
  }

  onBeginLiveStream = (roomName, userId) => {
    this.setState({ liveStatus: LiveStatus.ON_LIVE })
    SocketUtils.emitBeginLiveStream(roomName, userId)
    this.vbCamera.start()
  };

  onFinishLiveStream = (roomName) => {
    this.setState({ liveStatus: LiveStatus.FINISH })
    SocketUtils.emitFinishLiveStream(roomName)
    this.vbCamera.stop()
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

  onPressCancelStreamer = () => {
    if (this.vbCamera !== null && this.vbCamera !== undefined) {
      this.vbCamera.stop()
    }
    const { liveStatus } = this.state
    const { streamOnline } = this.props

    if (
      liveStatus === LiveStatus.REGISTER
      || liveStatus === LiveStatus.ON_LIVE
    ) {
      return Alert.alert(
        'Alert',
        'Are you sure to discard your live stream, a lot people is watching right now.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Sure',
            onPress: () => {
              this.onFinishLiveStream(streamOnline.roomName)
              this.props.navigation.goBack()
            },
          },
        ],
      )
    }
    this.props.navigation.goBack()
  };

  onChangeMessageText = (text) => {
    this.setState({ message: text })
  };

  onPressSend = () => {
    const {
      message,
      listMessages,
    } = this.state
    const { user } = this.props
    this.setState({ onMessage: false })
    if (message !== '') {
      this.setState({ message: '' })
      Keyboard.dismiss()
      const newListMessages = listMessages.slice()
      newListMessages.push({ userId: user._id, message })
      this.setState({
        listMessages: newListMessages,
      })
      SocketUtils.emitSendMessage(
        this.props.streamOnline.roomName,
        user._id,
        message,
        user.username,
      )
    }
  };

  onPressHeart = () => {
    this.setState({ countHeart: this.state.countHeart + 1 })
    SocketUtils.emitSendHeart(this.state.roomName)
  };

  renderGroupInput = () => {
    const { message, onMessage } = this.state
    if (Platform.OS === 'android') {
      if (!onMessage) {
        return (
          <TouchableOpacity
            onPress={() => this.setState({ onMessage: true })}
          >
            <Image
              source={require('../assets/message.png')}
              style={{ marginHorizontal: 10, width: 30, height: 30, tintColor: 'white' }}
            />
          </TouchableOpacity>
        )
      }
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            style={{ backgroundColor: 'white', borderRadius: 8, flex: 1, marginHorizontal: 5 }}
            placeholder="Comment input"
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeMessageText}
            value={message}
            onEndEditing={this.onPressSend}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => {
            }}
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
                onFocus={() => {
                }}
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

  renderCancelStreamerButton = () => {
    const { liveStatus } = this.state
    const { user, streamOnline } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          if (liveStatus === LiveStatus.ON_LIVE) {
            this.onPressCancelStreamer()
            return
          }
          this.setState({ liveStatus: LiveStatus.ON_LIVE })
          this.onBeginLiveStream(streamOnline.roomName, user._id)
        }}
      >
        <Text style={{
          paddingHorizontal: 8,
          paddingVertical: 5,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: 'white',
          color: 'white',
          fontSize: 16,
          fontWeight: '400',
          marginHorizontal: 10,
        }}
        >
          {liveStatus === LiveStatus.ON_LIVE ? 'Kết thúc' : 'Bắt đầu' }
        </Text>
      </TouchableOpacity>
    )
  };


  switchCamera = () => {
    this.vbCamera.switchCamera()
  }

  renderSwitchCamera = () => {
    return (
      <TouchableOpacity
        onPress={() => this.switchCamera()}
      >
        <Image
          source={require('../assets/switch_camera.png')}
          style={[stylesLive.iconSwitch, { marginHorizontal: 10 }]}
        />
      </TouchableOpacity>
    )
  }

  renderLiveText = () => {
    const { liveStatus } = this.state
    return (
      <View style={
        liveStatus === LiveStatus.ON_LIVE
          ? { backgroundColor: 'red', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 8, marginHorizontal: 5 }
          : { backgroundColor: 'rgb(153,153,153)', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, marginHorizontal: 5 }
      }
      >
        <Text
          style={
            liveStatus === LiveStatus.ON_LIVE
              ? stylesLive.liveText
              : stylesLive.notLiveText
          }
        >
          LIVE
        </Text>
      </View>
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
    const { deltailStream } = this.props

    if (!deltailStream.comments || deltailStream.comments.length === 0) {
      return null
    }
    const { comments } = deltailStream
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

  renderStreamerUI = () => {
    const { deltailStream } = this.props
    const { liveStatus } = this.state

    return (
      <Container>
        <StartColumnContainer style={{ zIndex: 2, flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <RowContainer
            alignItems="center"
            justifyContent="flex-start"
            style={[{
              position: 'absolute',
              top: 0,
              left: 0,
              width,
              flex: 1,
              zIndex: 2,
            }]}
          >
            <RowContainer>
              {this.renderLiveText()}
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
                >{deltailStream.countViewer || 0}
                </Text>
              </RowContainer>
            </RowContainer>


          </RowContainer>
          <NodeCameraView
            style={stylesLive.streamerCameraView}
            ref={(vb) => {
              this.vbCamera = vb
            }}
            outputUrl="rtmp://10.240.152.180/gotest/CLNBxmz"
            camera={{ cameraId: 1, cameraFrontMirror: true }}
            audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
            video={{
              preset: 1,
              bitrate: 500000,
              profile: 1,
              fps: 30,
              videoFrontMirror: true,
            }}
            smoothSkinLevel={4}
            autopreview
          />
          <TouchableWithoutFeedback>
            <RowContainer
              alignItems="center"
              justifyContent="flex-start"
              style={[{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 2,
                paddingVertical: 5,
                borderRadius: 8,
                borderColor: 'rgb(153, 153, 153)',
                backgroundColor: 'rgb(153, 153, 153)',
                borderWidth: 1,
                width,
              }]}
            >
              <RowContainer
                alignItems="center"
                justifyContent="flex-end"
                style={{ flex: 1 }}
              >
                {liveStatus === LiveStatus.ON_LIVE ? this.renderGroupInput() : null}
                {liveStatus === LiveStatus.ON_LIVE && !this.state.onMessage
                  ? this.renderSwitchCamera()
                  : null }
                {!this.state.onMessage && this.renderCancelStreamerButton()}
              </RowContainer>
            </RowContainer>

          </TouchableWithoutFeedback>
          <FloatingHearts
            count={deltailStream.countHeart || 0}
            style={{ marginBottom: 8, zIndex: 1, flex: 1 }}
          />
          <FLoatingUser
            user={deltailStream.newuser}
            style={{ marginBottom: 8, zIndex: 1, flex: 1 }}
          />
          {this.renderListMessages()}
        </StartColumnContainer>

      </Container>

    )
  };

  render() {
    return this.renderStreamerUI()
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

export default connect(mapStateToProps)(StreamScreen)
