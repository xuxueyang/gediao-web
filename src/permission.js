import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/regestry', '/home', '/404', '/401', '/400', '/', '/manager', '/tiandao', '/nishuihan', '/gediao', '/gediao/detail', '/qlh', '/effects', '/gediao/blog', '/blog','/blog/:id','/blogCategorys','/blogs', '/mapEditor'] // 不重定向白名单

const needRedirectList = ['/dashboard', '/example', '/form'] // 需要重定向的名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/dashboard' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // var needRedirect = true
    // console.log(to.path)
    // whiteList.forEach(element => {
    //     if( to.path.startsWith(element)) {
    //       needRedirect = false;
    //     }
    // })、
    // 需要重定向的重定向，不然判断路由是否含有，还有的走进去，不然，就
    // console.log('to.path:' + to.path)
    // console.log(router)
    // 判断当前的是不是和前往的一样
    // console.log('from.path:' + from.path)
    next()
    if (to.path === from.path) {
      // location.reload()
    } else {
      if (needRedirectList.indexOf(to.path) !== -1) {
        next('/401')
        NProgress.done()
      } else if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else if (!!to.path && to.path.startsWith('/blog/')) {
        // 对于含有头:参数的路由
        next()
      } else{
        next('/404')
        NProgress.done()
      }
    }

    // next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
