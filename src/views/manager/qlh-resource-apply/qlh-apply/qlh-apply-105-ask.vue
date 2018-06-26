<template>
    <div>
        <el-form :rules="rules" ref="form" :model="form" label-width="120px">
                <el-form-item label="申请人:" prop="name">
                    <el-input type="textarea" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="申请备注" prop="ps">
                    <el-input type="textarea" v-model="form.ps"></el-input>
                </el-form-item>
                <el-form-item label="战力说明" prop="battlePs">
                    <el-input type="textarea" v-model="form.battlePs"></el-input>
                </el-form-item>
                <el-form-item label="时间" prop="timePs">
                    <el-input type="textarea" v-model="form.timePs"></el-input>
                </el-form-item>              
        </el-form>
    </div> 
</template>
<script>
import services from '@/api/file.services'
export default {
    name: 'qlh-apply-105-ask',
    data() {
        return {
            projectType:'QLH',
            form: {
                battlePs: '',
                timePs: '',
                name: '',
                ps:''
            },
            rules: {
                name: [
                    { required: true, message: '请填写申请人的身份', trigger: 'blur' }
                ],
                ps: [
                    { required: false, message: '请填写备注说明', trigger: 'blur' }
                ],
                timePs: [
                    { required: true, message: '请输入有空时间', trigger: 'blur' },
                ],
                battlePs: [
                    { required: true, message: '请选择战力信息', trigger: 'change' }
                ],
            }
        }
    },
    methods:{
        postAsk() {
            //发送请求，如果成功，调到下一页，不然返回错误信息
            // console.log(this.form)
            // console.log(JSON.stringify(this.form))
            //验证字段
            if(this.form.name==''||this.form.timePs==''||this.form.battlePs==''){
                this.$message({
                        type:'error',
                        showClose:true,
                        message:'字段为空'
                })
                return
            }
            const url = ''+services.getServiceIp()+'/api/form/data'
            this.$http.post(url,{
                projectType: this.projectType,
                formType:'qlh-apply-105-ask',
                data: JSON.stringify(this.form)
            }).then(function(res){
                if(res.data.returnCode.startsWith('200')){
                    this.$emit('Next',false);
                }else{
                    this.$message({
                        type:'error',
                        message:'申请失败'
                    })
                }
            }).catch(function(res){
                    this.$message({
                        type:'error',
                        message:'服务器GG了'
                    })                
            })
        }
    }
}
</script>
