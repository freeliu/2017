<template>
  <div class="page page-login">
    <div class="login-wrap">
      <div class="main-div">
        <h3>
          用户登录
        </h3>
        <input @keypress.enter="login" tabindex="1" autofocus id="userName" type="text" placeholder="请输入用户名"
               v-model.trim="name">
        <input @keypress.enter="login" tabindex="2" id="pwd" type="password" placeholder="请输入密码" v-model.trim="pwd">
        <a id="btnLogin" :disabled="name&&pwd&&!isLogin?null:'disabled'" type="button" @click="login"> 登录</a>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        isLogin: false,
        name: "",
        pwd: ""
      }
    },
    created()
    {
      if (common.browser.isIE && common.browser.ieVersion < 10) {
        common.confirm("本站点使用新技术制作，不再兼容旧版ie内核，建议使用chrome浏览器，360、百度、猎豹、QQ等国产浏览器可切换到技术模式使用");
      }
      document.cookie = `${common.cookieKeys.auth}=""`;
      localStorage.removeItem("userName");
      this.$root.userName = "";

    },
    mounted(){
      try {
        localStorage.test = 2;
      } catch (e) {
        alert('您的浏览器启用了隐身模式（或无痕浏览），本站点不支持在此模式下使用');
      }
      var self = this;

    }
    ,
    methods: {
      login: function () {
        const self = this;
        self.isLogin = true;
        localStorage.setItem(common.localStorageKeys.userName, self.name);
        self.$root.userName = self.name;
        document.cookie=`${common.cookieKeys.auth}=fdjkasdfjkads`
        //todo 完善
        self.$router.back();
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style lang="scss" scoped>-->

<!--</style>-->

