<template>
  <div id="app">
    <el-container>
      <el-header><qlh-header></qlh-header></el-header>
      <el-main>
        <router-view class="font-class"></router-view>
      </el-main>
      <el-footer>有什么问题请点击右上角联系我色调~~;格调群号：772502467</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  componets: {
  }
}
</script>
<style>
  .font-class{
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  

  
  .el-main {
    background-color: #E9EEF3;
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
