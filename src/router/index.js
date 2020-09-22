import Vue from 'vue'
import ViewUI from 'view-design'
import VueRouter from 'vue-router'
import { constantRoutes, errorPageRouter } from './routers'
import Permission from './permission'

Vue.use(VueRouter)

// 请求重复报错 处理当前已是需切换的 路由。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

Permission(router)

export default router
