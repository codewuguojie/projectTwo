<template>
    <div class="tpos">
        <div class="top">
            <i @click="goMycenter()" class="icon-line-left"></i>
            <span class="title"></span>
        </div>
        <iframe class="other" :src=my></iframe>
    </div>
</template>

<script>
    export default {
        name: "tpos",
        data(){
          return{
              my:''
          }
        },
        methods:{
            goMycenter(){
                this.$router.push({path:'productList'})
            }
        },
        mounted(){
            this.my = this.$route.query.indexUrl
        }
    }
</script>

<style scoped lang="scss">
.tpos{
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    .top{
        width: 100%;
        height: 44px;
        font-size: 18px;
        color: #393A3F;
        line-height: 45px;
        background: #fff;
        margin-bottom: 10px;
        i{
            margin-left: 5%;
            vertical-align: text-top;
        }
        span{
            float: left;
            width: 100%;
            height: 100%;
            text-align: center;
            margin-top: -44px;
            font-weight: bold;
        }
    }
    .other{
        width: 100%;
        height: 100%;
        border: 0;
    }
}
</style>
