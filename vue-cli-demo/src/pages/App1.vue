<template>
  <div id="app">
    <router-link :to="{path:'app2'}">跳转到app2</router-link>
    <router-link :to="{path:'app2',query:{id:1,age:2,gender:1}}">跳转到app2(带参数)</router-link>
    <img src="../assets/img/logo.png">
    <hello text="这是app1"></hello>
  </div>
</template>

<script>
import Hello from '../components/Hello'

export default {
  name: 'app1',
  components: {
    Hello
  }
}
</script>

//
<style scoped>

</style>
