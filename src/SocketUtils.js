// import { Alert } from 'react-native'
import io from 'socket.io-client'
import Utils from './Utils'
// import LiveStatus from './liveStatus'

let store = null
const socket = io(
  Utils.getSocketIOIP(),
  { transports: ['websocket'], upgrade: false },
)

const getSocket = () => {
  return socket
}

const connect = (initstore) => {
  store = initstore
  socket.emit('testconnect', { data: 'data' })
  // socket.on('testconnect', (data) => {
  //   console.log('data ', data)
  //   store.dispatch({
  //     type: 'TEST_SOCKETIO',
  //     payload: { data },
  //   })
  // })
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

const emitFinishLiveStream = (roomName) => {
  socket.emit(
    'finish-live-stream',
    {
      roomName,
    },
  )
}

const emitJoinServer = (roomName, userId) => {
  socket.emit('join-server', { roomName, userId })
}

const handleOnClientJoin = () => {
  socket.on('join-client', (data) => {
    store.dispatch({
      type: 'UPDATE_ROOM_SUCCESS',
      payload: { data },
    })
  })
}

const handleOnSendHeart = () => {
  socket.on('send-heart', (data) => {
    console.log('send-heart')
    store.dispatch({
      type: 'UPDATE_ROOM_SUCCESS',
      payload: { data },
    })
  })
}

const emitSendHeart = (roomName, type) => {
  socket.emit('send-heart', { roomName, type })
}

const handleOnSendMessage = () => {
  socket.on('send-message', (data) => {
    const { comment, roomName } = data
    store.dispatch({
      type: 'ADD_NEW_COMMENT_SUCCESS',
      payload: { comment, roomName },
    })
  })
}

const emitSendMessage = (
  roomName,
  userId,
  message,
  username,
) => {
  socket.emit('send-message', {
    roomName,
    userId,
    message,
    username,
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
    store.dispatch({
      type: 'ADD_NEW_VIDEO_LIVE_SUCCESS',
      payload: { data },
    })
  })
}

const onVideoLiveStreamFinish = () => {
  socket.on('live-stream-finish', (data) => {
    console.log('data finish ', data)

    store.dispatch({
      type: 'DELETE_NEW_VIDEO_LIVE_SUCCESS',
      payload: { data },
    })
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
