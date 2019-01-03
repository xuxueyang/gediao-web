<template>
<div>
  <h3 style="float:left">写博客</h3>
  <div id="blog-main">
    <!--显示博客主页面-->
    <!-- use with components - bidirectional data binding（双向数据绑定） -->
    <el-button class="saveMessage" @click="saveMsg()">保存</el-button>
    <el-button class="return" @click="queryReturnLast()">返回</el-button>
    <!-- <el-upload
      class="uploadImg"
      :action="action"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload> -->
    <el-upload
      class="avatar-uploader uploadImg"
      :action="action"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-remove="handleRemove"
      :before-upload="beforeAvatarUpload">
      <div v-if="imageUrl">
        <img :src="imageUrl" class="avatar">
      </div>
      <i v-else class="el-icon-plus avatar-uploader-icon">上传封面图</i>
    </el-upload>
    <el-button v-if="imageUrl" class="deleteUploadImg" @click="deleteUploadImg()">删除封面图</el-button>

    <div class="titlediv">
      <div class="WriteIndex-titleInput Input-wrapper Input-wrapper--multiline">
        <textarea v-model="title" rows="1" class="inputtitle" placeholder="请输入标题（最多 50 个字）"></textarea>
      </div>
    </div>

    <!--<el- -->
    <quill-editor ref="myTextEditor"
                  v-model="content"
                  :config="editorOption"
                  @keyup.ctrl.83.native="save($event)"
                  @blur="onEditorBlur($event)"
                  @change="onEditorChange($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
  </div>
</div>
</template>
<script>
  import services from '@/api/file.services'
  import { quillEditor } from 'vue-quill-editor'
  export default{
    name: 'myVueQuillEditor',
    props: ['sourceId', 'templateUri', 'created'],
    component: {
      quillEditor
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        title: '',
        action: '',
        // blogId: '',
        imageUrl: '',
        permissionType: '',
        content: '<h2>数据正在加载中ing~~~</h2>',
        hasInit: true,
        hasSave: false,
        editorOption: {
          // something config
          // modules: {
          //   toolbar: [
          //     ['bold', 'italic', 'underline', 'strike'],
          //     ['blockquote', 'code-block']
          //   ]
          // }
        }
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(res,file){

      },
      deleteUploadImg(){
        this.imageUrl = ''
      },
      handleAvatarSuccess(res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        if(res.returnCode!=undefined||res.returnCode.startsWith('200')){
          if(res.data.length>0){
            this.imageUrl = services.getImageServiceUrl('' + res.data[0].name)
          }
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      save(editor) {
        // console.log(editor)
        // alert('a')
        this.saveMsg()
        // window.event.returnValue = false
        // editor.returnValue=false
      },
      initMsg() {
        // 添加监听器，等初始化完毕后，设置msg
        this.getMsg()
      },
      onEditorBlur(editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        // console.log('editor ready!', editor)
        this.initMsg()
      },
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        // this.content = html
        this.hasSave = false
      },
      // 设置个定时器，
      getMsg() {
        const url = services.getServiceIp() + '/api/app' + this.templateUri + '/' + this.sourceId + '?token=' + services.getToken()
        this.$http.get(url, {}).then(function(res) {
          if (res.data.returnCode.startsWith('200')) {
            this.$message({
              type: 'success',
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
            this.content = res.data.data.content
            // this.blogId = res.data.data.id
            this.title = res.data.data.title
            if(!!res.data.data.titleImg){
               this.imageUrl = services.getImageServiceUrl('' + res.data.data.titleImg.name)
            }
            this.permissionType = res.data.data.permissionType
            this.hasInit = false
            this.hasSave = false
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
            this.returnGediao()
          }
        }).catch(function(res) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '获取详情失败哦'
          })
          this.returnGediao()
        })
      },
      saveMsg() {
        if (this.hasInit) {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '数据还在加载中~'
          })
          return
        }
        // 验证title必须非空
        if(!!!this.title){
          this.$message({
            type: 'error',
            showClose: true,
            message: '标题不应该为空'
          })
          return;
        }
        // 发送API请求保存数据
        const url = services.getServiceIp() + '/api/app' + this.templateUri
        const body = {
          id: this.sourceId,
          content: this.content,
          title: this.title,
          token: services.getToken(),
          permissionType: this.permissionType,
          imageUrl:this.imageUrl
        }
        this.$http.post(url, body).then(function(res) {
          if (res.data.returnCode.startsWith('200')) {
            this.hasSave = true
            this.$message({
              type: 'success',
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
          }
        }).catch(function(res) {
          this.$message({
            type: 'error',
            showClose: true,
            message: '服务器正在抢修中~保存详情失败'
          })
          this.returnGediao()
        })
      },
      returnGediao() {
        this.$router.push({
          path: '/gediao'
        })
      },
      queryReturnLast(){
          if(this.hasSave){
            this.returnLast()
          }else{
            this.$confirm('消息尚未保存, 是否继续退出?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.returnLast()
              // this.$message({
              //   type: 'success',
              //   message: '删除成功!'
              // });
            }).catch(() => {
              // this.$message({
              //   type: 'info',
              //   message: '已取消删除'
              // });
            });
          }

      },
      returnLast(){
        // 有个bug，如果是第一次创建，返回上级有bug呀 --
        // console.log(this.$route.matched)
        var history = this.$route.matched
        if(history!=undefined&&history!=null&&history.length>=1&&history[0].path !== '/gediao/detail'&&!this.created){
            // this.$router.go(-1);
          // /gediao?index=8
          this.$router.push({
            path: '/gediao?index=8'
          })
        }else{
          if (history!=undefined&&history!=null&&history.length>=1&&history[0].path === '/gediao/detail'){
            this.$router.push({
              path: '/gediao?index=8'
            })
          }else{
            this.returnGediao()
          }
          // 直接返回格调
        }
        // this.$router.go(-1);
      }
    },
    // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
    // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
    // computed: {
    //   editor() {
    //     return this.$refs.myTextEditor.quillEditor
    //   }
    // },
    mounted() {
      // you can use current editor object to do something(editor methods)
      // console.log('this is my editor', this.editor)
      // this.editor to do something...
      // 判断detail是不是为空，是的话，需要创建
      if (this.sourceId == null || this.sourceId === undefined) {
        // this.createDetail()
        // 回调显示不存在的提示
        // 跳转到detail页面
        this.returnGediao()
      } else {
        // 加载的时候加载msg
        // this.getMsg()
        // alert(services.getServiceIp())
        this.action = '' + services.getServiceIp() + '/api/uaafile/img' + '?blogId=' + this.sourceId + '&token=' + services.getToken()
      }
    }

  }
</script>
<style lang="scss" scoped>
  #blog-main{
    margin: 47px auto 0;
    padding: 0 0;
    width: 860px;
    z-index: 1;
    font-size:10px;
    // width: 100%;
    height: auto;
    background-color: rgba(233, 238, 243,1);
    // margin-bottom: auto;
    // text-align: left;
    /*span{*/
    /*width: 20px;*/
    /*height: 50px;*/
    /*}*/
    .uploadImg{
      background-color: white;
      // height: 250px;
    //        width: 100%;
    //  height: 100%;
     background-size:cover
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      // width: 178px;
      // height: 178px;
      width: 100%;
      height: 100%;
      display: block;
    }
    .Input-wrapper.Input-wrapper--multiline {
      height: inherit;
    }
    .titlediv{
      display: flex;
      flex-direction: column;
      align-items: stretch;
      flex-shrink: 0;
    }
    .WriteIndex-titleInput {
      margin: 16px 0;
      border: 0;
      padding: 0;
      height: auto;
      width: 100%;
      position: relative;
    }
    .Input-wrapper {
      position: relative;
      display: flex;
      // width: 180px;
      height: 34px;
      padding: 4px 10px;
      font-size: 14px;
      // background: #FFFFFF;
      border: 1px solid rgba(233, 238, 243,1);
      border-radius: 3px;
      box-sizing: border-box;
      transition: background 200ms, border 200ms;
    }
    .deleteImage{
      // position: fixed;
      // right: 0px;
      margin-right: 20px;
      bottom: 0px;
      z-index: 2;
    }
    .inputtitle{
      // width: 300px;
      // height: 25px;
      // margin-bottom: 10px;
      // font-size: 18px;
      height: 50px;
      display: block;
      resize: none;
      width: 100%;
      /*width: 660px;*/
      border: 0;
      font-size: 32px;
      line-height: 1.4;
      font-weight: 600;
      font-synthesis: style;
      outline: none;
      box-shadow: none;
      font-family: monospace;
      // border-color: rgb(169, 169, 169);
      background-color: rgba(233, 238, 243, 0.8);
    }
    .saveMessage{
      // 相对布局
      position: fixed;
      right: 50px;
      top: 300px;
      z-index: 2;
    }
    .return{
      position: absolute;
      right: 20px;
      top: 79px;
      z-index: 2;
    }
    .deleteUploadImg{
      // position: absolute;
      // right: 80px;
      // top: 79px;
      display: flex;
      margin-top: 5px;
      z-index: 3;
    }
  }
</style>
