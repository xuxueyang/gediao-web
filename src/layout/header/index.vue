<template>
    <div class="footer">
        <el-row :gutter="20">
            <!-- 130 103 198 -->
            <span style="float:left;margin:0px 20px 0px 100px;color:#624D96">青龙gaygay</span>
            <a style="float:center;color:#624D96;margin:0px 0px 0px -100px;" @click="referToHome">主页</a>
            <a style="color:#624D96;margin:0px 0px 0px 200px;" @click="referToUpload">管理</a>
            <el-button size="small " type="info" round class=".info-button" @click="showInfoMessage" style="float:right;margin:12px 20px 0px 0">查看介绍~</el-button>
        </el-row>
        <!-- 浮动显示提示按钮 -->
        <el-dialog  :visible.sync="dialogTabVisible">
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
<script>
export default {
    name: 'qlh-header',
    data() {
        return {
            qlhInfo: '这里是对于夏夜为首的基佬们的介绍~点击跳转~',
            qlhMember: [
                { id: '1', name: '蚂蚱',member: 'mazha'},
                { id: '2', name: '日鸡',member: 'riji'},
                { id: '3', name: '狗丐',member: 'wenjiu'},
                { id: '4', name: '安然',member: 'anran'}
            ],
            webInfo: '这里是对于网站的介绍',
            webAuthorInfo: "地址：http://193.112.161.157:8080/qinglonghui           然后，用法和看到的一样，上传下载列表带名字的查询。                            =。=因为后端2个服务器，文件服务器是前端部署的服务器，不是后端部署的，导致【下载耗时比较（hen）长】（木有办法诶，毕竟没钱，服务器都是1G内存1G带宽，耗不起呀~~~）                           这里完全我自己搭的，所以~~咳咳·~一些资源~~~咳咳·~~~（开玩笑，别上传大的，我怕服务器支持不了挂了2333所以最多能上传200MB的）                           因为总容量不过50GB，再减去乱七八糟的，所以也就20GB能用哈~这里暂时不需要登录啥的，可以传小文件文件备份下载哈，丢失是肯定不会的。",
            tabPosition: 'left',
            dialogTabVisible : false,
            activeName: 'qlh-info',
        }
    },
    methods: {
        showInfoMessage() {
            //调出框显示青龙会的消息介绍
            //TODO 以后增加后台管理网站的接口
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
            console.log('跳转到主页')
            this.$router.history.push('/home')
        },
        referToUpload() {
            console.log('跳转到文件上传页面')
            this.$router.history.push('/manager')
        }
    }
};
</script>
<style lang="scss">
.footer {
    height: 152px;
    width: 100%;
    .info-button{
        margin-left: 200px;
    }
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
</style>