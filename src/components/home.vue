import header from './layout/header'

<template>

  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-on:click="showMessage">
        <h2>~欢迎来到狗五毒的空间~</h2>
        <p v-if="seen">{{showMsg}}</p>
    </div>
    <ul>
      <li>
        <a
          target="_blank"
        >
          虽然现在还什么都没有，但是期待以后你的来访~
        </a>
      </li>
      <br>
      <br>
      <li>
        <a
          href="http://www.baidu.com/"
          target="_blank"
        >
         ~去百度一下吧~
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showMsg: '',
      seen: false
    }
  },
  methods:{
      showMessage:function(){
        this.showMsg = '这是一个小彩蛋~：5200 ~么么哒~'
        this.seen = !this.seen;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
