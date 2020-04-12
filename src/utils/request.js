import axios from 'axios'
import JSONBIGINT from 'json-bigint'
import store from '@/store'
import router from '@/router'
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [data => {
    try {
      return JSONBIGINT.parse(data)
    } catch (err) {
      return data
    }
  }]
})

instance.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => {
  try {
    return res.data.data
  } catch (e) {
    return res
  }
}, async err => {
  if (err.response && err.response.status === 401) {
    const loginConfig = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    const { user } = store.state
    if (!user || !user.token || !user.refresh_token) {
      return router.push(loginConfig)
    }
    try {
      const { data: { data } } = await axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'put',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      store.commit('setUser', {
        token: data.token,
        refresh_token: user.refresh_token
      })
      return instance(err.config)
    } catch (e) {
      store.commit('delUser')
      return router.push(loginConfig)
    }
  }
  return Promise.reject(err)
})

export default (url, method, data) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}
