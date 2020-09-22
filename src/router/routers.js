/**
 * @description 登录页面路由
 */
const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录 -平台 '
  },
  component: () => import('@/views/login')
}

/**
 * @description 404路由需要和动态路由一起注入
 */
export const errorPageRouter = [
  {
    path: '/nofound',
    name: 'error-404',
    meta: {
      title: '404-页面不存在'
    },
    component: () => import('@/views/errorPage/404')
  }
]

/**
 * @description 导出默认几项路由配置  登录、404 等。待扩展
 */
export const constantRoutes = [
  loginRouter,
  // appRouter,
  ...errorPageRouter
]
