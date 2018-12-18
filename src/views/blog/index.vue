<template>
  <div>
    <div v-if="blogId">

    </div>
    <div v-else>
    <ul>
      <li v-for="blog in blogs" v-bind:key="blog.id">
        <div>
          <span>{{blog.title}}</span>
          <a @click="lookBlog(blog.id)">查看编辑</a>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
  import services from "../../api/file.services";
  import vueQuillEditor from '@/components/vue-quill-editor-blog/vue-quill-editor.vue';

  export default {
    components:{
      vueQuillEditor
    },
    data() {
      return {
        blogId: '',
        blogs: [
          //   {
          //     title: '测试博客1',
          //     id: '1',
          //     createDate: '',
          //     updateDate: '',
          //     readCount: 4,
          // },{
          //     title: '测试博客2',
          //     id: '2',
          //     createDate: '',
          //     updateDate: '',
          //     readCount: 4,
          // },{
          //     title: '测试博客3',
          //     id: '3',
          //     createDate: '',
          //     updateDate: '',
          //     readCount: 4,
          // }
        ]
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
          if(this.$route.query.blogId==null||this.$route.query.blogId==undefined){
            this.getAllBlog()
          }else{
            this.blogId = this.$route.query.blogId
          }
      },
      getAllBlog() {
        // 获取到所有的博客
        var url = '' + services.getServiceIp() + '/api/app/blog/blogs' + '?page=0'
        this.$http.get(url,{
        }).then(function (res) {
          if(res.data.returnCode.startsWith('200')) {
            this.blogs = res.data.data
            this.$message({
              type: 'success',
              showClose:true,
              message: services.getMessageByCode(res.data.returnCode)
            })
          }else {
            this.$message({
              type: 'error',
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
          }

        })
      },
      lookBlog(id) {
        // 跳转到编辑页面（和新增页面一样，区别在于，如果没有，会创建）（带有查询ID，如果没有，则视为创建)
        this.$router.push(
          {path: '/blog/' + id}
        )
      }
    }
  }
</script>
<style scoped>

</style>
