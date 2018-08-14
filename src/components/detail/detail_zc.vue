<template>
<div class="detail">
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiperSlide v-for="(item,index) in detailObj.bannerImages" :key="index"><img :src="staticUrl+item.filePath"></swiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div :class="{'topfixed':!isScroll ,'topfixed bgActive':isScroll}">
        <span class="span1 icon-line-left" @click="goHome()"></span>
        <span class="span2" v-if="isScroll">项目详情</span>
    </div>
    <!-- 项目基本信息 -->
    <div class="projects">
        <div class="project-info">
            <p class="zc-title">
                <span :class="{'span1':detailObj.status == 2,'span3':detailObj.status == 1,'span4':detailObj.status == 3}">{{detailObj.status |statusType }}</span>
                <span class="span2">{{detailObj.projectName}}</span>
            </p>
            <p class="zc-info">{{detailObj.productBrief}}</p>
            <p class="zc-money">
                <span class="span1">已筹到</span>
                <span class="span2">￥{{detailObj.raisedAmt | pointsTwo}}</span>
            </p>
            <p class="zc-progress">
                <v-progress :percent="detailObj.currentProgress"></v-progress>
            </p>
            <p class="zc-nums">
                <span class="span1">
                    <p class="p1">{{detailObj.supportNum}}</p>
                    <p class="p2">支持人数</p>
                </span>
                <span>
                    <p class="p1">{{detailObj.currentProgress | pointsTwo}}%</p>
                    <p class="p2">当前进度</p>
                </span>
                <span class="span3" v-if="detailObj.status != 1">
                    <p class="p1">{{detailObj.remainDays}}天</p>
                    <p class="p2">剩余天数</p>
                </span>
            </p>
            <p class="zc-tips">
                提示：此项目必须在&nbsp;<b>{{detailObj.endDate}}</b>&nbsp;前得到&nbsp;<b>￥{{detailObj.targetAmt | pointsTwo}}</b>&nbsp;的支持才可成功
            </p>
            <p class="zc-last"></p>
        </div>
    </div>
    <!-- 用户信息 -->
    <div class="user">
        <div class="user-info">
            <div class="title">发起人信息</div>
            <div class="details clearfix">
                <span class="left"><p><img src="./img/self.svg"></p></span>
                <span class="right">
                    <p class="p1">{{userInfo.username?userInfo.username:'' | cutoutNum}}</p>
                    <p class="p3 icon-address">&nbsp;{{userInfo.province?userInfo.province:''}}<b v-if="userInfo.city && userInfo.province">-</b><b>{{userInfo.city?userInfo.city:''}}</b></p>
                </span>
            </div>
        </div>
    </div>
    <!-- 项目详情 -->
    <div class="product-detail" id="nav">
        <div class="contents">
            <div :class="{'nav-content':!isShowNav,'nav-content navActive':isShowNav}">
                 <div class="nav clearfix">
                    <span :class="{'icon-position active':item.isActive}" v-for="(item,index) in nav" @click="changeNav(index)">&nbsp;{{item.text}}</span>
                </div>
            </div>

            <div class="nav-detail1">
                <div class="title">
                    <p class="p1">项目介绍</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.description" class="fu-texts"></div>

            </div>
            <div class="nav-detail2 nav-detail1">
                <div class="title">
                    <p class="p1">常见问题</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.faq" class="fu-texts"></div>
            </div>
            <div class="nav-detail3 nav-detail1">
                <div class="title">
                    <p class="p1">团队介绍</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.teamIntroduce" class="fu-texts"></div>
            </div>
            <div class="nav-detail4 nav-detail1">
                <div class="title">
                    <p class="p1">项目进展</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.progress" class="fu-texts"></div>
            </div>
             <div class="nav-detail5 nav-detail1">
                <div class="title">
                    <p class="p1">检测报告</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.testReport" class="fu-texts"></div>
            </div>

        </div>

    </div>
    <div class="product-tips">市场有风险投资需谨慎</div>
    <div class="bottomFixed">
        <span :class="{'second icon-heart-active':active,'second icon-heart':!active}" @click="clickLove()"></span>
        <p class="third">{{selectNum}}</p>
        <span class="imgs" @click="clickComents()"><img src="./img/comment.svg">&nbsp;{{comentsNum}}</span>
        <span :class="{'last':btnActive,'disabled':!btnActive}" @click="goReback()">我要参与</span>
    </div>
    <v-modal title="模态框" :isShow="isShowModal" :width="270" @close="isShow=false">
        <div class="modal-body">
            <p class="texts">温馨提示</p>
            <p class="tips">查看评论请前去下载铼米APP</p>
            <p class="btns">
                <span class="span1" @click="isShowModal=false">取消</span>
                <span class="span2" @click="goDownload()">去下载</span>
            </p>
        </div>

    </v-modal>
</div>

</template>
<script>
import "./detail.scss";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {getResult,staticUrl,hostUrl} from "../../api/common"
import progress from "@/components/base/progressbar/ProgressBar";
import * as wx from 'weixin-js-sdk'
import modal from'@/components/base/modal/modal'
export default {
  components: {
    swiper,
    swiperSlide,
    "v-progress":progress,
    'v-modal':modal
  },
  data() {
    return {
      isShowModal:false,
      comentsNum:0,
      isShowNav: false,
      detailObj:{},
      staticUrl:staticUrl(),
      mark:0,
      isScroll:false,
      userId:'',
      userInfo:{},
      active:false,
      isWechart:false,
      weChart:{},
      selectNum:0,
      btnActive:true,
      swiperOption: {
        //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        autoplay: true,
        speed: 300,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          clickable: true
        }
      },
      nav: [
        { text: "项目介绍", isActive: true },
        { text: "常见问题", isActive: false },
        { text: "团队介绍", isActive: false },
        { text: "项目进展", isActive: false },
        { text: "检测报告", isActive: false }
      ]
    };
  },
  methods: {
    goHome() {
        if(this.$route.query.returnUrl){
            window.location.href = this.$route.query.returnUrl;
        }else{
            this.$router.push({ name: "first" });
        }
    },
    changeNav(mark) {
      // tab切换
      this.mark=mark;
      this.nav.forEach((value, index, arr) => {
        if (index == mark) {
          value.isActive = true;
        } else {
          value.isActive = false;
        }
      });
      // 随着滚动条滚动
      let doms = document.querySelectorAll(".nav-detail1");
      let total = doms[mark].offsetTop - 44-36;
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      let step = total / 50;
      (function smoothDown() {
        if (distance < total) {
          distance += step; // 移动一小段
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance; // 设定每一次跳动的时间间隔为10ms
          setTimeout(smoothDown, 10);
        } else {
          // 限制滚动停止时的距离
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      })();
    },
    onScroll() {
      let navDomTop = document.getElementById("nav").offsetTop;
      let scrolled =
        document.documentElement.scrollTop || document.body.scrollTop;
        if(scrolled!=0){
            this.isScroll = true;
        }else{
            this.isScroll = false;
        }

      if (scrolled === navDomTop - 44 - 36 || scrolled > navDomTop - 44 - 36) {
        this.isShowNav = true;
      } else {
        this.isShowNav = false;
      }
      //控制锚点的激活
      let doms = document.querySelectorAll(".nav-detail1");
        // this.mark = 0;

      if(scrolled == doms[0].offsetTop - 44 -36|| scrolled < doms[0].offsetTop - 44-36){
          this.mark = 0;
      }
      if(scrolled > doms[1].offsetTop - 44-36 && scrolled < doms[2].offsetTop - 44-36){
          this.mark = 1;
      }
      if(scrolled > doms[2].offsetTop - 44-36 && scrolled < doms[3].offsetTop - 44-36){
          this.mark = 2;
      }
      if(scrolled > doms[3].offsetTop - 44-36 && scrolled < doms[4].offsetTop - 44-36){
          this.mark = 3;
      }
      if(scrolled > doms[4].offsetTop - 44-36){
          this.mark = 4;
      }
        // console.log(doms[0].offsetTop + "||" + scrolled +"||"+this.mark);
      this.nav.forEach((value, index, arr) => {
        if (index == this.mark) {
          value.isActive = true;
        } else {
          value.isActive = false;
        }
      });
    },
    getDetail(){
        getResult('get',`/zc/v1/open/zcproject/${this.$route.params.id}`).then((res)=>{
            if(res.result === 0){
                this.detailObj = res.data;
                this.userInfo = this.detailObj.projectUserDTO == null ? {}:this.detailObj.projectUserDTO;
                this.userId = res.data.userId;
                this.detailObj.raisedAmt.toFixed(2);
                if(this.detailObj.status === 2){
                    this.btnActive=true;
                }else{
                    this.btnActive=false;
                }
            }
        })
    },
    goReback(){
        if(this.btnActive){
            this.$router.push({name:'reback',params:{id:this.$route.params.id}})
        }

    },
    share(){
        this.isWechart=true;
        getResult('post','/user/v1/open/wechat',{url:window.location.href}).then((res)=>{
            if(res.status === 0){
                this.weChart = res.data;
                if(this.checkDevice().isWeixin){
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: this.weChart.appId, // 必填，公众号的唯一标识
                        timestamp: this.weChart.timestamp, // 必填，生成签名的时间戳
                        nonceStr: this.weChart.nonceStr, // 必填，生成签名的随机串
                        signature: this.weChart.signature,// 必填，签名
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
                    });
                    wx.ready(()=>{
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                        //分享给朋友
                        wx.onMenuShareAppMessage({
                            title: this.detailObj.projectName, // 分享标题
                            desc: this.detailObj.productBrief, // 分享描述
                            link: `${hostUrl}/detailzc/${this.$route.params.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: this.staticUrl+this.detailObj.appCoverImage[0].filePath, // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                            }
                        });
                        // 分享到朋友圈
                        wx.onMenuShareTimeline({
                            title: this.detailObj.projectName, // 分享标题
                            desc: this.detailObj.productBrief, // 分享描述
                            link: `${hostUrl}/detailzc/${this.$route.params.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: this.staticUrl+this.detailObj.appCoverImage[0].filePath, // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                            }
                        });
                    });
                }
            }
        })

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
    clickLove(){
        getResult('get','/user/v1/curruser').then((res)=>{
            if(res.result === 0){
                this.active = !this.active;
                console.log(this.active);
                if(this.active){
                    getResult('post','/group/v1/collection',{projectId:this.$route.params.id,projectType:0}).then((res)=>{
                        this.getSelectNum();
                    })
                }else{
                    getResult('put','/group/v1/collection',{projectId:this.$route.params.id,projectType:0}).then((res)=>{
                        this.getSelectNum();
                    })
                }
            }else{
                this.$router.push({name:'login',query:{returnUrl:`detailzc/${this.$route.params.id}`}})
            }
        })


    },
    getSelect(){
        getResult('get',`/group/v1/collection/0/${this.$route.params.id}`).then((res)=>{
            if(res.result === 0){
                this.active = true;
            }
        })
    },
    getSelectNum(){
        getResult('get',`/group/v1/open/collection/project/0/${this.$route.params.id}`).then((res)=>{
            if(res.result === 0){
                this.selectNum = res.data.collectionCount;
            }
        })
    },
    getComentsNum(){
        getResult('get',`/operate/v1/open/comment/count/${this.$route.params.id}/0`).then((res)=>{
            if(res.result === 0){
                this.comentsNum = res.data;
            }
        })
    },
    clickComents(){
        this.isShowModal = true;
    },
    goDownload(){
        this.$router.push({name:'download'})
    }
  },
  mounted() {
    this.$nextTick(()=> {
      window.addEventListener("scroll", this.onScroll);
    });
    this.getDetail();
    this.share();
    this.getSelect();
    this.getSelectNum();
    this.getComentsNum();
  },
  destroyed() {
    console.log("我已经离开了！");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.removeEventListener("scroll", this.onScroll);
 },
};
</script>

