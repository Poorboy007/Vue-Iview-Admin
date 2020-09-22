import { MenuList, Success } from '../data'
export const getMenuList = req => {
  req = JSON.parse(req.body)
  return MenuList['menu']
}

export const getAllMenuList = req => {
  req = JSON.parse(req.body)
  return MenuList['all']
}

export const deletePermission = req => {
  req = JSON.parse(req.body)
  return Success
}

export const editPermission = req => {
  req = JSON.parse(req.body)
  return Success
}

export const addPermission = req => {
  req = JSON.parse(req.body)
  return Success
}
