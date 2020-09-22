/*
 * @Description: utils 帮助工具类
 * @Author:  LiuFch
*/
import Cookies from 'js-cookie'
import Config from '@/config'
import { Storage } from './localStorage'
import Layout from '@/views/layout'

export const whiteList = Config.WHITE_LIST

/**
 * @description 设置浏览器标题，不传则Config 中默认系统名称
 * @param { String } title 标题
 */
export const setBrowserTitle = (title) => {
  title = (title !== '' && typeof title !== 'undefined') ? title : Config.CLIENT_NAME
  window.document.title = title
}

/**
 * @description 首页loading 在路由跳转后继续处理进度及隐藏
 */
export const handleIndexLoader = () => {
  return new Promise((resolve, reject) => {
    clearInterval(window.loadTimer)
    let PercentageID = document.querySelector('#loading-percent')
    let bar = document.querySelector('#loading-bar')
    let pre = document.querySelector('#pre-loader')
    let current = parseInt(PercentageID.innerText)
    if (current === 100) {
      pre.style.display = 'none'
      resolve()
    }
    window.loadTimer = setInterval(() => {
      current += 1
      PercentageID.innerText = current
      bar.style.width = current + '%'
      if (current >= 100) {
        pre.style.display = 'none'
        clearInterval(window.loadTimer)
        resolve()
      }
    }, 30)
  })
}

/**
 * @description 懒加载
 * @param { String } view 视图
 * @returns { require } 返回引用
 */
export const loadView = (view) => {
  return resolve => require([`@/views/${view}`], resolve)
  // return () => import(`@/views/${url}.vue`)
}

/**
 * @description 添加所有顶部导航栏下的菜单路由
 * @param { Array } data routerAllData
 * @returns { require } 经过处理的 routerMap
 */
export const initAllMenuData = (data) => {
  let allMenuData = []
  data.forEach(e => {
    if (e.type === -1) {
      e.children.forEach(item => {
        allMenuData.push(item)
      })
    }
  })
  return filterAsyncRouter(allMenuData)
}

/**
 *
 * @description 异步返回的路由数据进行包装处理.
 * @param { Array } routerMap 导航菜单所有数据
 * @returns { Array } 经过处理的 routerMap
 */
export const filterAsyncRouter = (routerMap) => {
  return routerMap.filter(route => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }

    let meta = {}
    // 给页面添加权限、标题、第三方网页链接
    meta.permTypes = route.permTypes ? route.permTypes : null
    meta.title = route.title ? route.title + ' - ' + Config.CLIENT_NAME + '' : null
    meta.icon = route.icon ? route.icon : null
    route.meta = meta
    return true
  })
}

/**
 * @description 处理面包屑数据
 * @param { Object } vm
 * @param { Object } root
 * @param { Object } router
 * @param { String } name
 * @param { String } type
 */
export const handleBreadcrumb = (vm, root, router, type) => {
  let currentPathArr = []
  let homeRoute = {}
  let routerList = vm.$store.state.app.routerList
  let isHome = false
  routerList.forEach(item => {
    for (let route of item.children) {
      if (route.isHome) {
        isHome = route.isHome
        homeRoute = route
      }
    }
  })
  if (type === 'Single') {
    if (isHome) {
      currentPathArr.push(router)
    } else {
      currentPathArr.push({
        title: '首页',
        path: '',
        name: homeRoute.name
      }, router)
    }
  } else {
    currentPathArr.push({
      title: '首页',
      path: '',
      name: homeRoute.name
    }, root, router)
  }
  return currentPathArr
}

/**
 * @description 设置当前面包屑
 * @param { Object } vm
 * @param { String } name
 */
export const setCurrentBreadcrumb = (vm, name) => {
  let currentPathArr = []
  vm.$store.state.app.routerList.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        currentPathArr = handleBreadcrumb(vm, item, item.children[0], 'Single')
      }
    } else {
      if (item.name === 'appRouter') {
        let children = item.children.filter(route => route.name === name)
        if (children.length > 0) currentPathArr = handleBreadcrumb(vm, item, ...children, 'Single')
      } else {
        item.children.forEach(child => {
          if (child.name === name) {
            currentPathArr = handleBreadcrumb(vm, item, child, 'Multiple')
          }
        })
      }
    }
  })
  vm.$store.commit('SET_CURRENT_PATH', currentPathArr)
  return currentPathArr
}

/**
 * @description 导航或地址栏,进行正确路由访问时,打开新页
 * @param { Object } vm
 * @param { String } name
 * @param { Object } argu
 * @param { Object } query
 */
export const openNewPage = (vm, name, argu, query) => {
  let pageOpenedList = vm.$store.state.app.pageOpenedList
  let openedPageLen = pageOpenedList.length
  let i = 0
  let tagHasOpened = false
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) { // 页面已经打开
      vm.$store.commit('PAGE_OPEND_LIST', {
        index: i,
        argu: argu,
        query: query
      })
      tagHasOpened = true
      break
    }
    i++
  }
  if (!tagHasOpened) {
    let tag = vm.$store.state.app.tagsList.filter((item) => {
      return name === item.name
    })
    tag = tag[0]
    if (typeof tag !== 'undefined') {
      if (argu) {
        tag.argu = argu
      }
      if (query) {
        tag.query = query
      }
      vm.$store.commit('IN_CREATE_TAG', tag)
    }
  }
  // vm.$store.commit('setCurrentPageName', name)
}

/**
 * @description 底层操作 浏览器localStorage
 */
export { Storage }
/**
 * @description WebApp 系统的配置。  文件目录：/src/config/
 */
export { Config }
