<template>
  <el-table
    :data="tableDate"
    style="width: 95%"
    >
    <el-table-column
      prop="updatedDate"
      label="日期"
      :formatter="formatter"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="value"
      label="消息">
    </el-table-column>
    <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
            <el-button
            @click.native.prevent="deleteRow(scope.row)"
            type="text"
            size="small">
            移除
            </el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import service from '@/api/file.services'
export default {
    name: 'show-log',
    props:["projectType", "type", "tableDate"],
    data() {
        return {
        }
    },
    mounted(){
        this.loadDate()
    },
    methods:{
        loadDate() {
            // 加载数据
        },
        formatter(row, column) {
            return row.createdDate.substring(0,10);
        },
        deleteRow(row) {
            // rows.splice(index, 1);
            //需要加上验证（带上loginName，只需要输入验证码即可）
            //弹出浮框，输入验证码
            let code = '';
            this.$prompt('请输入验证码', '提示', {
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
                                token: ''
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
        }
    }
}
</script>
<style>

</style>

