import * as Server from '@/libs/request'

// 角色列表
export const getRoleList = (params) => {
  return Server.getRequest('/role/getRoleList', params)
}

// 批量删除角色
export const batchDelRole = (params) => {
  return Server.deleteRequest('/role/batchDelRole', params)
}

// 删除角色
export const deleteRole = (params) => {
  return Server.deleteRequest('/role/deleteRole', params)
}

// 修改角色
export const editRole = (params) => {
  return Server.postRequest('/role/editRole', params)
}

// 添加角色
export const addRole = (params) => {
  return Server.postRequest('/role/addRole', params)
}

// 修改角色权限
export const editRolePerm = (params) => {
  return Server.postRequest('/role/editRolePerm', params)
}
