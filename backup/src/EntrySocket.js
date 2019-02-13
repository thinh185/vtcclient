import React, { Component } from 'react'
import { socket } from "features/videocall/socketConfig"
import { AsyncStorage } from "react-native"
import { CONNECT } from "./features/videocall/constains";
const entrySocket = (Comp) => {
  class EntrySocket extends Component {
    componentDidMount() {
      socket.on(CONNECT, () => {
        AsyncStorage.getItem('persist:root')
          .then((result) => {
            const storage = JSON.parse(result)
            const user = storage && storage.authSocket ? JSON.parse(storage.authSocket).user : null
            if (user && user.id) {
              const notificationToken = JSON.parse(storage.authSocket).notificationToken
              EntrySocket.sendConnect(user, notificationToken)
            }
          })
          .catch((error) => {
            console.log('Entry error', error)
          })
      })
    }

    sendConnect(user, notificationToken) {
      socket.send({
        type: CONNECT,
        user: {
          id: user.id,
          username: user.username,
          notificationToken: notificationToken,
          active: true,
        },
      })
    }

    render() {
      return <Comp {...this.props}/>
    }
  }
  return EntrySocket
}

export default entrySocket
