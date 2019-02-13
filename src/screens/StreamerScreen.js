import React, { Component } from 'react'
import {
  // View,
  Text,
  Keyboard,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  Alert,
  StatusBar,
  // KeyboardAccessory,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { NodeCameraView } from 'react-native-nodemediaclient'
import FLoatingUser from 'components/animation/FLoatingUser'
import FloatingReaction from 'components/animation/FloatingReaction'
import ReactionContainer from 'components/reaction/ReactionContainer'
import { connect } from 'react-redux'
import {
  RowContainer,
  StartColumnContainer,
  Container,
  SAnimatedVIew,
  STopContainer,
  SNumeralContainer,
  SCountViewText,
  SBottomContainer,
  SInput,
  SLiveStatusContainer,
} from 'components/common/SComponent'
import Message from 'components/Message'
import { LiveStatus } from '../liveStatus'
import SocketUtils from '../SocketUtils'

const { width, height } = Dimensions.get('window')


class StreamerScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props)
    this.state = {
      liveStatus: LiveStatus.REGISTER,
      listMessages: [],
      onMessage: false,
      message: '',
      opacityMessage: new Animated.Value(1),
      onLongPress: false,
    }
    this.Animation = new Animated.Value(0)
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount = () => {
    this.setState({ liveStatus: LiveStatus.REGISTER })
    const { user } = this.props
    SocketUtils.emitRegisterLiveStream(user.streamKey, user._id)
  };

  componentWillUnmount() {
    const { streamOnline } = this.props
    this.onFinishLiveStream(streamOnline.roomName)
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
    Keyboard.dismiss()
  };

  updateState = () => {
    this.setState({ onLongPress: false })
  }

  onPressHeart = () => {
    this.updateState()
    SocketUtils.emitSendHeart(this.props.streamOnline.roomName, 'Like')
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
              style={styles.iconMessage}
            />
          </TouchableOpacity>
        )
      }
      return (
        <RowContainer flexDirection="row" justifyContent="space-between">
          <SInput
            placeholder="Comment input"
            underlineColorAndroid="transparent"
            onChangeText={this.onChangeMessageText}
            value={message}
            onEndEditing={this.onPressSend}
            onFocus={this.displayOnfocus}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            onPress={this.onPressSend}
            activeOpacity={0.6}
          >
            <Image
              source={require('../assets/ico_send.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressHeart}
            activeOpacity={0.6}
            onLongPress={() => { this.setState({ onLongPress: true }) }}
          >

            <Image
              source={require('../assets/ico_heart.png')}
            />
          </TouchableOpacity>
        </RowContainer>
      )
    }
    // return (
    //   <KeyboardAccessory backgroundColor="transparent">
    //     <View>
    //       <View>

    //         <View
    //           style={{
    //             flex: 1,
    //             flexDirection: 'row',
    //             height: 45,
    //             marginHorizontal: 10,
    //             marginBottom: 10,
    //             borderRadius: 10,
    //             alignItems: 'center',
    //           }}
    //           onLayout={this.setDropZoneValues}
    //         >
    //           <SInput
    //             placeholder="Comment input"
    //             underlineColorAndroid="transparent"
    //             onChangeText={this.onChangeMessageText}
    //             value={message}
    //             onEndEditing={this.onPressSend}
    //             autoCapitalize="none"
    //             autoCorrect={false}
    //             onFocus={() => {
    //             }}
    //           />
    //           <TouchableOpacity
    //             onPress={this.onPressSend}
    //             activeOpacity={0.6}
    //           >
    //             <Image
    //               source={require('../assets/ico_send.png')}
    //             />
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             onPress={this.onPressHeart}
    //             activeOpacity={0.6}
    //           >
    //             <Image
    //               source={require('../assets/ico_heart.png')}
    //             />
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View>
    //   </KeyboardAccessory>
    // )
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
        <Text style={styles.statusLiveStream}>
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
          style={styles.iconSwitch}
        />
      </TouchableOpacity>
    )
  }

  renderLiveText = () => {
    const { liveStatus } = this.state
    return (
      <SLiveStatusContainer
        liveStatus={liveStatus}
      >
        <Text style={styles.liveText}> LIVE </Text>
      </SLiveStatusContainer>
    )
  };

  displayOnfocus = () => {
    Animated.timing(this.state.opacityMessage, {
      duration: 100,
      useNativeDriver: true,
      toValue: 1,
    }).start()
  }

  hideMessage = () => {
    Animated.timing(this.state.opacityMessage, {
      duration: 12000,
      useNativeDriver: true,
      toValue: 0,
    }).start()
  }

  componentWillReceiveProps(newProps) {
    const { deltailStream } = newProps
    if (!deltailStream.comments || deltailStream.comments.length === 0) {
      return null
    }
    if (deltailStream.comments.length !== this.props.deltailStream.comments.length) {
      this.displayOnfocus()
    }
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
          style={{ opacity: this.state.opacityMessage }}
        >
          <SAnimatedVIew>
            <FlatList
              ref={(ref) => { this.scrollView = ref }}
              data={comments}
              keyExtractor={item => item.message}
              renderItem={({ item }) => <Message message={item} />}
              onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
            />
          </SAnimatedVIew>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  };

  renderStreamerUI = () => {
    const { deltailStream } = this.props
    const { liveStatus, onLongPress } = this.state

    return (
      <Container>
        <StartColumnContainer>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <STopContainer
            alignItems="center"
            justifyContent="flex-start"
          >
            <RowContainer>
              {this.renderLiveText()}
              <SNumeralContainer
                alignItems="center"
                justifyContents="flex-start"
              >
                <Image
                  source={require('../assets/ico_view.png')}
                  style={styles.iconView}
                />
                <SCountViewText>{deltailStream.countViewer || 0}
                </SCountViewText>
              </SNumeralContainer>
            </RowContainer>
          </STopContainer>
          <NodeCameraView
            style={styles.streamerCameraView}
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
          {onLongPress && (
            <ReactionContainer
              style={styles.iconContainer}
            />
          )}
          <TouchableWithoutFeedback>
            <SBottomContainer
              alignItems="center"
              justifyContent="flex-start"
            >
              <RowContainer
                alignItems="center"
                justifyContent="flex-end"
              >
                {liveStatus === LiveStatus.ON_LIVE ? this.renderGroupInput() : null}
                {liveStatus === LiveStatus.ON_LIVE && !this.state.onMessage
                  ? this.renderSwitchCamera()
                  : null }
                {!this.state.onMessage && this.renderCancelStreamerButton()}
              </RowContainer>
            </SBottomContainer>

          </TouchableWithoutFeedback>
          <FloatingReaction
            count={deltailStream.countUrgy || 0}
            style={styles.icon}
            type="Angry"
          />
          <FloatingReaction
            count={deltailStream.countHappy || 0}
            style={styles.icon}
            type="Laugh"
          />
          <FloatingReaction
            count={deltailStream.countWow || 0}
            style={styles.icon}
            type="Wow"
          />
          <FloatingReaction
            count={deltailStream.countHeart || 0}
            style={styles.icon}
            type="Like"
          />
          <FloatingReaction
            count={deltailStream.countLike || 0}
            style={styles.icon}
            type="ThumpUp"
          />
          <FloatingReaction
            count={deltailStream.countSad || 0}
            style={styles.icon}
            type="Sad"
          />
          <FLoatingUser
            user={deltailStream.newuser}
            style={styles.icon}
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

const styles = StyleSheet.create({
  icon: {
    marginBottom: 8,
    zIndex: 1,
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 2,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconSwitch: {
    width: 40,
    height: 40,
    tintColor: 'white',
    marginHorizontal: 10,
  },
  liveText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  iconView: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
  streamerCameraView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height,
    width: width,
    zIndex: 1,
  },
  statusLiveStream: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    marginHorizontal: 10,
  },
  iconMessage: {
    marginHorizontal: 10,
    width: 30,
    height: 30,
    tintColor: 'white' },
})

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

export default connect(mapStateToProps)(StreamerScreen)
