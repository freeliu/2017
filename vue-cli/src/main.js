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

  },
  created() {
    if (!localStorage.getItem("auth") && window.location.href.indexOf("execute-course") > -1 && window.location.href.indexOf("login") == -1) {
      sessionStorage.setItem('from', window.location.href);
    }
    //检查登录
    if (!localStorage.getItem("auth") && window.location.hash.indexOf("login") == -1) {
      this.$router.push("/login");
    }
    //替换用户名
    if (localStorage.getItem("userName")) {
      this.userName = localStorage.getItem("userName");
    }
  },
  methods: {
    //根据id获取指标类型
    getIndicateTypeById: function (id) {
      let self = this;
      for (let i = 0; i < self.indicateTypes.length; i++) {
        if (self.indicateTypes[i].id == id) {
          return self.indicateTypes[i];
        }
      }
    },

    //根据id获取子指标列表
    getIndicateListById: function (id) {
      let self = this;
      //第二级指标
      let type = self.getIndicateTypeById(id);
      if (type) {
        if (type.list.length === 0) {
          //其它页面可能已经获取过数据，没有数据才去获取，提高性能
          self.getIndicateTypeList(type.id, function () {
            return self.getIndicateTypeById(id);
          })
        } else {
          return type.list;
        }
      }
      //第三级指标循环
      for (let i = 0; i < self.indicateTypes.length; i++) {
        for (let j = 0; j < self.indicateTypes[i].list.length; j++) {
          if (self.indicateTypes[i].list[j].id == id) {
            return self.indicateTypes[i].list[j].list;
          }
        }
      }
      //第四级指标循环
      for (let i = 0; i < self.indicateTypes.length; i++) {
        for (let j = 0; j < self.indicateTypes[i].list.length; j++) {
          for (let k = 0; k < self.indicateTypes[i].list[j].list.length; k++) {
            if (self.indicateTypes[i].list[j].list[k].id == id) {
              return self.indicateTypes[i].list[j].list[k].list;
            }
          }
        }
      }

    },
    //根据id获取指标对象，并去除list属性
    getIndicateInfoWithoutListById: function (id) {
      let self = this, retObj = {};
      //第一级指标
      let type = self.getIndicateTypeById(id);
      if (type) {
        retObj = JSON.parse(JSON.stringify(type));
        delete retObj.list;
        return retObj;
      }
      //第二级指标
      for (let i = 0; i < self.indicateTypes.length; i++) {
        for (let j = 0; j < self.indicateTypes[i].list.length; j++) {
          if (self.indicateTypes[i].list[j].id == id) {
            retObj = JSON.parse(JSON.stringify(self.indicateTypes[i].list[j]));
            delete retObj.list;
            return retObj;
          }
        }
      }
      //第三级指标
      for (let i = 0; i < self.indicateTypes.length; i++) {
        for (let j = 0; j < self.indicateTypes[i].list.length; j++) {
          for (let k = 0; k < self.indicateTypes[i].list[j].list.length; k++) {
            if (self.indicateTypes[i].list[j].list[k].id == id) {
              retObj = JSON.parse(JSON.stringify(self.indicateTypes[i].list[j].list[k]));
              delete retObj.list;
              return retObj;
            }
          }
        }
      }
      ;

      //第四级指标
      for (let i = 0; i < self.indicateTypes.length; i++) {
        for (let j = 0; j < self.indicateTypes[i].list.length; j++) {
          for (let k = 0; k < self.indicateTypes[i].list[j].list.length; k++) {
            for (let m = 0; m < self.indicateTypes[i].list[j].list[k].list.length; m++) {
              if (self.indicateTypes[i].list[j].list[k].list[m].id == id) {
                retObj = JSON.parse(JSON.stringify(self.indicateTypes[i].list[j].list[k].list[m]));
                delete retObj.list;
                return retObj;
              }
            }
          }
        }
      }

    },

    //获取指标类型的数据
    getIndicateTypeList: function (id, callback) {
      let self = this;
      let xhr = common.postJson(common.api.evaluate.getEvaluateList, {id: id}, function (rsp) {
        common.hideLoading();
        if (rsp.code === 0) {
          self.getIndicateTypeById(id).list = rsp.data;
          if (callback) {
            callback(rsp.data);
          }

        }
        else {
          common.popMsg(rsp.msg);
        }

      });
      //超过400ms未加载完数据，显示加载图标
      setTimeout(function () {
        if (xhr.readyState < 4) {
          common.showLoading();
        }
      }, 400);
    },

    //导出学员数据（导出excel）
    exportCamperDetail: function (termId, camperId, fileName) {
      common.createAndSendForm(common.api.implementCourse.exportCamperDetail,
        {
          data: JSON.stringify({termId, camperId}),
          auth: localStorage.getItem("auth")
        });
    }
  },
  router: new VueRouter({
    mode: "history",
    routes: [
      {path: "/", redirect: "/index"},
      {path: "/index", component: resolve => require(['./pages/index.vue'], resolve)},
      {path: "/pageA", component: resolve => require(['./pages/pageA.vue'], resolve)},
      {path: "/pageB-sub1", component: resolve => require(['./pages/pageB-sub1.vue'], resolve)},
      {path: "/pageB-sub2", component: resolve => require(['./pages/pageB-sub2.vue'], resolve)},
      {path: "/login", component: resolve => require(['./pages/login.vue'], resolve),name:"login"},
      {path: "*", redirect: "/login"}
    ]
  })
}).$mount("#app");

vm.$router.beforeEach((to, from, next) => {
  // console.log(to)
  if(!common.getCookie(common.cookieKeys.auth))
  {
    next("/login")
  }

  setTimeout(function () {
    common.showLoading();
  }, 200);
  next();
});
vm.$router.afterEach(route=> {
      // console.log(route);
})

















