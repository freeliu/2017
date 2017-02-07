import Vue from 'vue'
import Router from 'vue-router'
// import Hello from 'components/Hello'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/index'},
    {path: '/index', component: (resolve) => require(['../pages/index.vue'], resolve)},
    {path: '/page1', component: (resolve) => require(['../pages/page1.vue'], resolve)},
    {path: '/page2', component: (resolve) => require(['../pages/page2.vue'], resolve)},
    {path: '*', redirect: '/index'}
  ]
})
