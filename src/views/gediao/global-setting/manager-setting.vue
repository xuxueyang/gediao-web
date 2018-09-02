<template>
<div style="margin-top:-20px;">
    <div>
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">便签管理</el-menu-item>
            <el-menu-item index="4" disabled>状态管理</el-menu-item>

            <el-submenu index="2" disabled>
                <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
            </el-submenu>
            <el-menu-item index="3" disabled>消息中心</el-menu-item>
        </el-menu>
    </div>
    <div>
        <!-- 根据类型进入不同的配置 -->
        <div v-if="activeIndex2=='1'">
            <tag-setting></tag-setting>
        </div>
        <!-- <div v-if="activeIndex=='4'">
            <status-setting></status-setting>
        </div> -->
    </div>
</div>
</template>
<script>
import tagSetting from './setting-details/tag-setting.vue'
import statusSetting from './setting-details/status-setting.vue'

export default {
    name: 'manager-setting',
    props:["projectType"],
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    components:{
        tagSetting,
        statusSetting
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.activeIndex2 = key
      }
    }
}
</script>
