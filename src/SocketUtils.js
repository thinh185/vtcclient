// import { Alert } from 'react-native'
import io from 'socket.io-client'
import Utils from './Utils'
// import LiveStatus from './liveStatus'

let store = null
const socket = io(
  Utils.getSocketIOIP(),
  { transports: ['websocket'] },
)

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
  socket.on('on_live_stream', (data) => {
    store.dispatch({
      type: 'CREATE_ROOM_STREAM_SUCCESS',
      payload: { data },
    })
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
    },
  )
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

const onNewVideoLiveStream = () => {
  socket.on('new-live-stream', (data) => {
    console.log('data ', data)
  })
}

const onVideoLiveStreamFinish = () => {
  socket.on('live-stream-finish', (data) => {
    console.log('data ', data)
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
  handleOnSendHeart,
  emitSendHeart,
  handleOnSendMessage,
  emitSendMessage,
  emitLeaveServer,
  handleOnLeaveClient,
  onNewVideoLiveStream,
  onVideoLiveStreamFinish,
}
export default SocketUtils
