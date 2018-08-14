

<template>

<div class="carousel">
   <transition-group tag="ul" :name="names">
      <li v-for='(item,index) in slides' :key='index' v-show="index === mark"> 
            <a href="javascript:;">
              <v-touch v-on:swiperight="swipeRight($event)" v-on:swipeleft="swipeLeft($event)">
               <img :src="staticUrl+item.filePath">
              </v-touch>
            </a>
      </li>
     
   </transition-group>
   <div class="bullet">
      <span v-for="(item,index) in slides.length" :class="{'active':index === mark}"  :key="index"></span>
      <span></span>
      <!-- <span v-for="(item,index) in slides.length" :class="{'active':index === mark}" @click="change(index, mark)" :key="index"></span> -->

   </div>
   
</div>
   
</template>

<script>
import {staticUrl,hostUrl} from '../../../api/common.js'
export default {
   props:{  
      slides:{
            type:Array,
            default:[]
      },
      productUrl:String
   },  
   data(){
      return {
         names: 'left',
         mark: 0,
         time: null,
         staticUrl:staticUrl()
      }
   },
   mounted(){  
      console.log('slide show.....')  
      console.log(this.slides)  

   },
   methods:{  
      change(i, m) {
         if (i > m) {
            this.names = 'left';
         } else if (i < m) {
            this.names = 'right';
         } else {
            return;
         }
         this.mark = i;
      },
      prev() {
         this.names = 'right';
         this.mark--;
         if (this.mark === -1) {
            // this.$router.push({name:'test',query:{id:this.$route.query.id,type:this.$route.query.type}});
            window.location.href =  `${hostUrl}/detail?id=${this.$route.query.id}&type=${this.$route.query.type}`;
            return
         }
      },
      next() {
         this.names = 'left';
         this.mark++;
         if (this.mark === this.slides.length) {
            if(this.$route.query.type == 2){
              window.location.href = this.productUrl;
            }else{
              // this.$router.push({name:'detailzc',params:{id:this.$route.query.id}})
              window.location.href=`${hostUrl}/detailzc/${this.$route.query.id}`
            }
            return
         }
      },
      swipeRight(){
        this.prev();
      },
      swipeLeft(){
        this.next();
      }
   },  
   created() {
      // this.play()
   }

}
</script>

<style lang="scss" scoped>
   body {
      background-color: #2A2A2A
   }

   * {
      margin: 0;
      padding: 0;
   }

   li {
      list-style: none;
   }

   .carousel {
      width: 100%;
      height:100%;
      overflow: hidden;
      position: relative;
   }

   .carousel ul {
      width: 100%;
      height: 100%;
   }

   .carousel ul li {
      width:100%;
      height: 100%;
      position: absolute;
   }
  .carousel ul li a{
      width: 100%;
      height: 100%;
      div{
        width: 100%;
        height:100%;
      }
   }

   .carousel ul li a img {
      width: 100%;
      height: 100%;
   }

   .bullet {
      position: absolute;
      font-size: 0;
      bottom: 20px;
      right:15px;
   }

   .bullet span {
      display: inline-block;
      width: 10px;
      height: 10px;
      background:#E3E7ED;
      margin-left: 15px;
      border-radius: 10px;
   }

   .bullet span:first-child {
      margin-left: 0;
   }

   .switch span {
      position: absolute;
      width: 60px;
      height: 60px;
      // background-color: rgba(0, 0, 0, .1);
      font-size: 20px;
      color: #ffffff;
      top: 50%;
      margin-top: -30px;
      cursor: pointer;
      line-height: 60px;
      font-size: 50px;
      text-align: center;
   }
  .bullet span.active {
      background: #ffffff;
   }
   .switch span:hover {

      background-color: rgba(0, 0, 0, .5);

   }

   .prev {
      left: 10%;
   }

   .next {
      right: 10%;
   }

   

   .left-enter-active{
      transform:translateX(0);
      transition:all .4s ease;
   }
   .left-leave-active{
      transform:translateX(-100%);
      transition:all .4s ease
   }
   .left-enter{
      transform:translateX(100%);
   }
   .left-leave{
      transform:translateX(0);
   }
   .right-enter-active {
      transform: translate3d(0%);
      transition: all .4s ease;
   }
   .right-leave-active {
      transform: translateX(100%);
      transition: all .4s ease;
   }
   .right-enter {
      transform: translateX(-100%);
   }
   .right-leave {
      transform: translateX(0);
   }
</style>

