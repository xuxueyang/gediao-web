<template>
    <div>
    <article class="form-create-map-base">
        <header>新建一个地图切面</header>
        <div>
            <span>名称:</span>
            <el-input class="inputName" v-model="inputName" placeholder="请输入内容"></el-input>
        </div>
        <div>
            <span>描述:</span>
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="inputDescription">
            </el-input>
        </div>
        <div>
            <span></span>
            <!-- <el-dropdown @command="handleCommand">
                <el-button type="primary">
                    选择创建的type类型<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in types" v-bind:key="index" :command="item.id">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown> -->
              <el-select v-model="mapTypeId" placeholder="选择创建的type类型">
                <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div>
            <span>上传切图</span>
            <el-upload
                class="avatar-uploader"
                action="http://118.25.103.215/api/uaafile/img"
                :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="imagePath" :src="imagePath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- :before-upload="beforeAvatarUpload"> -->
        </div>
        <div class="MapValues">
            <el-button type="primary" plain class="plus" @click="addMapValue">+新增</el-button>
            <mapValue :KeyOptions="KeyOptions" v-for="(item, index) in mapValues" v-bind:key="index" 
            :item="item" 
            @saveSelf="saveSelf"
            @deleteSelf="deleteSelf"></mapValue>
        </div>
        <div>
            <span></span>
            <el-button type="primary" @click="save">创建</el-button>
        </div>
    </article>    
    </div>
</template>

<script>
import map from  "../../../api/map.services";
import mapValue from './map-value'
import services from  "../../../api/file.services";

export default {
    components: {
        mapValue
    },
    mounted () {
        map.getAllMapTypes().then(res => {
            console.log('加载全部type' + res)
            this.types = res.data
        })
    },
    data () {
        return {
            inputName: '',
            inputDescription: '',
            types: [],
            mapTypeId: '',
            imagePath: '',
            KeyOptions: [],
            mapValues: [],
            idMapValue: 0
        }
    },
    methods: {
      save () {
          // 保存
          console.log(this.KeyOptions)
          console.log(this.mapValues)
          const info = {
              mapTypeId: this.mapTypeId,
              object: {},
              imagePath: this.imagePath,
              description: this.inputDescription,
              title: this.inputName
          }
          map.saveMapBase(info).then(res => {
              if (res.returnCode.startsWith('200')) {
                  // 说明创建成功，清空一下？
                    this.$message({
                        type: 'success',
                        showClose:true,
                        message: services.getMessageByCode(res.returnCode)
                    })
              }
          })
      },
      addMapValue () {
          console.log('1' + this.idMapValue)
          this.mapValues.push({key:'',value:'',id: this.idMapValue})
          this.idMapValue  = this.idMapValue + 1
          console.log('2' + this.idMapValue)
      },
      saveSelf (info) {
          // 保存，id,key,value
      },
      deleteSelf (index) {
          // 删除该index的value
          console.log('index:' + index)
          this.mapValues = this.mapValues.filter(t => t.id != index)
      },
      handleCommand(command) {
        // this.$message('click on item ' + command);
        this.mapTypeId = command
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
    //   beforeAvatarUpload(file) {
    //     const isJPG = file.type === 'image/jpeg';
    //     const isLt2M = file.size / 1024 / 1024 < 2;

    //     if (!isJPG) {
    //       this.$message.error('上传头像图片只能是 JPG 格式!');
    //     }
    //     if (!isLt2M) {
    //       this.$message.error('上传头像图片大小不能超过 2MB!');
    //     }
    //     return isJPG && isLt2M;
    //   }
    }
}
</script>

<style lang="scss" scoped>
.form-create-map-base{
    margin-left: 100px;
    border: black 1px solid;
    div {
        // width: 500px;
        margin-top: 10px;
        padding-bottom: 5px;
        padding-top: 5px;
        display: flex;
        max-width: 700px;
        span {
            width: 40px;
            line-height: 30px;
        }
        // background-color: white;
    }
    .MapValues{
        padding-left: 40px;
        border: black 1px solid;
        display: block;
        .plus{
            display: flex;
        }
    }
    .inputName{
        width: 300px;
    }
    .inputDescription{

    }
}

</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
