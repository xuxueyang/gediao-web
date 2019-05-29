import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/errorpages//404'), hidden: true },
  { path: '/401', component: () => import('@/errorpages/401'), hidden: true },
  { path: '/400', component: () => import('@/errorpages/400'), hidden: true },

  { path: '/tiandao', component: () => import('@/views/tiandao/index'), hidden: true },
  { path: '/nishuihan', component: () => import('@/views/nishuihan/index'), hidden: true },
  { path: '/gediao', component: () => import('@/views/gediao/index'), hidden: true },
  { path: '/gediao/detail', component: () => import('@/views/gediao/log-each-manager/show-detail'), hidden: true },
  { path: '/blogCategorys', component: () => import('@/views/blog/index'), hidden: true },
  { path: '/blogs', component: () => import('@/views/blog/blog-list-item/index'), hidden: true },
  { path: '/mapEditor', component: () => import('@/views/map-editor/index'), hidden: true},
  { path: '/gediao/blog', component: () => import('@/views/gediao/blog-manager/blog-add-update'), hidden: true },
  { path: '/blog/:id', component: () => import('@/views/blog/show-blog-detail/index'), hidden: true },
  { path: '/manager', component: () => import('@/views/manager/index'), hidden: true },
  { path: '/regestry', component: () => import('@/views/reg/index'), hidden: true },
  { path: '/', redirect: '/gediao', component: () => import('@/views/gediao/index'), hidden: true },
  { path: '/home', component: () => import('@/views/home/index'), hidden: true },
  { path: '/qlh', component: () => import('@/views/qlh/index'), hidden: true },

  { path: '/effects/type-effects', component: () => import('@/views/effects/type-effects/index'), hidden: true },
  { path: '/effects/express',      component: () => import('@/views/effects/express/index'), hidden: true }

  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

