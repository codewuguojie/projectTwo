<template>
   <!-- 商品轮播 -->
   <div class="detail-banner">
      <div class="item-detail"><img :src= detailSrc></div>
      <div class="item-swiper">
         <div class="images" :style="{top:top +'px'}">
               <div class="items" v-for="(item,index) in swiperDatas" :key="index" 
               @click="clickImg(item,index)" :class="{'active':index === mark}">
               <img :src = item>
               </div> 
         </div>
         <div class="swiper-top" @click="clickTop()"><span class="icon-top2"></span></div>
         <div class="swiper-bottom" @click="clickBottom()"><span class="icon-bottom"></span></div>
      </div>
   </div>
</template>
<script>
export default {
  components: {
     
  },
  props:{
     swiperDatas:Array,
  },
  data() {
    return {
      top: 0,
      isActive: false,
      mark: 0,
      targetIndex: 0,//自上而下 0，1，2，3 (0,3位置轮播，其他更改图片地址即可)
      detailSrc:String,
    };
  },
  methods: {
    clickImg(item, index) {
      this.mark = index;
      this.detailSrc = item;
      this.targetIndex = this.mark + this.top / 109;
      //第一个
      if (this.targetIndex == 0) {
        if (this.mark === 0) {
          return;
        }
        this.top = this.top + 109;
      }
      //最后一个
      if (this.targetIndex == 3) {
        if (this.mark === this.swiperDatas.length - 1) {
          return;
        }
        this.top = this.top - 109;
      }
    },
    clickTop() {
        if(this.mark == 0){
            return;
        }
        this.mark--;
        this.detailSrc = this.swiperDatas[this.mark];
        this.targetIndex = this.mark + this.top / 109; 
       
        if(this.targetIndex === 0){
            if(this.top === 0) return;
            this.top = this.top + 109;
        }
    
    },
    clickBottom() {
      if (this.mark === this.swiperDatas.length - 1) {
        return;
      }
      this.mark++;
      console.log(this.mark);
      this.detailSrc = this.swiperDatas[this.mark];
      this.targetIndex = this.mark + this.top / 109; 

      if (this.targetIndex == 3) {
        if (this.mark === this.swiperDatas.length - 1) {
          return;
        }
        this.top = this.top - 109;
      }
    },
    beginAnimal() {
      if (this.targetIndex == 0) {
      } else if (this.targetIndex) {
      }
    }
  },
   mounted(){  
      this.detailSrc = this.swiperDatas[0];

   },
};
</script>
<style lang="scss" scoped>
      .detail-banner{
         float: left;
         width: 724px;
         height: 427px;
         margin-right: 22px;
         .item-detail{
            float: left;
            width: 570px;
            img{
               width: 100%;
               cursor: pointer;
               border: 0;
               height: 427px;
               vertical-align: bottom;
            }
         }
         .item-swiper{
            float: left;
            margin-left: 22px;
            width: 132px;
            height: 427px;
            overflow: hidden;
            position: relative;
            .images{
               position: absolute;
               top: 0;
               left: 0;
               -webkit-transition: top .3s ease;
               -o-transition: top .3s ease;
               transition: top .3s ease;
               .items{
                  margin-bottom:10px;
                  img{
                     border: 0;
                     vertical-align: bottom;
                     width: 100%;
                     height: 99px;
                     cursor: pointer;
                  }
               }
               .active{
                  border:1px solid black;
               }
            }
            .swiper-top{
               color: #ffffff;
               text-align: center;
               position: absolute;
               top: 0;
               left: 0;
               width: 132px;
               height: 22px;
               background-color: rgba(0, 0, 0, 0.3);
               cursor: pointer;
               .icon-top2:before{
                 font-size: 12px;
               }
            } 
            .swiper-bottom{
               color: #ffffff;
               text-align: center;
               position: absolute;
               bottom: 0;
               left: 0;
               width: 132px;
               height: 22px;
               background-color: rgba(0, 0, 0, 0.3);
               cursor: pointer;
               .icon-bottom:before{
                 font-size: 12px;
               }
            } 
         }
      }
     
</style>

