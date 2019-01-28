import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_LOGIN_SUCCESS,
} from 'constant/UserConstant'

export const loginAction = (data) => {
  return {
    type: USER_LOGIN,
    payload: { data },
  }
}

export const loginSuccessAction = (data) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: { data },
  }
}

export const registerAction = (data) => {
  return {
    type: USER_REGISTER,
    payload: { data },
  }
}

export const logoutAction = () => {
  return {
    type: USER_LOGOUT,
  }
}
