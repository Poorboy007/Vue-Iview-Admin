/**
 * @Description: auth 系统用户缓存 操作
 * @Author:  LiuFch
 */
import Cookies from 'js-cookie'
import { Storage } from './localStorage'
import Config from '@/config'

/**
 * @description App 用户信息存放浏览器缓存中
 * @param { Array } token值
 */
export const setAccount = (accountInfo) => {
  Storage.set(Config.ALL_STORAGE_KEY_PERFIX + Config.ACCOUNT_INFO_KEY, accountInfo)
}

/**
 * @description App 用户信息浏览器缓存中获取
 */
export const getAccount = () => {
  Storage.get(Config.ALL_STORAGE_KEY_PERFIX + Config.ACCOUNT_INFO_KEY)
}

/**
 * @description 从浏览器缓存中，删除用户信息
 */
export const removeAccount = () => {
  Storage.reomve(Config.ALL_STORAGE_KEY_PERFIX + Config.ACCOUNT_INFO_KEY)
}
/**
 * @description 设置token值到浏览器中，通过Cookie 操作
 * @param { Array } token值
 */
export const setToken = (token) => {
  Cookies.set(Config.ALL_STORAGE_KEY_PERFIX + Config.TOKEN_KEY, token, { expires: Config.COOKIE_EXPIRES || 1 })
}

/**
 * @description 获取token 从Cookies中
 */
export const getToken = () => {
  const token = Cookies.get(Config.ALL_STORAGE_KEY_PERFIX + Config.TOKEN_KEY)
  if (token) return token
  else return false
}

/**
 * @description 删除token 值
 */
export const removeToken = () => {
  Cookies.remove(Config.ALL_STORAGE_KEY_PERFIX + Config.TOKEN_KEY)
}

/**
 * @description 设置打开的page值到浏览器中
 * @param { Array } 打开的route值
 */
export const setPageOpenedList = (openedRoute) => {
  Storage.set(Config.ALL_STORAGE_KEY_PERFIX + Config.PAGE_OPENED_LIST_KEY, openedRoute)
}

/**
 * @description 从浏览器缓存中获取打开的page值
 */
export const getPageOpenedList = () => {
  Storage.get(Config.ALL_STORAGE_KEY_PERFIX + Config.PAGE_OPENED_LIST_KEY)
}

/**
 * @description 删除打开的page值
 */
export const removePageOpenedList = () => {
  Storage.reomve(Config.ALL_STORAGE_KEY_PERFIX + Config.PAGE_OPENED_LIST_KEY)
}
