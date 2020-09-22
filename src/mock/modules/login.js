import { UserInfo } from '../data'
import { Message } from 'view-design'

export const login = req => {
  req = JSON.parse(req.body)
  let password = req.password
  if (password === '123456') {
    return UserInfo['loginData']
  } else {
    Message.error('登录失败:原因->密码不正确')
  }
}
