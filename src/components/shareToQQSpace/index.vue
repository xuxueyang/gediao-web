<template>
  <div>
    <!-- 分享到qq空间的组件-->
    <el-button  v-if="usestyle=='el-button'" size="small" type="info" round class=".info-button" @click="shareToQQ" :key="Math.random()"
               :style="{'font-family':'-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif'}"
    >分享到qq空间</el-button >
    <div   v-if="usestyle=='a'">
      <a  @click="shareToQQ" >分享到qq空间</a>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'shareToQQSpace',
    props:['usestyle'],
    data(){
      return {
        p: {
          url: '193.112.161.157', /* 193.112.161.157,*/
          showcount: '1', /* 是否显示分享总数,显示：'1'，不显示：'0' */
          desc: '格调，一个兴趣使然的便签日志管理=。=', /* 默认分享理由(可选)*/
          summary: '欢迎来尝试使用~进群“交流~”~群号：772502467',/* 分享摘要(可选)*/
          title: '格调~做生活的主人~', /* 分享标题(可选)*/
          site: '格调', /* 分享来源 如：腾讯网(可选)*/
          pics: 'http://193.112.161.157:8080/resource/images/gediaoQun.png', /* 分享图片的路径(可选) */
          style: '101',
          width: 199,
          height: 30
        }
      }
    },
    methods: {
      shareToQQ() {
        var s = []
        // 将p的路由设置为当前路由
        // console.log(this.$route)
        // console.log(this.$router)
        this.p.url = this.p.url + '/' + window.location.hash
        for (var i in this.p) {
          s.push(i + '=' + encodeURIComponent(this.p[i] || ''))
        }
        var a = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&')
        window.open(a)
      }
    }
  }
</script>
<style>

</style>
