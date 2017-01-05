// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import routerConfig from "assets/js/router-config.js"
import globalFilters from "assets/js/global-filters.js"

//使用路由
Vue.use(VueRouter);

//注册全局过滤器
for (let key in globalFilters) {
    Vue.filter(key, globalFilters[key]);
}

const routes = routerConfig;
const router = new VueRouter({
    // mode: "history",  使用历史模式,http://router.vuejs.org/zh-cn/essentials/history-mode.html
    routes // （缩写）相当于 routes: routes
});

new Vue({
    el: '#app',
    router
})

//引入样式文件
require("./assets/css/main.scss");
