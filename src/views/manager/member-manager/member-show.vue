<template>
<div>
    <!-- <el-button type="primary " icon="el-icon-edit" @click="showAddMemberDialog" style="float:right"></el-button> -->
    <el-tabs v-model="type" @tab-click="handleClick" style="width:90%">
        <el-tab-pane label="成员列表" name="memberList">
            <!-- 列出所有成员与添加按钮 -->
            <!-- 像工作流那样的样式显示注册成员 -->
              <div class="application-wrapper">
                    <div class="application-home">
                    <div class="applist-container">
                        <el-row :gutter="10">
                        <el-col :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
                            <create-memember @onMememberCreate="createMemember"></create-memember>
                        </el-col>
                        <el-col v-for="member in memberList" :key="member.id" :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
                            <member-item
                            :data="member"
                            @onApply="onApply"
                            @onEditMember="editMember"
                            @onDeleteMember="deleteMmember">
                            </member-item>
                        </el-col>
                        </el-row>
                    </div>
                    </div>
                </div>
        </el-tab-pane>
    </el-tabs>

    <!-- 浮动框添加成员 -->
        <!-- <el-dialog  :visible.sync="dialogAddLog">
            <h2 style="margin-bottom:40px">创建成员</h2>
            <el-form :rules="rules" ref="form" :model="form" label-width="120px">
                <el-form-item label="用户名:" prop="loginName">
                    <el-input v-model="form.loginName" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input type="password" v-model="form.verifyCode" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="身份码:" prop="verifyCode">
                    <el-input type="password" v-model="form.verifyCode" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="用户名:" prop="loginName">
                    <el-input v-model="form.loginName" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="消息标题:" prop="title">
                    <el-input v-model="form.title" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="消息类型:" style="width:100px;" prop="selectType">
                    <el-select v-model="form.selectType" style="width:150px" placeholder="请选择消息类别">
                        <el-option label="已完成" value="DONE"></el-option>
                        <el-option label="缺陷" value="BUG"></el-option>
                        <el-option label="待完成" value="TODO"></el-option>
                        <el-option label="吐槽" value="QLH_MEMBER_SAY"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="ps">
                    <el-input  v-model="form.ps"></el-input>
                </el-form-item>
                <el-form-item label="消息内容" prop="logValue">
                    <el-input type="textarea" v-model="form.logValue"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                    <el-button @click="cancelAdd">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog> -->

</div>
</template>
<script>
import CreateMemember from './create-member/create-member.vue'
import services from '@/api/file.services'
export default {
    //显示所有人的会员——右上角有添加会员的按钮————这里得控制只有我才能添加
    name: 'qlh-member-show',
    data() {
        return {
            projectType:'QLH',
            type: 'memberList',
            memberList: []
        }
    },
    components:{
        CreateMemember
    },
    methods: {
        handleClick() {
            this.getAllUsers()
        },
        // showAddMemberDialog() {
            
        // },
        createMemember() {
            //跳转到注册页面（注册的先写成组件好了，之后再转回来）
        },
        getAllUsers() {
            //加载青龙会成员数据
            const url = '' + services.getServiceIp()+"/api/users"+"?projectType="+this.projectType
            // const url = '' + services.getServiceIp()+'/api/users'  + '?projectType='+ this.projectType 
            this.$http.get(url,{}).then(function(res){
                if(res.data.returnCode.startsWith('200')){
                    this.$message({
                        type:'success',
                        message:'成员加载成功'
                    })
                    //赋值
                }else{
                    this.$message({
                        type:'error',
                        message:'成员加载失败~都在夏夜的房间里没出来呢'
                    })
                }
            })
        }
    },
    mounted() {
        this.getAllUsers()

    }
}
</script>

<style scoped lang="scss">
  @import './member-show.scss';
</style>