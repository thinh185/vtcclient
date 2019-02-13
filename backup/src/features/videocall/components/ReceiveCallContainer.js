import React, { Component } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import theme from 'config/theme'
import { socket } from '../socketConfig'
import { UserInfoPopup } from 'features/user/components'
import { connect } from 'react-redux'
import GroupButtonReceiveCall from './buttons/GroupButtonReceiveCall'
import { setCallStatus } from 'features/authentication/AuthenAction'
import InCallManager from 'react-native-incall-manager'
import WebRTC from '../services'
import { CALL_ACCEPTED, CALL_REJECTED, CALLING, FREE, STOP_WAITING, WAITING } from "../constains";

class SendCallContainer extends Component {
  constructor(props) {
    super(props)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
    InCallManager.startRingtone('_DEFAULT_')
  }

  componentDidMount() {
    const container = this
    socket.on('message', function(data) {
      switch (data.type) {
        case STOP_WAITING:
          container.onStopWaiting()
          break
        default:
          break
      }
    })
    socket.on('leave', function(socketId) {
      WebRTC.leave(socketId)
      WebRTC.resetAll()
      container.props.setCallStatus(FREE)
      container.props.navigation.goBack()
    })
  }

  handleAccept() {
    const data = this.props.navigation.getParam('data')
    InCallManager.stopRingtone()
    InCallManager.start()
    socket.send({
      type: CALL_ACCEPTED,
      caller: data.caller,
      roomID: data.roomID,
      from: this.props.me,
    })
    this.props.setCallStatus(CALLING)
    this.props.navigation.replace('Call', { roomID: data.roomID, isReceiver: true, isVideoCall: data.isVideoCall, caller: data.caller })
  }
  handleReject() {
    const data = this.props.navigation.getParam('data')
    InCallManager.stopRingtone()
    InCallManager.stop()
    socket.send({
      type: CALL_REJECTED,
      caller: data.caller,
      from: this.props.me,
    })
    this.props.setCallStatus(FREE)
    this.props.navigation.goBack()
  }

  onStopWaiting() {
    if (this.props.callStatus === WAITING) {
      this.props.setCallStatus(FREE)
      InCallManager.stopRingtone()
      InCallManager.stop()
      this.props.navigation.goBack()
    }
  }

  render() {
    const data = this.props.navigation.getParam('data')
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <UserInfoPopup user={data.caller} content={'Call from Video Call app'} />
        <GroupButtonReceiveCall onPressAccept={this.handleAccept} onPressReject={this.handleReject} />
      </View>
    )
  }
}

SendCallContainer.propTypes = {
  me: PropTypes.object,
  navigation: PropTypes.object,
  setCallStatus: PropTypes.func,
  callStatus: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgIconColor,
  },
})

const mapStateToProps = (state) => ({
  me: state.authSocket.user,
  callStatus: state.authSocket.callStatus,
})

export default connect(
  mapStateToProps,
  {
    setCallStatus,
  }
)(SendCallContainer)
