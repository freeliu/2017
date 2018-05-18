<template>
  <div class="page page-index  ">
    <!-- ：删除 智能提示用，-->
    <!--<link href="../assets/css/main.css">-->
    <side-bar item="" itemSub=""></side-bar>
    <div class="main ">
      这是首页
    </div>

  </div>
</template>

<script>
  import  sideBar from "../components/sideBar.vue";
  export default {
    name: 'index',
    data () {
      return {}
    },
    created (){

    },
    components: {
      sideBar
    },

    methods: {},
    filters: {}
    ,
    computed: {}
    ,
    watch: {},
    beforeRouteEnter(to, from, next){
      next(function (vm) {

      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style lang="scss" scoped>-->

<!--</style>-->

