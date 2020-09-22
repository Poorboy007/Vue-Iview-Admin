import * as Auth from '@/libs/auth'
import { login, getUserInfo } from '@/api/account'

const account = {
  state: {
    accountInfo: {},
    token: Auth.getToken(),
    roles: []
  },
  mutations: {
    SET_ACCOUNT_INFO(state, accountInfo) {
      state.accountInfo = accountInfo
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    }
  },
  actions: {
    // 登录
    LoginByUserName({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(resp => {
          commit('SET_TOKEN', resp.result)
          Auth.setToken(resp.result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    LoadUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(resp => {
          if (resp.result.roles && resp.result.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            // 用户角色
            commit('SET_ROLES', resp.result.roles)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          // 用户信息
          commit('SET_ACCOUNT_INFO', resp.result)
          resolve(resp)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Auth.removeToken()
        Auth.removeAccount()
        resolve()
      })
    }
  }
}

export default account
