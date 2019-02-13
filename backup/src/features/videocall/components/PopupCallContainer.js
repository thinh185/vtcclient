import React, { Component } from 'react'
import navigator from 'navigation/CustomNavigator'
import { ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Text, Platform } from 'react-native'
import { compareTwoObject } from 'utils/helper'
import { socket } from '../socketConfig'
import { connect } from 'react-redux'
import WebRTC from '../services'
import { setKeepCall, setCallStatus } from 'features/authentication/AuthenAction'
import { RTCView } from 'react-native-webrtc'
import theme from 'config/theme'
import { GroupButtonPopup } from './index'
import InCallManager from 'react-native-incall-manager'
import { CALLING, DISCONNECT, END_CALL, FREE } from "../constains";
const { width, height } = Dimensions.get('window')

const imageBackground = 'https://i.stack.imgur.com/XvNgS.png'

class PopupCallContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { ...props.currentState, isShowButton: false, isVolumeUp: true }
    this.handlePressShowVideo = this.handlePressShowVideo.bind(this)
    this.handlePressReturn = this.handlePressReturn.bind(this)
    this.handlePressMute = this.handlePressMute.bind(this)
    this.handlePressEndCall = this.handlePressEndCall.bind(this)
    this.handleSwitchCamera = this.handleSwitchCamera.bind(this)
    this.socketExchange = this.socketExchange.bind(this)
    this.socketLeave = this.socketLeave.bind(this)
    this.socketShowVideo = this.socketShowVideo.bind(this)
    this.socketRoomMessage = this.socketRoomMessage.bind(this)
  }

  componentDidMount() {
    const container = this
    socket.on('exchange', container.socketExchange)
    socket.on('leave', container.socketLeave)
    // Event device disconnect
    socket.on('roomMessage', container.socketRoomMessage)
    socket.on('showVideo', container.socketShowVideo)
    this.handleShowButton()
    if (Platform.OS === 'android') {
      InCallManager.setSpeakerphoneOn(true)
    } else {
      InCallManager.setForceSpeakerphoneOn(true)
    }
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
    const { caller, receiver } = this.state
    InCallManager.stopRingback()
    InCallManager.stop()
    if (!this.state.isFront) {
      WebRTC.switchCamera()
    }
    socket.send({
      type: END_CALL,
      receiver: receiver,
      caller: caller,
    })
    socket.emit('leave')
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
    this.props.setKeepCall(false)
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

  handlePressReturn() {
    this.props.setKeepCall(false)
    navigator.navigate('Call', { currentState: this.state })
  }

  renderContent() {
    if (this.state.isRemoteShowVideo && this.props.callStatus === CALLING) {
      return WebRTC.mapHash((remote, index) => (
        <RTCView key={index} streamURL={remote} style={styles.popupRTC} objectFit="cover" />
      ))
    }
    return (
      <Text style={styles.text}>{this.props.callStatus === CALLING ? 'Calling...' : 'Waiting...'} </Text>
    )
  }

  renderPopup() {
    return (
      <TouchableOpacity
        style={styles.popupContainer}
        onPress={() => this.handleShowButton()}
        disabled={this.state.isShowButton}
        activeOpacity={1}
      >
        <ImageBackground
          source={{
            uri: imageBackground,
          }}
          style={styles.imageBackground}
        >
          {this.renderContent()}
          {this.state.isShowButton && (
            <GroupButtonPopup
              onPressShowVideo={this.handlePressShowVideo}
              onPressMute={this.handlePressMute}
              onPressEndCall={this.handlePressEndCall}
              onPressSwitchCamera={this.handleSwitchCamera}
              onPressExpand={this.handlePressReturn}
              isShowVideo={this.state.isShowVideo}
              isMute={this.state.isMute}
            />
          )}
        </ImageBackground>
      </TouchableOpacity>
    )
  }
  render() {
    return this.renderPopup()
  }
}

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  popupRTC: {
    width: width / 2 - 10,
    height: height / 2.5 - 20,
  },
  text: {
    paddingTop: 50,
    alignSelf: 'center',
    fontSize: 24,
    color: theme.red,
  },
})

const mapStateToProps = (state) => ({
  isKeepCall: state.authSocket.isKeepCall,
  callStatus: state.authSocket.callStatus,
  currentState: state.authSocket.currentState,
})

export default connect(
  mapStateToProps,
  { setKeepCall, setCallStatus }
)(PopupCallContainer)
