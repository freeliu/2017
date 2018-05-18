/**
 * Created by olive on 2016/11/30.
 * 这是程序入口
 */
import Vue from "vue";
import VueRouter from "vue-router";
import globalFilters from "./assets/js/global-filters.js";
import common from "./assets/js/common.js";

// 加载样式文件
require("./assets/css/main.scss");

//公共方法和数据
window.common = common;

//注册全局过滤器
for (let key in globalFilters) {
  Vue.filter(key, globalFilters[key]);
}
//使用vue路由
Vue.use(VueRouter);

//初始vue根实例
window.vm = new Vue({
  data: {
    userName: "",
    isGoBack: false,
    lastHistoryKey: 0,
  },
  created() {
    if (!common.getCookie(common.cookieKeys.auth) && this.$route.name != "login") {
      this.$router.push("/login");
    } else {
      // alert(this.$route.name)
    }

    //替换用户名
    if (localStorage.getItem("userName")) {
      this.userName = localStorage.getItem("userName");
    }
  },
  methods: {},
  router: new VueRouter({
    mode: "history",
    routes: [
      {path: "/", redirect: "/index"},
      {path: "/index", component: resolve => require(['./pages/index.vue'], resolve)},
      {path: "/pageA", component: resolve => require(['./pages/pageA.vue'], resolve)},
      {path: "/pageB-sub1", component: resolve => require(['./pages/pageB-sub1.vue'], resolve)},
      {path: "/pageB-sub2", component: resolve => require(['./pages/pageB-sub2.vue'], resolve)},
      {path: "/login", component: resolve => require(['./pages/login.vue'], resolve), name: "login"},
      {path: "*", redirect: "/index"}
    ]
  })
}).$mount("#app");

vm.$router.beforeEach((to, from, next) => {
  //监控页面返回
  if(history&&history.state&&history.state.key)
  {
    if (history.state.key > vm.lastHistoryKey&&vm.lastHistoryKey>0) {
      vm.isGoBack = false;
    } else {
      vm.isGoBack = true;
    }
    vm.lastHistoryKey = history.state.key || -1;
  }
  console.log(vm.isGoBack)
  next();
});
vm.$router.afterEach(route => {


})

















