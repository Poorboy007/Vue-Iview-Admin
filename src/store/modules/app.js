import * as Utils from '@/libs/utils'
import * as Auth from '@/libs/auth'
import router from '@/router'
import { getRouters } from '@/api/account'

const app = {
  state: {
    cachePage: [],
    noCachePage: [],
    openedSubmenuArr: [],
    pageOpenedList: [],
    currentPageName: '',
    currentPath: [],
    routerList: [],
    menuList: [],
    tagsList: []
  },
  mutations: {
    UPDATE_APP_ROUTER(state, routers) {
      state.menuList = routers
    },
    SET_ROUTERS(state, routers) {
      state.routerList.push(...routers)
      router.addRoutes(routers)
    },
    SET_TAGS_LIST(state, list) {
      state.tagsList.push(...list)
    },
    SET_OPENED_LIST(state, openedRoute) {
      state.pageOpenedList = Auth.getPageOpenedList() ? JSON.parse(Auth.getPageOpenedList()) : [openedRoute]
    },
    SET_CURRENT_PATH(state, pathArr) {
      state.currentPath = pathArr
    },
    PAGE_OPEND_LIST(state, get) {
      let openedPage = state.pageOpenedList[get.index]
      if (get.argu) {
        openedPage.argu = get.argu
      }
      if (get.query) {
        openedPage.query = get.query
      }
      state.pageOpenedList.splice(get.index, 1, openedPage)
      Auth.setPageOpenedList(JSON.stringify(state.pageOpenedList))
    },
    IN_CREATE_TAG(state, tagObj) {
      // if (!Util.oneOf(tagObj.name, state.dontCache)) {
      //   state.cachePage.push(tagObj.name)
      //   localStorage.cachePage = JSON.stringify(state.cachePage)
      // }
      state.pageOpenedList.push(tagObj)
      Auth.setPageOpenedList(JSON.stringify(state.pageOpenedList))
    },
    REMOVE_TAG(state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
    },
    CLEAR_ALL_TAGS(state) {
      state.pageOpenedList.splice(1)
      // state.cachePage.length = 0
      Auth.setPageOpenedList(JSON.stringify(state.pageOpenedList))
    },
    CLEAR_OTHER_TAGS(state, vm) {
      let currentName = vm.$route.name
      let currentIndex = 0
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName
      })
      state.cachePage = newCachepage
      Auth.setPageOpenedList(JSON.stringify(state.pageOpenedList))
    },
    CLOSE_PAGE(state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
    }
  },
  actions: {
    // 生成路由
    GenerateRouters({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(resp => {
          const accessedRouters = Utils.initAllMenuData(resp.result)
          commit('SET_ROUTERS', accessedRouters)
          // 刷新界面菜单
          commit('UPDATE_APP_ROUTER', accessedRouters.filter(item => item.children.length > 0))
          resolve(accessedRouters)
        })
      })
    }
  }
}

export default app
