// import request from '@/utils/request'
// export const login = (loginForm) => {
//   return request('/app/v1_0/authorizations', 'post', loginForm)
// }

import request from '@/utils/request'
export const login = (loginForm) => {
  return request('/app/v1_0/authorizations', 'post', loginForm)
}
