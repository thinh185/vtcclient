import api from 'utils/apisaure'

const login = (data) => {
  return api.post('/authen/login', data)
}

const register = (data) => {
  return api.post('/authen/register', data)
}

export default {
  login,
  register,
}
