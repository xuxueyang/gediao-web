<template>
    <div>
        <el-form :rules="rules" ref="form" :model="form" label-width="120px">
                <el-form-item label="申请人:" prop="name">
                    <el-input type="textarea" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="105咕咕咕？" prop="ps">
                    <el-input type="textarea" v-model="form.ps"></el-input>
                </el-form-item>           
        </el-form>
    </div> 
</template>
<script>
import services from '@/api/file.services'
export default {
    name: 'qlh-apply-105-gu',
    data() {
        return {
            projectType:'QLH',
            form: {
                name: '',
                ps:''
            },
            rules: {
                name: [
                    { required: true, message: '请填写申请人的身份', trigger: 'blur' }
                ],
                ps: [
                    { required: true, message: '为什么要咕咕咕欸欸', trigger: 'blur' }
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
            const url = ''+services.getServiceIp()+'/api/form/data'
            this.$http.post(url,{
                projectType: this.projectType,
                formType:'qlh-apply-105-gu',
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
