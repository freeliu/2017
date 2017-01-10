<template>
    <div id="app">
        <img src="../assets/img/logo.png">
        <hello :text="random"></hello>
        <div>这是从app1传过来的id:--------{{id}}</div>
        <div>这是从app1传过来的age:--------{{$route.query.age}}</div>
        <div>这是从app1传过来的gender:--------{{$route.query.gender|genderName}}</div>
         <div>这是时间{{now|formatDateTo_yyyy_MM_dd}}</div>

    </div>
</template>

<script>
    import Hello from '../components/Hello'
    export default {
        name: 'app2',
        data(){
            return {
                random: Math.random(),
                id:this.$route.query.id,
                now:null
            }
        },
        created(){
          console.log(1);
          this.now=Date.now();
        },
        mounted(){
             this.showMsg("http://cn.vuejs.org/v2/api/#选项-生命周期钩子")
        },
        methods:{
          showMsg(msg){
             alert(msg)
          }
        },
        components: {
            Hello
        }
    }
</script>

<style lang="scss" scoped>

</style>
