import { DictInfo, Success } from '../data'

export const getAllDictList = req => {
  req = JSON.parse(req.body)
  return DictInfo['tree']
}

export const getAllDictDataList = req => {
  req = JSON.parse(req.body)
  return DictInfo['all']
}

export const deleteDict = req => {
  req = JSON.parse(req.body)
  return Success
}

export const deleteDictData = req => {
  req = JSON.parse(req.body)
  return Success
}
export const editDict = req => {
  req = JSON.parse(req.body)
  return Success
}

export const addDict = req => {
  req = JSON.parse(req.body)
  return Success
}

export const editDictData = req => {
  req = JSON.parse(req.body)
  return Success
}

export const addDictData = req => {
  req = JSON.parse(req.body)
  return Success
}

