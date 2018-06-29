<template>
    <div>
        <el-container>
            <el-aside width="200px" class="font-aside">
                <el-menu  
                    default-active="2" 
                    theme="light" 
                    active-text-color="#ffd04b"
                    background-color="#545c64" text-color="#eee">
                    <el-submenu index = "0">
                        <template slot="title"><i class="el-icon-document"></i>文件上传</template>
                        <el-menu-item index="0_1" class="menu-item" @click="setIndex('0_1') " >显示全部文件</el-menu-item>
                    </el-submenu>
                    <el-submenu index = "1" >
                        <template slot="title"><i class="el-icon-document" ></i>开发日志</template>
                        <el-menu-item index="1_1" class="menu-item" @click="setIndex('1_1')" >青龙会网站</el-menu-item>
                        <el-menu-item index="1_2" class="menu-item" @click="setIndex('1_2')" >UE4</el-menu-item>
                        <el-menu-item index="1_3" class="menu-item" @click="setIndex('1_3')" >公司</el-menu-item>
                    </el-submenu>
                    <el-submenu index = "2">
                        <template slot="title"><i class="el-icon-document"></i>青龙会管理</template>
                        <el-menu-item index="2_1" class="menu-item" @click="setIndex('2_1')" >会员添加</el-menu-item>
                        <el-menu-item index="2_2" class="menu-item" @click="setIndex('2_2')" >青龙会公告</el-menu-item>
                        <!-- 这里可以申请比如打105之类的 -->
                        <el-menu-item index="2_3" class="menu-item" @click="setIndex('2_3')" >资源申请</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="font-main">
                <div v-if="index=='0_1'">
                    <qlh-file-manager></qlh-file-manager>
                </div>   
                <div v-if="index=='1_1'">
                    <!-- 显示青龙会开发日志 -->
                    <qlh-develop-log projectType="QLH" :key='Math.random()'></qlh-develop-log>
                </div>      
                <div v-if="index=='1_2'">
                    <!-- 显示UE4开发日志 -->
                    <qlh-develop-log projectType="UE4_XY" :key='Math.random()'></qlh-develop-log>
                </div> 
                <div v-if="index=='1_3'">
                    <!-- 显示UE4开发日志 -->
                    <qlh-develop-log projectType="FYKJ" :key='Math.random()'></qlh-develop-log>
                </div>                       
                <div v-if="index=='2_1'">
                    <!-- 显示开发日志 -->
                    <qlh-member-show></qlh-member-show>
                </div>           
                <div v-if="index=='2_2'">
                    <qlh-announcement></qlh-announcement>
                </div>       
                <div v-if="index=='2_3'">
                    <qlh-resource-apply></qlh-resource-apply>
                </div>    
            </el-main>
        </el-container>
    </div>
</template>

<script>
import qlhFileManager from './../upload/index.vue'
import qlhMemberShow from './member-manager/member-show.vue'
import qlhDevelopLog from './develop-log/index.vue'
import qlhAnnouncement from './qlh-announcement/qlh-announcement.vue'
import qlhResourceApply from './qlh-resource-apply/qlh-resource-apply.vue'
import merge from 'webpack-merge';
export default {
    data() {
        return {
            index: '2_3'
        }
    },
    components: {
        qlhFileManager,
        qlhDevelopLog,
        qlhMemberShow,
        qlhAnnouncement,
        qlhResourceApply
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
            }else {
                this.$router.push({  
                    query:merge(this.$route.query,{'index':index})  
                })  
            }
            this.index = index
            // console.log(this.index)
        }
    },
    mounted() {
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
         /* font-family:'STXingkai' */
        font-family:'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'
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
