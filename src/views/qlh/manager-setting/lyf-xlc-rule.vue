<template>
    <div>
        <!-- 就显示多少多少次可以去一次炼狱房即可 -->
        <div class="div">
            <el-input-number v-model="num1" @change="handleChange" :min="1"   :max="100"  label="描述文字" style="margin-left:-60%"></el-input-number>
            <span>次修罗场可以去一次炼狱房</span>
        </div>
    </div>
</template>
<script>
import services from '@/api/file.services'
export default {
    data(){
        return{
            num1:1,
            id:''
        }
    },
    methods:{
        handleChange(){
            // 调用API
        const url = services.getServiceIp()+'/api/dist/code/' + 'QLH_LYF_XLC_COUNT_RULE';
        const value  = this.num1
        this.$http.post(url,{
           id: this.id,
           value:value,
           token: services.getToken(),
           projectType: 'QLH'
        }).then(function(res){
            if(res.data.returnCode.startsWith('200')){
                // this.num1 = res.data.data[0]
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
        //调用API获取次数.利用字典值QLH_LYF_XLC_COUNT_RULE
        // services.getServiceIp()+'/api/uaa/dict/value/{dictId}'
        const url = services.getServiceIp()+'/api/dist/code/' + 'QLH_LYF_XLC_COUNT_RULE';
        this.$http.get(url,{}).then(function(res){
            if(res.data.returnCode.startsWith('200')){
                // this.num1 = res.data.data[0]
                this.num1 = Number(res.data.data[0]["value"])
                this.id = Number(res.data.data[0]["id"])
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
    },
}
</script>

<style>
.div {
    margin-top:30px;
}
</style>
