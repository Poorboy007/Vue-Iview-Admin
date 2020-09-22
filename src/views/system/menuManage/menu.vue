<template>
  <Card :dis-hover="true" :bordered="false">
    <div class="tb-panel">
      <div class="tb-title" style="display:none">用户管理</div>
      <div class="tb-opt">
        <Row class="tb-opt-button server-operates clearfix">
          <Button type="primary" icon="md-add" @click="addMenu">添加子节点</Button>
          <Button icon="md-trash" @click="delAll">批量删除</Button>
          <Dropdown @on-click="handleDropdown">
            <Button>
              更多操作
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="refresh">刷新</DropdownItem>
              <DropdownItem name="expandOne">收合所有</DropdownItem>
              <DropdownItem name="expandTwo">仅展开一级</DropdownItem>
              <DropdownItem name="expandThree">仅展开两级</DropdownItem>
              <DropdownItem name="expandAll">展开所有</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <i-switch v-model="strict" size="large" style="margin-left:5px">
            <span slot="open">级联</span>
            <span slot="close">单选</span>
          </i-switch>
        </Row>
      </div>
      <div class="tb-contet">
        <Row type="flex" justify="space-between">
          <Col span="5">
          <Alert show-icon>
            当前选择编辑：
            <span class="select-title">{{ editTitle }}</span>
            <a v-if="form.id" class="select-clear" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input v-model="searchKey" suffix="ios-search" placeholder="输入菜单名搜索" clearable @on-change="search" />
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
            <Tree ref="tree" :data="data" show-checkbox :render="renderContent" :check-strictly="!strict"
                  @on-select-change="selectTree" @on-check-change="changeSelect"></Tree>
            <Spin v-if="loading" size="large" fix></Spin>
          </div>
          </Col>
          <div class="expand" style="min-height: calc(100vh - 185px)">
            <Icon size="16" class="icon" />
          </div>
          <Col span="18">
          <Row>
            <Col :md="18" :sm="24" :lg="14" :xl="14">
            <Form ref="form" :model="form" :label-width="110" :rules="formValidate">
              <FormItem label="类型" prop="type">
                <div v-show="form.type===-1">
                  <Icon type="ios-navigate-outline" size="16" style="margin-right:5px"></Icon>
                  <span>顶部菜单</span>
                </div>
                <div v-show="form.type===0">
                  <Icon type="ios-list-box-outline" size="16" style="margin-right:5px"></Icon>
                  <span>页面菜单</span>
                </div>
                <div v-show="form.type===1">
                  <Icon type="md-radio-button-on" size="16" style="margin-right:5px"></Icon>
                  <span>操作按钮</span>
                </div>
              </FormItem>
              <FormItem v-if="form.type===-1||form.type===0" label="名称" prop="title">
                <Input v-model="form.title" />
              </FormItem>
              <FormItem v-if="form.type===1" label="名称" prop="title" class="block-tool">
                <Tooltip placement="right" content="操作按钮名称不得重复">
                  <Input v-model="form.title" />
                </Tooltip>
              </FormItem>
              <FormItem v-if="form.type===0" label="路径" prop="path">
                <Input v-model="form.path" />
              </FormItem>
              <FormItem v-if="form.type===1" label="请求路径" prop="path" class="block-tool">
                <Tooltip placement="right" :max-width="230" transfer content="填写后台请求URL，后台将作权限拦截，若无可填写'无'或其他">
                  <Input v-model="form.path" />
                </Tooltip>
              </FormItem>
              <FormItem v-if="form.type===-1" label="英文名" prop="name" class="block-tool">
                <Tooltip placement="right" content="需唯一">
                  <Input v-model="form.name" />
                </Tooltip>
              </FormItem>
              <FormItem v-if="form.type===0" label="路由英文名" prop="name" class="block-tool">
                <Tooltip placement="right" content="需唯一" transfer>
                  <Input v-model="form.name" />
                </Tooltip>
              </FormItem>
              <FormItem v-if="form.type===-1||form.type===0" label="图标" prop="icon">
                <icon-choose v-model="form.icon"></icon-choose>
              </FormItem>

              <FormItem label="系统原生图标" prop="isCustomize">
                <i-switch v-model="form.isCustomize" size="large" :true-value="1" :false-value="0">
                  <span slot="open">开启</span>
                  <span slot="close">关闭</span>
                </i-switch>
              </FormItem>

              <FormItem v-if="form.type===0" label="前端组件" prop="component">
                <Input v-model="form.component" />
              </FormItem>
              <FormItem v-if="form.type===0&&form.level===2" label="第三方链接" prop="url" class="block-tool">
                <Tooltip placement="right" content="前端组件需为 sys/monitor/monitor 时生效" max-width="300" transfer>
                  <Input v-model="form.url" placeholder="http://" @on-change="changeEditUrl" />
                </Tooltip>
              </FormItem>
              <FormItem label="排序值" prop="sortOrder">
                <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
                  <InputNumber v-model="form.sortOrder" :max="1000" :min="0"></InputNumber>
                </Tooltip>
              </FormItem>
              <FormItem v-if="form.level===1||form.level===2" label="始终显示" prop="showAlways" class="block-tool">
                <i-switch v-model="form.showAlways" size="large">
                  <span slot="open">是</span>
                  <span slot="close">否</span>
                </i-switch>
                <Tooltip content="当设为不始终显示时，一级菜单下仅有一个子级菜单只会显示该子级菜单，避免用户多次点击" placement="right" transfer max-width="280"
                         style="display: inline-block !important">
                  <Icon type="md-help-circle" size="20" color="#c5c5c5" style="margin-left:10px;cursor:pointer" />
                </Tooltip>
              </FormItem>
              <FormItem label="是否启用" prop="status">
                <i-switch v-model="form.status" size="large" :true-value="0" :false-value="-1">
                  <span slot="open">启用</span>
                  <span slot="close">禁用</span>
                </i-switch>
              </FormItem>
              <Form-item>
                <Button style="margin-right:5px" :loading="submitLoading" type="primary" icon="ios-create-outline"
                        @click="submitEdit">
                  修改并保存
                </Button>
                <Button @click="handleReset">重置</Button>
              </Form-item>
            </Form>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
    </div>

    <Modal v-model="menuModalVisible" class-name="vertical-center-modal" :title="modalTitle" :mask-closable="false" :width="500">
      <Form ref="formAdd" :model="formAdd" :label-width="100" :rules="formValidate">
        <div v-if="showParent">
          <FormItem label="上级节点：">{{ parentTitle }}</FormItem>
        </div>
        <FormItem label="类型" prop="type">
          <div v-show="formAdd.type===-1">
            <Icon type="ios-navigate-outline" size="16" style="margin-right:5px"></Icon>
            <span>顶部菜单</span>
          </div>
          <div v-show="formAdd.type===0">
            <Icon type="ios-list-box-outline" size="16" style="margin-right:5px"></Icon>
            <span>页面菜单</span>
          </div>
          <div v-show="formAdd.type===1">
            <Icon type="md-radio-button-on" size="16" style="margin-right:5px"></Icon>
            <span>操作按钮</span>
          </div>
        </FormItem>
        <FormItem v-if="formAdd.type===-1||formAdd.type===0" label="名称" prop="title">
          <Input v-model="formAdd.title" />
        </FormItem>
        <FormItem v-if="formAdd.type===1" label="名称" prop="title" class="block-tool">
          <Tooltip placement="right" content="操作按钮名称不得重复">
            <Input v-model="formAdd.title" />
          </Tooltip>
        </FormItem>
        <FormItem v-if="formAdd.type===0" label="路径" prop="path">
          <Input v-model="formAdd.path" />
        </FormItem>
        <FormItem v-if="formAdd.type===1" label="请求路径" prop="path" class="block-tool">
          <Tooltip placement="right" :max-width="230" transfer content="填写后台请求URL，后台将作权限拦截，若无可填写'无'或其他">
            <Input v-model="formAdd.path" />
          </Tooltip>
        </FormItem>

        <FormItem v-if="formAdd.type===-1" label="英文名" prop="name" class="block-tool">
          <Tooltip placement="right" content="需唯一">
            <Input v-model="formAdd.name" />
          </Tooltip>
        </FormItem>
        <FormItem v-if="formAdd.type===0" label="路由英文名" prop="name" class="block-tool">
          <Tooltip placement="right" content="需唯一">
            <Input v-model="formAdd.name" />
          </Tooltip>
        </FormItem>
        <FormItem v-if="formAdd.type===-1||formAdd.type===0" label="图标" prop="icon">
          <icon-choose v-model="formAdd.icon"></icon-choose>
        </FormItem>

        <FormItem label="系统原生图标" prop="isCustomize">
          <i-switch v-model="form.isCustomize" size="large" :true-value="1" :false-value="0">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </FormItem>

        <FormItem v-if="formAdd.type===0" label="前端组件" prop="component">
          <Input v-model="formAdd.component" />
        </FormItem>
        <FormItem v-if="formAdd.type===0&&formAdd.level===2" label="第三方链接" prop="url" class="block-tool">
          <Tooltip placement="right" content="前端组件需为 sys/monitor/monitor 时生效" max-width="300" transfer>
            <Input v-model="formAdd.url" placeholder="http://" @on-change="changeAddUrl" />
          </Tooltip>
        </FormItem>
        <FormItem label="排序值" prop="sortOrder">
          <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
            <InputNumber v-model="formAdd.sortOrder" :max="1000" :min="0"></InputNumber>
          </Tooltip>
        </FormItem>
        <FormItem v-if="formAdd.level===1||formAdd.level===2" label="始终显示" prop="showAlways" class="block-tool">
          <i-switch v-model="formAdd.showAlways" size="large">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
          <Tooltip content="当设为不始终显示时，一级菜单下仅有一个子级菜单只会显示该子级菜单，避免用户多次点击" placement="right" transfer max-width="280"
                   style="display: inline-block !important">
            <Icon type="md-help-circle" size="20" color="#c5c5c5" style="margin-left:10pxcursor:pointer" />
          </Tooltip>
        </FormItem>
        <FormItem label="是否启用" prop="status">
          <i-switch v-model="formAdd.status" size="large" :true-value="0" :false-value="-1">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="menuModalVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="submitAdd">提交</Button>
      </div>
    </Modal>
  </Card>
  </div>
</template>

<script>
import IconChoose from 'components/Content/iconChoose'
import * as MenuApi from '@/api/menuManage'
export default {
  name: 'MenuManage',
  components: {
    IconChoose
  },

  data() {
    return {
      token: '',
      loading: true,
      strict: true,
      maxHeight: '500px',
      expandLevel: 1,
      menuModalVisible: false,
      iconModalVisible: false,
      selectList: [],
      selectCount: 0,
      showParent: false,
      searchKey: '',
      parentTitle: '',
      editTitle: '',
      modalTitle: '',
      form: {
        id: '',
        title: '',
        name: '',
        icon: '',
        path: '',
        component: '',
        parentId: '',
        buttonType: '',
        type: 0,
        sortOrder: 0,
        level: 0,
        status: 0,
        isCustomize: 0,
        url: '',
        showAlways: true
      },
      formAdd: {
        buttonType: ''
      },
      formValidate: {
        title: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        name: [
          { required: true, message: '路由英文名不能为空', trigger: 'blur' }
        ],
        icon: [{ required: true, message: '图标不能为空', trigger: 'click' }],
        path: [{ required: true, message: '路径不能为空', trigger: 'blur' }],
        component: [
          { required: true, message: '前端组件不能为空', trigger: 'blur' }
        ],
        sortOrder: [
          {
            required: true,
            type: 'number',
            message: '排序值不能为空',
            trigger: 'blur'
          }
        ]
      },
      submitLoading: false,
      data: []
    }
  },
  computed: {
    currentPath() {
      return this.$store.state.app.currentPath // 当前面包屑数组
    }
  },
  mounted() {
    // 计算高度
    let height = document.documentElement.clientHeight
    this.maxHeight = Number(height - 287) + 'px'
    this.init()
  },
  methods: {
    init() {
      this.getAllList()
    },
    renderContent(h, { root, node, data }) {
      let icon = ''
      if (data.level === 0) {
        icon = 'ios-navigate'
      } else if (data.level === 1) {
        icon = 'md-list-box'
      } else if (data.level === 2) {
        icon = 'md-list'
      } else if (data.level === 3) {
        icon = 'md-radio-button-on'
      } else {
        icon = 'md-radio-button-off'
      }
      return h('span', [
        h('span', [
          h('Icon', {
            props: {
              type: icon,
              size: '16'
            },
            style: {
              'margin-right': '8px',
              'margin-bottom': '3px'
            }
          }),
          h('span', data.title)
        ])
      ])
    },
    handleDropdown(name) {
      if (name === 'expandOne') {
        this.expandLevel = 1
        this.getAllList()
      } else if (name === 'expandTwo') {
        this.expandLevel = 2
        this.getAllList()
      } else if (name === 'expandThree') {
        this.expandLevel = 3
        this.getAllList()
      }
      if (name === 'expandAll') {
        this.expandLevel = 4
        this.getAllList()
      } else if (name === 'refresh') {
        this.getAllList()
      }
    },
    getAllList() {
      this.loading = true
      MenuApi.getAllMenuList().then(res => {
        this.loading = false
        if (res.success) {
          // 仅展开指定级数 默认后台已展开所有
          let expandLevel = this.expandLevel
          res.result.forEach((e) => {
            if (expandLevel === 1) {
              if (e.level === 0) {
                e.expand = true
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach((c) => {
                  if (c.level === 1) {
                    c.expand = false
                  }
                  if (c.children && c.children.length > 0) {
                    c.children.forEach((b) => {
                      if (b.level === 2) {
                        b.expand = false
                      }
                    })
                  }
                })
              }
            } else if (expandLevel === 2) {
              if (e.level === 0) {
                e.expand = true
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach((c) => {
                  if (c.level === 1) {
                    c.expand = false
                  }
                  if (c.children && c.children.length > 0) {
                    c.children.forEach((b) => {
                      if (b.level === 2) {
                        b.expand = false
                      }
                    })
                  }
                })
              }
            } else if (expandLevel === 3) {
              if (e.level === 0) {
                e.expand = true
              }
              if (e.children && e.children.length > 0) {
                e.children.forEach((c) => {
                  if (c.level === 1) {
                    c.expand = true
                  }
                  if (c.children && c.children.length > 0) {
                    c.children.forEach((b) => {
                      if (b.level === 2) {
                        b.expand = false
                      }
                    })
                  }
                })
              }
            }
          })
          this.data = res.result
        }
      })
    },
    search() {
      if (this.searchKey) {
        this.loading = true
        searchPermission({ title: this.searchKey }).then(res => {
          this.loading = false
          if (res.success) {
            this.data = res.result
          }
        })
      } else {
        this.getAllList()
      }
    },
    selectTree(v) {
      if (v.length > 0) {
        // 转换null为''
        for (let attr in v[0]) {
          if (v[0][attr] === null) {
            v[0][attr] = ''
          }
        }
        let str = JSON.stringify(v[0])
        let menu = JSON.parse(str)
        this.form = menu
        this.editTitle = menu.title
      } else {
        this.cancelEdit()
      }
    },
    cancelEdit() {
      let data = this.$refs.tree.getSelectedNodes()[0]
      if (data) {
        data.selected = false
      }
      this.$refs.form.resetFields()
      this.form.id = ''
      this.editTitle = ''
    },
    handleReset() {
      let type = this.form.type
      this.$refs.form.resetFields()
      this.form.icon = ''
      this.form.component = ''
      this.form.type = type
    },
    submitEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.form.id) {
            this.$Message.warning('请先点击选择要修改的菜单节点')
            return
          }
          this.submitLoading = true
          if (this.form.sortOrder === null) {
            this.form.sortOrder = ''
          }
          if (this.form.buttonType === null) {
            this.form.buttonType = ''
          }
          if (this.form.type === 1) {
            this.form.name = ''
            this.form.icon = ''
            this.form.component = ''
          }
          MenuApi.editPermission(this.form).then(res => {
            this.submitLoading = false
            if (res.success) {
              this.$Message.success('编辑成功')
              // 标记重新获取菜单数据
              this.$store.commit('setAdded', false)
              // util.initRouter(this)
              this.init()
              this.menuModalVisible = false
            }
          })
        }
      })
    },
    submitAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          this.submitLoading = true
          if (this.formAdd.type === 1) {
            this.formAdd.name = ''
            this.formAdd.icon = ''
            this.formAdd.component = ''
          }
          this.formAdd.csrftoken = this.token
          MenuApi.addPermission(this.formAdd).then(res => {
            this.submitLoading = false
            if (res.success) {
              this.$Message.success('添加成功')
              // 标记重新获取菜单数据
              this.$store.commit('setAdded', false)
              // util.initRouter(this)
              this.init()
              this.menuModalVisible = false
            }
          })
        }
      })
    },
    changeEditUrl(e) {
      let v = e.target.value
      if (v.indexOf('http') > -1) {
        this.form.component = 'sys/monitor/monitor'
      }
    },
    changeAddUrl(e) {
      let v = e.target.value
      if (v.indexOf('http') > -1) {
        this.formAdd.component = 'sys/monitor/monitor'
      }
    },
    addMenu() {
      if (!this.form.id) {
        this.$Message.warning('请先点击选择一个菜单权限节点')
        return
      }
      this.parentTitle = this.form.title
      // this.modalTitle = '添加子节点(可拖动)'
      this.modalTitle = '添加子节点'
      this.showParent = true
      let type = 0
      if (this.form.level === 1) {
        type = 0
      } else if (this.form.level === 2) {
        type = 1
      } else if (this.form.level === 3) {
        this.$Modal.warning({
          title: '抱歉，不能添加啦',
          content: '仅支持2级菜单目录'
        })
        return
      } else {
        type = 0
      }
      let component = ''
      this.formAdd = {
        icon: '',
        type: type,
        parentId: this.form.id,
        level: Number(this.form.level) + 1,
        sortOrder: 0,
        buttonType: '',
        status: 0,
        showAlways: true
      }
      if (this.form.level === 0) {
        this.formAdd.path = '/'
        this.formAdd.component = 'Main-New'
      }
      this.menuModalVisible = true
    },
    addRootMenu() {
      this.modalTitle = '添加顶部菜单(可拖动)'
      this.showParent = false
      this.formAdd = {
        type: -1,
        level: 0,
        sortOrder: 0,
        status: 0
      }
      this.menuModalVisible = true
    },
    changeSelect(v) {
      this.selectCount = v.length
      this.selectList = v
    },
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning('您还未勾选要删除的数据')
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + ' 条数据?',
        loading: true,
        onOk: () => {
          let arrId = this.selectList.map(item => { return item.id })
          let ids = arrId.join(',')
          MenuApi.deletePermission({ ids: ids }).then(res => {
            this.$Modal.remove()
            if (res.success) {
              this.$Message.success('删除成功')
              // 标记重新获取菜单数据
              // util.initRouter(this)
              this.selectList = []
              this.selectCount = 0
              this.cancelEdit()
              this.init()
            }
          })
        }
      })
    }
  }
}
</script>
