<template>
<div>
    <el-button type="primary " icon="el-icon-edit" @click="showAddMemberDialog" style="float:right"></el-button>
    <el-tabs v-model="type" @tab-click="handleClick" style="width:90%">
        <el-tab-pane label="成员列表" name="memberList">
            <h3 style="color:#624D96">成员列表</h3>
            <!-- 列出所有成员与添加按钮 -->
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
export default {
    //显示所有人的会员——右上角有添加会员的按钮————这里得控制只有我才能添加
    name: 'qlh-member-show',
    data() {
        return {
            type: 'memberList'
        }
    },
    methods: {
        handleClick() {

        },
        showAddMemberDialog() {
            
        }
    },
    mounted() {
        //加载成员数据
    }
}
</script>
