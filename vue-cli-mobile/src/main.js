import 'weui'
import './assets/css/main.scss'
// import './assets/js/polyfill.js'
import weUi from 'weui.js';
import Vue from 'vue'
import router from './router'
import common from './assets/js/common.js'

//封装公共数据和方法
window.common = common;
window.weUi=weUi;

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  data: {},
  router,
  created(){
    let code = common.getUrlParam('code')
    //如果有code的话就登录
    if (code) {
      common.postJson(common.api.login, {code}, function (res) {
        if (res.code = common.api.responseCode.success) {
          localStorage.setItem("auth", res.data.auth);
        } else {
          alert(res.msg);
        }
      })
    }
  }
})

vm.$router.beforeEach((to, from, next) => {
  next()
})
window.rootVm = vm;
wx.ready(function () {
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});


