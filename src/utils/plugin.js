import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)

const sleep = () => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, 1000)
  })
}

const relTime = (value) => {
  // return '22222'
  return dayjs().locale('zh-cn').from(value)
}

export default {
  install (Vue) {
    Vue.prototype.$sleep = sleep
    Vue.filter('relTime', relTime)
  }
}
