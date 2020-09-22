/*
 *@Description: axios 封装
 *@Author:  LiuFch
*/
import axios from 'axios'
import { Message } from 'view-design'
import { Config } from '@/libs/utils'
import * as Auth from '@/libs/auth'
import router from '@/router/index'

const CancelToken = axios.CancelToken
let httpRequestList = []
// 创建实例
const Server = axios.create({
  // 设置axios 请求URL公共部分配置项
  baseURL: `${Config.API_BASE_URL}${Config.API_PERFIX}`,
  // 超时时间
  timeout: Config.API_REQUEST_TIMEOUT
})

// 请求拦截
Server.interceptors.request.use(requestConfig => {
  httpRequestList.forEach(item => {
    // item('interrupt')// 给个标志，中断请求
  })
  return requestConfig
}, err => {
  return Promise.resolve(err)
})

// 响应拦截
Server.interceptors.response.use(response => {
  // 这里根据后端提供的数据进行对应的处理
  const data = response.data
  // 根据返回的code值来做不同的处理(和后端约定)
  switch (data.code) {
    case 401:
      // 未登录 清除已登录状态
      Auth.removeToken()
      Auth.removeAccount()
      Auth.removePageOpenedList()
      if (router.history.current.name !== 'login') {
        if (data.message !== null) {
          Message.error(data.message)
        } else {
          Message.error('未知错误，请重新登录')
        }
        router.push('/login')
      }
      break
    case 403:
      // 没有权限
      if (data.message !== null) {
        Message.error(data.message)
      } else {
        Message.error('未知错误')
      }
      break
    case 500:
      // 错误
      if (data.message !== null) {
        Message.error(data.message)
      } else {
        Message.error('未知错误')
      }
      break
    default:
      return data
  }
}, (err) => {
  if (err.message === 'interrupt') {
    // console.log('已中断请求')
    return Promise.reject(err)
  } else {
    return Promise.reject(err)
  }
})

// 处理 headers、errorlog
const handle = {
  defaultOptions: {
    noToken: false,
    uploadFile: false,
    header: undefined
  },
  defaultHeaders: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'accessToken': 'accessToken'
  },
  addErrorLog() { },
  options(obj) {
    const headers = Object.assign({}, this.defaultHeaders)
    if (typeof (obj) !== 'undefined') {
      const opt = Object.assign(this.defaultOptions, obj)
      if (opt.noToken) {
        delete headers.accessToken // 不带Token
      } else if (opt.uploadFile) {
        headers['Content-Type'] = 'multipart/form-data' // 上传文件 指定 Content-Type => 'multipart/form-data'
      } else if (typeof (opt.header) !== 'undefined') {
        headers['Content-Type'] = opt.header // 自定义 Content-Type
      }
    }
    return { headers: headers }
  }
}

// 对请求进行包装

/**
 * @description:  method => get
 * @param { String } url 请求路径
 * @param { Object } params 请求参数
 * @param { Object } opt 请求headers 相关场景处理，不传使用 默认
 * @author:  LiuFch
 */
const getRequest = (url, params, opt) => {
  let Obj = handle.options(opt)
  return Server({
    method: 'get',
    url: `${url}`,
    params: params,
    cancelToken: new CancelToken(c => { // 强行中断请求要用到的
      httpRequestList.push(c)
    }),
    headers: Obj.headers
  }).catch((error) => {
    return new Promise(() => { console.log(error) })
  })
}

/**
 * @description:  method => post
 * @param { String } url 请求路径
 * @param { Object } params 请求参数
 * @param { Object } opt 请求headers 相关场景处理，不传使用 默认
 * @author:  LiuFch
 */
const postRequest = (url, params, opt) => {
  let Obj = handle.options(opt)
  return Server({
    method: 'post',
    url: `${url}`,
    data: params,
    // transformRequest: [data => {
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //   }
    //   return ret
    // }],
    headers: Obj.headers
  })
}

/**
 * @description:  method => delete
 * @param { String } url 请求路径
 * @param { Object } params 请求参数
 * @param { Object } opt 请求headers 相关场景处理，不传使用 默认
 * @author:  LiuFch
 */
const deleteRequest = (url, params, opt) => {
  let Obj = handle.options(opt)
  return Server({
    method: 'delete',
    url: `${url}`,
    data: params,
    headers: Obj.headers
  })
}

/**
 * @description:  method => put
 * @param { String } url 请求路径
 * @param { Object } params 请求参数
 * @param { Object } opt 请求headers 相关场景处理，不传使用 默认
 * @author:  LiuFch
 */
const putRequest = (url, params) => {
  let Obj = handle.options(opt)
  return Server({
    method: 'put',
    url: `${url}`,
    data: params,
    transformRequest: [data => {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substring(0, ret.length - 1)
      return ret
    }],
    headers: Obj.headers
  })
}

export { getRequest, postRequest, deleteRequest, putRequest }
