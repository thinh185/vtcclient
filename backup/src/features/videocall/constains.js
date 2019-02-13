import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
export const TYPE_VOICE = 'VOICE'
export const TYPE_VIDEO = 'VIDEO'

export const heightPopup = height / 2.5 - 20
export const widthPopup = width / 2 - 10

export const FREE = 'free'
export const CALLING = 'calling'
export const WAITING = 'waiting'
export const CALL_RESPONSE = 'call_response'
export const STOP_WAITING = 'stopWaiting'
export const OFFLINE = 'offline'
export const ACCEPTED = 'accepted'
export const REJECTED = 'rejected'
export const BUSY = 'busy'
export const CALL_USER = 'call_user'
export const STOP_CALL_USER = 'stop_call_user'
export const CALL_ACCEPTED = 'call_accepted'
export const CALL_REJECTED = 'call_rejected'
export const CALL_BUSY = 'call_busy'
export const LOGIN = 'login'
export const CONNECT = 'connect'
export const DISCONNECT = 'disconnect'
export const MISSING = 'missing'
export const END_CALL = 'end_call'
