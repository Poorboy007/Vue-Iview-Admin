<template>
  <div class="lock-screen-btn-con" @click="lockScreen">
    <Tooltip content="锁屏" placement="bottom">
      <Icon type="ios-lock-outline" :size="23" />
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'LockScreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
  },
  methods: {
    lockScreen() {
      console.log('lockScreen')
    }
  }
}
</script>

