<template>
    <div>
        <h2 style="margin-bottom:50px;font-family:'STXingkai'">天刀模块</h2>
        <div class="el-row-set">
          <el-row :gutter="40" :style="{'height':'300px'}">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xsrm">

              </div>
            </div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              
            </div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
          </el-row>
        </div>
    </div>
</template>
<script>
// import clickShowImage from '@/components/click-show-image/click-show-image.vue' 
export default {
    name:'tian-dao',
    components:{
      // clickShowImage
    }
}
</script>

<style>
  .xsrm{
    background-image: url('./../../assets/images/tiandao/xinshourumen.jpg')
  }
  .el-col {
    border-radius: 4px;
    height: 100%;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    /* background: #d3dce6; */
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 100%;
  }
</style>