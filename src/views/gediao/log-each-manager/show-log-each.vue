<template>
    <!-- 日期控件（默认今天，不选则显示全局）  添加 -->
    <!-- 搜索功能 ：按文字，按照标签 -->
    <!-- 表格： 下拉选择状态（根据状态不同，文字颜色会改变，同时已经完成的会沉底， -->
    <!-- 显示内容 -->
    <!-- 按钮：显示细节（笔记之类的） 删除 -->
    <!-- 标签 -->
    <div>
                <div style="margin-top:15px;margin-right:35px;float:right">
                    <el-button>添加便签</el-button>
                </div>
                <div style="float:left;margin-top:20px">
                    <div>
                        <!-- 搜索框，搜索全部文件的 -->
                        <el-input placeholder="请输入内容" v-model="searchName" class="input-with-select" style="width:200px;margin-left:0px;margin-bottom:20px;">
                        </el-input>
                        <el-button slot="append" icon="el-icon-search" @click="searchLog" circle></el-button>
                        <!-- 日期选择 -->
                        <!-- 标签选择 -->
                        <!-- 状态选择 -->
                        <span style="margin-left:30px">请选择便签状态:</span>
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div style="margin-bottom:18px;margin-top:5px">
                        <div style="text-align:left">
                            <span class="demonstration">请选择便签日期范围（默认今日）:</span>
                            <el-date-picker
                                v-model="rangeDate"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions2">
                            </el-date-picker>
                        </div>
                    </div>
                </div>
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
        <!-- 添加便签：所属日期（日期选择，不选则默认今天），标题，状态（可选，默认为未完成），类型 -->
</template>
<script>
import services from '@/api/file.services'
export default {
    name:'showLogEach',
    props:["projectType"],
    data() {
        return{
            searchName:'',
            rangeDate:'',
            dialogDetail: false,
            messageDetail:false,
            tableDate:[],
            select:'ALL',
            options: [
                {
                    label: '全部',
                    value: 'ALL'
                },
                {
                    label: '已完成',
                    value: 'DONE'
                },
                {
                    label: '待完成',
                    value: 'TODO'
                }
            ],
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
                },
        }
    },
    mounted(){
        //获取token和用户信息（放在缓存中）
        //判断有没有登陆，判断有没有缓存的用户信息
        this.getLogEachs()
    },
    methods:{
        searchLog() {

        },
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

