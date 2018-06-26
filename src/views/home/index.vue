<template>
  <div>
    <div class="block">
      <el-carousel trigger="click" height="280px">
        <el-carousel-item class="c1" >
            <h2>{{ items[0].description }}</h2>
            <el-button @click="tranferTo(items[0].url)" type="primary" plain class="button"
              :style="{'font-family':'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'}"
            >点击前往</el-button>
        </el-carousel-item>
        <el-carousel-item class="c2" >
            <h2>{{ items[1].description }}</h2>
            <el-button @click="tranferTo(items[1].url)" type="primary" plain class="button"
              :style="{'font-family':'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'}"
            >点击前往</el-button>        
        </el-carousel-item>
        <el-carousel-item class="c3">
            <h2>{{ items[2].description }}</h2>
            <el-button @click="tranferTo(items[2].url)" type="primary" plain class="button"
              :style="{'font-family':'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'}"
            >点击前往</el-button>          
        </el-carousel-item>
        <el-carousel-item class="c4">
            <h2>{{ items[3].description }}</h2>
            <el-button @click="tranferTo(items[3].url)" type="primary" plain class="button"
              :style="{'font-family':'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'}"
            >点击前往</el-button>           
        </el-carousel-item>                        
      </el-carousel>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      items: [
        {
          id:'1',
          description: '祈福三周年活动',
          url:'http://act.daoju.qq.com/act/wuxia20180517/index.html?e_code=414983&idataid=214420',
          imageName:'d1765adb60e7c5811f64528c04dd50c8.jpg'
        },
        {
          id:'2',
          description: '天刀三年在线签到',
          url:'http://wuxia.qq.com/cp/a20180515three/index.htm?e_code=415223&idataid=214526',
          imageName:'de2d80c55b810fad8a0c63d2788779e3.jpg'
        },
        {
          id:'3',
          description: '5月26到5月28整点在线',
          url:'http://wuxia.qq.com/cp/a20180524zdzx/index.htm?e_code=414604&idataid=214224',
          imageName:'799f9e1a06fa01217be715ea8690ce14.jpg'
        },
        {
          id:'4',
          description: '手机壳坑钱',
          url:'http://mall.qq.com/wuxia/productlist.shtml?catid=447&e_code=417407&idataid=216053',
          imageName:'3f72e4260d273f7a0fec70efc8ffed84.jpg'
        }
      ]
    }
  },
  mounted:function(){
     console.log('在主页面呢')
  },
  methods: {
    tranferTo(url){
      // console.log(url)
      window.open(url)
    },
    getImageUrl(name){
      // console.log(name)
      // console.log(require('@/assets/images/home-page/'+name))
      // a = {
      //   backgroundImage: 'url('+require('../../assets/images/home-page/'+name) +')'
      // }
      // return a
      // console.log('url('+require('../../assets/images/home-page/'+name) +')')
      // return 'url('+require('../../assets/images/home-page/'+name) +')'
      return 'url('+'../../assets/images/home-page/'+name +');'
    },
    getClassA(name) {
        return "{ background-image: url(../../assets/images/home-page/"+ name +")" + "}"
    }
  }
}
</script>

<style>
  .block{
    font-family:'STXingkai'
  }
  .button{
    /* font-family:'STXingkai'; */
    float: right;
    margin-top:130px;
    margin-right: 20px;
  }
  .el-carousel__item h3 {
    color: #b515ca;
    font-size: 14px;
    opacity: 1;
    line-height: 150px;
    margin: 0;
  }
  .c1{
    cursor:pointer;
    /* width:400px;
    height: 150px; */
    background-image: url('./../../assets/images/home-page/d1765adb60e7c5811f64528c04dd50c8.jpg'); 
    /* background-size: auto; */
    /* background-size:cover; */
    background-repeat:no-repeat;
    /* background-size:300px 100%;  */
  }
  .c2{
    cursor:pointer;
    /* width:400px;
    height: 150px; */
    background-image: url('./../../assets/images/home-page/de2d80c55b810fad8a0c63d2788779e3.jpg'); 
    /* background-size:cover; */
    background-repeat:no-repeat;
  }
  .c3{
    cursor:pointer;
    /* width:400px;
    height: 150px; */
    background-image: url('./../../assets/images/home-page/799f9e1a06fa01217be715ea8690ce14.jpg'); 
    /* background-size:cover; */
    background-repeat:no-repeat;
  }
  .c4{
    cursor:pointer;
    /* width:400px;
    height: 150px; */
    background-image: url('./../../assets/images/home-page/3f72e4260d273f7a0fec70efc8ffed84.jpg'); 
    /* background-size:cover; */
    background-repeat:no-repeat;
  }
  
    .el-carousel__item:nth-child(2n) {
     background-color: #bdccdf;
     /* background-image: url('@/assets/images/home-page/'+{{item.imageName}}); */
     /* background-image:url('./../../assets/images/home-page/d1765adb60e7c5811f64528c04dd50c8.jpg'); */
     cursor:pointer
  }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #95a2af;
     /* background-image: url('@/assets/images/home-page/'+{{item.imageName}}); */
     /* background-image:url('./../../assets/images/home-page/d1765adb60e7c5811f64528c04dd50c8.jpg'); */
     cursor:pointer
  }
</style>