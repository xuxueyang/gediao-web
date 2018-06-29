<template>
<div>
    <div v-if="!hasLogin">
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
    <div v-if="hasLogin">
        <el-container>
            <el-aside width="200px" class="font-aside">
                <el-menu default-active="0"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-menu-item index="0"  @click="setIndex('0')">
                        <i class="el-icon-menu"></i>
                        <span slot="title">今日进展</span>
                    </el-menu-item>
                    <el-menu-item index="1" @click="setIndex('1')">
                        <i class="el-icon-document"></i>
                        <span slot="title">便签添加</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="setIndex('2')" >
                        <i class="el-icon-document"></i>
                        <span slot="title">日志</span>
                    </el-menu-item>          
                    <el-menu-item index="3"  @click="setIndex('3')">
                        <i class="el-icon-document"></i>
                        <span slot="title">资源积累</span>
                    </el-menu-item>  
                    <el-menu-item index="4"  @click="setIndex('4')">
                        <i class="el-icon-document"></i>
                        <span slot="title">垃圾箱</span>
                    </el-menu-item> 
                    <el-menu-item index="5"  @click="logout()">
                        <i class="el-icon-document"></i>
                        <span slot="title">退出登陆</span>
                    </el-menu-item>                                                                                          
                </el-menu>
            </el-aside>
            <el-main class="font-main">
                <div v-if="index=='0'">
                   
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
            </el-main>
        </el-container>
    </div>
</div>
</template>

<script>
import merge from 'webpack-merge';
import showLogEach from './log-each-manager/show-log-each.vue'
import regestry from '@/components/reg/index.vue'
import login from '@/components/login/index.vue'

export default {
    name: 'gediao',
    components:{
        showLogEach,
        regestry,
        login
    },
    data() {
        return {
            hasLogin: false,
            index: 'login',
            projectType: 'GEDIAO'
        }
    },
    methods: {
        setIndex(index) {
            //TODO 添加到路由上
            // this.$router.push(this.$router.currentRoute.path,{params:{ index :  index}})
            // this.$route.params.index = index;
            // this.index = this.$router.params.index;
            if(this.$route.params.index==undefined){
                this.$router.push({  
                    query:merge(this.$route.query,{'index':index})  
                }) 
            }else if(index!=this.index){
                this.$router.push({  
                    query:merge(this.$route.query,{'index':index})  
                })  
                this.index = index
            }
        },
        regSuccessCallback() {
            //注册成功，转到登陆界面
            // this.setIndex('login')
            this.hasLogin = false
            this.index = 'login'
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
             this.setIndex('1')
             this.hasLogin = true
            // location.reload()
        },
        toRegCallback(){
            //前往登陆
            // this.setIndex('reg')
            this.index = 'reg'
            this.hasLogin = false
            // this.index = reg
        },
        logout() {
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("userinfo")
            // this.setIndex('login')
            this.index = 'login'
            this.hasLogin  = false
        }
    },    
    mounted() {
        //鉴别有没有登陆
        const token = window.localStorage.getItem("token")
        // console.log("token:"+token)
        if(token==undefined||token==''){
            //说明没有登陆
            this.hasLogin = false
            // this.setIndex('login')
            this.index = 'login'
        }else{
            //获取userinfo消息
            const userInfo = window.localStorage.getItem("userinfo")
            // console.log("usrinfo:"+userInfo)
            if(userInfo==undefined){
                this.hasLogin = false
                // this.setIndex('login')
                this.index = 'login'
            }else{
                try{
                    var tmp = JSON.parse(userInfo)
                    this.hasLogin = true
                    this.setIndex('1')
                }catch(exp) {
                    this.hasLogin = false
                    console.log(exp)
                    // this.setIndex('login')
                    this.index = 'login'
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
