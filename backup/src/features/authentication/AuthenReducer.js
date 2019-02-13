import {
  SET_DEVICE_TOKEN,
  LOGIN_SOCKET_SUCCESS,
  SET_BUSY,
  SET_CALL_STATUS,
  SET_FRIEND_LIST,
  KEEP_CALL,
} from './AuthenType'
import { FREE } from "../videocall/constains";

const initAuthSocketState = {
  user: {},
  busy: false,
  callStatus: FREE,
  friends: [],
  isKeepCall: false,
  currentState: {},
  notificationToken: '',
}

export const authSocketReducer = (state = initAuthSocketState, action) => {
  const { payload, type } = action
  switch (type) {
    case LOGIN_SOCKET_SUCCESS:
      return {
        ...state,
        user: payload.user,
      }
    case SET_BUSY:
      return {
        ...state,
        busy: payload.busy,
      }
    case SET_CALL_STATUS:
      return {
        ...state,
        callStatus: payload.callStatus,
      }
    case SET_FRIEND_LIST:
      return {
        ...state,
        friends: payload.friends.filter((item) => item.id !== state.user.id),
      }
    case KEEP_CALL:
      return {
        ...state,
        isKeepCall: payload.isKeepCall,
        currentState: payload.currentState,
      }
    case SET_DEVICE_TOKEN:
      console.log(payload.deviceToken)
      return {
        ...state,
        notificationToken: payload.deviceToken,
      }
    default:
      return state
  }
}
