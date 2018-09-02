<template>
  <div id="app">
    <div>
      <qlh-header></qlh-header>
    </div>
    <!-- <div>
      <el-main>
        <router-view class="font-class"></router-view>
      </el-main>
    </div>
    <div> <el-footer>有什么问题请点击右上角联系我色调~~;格调群号：772502467</el-footer></div> -->
    <div>
    <el-container>
      <el-main>
        <router-view class="font-class"></router-view>
      </el-main>
      <!-- <el-footer ><p>有什么问题请点击右上角联系我色调~~;格调群号：772502467</p></el-footer> -->
    </el-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  componets: {
  },
  mounted(){
    //  重写一些方法，兼容浏览器
    if (typeof String.prototype.startsWith != 'function') {
      String.prototype.startsWith = function (prefix){
        return this.slice(0, prefix.length) === prefix;
      };
    }

  }
}
</script>
<style>
#app{
  background-color: rgba(233, 238, 243, 0.8);
}
  .font-class{
  }
  .el-header, .el-footer {
    background-color: rgba(233, 238, 243, 1);
    color: #333;
    text-align: center;
    font-size: 10px;
    /* line-height: 60px; */
  }



  .el-main {
    background-color: rgba(233, 238, 243, 0.8);
    color: #333;
    text-align: center;
    min-height:800px;
    /* line-height: 1600px; */
    /* height: 80%; */
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    /* line-height: 260px; */
  }

  .el-container:nth-child(7) .el-aside {
    /* line-height: 320px; */
  }
</style>
