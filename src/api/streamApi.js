import api from 'utils/apisaure'

const list_livestream = () => {
  return api.post('/stream/list_live_stream')
}

const getLink_stream = () => {
  return api.get('http://10.240.152.180:8081/v1/stream_link', {
    params: {
      username: 'ductm',
      token: 'bacasdasd',
    } })
}

export default {
  list_livestream,
  getLink_stream,
}
