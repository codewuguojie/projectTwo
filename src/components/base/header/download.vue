<template>
    <div class="download">
        <img src="./img/download.png">
        <span class="down" @click="downloadApp()">下载铼米APP</span>
        <div class="fixed-modal" v-if="isWechart">
            <div class="title3"><img src="./img/go.svg"></div>
            <div class="title1"><p class="p1">因浏览器限制，请点击右上角</p><p>选择其他浏览器打开</p></div>
            <div class="title2"><span @click="isWechart=!isWechart">我知道了</span></div>
        </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      userAgent:navigator.userAgent || navigator.vendor || window.opera,
      os:'',
      isWechart:false,
    }
  },
  methods: {
    init(){
      this.os = this.getMobileOperatingSystem();
      var webkit = !!this.userAgent.match(/WebKit/i);
      if (this.os === "iOS") {
        window.location.href = 'https://itunes.apple.com/us/app/铼米/id1420391615?l=zh&ls=1&mt=8';  
      } else if (this.os === "Android") {
        //   window.location.href = "micfunding://";
        if(this.checkDevice().isWeixin){
            // alert('微信');
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zhihu.android&g_f=991703";	
        }else{
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zhihu.android&g_f=991703";		
        }
        		
      }
    },
    getMobileOperatingSystem() {
        if (/windows phone/i.test(this.userAgent)) {
            return "Windows";
        }
        if (/android/i.test(this.userAgent)) {
            return "Android";
        }
        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(this.userAgent) && !window.MSStream) {
            return "iOS";
        }
        return "unknown";
    },
    toUrl() {
        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.zhihu.android&g_f=991703";	
    },
    downloadApp(event) {
        if(this.os === 'Android') {
            console.log('android');
            toUrl();
        } else if(this.os === 'iOS') {
            console.log('ios');
            window.location.href = 'https://itunes.apple.com/us/app/铼米/id1420391615?l=zh&ls=1&mt=8';
        } else {
            console.log('unknown');
            this.toUrl();
        };
    },
    checkDevice(){  
        let UA = navigator.userAgent,  
            isAndroid = /android|adr|linux/gi.test(UA),  
            isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,  
            isBlackBerry = /BlackBerry/i.test(UA),  
            isWindowPhone = /IEMobile/i.test(UA),  
            isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone;  
        return{  
            isAndroid: isAndroid,  
            isIOS: isIOS,  
            isMobile: isMobile,  
            isWeixin: /MicroMessenger/gi.test(UA),  
            isQQ: /QQ/gi.test(UA),  
            isPC: !isMobile,  
            isWeibo: /WeiBo/gi.test(UA)  
        }  
    }, 
  },
  mounted(){
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.download {
  width: 100%;
  height: 100%;
  background: #232426;
  img {
    width: 100%;
  }
  .down {
    position: absolute;
    display: inline-block;
    width: 240px;
    height: 50px;
    background: #33a5fd;
    font-size: 16px;
    color: #ffffff;
    text-align: center;
    line-height: 50px;
    border-radius: 25px;
    left: 50%;
    bottom: 50px;
    margin-left: -120px;
  }
  .fixed-modal{
      width: 100%;
      height: 100%;
      position:fixed;
      left:0;
      top: 0;
      z-index: 200007;
      background: rgba(0, 0, 0, 0.7);
      .title1 {
          p{
              color: #ffffff;
              text-align: center;
              font-size: 14px;
              line-height: 20px;
          }
          .p1{
              
              padding-top: 30%;
          }
      }
      .title2{
          text-align: center;
          margin-top: 30px;
          span{
              width: 114px;
              height: 35px;
              border: 1px solid #FFFFFF;
              border-radius: 18px;
              line-height: 35px;
              font-size: 14px;
              color: #FFFFFF;
              text-align: center;
              display: inline-block;
          }
          
      }
      .title3{
          img{
              width: 35px;
              height:67px;
              margin-right: 30px;
          }
          padding-top: 30px;
          text-align: right;
      }
  }
}
</style>

