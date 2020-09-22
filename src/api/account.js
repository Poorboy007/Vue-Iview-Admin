import * as Server from '@/libs/request'

// 登陆
export const login = (params) => {
  return Server.postRequest('/login', params)
}

// 获取用户登录信息
export const getUserInfo = (params) => {
  return Server.getRequest('/user/info', params)
}

// 获取用户菜单信息
export const getRouters = (params) => {
  return Server.getRequest('/getMenuList', params)
}
