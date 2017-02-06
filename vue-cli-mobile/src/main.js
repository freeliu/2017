/**
 * Created by olive on 2017/01/25.
 * 这是程序入口
 */

import 'weui';
import './assets/css/main.scss';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import globalFilters from './assets/js/global-filters.js';
// import common from './assets/js/common.js';
import weui from 'weui.js';

window.weui=weui;

// 注册全局过滤器
// for (let key in globalFilters) {
//   Vue.filter(key, globalFilters[key]);
// }
// 使用vue路由
Vue.use(VueRouter);

// 初始vue根实例
window.vm = new Vue({
  data: {
    userName: '',
    isGoBack: false,
    lastHistoryKey: 0,
  },
  created() {
    // 替换用户名
    if (localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName');
    }
  },
  methods: {},
  router: new VueRouter({
    mode: 'history',
    routes: [
      {path: '/', redirect: '/index'},
      {path: '/index', component: (resolve) => require(['./pages/index.vue'], resolve)},
      {path: '/page1', component: (resolve) => require(['./pages/page1.vue'], resolve)},
      {path: '/page2', component: (resolve) => require(['./pages/page2.vue'], resolve)},
      {path: '*', redirect: '/index'},
    ],
  }),
}).$mount('#app');

vm.$router.beforeEach((to, from, next) => {
  // 监控页面返回
  if (history && history.state && history.state.key) {
    if (history.state.key > vm.lastHistoryKey) {
      vm.isGoBack = false;
    } else {
      vm.isGoBack = true;
    }
    vm.lastHistoryKey = history.state.key || -1;
  }
  next();
});
vm.$router.afterEach((route) => {


});


