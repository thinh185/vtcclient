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
}

export const userReducer = (state = initState, action) => {
  // const { payload, type } = action
  const { type } = action
  switch (type) {
    default:
      return state
  }
}
