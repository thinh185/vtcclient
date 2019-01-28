import {
  GET_LIST_LIVE_STREAM,
  GET_LIST_LIVE_STREAM_SUCCESS,
  GET_LINK_LIVE_STREAM_CLIENT,
  GET_LINK_LIVE_STREAM_CLIENT_SUCCESS,
} from 'constant/StreamConstant'

export const listLiveStreamAction = () => {
  return {
    type: GET_LIST_LIVE_STREAM,
  }
}

export const updateListLiveStream = (data) => {
  return {
    type: GET_LIST_LIVE_STREAM_SUCCESS,
    payload: { data },
  }
}

export const getLinkStreamAction = () => {
  return {
    type: GET_LINK_LIVE_STREAM_CLIENT,
  }
}

export const updateLinkStreamClient = (data) => {
  return {
    type: GET_LINK_LIVE_STREAM_CLIENT_SUCCESS,
    payload: { data },
  }
}
