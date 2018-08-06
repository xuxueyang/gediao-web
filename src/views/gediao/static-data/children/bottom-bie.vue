<template>
    <div class="line-main">
        <div echarts class="line-main" id="bottomBie">
            

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
        loadCompletionRateData() {
            // const url = this.router.url;
            // if (url.includes('project')) {
            // const projectId = url.split('/')[2];
            // this.dashboardService.getCompletionRateData(projectId).subscribe(resp => {
            //     if (resp) {
            //     this._comCreateNum = resp.data.createNum;
            //     this._comProgressNum = resp.data.progressNum;
            //     this._comCompleteNum = resp.data.completeNum;
            //     var num = this._comCompleteNum + this._comProgressNum + this._comCreateNum;
            //     DashchartComponent._comRate = num === 0 ? '0%': '' + (this._comCompleteNum / num *100).toFixed(2) + '%';
            //     const seriesData =  [
            //     {value: this._comCreateNum, name: '新建(' + this._comCreateNum + ')'},
            //     {value: this._comProgressNum, name: '进行中(' + this._comProgressNum + ')'},
            //     {value: this._comCompleteNum, name: '已完成(' + this._comCompleteNum + ')'},
            //     ];
            //     this._completionRateData.series[0].data = seriesData;
            //     const legendData =  [
            //         '新建(' + this._comCreateNum + ')',
            //         '进行中(' + this._comProgressNum + ')',
            //         '已完成(' + this._comCompleteNum + ')'];
            //     this._completionRateData.legend.data = legendData;
            //     const _completionRateChart = document.getElementById('_completionRateChart');
            //     // _completionRateChart.firstElementChild.setAttribute('margin','auto');
            //     // _completionRateChart.setAttribute
            //     echarts.init(_completionRateChart).setOption(this._completionRateData);
            //     }
            // });
            // }
        },

        drawPie (id) {
          this.charts = echarts.init(document.getElementById(id))
          this.charts.setOption({
            itemStyle:{
                margin: 'auto'
                },
                color: ['#78A3FF',  '#FFC166',  '#FF887F'],
                title: {
                    text: '任务完成率',
                    // x: 'left-center',
                    // textStyle: {
                    //     fontWeight:'normal',
                    //     fontSize: 14,
                    //     color: '#444D62'
                    // }
                },
                tooltip: {
                trigger: 'item',
                // formatter: '{a} <br/>{b} : {c} ({d}%)'
                formatter:function(a) 
                    { 
                    // console.log(a);
                    var name = a.name;
                    name = name.split('(')[0];
                    var relVal = '';
                    // var num = this._comCompleteNum + this._comCreateNum + this._comProgressNum;
                    // num = num === 0? 1:num;
                    // if(name.startsWith('新建')){
                    //   relVal = name + ':' + this._comCreateNum + '(' + 
                    //               this._comCompleteNum/num*100 + '%)';
                    // }else if (name.startsWith('进行中')) {
                    //   relVal = name + ':' + this._comProgressNum + '(' + 
                    //               this._comCompleteNum/num*100 + '%)';
                    // }else if (name.startsWith('已完成')) {
                    //   relVal = name + ':' + this._comCompleteNum + '(' + 
                    //               this._comCompleteNum/num*100 + '%)';
                    // }
                    relVal = '' + a.seriesName + ':' + 5 +'%' +'<br/>' + name + ' : ' + a.value ;
                    // relVal = '' + a.seriesName + '<br/>' + name + ' : ' + a.value + '(' + DashchartComponent._comRate + ')';
                    return relVal; 
                    }  
                },
                legend: {
                // show: false,
                // orient: 'horizontal',
                // orient: 'vertical',
                x: 'center',
                y: 'top',
                itemWidth: 17,
                // left: 'bottom',
                data: [
                    '新建(' + 5 + ')',
                    '进行中(' + 5 + ')',
                    '已完成(' + 5 + ')']
                },
                series: [
                {
                    name: '任务完成率',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '50%'],
                    data: [
                        {value: 5, name: '新建(' + 5 + ')'},
                        {value: 5, name: '进行中(' + 5 + ')'},
                        {value: 5, name: '已完成(' + 5 + ')'},
                    ],
                    itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                    },
                    labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                    },
                    label: {
                    normal: {
                        show: false,
                        position: 'outside'
                    },
                    emphasis: {
                        show: false
                    }
                    },
                }
            ]
          })
        }
      },
      mounted () {
        this.$nextTick(function () {
          this.drawPie('bottomBie')
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
