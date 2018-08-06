<template>
    <div class="line-main">
        <div echarts class="line-main" id="lineChart">
            

        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
      data () {
        return {
        }
      },
      methods: {
        loadTendencyChartData() {
            // // /api/work-item/tendency/{project-id}
            // const url = this.router.url;
            // // console.log(url.split('/'));
            // if (url.includes('project')) {
            // const projectId = url.split('/')[2];
            // this.dashboardService.getTendencyData(projectId).subscribe(res => {
            //     if (res) {
            //     const arrDate = [];
            //     const arrData = [];
            //     for (let i = res.data.length - 1; i >= 0; i--) {
            //         arrDate.push(res.data[i].statisticsDate);
            //         arrData.push(res.data[i].unCompleteNum);
            //     }
            //     this._tendencyChartData.xAxis[0].data = arrDate;
            //     this._tendencyChart_Date = arrDate;
            //     this._tendencyChartData.series[0].data = arrData;
            //     this._tendencyChart_Data = arrData;
                
            //     const _tendencyChart = document.getElementById('_tendencyChart');
            //     echarts.init(_tendencyChart).setOption(this._tendencyChartData);
            //     }
            // });
            // }
        },
        drawLine (id) {
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
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
                    stack: '总量',
                    // areaStyle: { normal: {} },//区域填充样式
                    // TODO
                    data: [5, 12, 10, 16, 21],
                    // data: this._tendencyChart_Data,
                    symbol: 'circle',
                    symbolSize: 9
                },{
                    name: '已完成日志量',
                    type: 'line',
                    stack: '总量',
                    // areaStyle: { normal: {} },//区域填充样式
                    // TODO
                    data: [1, 1, 3, 6, 5],
                    // data: this._tendencyChart_Data,
                    symbol: 'circle',
                    symbolSize: 9
                }
            ]
          })
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
