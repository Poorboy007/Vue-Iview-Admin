import * as Server from '@/libs/request'

// 用户列表
export const getUserList = (params) => {
  return Server.getRequest('/user/getUserList', params)
}

// 批量删除用户
export const batchDelUser = (params) => {
  return Server.deleteRequest('/user/batchDelUser', params)
}

// 删除用户
export const deleteUser = (params) => {
  return Server.deleteRequest('/user/deleteUser', params)
}

// 修改用户
export const editUser = (params) => {
  return Server.postRequest('/user/editUser', params)
}

// 添加用户
export const addUser = (params) => {
  return Server.postRequest('/user/addUser', params)
}
