<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-openeds="[0]" theme="light">
                    <el-submenu index = "0">
                        <template slot="title"><i class="el-icon-document"></i>文件上传</template>
                        <el-menu-item index="0-1" class="menu-item" @click="setIndex('0_1') " >显示全部文件</el-menu-item>
                    </el-submenu>
                    <el-submenu index = "1">
                        <template slot="title"><i class="el-icon-document"></i>开发管理</template>
                        <el-menu-item index="1-1" class="menu-item" @click="setIndex('1_1')" >开发日志</el-menu-item>
                    </el-submenu>
                    <el-submenu index = "2">
                        <template slot="title"><i class="el-icon-document"></i>青龙会会员</template>
                        <el-menu-item index="2-1" class="menu-item" @click="setIndex('2_1')" >会员添加</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <div v-if="index=='0_1'">
                    <qlh-file-manager></qlh-file-manager>
                </div>   
                <div v-if="index=='1_1'">
                    <!-- 显示开发日志 -->
                    <qlh-develop-log></qlh-develop-log>
                </div>       
                <div v-if="index=='2_1'">
                    <!-- 显示开发日志 -->
                    <qlh-member-show></qlh-member-show>
                </div>               
            </el-main>
        </el-container>
    </div>
</template>

<script>
import qlhFileManager from './../upload/index.vue'
import qlhMemberShow from './member-manager/member-show.vue'
import qlhDevelopLog from './develop-log/index.vue'
export default {
    data() {
        return {
            index: '1_1'
        }
    },
    components: {
        qlhFileManager,
        qlhDevelopLog,
        qlhMemberShow
    },
    methods: {
        
        setIndex(index) {
            //TODO 添加到路由上
            this.index = index;
        }
    },
    mounted() {
        //读取赋值路由属性
        // console.log(this.$router)
        // this.$router.push(this.$router.currentRoute.path,{params:{ index=this.index}})
    },
}
</script>


<style scope>
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
        background-color: #B3C0D1;
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
