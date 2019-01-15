import { all, fork } from 'redux-saga/effects'
import UserSaga from 'saga/UserSaga'
import StreamSaga from 'saga/StreamSaga'

export default function* rootSaga() {
  yield all([
    fork(UserSaga),
    fork(StreamSaga),
  ])
}
