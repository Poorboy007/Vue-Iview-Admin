<template>
  <Card :dis-hover="true" :bordered="false">
    <div class="tb-panel">
      <div class="tb-title" style="display:none">字典管理</div>
      <div class="tb-opt">
      </div>
      <div class="tb-contet">
        <Row type="flex" justify="space-between">
          <Col v-if="expand" span="5">
          <dict-tree @on-select-tree="selectTree" @on-refresh-dict="selectTree"></dict-tree>
          </Col>
          <div class="expand" :class="{'expandOpen':expand}" style="min-height: calc(100vh - 155px)">
            <Icon :type="expandIcon" size="16" class="icon" @click="changeExpand" />
          </div>
          <Col :span="span">
          <Row class="tb-con-opt-search">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
              <Form-item label="数据名称" prop="title">
                <Input v-model="searchForm.title" type="text" placeholder="请输入" clearable style="width: 200px" />
              </Form-item>
              <Form-item label="状态" prop="status">
                <Select v-model="searchForm.status" placeholder="请选择" clearable style="width: 200px">
                  <Option value="0">正常</Option>
                  <Option value="-1">禁用</Option>
                </Select>
              </Form-item>
              <div style="display:inline-block" class="search-btn-con">
                <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
                <Button @click="handleReset">重置</Button>
              </div>
            </Form>
          </Row>
          <Row class="tb-con-opt">
            <Button type="primary" icon="md-add" @click="addDictData">添加数据</Button>
            <Button icon="md-trash" @click="delAll">批量删除</Button>
          </Row>
          <Row>
            <Alert show-icon>
              已选择
              <span class="select-count">{{ selectCount }}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
            </Alert>
          </Row>

          <div class="tb-noumenon">
            <Row>
              <Table :columns="columns" :loading="tableOptions.loading" :data="tableData" :no-data-text="noDataMsg" disabled-hover
                     @on-sort-change="changeSort" @on-selection-change="showSelect">
              </Table>
            </Row>
          </div>
          <div class="tb-page">
            <Row type="flex" justify="center" class="page">
              <Col span="12">
              <div class="page-tip">总共：{{ tableOptions.total }} 条</div>
              </Col>
              <Col span="12" class="i-text-right">
              <Page :current="searchForm.pageNumber" :page-size="searchForm.pageSize" :page-size-opts="[10,20,50]" show-sizer
                    :total="tableOptions.total" prev-text="上一页" next-text="下一页" @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
              </Col>
            </Row>
          </div>
          </Col>
        </Row>
      </div>
    </div>
    <dict-data-edit v-model="editDictData.show" :data="editDictData.form" :type="editDictData.modalType" @on-success="getDataList"></dict-data-edit>
  </Card>
</template>

<script>
import * as DictApi from '@/api/dictManage'
import Columns from './tbColumns'
import * as TbActions from './tbActions'
import dictTree from './dictTree'
import dictDataEdit from './dictDataEdit'
export default {
  name: 'DicManage',
  components: {
    dictTree,
    dictDataEdit
  },
  data() {
    return {
      noDataMsg: '',
      tableOptions: {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      editTitle: '', // 编辑节点名称
      expand: true,
      span: 18,
      expandIcon: 'ios-arrow-back',
      selectNode: {},
      treeData: [], // 树数据
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        name: '',
        status: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        sort: 'sortOrder', // 默认排序字段
        order: 'asc' // 默认排序方式
      },
      editDictData: {
        show: false,
        form: {},
        modalType: '0'
      },
      modalType: 0, // 添加或编辑标识
      modalVisible: false, // 添加或编辑显示
      modalTitle: '', // 添加或编辑标题
      form: {
        // 添加或编辑表单对象初始化数据
        title: '',
        value: '',
        status: 0,
        description: '',
        sortOrder: 0
      },
      columns: Columns,
      submitLoading: false, // 添加或编辑提交状态
      tableData: [] // 表单数据
    }
  },
  created() {
    this.init()
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight
    this.maxHeight = Number(height - 287) + 'px'
    // 获取表单数据
    this.getDataList()
  },
  methods: {
    init() {
      // 获取树数据
      // this.getAllDict()
      let vm = this
      this.columns.forEach(item => {
        if (item.handle) {
          item.render = (h, param) => {
            let currentRowData = this.tableData[param.index]
            let buttons = []
            item.handle.forEach(act => {
              buttons.push(TbActions[act].apply(this, [vm, h, currentRowData, param.index]))
            })
            return h('div', buttons)
          }
        }
      })
    },
    changeSelect(v) {
      this.selectCount = v.length
      this.selectList = v
    },
    changeExpand() {
      this.expand = !this.expand
      if (this.expand) {
        this.expandIcon = 'ios-arrow-back'
        this.span = 18
      } else {
        this.expandIcon = 'ios-arrow-forward'
        this.span = 23
      }
    },
    changePage(v) {
      this.searchForm.pageNumber = v
      this.getDataList()
      this.clearSelectAll()
    },
    changePageSize(v) {
      this.searchForm.pageSize = v
      this.getDataList()
    },
    getDataList() {
      this.tableOptions.loading = true
      if (this.selectNode.id) {
        this.searchForm.dictId = this.selectNode.id
      } else {
        delete this.searchForm.dictId
      }
      if (!this.searchForm.status) {
        this.searchForm.status = ''
      }
      DictApi.getAllDictDataList(this.searchForm).then(res => {
        this.tableOptions.loading = false
        if (res.success) {
          this.tableData = res.result.content
          this.tableOptions.total = res.result.totalElements
        }
      })
    },
    handleSearch() {
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.getDataList()
    },
    handleReset() {
      this.$refs.searchForm.resetFields()
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      // 重新加载数据
      this.getDataList()
    },
    changeSort(e) {
      this.searchForm.sort = e.key
      this.searchForm.order = e.order
      if (e.order === 'normal') {
        this.searchForm.order = ''
      }
      this.getDataList()
    },
    showSelect(e) {
      this.selectList = e
      this.selectCount = e.length
    },
    clearSelectAll() {
      this.$refs.table.selectAll(false)
    },
    selectTree(data) {
      this.selectNode = data
      this.getDataList()
    },
    addDictData() {
      if (!this.selectNode.id) {
        this.$Message.warning('请先选择一个字典类别')
        return
      }
      this.editDictData.modalType = '1'
      this.editDictData.form = this.selectNode
      // this.modalTitle = '添加字典 ' + this.editTitle + ' 的数据'
      // this.$refs.form.resetFields()
      this.editDictData.show = true
    },
    delete(v) {
      DictApi.deleteDictData(v.id).then(res => {
        // this.$store.commit('setLoading', false)
        if (res.success) {
          this.$Message.success('操作成功')
          this.getDataList()
        }
      })
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning('您还未选择要删除的数据')
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + ' 条数据?',
        onOk: () => {
          let arrId = this.selectList.map(item => { return item.id })
          let ids = arrId.join(',')
          // 批量删除
          // this.$store.commit('setLoading', true)
          DictApi.deleteDictData({ ids: ids }).then(res => {
            // this.$store.commit('setLoading', false)
            if (res.success) {
              this.$Message.success('操作成功')
              this.clearSelectAll()
              this.getDataList()
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
