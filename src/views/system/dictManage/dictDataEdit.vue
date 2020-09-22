<template>
  <Modal v-model="modalVisible" :title="modalTitle" :mask-closable="false" :width="500" class-name="vertical-center-modal">
    <Form ref="form" :model="dictDataForm" :label-width="90" :rules="formValidate">
      <FormItem label="名称" prop="title">
        <Input v-model="dictDataForm.title" />
      </FormItem>
      <FormItem label="数据值" prop="value">
        <Input v-model="dictDataForm.value" />
      </FormItem>
      <FormItem label="备注" prop="description">
        <Input v-model="dictDataForm.description" />
      </FormItem>
      <FormItem label="排序值" prop="sortOrder">
        <InputNumber v-model="dictDataForm.sortOrder" :max="1000" :min="0"></InputNumber>
        <span style="margin-left:5px">值越小越靠前，支持小数</span>
      </FormItem>
      <FormItem label="是否启用" prop="status">
        <i-switch v-model="dictDataForm.status" size="large" :true-value="0" :false-value="-1">
          <span slot="open">启用</span>
          <span slot="close">禁用</span>
        </i-switch>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="modalVisible=false">取消</Button>
      <Button type="primary" :loading="submitLoading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>

<script>
import * as DictApi from '@/api/dictManage'
export default {
  name: 'DictDataEdit',
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
      dictForm: this.data,
      dictDataForm: {},
      modalTitle: '',
      modalVisible: false,
      submitLoading: false,
      formValidate: {
        // 表单验证规则
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        value: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    data(val) {
      this.dictForm = Object.assign({}, val)
      this.setModalForm(val)
    },
    modalVisible(value) {
      this.$emit('input', value)
    }
  },
  methods: {
    setModalForm(val) {
      if (this.type === '1') {
        this.modalTitle = '添加字典 ' + this.dictForm.title + ' 的数据'
      } else {
        this.modalTitle = '编辑字典数据'
        this.dictDataForm = val
      }
      this.modalVisible = true
    },
    handelSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.type === '1') {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.dictDataForm.id
            this.dictDataForm.dictId = this.dictForm.id
            DictApi.addDictData(this.dictDataForm).then(res => {
              this.submitLoading = false
              if (res.success) {
                this.$Message.success('操作成功')
                this.$emit('on-success', true)
                this.modalVisible = false
              }
            })
          } else {
            // 编辑
            DictApi.editDictData(this.dictDataForm).then(res => {
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
