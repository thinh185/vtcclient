import { create } from 'apisauce'

// const api = create({})

// export function configApi(token) {
//   api.setBaseURL('http://172.16.2.5:3333')
//   // api.setBaseURL('http://192.168.10.122:3333')
//   api.setHeader('Accept', 'application/vnd.github.v3+json')
//   if (token) {
//     api.setHeader('Authorization', `Bearer ${token}`)
//   }
//   const naviMonitor = response => console.log('hey!  listen! ', response)
//   api.addMonitor(naviMonitor)
// }

const api = create({
  baseURL: '10.240.152.180:8081',
  headers: { Accept: 'application/vnd.github.v3+json' },
})

const stream_link = async () => {
  const res = await api.get('/v1/stream_link', { params: {
    username: 'ductm',
    token: 'bacasdasd',
  } })
  console.log('res ', res)
}

stream_link()
