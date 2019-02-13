import {
  SET_DEVICE_TOKEN,
  LOGIN_SOCKET_SUCCESS,
  SET_CALL_STATUS,
  SET_FRIEND_LIST,
  KEEP_CALL,
} from './AuthenType'

export const setDeviceToken = (deviceToken) => {
  return {
    type: SET_DEVICE_TOKEN,
    payload: { deviceToken },
  }
}

// Socket
export const loginSocketSuccess = (user) => {
  return {
    type: LOGIN_SOCKET_SUCCESS,
    payload: {
      user: user,
    },
  }
}

export const setCallStatus = (callStatus) => {
  return {
    type: SET_CALL_STATUS,
    payload: {
      callStatus: callStatus,
    },
  }
}

export const setFriendList = (friends) => {
  return {
    type: SET_FRIEND_LIST,
    payload: {
      friends: friends,
    },
  }
}

export const setKeepCall = (isKeepCall, currentState = {}) => {
  return {
    type: KEEP_CALL,
    payload: {
      isKeepCall,
      currentState,
    },
  }
}
