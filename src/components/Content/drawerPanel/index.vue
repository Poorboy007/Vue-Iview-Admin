<template>
  <Drawer v-model="drawerConfig.visible" :title="drawerConfig.title" width="520" draggable
          :mask-closable="drawerConfig.maskClosable" class="drawer-panel">
    <div :style="{maxHeight: maxHeight}" class="drawer-content">
      <slot name="content">默认文字</slot>
    </div>
    <div class="drawer-footer">
      <slot name="footer">
        <Button type="primary" :loading="drawerConfig.submitLoading" @click="submitForm">提交</Button>
        <Button @click="cancel">取消</Button>
      </slot>
    </div>
  </Drawer>
</template>

<script>
export default {
  name: 'DrawerPanel',
  props: {
    drawerConfig: {
      type: Object,
      default: () => {
        return {
          title: '标题',
          visible: false,
          maskClosable: false,
          showDrawerBtn: true,
          submitLoading: false
        }
      }
    }
  },
  computed: {
    maxHeight() {
      return Number(document.documentElement.clientHeight - 121) + 'px'
    }
  },
  methods: {
    submitForm() {
      this.$emit('on-submit')
    },
    cancel() {
      this.drawerConfig.visible = false
      this.drawerConfig.title = ''
      this.$emit('on-cancel', this.drawerConfig)
    }
  }
}
</script>

<style lang="scss">
.drawer-content {
  padding: 15px;
  overflow: auto;
}
.drawer-content::-webkit-scrollbar {
  display: none;
}
.drawer-footer{
  padding: 15px;
  button{
    margin-right: 8px;
  }
}
</style>
