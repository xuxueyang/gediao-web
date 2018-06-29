<template>
<div>
    <el-button type="primary " icon="el-icon-edit" @click="showAddMessageDialog" style="float:right"></el-button>
    <el-tabs v-model="type" @tab-click="handleClick" style="width:95%" >
        <el-tab-pane label="已完成" name="DONE" :key='Math.random()' ><h3 style="color:#33A1C9">已完成</h3>
            <show-log
                v-bind:canTranfer="true"
                v-bind:projectType="projectType"
                v-on:refreshbizlines="getTableDate" keep-alive
                v-bind:type="type"
                v-bind:tableDate="tableDate">
            </show-log>
        </el-tab-pane>
        <el-tab-pane label="缺陷" name="BUG" :key='Math.random()' ><h3 style="color:#C80000">缺陷</h3>
            <show-log
                v-bind:canTranfer="true"
                v-bind:projectType="projectType"
                v-on:refreshbizlines="getTableDate" keep-alive
                v-bind:type="type"
                v-bind:tableDate="tableDate">
            </show-log>
        </el-tab-pane>
        <el-tab-pane label="待完善" name="TODO" :key='Math.random()' ><h3 style="color:#FF8000 ">未来计划</h3>
            <show-log
                v-bind:canTranfer="true"
                v-bind:projectType="projectType"
                v-on:refreshbizlines="getTableDate" keep-alive
                v-bind:type="type"
                v-bind:tableDate="tableDate">
            </show-log>
        </el-tab-pane>
        <el-tab-pane label="吐槽" name="MEMBER_SAY"><h3 style="color:#215E21 ">成员吐槽</h3>
            <show-log
                v-bind:canTranfer="false"
                v-bind:projectType="projectType"
                v-on:refreshbizlines="getTableDate" keep-alive
                v-bind:type="type"
                v-bind:tableDate="tableDate">
            </show-log>
        </el-tab-pane>
    </el-tabs>
            <!-- 浮动显示提示按钮 -->
        <el-dialog  :visible.sync="dialogAddLog">
            <h2 style="margin-bottom:40px">创建消息日志</h2>
            <el-form :rules="rules" ref="form" :model="form" label-width="120px">
                <el-form-item label="用户名:" prop="loginName">
                    <el-input v-model="form.loginName" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="身份码:" prop="verifyCode">
                    <!-- <div style="width:200px;float:left">（避免你们乱加东西23333）</div>
                    <div >
                        <el-input v-model="form.verifyCode" ></el-input>
                    </div> -->
                    <el-input type="password" v-model="form.verifyCode" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="消息标题:" prop="title">
                    <el-input v-model="form.title" style="width:200px;float:left"></el-input>
                </el-form-item>
                <el-form-item label="消息类型:" style="width:100px;" prop="selectType">
                    <el-select v-model="form.selectType" style="width:150px" placeholder="请选择消息类别">
                        <el-option label="已完成" value="DONE"></el-option>
                        <el-option label="缺陷" value="BUG"></el-option>
                        <el-option label="待完成" value="TODO"></el-option>
                        <el-option label="吐槽" value="MEMBER_SAY"></el-option>
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
        </el-dialog>
</div>
</template>
<script>
import showLog from './show-log.vue'
import services from '@/api/file.services'
export default {
    name: 'qlh-develop-log',
    props:["projectType"],
    data() {
        return {
            dialogAddLog: false,
            // projectType: '',
            type: 'DONE',
            _tableDate: [],
            tableDate: [],
            // 缓存表单的数据（避免误点然后取消要再输入）
            // 添加消息会有——确定的code、带过去的projectType、下拉选择，消息，标题
            form: {
                verifyCode: '',
                title: '',
                selectType: '',
                logValue: '',
                loginName: '',
                ps:''
            },
            rules: {
                loginName: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                verifyCode: [
                    { required: true, message: '请填写身份验证码', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: '请输入消息标题', trigger: 'blur' },
                ],
                selectType: [
                    { required: true, message: '请选择消息类型', trigger: 'change' }
                ],
                logValue: [
                    { required: true, message: '请填写消息内容', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        this.getTableDate()
    },
    methods: {
      getTableDate(needShow) {
          console.log(this.projectType)
          const url = '' + services.getServiceIp()+"/api/message"+"?projectType="+this.projectType
          this.$http.get(url,{}).then(function(res){
              if(res.data.returnCode.startsWith("200")){
                    // while(this._tableDate.>0){
                    //     this._tableDate.pop()
                    // }                   
                  this._tableDate = res.data.data;
                  //根据activeName删选_tableDate
                  this.tableDate = []
                    // while(this.tableData.length>0){
                    //     this.tableData.pop()
                    // }                
                  if(this._tableDate){
                    for(let i=0;i<this._tableDate.length;i++){
                        if(this._tableDate[i].type==this.type){
                            this.tableDate.push(this._tableDate[i])
                        }
                    }
                  }
                //   console.log(this._tableDate)
                  if(needShow==false){

                  }else{
                      this.$message({
                          type:"success",
                          message:"加载数据成功"
                      })
                  }
              }else{
                  if(needShow==false){

                  }else{
                      this.$message({
                          type:"error",
                          message:"加载数据失败"
                      })
                  }
              }
          })
      },
      handleClick(tab, event) {
        // console.log(tab);
        //点击选项卡，加载数据
        // this.getTableDate()
        // 切换数据
        this.tableDate = []
        if(this._tableDate){
            for(let i=0;i<this._tableDate.length;i++){
                if(this._tableDate[i].type==this.type){
                    this.tableDate.push(this._tableDate[i])
                }
            }
        }
      },
      showAddMessageDialog() {
          //调用API添加，然后刷新数据
          //已弹出表单的形式
          this.dialogAddLog = true
          //会缓存表单数据
      },
      cancelAdd() {
          this.dialogAddLog = false
      },
      onSubmit(form) {
          //需要验证——清空表单数据
        this.$refs[form].validate((valid) => {
          if (valid) {
            //传输数据，清空
            // this.verifyCode =  '',
            // this.loginName = '',
            //传输数据
            const url = '' + services.getServiceIp()+"/api/message"
            this.$http.post(url,{
                projectType:this.projectType,
                type:this.form.selectType,
                value: this.form.logValue,
                verifyCode:this.form.verifyCode,
                loginName:this.form.loginName,
                title: this.form.title,
                ps: this.ps,
                token:''
            }).then(function(res) {
                if(res.data.returnCode.startsWith('200')) {
                    //刷新数据
                    this.$message({
                        showClose: true,
                        type:"success",
                        message:"添加成功"
                    })
                    this.getTableDate(false);
                }else{
                  this.$message({
                      type:"error",
                      showClose: true,
                      message:"创建失败"
                  })
                }
            })

            this.title = '',
            this.selectType = '',
            this.logValue =  ''
            this.dialogAddLog = false
            return true;
          } else {
            return false;
          }
        });

      },
    },
    components: {
        showLog
    }
}
</script>
