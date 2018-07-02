<template>
<div class="login-class">
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h2 class="titleh2">格调</h2>
      <p class="titleh3">做自己生活的主人</p>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登陆
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegestry">
          去注册
        </el-button>
      </el-form-item>
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div> -->
    </el-form>
  </div>
</div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import service from '@/api/file.services'
export default {
  name: 'login',
  props:["projectType"],
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {

        } else {
          this.loading = false
        //   console.log('error submit!!')
          return false
        }
      })
      if(this.loginForm.username!=null&&this.loginForm.password!=null){
          this.loading = true
        //   this.$store.dispatch('Login', this.loginForm).then(() => {
        //     this.loading = false
        //     // this.$router.push({ path: '/' })

        //   })
          const url = service.getServiceIp() + "/api/login/authenticate"
          this.$http.post(url,{
              name: this.loginForm.username,
              password: this.loginForm.password
          }).then(function(res){
              if(res.data.returnCode.startsWith('200')){
                    this.loading = false
                    
                    window.localStorage.setItem('token',JSON.stringify(res.data.data.access_token))
                    window.localStorage.setItem('userinfo',JSON.stringify(res.data.data.userinfo))
                    this.$emit('loginSuccessCallback',false)
              } else {
                this.loading = false
                this.$message({
                    message:'登陆失败QAQ服务器正在抢修',
                    type: 'error',
                    showClose:true
                })
              }
          })
          .catch(() => {
            this.loading = false
            this.$message({
                message:'登陆失败QAQ服务器正在抢修11',
                type: 'error',
                showClose:true
            })            
          })
      }

      this.loading = false
    },
    handleRegestry(){
    //   this.$router.push({path:"/regestry"})
        this.$emit('toRegCallback',false)
    }
  }
}
</script>
<style>
  .login-class{
    width: 100%;
    height: 750px;
    background-color: #2d3a4b;
  }
</style>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  // position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 80px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .titleh2 {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: none;
    font-family:'FontAwesome'
  }
  .titleh3 {
    font-size: 18px;
    font-weight: 400;
    color: $dark_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: none;
    font-family:'FontAwesome'
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
