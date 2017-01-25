<template>
    <div class="page page-index  ">
      <!-- ：删除 智能提示用，-->
      <!--<link href="../assets/css/main.css">-->
      <side-bar item="" itemSub=""></side-bar>
      <div class="main ">
        这是pageA

        <div id="demo">
          <button v-on:click="show = !show">
            Toggle
          </button>
          <transition name="fade">
            <p v-if="show">hello</p>
          </transition>
        </div>
      </div>

    </div>
</template>

<script>
  import  sideBar from "../components/sideBar.vue";
  export default {
    name: 'pageA',
    data () {
      return {
        show: true
      }
    },
    created (){
//      this.init(); //在路由中搜索了
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

<!--Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>

