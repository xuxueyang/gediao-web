<template>
  <div class="Member-item-container" @click.stop="onToDo">
    <div class="item-name">{{data.nickName}}</div>
    <div class="item-footer">
      <div class="app-status" v-if="appStatus">{{appStatus}}</div>
      <div class="action-container">
        <el-tooltip class="item" effect="dark" content="发起申请" placement="bottom">
          <i @click.stop="onApply" class="fa fa-edit"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="编辑应用" placement="bottom">
          <i @click.stop="onEditApplication" class="fa fa-edit"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除应用" placement="bottom">
          <el-popover
            ref="deletePopover"
            width="220">
            <i slot="reference" class="fa fa-edit"></i>
            <p>确认删除该分支吗</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="cancelDelete">取消</el-button>
              <el-button type="primary" size="mini" @click="onDeleteMember">确定</el-button>
            </div>
          </el-popover>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'MemberItem',
    props: {
      data: {
        type: Object,
        default: () => {
        }
      },
    },
    computed: {
      appStatus(){
        let status = '';
        switch (this.data.status) {
          case 'UP':
            status = '应用未发布';
            break;
          case 'SP':
            status = '有未发布更改';
            break;
          default:
            break;
        }
        return status;
      }
    },
    methods: {
      // 编辑应用
      onEditMember(){
        this.$emit('onEditMember', {id: this.data.id});
      },
      // 发起申请
      onApply(){
        this.$emit('onApply', {id: this.data.id});
      },
      // 取消删除
      cancelDelete(){
        this.$refs.deletePopover.doClose();
      },
      // 删除应用
      onDeleteApplication(){
        this.$emit('onDeleteMember', {id: this.data.id});
        this.$refs.deletePopover.doClose();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./member-item.scss";
</style>