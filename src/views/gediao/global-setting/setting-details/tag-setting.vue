<template>
<div>
    <div style="margin-top:10px">
        <!-- 有标签的列表和添加标签的管理 -->
        <el-button style="float:right" @click="showAddTag">添加标签</el-button>
    </div>
    <div style="padding-top:10px">
        <el-table
                :data="tableDate"
                 border
                style="width: 98%;margin-top:40px;text-align:center"
                >
                <el-table-column
                    prop="updatedDate"
                    sortable
                    label="日期"
                    :formatter="formatter"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="name"
                    label="标签名称">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="标签类别">
                </el-table-column>
                <el-table-column
                    prop="group"
                    label="标签分组">
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button
                            disabled="true"
                            @click.native.prevent="showUpdateTagDialog(scope.row)"
                            type="text"
                            size="small">
                            更新消息
                        </el-button>
                        <el-button
                            @click.native.prevent="deleteRow(scope.row)"
                            type="text"
                            size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
        </el-table>
    </div>
    <!-- 添加便签：所属日期（日期选择，不选则默认今天），标题，状态（可选，默认为未完成），类型 -->
    <el-dialog  :visible.sync="addEach">
            <h2 style="margin-bottom:40px">创建标签</h2>
            <el-form :rules="eachRules" ref="formTag" :model="formTag" label-width="120px">
                <el-form-item label="消息名称:" prop="name">
                    <el-input v-model="formTag.name" :maxlength="50" style="width:200px;float:left" :placeholder="'最多50个字符'"></el-input>
                </el-form-item>
                <el-form-item label="消息类别:" prop="type">
                    <el-input v-model="formTag.type" :maxlength="50" style="width:200px;float:left" :placeholder="'最多50个字符'"></el-input>
                </el-form-item>
                <el-form-item label="消息组:" prop="group">
                    <el-input v-model="formTag.group" :maxlength="50" style="width:200px;float:left" :placeholder="'最多50个字符'"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onCreateTag()">立即创建</el-button>
                    <el-button @click="cancelAddTag">取消</el-button>
                </el-form-item>
            </el-form>
    </el-dialog>
</div>
</template>
<script>
import services from '@/api/file.services'
export default {
    name: 'tag-setting',
    data() {
        return {
            addEach: false,
            tableDate: [],
            formTag: {
                name: '',
                type: '',
                group:''
            },
            eachRules: {
                name: [
                    { required: true, message: '请输入标签名字', trigger: 'blur' },
                ],
            },
        }
    },
    methods:{
        getAllTags() {
            // 创建Tag
            const token  = services.getToken()
            const userId = services.getUserId()
            if(token&&userId) {
                const url = '' + services.getServiceIp()+"/api/app/log/tags"+"?token="+token+"&userId="+userId
                this.$http.get(url,{}).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                        this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                        // 赋值
                        this.tableDate.pop()
                        this.tableDate = []
                        for(var i = 0;i<res.data.data.length;i++) {
                            this.tableDate.push(res.data.data[i])
                            
                        }
                    }else{
                        this.$message({
                            type:"error",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                    }
                })
            }else {
                // 登录失效，转到登录页面
                this.$router.history.push('/gediao')
            }
        },
        onCreateTag(){
            // 创建Tag
            const token = services.getToken()
            
            if(token) {
                const body = {
                    name: this.formTag.name,
                    group: this.formTag.group,
                    token: token,
                    type: this.formTag.type
                }
                const url = '' + services.getServiceIp()+"/api/app/log/tag"
                this.$http.put(url,body).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                        this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                        this.formTag.name = "" 
                        this.getAllTags()
                    }else{
                        this.$message({
                            type:"error",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                    }
                })
                this.addEach = false
            }else {
                // 登录失效，转到登录页面
                this.$router.history.push('/gediao')
            }
        },
        cancelAddTag() {
            this.addEach = false
        },
        showAddTag() {
            this.addEach = true
        },
        formatter(row, column) {
            // new Date('' + row.updatedDate)
            return (row.updatedDate + '').substring(0,10)
            // return service.changeToBJTime(row.updatedDate);//.substring(0,10);
        },
        showUpdateTagDialog() {

        },
        deleteRow(row) {
            const token  = services.getToken()
            const userId = services.getUserId()
            if(token&&userId&&row.id) {
                const url = '' + services.getServiceIp()+"/api/app/log/tag/"+row.id+"?token="+token+"&userId="+userId
                this.$http.delete(url,{}).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                        this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                        // 赋值
                        //刷新
                        this.tableDate = []
                        this.getAllTags()
                    }else{
                        this.$message({
                            type:"error",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                    }
                })
            }else {
                // 登录失效，转到登录页面
                this.$router.history.push('/gediao')
            }
            this.addEach = false
        }
    },
    mounted() {
        this.getAllTags();
    },
    
}
</script>
<style>

</style>
