import { put, takeLatest, call } from 'redux-saga/effects'
import { Alert } from 'react-native'
import UserAPI from 'api/userApi'
import navigator from 'navigations/customNavigator'

export default function* userSagas() {
  yield takeLatest('USER_LOGIN', fetchUserSaga)
  yield takeLatest('USER_REGISTER', registerSaga)
}

function* fetchUserSaga({ payload: { data } }) {
  const res = yield call(UserAPI.login, data)
  if (res.data === null) {
    Alert.alert('System error')
    return
  }
  const { result } = res.data
  const { user } = result

  if (res.data.code === 200) {
    yield put({ type: 'USER_LOGIN_SUCCESS', payload: { user } })
    navigator.navigate('Contact')
  } else {
    Alert.alert('Login Error')
  }
}

function* registerSaga({ payload: { data } }) {
  const res = yield call(UserAPI.register, data)
  const result = res.data

  if (result.code == 200) {
    Alert.alert('Register success')
    navigator.navigate('Login')
  } else {
    Alert.alert('Register Error')
  }
}
