import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
  ScrollView,
  LayoutAnimation,
  WebView,
  Modal,
  StatusBar,
} from 'react-native'
import { NodeCameraView } from 'react-native-nodemediaclient'
import FloatingHearts from 'components/FloatingHearts'
import { connect } from 'react-redux'
import { LiveStatus } from '../liveStatus'
import SocketUtils from '../SocketUtils'
import Utils from '../Utils'
import { stylesLive } from './styles'

class StreamScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props)
    this.state = {
      liveStatus: LiveStatus.REGISTER,
      countViewer: 0,
      countHeart: 0,
      message: '',
      visibleListMessages: true,
      listMessages: [],

      productId: null,
      productUrl: null,
      productImageUrl: null,
      modalVisible: false,
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
  };

  alertStreamerNotReady = () => {
    return Alert.alert('Alert', 'Streamer not ready to live stream yet', [
      {
        text: 'Close',
        onPress: () => {
          SocketUtils.emitLeaveServer(Utils.getRoomName(), Utils.getUserId())
          this.props.navigation.goBack()
        },
      },
    ])
  };

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

  onFinishLiveStream = (roomName, userId) => {
    this.setState({ liveStatus: LiveStatus.FINISH })
    SocketUtils.emitFinishLiveStream(roomName, userId)
    this.vbCamera.stop()
  };

  onPressHeart = () => {
    this.setState({ countHeart: this.state.countHeart + 1 })
    SocketUtils.emitSendHeart(Utils.getRoomName())
  };


  onChangeMessageText = (text) => {
    this.setState({ message: text })
  };

  onPressSend = () => {
    const {
      message,
      listMessages,
      productId,
      productImageUrl,
      productUrl,
    } = this.state
    if (productId !== null && productUrl !== null && productImageUrl !== null) {
      this.setState({ message: '' })
      Keyboard.dismiss()
      const newListMessages = listMessages.slice()
      newListMessages.push({
        userId: Utils.getUserId(),
        message,
        productId,
        productImageUrl,
        productUrl,
      })
      this.setState({
        listMessages: newListMessages,
        visibleListMessages: true,
        productId: null,
        productUrl: null,
        productImageUrl: null,
      })
      SocketUtils.emitSendMessage(
        Utils.getRoomName(),
        Utils.getUserId(),
        message,
        productId,
        productImageUrl,
        productUrl,
      )
    } else if (message !== '') {
      this.setState({ message: '' })
      Keyboard.dismiss()
      const newListMessages = listMessages.slice()
      newListMessages.push({ userId: Utils.getUserId(), message })
      this.setState({
        listMessages: newListMessages,
        visibleListMessages: true,
      })
      SocketUtils.emitSendMessage(
        Utils.getRoomName(),
        Utils.getUserId(),
        message,
      )
    }
  };

  onPressCloseModal = () => {
    this.setState({
      productId: null,
      productUrl: null,
      productImageUrl: null,
      modalVisible: false,
    })
  };

  onPressCancelViewer = () => {
    if (this.vbViewer !== null && this.vbViewer !== undefined) {
      this.vbViewer.stop()
      this.props.navigation.goBack()
    }
    SocketUtils.emitLeaveServer(Utils.getRoomName(), Utils.getUserId())
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

  onPressCancelReplay = () => {
    Utils.clearTimeOutMessages()
    if (this.vbReplay !== null && this.vbReplay !== undefined) {
      this.vbReplay.stop()
    }
    SocketUtils.emitLeaveServer(Utils.getRoomName(), Utils.getUserId())
    this.props.navigation.goBack()
  };

  renderCancelReplayButton = () => {
    return (
      <TouchableOpacity
        style={stylesLive.buttonCancel}
        onPress={this.onPressCancelReplay}
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
              SocketUtils.emitCancelLiveStream(
                Utils.getRoomName(),
                Utils.getUserId(),
              )
              SocketUtils.emitLeaveServer(
                Utils.getRoomName(),
                Utils.getUserId(),
              )
              this.props.navigation.goBack()
            },
          },
        ],
      )
    }
    this.props.navigation.goBack()
  };

  renderCancelStreamerButton = () => {
    return (
      <TouchableOpacity
        style={stylesLive.buttonCancel}
        onPress={this.onPressCancelStreamer}
      >
        <Image
          source={require('../assets/ico_cancel.png')}
          style={stylesLive.iconCancel}
        />
      </TouchableOpacity>
    )
  };


  switchCamera = () => {
    this.vbCamera.switchCamera()
  }

  renderSwitchCamera = () => {
    return (
      <TouchableOpacity
        style={stylesLive.buttonSwitch}
        onPress={this.switchCamera}
      >
        <Image
          source={require('../assets/switch_camera.png')}
          style={stylesLive.iconSwitch}
        />
      </TouchableOpacity>
    )
  }

  renderLiveText = () => {
    const { liveStatus } = this.state
    return (
      <View
        style={
          liveStatus === LiveStatus.ON_LIVE
            ? stylesLive.wrapLiveText
            : stylesLive.wrapNotLiveText
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

  renderListMessages = () => {
    const { listMessages, visibleListMessages } = this.state
    if (!visibleListMessages) {
      return null
    }
    return (
      <View style={stylesLive.wrapListMessages}>
        <ScrollView
          ref={(ref) => { this.scrollView = ref }}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: true })
          }}
        >
          {listMessages.length > 0
            && listMessages.map((item) => {
              const {
                productId,
                productUrl,
                productImageUrl,
                userId,
                message,
              } = item
              return (
                <View style={stylesLive.chatItem}>
                  <View style={stylesLive.wrapAvatar}>
                    {item.avatar ? (
                      <Image source={item.avatar} style={stylesLive.iconAvatar} />
                    ) : (
                      <Image
                        source={require('../assets/ico_heart.png')}
                        style={stylesLive.iconAvatar}
                      />
                    )}
                  </View>
                  <View style={stylesLive.messageItem}>
                    {!Utils.isNullOrUndefined(productId)
                      && !Utils.isNullOrUndefined(productUrl)
                      && !Utils.isNullOrUndefined(productImageUrl) && (
                        <TouchableWithoutFeedback
                          onPress={() => this.onPressProduct(item)}
                        >
                          <View style={stylesLive.wrapSeeDetail}>
                            <Image
                              source={{ uri: productImageUrl }}
                              style={stylesLive.iconProduct}
                            />
                            <Text style={stylesLive.textShowDetail}>
                              Click here to see detail
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                    )}

                    <Text style={stylesLive.name}>{userId}</Text>
                    <Text style={stylesLive.content}>{message}</Text>
                  </View>
                </View>
              )
            })}
        </ScrollView>
      </View>
    )
  };

  renderStreamerUI = () => {
    const { liveStatus, countViewer, countHeart } = this.state
    const { user } = this.props
    return (
      <View style={stylesLive.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <NodeCameraView
          style={stylesLive.streamerCameraView}
          ref={(vb) => {
            this.vbCamera = vb
          }}
          outputUrl={Utils.getRtmpPath() + this.props.user._id}
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
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
            this.setState({ visibleListMessages: true })
          }}
          accessible={false}
          style={stylesLive.viewDismissKeyboard}
        >
          <View style={stylesLive.container}>
            {this.renderCancelStreamerButton()}
            {this.renderLiveText()}
            <View style={stylesLive.wrapIconView}>
              <Image
                source={require('../assets/ico_view.png')}
                style={stylesLive.iconView}
              />
              <View style={stylesLive.wrapTextViewer}>
                <Text style={stylesLive.textViewer}>{countViewer}</Text>
              </View>
            </View>
            {this.renderSwitchCamera()}
            <FloatingHearts count={countHeart} style={stylesLive.wrapGroupHeart} />
            {liveStatus === LiveStatus.REGISTER && (
              <TouchableOpacity
                style={stylesLive.beginLiveStreamButton}
                onPress={() => this.onBeginLiveStream(Utils.getRoomName(), user._id)}
              >
                <Text style={stylesLive.beginLiveStreamText}>Begin Live</Text>
              </TouchableOpacity>
            )}
            {liveStatus === LiveStatus.ON_LIVE && (
              <TouchableOpacity
                style={stylesLive.finishLiveStreamButton}
                onPress={() => this.onFinishLiveStream(Utils.getRoomName(), user._id)}
              >
                <Text style={stylesLive.beginLiveStreamText}>Finish</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableWithoutFeedback>
        {this.renderListMessages()}
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.')
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={stylesLive.buttonCloseModal}
              onPress={this.onPressCloseModal}
            >
              <Image
                source={require('../assets/ico_cancel.png')}
                style={stylesLive.iconCancel}
              />
            </TouchableOpacity>
            <View style={stylesLive.wrapWebview}>
              <WebView source={{ uri: this.state.productUrl }} />
            </View>
          </View>
        </Modal>
      </View>
    )
  };

  render() {
    return this.renderStreamerUI()
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
})

export default connect(mapStateToProps)(StreamScreen)
