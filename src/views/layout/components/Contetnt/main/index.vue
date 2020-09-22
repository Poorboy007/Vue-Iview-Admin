<template>
  <div class="main-page">
    <keep-alive :include="cachePage" :exclude="noCachePage">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    cachePage: {
      type: Array,
      default: () => {
        return []
      }
    },
    noCachePage: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style>
</style>
