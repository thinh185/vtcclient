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
  StatusBar,
  Dimensions,
} from 'react-native'
import { NodeCameraView } from 'react-native-nodemediaclient'
import FloatingHearts from 'components/FloatingHearts'
import { connect } from 'react-redux'
import { RowContainer, StartColumnContainer, Container } from 'components/common/SComponent'
import { LiveStatus } from '../liveStatus'
import SocketUtils from '../SocketUtils'
import Utils from '../Utils'
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
      countViewer: 0,
      countHeart: 0,
      visibleListMessages: true,
      listMessages: [],
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

  componentWillUnmount() {
    this.vbCamera.stop()
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

  onFinishLiveStream = (roomName, userId) => {
    this.setState({ liveStatus: LiveStatus.FINISH })
    SocketUtils.emitFinishLiveStream(roomName, userId)
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
    const { liveStatus } = this.state
    const { user, streamOnline } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          if (liveStatus == LiveStatus.ON_LIVE) {
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
    const { countViewer, countHeart } = this.state
    return (
      <Container>
        <StartColumnContainer>
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
              >{countViewer}
              </Text>
            </RowContainer>

          </RowContainer>
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
            }]}
            // onLayout={(event) => {
            //   const { height } = event.nativeEvent.layout
            //   this.setState({ heightBottom: height })
            // }}
          >
            <RowContainer
              alignItems="center"
              justifyContent="flex-end"
              // style={{ flex: 1 }}
            >
              {this.renderSwitchCamera()}
              {this.renderCancelStreamerButton()}
            </RowContainer>
            <FloatingHearts count={countHeart} style={stylesLive.wrapGroupHeart} />
          </RowContainer>
          {this.renderListMessages()}
        </StartColumnContainer>

      </Container>

    )
  };

  render() {
    return this.renderStreamerUI()
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  streamOnline: state.stream.streamOnline,
})

export default connect(mapStateToProps)(StreamScreen)
