const initState = {
  list_live: [],
  streamOnline: {},
}

export const streamReducer = (state = initState, action) => {
  const { payload, type } = action
  switch (type) {
    case 'LIVE_STREAM_SUCCESS':
      const { list_live } = payload
      return {
        ...state,
        list_live,
      }
    case 'ADD_NEW_VIDEO_LIVE_SUCCESS':
      const { videoLive } = payload
      return {
        ...state,
        list_live: [...state.list_live, videoLive],
      }
    case 'DELETE_NEW_VIDEO_LIVE_SUCCESS':
      const { roomName } = payload
      return {
        ...state,
        list_live: state.list_live.map(item => item.roomName !== roomName),
      }
    case 'CREATE_ROOM_STREAM_SUCCESS':
      return {
        ...state,
        streamOnline: {
          ...state.streamOnline,
          ...payload.data,
        },
      }

    default:
      return state
  }
}
