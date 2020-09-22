import * as Server from '@/libs/request'

// 菜单列表
export const getAllMenuList = (params) => {
  return Server.getRequest('/menu/getAllMenuList', params)
}

// 删除菜单
export const deletePermission = (params) => {
  return Server.deleteRequest('/menu/deletePermission', params)
}

// 修改菜单
export const editPermission = (params) => {
  return Server.postRequest('/menu/editPermission', params)
}

// 添加菜单
export const addPermission = (params) => {
  return Server.postRequest('/menu/addPermission', params)
}
