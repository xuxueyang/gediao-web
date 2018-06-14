<template>
  <div class="create-member-container" @click="createMemember">
    <i class="fa fa-plus-circle"></i>
    <div class="add-text">注册成员</div>
  </div>
</template>

<script>
  export default{
    name: 'create-memember',
    methods:{
      createMemember(){
          this.$emit('onMememberCreate');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import './create-member.scss';
</style>