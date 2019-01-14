import { Alert } from 'react-native'
import io from 'socket.io-client'
import moment from 'moment'
import Utils from './Utils'
import LiveStatus from './liveStatus'

let store = null
const socket = io(
  Utils.getSocketIOIP(),
  { transports: ['websocket'] },
)
console.log(Utils.getSocketIOIP())

const getSocket = () => {
  return socket
}

const connect = (initstore) => {
  store = initstore
  socket.emit('testconnect', { data: 'data' })
  socket.on('testconnect', (data) => {
    console.log('data ', data)
    store.dispatch({
      type: 'TEST_SOCKETIO',
      payload: { data },
    })
  })
}

const handleOnConnect = () => {
  socket.on('connect', () => {
  })
}

const emitRegisterLiveStream = (streamKey, userId) => {
  socket.emit('register-live-stream', {
    streamKey,
    userId,
  })
}

const emitBeginLiveStream = (roomName, userId) => {
  socket.emit(
    'begin-live-stream', { roomName, userId },
  )
}

const emitFinishLiveStream = (roomName, userId) => {
  socket.emit(
    'finish-live-stream',
    {
      roomName,
      userId,
    }
  )
}

const emitCancelLiveStream = (roomName, userId) => {
  socket.emit('cancel-live-stream', {
    roomName,
    userId,
  })
}

const emitJoinServer = (roomName, userId) => {
  socket.emit('join-server', { roomName, userId })
}

const handleOnClientJoin = () => {
  socket.on('join-client', () => {
    console.log('join-client')
  })
}

const handleOnSendHeart = () => {
  socket.on('send-heart', () => {
    console.log('send-heart')
  })
}

const emitSendHeart = (roomName) => {
  socket.emit('send-heart', { roomName })
}

const handleOnSendMessage = () => {
  socket.on('send-message', (data) => {
    const { userId, message, productId, productImageUrl, productUrl } = data
    const listMessages = Utils.getContainer().state.listMessages
    const newListMessages = listMessages.slice()
    newListMessages.push({
      userId,
      message,
      productId,
      productImageUrl,
      productUrl,
    })
  })
}

const emitSendMessage = (
  roomName,
  userId,
  message,
  productId,
  productImageUrl,
  productUrl,
) => {
  socket.emit('send-message', {
    roomName,
    userId,
    message,
    productId,
    productImageUrl,
    productUrl,
  })
}

const emitLeaveServer = (roomName, userId) => {
  socket.emit('leave-server', {
    roomName,
    userId,
  })
}

const handleOnLeaveClient = () => {
  socket.on('leave-client', () => {
    console.log('leave-client')
  })
}

const handleOnChangedLiveStatus = () => {
  console.log('changed-live-status')

  socket.on('changed-live-status', (data) => {
    const { roomName, liveStatus } = data
    Utils.setRoomName(roomName)
    const currentRoomName = Utils.getRoomName()
    const currentUserType = Utils.getUserType()
    if (roomName === currentRoomName) {
      if (currentUserType === 'VIEWER') {
        if (liveStatus === LiveStatus.CANCEL) {
          Alert.alert('Alert', 'Streamer has been canceled streaming', [
            {
              text: 'Close',
              onPress: () => {
                SocketUtils.emitLeaveServer(
                  Utils.getRoomName(),
                  Utils.getUserId(),
                )
                Utils.getContainer().props.navigation.goBack()
              },
            },
          ])
        }
        if (liveStatus === LiveStatus.FINISH) {
          Alert.alert('Alert', 'Streamer finish streaming')
        }
        Utils.getContainer().setState({ liveStatus })
      }
    }
  })
}

const handleOnNotReady = () => {
  socket.on('not-ready', () => {
    console.log('not-ready')
    Utils.getContainer().alertStreamerNotReady()
  })
}

const SocketUtils = {
  getSocket,
  connect,
  handleOnConnect,
  emitRegisterLiveStream,
  emitBeginLiveStream,
  emitFinishLiveStream,
  handleOnClientJoin,
  emitJoinServer,
  emitCancelLiveStream,
  handleOnSendHeart,
  emitSendHeart,
  handleOnSendMessage,
  emitSendMessage,
  emitLeaveServer,
  handleOnLeaveClient,
  handleOnChangedLiveStatus,
  handleOnNotReady,
}
export default SocketUtils
1
