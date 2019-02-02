<template>
  <div>
    <div class="blogLook">
      <ul role="tablist" class="Tabs">
        <li role="tab" class="Tabs-item" aria-controls="Topstory-recommend">
          <a class="Tabs-link is-active">推荐</a>
        </li>
        <!--<li role="tab" class="Tabs-item Tabs-item&#45;&#45;noMeta" aria-controls="Topstory-follow"><a class="Tabs-link" href="/follow">关注</a></li>-->
        <!--<li role="tab" class="Tabs-item Tabs-item&#45;&#45;noMeta" aria-controls="Topstory-hot"><a class="Tabs-link" href="/hot">热榜</a></li>-->
      </ul>
      <div v-for="blog in blogs" v-bind:key="blog.id">
        <div  class="blogEachDiv">
        <div class="blogEachDivDiv" >
          <div class="EachTitleDiv" itemscope>
            <!--<meta itemprop="url" content="https://www.zhihu.com/question/275611095">-->
            <meta itemprop="name" :content="blog.title">
            <a target="_blank" data-za-detail-view-element_name="Title" @click="turnToBlogDetail(blog.id)">{{blog.title}}</a>
          </div>
          <div class="EachContentDiv" :id="'EachContentDiv'+ blog.id">
            <div v-if="blog.titleImg && blog.titleImg.path" style="display: flex">
              <img :src="blog.titleImg.path" class="titleImg">
            </div>
            {{blog.previewContent.substring(0,blog.previewContent.length-1>40?40:blog.previewContent.length)}}
          </div>
          <div class="EachOtherDiv" >
            这是点赞、评论点击、分享、收藏、感谢、 爱好评价
          </div>
          <!--<a @click="lookBlog(blog.id)">查看编辑</a>-->
        </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import services from "../../../api/file.services";
import services from  "../../../api/file.services";
  export default {
    components:{
    },
    data() {
      return {
        blogCategoryName: "",
        blogId: '',
        blogs: [
          //   {
          //     title: '测试博客1',
          //     id: '1',
          //     createDate: '',
          //     updateDate: '',
          //     readCount: 4,
          // },{
          //     title: '测试博客2',
          //     id: '2',
          //     createDate: '',
          //     updateDate: '',
          //     readCount: 4,
          // },{
          //     title: '测试博客3',
          //     id: '3',
          //     createDate: '',
          //     updateDate: '',
          //     readCount: 4,
          // }
        ]
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      turnToBlogDetail(blogId){
        window.open(window.location.origin + '/#/blog/' + blogId)
      },
      init(){
          this.blogCategoryName = this.$route.query.categoryName;
          if(this.$route.query.blogId==null||this.$route.query.blogId==undefined){
            this.getAllBlog()
          }else{
            this.blogId = this.$route.query.blogId
          }
      },
      getAllBlog() {
        // 获取到所有的博客
        var url = '' + services.getServiceIp() + '/api/app/blog/blogs' + '?page=0'
        if(this.blogCategoryName){
          url = url + "&categoryName="+this.blogCategoryName
        }
        this.$http.get(url,{
        }).then(function (res) {
          if(res.data.returnCode.startsWith('200')) {
            this.blogs = res.data.data
            this.$message({
              type: 'success',
              showClose:true,
              message: services.getMessageByCode(res.data.returnCode)
            })
            // for(var i=0;i<this.blogs.length;i++){
            //   if(window.document.getElementById('EachContentDiv'+ this.blogs[i].id)){
            //     window.document.getElementById('EachContentDiv'+ this.blogs[i].id).innerHTML = this.blogs[i].content.substring(0,this.blogs[i].content.length-1>40?40:this.blogs[i].content.length)
            //   }
            // }
          }else {
            this.$message({
              type: 'error',
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
          }

        })
      },
      lookBlog(id) {
        // 跳转到编辑页面（和新增页面一样，区别在于，如果没有，会创建）（带有查询ID，如果没有，则视为创建)
        this.$router.push(
          {path: '/blog/' + id}
        )
      }
    }
  }
</script>
<style scoped>
.blogLook{
  width: 960px;
  margin: auto;
  background-color: white;
}
.Tabs{
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.blogLook .blogEachDiv{
  margin-top: 10px;
  width: 100%;
  height: 225px;
  text-align: left;
  border-bottom: 3px solid #F0F2F7;
}
.blogLook .blogEachDiv .blogEachDivDiv{
  width: 90%;
  margin: auto;
  height: 30px;
}
.blogLook .blogEachDiv .blogEachDivDiv .EachTitleDiv{
  font-size: 18px;
  font-weight: 600;
  font-synthesis: style;
  line-height: 1.6;
  color: #1A1A1A;
  margin-top: -4px;
  margin-bottom: -4px;
  display: block;
}
.blogLook .blogEachDiv .blogEachDivDiv .EachTitleDiv:hover{
  color: #00a0e9;
}
.blogLook .blogEachDiv .blogEachDivDiv .EachContentDiv{
  margin-top: 10px;
  height: 130px;
}
.blogLook .blogEachDiv .blogEachDivDiv .EachOtherDiv{
  margin-top: 10px;
  height: 40px;
}
  .Tabs-item {
    list-style-type: none;
    padding-left: 20px;
    width: 80px;
    font-size: 20px;
    padding-top: 10px;
    font-weight: bold;
    padding-bottom: 5px;
  }
  .Tabs-link.is-active::after{
    position: relative;
    font-size: 15px;
    width: 30px;
    right: 0;
    bottom: 0;
    left: 0;
    height: 3px;
    background: #0084FF;
    content: '';
  }
  .titleImg{
    height: 100%;
    width: 190px;
  }
</style>
