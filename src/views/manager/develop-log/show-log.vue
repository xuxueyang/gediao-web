<template>
<div>
  <el-table
    :data="tableDate"
    style="width: 95%"
    >
    <el-table-column
      prop="updatedDate"
      sortable
      label="日期"
      :formatter="formatter"
      width="180">
    </el-table-column>
    <el-table-column
        sortable
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
     <el-table-column
        label="点击查看备注"
        width="120">
        <!-- 点击查看备注 -->
        <template slot-scope="showPsScope">
            <el-tooltip class="item" effect="light" :content="showPsScope.row.ps" placement="top-end"  >
                 <el-button type="text" circle size="small" :disabled="!showPsScope.row.ps" >备注</el-button>
            </el-tooltip>
        </template>
    </el-table-column>
    <el-table-column
      prop="value"
      label="消息">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
            <!-- 对于消息吐槽类别的只能更新消息，而任务状态日志的消息可以转移||同时会更新消息 -->
             <el-button
                v-if="canTranfer"
                @click.native.prevent="showTransferDialog(scope.row)"
                type="text"
                size="small">
                转变
            </el-button>
             <el-button
                @click.native.prevent="showUpdateDialog(scope.row)"
                type="text"
                size="small">
                更新
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

    <!-- 浮动显示更新 -->
        <el-dialog  :visible.sync="dialogUpdateLog">
            <h2 style="margin-bottom:40px">更新消息</h2>
            <el-form :rules="rules" ref="oneUpdateForm" :model="oneUpdateForm" label-width="120px">
                <el-form-item label="用户名:" prop="loginName">
                    <el-input v-model="oneUpdateForm.loginName" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="身份码:" prop="verifyCode">
                    <el-input type="password" v-model="oneUpdateForm.verifyCode" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="消息标题:" prop="title">
                    <el-input v-model="oneUpdateForm.title" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="ps">
                    <el-input  v-model="oneUpdateForm.ps"></el-input>
                </el-form-item>
                <el-form-item label="消息内容" prop="logValue">
                    <el-input type="textarea" v-model="oneUpdateForm.logValue"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateMessage(oneUpdateForm)">更新</el-button>
                    <el-button @click="dialogUpdateLog=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
             <!-- 浮动显示转移消息 -->
        <el-dialog  :visible.sync="transferVisible">
            <h2 style="margin-bottom:40px">转变状态</h2>
            <el-form :rules="rules" ref="oneTranserForm" :model="oneTranserForm" label-width="120px">
                <el-form-item label="用户名:" prop="loginName">
                    <el-input v-model="oneTranserForm.loginName" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="身份码:" prop="verifyCode">
                    <el-input type="password" v-model="oneTranserForm.verifyCode" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="消息类型:" style="width:100px;" prop="selectType">
                    <el-select v-model="oneTranserForm.selectType" style="width:150px" placeholder="请选择消息类别">
                        <el-option label="已完成" value="DONE"></el-option>
                        <el-option label="缺陷" value="BUG"></el-option>
                        <el-option label="待完成" value="TODO"></el-option>
                        <el-option label="吐槽" value="MEMBER_SAY"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="ps">
                    <el-input  v-model="oneTranserForm.ps"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="tranferMessage(oneTranserForm)">修改状态</el-button>
                    <el-button @click="transferVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
</div>
</template>

<script>
import service from '@/api/file.services'
export default {
    name: 'show-log',
    props:["projectType", "type", "tableDate","canTranfer"],
    data() {
        return {
            dialogUpdateLog: false,
            transferVisible: false,
            oneTranserForm: {
                id: '',
                verifyCode: '',
                loginName: '',
                ps: '',
                // selectType:''
            },
            oneUpdateForm:{
                id: '',
                verifyCode: '',
                title: '',
                logValue: '',
                loginName: '',
                ps: ''
            },
            rules: {
                loginName: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                verifyCode: [
                    { required: true, message: '请填写身份验证码', trigger: 'blur' }
                ],
                // selectType: [
                //     { required: true, message: '请选择消息类型', trigger: 'change' }
                // ],
                title: [
                    { required: true, message: '请输入消息标题', trigger: 'blur' },
                ],
                logValue: [
                    { required: true, message: '请填写消息内容', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        this.loadDate()
    },
    methods:{
        showTransferDialog(row) {
            //跳出浮动框转移状态
            // console.log(row)
            this.transferVisible = true
            this.oneTranserForm.logValue = row.value
            this.oneTranserForm.loginName = row.loginName
            this.oneTranserForm.ps = row.ps
            this.oneTranserForm.projectType = row.projectType
            this.oneTranserForm.id = row.id
            this.oneTranserForm.selectType = row.type
        },
        showUpdateDialog(row) {
            // 是后端返回的数据row
            // console.log(row)
            this.dialogUpdateLog  = true
            //复制更新的数据
            // oneUpdateForm.verifyCode = row.verifyCode
            this.oneUpdateForm.title = row.title
            this.oneUpdateForm.id = row.id
            this.oneUpdateForm.logValue = row.value
            this.oneUpdateForm.loginName = row.loginName
            this.oneUpdateForm.ps = row.ps
            this.oneUpdateForm.projectType = row.projectType
            // console.log(this.oneUpdateForm)

        },
        loadDate() {
            // 加载数据
        },
        formatter(row, column) {
            // new Date('' + row.updatedDate)
            return (row.updatedDate + '').substring(0,10)
            // return service.changeToBJTime(row.updatedDate);//.substring(0,10);
        },
        tranferMessage(row) {
            //发送数据请求
            // console.log(row)
            if(row.id){
                const url = '' + service.getServiceIp() + "/api/message/tranfer"
                this.$http.put(url,{
                        loginName: row.loginName,
                        verifyCode: row.verifyCode,
                        token: '',
                        id:row.id,
                        ps:row.ps,
                        type: row.selectType,
                        projectType:row.projectType
                    }).then(function(res){
                        //判断数据
                        if(res.data.returnCode.startsWith("200")){
                            //删除成功
                            this.$message({
                                type:'success',
                                showClose:true,
                                message:'转换日志状态成功'
                            })
                            this.$emit('refreshbizlines',false);
                        }else{
                            this.$message({
                                type:"error",
                                showClose:true,
                                message:"转换日志状态失败"
                            })
                        }
                })
            }else{
                this.$message({
                    type:"error",
                    showClose:true,
                    message:"数据不存在"
                    })
                this.$emit('refreshbizlines',false);

            }
            this.transferVisible=false
        },

        updateMessage(row) {
            //发送数据请求
            if(row.id) {
                 const url = '' + service.getServiceIp() + "/api/message/update"
                this.$http.put(url,{
                        projectType: row.projectType,
                        loginName: row.loginName,
                        verifyCode: row.verifyCode,
                        token: '',
                        id:row.id,
                        ps:row.ps,
                        value:row.logValue,
                        title:row.title
                    }).then(function(res){
                        //判断数据
                        if(res.data.returnCode.startsWith("200")){
                            //更新成功
                            this.$message({
                                type:'success',
                                showClose:true,
                                message:'更新日志成功'
                            })
                            this.$emit('refreshbizlines',false);
                        }else{
                            this.$message({
                                type:"error",
                                showClose:true,
                                message:"更新日志失败"
                            })
                        }
                })
            }else {
                this.$message({
                    type:"error",
                    showClose:true,
                    message:"数据不存在"
                    })

                this.$emit('refreshbizlines',false);
            }
            this.transferVisible=false
        },
        deleteRow(row) {
            // rows.splice(index, 1);
            //需要加上验证（带上loginName，只需要输入验证码即可）
            //弹出浮框，输入验证码
            let code = '';
            this.$prompt('请输入验证码(创建者为:'+row.loginName+')', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'password',
                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+?/,
                // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: '验证码不能为空'
                }).then(({ value }) => {
                    // this.$message({
                    //     type: 'success',
                    //     message: '你的邮箱是: ' + value
                    // });
                    if(row.id){

                        const url = '' + service.getServiceIp() + "/api/message/" + row.id
                        this.$http.delete(url,{
                            body:{
                                loginName: row.loginName,
                                verifyCode: value,
                                token: '',
                                projectType: row.projectType
                            }
                        }).then(function(res){
                            //判断数据
                            if(res.data.returnCode.startsWith("200")){
                                //删除成功
                                this.$message({
                                    type:'success',
                                    showClose:true,
                                    message:'删除日志成功'
                                })
                                this.$emit('refreshbizlines',false);
                            }else{
                                this.$message({
                                    type:"error",
                                    showClose:true,
                                    message:"删除日志失败"
                                })
                            }
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                    this.verifyCode = ''
            });
        },
        showInputPs() {
            //输入了备注，那么直接提交消息
        },
    }
}
</script>
<style>

</style>

