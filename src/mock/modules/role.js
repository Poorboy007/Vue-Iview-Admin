import { RoleInfo, Success } from '../data'

export const getRoleList = req => {
  req = JSON.parse(req.body)
  return RoleInfo['roleList']
}

export const batchDelRole = req => {
  req = JSON.parse(req.body)
  return Success
}

export const deleteRole = req => {
  req = JSON.parse(req.body)
  return Success
}

export const editRole = req => {
  req = JSON.parse(req.body)
  return Success
}

export const editRolePerm = req => {
  req = JSON.parse(req.body)
  return Success
}

export const addRole = req => {
  req = JSON.parse(req.body)
  return Success
}
