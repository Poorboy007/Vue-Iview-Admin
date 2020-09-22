<template>
  <div>
    <Row class="tb-con-opt">
      <Button type="primary" icon="md-add" @click="addDcit">添加字典</Button>
      <Dropdown @on-click="handleDropdown">
        <Button>
          更多操作
          <Icon type="md-arrow-dropdown" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="editDcit">编辑字典</DropdownItem>
          <DropdownItem name="delDcit">删除字典</DropdownItem>
          <DropdownItem name="refreshDcit">刷新</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Row>
    <Alert show-icon>
      当前选择：
      <span class="select-title">{{ editTitle }}</span>
      <a v-if="editTitle" class="select-clear" @click="cancelEdit">取消选择</a>
    </Alert>
    <Input v-model="searchKey" suffix="ios-search" placeholder="输入搜索字典" clearable @on-change="search" />
    <div class="tree-bar" :style="{maxHeight: maxHeight}">
      <Tree ref="tree" :data="treeData" @on-select-change="selectTree"></Tree>
    </div>
    <Spin v-if="treeLoading" size="large" fix></Spin>

    <Modal v-model="dictModalVisible" :title="dictModalTitle" :mask-closable="false" :width="500"
           class-name="vertical-center-modal">
      <Form ref="dictForm" :model="dictForm" :label-width="95" :rules="dictFormValidate">
        <FormItem label="字典名称" prop="title">
          <Input v-model="dictForm.title" />
        </FormItem>
        <FormItem label="字典类型" prop="type">
          <Tooltip placement="right" :max-width="220" transfer content="建议英文名且需唯一 非开发人员谨慎修改">
            <Input v-model="dictForm.type" />
          </Tooltip>
        </FormItem>
        <FormItem label="备注" prop="description">
          <Input v-model="dictForm.description" />
        </FormItem>
        <FormItem label="排序值" prop="sortOrder">
          <InputNumber v-model="dictForm.sortOrder" :max="1000" :min="0"></InputNumber>
          <span style="margin-left:5px">值越小越靠前，支持小数</span>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="dictModalVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handelSubmitDict">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as DictApi from '@/api/dictManage'
export default {
  name: 'DictTree',
  data() {
    return {
      treeLoading: false, // 树加载状态
      submitLoading: false, // 添加或编辑提交状态
      maxHeight: '500px',
      searchKey: '', // 搜索树
      editTitle: '',
      selectNode: {},
      treeData: [],
      dictModalVisible: false,
      dictModalTitle: '',
      dictForm: {
        title: '',
        type: '',
        description: '',
        sortOrder: 0
      },
      dictFormValidate: {
        // 表单验证规则
        title: [{ required: true, message: '不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // 获取树数据
      this.getAllDict()
    },
    handleDropdown(name) {
      if (name === 'editDcit') {
        if (!this.selectNode.id) {
          this.$Message.warning('您还未选择要编辑的字典')
          return
        }
        this.editDcit()
      } else if (name === 'delDcit') {
        this.delDcit()
      } else if (name === 'refreshDcit') {
        this.refreshDict()
      }
    },
    handelSubmitDict() {
      this.$refs.dictForm.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.modalType === 0) {
            // 添加 避免编辑后传入id等数据 记得删除
            delete this.dictForm.id
            DictApi.addDict(this.dictForm).then(res => {
              this.submitLoading = false
              if (res.success) {
                this.$Message.success('操作成功')
                this.getAllDict()
                this.dictModalVisible = false
              }
            })
          } else if (this.modalType === 1) {
            // 编辑
            DictApi.editDict(this.dictForm).then(res => {
              this.submitLoading = false
              if (res.success) {
                this.$Message.success('操作成功')
                this.getAllDict()
                this.dictModalVisible = false
              }
            })
          }
        }
      })
    },
    refreshDict() {
      // this.getAllDict()
      this.selectNode = {}
      this.dictForm = {}
      this.editTitle = ''
      this.getAllDict()
      this.$emit('on-refresh-dict', this.dictForm)
    },
    selectTree(v) {
      if (v.length > 0) {
        this.$refs.dictForm.resetFields()
        // 转换null为''
        for (let attr in v[0]) {
          if (v[0][attr] === null) {
            v[0][attr] = ''
          }
        }
        let str = JSON.stringify(v[0])
        let data = JSON.parse(str)
        this.selectNode = data
        this.dictForm = data
        this.editTitle = data.title + '(' + data.type + ')'
        this.$emit('on-select-tree', this.dictForm)
      } else {
        this.cancelEdit()
      }
    },
    cancelEdit() {
      let data = this.$refs.tree.getSelectedNodes()[0]
      if (data) {
        data.selected = false
      }
      // 取消选择后获取全部数据
      this.selectNode = {}
      this.editTitle = ''
      this.getDataList()
    },
    getAllDict() {
      this.treeLoading = true
      DictApi.getAllDictList().then(res => {
        this.treeLoading = false
        if (res.success) {
          this.treeData = res.result
        }
      })
    },
    search() {
      // 搜索树
      if (this.searchKey) {
        this.treeLoading = true
        searchDict({ key: this.searchKey }).then(res => {
          this.treeLoading = false
          if (res.success) {
            this.treeData = res.result
          }
        })
      } else {
        // 为空重新加载
        this.getAllDict()
      }
    },
    addDcit() {
      this.modalType = 0
      this.dictModalTitle = '添加字典'
      this.$refs.dictForm.resetFields()
      this.dictModalVisible = true
    },
    editDcit() {
      this.modalType = 1
      this.dictModalTitle = '编辑字典'
      this.dictModalVisible = true
    },
    delDcit() {
      if (!this.selectNode.id) {
        this.$Message.warning('您还未选择要删除的字典')
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        loading: true,
        content: '您确认要删除 ' + this.selectNode.title + ' ?',
        onOk: () => {
          // 删除
          DictApi.deleteDict(this.selectNode.id).then(res => {
            this.$Modal.remove()
            if (res.success) {
              this.$Message.success('操作成功')
              this.refreshDict()
            }
          })
        }
      })
    }
  }
}
</script>

<style>
</style>
