<template>
<div class="detail-movies">
    <v-header></v-header>
    <div class="topFixed"><span class="icon-line-left" @click="goHome()"></span></div>
    <v-banner :slides="slides" :productUrl="productUrls"></v-banner>
</div>
</template>
<script>
import "../../assets/sass/home.scss";
import banner from "@/components/base/banner/banner";
import header from "@/components/base/header/header";

import {getResult,staticUrl,hostUrl} from '../../api/common.js'
export default {
  components: {
    "v-banner": banner,
    "v-header": header,
  },
  data() {
    return {
       slides:[
          {
            src:require('./img/timg1.jpg'),
            title:'标题1'
          },
          {
            src:require('./img/timg2.jpg'),
            title:'标题2'
          },
          {
            src:require('./img/timg3.jpg'),
            title:'标题1'
          },
          {
            src:require('./img/timg4.jpg'),
            title:'标题2'
          }
        ],
        productUrls:''
    };
  },
  methods: {
        goHome(){
            // this.$router.push({name:'test',query:{id:this.$route.query.id,type:this.$route.query.type}})
            window.location.href=`${hostUrl}/detail?id=${this.$route.query.id}&type=${this.$route.query.type}`;
        },
        swipeRight(){
        //    this.$router.push({name:'test',query:{id:this.$route.query.id}});
           window.location.href=`${hostUrl}/detail?id=${this.$route.query.id}`;
        },
        swipeleft(){
        //    this.$router.push({name:'detailzc',params:{id:this.$route.query.id}})
           
           if(this.$route.query.type == 2){
               window.location.href=`${this.detailObj.projectUrl}`;
           }else{
               window.location.href=`${hostUrl}/detailzc/${this.$route.query.id}`;
           }
        },
        getDetail(){
            if(this.$route.query.type == 0){
                getResult('get',`/zc/v1/open/zcproject/${this.$route.query.id}`).then((res)=>{
                    if(res.result === 0){
                        this.detailObj = res.data;
                        this.slides = res.data.appCoverImage;
                    }
                })
            }else{
                getResult('get',`/zc/v1/open/extproject/${this.$route.query.id}`).then((res)=>{
                    if(res.result === 0){
                        this.detailObj = res.data;
                        this.slides = res.data.appCoverImage;
                        this.productUrls = res.data.projectUrl;
                        console.log(this.detailObj);
                    }
                })
            }
            
        }
  },
  mounted(){
      this.getDetail();
      console.log(this.$route.query.type);
  },
};
</script>

<style lang="scss" scoped>
    .detail-movies{
        width: 100%;
        height: 100%;
        .topFixed{
            width: 100%;
            position: fixed;
            bottom:0;
            left: 0;
            z-index: 1000;
            span{
            line-height: 44px;
            padding-left: 15px;
            }
            .icon-line-left:before{
            color: #ffffff;
            font-size: 22px;
            }
        }
        .contents{
            width: 100%;
            height: 400px;
            overflow: hidden;
            .images{
                float: left;
            }
        }
        
    }
    
</style>
