<template>
  <!-- 菜单权限 -->
  <Modal v-model="permission.modalVisible" :title="permission.modalTitle" :mask-closable="false" :width="500" :styles="{top: '30px'}"
         class="permModal">
    <Tree ref="tree" :data="permission.list" :render="renderContent" class="modal-tree" :check-strictly="true"
          multiple show-checkbox
          style="height: calc(100vh - 200px);overflow-y: scroll"></Tree>
    <Spin v-if="permission.treeLoading" size="large"></Spin>
    <div slot="footer">
      <Button type="text" @click="cancelPermEdit">取消</Button>
      <Select v-model="openLevel" style="width:100px;text-align:left;margin-right:10px" @on-change="changeOpen">
        <Option value="0">展开所有</Option>
        <Option value="1">收合所有</Option>
        <Option value="2">仅展开一级</Option>
        <Option value="3">仅展开两级</Option>
      </Select>
      <Button @click="selectTreeAll">全选/反选</Button>
      <Button type="primary" :loading="permission.submitLoading" @click="submitPermEdit">提交</Button>
    </div>
  </Modal>
</template>

<script>
import * as MenuApi from '@/api/menuManage'
import * as RoleApi from '@/api/roleManage'
export default {
  name: 'MenuRole',
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
    }
  },
  data() {
    return {
      permission: {
        modalTitle: '',
        submitLoading: false,
        modalVisible: this.value,
        treeLoading: true,
        list: []
      },
      openLevel: '0',
      role: this.data
    }
  },
  watch: {
    value(val) {
      // this.permission.modalVisible = val
      this.initPermissionList(val)
    },
    data(val) {
      this.role = Object.assign({}, val)
    },
    modalVisible(value) {
      this.$emit('input', value)
    }
  },
  methods: {
    initPermissionList(val) {
      this.permission.treeLoading = true
      MenuApi.getAllMenuList().then(res => {
        this.permission.treeLoading = false
        if (res.success) {
          this.deleteDisableNode(res.result)
          this.permission.list = res.result

          this.editRolePermId = this.role.id
          this.permission.modalTitle = '分配 ' + this.role.name + ' 的菜单权限'
          // 匹配勾选
          let rolePerms = this.role.permissions
          // 递归判断子节点
          this.checkPermTree(this.permission.list, rolePerms)
          this.data.isOpenMenuRoleing = false
          this.permission.modalVisible = val
        }
      })
    },
    // 递归标记禁用节点
    deleteDisableNode(_permissionData) {
      let that = this
      _permissionData.forEach((e) => {
        if (e.status === -1) {
          e.title = '[已禁用] ' + e.title
          e.disabled = true
        }
        if (e.children && e.children.length > 0) {
          that.deleteDisableNode(e.children)
        }
      })
    },
    // 递归判断子节点
    checkPermTree(_permissionData, rolePerms) {
      let that = this
      _permissionData.forEach((p) => {
        if (that.hasPerm(p, rolePerms) && p.status !== -1) {
          p.checked = true
        } else {
          p.checked = false
        }
        if (p.children && p.children.length > 0) {
          that.checkPermTree(p.children, rolePerms)
        }
      })
    },
    // 判断角色拥有的权限节点勾选
    hasPerm(p, rolePerms) {
      let flag = false
      for (let i = 0; i < rolePerms.length; i++) {
        if (p.id === rolePerms[i].permissionId) {
          flag = true
          break
        }
      }
      if (flag) {
        return true
      }
      return false
    },
    // 全选反选
    selectTreeAll() {
      this.selectAllFlag = !this.selectAllFlag
      let select = this.selectAllFlag
      this.selectedTreeAll(this.permission.list, select)
    },
    cancelPermEdit() {
      this.permission.modalVisible = false
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
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            cursor: 'pointer'
          },
          on: {
            click: () => {
              data.checked = !data.checked
            }
          }
        },
        [
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
            h('span', { class: 'ivu-tree-title' }, data.title)
          ])
        ]
      )
    },
    submitPermEdit() {
      this.permission.submitLoading = true
      let permIds = ''
      let selectedNodes = this.$refs.tree.getCheckedNodes()
      selectedNodes.forEach((e) => {
        permIds += e.id + ','
      })
      permIds = permIds.substring(0, permIds.length - 1)
      RoleApi.editRolePerm({
        roleId: this.editRolePermId,
        permIds: permIds
      }).then(res => {
        this.permission.submitLoading = false
        if (res.success) {
          this.$Message.success('操作成功')
          // 标记重新获取菜单数据
          // this.$store.commit('setAdded', false)
          // util.initRouter(this)
          this.$emit('on-success', true)
          this.permission.modalVisible = false
        }
      })
    },
    changeOpen(v) {
      if (v === '0') {
        this.permission.list.forEach(e => {
          e.expand = true
          if (e.children && e.children.length > 0) {
            e.children.forEach(c => {
              c.expand = true
              if (c.children && c.children.length > 0) {
                c.children.forEach((b) => {
                  b.expand = true
                })
              }
            })
          }
        })
      } else if (v === '1') {
        this.permission.list.forEach(e => {
          e.expand = false
          if (e.children && e.children.length > 0) {
            e.children.forEach(c => {
              c.expand = false
              if (c.children && c.children.length > 0) {
                c.children.forEach((b) => {
                  b.expand = false
                })
              }
            })
          }
        })
      } else if (v === '2') {
        this.permission.list.forEach(e => {
          e.expand = true
          if (e.children && e.children.length > 0) {
            e.children.forEach(c => {
              c.expand = false
              if (c.children && c.children.length > 0) {
                c.children.forEach((b) => {
                  b.expand = false
                })
              }
            })
          }
        })
      } else if (v === '3') {
        this.permission.list.forEach(e => {
          e.expand = true
          if (e.children && e.children.length > 0) {
            e.children.forEach(c => {
              c.expand = true
              if (c.children && c.children.length > 0) {
                c.children.forEach((b) => {
                  b.expand = false
                })
              }
            })
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
