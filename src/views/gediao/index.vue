<template>
<div>
   <div v-if="hasLogin">
         <el-container>
            <div class="leftDiv">
                <ul class="GDul">
                    <li>
                        <div  @click="setIndex('0')">
                            <i class="el-icon-menu" style="float:left;padding-top:10px;padding-left:15px;"></i>
                            <a>今日进展</a>
                        </div>
                    </li>
                    <li>
                        <div @click="setIndex('1')">
                            <i class="el-icon-document" style="float:left;padding-top:10px;padding-left:15px;"></i>
                            <a>便签添加</a>
                        </div>
                    </li>
                    <li>
                        <div @click="setIndex('6')">
                            <i class="el-icon-menu" style="float:left;padding-top:10px;padding-left:15px;"></i>
                            <a>全局配置</a>
                        </div>
                    </li>
                    <!--<li>-->
                        <!--<div @click="setIndex('7')">-->
                            <!--<i class="el-icon-menu" style="float:left;padding-top:10px;padding-left:15px;"></i>-->
                            <!--<a>PDF资源</a>-->
                        <!--</div>-->
                    <!--</li>-->
                     <li>
                        <div @click="setIndex('9')">
                            <i class="el-icon-menu" style="float:left;padding-top:10px;padding-left:15px;"></i>
                            <a>在线聊天室</a>
                        </div>
                    </li>
                    <li>
                        <div @click="setIndex('8')">
                            <i class="el-icon-menu" style="float:left;padding-top:10px;padding-left:15px;"></i>
                            <a>博客管理</a>
                        </div>
                    </li>
                    <li>
                        <div @click="logout()">
                            <i class="el-icon-document" style="float:left;padding-top:10px;padding-left:15px;"></i>
                            <a >退出登陆</a>
                        </div>
                    </li>
                </ul>
            </div>
            <el-main class="font-main">
                <div v-if="index=='0'">
                   <echarts-data></echarts-data>
                </div>
                <div v-if="index=='1'">
                     <show-log-each v-bind:projectType="projectType"></show-log-each>
                </div>
                <div v-if="index=='2'">

                </div>
                <div v-if="index=='3'">

                </div>
                <div v-if="index=='4'">

                </div>
                <div v-if="index=='6'">
                    <!-- 全局配置，设置tag什么的 -->
                    <!-- 因为是全局配置，所以是选项卡的形式 -->
                    <manager-setting v-bind:projectType="projectType"></manager-setting>
                </div>
                <div v-if="index=='7'">
                    <pdf-read></pdf-read>
                </div>
                <div v-if="index=='8'" >
                    <blog-manager></blog-manager>
                </div>
                <div v-if="index=='9'">
                    <!-- https://blog.csdn.net/niyuelin1990/article/details/78062139 -->
                     <online-chat></online-chat>
                </div>
            </el-main>
        </el-container>
    </div>
    <div v-else>  
        <!-- 转到登陆的组件中 -->
         <div v-if="index=='reg'">
            <regestry
                v-bind:projectType="projectType"
                v-on:regSuccessCallback="regSuccessCallback"
                v-on:canelRegCallback="canelRegCallback"
            ></regestry>
        </div>
        <div v-if="index=='login'">
            <login
                project-type="projectType"
                v-on:loginSuccessCallback="loginSuccessCallback"
                v-on:toRegCallback="toRegCallback"
            >
            </login>

        </div>
    </div>
</div> 
</template>

<script>
import merge from 'webpack-merge';
import services from "@/api/file.services.js";
import showLogEach from './log-each-manager/show-log-each.vue'
import regestry from '@/components/reg/index.vue'
import login from '@/components/login/index.vue'
import managerSetting from './global-setting/manager-setting.vue'
import echartsData from './static-data/echarts-data.vue'
// import pdfRead from './pdf-read/select-pdf-read.vue'
import blogManager from './blog-manager/index.vue'
import onlineChat from './online-chat/index.vue'
export default {
    name: 'gediao',
    components:{
        showLogEach,
        regestry,
        login,
        managerSetting,
        echartsData,
        // pdfRead,
        blogManager,
        onlineChat
    },
    data() {
        return {
            hasLogin: false,
            index: 'login',
            projectType: 'GEDIAO',
            defaultIndex: '9'
        }
    },
    methods: {
        setIndex(index) {
            //TODO 添加到路由上
            // this.$router.push(this.$router.currentRoute.path,{params:{ index :  index}})
            this.$router.push({
                query:merge(this.$route.query,{'index':index})
            })

            this.index = index
        },
        regSuccessCallback() {
            //注册成功，转到登陆界面
            // this.setIndex('login')
            this.hasLogin = false
            setIndex('login')
        },
        canelRegCallback() {
            //取消注册的回调
            // this.setIndex('login')
            this.hasLogin = false
            this.index = 'login'
        },
        loginSuccessCallback(){
            //登陆成功
            //刷新即可
            //  this.setIndex('1')
            // this.$router.push({
            //     query:merge(this.$route.query,{'index':'1'})
            // })

             this.hasLogin = true
             this.setIndex(this.defaultIndex)
            // location.reload()
        },
        toRegCallback(){
            //前往登陆
            this.setIndex('reg')
            // this.index = 'reg'
            this.hasLogin = false
            // this.index = reg
        },
        logout() {
            services.logout()
            this.setIndex('login')
            // this.index = 'login'
            this.hasLogin  = false
        }
    },

    mounted() {
        //鉴别有没有登陆
        const token = services.getToken()
        // console.log("token:"+token)
        if(token==undefined||token==''){
            //说明没有登陆
            this.hasLogin = false
            this.setIndex('login')
            // this.index = 'login'
        }else{
            //获取userinfo消息
            const userInfo = services.getUserInfo()
            // console.log("usrinfo:"+userInfo)
            if(userInfo==undefined){
                this.hasLogin = false
                this.setIndex('login')
                // this.index = 'login'
            }else{
                try{
                    var tmp = JSON.parse(userInfo)
                    this.hasLogin = true
                        // if(this.$route.params.index==undefined){
                        //     this.$router.push({
                        //         query:merge(this.$route.query,{'index':'1'})
                        //     })
                        // }else{
                        //     this.$router.push({
                        //         query:merge(this.$route.query,{'index':'1'})
                        //     })
                        // }
                    this.index = this.defaultIndex
                }catch(exp) {
                    this.hasLogin = false
                    console.log(exp)
                    this.setIndex('login')
                    // this.index = 'login'
                }
            }
        }
        //读取赋值路由属性
        // console.log(this.$router)
        // this.$router.push(this.$router.currentRoute.path,{params:{ index=this.index}})
        //取参数，如果非空设置为默认的，如果不为空则设置为
        // console.log('index:'+ this.$route.params.index)
        // if(this.$router.params.index) {
        //     this.index = this.$router.params.index
        // }
        // https://blog.csdn.net/sllailcp/article/details/80312848

        if(this.$route.query.index==undefined){
            this.$router.push({
                query:merge(this.$route.query,{'index':this.index})
            })
        }else{
            this.index = this.$route.query.index
        }
        // console.log('1this.$route.query.index：'+this.$route.query.index)
        //             this.$router.push({
        //         query:merge({},{'index':1})
        //     })
        //     console.log('2this.$route.query.index：'+this.$route.query.index)
        //     this.$route.query.index = 1
        //     console.log('3this.$route.query.index：'+this.$route)


            // this.$router.history.push(this.$route.path+])
    },
}
</script>

<style scope>
    .font-aside{
         font-family:'STXingkai'
        /* font-family:'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif' */
    }
    .font-main{
        font-family:'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'
    }
    input[type="file"] {
        display: none;
    }
    .el-upload-list{
        width: 130px;
    }
    .el-select {
        width: 90px;
    }
    .el-aside {
        background-color: #313b46;
        color: #333;
        text-align: center;
        line-height: 200px;
        min-height: 750px;
    }
    /* .menu-item{
        font-size: 5px;
        margin-left: 5px;
    } */
</style>
<style>
.GDul {
    list-style-type: none;
    margin-right: 10px;
    padding: 0;
    width: 200px;
    height: 100%;
    background-color: #444;
    font-family:'STXingkai';
    line-height: 25px;
    box-shadow: 10px 10px 5px #888888;
    /* z-index: 10; */
}

.GDul li{
    color: #fff;
}
.GDul li+li{
    margin-top: 5px ;
}
.GDul li a {
    display: block;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
}

.GDul li a.active {
    background-color: #4CAF50;
    color: white;
}

.GDul li a:hover:not(.active) {
    background-color: #666;
    color: white;
}
</style>
<style>
leftDiv{
    float: left;
    width:15%;
    height: 100%;
    background-color: #333;
    line-height: 200px;
    min-height: 750px;
    /* color:#fff; */
    /* active-text-color:#ffd04b; */
}
</style>
