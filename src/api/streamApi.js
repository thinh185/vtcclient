import api from 'utils/apisaure'

const list_livestream = () => {
  return api.post('/stream/list_live_stream')
}

export default {
  list_livestream,
}
