import React, { Component, Fragment } from 'react'
import { StyleSheet, StatusBar, Dimensions, Platform, ImageBackground, Modal, TouchableOpacity } from 'react-native'
import { setCallStatus, setKeepCall } from 'features/authentication/AuthenAction'
import PropTypes from 'prop-types'
import { RTCView } from 'react-native-webrtc'
import { compareTwoObject, requestVideoCallPermission } from 'utils/helper'
import { UserInfoPopup } from 'features/user/components'
import { connect } from 'react-redux'
import WebRTC from '../services'
import GroupButtonSendCall from './buttons/GroupButtonSendCall'
import dragComponent from './HOC/DragContainer'
import { ButtonSwitchCamera } from './index'
import InCallManager from 'react-native-incall-manager'
import { CALL_USER, CALLING, DISCONNECT, END_CALL, FREE, STOP_CALL_USER, WAITING } from '../constains'
import { socket } from '../socketConfig'
const { width: widthScreen, height: heightScreen } = Dimensions.get('window')
const DragVideoComponent = dragComponent(RTCView)
const backgroundImage = 'https://i.stack.imgur.com/XvNgS.png'

class CallContainer extends Component {
  constructor(props) {
    super(props)
    const currentState = props.navigation.getParam('currentState')
    if (currentState) {
      this.state = { ...currentState, isShowButton: false }
      this.isStartCall = false
    } else {
      this.isStartCall = true
      const roomID = props.navigation.getParam('roomID')
      const isVideoCall = props.navigation.getParam('isVideoCall')
      const isReceiver = this.props.navigation.getParam('isReceiver')
      const caller = props.navigation.getParam('caller') || props.me
      const receiver = isReceiver ? props.me : props.navigation.getParam('receiver')
      this.state = {
        isFront: true,
        selfViewSrc: null,
        remoteList: {},
        roomID: roomID,
        isShowVideo: isVideoCall,
        isRemoteShowVideo: isVideoCall,
        isVolumeUp: isVideoCall,
        isMute: false,
        receiver: receiver,
        caller: caller,
        isShowButton: false,
      }
    }
    this.handlePressShowVideo = this.handlePressShowVideo.bind(this)
    this.handlePressMute = this.handlePressMute.bind(this)
    this.handlePressEndCall = this.handlePressEndCall.bind(this)
    this.handleSwitchCamera = this.handleSwitchCamera.bind(this)
    this.socketExchange = this.socketExchange.bind(this)
    this.socketLeave = this.socketLeave.bind(this)
    this.socketShowVideo = this.socketShowVideo.bind(this)
    this.socketRoomMessage = this.socketRoomMessage.bind(this)
    this.handleShowButton = this.handleShowButton.bind(this)
    this.handleChangeVolume = this.handleChangeVolume.bind(this)
  }

  handleChangeVolume() {
    const isVolumeUp = !this.state.isVolumeUp
    if (Platform.OS === 'android') {
      InCallManager.setSpeakerphoneOn(isVolumeUp)
    } else {
      InCallManager.setForceSpeakerphoneOn(isVolumeUp)
    }
    this.setState({ isVolumeUp })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.callStatus === FREE) {
      this.props.navigation.goBack()
      return false
    }
    if (this.props.callStatus === WAITING && nextProps.callStatus === CALLING) {
      if (Platform.OS === 'android') {
        InCallManager.setSpeakerphoneOn(this.state.isVolumeUp)
      } else {
        InCallManager.setForceSpeakerphoneOn(this.state.isVolumeUp)
      }
      WebRTC.setMute(this.state.isMute)
      return true
    }
    return true
  }

  handleShowButton() {
    this.setState({ isShowButton: true })
    this.timerHandle = setTimeout(() => {
      this.setState({ isShowButton: false })
    }, 3000)
  }

  handlePressShowVideo() {
    const isShowVideo = !this.state.isShowVideo
    this.setState({ isShowVideo })
    WebRTC.turnOffCamera(isShowVideo)
    socket.emit('showVideo', isShowVideo)
  }

  handlePressMute() {
    const isMute = !this.state.isMute
    this.setState({ isMute })
    WebRTC.setMute(isMute)
  }

  handlePressEndCall() {
    InCallManager.stopRingback()
    InCallManager.stop()
    const { caller, receiver } = this.state
    if (this.props.callStatus === CALLING) {
      if (!this.state.isFront) {
        WebRTC.switchCamera()
      }
      socket.send({
        type: END_CALL,
        receiver: receiver,
        caller: caller,
      })
      socket.emit('leave')
    } else if (this.props.callStatus === WAITING) {
      socket.send({
        type: STOP_CALL_USER,
        receiver: receiver,
        caller: caller,
      })
      this.props.setCallStatus(FREE)
      this.props.navigation.goBack()
    }
  }

  handleSwitchCamera() {
    this.setState({ isFront: !this.state.isFront })
    WebRTC.switchCamera()
  }

  socketExchange(data) {
    WebRTC.exchange(data)
    const remoteList = WebRTC.getRemoteList()
    if (compareTwoObject(remoteList, this.state.remoteList)) {
      this.setState({ remoteList })
    }
  }

  socketLeave(socketId) {
    WebRTC.leave(socketId)
    if (!this.state.isFront) {
      WebRTC.switchCamera()
    }
    WebRTC.resetAll()
    this.props.setCallStatus(FREE)
    this.props.navigation.goBack()
  }

  socketShowVideo(isShowVideo, socketId) {
    if (socket.id !== socketId) {
      this.setState({ isRemoteShowVideo: isShowVideo })
    }
  }

  socketRoomMessage(data) {
    if (data.type === DISCONNECT) {
      this.socketLeave()
    }
  }

  async componentDidMount() {
    if (this.isStartCall) {
      const isPermission = Platform.OS === 'android' ? await requestVideoCallPermission() : true
      if (isPermission) {
        InCallManager.setForceSpeakerphoneOn(this.state.isVolumeUp)
        WebRTC.getLocalStream(true, (stream) => {
          this.setState({ selfViewSrc: stream.toURL() })
          WebRTC.join(this.state.roomID)
        })

        WebRTC.turnOffCamera(this.state.isShowVideo)

        if (!this.props.navigation.getParam('isReceiver')) {
          this.callUser()
        }
      }
    }

    const container = this
    socket.on('exchange', container.socketExchange)
    socket.on('leave', container.socketLeave)
    // Event device disconnect
    socket.on('roomMessage', container.socketRoomMessage)
    socket.on('showVideo', container.socketShowVideo)
    this.handleShowButton()
  }

  componentWillUnmount() {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle)
      this.timerHandle = 0
    }
    const container = this
    socket.removeListener('exchange', container.socketExchange)
    socket.removeListener('leave', container.socketLeave)
    socket.removeListener('showVideo', container.socketShowVideo)
    socket.removeListener('roomMessage', container.socketRoomMessage)
  }

  callUser() {
    const { me } = this.props
    const receiver = this.props.navigation.getParam('receiver')
    const isVideoCall = this.props.navigation.getParam('isVideoCall')
    InCallManager.start({ media: 'audio', ringback: '_DTMF_' })
    socket.send({
      type: CALL_USER,
      receiver: receiver,
      caller: me,
      roomID: this.state.roomID,
      isVideoCall: isVideoCall,
    })
    this.callTimeout = setTimeout(() => {
      if (this.props.callStatus !== CALLING) {
        this.handlePressEndCall()
        this.props.setKeepCall(false)
      }
    }, 30000)
  }
  handleBackPress = () => {
    this.props.navigation.goBack()
    this.props.setKeepCall(true, this.state)
    return true
  }

  renderAcceptedComponent() {
    return (
      <ImageBackground
        source={{
          uri: backgroundImage,
        }}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <Modal
          transparent
          visible
          onRequestClose={() => {
            this.handleBackPress()
          }}
        >
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.handleShowButton()}
            disabled={this.state.isShowButton}
            activeOpacity={1}
          >
            {this.state.isShowVideo && (
              <Fragment>
                {this.state.isShowButton && <ButtonSwitchCamera pressSwitchCamera={this.handleSwitchCamera} />}
                <DragVideoComponent
                  streamURL={this.state.selfViewSrc}
                  style={styles.selfView}
                  objectFit="cover"
                  dragComponentStyle={styles.selfViewContainer}
                  corner={2}
                  paddingDragComponent={10}
                />
              </Fragment>
            )}
            {this.state.isShowButton && (
              <GroupButtonSendCall
                onPressShowVideo={this.handlePressShowVideo}
                onPressMute={this.handlePressMute}
                onPressEndCall={this.handlePressEndCall}
                isShowVideo={this.state.isShowVideo}
                isMute={this.state.isMute}
                isVolumeUp={this.state.isVolumeUp}
                onPressChangeVolume={this.handleChangeVolume}
              />
            )}
          </TouchableOpacity>
        </Modal>

        {this.state.isRemoteShowVideo &&
          WebRTC.mapHash((remote, index) => (
            <RTCView key={index} streamURL={remote} style={styles.remoteView} objectFit="cover" />
          ))}
      </ImageBackground>
    )
  }

  renderWaitingComponent() {
    return (
      <ImageBackground
        source={{
          uri: backgroundImage,
        }}
        style={styles.backgroundImage}
      >
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <Modal transparent visible onRequestClose={() => {}}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => this.handleShowButton()}
            disabled={this.state.isShowButton}
            activeOpacity={1}
          >
            {this.state.isShowVideo && this.state.isShowButton && (
              <ButtonSwitchCamera pressSwitchCamera={this.handleSwitchCamera} />
            )}
            <UserInfoPopup user={this.state.receiver} content={'Ringing...'} />
            {this.state.isShowButton && (
              <GroupButtonSendCall
                onPressShowVideo={this.handlePressShowVideo}
                onPressMute={this.handlePressMute}
                onPressEndCall={this.handlePressEndCall}
                isShowVideo={this.state.isShowVideo}
                isMute={this.state.isMute}
                isVolumeUp={this.state.isVolumeUp}
                onPressChangeVolume={this.handleChangeVolume}
              />
            )}
          </TouchableOpacity>
        </Modal>
        {this.state.isShowVideo && (
          <RTCView streamURL={this.state.selfViewSrc} style={styles.remoteView} objectFit="cover" />
        )}
      </ImageBackground>
    )
  }

  handleRender() {
    if (this.props.callStatus === WAITING) {
      return this.renderWaitingComponent()
    } else if (this.props.callStatus === CALLING) {
      return this.renderAcceptedComponent()
    }
    return null
  }

  render() {
    return this.handleRender()
  }
}

CallContainer.propTypes = {
  me: PropTypes.object,
  navigation: PropTypes.object,
  callStatus: PropTypes.string,
  setCallStatus: PropTypes.func,
  setKeepCall: PropTypes.func,
}

const styles = StyleSheet.create({
  selfView: {
    flex: 1,
  },
  remoteView: {
    width: widthScreen,
    height: heightScreen + 5,
  },
  selfViewContainer: {
    width: widthScreen / 4,
    height: heightScreen / 4,
    position: 'absolute',
    zIndex: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  me: state.authSocket.user,
  callStatus: state.authSocket.callStatus,
})

export default connect(
  mapStateToProps,
  { setCallStatus, setKeepCall }
)(CallContainer)
