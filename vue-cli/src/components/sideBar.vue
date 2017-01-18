<template>
  <div class="sideBar">
    <ul class="menu">
      <li :class="{'on':$route.path.indexOf('index')>-1}">
        <router-link to="index">首页</router-link>
      </li>
      <li :class="{'on':$route.path.indexOf('login')>-1}">
        <router-link to="login">登陆</router-link>
      </li>

    </ul>
  </div>
</template>
<script>
  export default {
    name: 'sideBar',
    props: [],
    data () {
      return {
        item: '',
        itemSub: '',
      }
    },
    created(){

    }

  }
</script>

<style lang="scss">

</style>



