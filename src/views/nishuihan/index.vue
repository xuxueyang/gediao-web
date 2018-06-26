<template>
    <div>
        <h2 style="margin-bottom:50px;font-family:'STXingkai'">逆水寒</h2>
        <div class="el-row-set">
          <el-row :gutter="40" :style="{'height':'300px'}">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xsrm" @click="transferToXSRM()" @mouseenter="showXSRM=true" @mouseleave="showXSRM=false">
                  <div class="title-span">新手入门
                  </div>
                  <div class="introduce-div">
                      <transition name="donghua">
                         <p v-show="showXSRM">这是一段简单的介绍</p>
                     </transition>
                  </div>
              </div>
            </div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xbb" @click="transferToXBB()" @mouseenter="showXBB=true" @mouseleave="showXBB=false">
                  <div class="title-span">
                    最新版本
                  </div>
                  <div class="introduce-div">
                      <transition name="donghua">
                         <p v-show="showXBB">这是一段简单的介绍</p>
                     </transition>
                  </div>                  
              </div>              
            </div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
          </el-row>
          
          <el-row :gutter="40" :style="{'height':'300px','margin-top':'50px'}">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xsrm" @click="transferToFBGL()" @mouseenter="showFBGL=true" @mouseleave="showFBGL=false">
                  <div class="title-span">副本攻略</div>
                  <div class="introduce-div">
                      <transition name="donghua">
                         <p v-show="showFBGL">这是一段简单的介绍</p>
                     </transition>
                  </div>                     
              </div>
            </div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xbb" @click="transferToHDRC()"  @mouseenter="showHDRC=true" @mouseleave="showHDRC=false">
                  <div class="title-span">
                    活动日常
                  </div>
                  <div class="introduce-div">
                      <transition name="donghua">
                         <p v-show="showHDRC">这是一段简单的介绍</p>
                     </transition>
                  </div>                     
              </div>              
            </div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
          </el-row>
        </div>

          <el-row :gutter="40" :style="{'height':'300px','margin-top':'50px'}">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div>&nbsp;</div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple">
              <div class="xsrm" @click="transferToZYJT()" @mouseenter="showZYJT=true" @mouseleave="showZYJT=false">
                  <div class="title-span">职业精通</div>
                  <div class="introduce-div">
                      <transition name="donghua">
                         <p v-show="showZYJT">这是一段简单的介绍</p>
                     </transition>
                  </div>                     
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
        showXSRM:false,
        showXBB:false,
        showFBGL:false,
        showZYJT:false,
        showHDRC:false,
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
            p{
                margin: auto;
                width: 90%;
                height: 60px;
                text-align: center;
                background-color: rgba(131, 202, 137, 0.39);
            } 
            .donghua-enter-active,.donghua-leave-active{
                transition: 2s all ease;
            }
            .donghua-enter-active{
                opacity: 1;
                width: 90%;
                height: 60px;
            }
            .donghua-leave-active{
                opacity: 0;
                widows: 90%;
                height: 60px;
            }
            .donghua-enter,.donghua-leave{
                opacity: 0;
                width: 90%;
                height: 60px;
            }
</style>
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
  .introduce-div{
    padding-top: 180px;
    font-size: 26px;
    font-family:'STXingkai';
    text-align: center;
    widows: 100%;
    height: 100px;
  }
  .title-span{
    padding-top: 18px;
    font-size: 33px;
    font-family:'STXingkai';
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