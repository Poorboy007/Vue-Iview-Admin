<template>
  <div class="message-con" @click="showMessage">
    <Tooltip :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
      <Badge :count="value" dot>
        <Icon type="ios-notifications-outline" :size="24" />
      </Badge>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'MessageTip',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showMessage() {
    }
  }
}
</script>
