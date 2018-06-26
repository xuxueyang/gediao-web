<template>
    <div>
        <h2 style="margin-bottom:50px;font-family:'STXingkai'">天涯明月刀</h2>
        <div class="el-row-set">
          <el-row :gutter="40" :style="{'height':'300px'}">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xsrm" @click="transferToXSRM()">
                  <div class="title-span">新手入门</div>
              </div>
            </div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xbb" @click="transferToXBB()">
                  <div class="title-span">
                    最新版本
                  </div>
              </div>              
            </div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
          </el-row>
          
          <el-row :gutter="40" :style="{'height':'300px','margin-top':'50px'}">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xsrm" @click="transferToFBGL()">
                  <div class="title-span">副本攻略</div>
              </div>
            </div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xbb" @click="transferToHDRC()">
                  <div class="title-span">
                    活动日常
                  </div>
              </div>              
            </div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
          </el-row>
        </div>

          <el-row :gutter="40" :style="{'height':'300px','margin-top':'50px'}">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xsrm" @click="transferToZYJT()">
                  <div class="title-span">职业精通</div>
              </div>
            </div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xbb">
                  <div class="title-span">
                    未完待续....
                  </div>
              </div>              
            </div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
          </el-row>
    </div>
</template>


<script>
// import clickShowImage from '@/components/click-show-image/click-show-image.vue' 
export default {
    name:'tian-dao',
    data() {
      return {
         p : {
            url:location.href,
            showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
            desc:'因为我是gay',/*默认分享理由(可选)*/
            summary:'么么哒',/*分享摘要(可选)*/
            title:'天刀蔷薇青龙会',/*分享标题(可选)*/
            site:'',/*分享来源 如：腾讯网(可选)*/
            pics:'', /*分享图片的路径(可选)*/
            style:'101',
            width:199,
            height:30
        }
      }
    },
    components:{
      // clickShowImage
    },
    mounted(){
    },
    methods:{
      transferToXSRM(){
        window.open("https://pay.qq.com/")
      },
      transferToXBB() {
        window.open("http://wuxia.qq.com/act/a20160423station/camp.shtml?ADTAG=media.buy.sogoukeyword.fppc_td_100016")
      },
      transferToFBGL() {
        window.open("http://wuxia.qq.com/act/a20160423station/camp.shtml?ADTAG=media.buy.sogoukeyword.fppc_td_100016")
      },
      transferToHDRC() {
        window.open("http://wuxia.qq.com/act/a20160423station/camp.shtml?ADTAG=media.buy.sogoukeyword.fppc_td_100016")
      },
      transferToZYJT() {
        window.open("http://wuxia.qq.com/act/a20160423station/camp.shtml?ADTAG=media.buy.sogoukeyword.fppc_td_100016")        
      }
    }
}
</script>

<style>
  .xsrm{
    background-image: url('./../../assets/images/tiandao/xinshourumen.jpg');
    width :100%;
    height: 100%;
    background-size:cover;
    cursor:pointer
  }
  .xbb{
    background-image: url('./../../assets/images/tiandao/dh-xbb.jpg');
    width :100%;
    height: 100%;
    background-size:cover;   
    cursor:pointer
  }
  .title-span{
    padding-top: 18px;
    font-size: 40px;
    text-align: center;
    color: #ad29eb;
  }
  .el-col {
    border-radius: 4px;
    height: 100%;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 100%;
  }
</style>