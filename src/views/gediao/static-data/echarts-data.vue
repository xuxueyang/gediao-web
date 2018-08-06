<template>
    <div class="main">
        <!-- 左边一个div右边一个div，左边div分两个，上面是折线图，下面饼图，右边显示日志 -->
        <div class="left">
            <div class="top">
                <top-line-chart :key="Math.random()"></top-line-chart>
            </div>
            <div class="bottom">
                <bottom-bie :key="Math.random()"></bottom-bie>
            </div>
        </div>
        <div class="right">
            <right-log-show :key="Math.random()"></right-log-show>
        </div>
    </div>
</template>
<script>
import services from '@/api/file.services'
import topLineChart from './children/top-line-chart.vue'
import bottomBie from './children/bottom-bie.vue'
import rightLogShow from './children/right-log-show.vue'

export default {
    components:{
        topLineChart,
        bottomBie,
        rightLogShow
    }
}
</script>
<style>
.main{
    width: 100%;
    height: 750px;
}
.top{
    width: 100%;
    height: 40%;
    border:#909090 1px solid;
    background:#fff;color:#333;filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);/*ie*/
    -moz-box-shadow: 2px 2px 10px #909090;/*firefox*/
    -webkit-box-shadow: 2px 2px 10px #909090;/*safari或chrome*/
    box-shadow:2px 2px 10px #909090;/*opera或ie9*/
    /* background-color: blue; */
}
.bottom{
    margin-top:20px;
    width: 100%;
    height: 55%;
    border:#909090 1px solid;
    background:#fff;color:#333;filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);/*ie*/
    -moz-box-shadow: 2px 2px 10px #909090;/*firefox*/
    -webkit-box-shadow: 2px 2px 10px #909090;/*safari或chrome*/
    box-shadow:2px 2px 10px #909090;/*opera或ie9*/
    /* background-color: blue; */
}
.left{
    float:left;  
    display:inline; 
    width: 60%;
    height: 100%;
    

    /* background-color: aquamarine; */
}
.right{
    float:right;  
    display:inline;  
    width: 38%;
    height: 100%;
    border:#909090 1px solid;
    /* background-color: aquamarine; */
}
</style>
