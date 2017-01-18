import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from 'assets/js/route-config.js'

Vue.use(VueRouter)
const router = new VueRouter({mode: 'history', routers: routers})
/* eslint-disable no-new */
new Vue({
  data: {},
  created: function () {
  },
  mounted: function () {

  },
  router: router
}).$mount('#app')
