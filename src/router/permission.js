import ViewUI from 'view-design'
import store from '@/store'
import * as Utils from '@/libs/utils'
import * as Auth from '@/libs/auth'

export default (router) => {
  /**
   * @description 前置守卫，处理是否已经登录、加载用户基本信息、路由加载、添加路由到全局、各路由跳转、白名单
   */
  router.beforeEach((to, from, next) => {
    Utils.setBrowserTitle(to.meta.title)
    ViewUI.LoadingBar.start()
    if (Auth.getToken()) {
      /* has token*/
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (store.getters.roles.length === 0) {
          // 获取用户信息
          store.dispatch('LoadUserInfo').then(res => {
            // 拉取完unserInfo数据
            Auth.setAccount(res.result)
            // 根据不同用户生成可访问的路由表
            store.dispatch('GenerateRouters').then(accessRouters => {
              // appRouter 包含如：首页等其他 能预访问的路由表
              // 注：该内容由后端配置并返回内容
              const appRouter = {
                path: '/',
                name: 'appRouter',
                redirect: '/notice',
                component: () => import('@/views/layout/'),
                children: [
                  { path: '/workplace', title: '工作台', name: 'workplace', component: () => import('@/views/dashboard/workplace.vue') },
                  { path: '/notice', title: '通知', name: 'notice', component: () => import('@/views/test/notice.vue') },
                  { path: '/city', title: '城市', name: 'city', component: () => import('@/views/test/city.vue') }
                ]
              }
              // 处理 标记为首页的page 进行打开操作
              appRouter.children.forEach((item, index) => {
                if (appRouter.redirect === item.path) {
                  item['isHome'] = true
                  store.commit('SET_OPENED_LIST', {
                    title: item.title,
                    path: item.path,
                    name: item.name,
                    isHome: true
                  })
                }
              })

              let tagsList = []
              store.state.app.routerList.map((item) => {
                if (typeof item.children !== 'undefined' || item.children === null) {
                  if (item.children.length <= 1) {
                    tagsList.push(item.children[0])
                  } else {
                    tagsList.push(...item.children)
                  }
                } else {
                  tagsList.push(item)
                }
              })
              store.commit('SET_TAGS_LIST', tagsList)
              store.commit('SET_ROUTERS', [appRouter])
              router.addRoutes([appRouter])
              router.addRoutes(accessRouters) // 动态添加可访问路由表

              Utils.handleIndexLoader().then(() => {
                next({ ...to, replace: true }) // hack方法 确保addRouters已完成
              })
            })
          }).catch(err => {
            store.dispatch('LogOut').then(() => {
              Message.error(err)
              next({ path: '/' })
            })
          })
        } else {
          if (to.matched.length === 0) {
            next({ path: '/nofound', replace: true })
          }
          ViewUI.LoadingBar.finish()
          Utils.handleIndexLoader().then(() => {
            next()
          })
          // next()
        }
      }
    } else {
      // 没有token
      if (Utils.whiteList.indexOf(to.path) !== -1) {
        Utils.handleIndexLoader().then(() => {
          // 在免登录白名单，直接进入
          next()
        })
      } else {
        let toPath = encodeURIComponent(to.path)
        Utils.handleIndexLoader().then(() => {
          // 否则全部重定向到登录页
          next({
            path: '/login'
          })
        })
      }
    }
    // next()
  })

  /**
   * @description 后置守卫 打开新页面
   */
  router.afterEach((to) => {
    Utils.openNewPage(router.app, to.name, to.params, to.query)
    window.scrollTo(0, 0)
    ViewUI.LoadingBar.finish()
  })
}
