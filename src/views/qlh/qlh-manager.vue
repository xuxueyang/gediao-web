<template>
<el-container>
    <el-main>
<div class="main">
    <div v-if="hasLogin">
            <!-- 显示数据 -->
        <div>
            <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item index="1">炼狱房与修罗场次数关系规则</el-menu-item>
                <el-menu-item index="2">管理成员</el-menu-item>

            </el-menu>
        </div>
        <div>
            <!-- 根据类型进入不同的配置 -->
            <div v-if="activeIndex2=='1'">
                <lyf-xlc-rule></lyf-xlc-rule>
            </div>
            <div v-if="activeIndex2=='2'">
                <qlh-member-manager></qlh-member-manager>
            </div>
        </div>
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
                v-bind:project-type="projectType"
                v-on:loginSuccessCallback="loginSuccessCallback"
                v-on:toRegCallback="toRegCallback"
            >
            </login>
        </div>
    </div>  
</div>
    </el-main>
</el-container>
</template>
<script>
import services from "@/api/file.services.js";
import lyfXlcRule from './manager-setting/lyf-xlc-rule.vue'
import qlhMemberManager from './manager-setting/qlh-manager-member.vue'

import regestry from '@/components/reg/index.vue'
import login from '@/components/login/index.vue'

export default {
    components:{
        lyfXlcRule,
        login,
        regestry,
        qlhMemberManager
    },
    data(){
        return{
            projectType:'QLH',
            hasLogin:false,
            index: 'login',
            activeIndex2:'1'
        }
    },
    methods:{
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
            this.activeIndex2 = key
        },
        regSuccessCallback(){
            //转到登陆
            this.hasLogin=false;
            this.index='login'
        },
        canelRegCallback(){
            this.index='login'
        },
        loginSuccessCallback(){
            this.hasLogin=true;
            this.index='hasLogin'
        },
        toRegCallback(){
            this.index='reg'
        }
    },
    mounted() {
        //鉴别有没有登陆
        const token = services.getToken()
        if(token==undefined||token==''){
            //说明没有登陆
            this.hasLogin = false
            this.index='login'
        }else{
            //获取userinfo消息
            const userInfo = services.getUserInfo()
            if(userInfo==undefined){
                this.hasLogin = false
                this.index='login'
            }else{
                try{
                    var tmp = JSON.parse(userInfo)
                    this.hasLogin = true
                    this.index='hasLogin'
                }catch(exp) {
                    this.hasLogin = false
                    this.index='login'
                }
            }
        }
    },

}
</script>
<style>
main{
    width: 80%;
    height: 100%;
}
</style>
