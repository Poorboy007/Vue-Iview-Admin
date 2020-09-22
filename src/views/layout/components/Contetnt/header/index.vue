<template>
  <div class="header-panel">
    <div class="header-trigger-content" @click="topMenuIConClick">
      <span class="menu-fold">
        <i class="ivu-icon ics-icon ics-icon-menu-fold" />
      </span>
      <span class="menu-unfold">
        <i class="ivu-icon ics-icon ics-icon-menu-unfold" />
      </span>
    </div>
    <div class="header-middle-content">
      <div class="main-breadcrumb">
        <breadcrumb-nav :current-path="currentPath" />
      </div>
    </div>
    <div class="header-right-options">
      <full-screen v-model="isFullScreen" @on-change="fullscreenChange" />
      <lock-screen />
      <message-tip v-model="mesCount" />
      <account :user-info="accountInfo" />
    </div>
  </div>
</template>

<script>
import breadcrumbNav from './breadcrumb'
import fullScreen from './fullScreen'
import lockScreen from './lockScreen'
import messageTip from './messageTip'
import account from './account'
export default {
  name: 'Headers',
  components: {
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    account
  },
  props: {
    currentPath: {
      type: Array,
      default: () => {
        return []
      }
    },
    currentShrink: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    accountInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      shrink: this.currentShrink,
      mesCount: 2,
      isFullScreen: false
    }
  },
  watch: {
    currentShrink(val) {
      this.shrink = val
    }
  },
  mounted() {
    // window.onresize = () => {
    //   return (() => {
    //     this.shrink = false
    //     this.$emit('on-change-shrink', this.shrink)
    //   })()
    // }
  },
  methods: {
    fullscreenChange() { },
    topMenuIConClick() {
      this.shrink = !this.shrink
      this.$emit('on-change-shrink', this.shrink)
    }
  }
}
</script>

<style>
</style>
