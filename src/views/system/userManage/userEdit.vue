<template>
  <div class="user-edit">
    <drawer-panel :drawer-config="drawerConfig" @on-submit="submit" @on-cancel="cancel">
      <div class="user-title">
        <div class="info-title">基本信息</div>
      </div>
      <div slot="content">
        <Form ref="userform" :model="form" :rules="formValidate" label-position="top">
          <Row :gutter="32">
            <Col span="24">
            <div class="user-avatar-panel" style="">
              <label style="margin-right:20px;"></label>
              <Avatar :src="form.avatar" size="large" />
              <Upload class="upload-avatar-file" action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">上传头像</Button>
              </Upload>
            </div>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
            <FormItem label="登录账号" prop="username">
              <Input v-model="form.username" autocomplete="off" :maxlength="16" placeholder="请输入登录账号" />
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem v-if="type=='0'" label="密码" prop="password">
              <SetPassword v-model="form.password" @on-change="changePass" />
            </FormItem>
            <FormItem v-else label="密码">
              <div class="ivu-input" :style="{'line-height: ': '25px'}">
                <label class="password-val">*******</label>
                <Icon type="ios-create" class="password-edit" size="21" />
              </div>
            </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
            <FormItem label="用户名" prop="realname">
              <Input v-model="form.realname" placeholder="请输入用户名" />
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="邮箱" prop="email">
              <Input v-model="form.email" placeholder="请输入邮箱" />
            </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
            <FormItem label="手机号" prop="mobile">
              <Input v-model="form.mobile" placeholder="请输入手机号" />
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="性别">
              <Select v-model="form.sex">
                <Option :value="0">男</Option>
                <Option :value="1">女</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
            <Col span="12">
            <FormItem label="角色分配" prop="roleIds">
              <Select v-model="form.roleIds" multiple>
                <Option v-for="item in roleList" :key="item.id" :value="item.id" :label="item.name">
                  <span style="margin-right:10px;">{{ item.name }}</span>
                  <span style="color:#ccc;">{{ item.description }}</span>
                </Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="用户类型">
              <Select v-model="form.type" placeholder="请选择">
                <Option :value="0">普通用户</Option>
                <Option :value="1">管理员</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Divider />
          <Row :gutter="32">
            <Col span="24">
            <FormItem label="简介">
              <Input v-model="form.description" type="textarea" :rows="4" />
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </drawer-panel>
  </div>
</template>

<script>
import * as RoleApi from '@/api/roleManage'
import * as UserApi from '@/api/userManage'
import SetPassword from '@/components/Content/setPassword'
import DrawerPanel from '@/components/Content/drawerPanel'
export default {
  name: 'UserEdit',
  components: {
    SetPassword,
    DrawerPanel
  },
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
      default: '0'
    }
  },
  data() {
    return {
      drawerConfig: {
        visible: this.value,
        title: '',
        submitLoading: false,
        maskClosable: this.type !== 0
      },
      passColor: '',
      maxHeight: 510,
      form: {},
      formValidate: {
        // 表单验证规则
        username: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        realname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确' }
        ]
      },
      roleList: []
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val)
    },
    data(val) {
      this.setCurrentData(val)
    },
    'drawerConfig.visible'(value) {
      this.$emit('input', value)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getRoleList()
    },
    getRoleList() {
      RoleApi.getRoleList().then(res => {
        if (res.success) {
          this.roleList = res.result.content
        }
      })
    },
    handleSelectDepTree(v) {
      this.form.departmentId = v
    },
    changePass(v, grade, strength) {
      this.form.passStrength = strength
    },
    changeBirth(v, d) {
      this.form.birth = v
    },
    cancel(config) {
      this.drawerConfig = config
    },
    submit() {
      this.$refs.userform.validate(valid => {
        if (valid) {
          if (typeof this.form.birth === 'object') {
            this.form.birth = this.format(this.form.birth, 'yyyy-MM-dd')
          }
          if (this.type === '0') {
            // 添加
            this.drawerConfig.submitLoading = true
            UserApi.addUser(this.form).then(res => {
              this.drawerConfig.submitLoading = false
              if (res.success) {
                this.$Message.success('操作成功')
                this.drawerConfig.visible = false
                this.$emit('on-success', true)
              }
            })
          } else {
            // 编辑
            this.drawerConfig.submitLoading = true
            UserApi.editUser(this.form).then(res => {
              this.drawerConfig.submitLoading = false
              if (res.success) {
                this.$Message.success('操作成功')
                this.drawerConfig.visible = false
                this.$emit('on-success', true)
              }
            })
          }
        }
      })
    },
    setCurrentValue(value) {
      if (value === this.drawerConfig.visible) {
        return
      }
      if (this.type === '1') {
        this.drawerConfig.title = '编辑用户'
        this.maxHeight = Number(document.documentElement.clientHeight - 121) + 'px'
      } else if (this.type === '1') {
        this.drawerConfig.title = '添加用户'
        this.maxHeight = Number(document.documentElement.clientHeight - 121) + 'px'
      } else {
        this.drawerConfig.title = '用户详情'
        this.maxHeight = '100%'
      }
      this.drawerConfig.visible = value
    },
    setCurrentData(val) {
      if (this.type === '1') {
        // 回显数据
        let data = this.data
        // 角色
        let selectRolesId = []
        data.roles.forEach((e) => {
          selectRolesId.push(e.id)
        })
        data.roleIds = selectRolesId
        delete data.roles
        delete data.permissions
        // 密码强度
        if (data.passStrength === '弱') {
          this.passColor = '#ed3f14'
        } else if (data.passStrength === '中') {
          this.passColor = '#faad14'
        } else {
          this.passColor = '#52c41a'
        }
        // 回显
        this.form = data
      } else if (this.type === '1') {
        // 添加
        this.form = val
      }
    }
  }
}
</script>

<style lang="scss">
.user-title {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .info-title {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    display: block;
    margin-right: 16px;
  }
}
.info-header {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.85);
  display: block;
  margin-bottom: 16px;
}
.user-avatar-panel {
  margin: 8px 8px 18px 0px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  padding: 8px;
}
.password-val {
  display: inline-block;
  vertical-align: text-top;
  border-right: 1px solid #b4b6bb;
  width: 83%;
}
.password-edit {
  float: right;
  cursor: pointer;
  font-size: 21px;
  width: 16%;
}
.upload-avatar-file{
  margin-left:30px ;
  display: inline-block;
}
</style>
