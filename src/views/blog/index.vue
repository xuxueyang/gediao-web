<template>
  <div>
    <div class="blogLook">
      <div role="tablist" class="Tabs" >
        <!--<li role="tab" class="Tabs-item" aria-controls="Topstory-recommend">-->
          <!--<a class="Tabs-link is-active">推荐</a>-->
        <!--</li>-->
        <!--<li role="tab" class="Tabs-item Tabs-item&#45;&#45;noMeta" aria-controls="Topstory-follow"><a class="Tabs-link" href="/follow">关注</a></li>-->
        <!--<li role="tab" class="Tabs-item Tabs-item&#45;&#45;noMeta" aria-controls="Topstory-hot"><a class="Tabs-link" href="/hot">热榜</a></li>-->

      <div class="eachDiv" v-for="category in blogCategory" v-bind:key="blogCategory.id">
        <div  class="blogEachDiv" @click="lookBlogCategory(category.name)">
        <div class="blogEachDivDiv" >
          <div class="EachTitleDiv" itemscope>
            <!--<meta itemprop="url" content="https://www.zhihu.com/question/275611095">-->
            <meta itemprop="name" :content="category.name">
            <a target="_blank" data-za-detail-view-element_name="Title" >{{category.name}}</a>
          </div>
          <div class="EachContentDiv" :id="'EachContentDiv'+ category.id">
            <div v-if="category.imgUrl" style="display: flex">
              <img :src="category.imgUrl" class="titleImg">
            </div>
            {{category.introduce===null?'':category.introduce.substring(0,category.introduce.length-1>40?40:category.introduce.length)}}
          </div>
          <div class="EachOtherDiv" >
            这是点赞、评论点击、分享、收藏、感谢、 爱好评价的数目
            <!--private int blogCount;-->
            <!--private String createdNickName;-->
            <!--private int lookCount;-->
            <!--private int praiseCount;-->
            <!--private int collectCount;-->
            <!--private int commentCount;-->
          </div>
          <!--<a @click="lookBlog(blog.id)">查看编辑</a>-->
        </div>
        </div>
      </div>
      </div>

    </div>
  </div>
</template>
<script>
  import services from  "../../api/file.services";

  export default {
    components:{
    },
    data() {
      return {
        blogCategory: [

        ]
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      // turnToBlogDetail(blogId){
      //   window.open(window.location.origin + '/#/blog/' + blogId)
      // },
      init(){
        this.getAllBlogCategory()
      },
      getAllBlogCategory() {
        // 获取到所有的博客分类
        var url = '' + services.getServiceIp() + '/api/app/blog/categorys'
        this.$http.get(url,{
        }).then(function (res) {
          if(res.data.returnCode.startsWith('200')) {
            this.blogCategory = res.data.data
            this.$message({
              type: 'success',
              showClose:true,
              message: services.getMessageByCode(res.data.returnCode)
            })
          }else {
            this.$message({
              type: 'error',
              showClose: true,
              message: services.getMessageByCode(res.data.returnCode)
            })
          }

        })
      },
      lookBlogCategory(categoryName) {
        // 跳转到编辑页面（和新增页面一样，区别在于，如果没有，会创建）（带有查询ID，如果没有，则视为创建)
        this.$router.push(
          {path: '/blogs' + "?categoryName="+categoryName}
        )
      }
    }
  }
</script>
<style scoped>
.blogLook{
  width: 100%;
  height: 100%;
  min-height: 600px;
  margin: auto;
  background-color: white;
}
.Tabs{
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}
.eachDiv{
  width: 25%;
  display: inline-block;
  border:1px solid #96c2f1;
  margin-left: 5px;
  margin-right: 5px;
}
.blogLook .blogEachDiv{
  margin-top: 10px;
  width: 100%;
  height: 225px;
  cursor: pointer;
  text-align: left;
  /*border-bottom: 3px solid #F0F2F7;*/
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
  /*.Tabs-item {*/
    /*list-style-type: none;*/
    /*padding-left: 20px;*/
    /*width: 80px;*/
    /*font-size: 20px;*/
    /*padding-top: 10px;*/
    /*font-weight: bold;*/
    /*padding-bottom: 5px;*/
  /*}*/
  /*.Tabs-link.is-active::after{*/
    /*position: relative;*/
    /*font-size: 15px;*/
    /*width: 30px;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*height: 3px;*/
    /*background: #0084FF;*/
    /*content: '';*/
  /*}*/
  .titleImg{
    height: 100%;
    width: 190px;
  }
</style>
