<template>
<el-container>
    <!-- 最上面有个根据名字查询以及添加的地方 -->
    <!-- table需要显示的，成员名字，次数更新，（关于炼狱房次数，根据规则动态变化），已去和未去，一共 ，两个次数两列-->
    <el-main>
    <div class="main">
        <div>
            <input type="text" style="float:left;margin-bottom: 10px;" placeholder="请输入搜素的成员名字" id="qlhLXSearchInput">
            <button style="float:left;margin-bottom: 10px;margin-left: 10px;" @click="search()">搜索</button>
            <!-- <button style="float:right;margin-bottom: 10px;margin-right: 10px;" @click="showAdd()">添加</button> -->
        </div>
        <div>
            <el-table
                border
                max-height="700"
                :data="tableDate"
                style="width: 98%"
                >
                <el-table-column
                    prop="memberName"
                    label="成员名字"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="炼狱房次数"
                    width="800">
                    <template slot-scope="scope">
                        <span>已去次数：</span>
                        <el-input-number v-model="scope.row.numLYF_YES" @change="changeValue($event,scope.row)" :min="-100"   :max="100"  label="炼狱房已去次数" ></el-input-number>
                        <span>未去次数：</span>
                        <el-input-number v-model="scope.row.numLYF_NO" @change="changeValue($event,scope.row)" :min="-100"   :max="100"  label="炼狱房未去次数" ></el-input-number>
                    </template>                    
                </el-table-column>
                <el-table-column
                    label="修罗城次数"
                    width="300">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.numXLC" @change="changeValue($event,scope.row)" :min="-100"   :max="100"  label="修罗城次数"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">

                </el-table-column>
            </el-table>   
            <!-- 选择成员后，会动态变化炼狱房和修罗场的次数，然后点击保存会出去（PS：如果数据为空，则，两个次数为0） -->
             <el-dialog  :visible.sync="addValue">
            <h2 style="margin-bottom:40px">更新数据</h2>
            <el-form :rules="eachRules" ref="form" :model="form" label-width="120px">
                <el-form-item label="成员名字:" style="width:80%;height:80px" >
                    <template>
                    <el-select
                        style="width:100%;height:80px"
                        v-model="form.member"
                        filterable
                        default-first-option
                        placeholder="请选择成员">
                        <el-option
                            v-for="memberNameTmp in form.member"
                            :key="memberNameTmp.value"
                            :label="memberNameTmp.name"
                            :value="memberNameTmp.id">
                        </el-option>
                    </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="修罗城次数" prop="message" >
                    <el-input-number v-model="form.numXLC"  :min="-100"   :max="100"  label="修罗城次数" style="margin-left:-60%"></el-input-number>
                </el-form-item>
                <el-form-item label="炼狱房次数" prop="message" >
                    <el-input-number v-model="form.numLYF"  :min="-100"   :max="100"  label="炼狱房次数" style="margin-left:-60%"></el-input-number>
                </el-form-item>
                <el-form-item style="margin-top:20px">
                    <el-button type="primary" @click="add('form')">添加</el-button>
                    <el-button @click="addValue=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>         
        </div>        
    </div>
    </el-main>
</el-container>
</template>
<script>
import services from "@/api/file.services.js";
export default {
    data(){
        return{
            addValue: false,
            members:[],
            num: 0,
            form: {
                member: '',
                numLYF: 0,
                numXLC: 0,
            },
            //每次更新的时候存储一份原本的记录
            oldTableDate:[],
            tableDate:[],
            eachRules: {
                // title: [
                //     { required: true, message: '请输入消息标题', trigger: 'blur' },
                // ],
                // numXLC: [
                //     { required: true, message: '请选择消息类型', trigger: 'change' }
                // ],
                // numXLC: [
                //     { required: false, message: '请填写消息内容', trigger: 'blur' }
                // ]
            },
        }
    },
    methods:{
        //
        showUpdate(){
            this.updateValue = true
        },
        showAdd(){
            this.addValue = true
        },
        update(row){
            // 更新的话，直接更新，不考虑次数
            var url = services.getServiceIp()+'/api/dist/code/' + 'QLH_LYF_XLC_COUNT_SHOW';
                //构造value:修罗场的总共次数（不允许减少），修罗场有已经去的次数（每次动态变化，会根据规则，动态变化炼狱房次数），炼狱房的次数：总共，已去，未去。
                const rowT = row
                // console.log('rowT: '+rowT.memberName)
                console.log(this.oldTableDate)
                if(this.num!=undefined&&this.num!=0){
                    for(var i=0;i<this.oldTableDate.length;i++){
                        if(this.oldTableDate[i].memberId==rowT.memberId){
                            //说明一样，判断一下修罗场次数,以及+-炼狱房次数（达成统一），如果去了一次，得减少没去的次数+1
                            var numXLC = this.oldTableDate[i].numXLC
                            var numLYF_YES = this.oldTableDate[i].numLYF_YES

                            if(numLYF_YES!=rowT.numLYF_YES){
                                //说明多去了一次
                                rowT.numLYF_NO = rowT.numLYF_NO + numLYF_YES - rowT.numLYF_YES 
                            }
                            if(numXLC!=rowT.numXLC){
                                var tmp =  rowT.numXLC-numXLC
                                //四舍五入
                                rowT.numLYF_NO = rowT.numLYF_NO + tmp/this.num
                            }
                            //反过来更新列表数据
                            this.oldTableDate[i].numLYF_YES = rowT.numLYF_YES
                            this.oldTableDate[i].numLYF_NO = rowT.numLYF_NO
                            this.oldTableDate[i].numXLC = rowT.numXLC
                            break;
                        }   
                    }
                    for(var i=0;i<this.tableDate.length;i++){
                        if(this.tableDate[i].memberId==rowT.memberId){
                            //反过来更新列表数据
                            this.tableDate[i].numLYF_YES = rowT.numLYF_YES
                            this.tableDate[i].numLYF_NO = rowT.numLYF_NO
                            this.tableDate[i].numXLC = rowT.numXLC
                            break;
                        }
                        
                    }
                }
                
                var putValue = {
                    numXLC: rowT.numXLC,
                    numLYF_YES: rowT.numLYF_YES,
                    numLYF_NO: rowT.numLYF_NO,
                    memberName: rowT.memberName,
                    memberId: rowT.memberId
                }
                this.$http.post(url,{
                    id: rowT.valueId,
                    value: JSON.stringify(putValue),
                    token: services.getToken(),
                    projectType:'QLH'
                }).then(function(res){
                    if(res.data.returnCode.startsWith('200')){
                        this.getValues()
                    }else{
                        this.getValues();
                            this.$message({
                                    type:"error",
                                    showClose:true,
                                    message: services.getMessageByCode(res.data.returnCode)
                                })     
                    }
                }).catch(function(e){
                    console.log(e)
                            this.$message({
                                    type:"error",
                                    showClose:true,
                                    message: services.getMessageByCode(res.data.returnCode)
                                })            
                })
        },
        changeValue(event,row){
            // console.log('object :', row);
            // console.log(event)
            if(row.valueId==undefined||row.valueId==""){
                // 添加方法
                this.add(row)
            }else{
                // 更新方法
                this.update(row)
            }
        },
        add(row){
                var url = services.getServiceIp()+'/api/dist/code/' + 'QLH_LYF_XLC_COUNT_SHOW';
                //构造value:修罗场的总共次数（不允许减少），修罗场有已经去的次数（每次动态变化，会根据规则，动态变化炼狱房次数），炼狱房的次数：总共，已去，未去。
                const rowT = row
                // console.log('rowT: '+rowT.memberName)
                var putValue = {
                    numXLC: rowT.numXLC,
                    numLYF_YES: rowT.numLYF_YES,
                    numLYF_NO: rowT.numLYF_NO,
                    memberName: rowT.memberName,
                    memberId: rowT.memberId
                }

                this.$http.put(url,{
                    id: '',
                    value: JSON.stringify(putValue),
                    token: services.getToken(),
                    projectType:'QLH'
                }).then(function(res){
                    if(res.data.returnCode.startsWith('200')){
                        // 塞入数据
                        // this.tableDate.put({

                        // })
                        this.getValues()
                        
                    }else{
                        this.getValues();
                            this.$message({
                                    type:"error",
                                    showClose:true,
                                    message: services.getMessageByCode(res.data.returnCode)
                                })     
                    }
                }).catch(function(e){
                    console.log(e)
                            this.$message({
                                    type:"error",
                                    showClose:true,
                                    message: services.getMessageByCode(res.data.returnCode)
                                })            
                })
            },
        search(){
            console.log("搜索")
            this.getValues()
            // JSON.stringify(userinfo)
        },
        getValues(){
            const memberName = document.getElementById('qlhLXSearchInput').value
            var url = services.getServiceIp()+'/api/dist/code/' + 'QLH_LYF_XLC_COUNT_SHOW'
            if(memberName!=undefined&&memberName!='')
               url = url +'?content='+memberName;
            this.$http.get(url,{
            }).then(function(res){
                if(res.data.returnCode.startsWith('200')){
                    // this.num1 = res.data.data[0]
                    // 解析value数据（转string为对象）
                    this.tableDate = [];
                    // 塞入数据
                    // tag获取的是成员，如果成员id不在其中，那么，视为这个成员不存在，从表格中剔除
                    // 显示tag的全部数据，判断show中没有的话，则都视为0（如果倒是点击添加，如果value的id为空，调用add方法，如果有，调用update方法
                    // if(res.data.data!=null){
                    //     for(var i=0;i<res.data.data.length;i++){
                            
                    //     }
                    // }
                    const data = res.data.data;
                    this.tableDate = [];
                    this.oldTableDate=[];
                    if(this.members){
                        for(var i=0;i<this.members.length;i++){
                            var putData = {
                                numXLC: 0,
                                numLYF_YES: 0,
                                numLYF_NO: 0,
                                memberName: this.members[i].name,
                                memberId: this.members[i].id,
                                valueId: ''
                            }
                            var putData2 = {
                                numXLC: 0,
                                numLYF_YES: 0,
                                numLYF_NO: 0,
                                memberName: this.members[i].name,
                                memberId: this.members[i].id,
                                valueId: ''
                            }
                            for(var j=0;j<data.length;j++){
                                var tmp = JSON.parse(data[j].value)
                                // 将data转为object
                                if(tmp.memberId==putData.memberId){
                                    putData.numXLC = putData.numXLC + tmp.numXLC;
                                    putData.numLYF_YES = putData.numLYF_YES + tmp.numLYF_YES;
                                    putData.numLYF_NO = putData.numLYF_NO + tmp.numLYF_NO;
                                    putData.valueId = data[j].id;

                                    putData2.numXLC = putData2.numXLC + tmp.numXLC;
                                    putData2.numLYF_YES = putData2.numLYF_YES + tmp.numLYF_YES;
                                    putData2.numLYF_NO = putData2.numLYF_NO + tmp.numLYF_NO;
                                    putData2.valueId = data[j].id;                                   
                                }
                            }
                            this.tableDate.push(putData)
                            this.oldTableDate.push(putData2)

                        }
                    }
                    
                    // console.log(tmp)
                }else{
                    
                        this.$message({
                                type:"error",
                                showClose:true,
                                message: services.getMessageByCode(res.data.returnCode)
                            })     
                }
            }).catch(function(e){
                console.log(e)      
            })
        },
        getAllTags() {
            
                const url = '' + services.getServiceIp()+"/api/app/log/tags"+"?verifyCode="+'qinglonghui'+"&userId="+4
                this.$http.get(url,{}).then(function(res){
                    if(res.data.returnCode.startsWith("200")){
                        this.$message({
                            type:"success",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                        // 赋值
                        this.members.pop()
                        this.members = []
                        for(var i = 0;i<res.data.data.length;i++) {
                            this.members.push(res.data.data[i])
                            
                        }
                        // console.log(this.members)
                        this.getValues();
                    }else{
                        this.$message({
                            type:"error",
                            showClose:true,
                            message: services.getMessageByCode(res.data.returnCode)
                        })
                    }
                })
        
            
        },
        getRole(){
            // 得到当下的修罗场规则，如果增减修罗场次数，需要动态变化炼狱房的
            const url = services.getServiceIp()+'/api/dist/code/' + 'QLH_LYF_XLC_COUNT_RULE';
            this.$http.get(url,{}).then(function(res){
                if(res.data.returnCode.startsWith('200')){
                    this.num = Number(res.data.data[0]["value"])
                }else{
                        this.$message({
                                type:"error",
                                showClose:true,
                                message: services.getMessageByCode(res.data.returnCode)
                            })     
                }
            }).catch(function(e){
                console.log(e)
                        this.$message({
                                type:"error",
                                showClose:true,
                                message: services.getMessageByCode(res.data.returnCode)
                            })            
            })
        }
    },
    mounted() {
        this.getAllTags();
        this.getValues();
        this.getRole();
    },
}
</script>
<style>
main{
    background-color: black;
    width:100%;
    height: 100%;
}
.searchinput{
    float: left;
    margin-bottom: 10px;
}
</style>
