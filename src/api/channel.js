import request from '@/utils/request.js'
export const getMyChannels = () => {
  return request('/app/v1_0/user/channels', 'get')
}
