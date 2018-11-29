<template>
  <div id="blog-main">
    <!--显示博客主页面-->
    <!-- use with components - bidirectional data binding（双向数据绑定） -->
    <quill-editor ref="myTextEditor"
                  v-model="content"
                  :config="editorOption"
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
    props: ['detailId'],
    component: {
      quillEditor
    },
    data() {
      return {
        content: '<h2>I am Example</h2>',
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
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
        this.getMsg()
      },
      onEditorChange({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.content = html
      },
      getMsg() {
        const url = services.getServiceIp() + "/api/app/log/detail" + "/" + '21c03bcfaffd466eb2e594b0b51a3090' + "?token=" + '5b34ae96496542f89fc8456f664a0f7d'
        this.$http.get(url, {}).then(function (res) {
          if (res.data.returnCode.startsWith("200")) {
            this.$message({
              type: "success",
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
            // console.log(res.data.data.remarks)
            this.content = res.data.data.remarks
            // this._index = ''+Math.random()
          } else {
            this.$message({
              type: "error",
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
            // this.returnGediao()
          }
        }).catch(function (res) {
          this.$message({
            type: "error",
            showClose: true,
            message: "获取详情失败哦"
          })
          // this.returnGediao()
        })
      }
    },
    // if you need to get the current editor object, you can find the editor object like this, the $ref object is a ref attribute corresponding to the dom redefined
    // 如果你需要得到当前的editor对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的editor对象，实际上这里的$refs对应的是当前组件内所有关联了ref属性的组件元素对象
    computed: {
      editor() {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    mounted() {
      // you can use current editor object to do something(editor methods)
      console.log('this is my editor', this.editor)
      // this.editor to do something...
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
  }
</style>
