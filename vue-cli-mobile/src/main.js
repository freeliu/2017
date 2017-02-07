// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'weui'
import 'normalize.css'
import './assets/css/main.scss'

import Vue from 'vue'
// import App from './App'
import router from './router'

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  data: {
    // isGoBack: false,
    // lastHistoryKey: 0
  },
  router
})

vm.$router.beforeEach((to, from, next) => {
  // 监控页面返回
/*  if (history && history.state && history.state.key) {
    if (history.state.key > vm.lastHistoryKey) {
      vm.isGoBack = false
    } else {
      vm.isGoBack = true
    }
    vm.lastHistoryKey = history.state.key || 1
    console.log(history.state.key);
  }*/
  next()
})
window.rootVm = vm;
