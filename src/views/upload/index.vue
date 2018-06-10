<template>
    <!-- <div class="panel admin-panel" style="">
        <div class="panel-head" id="add"><strong><span class="el-icon-edit"></span><span class="title">上传数据</span></strong></div>
        <div class="body-content">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="form uploadform">
                <el-form-item>

                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="httP://localhost:9999/api/uaafile/upload"
                            :on-preview="handlePreview"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload = 'false'
                            :on-success = 'handleSuccess'
                            :data="form"
                            name="salaryBill">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    </el-upload>

                </el-form-item>
            </el-form>
        </div>
    </div> -->
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-openeds="[0]" theme="light">
                    <!-- <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index" v-if="!item.leaf">
                            <template slot="title"><i :class="activeIcons" :style="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="(child,index) in item.children" :index="child.path">{{child.name}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="activeIcons" :style="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
                    </template>  -->
                    
                    <!-- <el-menu-item>文件上传</el-menu-item> -->
                    <el-submenu index = "0">
                        <template slot="title"><i class="el-icon-document"></i>文件上传</template>
                        <el-menu-item index="0-1" class="menu-item" @click="searchFile" >显示全部文件</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <!-- 这里应该有一个搜索框和表格 -->
                <!-- <div style="margin-top: 20px">
                    <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
                    <el-button @click="setCurrent()">取消选择</el-button>
                </div> -->
                <div style="margin-bottom:20px;">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            action="httP://localhost:9999/api/uaafile/upload"
                            :on-preview="handlePreview"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            v-loading="uploadLoading"
                            :auto-upload = 'false'
                            :on-progress = "handleUploadProess"
                            :on-success = 'handleSuccess'
                            :data="uploadBody"
                            name="salaryBill">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">大小不能超过200mb</div>
                    </el-upload>
                </div>
                <div>
                    <!-- 搜索框，搜索全部文件的 -->
                    <el-input placeholder="请输入内容" v-model="searchFileName" class="input-with-select" style="width:200px;margin-left:0px;margin-bottom:20px;">
                        <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                        </el-select> -->
                        <el-button slot="append" icon="el-icon-search" @click="searchFile"></el-button>
                    </el-input>
                </div>
                <el-table
                    :data="tableData"
                    max-height="600"
                    :default-sort = "{prop: 'createdDate', order: 'descending'}"
                    :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
                    :filter-method="filterHandler"
                    style="width: 100%">
                    <el-table-column
                        sortable
                        prop="createdDate"
                        :formatter="formatter"
                        label="创建日期"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="name"
                        fixed
                        label="文件名字"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        sortable
                        prop="size"
                        label="大小"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        label="文件校验码"
                        width="400"
                        prop="md5">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="tag"
                        label="标签"
                        width="200"
                        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                            :type="scope.row.tag === '家' ? 'primary' : 'success'"
                            disable-transitions>{{scope.row.tag}}</el-tag>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-button @click="handleClickDown(scope.row)" type="text" size="small">下载</el-button>
                            <el-button type="text" size="small" @click="handleClickDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import services from '@/api/file.services';
    export default {  
        data() {
            return {
                // options: [{
                //     value: '1',
                //     label: '帅哥部'
                // }, {
                //     value: '2',
                //     label: '美女部'
                // }],
                uploadLoading : false,
                searchFileName:'',
                fileName:'',
                fileList:[],
                ruleForm: {
//                    name: '',
                    isShow: '0'
                },
                uploadBody:{
                    token: '123456'
                },
                tableData: []
            };
        },
        mounted() {
            this.getAllFiles()
        },
        methods: {
            getAllFiles(needShowMessage) {
                //api调用获取到所有文件
                let url = '' + services.getServiceIp() +  '/api/uaafile/list';
                if (!this.searchFileName=='') {
                    url = url +  '?name=' + this.searchFileName
                }
                this.$http.get(url ,{
                            headers: { "Accept-Language" :"zh-cn,zh" }
                        }).then(function(res){  
                            if(res.data.returnCode.startsWith('200')) {
                                if(needShowMessage!=null&&needShowMessage==false){

                                }else{
                                    this.$message("文件列表读取成功~")
                                }
                                
                                this.tableData = [];
                                if(res.data.data&&res.data.data.length > 0) {
                                    for(let i = 0;i<res.data.data.length;i++) {
                                        //对于文件大小做处理
                                        res.data.data[i].size = services.getBFileMB(res.data.data[i].size)
                                        this.tableData.push(res.data.data[i])
                                    }
                                }
                            }else {
                                this.$message("code:文件列表加载失败！")
                            }
                        });  
                // const res  =  await services.getAllFiles(pararms)
            },
            searchFile() {
                this.getAllFiles();
            },
            formatter(row, column) {
                return row.createdDate.substring(0,10);
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            submitUpload() {
                this.$refs.upload.submit();
            },

            beforeAvatarUpload(file) {

                // let Xls = file.name.split('.');

                // if(Xls[1] === 'xls'||Xls[1] === 'xlsx'){
                //     return file
                // }else {
                //     this.$message.error('上传文件只能是 xls/xlsx 格式!')
                //     return false
                // }

            },
            handleClickDown(row) {
                //调用api请求下载
                if(row.id==null||""==row.id) {
                    this.$message({
                        message: '文件损坏',
                        type: 'error'
                    });
                    this.getAllFiles();
                }
                let url = '' + services.getServiceIp() +  '/api/uaafile/down/'+row.id;
                // window.open(url)
                // this.$http.get(url ,{
                //             // headers: { "Accept-Language" :"zh-cn,zh", "Content-type": "application/octet-stream" }
                //         }).then(function(res){  
                //             if(res.data.returnCode.startsWith('200')) {
                //                 this.$message("下载~")
                //             }else {
                //                 this.$message("下载失败")
                //             }
                //         });  
            },
            handleClickDelete(row) {
                //删除文件，逻辑删除
                if(row.id==null||""==row.id) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getAllFiles();
                }
                let url = '' + services.getServiceIp() +  '/api/uaafile/'+row.id;
                this.$http.delete(url ,{
                //             // headers: { "Accept-Language" :"zh-cn,zh", "Content-type": "application/octet-stream" }
                        }).then(function(res){  
                            if(res.data.returnCode.startsWith('200')) {
                                this.$message("删除成功")
                                this.getAllFiles(false);
                            }else {
                                this.$message("删除成功")
                            }
                        }); 
            },
            handleRemove(file, fileList) {
            },
            handlePreview(file) {
            },
            handleSuccess(res,file,fileList){
                //而且不能所有ID均为空
                if(res.data[0].id==""){
                    this.$message({
                        message: '上传失败,请重试~',
                        type: 'error'
                    });
                }else if(res.returnCode.startsWith('200')){
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                }else {
                    this.$message({
                        message: '上传失败,请重试~',
                        type: 'error'
                    });
                }
                this.getAllFiles(false);
                fileList = [];
                this.uploadLoading = false;
            },
            handleUploadProess(event, file, fileList) {
                //在上传中，设置div为加载状态
                this.uploadLoading = true;
            }
        }
    }
</script>
<style scope>
    input[type="file"] {
        display: none;
    }
    .el-upload-list{
        width: 200px;
    }
    .el-select {
        width: 135px;
    }
    .el-aside {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 200px;
        min-height: 750px;
    }
    /* .menu-item{
        font-size: 5px;
        margin-left: 5px;
    } */
</style>