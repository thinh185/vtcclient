export const loginAction = (data) => {
  return {
    type: 'USER_LOGIN',
    payload: { data },
  }
}

export const registerAction = (data) => {
  return {
    type: 'USER_REGISTER',
    payload: { data },
  }
}
