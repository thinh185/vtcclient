import { put, takeLatest, call } from 'redux-saga/effects'
import streamAPI from 'api/streamApi'
import {
  GET_LINK_LIVE_STREAM_CLIENT,
  GET_LIST_LIVE_STREAM,
} from 'constant/StreamConstant'
import { updateListLiveStream, updateLinkStreamClient } from 'actions/streamAction'
import ApiStatus from 'constant/ApiStatus'

export default function* userSagas() {
  yield takeLatest(GET_LIST_LIVE_STREAM, fetchLiveStreamSaga)
  yield takeLatest(GET_LINK_LIVE_STREAM_CLIENT, fetchEdgeLinkStreamSaga)
}

function* fetchLiveStreamSaga() {
  const res = yield call(streamAPI.list_livestream)
  const { list_live } = res.data.result
  if (res.data.code === ApiStatus.SUCCESS) {
    yield put(updateListLiveStream(list_live))
  }
}

function* fetchEdgeLinkStreamSaga() {
  const res = yield call(streamAPI.getLink_stream)
  const { data } = res

  if (data.code === ApiStatus.SUCCESSFULL) {
    yield put(updateLinkStreamClient(data))
  }
}
