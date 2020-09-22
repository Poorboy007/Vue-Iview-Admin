<template>
  <div class="login-bg">
    <div class="login-panel">
      <div class="login-panel-content">
        <div class="login-account-top">
          <div class="login-account-top-logo">
            <img :src="publicPath + 'webapp-logo.png'" alt="logo">
          </div>
          <div class="login-account-top-desc">
            ICS-Admin (使用Vue + Vuex + Aios + Iview)集成后台管理系统/前端设计解决方案
          </div>
        </div>
        <Row v-if="!socialLogining" class="login-form">
          <Form ref="loginForm" :model="loginForm" :rules="rules" class="form" draggable="false">
            <FormItem prop="username">
              <Input v-model="loginForm.username" type="text" :class="{'input-item--active':uname}" prefix="ios-contact"
                     size="large" clearable placeholder="请输入用户名" autocomplete="off" @on-focus="changeColor('uname','focus')"
                     @on-blur="changeColor('uname','blur')" />
            </FormItem>
            <FormItem prop="password">
              <Input v-model="loginForm.password" type="password" :class="{'input-item--active':pasw}" prefix="ios-lock"
                     size="large" clearable placeholder="请输入密码" autocomplete="off" @on-focus="changeColor('pasw','focus')"
                     @on-blur="changeColor('pasw','blur')" />
            </FormItem>
            <FormItem prop="imgCode">
              <Row type="flex" justify="space-between" style="align-items: center; position:relative; overflow: hidden;">
                <Input v-model="loginForm.imgCode" :class="{'input-item--active':imgCode}" class="imgCode" size="large" clearable
                       placeholder="请输入图片验证码" :maxlength="10" @on-focus="changeColor('imgCode','focus')"
                       @on-blur="changeColor('imgCode','blur')" />
                <div style="position:absolute; top:3px; right:0px;">
                  <Spin v-if="loadingCaptcha" fix></Spin>
                  <img :src="captchaImg" alt="加载验证码失败"
                       style="width:100px;cursor:pointer;display:block; border-left:1px solid #CCC;" @click="getCaptchaImg" />
                </div>
              </Row>
            </FormItem>
          </Form>

          <Row type="flex" justify="space-between">
            <Checkbox v-model="saveLogin" size="large">自动登录</Checkbox>
            <Dropdown trigger="click" @on-click="handleDropDown">
              <a class="forget-pass">
                忘记密码
              </a>
              <DropdownMenu slot="list">
                <!--<DropdownItem name="showAccount">体验测试账号</DropdownItem>-->
                <DropdownItem name="resetByEmail">使用邮箱重置密码</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Row>
          <Row>
            <Button class="login-btn" type="primary" size="large" :loading="socialLogining" long @click="submitLogin">
              <span v-if="!socialLogining">登录</span>
              <span v-else>登录中...</span>
            </Button>
          </Row>
        </Row>
        <div v-else class="spinner" :class="{'isSubmit':socialLogining}">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
          <!-- <span>用户数据加载中...</span> -->
        </div>
        <Row class="foot">
          <Row type="flex" justify="center" class="copyright">
            Copyright @ 2020 - 版权所有
          </Row>
        </Row>
      </div>

    </div>
    <div class="m-wave">
      <ul class="wave-item item1">
        <li class="wave-bg wave-bg1"></li>
        <li class="wave-bg wave-bg1"></li>
      </ul>
      <ul class="wave-item item2">
        <li class="wave-bg wave-bg2"></li>
        <li class="wave-bg wave-bg2"></li>
      </ul>
      <ul class="wave-item item3">
        <li class="wave-bg wave-bg3"></li>
        <li class="wave-bg wave-bg3"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import UUid from 'uuid'
import { getCaptcha } from '@/api/account'
export default {
  name: 'Login',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      uname: false,
      pasw: false,
      imgCode: false,
      loadingCaptcha: false,
      socialLogining: false,
      saveLogin: false,
      captchaImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAkCAIAAADXdomHAAAC60lEQVR42u3av2sUQRQH8C92toIIImJhLO3UyoBFOu1sxCLEH40WCnbhCASDpMh/YGMviI2NSP6AhNQqWElK0cJGC8HlRofJ/Hjz5s2bnbtw8Irldva4/cy7Nz928fvr90XoBnDi34H0+nv/D97P4O2d2no4ROKX3x1P+RhnkCFOKS9wlZUNNPB5gTv36YyZGQQutPjaR99u2iCUgfU2N9XmrvqGa5rCFecy8E6Sudsnr0WD/grBVfcPlrwYgRg4w68YH24/5kRxWajH5bACD0Llprj8C5myOriEF79xCjHqCywvcBVw6VPHE9eDI3BD4iLZ7rjAnyguUZo5sgW4UTJ+S5cPWE2dnZ2ay8nr7DSjA27hVHGpZvolwM1mZdjAWwGycGk1ZjNiSqBVDaKCYtxpj96hZa/uraXiyNqkC244zxUTE3xi3Jq8HsIqZ3CJYS3VJotLh2JVVcdljmPcspCC47ThrMcUcbUGNOAtPY7NDW6Nr2e3s3vdRIvMFciycKOVgWjAH9D4DYpqgiUW4AIve+ISg5sN4NbrH5u9cC1xTeYCb6ILtv645sPB14RnZz+3HdACV6ssiGW5uNk/vngRkdUfAthRwfUq8nzgHp77pLi3MF0fnw07IIzsMiF6Nhz3+uMSE95S3KJdscmzF9MKeJGTvLR+WJSzxEV7YGW4wM8obnbjUbyfG71w8DXEnP0E4lQ0/W0iuyMwExc4XYbrjPhJQRluypE5jqWIs/s1zAHNErvh4UY7oOoZmmAiwScuXZUxU1jwmDJVkb20DXNf59H6yvMbqTCVd5wnu0SVUAzZ1KLJewuEO9EfJVP6Sx2JxcqaL4VwkhfYV+yPEXxrlJXfuGlaHKLiJoW1/iK65UIf11sCpOLj5Ykb7Qpxi5LFTGT9d8Xc5AXOM6/yrGXo9VXiypenQ/C7wRCn+qMtbn2k0IFf6nMJAC4x0XLj1RM3bCJ79E3echxhWkZnuspcwhDTytFyYdH/AuVUxsL2j4T+AAAAAElFTkSuQmCC',
      loginForm: { username: 'admin', password: '123456' },
      rules: {
        username: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ],
        imgCode: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    changeColor(inp, event) {
      if (inp === 'uname') {
        this.uname = (event === 'focus')
      }
      if (inp === 'pasw') {
        this.pasw = (event === 'focus')
      }
      if (inp === 'imgCode') {
        this.imgCode = (event === 'focus')
      }
    },
    getCaptchaImg() {
      this.loadingCaptcha = true
      let uuid = UUid.v1()
      this.captcha = uuid.replace(/-/g, '')
      getCaptcha(this.captcha).then(res => {
        this.loadingCaptcha = false
        if (res.success) {
          let captcha = res.result
          // this.captchaImg = 'data:image/png;base64,' + captcha
          this.captchaImg = captcha
        }
      })
    },
    refreshCaptcha() { },
    handleDropDown(v) {
      if (v === 'showAccount') {
        this.showAccount()
      } else if (v === 'resetByMobile') {
        this.$router.push({
          name: 'reset'
        })
      } else if (v === 'resetByEmail') {
        this.$router.push({
          name: 'reset',
          query: {
            type: '1'
          }
        })
      }
    },
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.socialLogining = true
          this.$store.dispatch('LoginByUserName', this.loginForm).then(res => {
            // this.socialLogining = false
            this.$Message.success('登录成功')
            // this.$router.push({ path: this.redirect || '/unit/list' })
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.socialLogining = false
            this.refreshCaptcha()
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-bg {
  height: 100%;
  widows: 100%;
  background: #f7f7f7;
}

.login-bg {
  height: 100vh;
  background: transparent;
  .login-panel {
    height: 500px;
    width: 400px;
    background: #fff;
    border-radius: 7px;
    border: 1px solid rgb(222 221 221 / 42%);
    margin: 0px auto;
    position: absolute;
    overflow: hidden;
    left: 50%;
    top: 50%;
    margin: -300px -200px;
    &:before {
      content: "";
      height: 500px;
      width: 500px;
      display: block;
      position: absolute;
      border-radius: 50%;
      left: -322px;
      background: linear-gradient(135deg, #f3f6f9, #dbedf5);
    }
    &::after {
      content: "";
      height: 500px;
      width: 500px;
      /* border: 70px solid #cccccc1f; */
      display: block;
      background: #fff;
      position: absolute;
      border-radius: 50%;
      left: -400px;
      top: 0;
    }
    .header {
      line-height: 30px;
      padding: 8px;
      .logo {
        height: 30px;
        display: inline-block;
        img {
          height: 100%;
        }
      }
      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        vertical-align: top;
        display: inline-block;
        line-height: 30px;
      }
      .close {
        float: right;
        margin-top: -3px;
      }
    }
    .login-panel-content {
      padding: 21px 29px 10px 29px;
      position: relative;
      z-index: 9;
      .login-account-top {
        text-align: center;
        .login-account-top-logo {
        }
        .login-account-top-desc {
          padding-bottom: 10px;
        }
      }
      .login-form {
        .ivu-input-wrapper {
          overflow-x: hidden;
        }
        .ivu-input-wrapper::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          overflow: hidden;
          height: 10px;
          content: "";
          transition: -webkit-transform 0.3s ease;
          transition: transform 0.3s ease;
          transition: transform 0.3s ease, -webkit-transform 0.3s ease;
          -webkit-transform: translate3d(-101%, 0, 0);
          transform: translate3d(-101%, 0, 0);
          border-bottom: 2px solid #57a3f3;
          border-image: linear-gradient(#92e7fc, #79d6fd) 30 30;
        }
        .input-item--active.ivu-input-wrapper::after {
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
        }
        .ivu-form-item-error .ivu-input-wrapper::after {
          border-bottom: 2px solid #ed4014;
          border-image: linear-gradient(#f14d23, #ed4014) 30 30;
        }
        margin-bottom: 30px;
        input {
          font-size: 12px;
          border-width: 0px 0px 1px 0px;
          border-radius: 0px;
        }
        .ivu-input:hover,
        .ivu-input:active,
        .ivu-input:focus {
          border-width: 0px 0px 1px 0px;
          //92e7fc  - 79d6fd
          border-color: #dcdee2;

          box-shadow: initial;
          outline: 0px !important;
        }
      }
      .ivu-tabs-nav-container {
        line-height: 2;
        font-size: 17px;
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        zoom: 1;
      }
      .form {
        padding-top: 1vh;
        .input-verify {
          width: 70%;
        }
        .count-verify,
        .send-verify {
          width: 100px;
        }
      }
      .forget-pass,
      .other-way {
        font-size: 14px;
      }
      .login-btn,
      .other-login {
        margin-top: 3vh;
      }
      .icons {
        display: flex;
        align-items: center;
      }
      .other-icon {
        cursor: pointer;
        margin-left: 10px;
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.2);
        :hover {
          color: #2d8cf0;
        }
      }
      .foot {
        margin-bottom: 2vh;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        .help {
          margin: 0 auto;
          margin-bottom: 1vh;
          width: 60%;
          .item {
            color: rgba(0, 0, 0, 0.45);
          }
          :hover {
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }
  }
}

.m-wave {
  width: 100%;
  height: 110px;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  .wave-item {
    width: 6000px;
    height: 110px;
    list-style: none;
    position: absolute;
  }
  .wave-bg {
    width: 50%;
    height: 100%;
    float: left;
    background: url("~@/assets/login/waveBg.png") 0 0 repeat-x;
  }
  .wave-bg1 {
    animation: anim_wave 35s linear infinite;
    background-position: 0 -20px;
  }
  .wave-bg2 {
    animation: anim_wave 45s linear infinite;
    background-position: 0 -232px;
  }
  .wave-bg3 {
    animation: anim_wave 50s linear infinite;
    background-position: 0 -436px;
  }
}
@keyframes anim_wave {
  0% {
    transform: translateX(0) translateZ(0) scaleY(1);
  }
  50% {
    transform: translateX(-50%) translateZ(0) scaleY(1.1);
  }
  100% {
    transform: translateX(-100%) translateZ(0) scaleY(1);
  }
}

.spinner {
  &.isSubmit {
    border: 1px solid rgba(222, 221, 221, 0.42);
  }
  margin-top: 50px;
  margin-bottom: 106px;
  height: 162px;
  text-align: center;
  font-size: 10px;
  padding-top: 50px;
  padding-bottom: 50px;
  span {
    display: block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 1vh;
  }
  div {
    margin-right: 4px;
    background-color: #78b9fe;
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }
  .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
}

@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}

.ivu-tabs-nav .ivu-tabs-tab .ivu-icon {
  width: 14px;
  height: 14px;
  margin-right: 8px;
  margin-bottom: 5px;
}
.imgCode {
  i {
    right: 100px;
  }
}

@media screen and (max-width: 765px) {
  .login-bg {
    .login-panel {
      width: 100%;
      border: 0;
      margin-left: -50vw;
    }
  }
}

@media screen and (max-width: 1080px) {
}
</style>
