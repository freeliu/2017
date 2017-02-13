<template>
  <div class="page">
    这是page1
    <router-link :to="{path:'/page2'}">page2</router-link>
    <input @change="isChangAndNotSave=true" type="number" pattern="[0-9]*">
  </div>
</template>

<script>

  export default {
    name: 'page1',
    components: {},
    data(){
      return {
        isChangAndNotSave: false,
      }
    },
    created() {
      let self = this;
      document.title = 'page1';
    },
    beforeRouteLeave (to, from, next) {
      if (this.isChangAndNotSave) {
        if (confirm("修改还没保存，确定要离开吗？")) {
          next();
        }
      }
      else {
        next();
      }

    }
  }
</script>

