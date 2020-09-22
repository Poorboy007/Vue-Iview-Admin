/*
 * @Description: 系统配置
 * @Author:  LiuFch
*/
// 配置多环境引入
// const dev = require('./env.dev')
// const prod = require('./env.prod')
// const testing = require('./env.testing')
// const mock = require('./env.mock')

// 优化引入方式多环境配置
const envFiles = require.context('.', true, /\.js$/)
const env = {}
envFiles.keys().forEach(key => {
  if (key === './index.js') return
  env[envFiles(key).ENV_SHORT_TYPE] = envFiles(key)
})

// 默认配置
const _default = {
  /**
   * @description api请求的baseUrl
   */
  API_BASE_URL: '',
  /**
   * @description 接口名前缀.如: [ baseUrl/perfix ] => http://127.0.0.1/admin
   */
  API_PERFIX: '',
  /**
   * @description 超时时长
   */
  API_REQUEST_TIMEOUT: 60000,
  /**
   * @description WebApp Name
   */
  CLIENT_NAME: 'ICS-Admin',
  /**
   * @description WebApp Host
   */
  CLIENT_HOST: '',
  /**
   * @description 环境变量配置名称.默认是当前文件中所有配置
   */
  ENV_TYPE_NAME: 'default',
  /**
   * @description 环境变量的缩写
   */
  ENV_SHORT_TYPE: 'def',
  /**
   * @description 15分钟，当设置的失效时间大于等于1天 也可以设置大于1 的数值
   * @exp  new Date(new Date().getTime() + 60 * 1000 * 1),
   */
  COOKIE_EXPIRES: 1,
  /**
   * @description 缓存key的前缀. 注:为了避免多个项目在启动项目并且端口一致,会存在缓存读取其他项目中未清除的同名key的缓存
   */
  ALL_STORAGE_KEY_PERFIX: 'ICS_',
  /**
   * @description token 的key
   */
  TOKEN_KEY: 'ACCESS_TOKEN',
  /**
   * @description 已经打开的页面 缓存key
   */
  PAGE_OPENED_LIST_KEY: 'PAGE_OPENED_LIST',
  /**
   * @description 用户基本信息 缓存key
   */
  ACCOUNT_INFO_KEY: 'ACCOUNT_INFO',
  /**
   * @description 1
   */
  WHITE_LIST: ['/login']
}

// 通过环境变量 APP_ENV 为自定义变量
// 注：只有以 VUE_APP_ 开头的变量会被 webpack.DefinePlugin 静态嵌入到客户端侧的包中
// 那么。不是 VUE_APP 开头需要在vue.config.js 增加  webpack.DefinePlugin。 【详细查看项目中vue.config.js 配置】
const envParam = typeof process.env.APP_ENV === 'undefined' ? process.env.NODE_ENV : process.env.APP_ENV
const curEnv = env[envParam]

const globalEnv = Object.assign(_default, curEnv)
console.log('如果您不愿意保留可在配置中关闭：https://github.com/Poorboy007/Vue-Iview-Admin.git')
let a = '%c  ISC-Admin  %c 项目基于Vue + Vuex + Axios + Iview 构建  '
let b = 'color: #fadfa3; background: #030307; padding:8px 0;'
let c = 'background: #fadfa3; padding:8px 0;'
console.log(a, b, c)
export default globalEnv
