<template>
  <Card :dis-hover="true" :bordered="false">
    <div class="tb-panel">
      <div class="tb-title" style="display:none">用户管理</div>
      <div class="tb-opt">
        <Row>
          <Col span="12">
          <div class="tb-opt-button">
            <div class="i-text-let">
              <Button type="primary" icon="md-add" @click="addUser">添加用户</Button>
              <Button icon="md-trash" :disabled="!isBatchDel" @click="batchDelUser">批量删除</Button>
            </div>
          </div>
          </Col>
          <Col span="12">
          <div class="tb-opt-search">
            <div class="i-text-right">
              <Row @keydown.enter.native="handleSearch">
                <Form ref="searchForm" :model="searchForm" inline>
                  <Form-item prop="username">
                    <Input v-model="searchForm.username" type="text" clearable placeholder="请输入用户名" style="width: 150px" />
                  </Form-item>
                  <Form-item prop="mobile">
                    <Input v-model="searchForm.mobile" type="text" clearable placeholder="请输入手机号" style="width: 150px" />
                  </Form-item>
                  <Form-item style="" class="br">
                    <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
                    <Button @click="handleReset">重置</Button>
                  </Form-item>
                </Form>
              </Row>
            </div>
          </div>
          </Col>
        </Row>
      </div>
      <div class="tb-contet">
        <div class="tb-noumenon">
          <Row>
            <Table :columns="columns" :loading="tableShow.loading" :data="tableData" :no-data-text="noDataMsg" disabled-hover
                   @on-sort-change="changeSort" @on-selection-change="showSelect">
            </Table>
          </Row>
        </div>
        <div class="tb-page">
          <Row type="flex" justify="center" class="page">
            <Col span="12">
            <div class="page-tip">总共：{{ tableShow.total }} 条</div>
            </Col>
            <Col span="12" class="i-text-right">
            <Page :current="searchForm.pageNumber" :page-size="searchForm.pageSize" :page-size-opts="[10,20,50]" show-sizer
                  :total="tableShow.total" prev-text="上一页" next-text="下一页" @on-change="changePage"
                  @on-page-size-change="changePageSize"></Page>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <user-edit v-model="editData.show" :data="editData.form" :type="editData.modalType" @on-success="loadUserList" />
  </Card>
</template>

<script>
import * as UserApi from '@/api/userManage'
import columns from './tbColumns'
import { roleButton, editButton, deleteButton } from './tbActions'
import userEdit from './userEdit'
export default {
  name: 'UserManage',
  components: {
    userEdit
  },
  data() {
    return {
      noDataMsg: '',
      searchForm: {},
      columns: columns,
      tableData: [],
      tableShow: {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      selectCount: 0,
      selectList: [],
      editData: {
        show: false,
        form: {},
        modalType: '0'
      }
    }
  },
  computed: {
    isBatchDel() {
      return this.selectCount > 0
    }
  },
  created() {
    this.initTbColumns()
    this.loadUserList()
  },
  methods: {
    initTbColumns() {
      this.columns.forEach(item => {
        if (item.handle) {
          item.render = (h, param) => {
            let currentRowData = this.tableData[param.index]
            let buttons = []
            // buttons.push(roleButton(this, h, currentRowData, param.index))
            buttons.push(editButton(this, h, currentRowData, param.index))
            buttons.push(deleteButton(this, h, currentRowData, param.index))
            return h('div', buttons)
          }
        }
      })
    },
    loadUserList() {
      this.tableShow.loading = true
      UserApi.getUserList().then(res => {
        this.tableShow.loading = false
        this.tableData = res.result.content
        this.tableShow.total = res.result.totalElements
      })
    },
    addUser() {
      this.editData.modalType = '0'
      this.editData.show = true
      this.editData.form = {}
    },
    delete(row) {
      UserApi.deleteUser({ id: row.id }).then(res => {
        if (res.success) {
          this.$Message.success('操作成功')
          this.loadUserList()
          this.selectList = []
          this.selectCount = 0
        }
      })
    },
    batchDelUser() {
      this.$Modal.confirm({
        title: '确认删除',
        loading: true,
        content: '您确认要删除 ' + this.selectCount + ' 条数据 ?',
        onOk: () => {
          let arrId = this.selectList.map(item => { return item.id })
          let ids = arrId.join(',')
          UserApi.batchDelUser({ ids: ids }).then(res => {
            this.$Modal.remove()
            if (res.success) {
              this.$Message.success('操作成功')
              this.loadUserList()
              this.selectList = []
              this.selectCount = 0
            }
          })
        }
      })
    },
    handleSearch() {
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.loadUserList()
    },
    handleReset() {
      this.$refs.searchForm.resetFields()
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      // 重新加载数据
      this.loadUserList()
    },
    showSelect(e) {
      this.selectList = e
      this.selectCount = e.length
    },
    changeSort(e) {
      this.searchForm.sort = e.key
      this.searchForm.order = e.order
      if (e.order === 'normal') {
        this.searchForm.order = ''
      }
      this.loadUserList()
    },
    changePage() { },
    changePageSize() { }
  }
}
</script>

<style>
</style>
