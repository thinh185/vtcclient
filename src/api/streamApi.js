import api from 'utils/apisaure'
import { create } from 'apisauce'

// create a new instance of Frisbee
const api2 = create({
  baseURL: 'http://10.240.152.180:8081', // optional
  headers: {
    Accept: 'application/json',
  },
})


const naviMonitor = response => console.log('hey!  listen2! ', response)
api2.addMonitor(naviMonitor)

const list_livestream = () => {
  return api.post('/stream/list_live_stream')
}


const getLink_stream = async () => {
  try {
    const res = await api2.post('/v1/stream_link', { username: 'ductm', token: 'bacasdasd' })

    return res
  } catch (error) {
    console.log('error', error)
  }
}

export default {
  list_livestream,
  getLink_stream,
}
