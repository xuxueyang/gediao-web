<template>
    <div class="line-main">
        <div echarts class="line-main" id="lineChart">
            

        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import services from '@/api/file.services'
export default {
      data () {
        return {
            options:{
                itemStyle:{
                    margin: 'auto'
                    },
                    title: {
                    text: '日志状态趋势图'
                    
                    },
                    color: ['#f31237','#34e06d'],
                    tooltip: {
                    trigger: 'axis'// 触发类型为坐标轴触发
                    },
                    legend: {// 图例组件
                        top: '3%',
                        data: ['未完成日志量','已完成日志量']
                    },

                    grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '5%',
                    containLabel: true
                    },
                    xAxis: [
                    {
                        type: 'category',
                        boundaryGap: true, // 坐标轴两边留白策略
                        // TODO
                        data: ['2017-10-30', '2017-10-31', '2017-11-1', '2017-11-2', '2017-11-3'],
                        // data: this._tendencyChart_Date,
                        axisTick: {
                        show: false
                        }
                    }
                    ],
                    yAxis: [
                    {
                        minInterval:1,
                        type: 'value',
                        axisTick: {
                        show: false
                        },
                        splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                        }
                    }
                    ],
                    series: [// 系列列表
                    {
                        name: '未完成日志量',
                        type: 'line',

                        // areaStyle: { normal: {} },//区域填充样式
                        // TODO
                        data: [1, 1, 3, 6, 5],
                        // data: this._tendencyChart_Data,
                        symbol: 'circle',
                        symbolSize: 9
                    },
                    {
                        name: '已完成日志量',
                        type: 'line',

                        // areaStyle: { normal: {} },//区域填充样式
                        // TODO
                        data: [5, 12, 10, 16, 21],
                        // data: this._tendencyChart_Data,
                        symbol: 'circle',
                        symbolSize: 9
                    }
                ]
            }
        }
      },
      methods: {
        loadLineData(id) {
            //1是未完成，2是已完成
            const url = services.getServiceIp() + '/api/app/log/statis/each-line-data' +"?token="+services.getToken()
            this.$http.get(url,{}).then(function(res){
                if(res.data.returnCode.startsWith('200')){
                    const map = res.data.data
                    const noSuccess = map['2']
                    const success = map['1']
                    var seriesSuccessData = [];
                    var seriesNoSuccessData = [];
            
                    // 日期
                    var xAxisData = []
                    
                    for(var i=0;i<noSuccess.length;i++){
                        var mapEachNoSuccess = noSuccess[i]
                        for(var key in mapEachNoSuccess){
                            xAxisData.push(key)
                            seriesNoSuccessData.push(mapEachNoSuccess[key])
                        }
                    }
                    for(var i=0;i<success.length;i++){
                        var mapEachSuccess = success[i]
                        for(var key in mapEachSuccess){
                            // xAxisData.push(key)
                            seriesSuccessData.push(mapEachSuccess[key])
                        }
                    }                    
                    this.options.series[0].data = seriesSuccessData;
                    this.options.series[1].data = seriesNoSuccessData;
                    this.options.xAxis[0].data = xAxisData;
                    // console.log(this.options.series[0].data)
                    // console.log(this.options.series[1].data)
                    // console.log(this.options.xAxis[1].data)
                    const topLine = document.getElementById(id);
                    echarts.init(topLine).setOption(this.options);
                }else{
                    this.$message({
                        type: 'error',
                        message:services.getMessageByCode(res.data.return)
                    })
                }
            }).catch(function(e){
                // console.log(e)
                this.$message({
                    type: 'error',
                    message:'加载数据失败~服务器在重启中~'
                })
            })
        },
        drawLine (id) {
          this.charts = echarts.init(document.getElementById(id))
          this.loadLineData(id)
        }
      },
      mounted () {
        this.$nextTick(function () {
          this.drawLine('lineChart')
        })
      }
}
</script>

<style>
.line-main{
    width: 100%;
    height: 100%;
}

</style>
