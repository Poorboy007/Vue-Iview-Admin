import Mock from 'mockjs'
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

export const captcha = req => {
  let code = Mock.mock({ 'regexp': /\w{4}/ }).regexp
  return Mock.mock({
    'success': true,
    'code': 200,
    'message': code,
    'timestamp': new Date().getTime(),
    'result': Mock.Random.dataImage('100x30', code)
  })
}
