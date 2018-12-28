<template>
    <!-- 显示进入detail面板 -->
    <div>
        <div v-if="eachId&&detailId">
            <!-- 从路由获取到each和detailId -->
            <!-- <full-textarea v-bind:eachId="eachId" v-bind:detailId="detailId" :key='Math.random()'></full-textarea> -->
            <vue-quill-editor v-bind:eachId="eachId" v-bind:templateUri="template"  v-bind:sourceId="detailId" ></vue-quill-editor>
        </div>
        <div v-else>
            <!-- 显示不存在 -->
            <div>=。=请别通过非法路径进去啊~~~手动.数据不存在.jpg</div>
        </div>

    </div>
</template>
<script>
import services from '@/api/file.services'
// import fullTextarea from '@/components/full-textarea/full-textarea.vue';
import vueQuillEditor from '@/components/vue-quill-editor/vue-quill-editor.vue';

export default {
    components:{
        // fullTextarea,
        vueQuillEditor
    },
    mounted(){
        // 查询路由参数，如果
        this.init()
    },
    data() {
        return {
            template: '/log/detail',
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
                    // 这里应该取一下，看each下有没有detail的。如果没有，再创建。
                    this.createDetail()
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
