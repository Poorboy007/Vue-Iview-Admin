import { UserInfo, Success } from '../data'

// 获取当前用户信息
export const userInfo = req => {
  req = JSON.parse(req.body)
  return UserInfo['userInfo']
}

// 获取列表
export const getUserList = req => {
  req = JSON.parse(req.body)
  return UserInfo['userList']
}

// 批量删除
export const batchDelUser = req => {
  req = JSON.parse(req.body)
  return Success
}

// 删除
export const deleteUser = req => {
  req = JSON.parse(req.body)
  return Success
}

export const editUser = req => {
  req = JSON.parse(req.body)
  return Success
}

export const addUser = req => {
  req = JSON.parse(req.body)
  return Success
}
