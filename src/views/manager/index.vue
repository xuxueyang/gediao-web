<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-openeds="[0]" theme="light">
                    <el-submenu index = "0">
                        <template slot="title"><i class="el-icon-document"></i>文件上传</template>
                        <el-menu-item index="0-1" class="menu-item" @click="setIndex('0_1') " >显示全部文件</el-menu-item>
                    </el-submenu>
                    <el-submenu index = "1" >
                        <template slot="title"><i class="el-icon-document" ></i>青龙会开发</template>
                        <el-menu-item index="1-1" class="menu-item" @click="setIndex('1_1')" >开发日志</el-menu-item>
                    </el-submenu>
                    <el-submenu index = "3">
                        <template slot="title"><i class="el-icon-document"></i>UE4开发</template>
                        <el-menu-item index="3-1" class="menu-item" @click="setIndex('3_1')" >开发日志</el-menu-item>
                    </el-submenu>
                    <el-submenu index = "2">
                        <template slot="title"><i class="el-icon-document"></i>青龙会管理</template>
                        <el-menu-item index="2-1" class="menu-item" @click="setIndex('2_1')" >会员添加</el-menu-item>
                        <el-menu-item index="2-2" class="menu-item" @click="setIndex('2_2')" >青龙会公告</el-menu-item>
                        <!-- 这里可以申请比如打105之类的 -->
                        <el-menu-item index="2-3" class="menu-item" @click="setIndex('2_3')" >资源申请</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <div v-if="index=='0_1'">
                    <qlh-file-manager></qlh-file-manager>
                </div>   
                <div v-if="index=='1_1'">
                    <!-- 显示青龙会开发日志 -->
                    <qlh-develop-log projectType="QLH" :key='Math.random()'></qlh-develop-log>
                </div>      
                <div v-if="index=='3_1'">
                    <!-- 显示UE4开发日志 -->
                    <qlh-develop-log projectType="UE4_XY" :key='Math.random()'></qlh-develop-log>
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
            this.index = index;
            console.log(this.index)
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
