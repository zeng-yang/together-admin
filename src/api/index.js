// axios 初始化设置已经拦截器设置
import axios from './http'
import user from './user'
import article from './article'
import banner from './banner'
import discuss from './discuss'
import system from './system'
import game from './game'
import upload from './upload'

// axios设置默认值
axios.defaults.timeout = 15000
// axios.defaults.baseURL = 'https://together-api.zhlzzz.com'

axios.defaults.baseURL = '/api'
axios.defaults.headers = {
  'Content-Type': 'application/json;charset=UTF-8'
}

const api = {
  ...user, // 登录相关api
  ...article,
  ...banner,
  ...discuss,
  ...system,
  ...game,
  ...upload
}

// 注册vue插件
api.install = function (Vue, options) {
  if (api.install.installed) {
    return
  }
  api.install.installed = true
  Object.defineProperty(Vue.prototype, '$api', {
    get () {
      return api
    }
  })
}

export { api, axios }
