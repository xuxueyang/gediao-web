<template>
<div class="qlhmain">
        <!-- 需要一个表格：显示炼狱房还要修罗场。有一个登陆跳转，如果有token，那么就可以显示管理员的面板（即+-人员的次数，同时，多一个配置的菜单栏） -->
        <!-- 页面：左侧的菜单栏(配置规则）、显示，和右侧的显示栏 -->
    <div>
        
        <div class="leftDiv" style="float:left">
            <ul class="QLHul">
                <li>
                    <div @click="setIndex('0')">
                        <i class="el-icon-document" style="float:left;padding-top:10px;padding-left:15px;"></i>
                        <a>炼狱房与修罗场情况</a>
                    </div>                    
                </li>                
            </ul>
            <ul class="QLHul">
                <li>
                    <div @click="setIndex('1')">
                        <i class="el-icon-document" style="float:left;padding-top:10px;padding-left:15px;"></i>
                        <a>管理</a>
                    </div>                    
                </li>                
            </ul>  
            <!-- <ul class="QLHul">
                <li>
                    <div @click="setIndex('1')">
                        <i class="el-icon-document" style="float:left;padding-top:10px;padding-left:15px;"></i>
                        <a>测试</a>
                    </div>                    
                </li>                
            </ul>                        -->
        </div>
        <div  class="rightDiv">
            <div v-if="index==0">
                <qlh-lyf-xlc></qlh-lyf-xlc>
            </div>
            <div v-if="index==1">
                <qlh-manager></qlh-manager>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import merge from 'webpack-merge';
import qlhLyfXlc from './qlh-lyf-xlc.vue'
import qlhManager from './qlh-manager.vue'

export default {
    components:{
        qlhLyfXlc,
        qlhManager
    },
    data(){
        return{
            index:0
        }
    },
    mounted() {
        if(this.$route.query.index==undefined){
            this.$router.push({  
                query:merge(this.$route.query,{'index':this.index})  
            }) 
        }else{
            this.index = this.$route.query.index
        }
    },
    methods:{
          setIndex(index) {
            this.$router.push({  
                query:merge(this.$route.query,{'index':index})  
            })  
            this.index = index
        },
    }
}
</script>
<style>
.QLHul+.QLHul{

}
.QLHul {
    list-style-type: none;
    margin-right: 10px;
    padding: 0;
    width: 200px;
    height: 100%;
    background-color: #444;
    font-family:'STXingkai';
    line-height: 25px;
    box-shadow: 10px 10px 5px #888888;
    /* z-index: 10; */
}

.QLHul li{
    color: #fff;
    display:inline;
}
.QLHul li+li{
    margin-top: 5px ;
}
.QLHul li a {
    display: block;
    color: #fff;
    padding: 8px 16px;
    text-decoration: none;
}

.QLHul li a.active {
    background-color: #4CAF50;
    color: white;
}

.QLHul li a:hover:not(.active) {
    background-color: #666;
    color: white;
}
</style>

<style>
qlhmain{
    width:100%;
    height: 100%;
}
leftDiv{
    float: left;
    width:15%;
    height: 100%;
    background-color: #333;
    line-height: 200px;
    min-height: 750px;
    display: none;
    /* color:#fff; */
    /* active-text-color:#ffd04b; */
}
rightDiv{
    float: right;
    width:80%;
    height: 100%;
    background-color: #333;
    line-height: 200px;
    min-height: 750px;
    display: none;
    /* color:#fff; */
    /* active-text-color:#ffd04b; */
}
</style>