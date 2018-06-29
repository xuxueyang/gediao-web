<template>
    <!-- 日期控件（默认今天，不选则显示全局）  添加 -->
    <!-- 搜索功能 ：按文字，按照标签 -->
    <!-- 表格： 下拉选择状态（根据状态不同，文字颜色会改变，同时已经完成的会沉底， -->
    <!-- 显示内容 -->
    <!-- 按钮：显示细节（笔记之类的） 删除 -->
    <!-- 标签 -->
    <div>
        <div>
            <el-table
                :data="tableDate"
                style="width: 98%"
                >
                <el-table-column
                    label="状态"
                    width="180">
                    <template slot-scope="scope">
                          <el-select v-model="scope.row.status" placeholder="请选择便签状态">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                          </el-select>
                    </template>
                </el-table-column>                
                <el-table-column
                    prop="updatedDate"
                    sortable
                    label="日期"
                    :formatter="formatter"
                    width="180">
                </el-table-column>

                <el-table-column
                    prop="message"
                    label="消息">
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="showDetailDialog(scope.row)"
                            type="text"
                            size="small">
                            细节
                        </el-button>
                        <el-button
                            @click.native.prevent="showMessageDialog(scope.row)"
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

                <!-- 浮动显示更新 -->
                <el-dialog  :visible.sync="dialogDetail">
                    <h2 style="margin-bottom:40px">详情</h2>

                </el-dialog>
            </div>
    </div>
</template>
<script>
import services from '@/api/file.services'
export default {
    name:'showLogEach',
    props:["projectType"],
    data() {
        return{
            dialogDetail: false,
            messageDetail:false,
            tableDate:[],
            options: [
                {
                    label: '已完成',
                    value: 'DONE'
                },
                {
                    label: '待完成',
                    value: 'TODO'
                }
            ]
        }
    },
    mounted(){
        //获取token和用户信息（放在缓存中）
        //判断有没有登陆，判断有没有缓存的用户信息
        this.getLogEachs()
    },
    methods:{
        getLogEachs() {
            const token='a'
            const userId='a'
            const url = '' + services.getServiceIp()+"/api/app/log/eachs"+"?token="+token+"&userId="+userId
            this.$http.get(url,{}).then(function(res){
                if(res.data.returnCode.startsWith("200")){

                }else{
                    this.$message({
                        type:"error",
                        showClose:true,
                        message:"加载数据失败"
                    })
                }
            }).catch(function(res){
                this.$message({
                    type:"error",
                    showClose:true,
                    message:"服务器正在抢修中~"
                })                    
            })
        },
        showDetailDialog(row) {
            this.dialogDetail = true
        },
        showMessageDialog(row) {
            this.messageDetail = true
        },
        deleteRow(row){
              //删除文件，逻辑删除
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        if(row.id==null||""==row.id) {
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getAllFiles();
                        }else{
                            // let url = '' + services.getServiceIp() +  '/api/uaafile/'+row.id;
                            // this.$http.delete(url ,{
                            // //             // headers: { "Accept-Language" :"zh-cn,zh", "Content-type": "application/octet-stream" }
                            //         }).then(function(res){  
                            //             if(res.data.returnCode.startsWith('200')) {
                            //                 this.$message("删除成功")
                            //                 this.getAllFiles(false);
                            //             }else {
                            //                 this.$message("删除成功")
                            //             }
                            //             }); 
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            showClose: true,
                            message: '已取消删除'
                        });          
                });

        },
        formatter(row, column) {
            // new Date('' + row.updatedDate)
            return (row.updatedDate + '').substring(0,10)
            // return service.changeToBJTime(row.updatedDate);//.substring(0,10);
        },
    }
}
</script>
<style>

</style>

