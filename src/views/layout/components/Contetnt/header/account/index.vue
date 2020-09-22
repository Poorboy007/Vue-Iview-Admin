<template>
  <div class="user-dropdown">
    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
      <Dropdown trigger="hover" transfer-class-name="user-dropdown-innercon-list">
        <div class="dropdown-trigger">
          <Avatar class="user-img" :src="userInfo.avatar" style="background: #619fe7;margin-left: 10px;" />
          <span class="user-name">{{ userInfo.nickName }}</span>
          <Icon type="md-arrow-dropdown" />
        </div>
        <DropdownMenu slot="list">
          <DropdownItem name="ownSpace">
            <Icon type="md-person" />个人中心</DropdownItem>
          <DropdownItem name="changePass">
            <Icon type="md-settings" />修改密码</DropdownItem>
          <DropdownItem name="loginout" divided>
            <Icon type="md-log-out" />退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Account',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style>
</style>
