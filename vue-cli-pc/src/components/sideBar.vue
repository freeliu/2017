<template>
  <div class="sideBar">
    <ul class="menu">
      <li :class="{'on':$route.path.indexOf('index')>-1}">
        <router-link to="index">首页</router-link>
      </li>
      <li :class="{'on':$route.path.indexOf('pageA')>-1}">
        <router-link to="pageA">页面A</router-link>
      </li>
      <li :class="{'on':$route.path.indexOf('pageB')>-1}">
        <router-link to="pageB-sub1">页面B</router-link>
        <ul class="menu-sub">
          <li>
            <router-link to="pageB-sub1">页面B-1</router-link>
          </li>
          <li>
            <router-link to="pageB-sub2">页面B-2</router-link>
          </li>
        </ul>
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
        item: "",
        itemSub: "",
      }
    },
    created(){

    }

  }
</script>

<!--<style lang="scss">-->

<!--</style>-->



