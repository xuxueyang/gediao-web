<template>
<div>
    <el-button class="addBlog" @click="addBlog()">添加博客</el-button>
    <div>
        <div v-for="(blog,index) in blogs" v-bind:key="blog.id">
            <div class="liblog">
                <span>{{index+1}}:</span>
                <span>{{blog.title}}</span>
                <div class="option">
                  <div>
                    <el-select v-model="blog.permissionType" placeholder="请选择博客的权限" @change="changeStatus($event,blog,index)" >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div  class="look" @click="updateBlog(blog.id)">编辑</div>
                </div>


            </div>
        </div>
    </div>
</div>
</template>
<script>
import services from "../../../api/file.services";

export default {
  name: 'blog-manager',
  data() {
    return {
      options:[
        {
          label: '仅自己可见',
          value: 'OnlyOne'
        },
        // {
        //   label: '验证可见',
        //   value: 'CanKey'
        // },
        {
          label: '所有人可见',
          value: 'NoLimit'
        }
      ],
      // 缓存一份
      blogs_tmp: [],
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
    this.getAllBlog()
  },
  methods: {
    changeStatus(event, blogItem, index) {
      // TODO 修改某个blog的权限
      // console.log(blogItem)
      var url = '' + services.getServiceIp()+"/api/app/blog/blog/updatePermission"
      const body = {
        id: blogItem.id,
        token: services.getToken(),
        permissionType: blogItem.permissionType
      }
      this.$http.post(url, body).then(function(res) {
        if (res.data.returnCode.startsWith('200')) {
          this.$message({
            type: 'success',
            showClose: true,
            message: services.getMessageByCode(res.data.returnCode)
          })
          // 更新本地缓存
          this.blogs_tmp[index].permissionType = this.blogs[index].permissionType
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: services.getMessageByCode(res.data.returnCode)
          })
          // 回滚
          this.blogs[index].permissionType = this.blogs_tmp[index].permissionType
        }
      }).catch(function(res) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '服务器正在抢修中~保存详情失败'
        })
        this.returnGediao()
      })
    },
    getAllBlog() {
      // 获取到所有的博客
      const token = services.getToken()
      var url = '' + services.getServiceIp()+"/api/app/blog/blogs"+"?token="+token + '&page=0'
      this.$http.get(url, {
      }).then(function(res) {
        if(res.data.returnCode.startsWith("200")) {
          this.blogs = res.data.data
          this.blogs_tmp = JSON.parse(JSON.stringify(res.data.data))
          this.$message({
            type:"success",
            showClose:true,
            message: services.getMessageByCode(res.data.returnCode)
          })
        } else {
          this.$message({
            type:"error",
            showClose:true,
            message: services.getMessageByCode(res.data.returnCode)
          })
        }

      })
    },
    addBlog() {
      // 跳转到新增页面
      this.$router.push(
        { path: '/gediao/blog' }
      )
    },
    updateBlog(id) {
      // 跳转到编辑页面（和新增页面一样，区别在于，如果没有，会创建）（带有查询ID，如果没有，则视为创建)
      this.$router.push(
        { path: '/gediao/blog?blogId=' + id }
      )
    }
  }
}
</script>
<style scoped>
.addBlog{
  display: flex;
  margin-bottom: 20px;
}
.liblog{
  display: flex;
  width: 80%;
  height: 50px;
  /*font-size: 17px;*/
}
.option{
  display: flex;
  margin-right: 0px;
  margin-left: auto;
  margin-bottom: auto;
}
.look{
  cursor: pointer;
  width: 50px;
  height: 20px;
  margin-top:18px;
  border-bottom-color: black;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  margin-left: 10px;
}
.look:hover{
  border-bottom-color: black;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-right-color: black;
  border-right-style: solid;
  border-right-width: 2px;
  height: 20px;
  background-color: #ff4d65;
  font-weight: bold;
}
</style>
