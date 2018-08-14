<template>
<div class="home">
  <v-header></v-header>
  <div v-if="outLine" class="content">
      <div class="outlist">
          <img src="./img/img_network.png"/>
          <p>您的网络好像出现了问题</p>
          <p><span class="down"@click="goDownload()">重新加载<b class="icon-close"></b></span></p>
      </div>
  </div>
  <div class="home-swiper" v-if="!outLine">
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- <swiperSlide v-for="(item,index) in slides" :key="index"><a :href="item.url"><img :src="staticUrl+item.path"></a></swiperSlide> -->
        <swiperSlide v-for="(item,index) in slides" :key="index"><a :href="item.url"><img :src="staticUrl+item.path"></a></swiperSlide>

        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
  <div class="hot-project" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" v-if="!outLine">
    <div class="title">热门项目</div>
    <div class="items" v-for="(item,index) in arr" @click='goDetail(item)'>
      <div class="item-img"><img :src="staticUrl+item.pcHomeImage[0].filePath"></div>
      <div class="item-type1" v-show="item.projectType === 0">
        <div class="item-title">
          <span :class="{'span1':item.status == 2,'span3':item.status == 1,'span4':item.status == 3}">{{item.status |statusType }}</span>
          <b>{{item.projectName}}</b>
        </div>
        <div class="item-title2">
          <p>{{item.productBrief}}</p>
        </div>
        <div class="item-num">
          <b>已筹到</b>&nbsp;<b class="num">￥{{item.raisedAmt |pointsTwo}}</b>
        </div>
        <div class="item-progress">
          <v-progress :percent="item.currentProgress"></v-progress>
        </div>
        <div class="item-infos">
          <span class="span1">
            <p class="p1">{{item.supportNum}}</p>
            <p class="p2">支持人数</p>
          </span>
          <span>
            <p class="p1">{{item.currentProgress | pointsTwo}}%</p>
            <p class="p2">当前进度</p>
          </span>
          <span class="span3" v-if="item.status != 1">
            <p class="p1">{{item.remainDays}}天</p>
            <p class="p2">剩余天数</p>
          </span>
        </div>
      </div>
      <div class="item-type2" v-show="item.projectType === 1">
        <div class="type2-title">
          <p class="p1">{{item.projectName}}</p>
          <p class="p2">{{item.industry | zrType}}</p>
          <p class="p3">{{item.raisedAmt}}<b>万</b></p>
          <p class="p4">
            <span>{{item.financeType == 0?'股权融资':'债券融资'}}</span>
            <span class="span2">{{item.atStage | zrProgress}}</span>
          </p>
          <p class="p5">
            <span class="icon-address"></span>
            <span >{{item.address}}</span>
            <span class="last">{{item.createDate}}</span>
          </p>
        </div>
      </div>
      <div class="item-type2" v-show="item.projectType === 2">
        <div class="type2-title">
          <p class="p1">{{item.projectName}}</p>
          <p class="p2">{{item.productBrief}}</p>
        </div>
      </div>
    </div>
    <!-- <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="item in list">{{ item }}</li>
    </ul> -->
  </div>
  <v-footer></v-footer>
</div>
</template>
<script>
import "../../assets/sass/home.scss";
import header from "@/components/base/header/header";
import footer from "@/components/base/footer/footer";
import banner from "@/components/base/banner/banner";
import progress from "@/components/base/progressbar/ProgressBar";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import {getResult,staticUrl,hostUrl} from '../../api/common.js'

export default {
  components: {
    "v-header": header,
    "v-footer": footer,
    "v-progress": progress,
    "v-banner": banner,
    swiper,
    swiperSlide
  },
  data() {
    return {
       swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        autoplay: false,
        speed: 300,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true
        }
      },
      slides: [],
      projects:[],
      type:false,
      staticUrl:staticUrl(),
      arr:[],
      moves:[],
      list:[1,2,3,4,5,6,7,8,9,10],
      pageIndex:1,
      pageSize:10,
      count:10,
      loading:false,
      outLine:false,
      isOnline:navigator.onLine
    };
  },
  methods: {
    goDetail(item) {
      // if(item.projectType){ //0众筹，1股权
        // this.$router.push({ name: "detailzc",params:{id:item.id}});
        // this.$router.push({ name: "test",query:{id:item.id,type:item.projectType}});
        window.location.href=`${hostUrl}/detail?id=${item.id}&type=${item.projectType}`
        // if(item.projectUrl == null){
        //     this.$router.push({ name: "test",query:{id:item.id,type:item.projectType}});
        // }else {
        //     this.$router.push({name:'tpos',query:{indexUrl:item.projectUrl}})
        // }

      // }

    },
    Left(data){
      alert('1234');
    },
    getBanner(){
      getResult('get','/operate/v1/open/banner/H5').then((res)=>{
        if(res.result === 0){
          this.slides = res.data;
        }
      })
    },

    loadMore() {
      console.log(this.count/10);
      if(this.pageIndex >(this.count/10)+1 ){
        return;
      }
      this.loading = true;
      getResult('get',`/group/v1/open/project/page?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then((res)=>{
        if(res.result === 0){
          res.data.list.forEach((value,index,arr)=>{
            this.arr.push(value);
          })
          this.count = res.data.count;
          this.pageIndex++;
          this.loading = false;
          console.log(this.arr);
        }
      })



    }
  },
  mounted(){
    this.getBanner();
    this.loadMore();
    window.addEventListener("offline", (e)=> {this.outLine=true})
    window.addEventListener("online", (e)=> {this.outLine=false})
  },
  destroyed() {

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  // watch:{
  //   isOnline(value){
  //     console.log(this.isOnline);
  //     if(value){
  //       this.outLine = false
  //     }else{
  //       this.outLine = true;
  //     }
  //   }
  // }
};
</script>

