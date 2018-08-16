<template>
    <div>
        <div>
            <!-- 选择日期 -->
            <el-date-picker
                v-model="belongDate"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div>
            <!-- 简单起见，这里直接用表格？可是我想的是能够有那种--的样式就好了欸 -->
        </div>
        正在制作中~敬请期待~
        &nbsp;
        显示操作日志等
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
            belongDate:'2018-08-17'
        }
    },
    methods: {
        loadEachDayOperatorData(id) {
            if(this.belongDate==undefined||this.belongDate==""){
                this.belongDate = services.getTodayDate()
            }
            const url = services.getServiceIp() + '/api/app/log/statis/each-day-operatpr-data' +"?token="+services.getToken()+"&belongDate="+this.belongDate
            this.$http.get(url,{}).then(function(res){
                if(res.data.returnCode.startsWith('200')){
                    // list中map，map中含有一个message和date
                    const listMap = res.data.data
                    //根据list，依次创建
                    //首先设置最大的高度（已经有的），每个小时最大的时间段长度和每条消息的最短长度
                    //长度都动态配置
                    //这边先计算最大长度、最小长度，和最大的时间段（进一法添加）
                    for(var i=0;i<listMap.length();i++){

                    }
                }else{
                    this.$message({
                        type: 'error',
                        message:services.getMessageByCode(res.data.returnCode)
                    })
                }
            }).catch(function(e){
                this.$message({
                    type: 'error',
                    message:'加载数据失败~服务器在重启中~'
                })
            })
        }
     }
}
</script>
