<template>
    <!-- 显示进入detail面板 -->
    <div>
        <div v-if="blogId">
            <!-- 从路由获取到each和detailId -->
            <!-- <full-textarea v-bind:eachId="eachId" v-bind:detailId="detailId" :key='Math.random()'></full-textarea> -->
            <vue-quill-editor  v-bind:templateUri="template"  v-bind:sourceId="blogId" v-bind:created="created"></vue-quill-editor>
        </div>
        <div v-else>
            <!-- 显示不存在 -->
            <div>=。=请别通过非法路径进去啊~~~手动.数据不存在.jpg</div>
        </div>

    </div>
</template>
<script>
import services from '@/api/file.services'
import vueQuillEditor from '@/components/vue-quill-editor-blog/vue-quill-editor.vue';

export default {
    components:{
        vueQuillEditor
    },
    mounted(){
        // 查询路由参数，如果
        this.init()
    },
    data() {
        return {
            template: '/blog/blog',
            blogId: '',
          created: false
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
            this.blogId = this.$route.query.blogId
            if(this.$route.query.blogId==null||this.$route.query.blogId==undefined){
                // 这里应该取一下，看each下有没有detail的。如果没有，再创建。
                this.createBlog()
            }
        },
        createBlog(){
            const url = services.getServiceIp()+"/api/app"+this.template
                // private String title;
                // private String content;
                // private String token;
                // private String sourceType;

                // private List<String>  tagIds;

                // private String permissionType;
                // private String permissionVerify;
                // 创建默认的模板博客
            const body = {
                title: '这是博客的标题~',
                content: '<h2>这是博客的内容</h2>',
                sourceType: 'Owner',
                tagIds: [],
                permissionType: 'OnlyOne', // 默认只有自己可见
                permissionVerify: '',
                token: services.getToken()
            }
            this.$http.put(url,body).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                            this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                        this.blogId = res.data.data.id
                      this.created = true
                        this.$router.push({
                            path : '/gediao/blog',
                            query: {
                                'blogId': this.blogId,
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
