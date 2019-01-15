import { create } from 'apisauce'

const api = create({})

export function configApi(token) {
  // api.setBaseURL('http://172.16.1.158:3333')
  api.setBaseURL('http://192.168.10.122:3333')
  api.setHeader('Accept', 'application/vnd.github.v3+json')
  if (token) {
    api.setHeader('Authorization', `Bearer ${token}`)
  }
  const naviMonitor = response => console.log('hey!  listen! ', response)
  api.addMonitor(naviMonitor)
}

export default api
