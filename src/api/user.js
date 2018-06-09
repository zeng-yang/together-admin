// 跟用户有关的API

import { axios } from './index'
import qs from 'qs'

const user = {
  /**
   * 使用密码登录,client_id (返回的token写在store中,然后在用拦截器来给所有请求增加header)
   * @param {String} username 用户名
   * @param {String} password 密码
   * @param {String} client_id 目前是写死,暂无作用但必须提供
   */
  login (username, password) {
    var data = {}
    data.username = username
    data.password = password
    data.client_id = 'eivexVfHUVu3IWJQuIE9TmqNk3hfQ3XA'
    data.grant_type = 'password'
    data = qs.stringify(data)// 格式化
    return axios({
      method: 'post',
      url: '/oauth/token',
      data: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(res => {
        return res
      })
      .catch(e => {
        return Promise.reject(e)
      })
  },
  getUserList (params) {
    var url = '/users'
    return axios.get(url, {params:params}).then(res => {
      return res
    })
    .catch(e => {
      return Promise.reject(e)
    })
  }
}

export default user