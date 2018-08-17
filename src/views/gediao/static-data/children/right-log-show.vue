<template>
    <div>
        <div>
            <!-- 选择日期 -->
            <el-date-picker
                v-model="belongDate"
                type="date"
                @change="loadEachDayOperatorData"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div class="tab" style="margin-top:10px;">
            <!-- 简单起见，这里直接用表格？可是我想的是能够有那种--的样式就好了欸 -->
            <!-- 分为三层 -->
            <table class="table" cellspacing="0" cellpadding="0" border="1">
                <thead>
                    <tr>
                        <th style="width:12%">.</th>
                        <th style="width:25%">时间</th>
                        <th style="width:68%">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in tableData" :key="index">
                        <td>.</td>
                        <td>{{item.date}}</td>
                        <td>{{item.message}}</td>
                        <!-- <td><button @click="wrongRon">诈和大法好！</button></td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import services from '@/api/file.services'
export default {
    data(){
        return{
            minHeight: 10,
            maxHeight: 40,
            minHour:0,
            maxHour:24,
            belongDate:"",
            tableData:[]
        }
    },
    mounted () {
        if(this.belongDate=="")
            this.loadEachDayOperatorData()
        
    },
    methods: {
        loadEachDayOperatorData() {
            if(this.belongDate==undefined||this.belongDate==""){
                this.belongDate = services.getTodayDate()
            }
            const url = services.getServiceIp() + '/api/app/log/statis/each-day-operator-data' +"?token="+services.getToken()+"&belongDate="+this.belongDate
            this.$http.get(url,{}).then(function(res){
                if(res.data.returnCode.startsWith('200')){
                    // list中map，map中含有一个message和date
                    const listMap = res.data.data
                    //根据list，依次创建
                    //首先设置最大的高度（已经有的），每个小时最大的时间段长度和每条消息的最短长度
                    //长度都动态配置
                    //这边先计算最大长度、最小长度，和最大的时间段（进一法添加）
                    this.tableData = []
                    for(var i=0;i<listMap.length;i++){
                        var tmp = listMap[i]
                        this.tableData.push({
                            date:   tmp.date,
                            message: tmp.message
                        })
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message:services.getMessageByCode(res.data.returnCode)
                    })
                }
            }).catch(function(e){
                console.log(e)
                this.$message({
                    type: 'error',
                    message:'加载数据失败~服务器在重启中~'
                })
            })
        }
     }
}
</script>

<style>
.table{
    width: 100%
}
.tab{

    width:100%;
    border: 5px
}
</style>
