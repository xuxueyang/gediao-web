import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Immutable from 'immutable'
Vue.use(Immutable)

// https://blog.csdn.net/qq_25804071/article/details/70911421
// https://blog.csdn.net/liang377122210/article/details/77864378
require('vue2-animate/dist/vue2-animate.min.css')
require('animate.css/animate.min.css')

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import 'font-awesome/scss/font-awesome.scss'
// import FileApi from '@/api/file.js'
// Vue.prototype.$FileApi = FileApi
import VueImgInputer from './components/imgupload/imgupload.vue'

Vue.component('VueImgInputer', VueImgInputer)

import qlhHeader from './layout/header/index.vue'
Vue.component('qlh-header', qlhHeader)

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
