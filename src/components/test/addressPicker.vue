<template>
    <address-picker :addressShow="addressShow" @ok="ok" @cancel="addressShow=false"></address-picker>
</template>

<script>
    import addressPicker from './test'
    export default {
        components:{
          "address-picker":addressPicker
        },
        data(){
            return{
                addressShow:true
            }
        },
        methods:{
            ok(data){
               console.log(data)
            }
        }
    }
</script>

<style scoped>

</style>
