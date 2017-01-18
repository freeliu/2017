/**
 * Created by olive on 2017/1/16.
 * 抽离出来的路由配置，没main.js引用
 */
// 正常加载
// import Index from './pages/Index'
// 懒加载
// const User = resolve => require(['./pages/User.vue'], resolve)
import index from '../../pages/index.vue'
import login from '../../pages/login.vue'

export default [
  {path: '/', component: index},
  {path: '/index', component: index},
  {path: '/login', component: login},
  {path: '*', redirect: '/login'}
]
