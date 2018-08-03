<template>
    <div>
        <div>
            <vue-ueditor-wrap  v-model="msg" :config="myConfig"></vue-ueditor-wrap>
        </div>
       <div>
           <el-button @click="saveMsg()">点击更新</el-button>
       </div>

    </div>
</template>

<script>
import services from '@/api/file.services'
import VueUeditorWrap from 'vue-ueditor-wrap'
export default {
    name: 'fullTextarea',
    props:["eachId","detailId"],
    components: {
        VueUeditorWrap
    },
    data () {
        return {
            myConfig: {
                // 如果需要上传功能,找后端小伙伴要服务器接口地址
                // serverUrl: 'http://api.demo.com/ueditor/upload',
                // 你的UEditor资源存放的路径,相对于打包后的index.html
                UEDITOR_HOME_URL: './static/UEditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 240,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 关闭自动保存
                enableAutoSave: false
            },
            msg: '欢迎使用格调~~~'
        }
    },
    mounted(){
        //判断detail是不是为空，是的话，需要创建
        if(this.detailId==null||this.detailId==undefined){
            this.createDetail()
        }else{
            // 加载的时候加载msg
            this.getMsg()
        }
    },
    methods: {
        createDetail(){
            const url = services.getServiceIp()+"/api/app/log/detail"
            const body = {
                logEachId: this.eachId,
                remarks: ''
            } 
            this.$http.put(url,body).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                            this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })

                        this.detailId = row.id
                        this.msg = row.remarks
                    }else{
                        this.$message({
                            type:"error",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                    }                
            }).catch(function(res){
                    this.$message({
                    type:"error",
                    showClose:true,
                    message:"服务器正在抢修中~创建详情失败"
                    })
            })
        },
        saveMsg(){
            //发送API请求保存数据
            const url = services.getServiceIp()+"/api/app/log/detail"
            const body = {
                detailId: this.detailId,
                remarks: this.msg,
                token: services.getToken()
            } 
            this.$http.post(url,body).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                            this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                    }else{
                        this.$message({
                            type:"error",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                    }                
            }).catch(function(res){
                    this.$message({
                    type:"error",
                    showClose:true,
                    message:"服务器正在抢修中~创建详情失败"
                    })
            })
        },
        getMsg(){
            const url = services.getServiceIp()+"/api/app/log/detail"+"/"+this.detailId
            this.$http.get(url,{}).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                            this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                        this.msg = row.remarks
                    }else{
                        this.$message({
                            type:"error",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                    }                
            }).catch(function(res){
                    this.$message({
                    type:"error",
                    showClose:true,
                    message:"服务器正在抢修中~创建详情失败"
                    })
            })
        }
    }
}
</script>
