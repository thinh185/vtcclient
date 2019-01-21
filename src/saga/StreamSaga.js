import { put, takeLatest, call } from 'redux-saga/effects'
import streamAPI from 'api/streamApi'

export default function* userSagas() {
  yield takeLatest('LIVE_STREAM', fetchLiveStreamSaga)
  yield takeLatest('EDGE_GETLINK', fetchEdgeLinkStreamSaga)
}

function* fetchLiveStreamSaga() {
  const res = yield call(streamAPI.list_livestream)
  const { list_live } = res.data.result

  if (res.data.code === 200) {
    yield put({ type: 'LIVE_STREAM_SUCCESS', payload: { list_live } })
  }
}

function* fetchEdgeLinkStreamSaga() {
  const res = yield call(streamAPI.list_livestream)
  const { data } = res

  if (data.code === 0) {
    yield put({ type: 'EDGE_GETLINK_SUCCESS', payload: { data } })
  }
}
