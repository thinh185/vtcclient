import { put, takeLatest, call } from 'redux-saga/effects'
import { Alert } from 'react-native'
import UserAPI from 'api/userApi'
import navigator from 'navigations/customNavigator'

export default function* userSagas() {
  yield takeLatest('USER_LOGIN', fetchUserSaga)
  yield takeLatest('USER_REGISTER', registerSaga)
  yield takeLatest('LIVE_STREAM', fetchLiveStreamSaga)
}

function* fetchUserSaga({ payload: { data } }) {
  const res = yield call(UserAPI.login, data)
  const { user } = res.data.result

  yield put({ type: 'USER_LOGIN_SUCCESS', payload: { user } })
  navigator.navigate('Contact')
}

function* registerSaga({ payload: { data } }) {
  const res = yield call(UserAPI.register, data)
  const result = res.data

  if (result.code == 200) {
    Alert.alert('Register success')
    navigator.navigate('Login')
  }
}

function* fetchLiveStreamSaga() {
  const res = yield call(UserAPI.list_livestream)
  const { list_live } = res.data.result

  yield put({ type: 'LIVE_STREAM_SUCCESS', payload: { list_live } })
}
