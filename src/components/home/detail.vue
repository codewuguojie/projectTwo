<template>
<div class="container">
  <v-header></v-header>
  <p class="topFixed"><span class="icon-line-left" @click="goHome()"></span></p>
  <div class="rightFixed">向左滑动查看项目详情</div>
    <v-touch v-on:swipeleft="swipeleft($event)" v-on:swiperight="swiperight($event)">
      <div class="player">
        <video-player  class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
                      @play="onPlayerPlay($event)"
                      @pause="onPlayerPause($event)"
        >
        </video-player>

        <!-- <video autoplay="true"  id="video">
          <source :src="vedioSrc" type="video/mp4">
        </video> -->
      </div>
    </v-touch>
</div>

</template>
<script>
import "../../assets/sass/home.scss";
import Vue from 'vue'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
import header from "@/components/base/header/header";
import {getResult,staticUrl,hostUrl} from '../../api/common.js'
export default {
  components: {
    'v-header':header
  },
  data() {
    return {
        vedioSrc:'',
        playerOptions: {
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          // aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "video/mp4",
            src: '' //你的视频地址（必填）
          }],
          // poster: "", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            fullscreenToggle: false  //全屏按钮
          },
      },
      detailObj:{},
      staticUrl:staticUrl()
    };
  },
  methods: {
    goHome(){
      // this.$router.push({name:'first'});
      window.location.href=`${hostUrl}/first`;
    },
    swipeleft(data){
      // this.$router.push({name:'test2',query:{id:this.$route.query.id,type:this.$route.query.type}});
      window.location.href=`${hostUrl}/test2?id=${this.$route.query.id}&type=${this.$route.query.type}`;
    },
    swiperight(data){
      this.$router.push({name:'first'})
    },
    onPlayerPlay(player) {
      console.log("play");
    },
    onPlayerPause(player){
      console.log("pause");
    },
    getDetail(){
      if(this.$route.query.type == 2){
        getResult('get',`/zc/v1/open/extproject/${this.$route.query.id}`).then((res)=>{
          if(res.result === 0){
            this.detailObj = res.data;
            this.playerOptions.sources = [{type:'video/mp4',src: this.staticUrl+this.detailObj.appHomeVideo[0].filePath}];
            this.vedioSrc = this.staticUrl+this.detailObj.appHomeVideo[0].filePath;
            this.playerOptions.poster = this.staticUrl+this.detailObj.videoCoverImage[0].filePath
            console.log(this.playerOptions.poster);
          }else if(res.result=1 && res.status===2 ){
            this.$router.push({name:'first'})
          }
        })
      }else {
        getResult('get',`/zc/v1/open/zcproject/${this.$route.query.id}`).then((res)=>{
          if(res.result === 0){
            this.detailObj = res.data;
            this.playerOptions.sources = [{type:'video/mp4',src: this.staticUrl+this.detailObj.appHomeVideo[0].filePath}];
            this.vedioSrc = this.staticUrl+this.detailObj.appHomeVideo[0].filePath;
            // this.playerOptions.poster = this.staticUrl+this.detailObj.videoCoverImage[0].filePath
            console.log(this.playerOptions.poster);
          }else if(res.result=1 && res.status===2 ){
            this.$router.push({name:'first'})
          }
        })
      }

    }

  },
  mounted(){
    this.getDetail();
    // document.addEventListener('touchstart', function () {

    //   // document.getElementById('vjs_video_6895_html5_api').canplay()
    // });
  },
};
</script>

<style lang="scss" scoped>


    .container{
      width: 100%;
      height: 100%;
      background: #000;

      p.topFixed{
        width: 100%;
        position: fixed;
        height: auto;
        bottom: 0;
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
      .player{
        position: fixed;
        top: 50%;
        width: 100%;
        transform: translate(0,-50%);
        .video-player {
          height: 100%;
          #vjs_video_3560{
            height:100%;
          }
          .video-js.vjs-fluid, .video-js.vjs-16-9, .video-js.vjs-4-3{
            height: 100%!important;
          }
          .vjs-poster{
                background-size: 100% 100% !important;
          }
        }
      }
      .rightFixed{
        position:fixed;
        right: 0;
        width: 14px;
        height: 200px;
        color: #ffffff;
        z-index: 1000;
        font-size: 14px;
        text-align: center;
        top: 50%;
        margin-top: -100px;
        padding:10px;
        background: rgba(0,0,0,0.3)

      }
    }
</style>
