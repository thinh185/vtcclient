import io from 'socket.io-client'

// Socket
const connectionConfig = {
  jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket'],
}

export const socket = io.connect(
  'https://videocalltung.herokuapp.com',
  connectionConfig
)
