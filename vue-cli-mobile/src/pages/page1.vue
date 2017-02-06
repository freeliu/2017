<template>
  <div class="page">
    这是page1
    <router-link :to="{path:'/page2'}">page2</router-link>
  </div>
</template>

<script>

export default {
  name: 'page1',
  components: {

  },created(){
      document.title="page1"
  },
};
</script>

