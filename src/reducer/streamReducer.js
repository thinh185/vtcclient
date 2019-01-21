const initState = {
  list_live: [],
  streamOnline: {},
  link_stream: null,
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
      const { data: { newroom } } = payload
      return {
        ...state,
        list_live: [...state.list_live, newroom],
      }
    case 'DELETE_NEW_VIDEO_LIVE_SUCCESS':
      const { data: { roomName } } = payload
      console.log('roomName ', roomName)

      return {
        ...state,
        list_live: state.list_live.filter(item => item.roomName !== roomName),
        streamOnline: {},
      }
    case 'CREATE_ROOM_STREAM_SUCCESS':
      return {
        ...state,
        streamOnline: {
          ...state.streamOnline,
          ...payload.data,
        },
      }
    case 'EDGE_GETLINK_SUCCESS':
      return {
        ...state,
        link_stream: payload.data.result,
      }
    case 'UPDATE_ROOM_SUCCESS':
      const { data } = payload
      const update_list = state.list_live.map((el) => {
        if (el.roomName === data.roomName) {
          return {
            ...el,
            ...data,
          }
        }
        return el
      })
      return {
        ...state,
        list_live: update_list,
      }
    case 'ADD_NEW_COMMENT_SUCCESS':
      const { comment } = payload
      const new_update_list = state.list_live.map((el) => {
        if (el.roomName === payload.roomName) {
          return {
            ...el,
            comments: [...el.comments, comment],
          }
        }
        return el
      })
      return {
        ...state,
        list_live: new_update_list,
      }
    default:
      return state
  }
}
