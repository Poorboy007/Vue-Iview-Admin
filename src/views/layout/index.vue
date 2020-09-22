!<template>
  <div class="ics-desgin">
    <div class="ics-layout" :class="{'ics-layout-is-collapse': shrink}">
      <div class="mask" @click="changeShrink(false)"></div>
      <div class="ics-layout-sidebar no-txt-select">
        <sidebar-panel :menu-list="menuList" :shrink="shrink" />
      </div>
      <div class="ics-layout-content">
        <div class="ics-layout-header no-txt-select">
          <header-panel :current-path="currentPath" :account-info="accountInfo" :current-shrink="shrink" @on-change-shrink="changeShrink" />
          <tags-panel :page-tags-list="tagsList" />
        </div>
        <div class="ics-layout-main">
          <main-panel :cache-page="cachePage" :no-cache-page="noCachePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebarPanel from './components/Sidebar'
import headerPanel from './components/Contetnt/header'
import tagsPanel from './components/Contetnt/tags'
import mainPanel from './components/Contetnt/main'
import * as Utils from '@/libs/utils'
export default {
  name: 'Layout',
  components: {
    sidebarPanel,
    headerPanel,
    tagsPanel,
    mainPanel
  },
  data() {
    return {
      avatarPath: '',
      shrink: false,
      username: 'LiuFc',
      mesCount: 2,
      isFullScreen: false
    }
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList
    },
    accountInfo() {
      return this.$store.state.account.accountInfo
    },
    cachePage() {
      return []
    },
    noCachePage() {
      return []
    },
    currentPath() {
      return this.$store.state.app.currentPath // 当前面包屑数组
    },
    tagsList() {
      return this.$store.state.app.pageOpenedList //
    }
  },
  watch: {
    $route(to) {
      Utils.setCurrentBreadcrumb(this, to.name)
    }
  },
  created() {
    // //在页面加载时读取sessionStorage里的状态信息 如果有的话就存进vuex里面
    // if (sessionStorage.getItem("storedata")) {
    //   this.$store.replaceState(Object.assign({},
    //     this.$store.state, JSON.parse(sessionStorage.getItem("storedata"))))
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload", () => {
    //   sessionStorage.setItem("storedata", JSON.stringify(this.$store.state))
    // });
    // // 兼容iphone手机
    // window.addEventListener("pagehide", () => {
    //   sessionStorage.setItem("storedata", JSON.stringify(this.$store.state))
    // });
    // //如果页面加载的时候sessionstorage没有的话 就从vuex中取
    // sessionStorage.setItem("isLogin", this.$store.state.isLogin)
  },
  mounted() {
    Utils.setCurrentBreadcrumb(this, this.$route.name)
  },
  methods: {
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    changeShrink(val) {
      this.shrink = val
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
