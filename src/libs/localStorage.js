/**
 * @class LocalStorage
 * @Description: 本地浏览器缓存 操作工具类
 * @Author:  LiuFch
 */
class BrowserStorage {
  constructor() {
    this.key = 'defaultStorage'
    this.expires = undefined
  }
  /**
   * 数据当超过缓存时长
   * @param { String } data
   */
  static isOutPeriod(data) {
    if (!data.value) {
      return true
    }
    let readTime = Number(new Date())
    return (readTime - data.writeTime) > data.expires
  }
  /**
   *
   *
   * @static
   * @param {*} data
   */
  static isNotExist(data) {
    return data === null || typeof (data) === 'undefined'
  }
  /**
   * set 方法，设置
   * @param {String} key 键
   * @param { * } value 值
   * @param {*} expires 缓存时长
   */
  set(key, value, expires) {
    const obj = {
      key: this.key,
      value: '',
      expires: this.expires,
      writeTime: new Date().getTime()
    }
    const options = {}
    Object.assign(options, obj, { key, value, expires })

    if (options.expires) {
      // 如果options.expires设置了的话
      // 以options.key，options为值放进去
      localStorage.setItem(options.key, JSON.stringify(options))
    } else {
      // 判断value的类型
      let type = Object.prototype.toString.call(options.value)
      // 如果value是对象或数组对象的类型情况下,不能直接存储，需要转换 JSON.stringify 再赋值进去
      if (type === '[object Object]' || type === '[object Array]') {
        let _options = JSON.stringify(options)
        localStorage.setItem(options.key, _options)
      } else {
        localStorage.setItem(options.key, options.value)
      }
    }
  }

  /**
   * get 方法，获取
   * @param { String } key
   */
  get(key) {
    const dataJSON = localStorage.getItem(key)
    // 当目标不存在时返回null
    if (BrowserStorage.isNotExist(dataJSON)) {
      return null
    }

    let data = JSON.parse(dataJSON)
    // 当数据的存在周期未定义时，它被认为是永久的
    if (BrowserStorage.isNotExist(data.expired)) {
      return data.value
    }
    // 数据当超过缓存时长,释放数据
    if (BrowserStorage.isOutPeriod(data)) {
      this.del(key)
      return null
    }
    return data.value
  }
  /**
   *
   * @param {*} key
   */
  reomve(key) {
    localStorage.removeItem(key)
  }
  /**
   *
   */
  clearAll() {
    localStorage.clear()
  }
}

export const Storage = new BrowserStorage()
