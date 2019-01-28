import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from 'constant/UserConstant'

const initState = {
  user: {},
  token: null,
  isLoading: false,
  error: '',
  notificationToken: '',
  inSys: false,
}

export const userReducer = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case USER_LOGIN_SUCCESS:
      const { user } = payload
      return {
        ...state,
        user,
        inSys: true,
      }
    case USER_LOGOUT:
      return {
        ...state,
        user: {},
        inSys: false,
      }
    default:
      return state
  }
}
