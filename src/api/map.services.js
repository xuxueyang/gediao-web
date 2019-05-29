import services from './file.services'
import request from '@/utils/request'

const getAllMapTypes = () => {
  const url = '' + services.getServiceIp() + '/api/game/map/editor/getAllMapTypes'
  // return this.$http.get(url, {})
  return request({
    url: url,
    method: 'get',
    params: { }
  })
}
const saveMapBase = (info) => {
  const url = '' + services.getServiceIp() + '/api/game/map/editor/saveMapBase'
  return request({
    url: url,
    method: 'post',
    data: info
  })
}
export default {
  getAllMapTypes,
  saveMapBase
}

// export function login(username, password) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }
