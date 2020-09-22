<style lang="scss">

</style>
<template>
  <Menu ref="sideMenu" accordion :active-name="$route.name" :open-names="singleOpenName" :theme="menuTheme" width="auto" class="ics-menu ics-menu-default" @on-select="changeMenu">
    <template v-for="item in menuList">
      <MenuItem v-if="item.children.length<=1" :key="'menuitem' + item.name" :name="item.children[0].name" class="ics-menu-item">
        <Icon :key="'menuicon' + item.name" :type="item.children[0].icon || item.icon" :size="iconSize" />
        <span :key="'title' + item.name" class="layout-text">{{ itemTitle(item.children[0]) }}</span>
      </MenuItem>

      <Submenu v-if="item.children.length > 1" :key="item.name" :name="item.name" class="ics-menu-submenu">
        <template slot="title">
          <Icon :type="item.icon" :size="iconSize" />
          <span class="layout-text">{{ itemTitle(item) }}</span>
        </template>
        <template v-for="child in item.children">
          <MenuItem :key="'menuitem' + child.name" :name="child.name" class="ics-menu-item">
            <Icon :key="'icon' + child.name" :type="child.icon" :size="iconSize" />
            <span :key="'title' + child.name" class="layout-text">{{ itemTitle(child) }}</span>
          </MenuItem>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: {
    menuList: {
      type: Array,
      default: () => {
        return []
      }
    },
    iconSize: {
      type: Number,
      default: () => {
        return 14
      }
    },
    menuTheme: {
      type: String,
      default: 'dark'
    },
    openNames: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      singleOpenName: []
    }
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      this.singleOpenName = [this.$route.matched[0].name]
    }
  },
  mounted() {
    this.singleOpenName = [this.$route.matched[0].name]
  },
  updated() {
    this.$nextTick(() => {
      if (this.$refs.sideMenu) {
        this.$refs.sideMenu.updateOpened()
      }
    })
  },
  methods: {
    changeMenu(active) {
      this.$emit('on-change', active)
    },
    handleSelect(name) {
      this.$emit('on-select', name)
    },
    itemTitle(item) {
      return item.title
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    }
  }
}
</script>
