import { all, fork } from 'redux-saga/effects'
import UserSaga from 'saga/UserSaga'

export default function* rootSaga() {
  yield all([
    fork(UserSaga),
  ])
}
