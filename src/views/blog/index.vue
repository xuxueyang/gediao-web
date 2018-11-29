<template>
  <!-- 显示进入detail面板 -->
  <div>
    <my-vue-quill-editor v-bind:eachId="eachId" v-bind:detailId="detailId" :key='Math.random()'></my-vue-quill-editor>
  </div>
</template>
<script>
  import services from '@/api/file.services'
  import myVueQuillEditor from '@/components/vue-quill-editor/vue-quill-editor.vue'

  export default {
    components: {
      myVueQuillEditor
    },
    mounted(){
      // 查询路由参数，如果
      this.init()
    },
    data() {
      return {
        eachId:'',
        detailId:''
      }
    },
    watch: {
      '$route': {
        handler: 'init',
        immediate: true
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'init'

    },
    methods : {
      init(){
        if(this.$route.query.eachId){
          this.eachId = this.$route.query.eachId
          if(this.$route.query.detailId==null||this.$route.query.detailId==undefined){
            // this.createDetail()
          }else{
            this.detailId = this.$route.query.detailId
          }
        }
      },
      createDetail(){
        const url = services.getServiceIp()+"/api/app/log/detail"
        const body = {
          logEachId: this.eachId,
          remarks: '',
          token: services.getToken()
        }
        this.$http.put(url,body).then(function(res){
          if(res.data.returnCode.startsWith("200")){
            this.$message({
              type:"success",
              showClose:true,
              message: services.getMessageByCode(res.data.returnCode)
            })
            this.detailId = res.data.data.id
            // 放入到路由中
            // this.$router.push({
            //     query:merge(this.$route.query,{'detailId':this.detailId})
            // })
            this.$router.push({
              path : '/gediao/detail',
              query: {
                'eachId': this.eachId,
                'detailId':this.detailId
              }
            })
          }else{
            this.$message({
              type:"error",
              showClose:true,
              message: services.getMessageByCode(res.data.returnCode)
            })
          }
        }).catch(function(res){
          console.log(res)
          this.$message({
            type:"error",
            showClose:true,
            message:"~~~创建详情失败"
          })
        })
      },
    }
  }
</script>
