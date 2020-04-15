<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="登录"></van-nav-bar>
    <van-cell-group>
      <van-field
        @blur="checkMobile"
        :error-message="errorMsg.mobile"
        v-model.trim="loginForm.mobile"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        @blur="checkCode"
        :error-message="errorMsg.code"
        v-model.trim="loginForm.code"
        label="验证码"
        placeholder="请输入验证码"
      >
        <van-button class="p10" slot="button" size="mini" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="btn_box">
      <van-button type="info" @click="login" block round>登 录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errorMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    checkMobile () {
      const value = this.loginForm.mobile
      if (!value) {
        this.errorMsg.mobile = '请输入手机号'
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        this.errorMsg.mobile = '手机号格式不对'
      } else {
        this.errorMsg.mobile = ''
      }
    },
    checkCode () {
      const value = this.loginForm.code
      if (!value) {
        this.errorMsg.code = '请输入验证码'
      } else if (!/^\d{6}$/.test(value)) {
        this.errorMsg.code = '验证码6位数字'
      } else {
        this.errorMsg.code = ''
      }
    },
    async login () {
      // 整体表单校验
      this.checkMobile()
      this.checkCode()
      // 如何判断校验成功
      if (!this.errorMsg.mobile && !this.errorMsg.code) {
        // 校验成功
        // 1. 基于request封装登录的API
        // 2. 导入API
        // 3. 调用即可
        // 4. 获取用户信息
        // 5. 更新vuex中的user数据
        // 6. 根据地址栏进行跳转
        // 7. 提示 成功
        // 8. 失败 错误提示
        try {
          const data = await login(this.loginForm)
          this.setUser(data)
          this.$router.push(this.$route.query.redirectUrl || '/user')
          this.$toast.success('登录成功')
        } catch (e) {
          this.$toast.fail('用户名或验证码错误')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.p5 {
  padding: 0 5px;
}
.btn_box {
  padding: 10px;
  .van-button {
    height: 32px;
    line-height: 30px;
  }
}
</style>
