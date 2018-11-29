<template>
    <div >
        <div>
           <el-button @click="returnGediao()">返回格调</el-button>
           <el-button @click="saveMsg()">点击更新</el-button>
       </div>
        <div>
            <vue-ueditor-wrap  v-model="msg" :config="myConfig" @ready="initMsg"></vue-ueditor-wrap>
        </div>

    </div>
</template>

<script>


import services from '@/api/file.services'
// <link href="./resources/css/textareafullscreen.css" rel="stylesheet" type="text/css" />
// import 'quill/dist/quill.bubble.css'
import VueUeditorWrap from 'vue-ueditor-wrap'
// import '/static/UEditor/themes/default/css/ueditor.min.css'
export default {
    name: 'fullTextarea',
    props:["detailId"],
    components: {
        VueUeditorWrap
    },

    data () {
        return {
            myConfig: {
                // 如果需要上传功能,找后端小伙伴要服务器接口地址
                serverUrl: ''+services.getServiceIp()+'/api/uaafile/upload',
                // 你的UEditor资源存放的路径,相对于打包后的index.html
                UEDITOR_HOME_URL: './static/UEditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 600,
                // 初始容器宽度
                initialFrameWidth: '100%',
                // 关闭自动保存
                enableAutoSave: false
            },
            msg: '欢迎使用格调~正在加载中~请稍后~'
            // msg: '<p>（请不要刷新这个页面，目前刷新会导致数据加载出现问题)</p><p>我会尽快解决这个bug，谢谢</p><p>如果不慎刷新了，请重新进去哈</p><p>如果不慎更新了文本，请记得点一下保存哟</p>',
            // _index:'0'
        }
    },
    mounted(){
        //判断detail是不是为空，是的话，需要创建
        if(this.detailId==null||this.detailId==undefined){
            // this.createDetail()
            // 回调显示不存在的提示
            // 跳转到detail页面
            this.$router.push({
                path : '/gediao',
            })
        }else{
            // 加载的时候加载msg
            // this.getMsg()
        }
    },
    methods: {
        initMsg(){
            //添加监听器，等初始化完毕后，设置msg
            this.getMsg()
        },
        // 写个定时任务，定期保存？
        returnGediao(){
            this.$router.push({
                path : '/gediao',
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
                    message:"服务器正在抢修中~保存详情失败"
                    })
                    this.returnGediao()
            })
        },
        getMsg(){
            const url = services.getServiceIp()+"/api/app/log/detail"+"/"+this.detailId +"?token="+services.getToken()
            this.$http.get(url,{}).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                            this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                        // console.log(res.data.data.remarks)
                        this.msg = res.data.data.remarks
                        // this._index = ''+Math.random()
                    }else{
                        this.$message({
                            type:"error",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                        this.returnGediao()
                    }
            }).catch(function(res){
                    this.$message({
                        type:"error",
                        showClose:true,
                        message:"获取详情失败哦"
                    })
                    this.returnGediao()
            })
        }
    }
}
</script>
