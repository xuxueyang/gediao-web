<template>
<div>
    <div v-if="true">
        <ul class="ul">
            <li><div class="span">青龙gaygay,访问人数：{{visiterCount}}</div></li>
            <li class="li" style="margin-left:100px"><a @click="referToHome">主页</a></li>
            <li class="li"><a @click="referToUpload">管理</a></li>
            <li class="li"><a @click="referToQLH">青龙会</a></li>
            <li class="li"><a @click="referToGD">格调</a></li>
            <li class="li"><a @click="referToBLOG">博客</a></li>
            <li class="rli" style="margin-right:10px"><a  @click="showInfoMessage" >关于</a><li>
            <li class="rli">
                <!--<a  @click="shareToQQ" >分享到qq空间</a>-->
                <share-to-q-q-space v-bind:usestyle="'a'"></share-to-q-q-space>
            </li>
            <li class="rli">
                <div style="width: 100px;">
                    <div style="display:block;float:left"><img border="0" SRC="http://wpa.qq.com/pa?p=1:1059738716:4" alt=" 么么哒的色调"  style="    margin-top: 13px;"/></div>
                    <div><a  @click="linkToMe">联系我~</a ></div>
                </div>
            </li>
        </ul>
    </div>
    <div v-if="false">
        <!-- <el-row :gutter="20">
            <span style="float:left;margin:0px 20px 0px 100px;color:#624D96">青龙gaygay,访问人数：{{visiterCount}}</span>
            <a style="float:center;color:#624D96;margin:0px 0px 0px -100px;" @click="referToHome">主页</a>
            <a style="color:#624D96;margin:0px 0px 0px 200px;" @click="referToUpload">管理</a>
            <el-button size="small " type="info" round class=".info-button" @click="showInfoMessage" style="float:right;margin:12px 20px 0px 0">查看介绍~</el-button>
        </el-row> -->
        <el-row class="header">
            <el-col :span="4"><div>
                <span style="color:#624D96">青龙gaygay,访问人数：{{visiterCount}}</span>
            </div></el-col>
            <el-col :span="2"><div>
                 &nbsp;
            </div></el-col>
            <el-col :span="2"><div>
                <a style="color:#624D96;" @click="referToHome">主页</a>
            </div></el-col>
            <el-col :span="2"><div>
                <a style="color:#624D96;" @click="referToUpload">管理</a>
            </div></el-col>
            <el-col :span="2"><div>
                <a style="color:#624D96;" @click="referToTD">天刀</a>
            </div></el-col>
            <el-col :span="2"><div>
                <a style="color:#624D96;" @click="referToNSH">逆水寒</a>
            </div></el-col>
            <el-col :span="2"><div>
                <a style="color:#624D96;" @click="referToGD">格调</a>
            </div></el-col>
            <el-col :span="2"><div>
               &nbsp;
            </div></el-col>
            <el-col :span="2"><div>
                <el-button size="small" type="info" round class=".info-button" @click="shareToQQ"
                :style="{'font-family':'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'}"
                >分享到qq空间</el-button >
            </div></el-col>
            <el-col :span="2"><div>
                <share-to-q-q-space v-bind:usestyle="'el-button'"></share-to-q-q-space>
                <!--<el-button size="small" type="info" round class=".info-button" @click="showInfoMessage" :style="{'font-family':'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'}">查看介绍~</el-button>-->
            </div></el-col>
            <el-col :span="2"><div @click="linkToMe" style="cursor:pointer">
                <img border="0" SRC="http://wpa.qq.com/pa?p=1:1059738716:4" alt=" 么么哒的色调" />
                <span class="linkMe">联系我~</span >
            </div></el-col>
        </el-row>
    </div>
    <!-- 浮动显示提示按钮 -->
        <el-dialog  :visible.sync="dialogTabVisible" class="show-info">
            <el-tabs :tab-position="tabPosition" style="height: 300px;" v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="青龙会简介" name="qlh-info">
                    <h3>青龙会简介</h3>
                    <div style="margin-bottom:20px">
                        {{qlhInfo}}
                    </div>
                    <!-- 放一些个人的链接 -->
                    <el-button :gutter="20"  v-for="member in qlhMember" :key="member.id"  size="mini" round style="margin-left:25px;background:#DCDFE6">
                        <a @click="referToMemberInfos(member)">
                            <span style="color:#8B6ED6">{{member.name}}</span>
                        </a>
                    </el-button>
                    <!-- <router-link :to="{name:'Index', params: { userId: 123 }}">link</router-link> -->
                </el-tab-pane>
                <el-tab-pane label="网站介绍" name="web-info">
                    <h3>网站介绍</h3>
                    <div>
                        {{webInfo}}
                    </div>
                </el-tab-pane>
                <el-tab-pane label="必看" name="web-author-info">
                    <h3>吐槽诶</h3>
                    <div>
                        {{webAuthorInfo}}
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
</div>
</template>
<script src="http://qzonestyle.gtimg.cn/qzone/app/qzlike/qzopensl.js#jsdate=20111201" charset="utf-8"></script>
<script>
import services from '@/api/file.services'
import shareToQQSpace from '@/components/shareToQQSpace/index'
export default {
  name: 'qlh-header',
  components: {
    shareToQQSpace
  },
    data() {
        return {
            // p : {
            //     url:'193.112.161.157',
            //     showcount:'1',/*是否显示分享总数,显示：'1'，不显示：'0' */
            //     desc:'格调，一个兴趣使然的便签日志管理=。=现在功能暂时只有记录与每日操作统计。还有很多功能待完善，希望能在使用中不断提出需求意见=。=迭代改进；；；现在作为以前测试写的东西的子模块，请忽略其他地方=。=',/*默认分享理由(可选)*/
            //     summary:'欢迎来尝试使用~进群“交流~”~群号：772502467',/*分享摘要(可选)*/
            //     title:'格调~做生活的主人~',/*分享标题(可选)*/
            //     site:'格调',/*分享来源 如：腾讯网(可选)*/
            //     pics:'http://193.112.161.157:8080/resource/images/gediaoQun.png', /*分享图片的路径(可选)*/
            //     style:'101',
            //     width:199,
            //     height:30
            // },
            visiterCount : '0',
            qlhInfo: '这里是对于夏夜为首的基佬们的介绍~点击跳转~',
            qlhMember: [
                { id: '1', name: '蚂蚱',member: 'mazha'},
                { id: '2', name: '日鸡',member: 'riji'},
                { id: '3', name: '狗丐',member: 'wenjiu'},
                { id: '4', name: '安然',member: 'anran'}
            ],
            webInfo: '这里是对于网站的介绍;有事请联系我：色调；qq：1059738716',
            webAuthorInfo: "地址：193.112.161.157           然后，用法和看到的一样，上传下载列表带名字的查询。                            =。=因为后端2个服务器，文件服务器是前端部署的服务器，不是后端部署的，导致【下载耗时比较（hen）长】（木有办法诶，毕竟没钱，服务器都是1G内存1G带宽，耗不起呀~~~）                           这里完全我自己搭的，所以~~咳咳·~一些资源~~~咳咳·~~~（开玩笑，别上传大的，我怕服务器支持不了挂了2333所以最多能上传200MB的）                           因为总容量不过50GB，再减去乱七八糟的，所以也就20GB能用哈~这里暂时不需要登录啥的，可以传小文件文件备份下载哈，丢失是肯定不会的。",
            tabPosition: 'left',
            dialogTabVisible : false,
            activeName: 'qlh-info',
        }
    },
    mounted(){
        //计数
        const url = ''+services.getServiceIp()+'/api/login/visit-count'
        this.$http.post(url,{

        }).then(function(res){
            if(res.data.returnCode.startsWith('200')){
                this.visiterCount = res.data.data;
            }else{
                this.$message({
                    message: '服务器在傲娇QAQ',
                    showClose: true,
                    type: 'error'
                });
                this.$router.push('/400')
            }
        }).catch(function(e){
            this.$message({
                message: '服务器在傲娇QAQ',
                showClose: true,
                type: 'error'
            });
            this.$router.push('/400')
        })
    },
    methods: {
        linkToMe() {
            //联系我，打开qq
            var a = "tencent://message/?uin=1059738716&Site=qq&Menu=yes"
            window.open(a)
        },
        // shareToQQ() {
        //     var s = [];
        //     for(var i in this.p){
        //         s.push(i + '=' + encodeURIComponent(this.p[i]||''));
        //     }
        //     var a = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?"+s.join('&')
        //     window.open(a)
        // },
        showInfoMessage() {
            //调出框显示青龙会的消息介绍
            //TODO 以后增加后台管理网站的接口
            console.log('关于')
            this.dialogTabVisible = true
        },
        handleTabClick() {
            //点击tab时触发（用于获取消息，然后显示）
        },
        referToMemberInfos(member) {
            //拼接跳转链接（一个显示个人信息的页面——其实就是到时候是**/memberinfos?member={{member}}，就可以通过路由解析加载数据获取到
            //TODO 需要一个个人信息表（和user区分开来）
            console.log('**/memberinfos?member='+member.member)
        },
        referToHome() {
            //跳转到主页
            this.$router.history.push('/home')
        },
        referToUpload() {
            this.$router.history.push('/manager')
        },
        referToTD() {
            this.$router.history.push('/tiandao')
        },
        referToNSH() {
            this.$router.history.push('/nishuihan')
        },
        referToGD() {
            this.$router.history.push('/gediao')
        },
        referToQLH(){
            this.$router.history.push('/qlh')
        },
        referToBLOG(){
          this.$router.history.push('/blogCategorys')
        }
    }
};
</script>
<style lang="scss">
.header {
    font-size: 20px;
    font-family:'STXingkai';
    height: 60px;
    width: 100%;
    background-color: #3f3c47ab
}
.show-info{
    font-family:'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'
}
</style>
<style>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
  }
  .bg-purple {
  }
  .bg-purple-light {
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
  .linkMe{
    font-size: 18px;
    font-family:'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif',

  }
</style>
<style>
.ul {
    /* position: fixed;
    top: 0;
    width:100%; */
    list-style-type: none;
    margin-top:0px;
    margin-bottom: 10px;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    box-shadow: 5px 5px 2px #666;
}
.ul .rli{
    float: right;
}
.ul .li{
    margin-left:150px
}
.ul .rli{
   /* font-size: 3px; */
   margin-top:2px
}

.span{
    padding: 14px 16px;
    color: #b7abab;
}
.ul li {
    float: left;
    color:#fff;
}

.ul li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

.ul li a:hover:not(.active) {
    background-color: #111;
}

.ul .active {
    background-color: #4CAF50;
}
</style>
