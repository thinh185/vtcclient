import { create } from 'apisauce'

const api = create({})

export function configApi(token) {
  api.setBaseURL('http://a659f2e2.ngrok.io')
  api.setHeader('Accept', 'application/vnd.github.v3+json')
  if (token) {
    api.setHeader('Authorization', `Bearer ${token}`)
  }
  const naviMonitor = response => console.log('hey!  listen! ', response)
  api.addMonitor(naviMonitor)
}

export default api
