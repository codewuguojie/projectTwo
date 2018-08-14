<template>
    <div class="footer">
        <ul>
            <li @click="goHome()"><p>首页</p></li>
            <li @click="goMycenter()"><p>我的</p></li>
        </ul>
    </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {

    };
  },
  methods: {
    goHome(){
        this.$router.push({path:'first'})
    },
    goMycenter(){
        this.$router.push({path:'mycenter'})
    }
  },
  mounted() {

  }
};
</script>

<style scoped type="text/css" lang="scss">
@import "../../../assets/css/reset.css";
    .footer{
        z-index:1000000;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        background: #222222;
        ul{
            width: 100%;
            height: 100%;
            li{
                float: left;
                width: 50%;
                height: 100%;
                text-align: center;
                line-height: 51px;
                font-size: 16px;
                &:hover p{
                    color: #fff;
                    border-bottom: 1px solid #fff;
                }
                p{
                    color: #9FA3B0;
                    height: 40px;
                    width: 35px;
                    margin: 0 auto;
                }
            }
        }
    }
</style>
