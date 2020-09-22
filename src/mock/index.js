import Mock from 'mockjs'
import { login, captcha } from './modules/login'
import { city, cityInfo } from './modules/city'
import { userInfo, getUserList, batchDelUser, deleteUser, editUser, addUser } from './modules/user'
import { getMenuList, getAllMenuList, deletePermission, editPermission, addPermission } from './modules/menu'
import { getRoleList, batchDelRole, deleteRole, addRole, editRole, editRolePerm } from './modules/role'
import { getAllDictList, getAllDictDataList, deleteDict, deleteDictData, editDict, addDict, editDictData, addDictData } from './modules/dict'
Mock.setup({
  timeout: 1000
})
Mock.mock(RegExp('/api/mock/captcha/init' + '.*'), captcha)
Mock.mock('/api/mock/login', login)
Mock.mock('/api/mock/user/info', userInfo)
Mock.mock('/api/mock/city', city)
Mock.mock('/api/mock/cityInfo', cityInfo)
Mock.mock('/api/mock/getMenuList', getMenuList)
Mock.mock('/api/mock/menu/getAllMenuList', getAllMenuList)
Mock.mock('/api/mock/menu/deletePermission', deletePermission)
Mock.mock('/api/mock/menu/editPermission', editPermission)
Mock.mock('/api/mock/menu/addPermission', addPermission)
Mock.mock('/api/mock/user/getUserList', getUserList)
Mock.mock('/api/mock/user/editUser', editUser)
Mock.mock('/api/mock/user/addUser', addUser)
Mock.mock('/api/mock/user/batchDelUser', batchDelUser)
Mock.mock('/api/mock/user/deleteUser', deleteUser)
Mock.mock('/api/mock/role/getRoleList', getRoleList)
Mock.mock('/api/mock/role/batchDelRole', batchDelRole)
Mock.mock('/api/mock/role/deleteRole', deleteRole)
Mock.mock('/api/mock/role/editRole', editRole)
Mock.mock('/api/mock/role/editRolePerm', editRolePerm)
Mock.mock('/api/mock/role/addRole', addRole)

Mock.mock('/api/mock/dict/getAllDictList', getAllDictList)
Mock.mock('/api/mock/dict/getAllDictDataList', getAllDictDataList)
Mock.mock('/api/mock/dict/deleteDict', deleteDict)
Mock.mock('/api/mock/dict/deleteDictData', deleteDictData)
Mock.mock('/api/mock/dict/editDict', editDict)
Mock.mock('/api/mock/dict/addDict', addDict)
Mock.mock('/api/mock/dict/editDictData', editDictData)
Mock.mock('/api/mock/dict/addDictData', addDictData)

// const Local_Mock_modules = require.context('./modules', false, /\.js$/)
// const modules = {}

// Local_Mock_modules.keys().forEach(key => {
//   let Mock_module = Local_Mock_modules(key)
//   Object.keys(Mock_module).forEach(k => {
//     console.log(Mock_module[k])
//     Mock.mock('/' + k, Mock_module[k])
//   })
// })

export default Mock
