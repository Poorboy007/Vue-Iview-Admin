<template>
  <div class="sidebar-panel">
    <div class="sidebar-brand brand-default">
      <slot name="top"><a href="/" class="logo">ICS-Admin</a></slot>
    </div>
    <div class="sidebar-brand brand-Shrink">
      <slot name="top"><a href="/" class="logo">ICS</a></slot>
    </div>
    <div class="sidebar-menu">
      <scroll-bar ref="scrollBar">
        <sidebar-menu :menu-theme="theme" :menu-list="menuList" :icon-size="17" :open-names="openNames" @on-change="handleChange" />
        <sidebar-menu-shrink :menu-theme="theme" :menu-list="menuList" :icon-size="17" :open-names="openNames" @on-change="handleChange"></sidebar-menu-shrink>
      </scroll-bar>
    </div>
  </div>
</template>

<script>
import scrollBar from 'components/Common/scrollBar/vue-scroller-bars'
import sidebarMenu from './menu'
import sidebarMenuShrink from './menuShrink'
export default {
  name: 'SideBarPanel',
  components: {
    scrollBar,
    sidebarMenu,
    sidebarMenuShrink
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'light'
    },
    menuList: {
      type: Array,
      required: true
    },
    openNames: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    // this.$axios.get('/api/mock/getMenuList', { abc: 123 }).then(res => {
    //   if (res.data) {
    //   }
    // })
  },
  methods: {
    handleChange(name) {
      let willpush = true
      if (this.beforePush !== undefined) {
        if (!this.beforePush(name)) {
          willpush = false
        }
      }
      if (willpush) {
        this.$router.push({
          name: name
        })
      }
      // this.$emit('on-change', name)
    },
    abc() {
      setTimeout(() => {
        this.$refs.scrollBar.resize()
      }, 230)
    }
  }
}
</script>

<style>
</style>
