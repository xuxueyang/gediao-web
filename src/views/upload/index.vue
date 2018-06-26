<template>
<div>
<div style="margin-bottom:20px;">
                    <el-upload
                        style="float:right;margin-bottom:20px;backgroun:#333"
                        :disabled="disabled"
                        :headers="uploadHeaders"
                        :data = "uploadBody"
                         v-loading="uploadLoading"
                        :before-upload="beforeAvatarUpload"
                        :on-progress = "handleUploadProess"
                        :on-success="handleSuccess"                
                        :action="uploadUrl">
                        <div class="file-uploader-inner" style="backgroun:#333">
                            <div class="inner-desc" style="backgroun:#333">
                                <i class="fa fa-folder-open" style="backgroun:#333"></i>
                                <div  style="backgroun:#333">上传附件</div>
                            </div>
                        </div>
                    </el-upload>
                </div>
                <div style="float:left;margin-top:20px">
                    <!-- 搜索框，搜索全部文件的 -->
                    <el-input placeholder="请输入内容" v-model="searchFileName" class="input-with-select" style="width:200px;margin-left:0px;margin-bottom:20px;">
                        <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                        </el-select> -->
                    </el-input>
                    <el-button slot="append" icon="el-icon-search" @click="searchFile" circle></el-button>
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
                        label="下载数目"
                        width="150"
                        prop="downNum">
                    </el-table-column>
                    <el-table-column
                        label="文件校验码"
                        width="350"
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
</div>
</template>
<script>
    import services from '@/api/file.services';
    export default {  
        name: 'qlh-file-manager',
        props: {
            config: {
                type: Object,
                default: () => {
                }
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            // 支持的文件类型描述
            supportType(){
                let str = '支持';
                let supportArray = [];
                for (let i = 0; i < this.config.file_type.length; i++) {
                const type = this.config.file_type[i];
                if (this.types[type]) {
                    supportArray.push(this.types[type]);
                }
                }
                if (supportArray.length > 0) {
                str = str + ' ' + supportArray.join(',');
                }
                if (this.config.file_type.indexOf('custom') !== -1 && this.config.custom_file_type) {
                const customArray = this.config.custom_file_type.split(',');
                for (let j = 0; j < customArray.length; j++) {
                    customArray[j] = `.${customArray[j]}`;
                }
                str = str + (supportArray.length > 0 ? ',' : ' ') + customArray.join(',');
                }
                return str;
            },
            // 是否显示文件支持类型描述
            showSupportType(){
                return true;
            }
        },
        data() {
            return {
                uploadUrl: '' + services.getServiceIp() + '/api/uaafile/upload',
                uploadHeaders: {

                },
                types: {
                'document': '文档类型',
                'picture': '图片类型',
                'audio': '音频类型',
                'video': '视频类型',
                'zip_file': '压缩包类型'
                },
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
                                    this.$message({
                                        message: "文件列表读取成功~",
                                        showClose: true,
                                        type: "success"
                                    })
                                }
                                // while(this.tableData.length>0){
                                //     this.tableData.pop()
                                // }
                                this.tableData = [];
                                if(res.data.data&&res.data.data.length > 0) {
                                    for(let i = 0;i<res.data.data.length;i++) {
                                        //对于文件大小做处理
                                        res.data.data[i].size = services.getBFileMB(res.data.data[i].size)
                                        if(res.data.data[i].downNum){
                                            res.data.data[i].downNum = res.data.data[i].downNum + "次"
                                        }else{
                                            res.data.data[i].downNum = "0次"
                                        }
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
            submitUpload(file) {
                // console.log(this.$refs.upload)
                // this.$refs.upload.submit();
            },

            beforeAvatarUpload(file) {
                // this.uploadLoading = true
                // console.log(file)
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
                this.$confirm('此操作将下载该文件,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info '
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            showClose: true,
                            message: '因为服务器比较渣~请耐心等待'
                        });
                        if(row.id==null||""==row.id) {
                            this.$message({
                                message: '文件损坏',
                                showClose: true,
                                type: 'error'
                            });
                            this.getAllFiles();
                        }
                        let url = '' + services.getServiceIp() +  '/api/uaafile/down/'+row.id;
                        window.open(url)
                        // this.$http.get(url,{}).then(function() {
                        //     window.open(url)
                        // });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下载'
                    });          
                });
            },
            handleClickDelete(row) {
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
                }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            showClose: true,
                            message: '已取消删除'
                        });          
                });

            },
            handleRemove(file, fileList) {
            },
            handlePreview(file) {
                // console.log(file)
            },
            handleSuccess(res,file,fileList){
                //而且不能所有ID均为空
                if(res.data[0].id==""){
                    this.$message({
                        showClose: true,
                        message: '上传失败,请重试~',
                        type: 'error'
                    });
                }else if(res.returnCode.startsWith('200')){
                    this.$message({
                        showClose: true,
                        message: '上传成功！',
                        type: 'success'
                    });
                }else {
                    this.$message({
                        showClose: true,
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
        width: 130px;
    }
    .el-select {
        width: 90px;
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
<style scoped lang="scss">
  @import "./dynamic-upload.scss";
</style>