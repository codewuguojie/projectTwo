<template>
	<div class="header" v-if="isShow">
    <div class="content clearfix">
      <div class="logo">
        <span class="icon-new15 delete" @click="deletes()">&nbsp;&nbsp;</span>
        <img src="./img/logo.svg">
      </div>
      <div class="text">
        <p class="p1">铼米</p>
        <p class="p2">前所未见，世界因你而美好！</p>
      </div>
      <div class="download">
        <span class="down"@click="goDownload()">立即下载<b class="icon-close"></b></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getResult } from "api/common"; //导入api
export default {
  data() {
    return {
      isShow:true,
    };
  },
  props: {

  },
  methods: {
    deletes() {
      this.isShow=false;
    },
    goDownload(){
     this.$router.push({'name':'download'})
    }

  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  background: #222222;
  z-index: 10000;
  position: fixed;
  left: 0;
  top: 0;
  .content {
    margin:0 auto;
    width: 345px;
    height: 50px;
    .logo {
      float: left;
      padding-top:7px;
      padding-right:15px;
      img {
        float: left;
        display: inline-block;
        width: 35px;
        height: 35px;
      }
      span{
        margin-right: 5px;
        float: left;
      }
      .icon-new15:before{
        line-height: 35px;
      }
    }
    .text{
      float:left;
      padding-top: 7px;
      .p1{
        font-size: 14px;
        color: #FFFFFF;
      }
      .p2{
        font-size: 11px;
        color: #FFFFFF;
        font-weight: 200;
      }
    }
    .download{
      float: right;
      margin-top: 7px;
      span.down{
        display: inline-block;
        width: 86px;
        height: 30px;
        font-size: 14px;
        color: #ffffff;
        line-height: 31px;
        text-align: center;
        background-image: linear-gradient(-90deg, #218CF7 0%, #25BEF2 100%);
        border-radius: 24px;
      }
      span.delete{
        color: #ffffff;
      }
    }
  }
}
</style>


