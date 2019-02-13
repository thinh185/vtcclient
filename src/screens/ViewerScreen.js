import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  StatusBar,
  Animated,
  FlatList,
  Dimensions,
} from 'react-native'
import {
  RowContainer,
  Container,
  StartColumnContainer,
  SInput,
  SAnimatedVIew,
  STopContainer,
  SNumeralContainer,
  SCountViewText,
  SBottomContainer,
} from 'components/common/SComponent'
// import KeyboardAccessory from 'react-native-sticky-keyboard-accessory'
import FLoatingUser from 'components/animation/FLoatingUser'
import FloatingReaction from 'components/animation/FloatingReaction'
import { NodePlayerView } from 'react-native-nodemediaclient'
import { connect } from 'react-redux'
import { getLinkStreamAction } from 'actions/streamAction'
import Message from 'components/Message'
import navigator from 'navigations/customNavigator'
import ReactionContainer from 'components/reaction/ReactionContainer'
import SocketUtils from '../SocketUtils'

const { width, height } = Dimensions.get('window')

class ViewStreamScreen extends Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      roomName: '',
      opacityMessage: new Animated.Value(1),
      onLongPress: false,
    }
    this.back = this.back.bind(this)
  }

  componentDidMount = () => {
    const { user } = this.props
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

  onPressHeart = () => {
    SocketUtils.emitSendHeart(this.props.navigation.getParam('roomName'))
  };


  onChangeMessageText = (text) => {
    this.setState({ message: text })
  };

  componentWillReceiveProps(newProps) {
    const { deltailStream } = newProps
    if (!deltailStream.comments || deltailStream.comments.length === 0) {
      return null
    }
    if (deltailStream.comments.length !== this.props.deltailStream.comments.length) {
      this.displayOnfocus()
    }
  }

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
            style={styles.liveText}
          >
            Kết thúc
          </Text>
        </View>
      </TouchableOpacity>

    )
  };

  renderViewerUI = () => {
    const { deltailStream, link_stream } = this.props
    const { onLongPress } = this.state
    if (!deltailStream.roomName) navigator.goBack()
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

          {link_stream && (
          <NodePlayerView
            style={styles.streamerCameraView}
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
                {this.renderGroupInput()}
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

const mapStateToProps = (state, ownprops) => {
  const res = {
    user: state.user.user,
    link_stream: state.stream.link_stream,
  }
  const { list_live } = state.stream
  const roomName = ownprops.navigation.getParam('roomName')
  res.deltailStream = list_live.filter(el => el.roomName === roomName)[0] || {}
  return res
}

export default connect(mapStateToProps, { getLinkStreamAction })(ViewStreamScreen)
