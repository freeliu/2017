<template>
    <div id="app">
        <img src="../assets/img/logo.png">
        <hello :text="random"></hello>
        <div>这是从app1传过来的id:--------{{id}}</div>
        <div>这是从app1传过来的age:--------{{$route.query.age}}</div>
        <div>这是从app1传过来的gender:--------{{$route.query.gender|genderName}}</div>

    </div>
</template>

<script>
    import Hello from '../components/Hello'
    export default {
        name: 'app2',
        data(){
            return {
                random: Math.random(),
                id:this.$route.query.id
            }
        },
        created(){
          console.log(1);
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
