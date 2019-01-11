import { put, takeLatest } from 'redux-saga/effects'

export default function* userSagas() {
  yield takeLatest('AUTHEN_SAGA', fetchUserSaga)
}

function* fetchUserSaga({ payload: { params, collection } }) {
  yield put({ type: 'AUTHEN_SAGA', payload: { params, collection } })
}
