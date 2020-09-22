import * as Server from '@/libs/request'

// 列表
export const getAllDictList = (params) => {
  return Server.getRequest('/dict/getAllDictList', params)
}

// 详情列表by id
export const getAllDictDataList = (params) => {
  return Server.postRequest('/dict/getAllDictDataList', params)
}

// 删除字典
export const deleteDict = (params) => {
  return Server.deleteRequest('/dict/deleteDict', params)
}

// 删除字典下的数据
export const deleteDictData = (params) => {
  return Server.deleteRequest('/dict/deleteDictData', params)
}

// 修改字典下的数据
export const editDictData = (params) => {
  return Server.postRequest('/dict/editDictData', params)
}

// 添加字典下的数据
export const addDictData = (params) => {
  return Server.postRequest('/dict/addDictData', params)
}

// 修改
export const editDict = (params) => {
  return Server.postRequest('/dict/editDict', params)
}

// 添加
export const addDict = (params) => {
  return Server.postRequest('/dict/addDict', params)
}
