<template>
  <div>
    <div style="display: flex">
      <!--标题在左边，分享在右边-->
      <div><h2>{{blogDto.title}}</h2></div>
      <div class="shareButton">
        <share-to-q-q-space v-bind:usestyle="'el-button'" v-bind:title="blogDto.title"></share-to-q-q-space>
      </div>
    </div>
    <div id="blogContent" class="blogContent">
    </div>
    <!--<div>-->
       <!--博客内容-->
      <!--<quill-editor ref="myTextEditor"-->
                    <!--v-model="blogDto.content"-->
                    <!--:options="editorOption"-->
                    <!--:config="editorOption">-->
      <!--</quill-editor>-->
    <!--</div>-->
  </div>
</template>
<script>
  import { quillEditor } from 'vue-quill-editor'
  import services from '../../../api/file.services'
  import ShareToQQSpace from '../../../components/shareToQQSpace/index';

  export default {
    components: {ShareToQQSpace},
    data() {
      return {
        // myTextEditor: null,
        editorOption:{
          theme: 'bubble',
          contenteditable: false,
          modules:{
            toolbar:{
              container: [],
              display: 'none',
              contenteditable: false
            },
            // container:{
            //   contenteditable: false
            // }
          },
        },
        templateUri: '/blog/blog',
        sourceId: '',
        blogDto: {
          title: '',
          content: '正在加载中~~~~',
          readCount: ''
        }
      }
    },
    mounted() {
      // this.sourceId = this.$route.query.
      this.sourceId = this.$route.params.id
      this.getMsg()
      // console.log(myTextEditor)
    },
    methods: {
      returnGediao() {

      },
      getMsg() {
        const url = services.getServiceIp() + '/api/app' + this.templateUri + '/' + this.sourceId
        this.$http.get(url, {}).then(function(res) {
          if (res.data.returnCode.startsWith('200')) {
            this.$message({
              type: 'success',
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
            this.blogDto = res.data.data
            // 设置内容
            document.getElementById('blogContent').innerHTML = this.blogDto.content
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
        // 设置不可编辑 ql-editor contenteditable

      }
    }
  }
</script>
<style>
.shareButton{
  margin-right: 0;
  margin-left:auto;
  margin-bottom: auto;
}
.blogContent{
  text-align: left;
  margin-left: 20px;
  width: 80%;
}
</style>
