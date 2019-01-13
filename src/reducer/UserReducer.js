const initState = {
  user: {},
  token: null,
  isLoading: false,
  error: '',
  notificationToken: '',
  unAnswered: {
    num_blog: 0,
    num_question: 0,
  },
  list_live: [],
}

export const userReducer = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case 'USER_LOGIN_SUCCESS':
      const { user } = payload
      return {
        ...state,
        user,
      }
    case 'LIVE_STREAM_SUCCESS':
      const { list_live } = payload
      return {
        ...state,
        list_live,
      }
    default:
      return state
  }
}
