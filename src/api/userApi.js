import api from 'utils/apisaure'

const login = (data) => {
  return api.post('/authen/login', data)
}

const register = (data) => {
  return api.post('/authen/register', data)
}

const list_livestream = () => {
  return api.post('/authen/list_liveStream')
}

export default {
  login,
  register,
  list_livestream,
}
