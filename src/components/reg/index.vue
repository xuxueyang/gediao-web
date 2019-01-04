<template>
<div class="reg-class" >
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h2 class="titleh2">格调</h2>
      <p class="titleh3">邮箱注册</p>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username"   placeholder="邮箱" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>

      <div class="graphImgDiv">
        <div class="graphImgDiv_left">
          <el-form-item prop="captchaGraph" >
            <span class="svg-graph-container">
             <svg-icon icon-class="captchaGraph" />
           </span>
          <el-input  name="captchaGraph" type="text" v-model="loginForm.captchaGraph"  placeholder="图形验证码" />
          </el-form-item>
        </div>
        <div class="graphImgDiv_right" @click="refreshGraph()">
            <img   :src="captchaGraph_image">
        </div>
      </div>

      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegestry">
          注册
        </el-button>
      </el-form-item>

        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="canelReg">
          返回登陆
        </el-button>
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div> -->
    </el-form>

  </div>
</div>
</template>

<script>
import { validatEmail } from '@/utils/validate'
import service from '@/api/file.services'
export default {
  name: 'regestry',
  props:["projectType"],
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validatEmail(value)) {
      //   callback(new Error('请输入正确的邮箱'))
      // } else {
      //   callback()
      // }
      return true
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        // callback()
        return true
      }
    }
    const validateCaptchaGraph = (rule,value,callback) => {
      if(value!=null&&value!=''){
        //向服务器发送数字判断是否成功
        //TODO 发送请求
        // callback();
        return true
      }else{
        callback(new Error('二维码输入错误'))
        this.refreshGraph()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        captchaGraph:''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        // captchaGraph: [{ required: true, trigger: 'blur', validator: validateCaptchaGraph }]
      },
      loading: false,
      pwdType: 'password',
      time : 0,
      btntxt:"获取邮箱验证码",
      //图像验证码，在加载页面的时候获取调用
      //TODO到时候加上时间，不能获取太快
      meta: 'data:image/jpeg;base64,',
      captchaGraph_v: '',
      captchaGraph_v_id: '',
      captchaGraph_image:''
    }
  },
  mounted:function(){
      this.refreshGraph();
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    canelReg() {
        //取消注册
        this.$emit('canelRegCallback',false);
    },
    // 发送邮箱验证码
    sendEmailLink(){
        // var formMess=this.formMess
        // Axios.post(api+"/order/select/reception", formMess)
        //  .then(function (res) {
        //      if(res.data.code==200){
        //        console.log(res.data.data);
        //        this.productResult=res.data.data;
        //        this.productResult.length=3;
        //      }else if(res.data.code==400){
        //       alert(res.data.message)
        //      }
        // }.bind(this))
   },
    refreshGraph(){
        //TODO 刷新二维码
        // this.captchaGraph_v = ''
        // console.log('刷新了图像验证码')
        const url = service.getServiceIp() + '/api/login/graph'
        this.$http.get(url).then(function(res){
            if(res.data.returnCode.startsWith('200')){
                this.captchaGraph_v = res.data.data.graph
                this.captchaGraph_v_id = res.data.data.id
                // console.log(this.captchaGraph_v)
                this.captchaGraph_image = this.meta + this.captchaGraph_v
            }else{
                //获取图像验证码失败
                this.$message({
                    type:'error',
                    message:'获取图像验证码失败QAQ服务器在傲娇QAQ（验证码非必填项）',
                    showClose: true
                })
            }
        }).catch(function(e){
                this.$message({
                    message: '获取图像验证码失败QAQ服务器在傲娇QAQ（验证码非必填项）',
                    showClose: true,
                    type: 'error'
                });
            })
    },
    email_timer() {
    //   if (this.time > 0) {
    //     this.time--;
    //     this.btntxt=this.time+"s后重新获取";
    //     setTimeout(this.email_timer, 1000);
    //   } else{
    //     this.time=0;
    //     this.btntxt="获取邮箱验证码";
    //     this.disabled=false;
    //  }
    },

    handleRegestry(){
      //验证字段1097539652@qq.com
        this.$refs.loginForm.validate(valid => {
        if (valid) {

        } else {
        //   console.log('error submit!!')
          return false
        }
      })
      //自己单独验证

      if(this.loginForm.password!=null&&this.loginForm.password.length>5
          &&this.loginForm.username!=null&&this.loginForm.captchaGraph!=null)
      {
            this.loading = true
            const url = service.getServiceIp() + '/api/user/reg'
            this.$http.post(url,{
                loginName : this.loginForm.username,
                password: this.loginForm.password,
                tel: '',
                nickName: '',
                projectType: this.projectType,
                graphCaptchaCode: this.loginForm.captchaGraph,
                graphCaptchaCodeId: this.captchaGraph_v_id
            }).then(function(res){
                this.loading = false
                if(res.data.returnCode.startsWith("200")){
                    //注册成功，跳到调到登陆模块
                    this.$message({
                        type:'success',
                        message:'注册成功~',
                        showClose:true
                    })
                    // this.$emit('regSuccessCallBack',false);
                    this.canelReg()
                }else{
                  this.$message({
                      type:"error",
                      showClose:true,
                      message: service.getMessageByCode(res.data.returnCode)
                  })
                  this.refreshGraph()
                }
            }).catch(function(e){
                console.log(e)
                this.loading = false
                this.$message({
                    message: '注册失败QAQ请联系右上角的开发者哈',
                    showClose: true,
                    type: 'error'
                });
            })
      }
    }
  }
}
</script>
<style>
    .reg-class{
        width: 100%;
        height: 750px;
        background-color:#2d3a4b
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
//   position: fixed;
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
  .svg-graph-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .graphImgDiv{
     width: 100%;
     height: 100px;
     .graphImgDiv_left{
        width:58%;
        float:left;
        display: inline;
     }
     .graphImgDiv_right{
        width:auto;
        float:right;
        display: inline;
        cursor: pointer;
        img{
          display:block;
          margin:8px 40px 0px 0px;
          width: 120px;
          height: 30px;
          // 增加说明，点击更换
        }
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
