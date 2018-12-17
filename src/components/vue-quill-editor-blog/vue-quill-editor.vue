<template>
  <div id="blog-main">
    <!--显示博客主页面-->
    <!-- use with components - bidirectional data binding（双向数据绑定） -->
    <el-button class="saveMessage" @click="saveMsg()">保存</el-button>
    <el-button class="return" @click="returnLast()">返回</el-button>
    <div style="display: flex">
      <h2>标题：</h2>
      <input v-model="title" class="inputtitle" placeholder="标题" />
    </div>
    <!--<el- -->
    <quill-editor ref="myTextEditor"
                  v-model="content"
                  :config="editorOption"
                   @keyup.ctrl.83.native="saveMsg()"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
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
        title: '',
        permissionType: '',
        content: '<h2>数据正在加载中ing~~~</h2>',
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
      save() {
        alert('save')
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
        this.content = html
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
            this.title = res.data.data.title
            this.permissionType = res.data.data.permissionType
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
        //验证title必须非空
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
          permissionType: this.permissionType
        }
        this.$http.post(url, body).then(function(res) {
          if (res.data.returnCode.startsWith('200')) {
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
      }
    }

  }
</script>
<style lang="scss" scoped>
  #blog-main{
    font-size:10px;
    width: 100%;
    height: auto;
    margin-bottom: auto;
    text-align: left;
    /*span{*/
    /*width: 20px;*/
    /*height: 50px;*/
    /*}*/
    .inputtitle{
      width: 300px;
      height: 25px;
      margin-bottom: 10px;
      font-size: 18px;
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
  }
</style>
