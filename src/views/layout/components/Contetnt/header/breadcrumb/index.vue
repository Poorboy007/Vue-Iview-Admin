<template>
  <Breadcrumb class="breadcrumb-list">
    <BreadcrumbItem v-for="item in currentPath" :key="'breadcrumb-' + item.name">{{ item.title }}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
export default {
  name: 'BreadcrumbNav',
  props: {
    currentPath: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    itemTitle(item) {
      if (typeof item.title === 'object') {
        return this.$t(item.title.i18n)
      } else {
        return item.title
      }
    }
  }
}
</script>

<style lang="scss">
.main-breadcrumb {
  .ivu-breadcrumb > span:last-child a {
    font-weight: initial;
    color: rgba(0, 0, 0, 0.85);
  }
  .ivu-breadcrumb a {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
