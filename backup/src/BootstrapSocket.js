import React, { Component } from 'react'
import { socket } from './features/videocall/socketConfig'
import { showWarning } from './utils/toasts'
import navigator from './navigation/CustomNavigator'
import WebRTC from './features/videocall/services'
import InCallManager from 'react-native-incall-manager'
import connect from 'react-redux/es/connect/connect'
import { setCallStatus, setFriendList, setKeepCall } from './features/authentication/AuthenAction'
import {
  ACCEPTED,
  BUSY,
  CALL_BUSY,
  CALL_RESPONSE, CALLING,
  CONNECT, DISCONNECT, FREE, LOGIN,
  OFFLINE,
  REJECTED,
  WAITING
} from "./features/videocall/constains";

const bootstrapSocket = (Comp) => {
  class BootstrapSocket extends Component {
    componentDidMount() {
      this.props.setKeepCall(false)
      this.props.setCallStatus(FREE)
      this.compoDidMountSocket()
    }

    // Socket
    compoDidMountSocket() {
      const temp = this
      socket.on('connect_error', (error) => {
        showWarning('Lỗi kết nối server, đang thử lại!')
        if (this.props.callStatus !== FREE) {
          this.props.setCallStatus(FREE)
          this.props.setKeepCall(false)
        }
        console.log(error)
      })
      socket.on('message', function(data) {
        switch (data.type) {
          case WAITING:
            temp.onWaiting(data)
            break
          case CALL_RESPONSE:
            temp.onResponse(data)
            break
          case CONNECT:
            temp.onConnect(data)
            break
          default:
            break
        }
      })

      socket.on('roomMessage', function(data) {
        switch (data.type) {
          case LOGIN:
          case 'logout':
          case CONNECT:
            temp.setFriends(data)
            break
          case DISCONNECT:
            temp.onDisconnect(data)
            break
          default:
            break
        }
      })
    }

    onDisconnect(data) {
      this.setFriends(data)
      const me = data.users.filter((item) => item.id === this.props.user.id)[0]
      if (me && !me.active) {
        socket.send({
          type: CONNECT,
          user: {
            id: me.id,
            username: me.username,
            notificationToken: this.props.notificationToken,
            active: true,
          },
        })
      }
    }
    onWaiting(data) {
      const caller = data.caller
      const { user, callStatus } = this.props
      if (callStatus === FREE) {
        this.props.setCallStatus(WAITING)
        navigator.navigate('Receive', { data: data })
      } else {
        socket.send({
          type: CALL_BUSY,
          caller: caller,
          from: user,
        })
      }
    }

    handleBack() {
      WebRTC.resetAll()
      this.props.setCallStatus(FREE)
      InCallManager.stop({ busytone: '_DTMF_' })
      InCallManager.stop()
      if (this.props.isKeepCall) {
        this.props.setKeepCall(false)
      } else {
        navigator.goBack()
      }
    }

    handleAccepted() {
      InCallManager.stopRingback()
      InCallManager.stop()
      this.props.setCallStatus(CALLING)
    }

    onResponse(data) {
      switch (data.response) {
        case ACCEPTED:
          this.handleAccepted()
          break
        case REJECTED:
          showWarning('Người dùng từ chối!')
          this.handleBack()
          break
        case BUSY:
          showWarning('Người dùng đang bận')
          this.handleBack()
          break
        case OFFLINE:
          showWarning('Người dùng offline')
          this.handleBack()
          break
        default:
          return false
      }
    }

    onConnect(data) {
      const me = data.users.filter((item) => JSON.stringify(item) === JSON.stringify(this.props.user))
      if (!me || !me.length) {
        this.setFriends(data)
      }
    }
    setFriends(data) {
      this.props.setFriendList(data.users)
    }
    render() {
      return <Comp {...this.props} />
    }
  }

  const mapStateToProps = (state) => ({
    user: state.authSocket.user,
    callStatus: state.authSocket.callStatus,
    isKeepCall: state.authSocket.isKeepCall,
    notificationToken: state.authSocket.notificationToken,
  })

  return connect(
    mapStateToProps,
    {
      setCallStatus,
      setFriendList,
      setKeepCall,
    }
  )(BootstrapSocket)
}

export default bootstrapSocket
