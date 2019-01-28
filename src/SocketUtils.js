import io from 'socket.io-client'
import {
  REGISTER_ROOM_LIVE_STREAM_SUCCESS,
  ADD_NEW_LIVE_STREAM_SUCCESS,
  UPDATE_ROOM_LIVE_STREAM_SUCCESS,
  ADD_NEW_COMMENT_LIVE_STREAM_SUCCESS,
  DELETE_LIVE_STREAM_FINISH_SUCCESS,
} from 'constant/StreamConstant'
import Utils from './Utils'

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
      type: REGISTER_ROOM_LIVE_STREAM_SUCCESS,
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
      type: UPDATE_ROOM_LIVE_STREAM_SUCCESS,
      payload: { data },
    })
  })
}

const handleOnInteraction = () => {
  socket.on('send-interaction', (data) => {
    store.dispatch({
      type: UPDATE_ROOM_LIVE_STREAM_SUCCESS,
      payload: { data },
    })
  })
}

const emitSendHeart = (roomName) => {
  socket.emit('send-interaction', { roomName })
}

const handleOnSendMessage = () => {
  socket.on('send-message', (data) => {
    const { comment, roomName } = data
    store.dispatch({
      type: ADD_NEW_COMMENT_LIVE_STREAM_SUCCESS,
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
      type: ADD_NEW_LIVE_STREAM_SUCCESS,
      payload: { data },
    })
  })
}

const onVideoLiveStreamFinish = () => {
  socket.on('live-stream-finish', (data) => {
    store.dispatch({
      type: DELETE_LIVE_STREAM_FINISH_SUCCESS,
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
  handleOnInteraction,
  emitSendHeart,
  handleOnSendMessage,
  emitSendMessage,
  emitLeaveServer,
  handleOnLeaveClient,
  onNewVideoLiveStream,
  onVideoLiveStreamFinish,
}
export default SocketUtils
