<template>
    <div class="modal-mask" v-show="show">
    <div class="modal-confirm">
      <h2 class="confirm-header">
        <i class="iconfont icon-questioncircle"></i> {{ title }}
      </h2>
      <div class="confirm-content">
        {{ content }}
      </div>
      <div class="confirm-btns">
        <button class="btn" @click="op(1)">取 消</button>
        <button class="btn btn-primary" @click="op(2)">确 定</button>
      </div>
    </div>
  </div>
</template>

<script>
// var element = document.createElement('div');
// element.id = 'V-confirm'
// element.innerHTML = template
// document.body.appendChild(element)

// var setting = {}
//   setting.title = '你确定删除吗?'
//   setting.content = '删除不可以恢复...'
//   setting.onOk = function(){}
//   setting.onCancel = function(){}
   
   
// $confirm.alert(setting)
export default {
  el: '#V-confirm',
  data: {
       show: false,
       onCancel: false,
       onOk: false,
       title: '',
       content: ''
     },
  methods: {  
    op(type){
        this.show = false
        if(type == '1'){
           if(this.onCancel) this.onCancel()
         }else{
         if(this.onOk) this.onOk()
        }
    
         this.onCancel = false
        this.onOk = false
        
         document.body.style.overflow = ''
         },

    alert(setting){
         this.title = setting.title || '标题'
         this.content = setting.content || '内容'
         this.onOk = setting.onOk || false
         this.onCancel = setting.onCancel || false
         this.show = true
         document.body.style.overflow = 'hidden'
     }
  }
}
</script>


<style>

.modal-mask{
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background-color: rgba(55,55,55,.6);
 z-index: 100;
 display: flex;
 align-items: center;
 justify-content: center;
}
.modal-confirm{
 width: 400px;
 box-sizing: border-box;
 padding: 30px 40px;
 background-color: #fff;
 border-radius: 6px;
}
@media only screen and (max-width: 640px) {
 .modal-confirm{
  width: 100%;
  margin: 0 20px;
  padding: 10px 20px; 
 }
}
.modal-enter, .modal-leave {
 opacity: 0;
}
.modal-transition{
 transition: all .3s ease;
}
 
.modal-enter .modal-confirm,
.modal-leave .modal-confirm {
 transform: scale(1.1);
}
.modal-transition{
 transition: all .3s ease;
}

</style>

