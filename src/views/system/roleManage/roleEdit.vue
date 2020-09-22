<template>
  <!-- 编辑 -->
  <Modal v-model="modalVisible" :title="modalTitle" :mask-closable="false" :width="500">
    <Form ref="roleForm" :model="roleForm" :label-width="80" :rules="formValidate">
      <FormItem label="角色名称" prop="name">
        <Input v-model="roleForm.name" placeholder="按照Spring Security约定建议以‘ROLE_’开头" />
      </FormItem>
      <FormItem label="备注" prop="description">
        <Input v-model="roleForm.description" />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="cancel">取消</Button>
      <Button type="primary" :loading="submitLoading" @click="submitRole">提交</Button>
    </div>
  </Modal>
</template>

<script>
import * as RoleApi from '@/api/roleManage'
export default {
  name: 'RoleEdit',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: () => {
        return '0'
      }
    }
  },
  data() {
    return {
      roleForm: this.data,
      modalTitle: '',
      modalVisible: false,
      submitLoading: false,
      formValidate: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val)
    },
    data(val) {
      this.roleForm = Object.assign({}, val)
    },
    modalVisible(value) {
      this.$emit('input', value)
    }
  },
  methods: {
    setCurrentValue(val) {
      if (this.type === '0') {
        this.modalTitle = '添加角色'
      } else {
        this.modalTitle = '编辑角色'
      }
      this.modalVisible = val
    },
    submitRole() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          if (this.modalType === '1') {
            // 添加
            this.submitLoading = true
            RoleApi.addRole(this.roleForm).then(res => {
              this.submitLoading = false
              if (res.success) {
                this.$Message.success('操作成功')
                this.$emit('on-success', true)
                this.modalVisible = false
              }
            })
          } else {
            this.submitLoading = true
            RoleApi.editRole(this.roleForm).then(res => {
              this.submitLoading = false
              if (res.success) {
                this.$Message.success('操作成功')
                this.$emit('on-success', true)
                this.modalVisible = false
              }
            })
          }
        }
      })
    },
    cancel() {
      this.modalVisible = false
      this.submitLoading = false
    }
  }
}
</script>

<style>
</style>
