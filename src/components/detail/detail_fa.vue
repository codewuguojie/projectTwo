<template>
<div class="detail">
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiperSlide v-for="(item,index) in detailObj.listImage" :key="index"><img :src="staticUrl+item.filePath"></swiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div :class="{'topfixed':!isScroll ,'topfixed bgActive':isScroll}">
        <span class="span1 icon-line-left" @click="goHome()"></span>
        <span class="span2" v-if="isScroll">项目详情</span>
    </div>
    <!-- 项目基本信息 -->
    <div class="projects">
        <div class="project-info">
            <p class="title">{{detailObj.projectName}}</p>
            <p class="types">
                <span class="span1">{{detailObj.financeType == 0?'股权融资':'债券融资'}}</span>
                <span class="span2">{{detailObj.atStage | zrProgress}}</span>
                <span class="span3">{{detailObj.industry |zrType}}</span>
            </p>
            <p class="nums">
                <span class="span1">
                    <p class="p1">{{detailObj.targetAmt}}</p>
                    <p class="p2">目标金额</p>
                </span>
                <span>
                    <p class="p1">{{detailObj.sellShares}}%</p>
                    <p class="p2">出让股份</p>
                </span>
                <span class="span3">
                    <p class="p3"><b class="icon-address"></b>&nbsp;&nbsp;{{detailObj.address}}</p>
                </span>
            </p>
            <p class="texts clearfix">
            <span class="span1">退出机制</span>
            <span class="span2">{{detailObj.exitPolicy}} </span>
            </p>
            <p class="texts clearfix text2">
            <span class="span1">分红说明</span>
            <span class="span2">{{detailObj.dividendExplain}} </span>
            </p>
        </div>
    </div>
    <!-- 用户信息 -->
    <div class="user">
        <div class="user-info">
            <div class="title">发起人信息</div>
            <div class="details clearfix">
                <span class="left icon-wechart-share"></span>
                <span class="right">
                    <p class="p1">{{userInfo.username |cutoutNum}}</p>
                    <p class="p3 icon-address">&nbsp;{{userInfo.province == null?'':userInfo.province}}<b>{{userInfo.city == null?'':userInfo.city}}</b></p>
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
                    <p class="p1">企业信息</p>
                    <p class="p2"></p>
                </div>
                <div class="info1 clearfix">
                    <span class="span1">企业名称</span>
                    <span class="span2">{{detailObj.enterpriseName}}</span>
                </div>
                <div class="info1 clearfix">
                    <span class="span1">企业人数</span>
                    <span class="span2">{{detailObj.employeeNum}}人</span>
                </div>
                <div class="info1 clearfix">
                    <span class="span1">成立时间</span>
                    <span class="span2">{{detailObj.enterpriseCreateDate}}</span>
                </div>
                <div class="info1 clearfix">
                    <span class="span1">办公地址</span>
                    <span class="span2">{{detailObj.enterpriseAddress}}</span>
                </div>
                <div class="info1 clearfix">
                    <span class="span1">企业简介</span>
                    <span class="span2" v-html="detailObj.enterpriseDesc"></span>
                </div>
            </div>
            <div class="nav-detail2 nav-detail1">
                <div class="title">
                    <p class="p1">商业模式</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.profitModel" class="fu-texts"></div>
            </div>
            <div class="nav-detail3 nav-detail1">
                <div class="title">
                    <p class="p1">股东及高管团队</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.sharesTeam" class="fu-texts"></div>
                <div v-html="detailObj.notSharesTeam" class="fu-texts"></div>
            </div>
            <div class="nav-detail4 nav-detail1">
                <div class="title">
                    <p class="p1">项目历史</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.historyExecDoc" class="fu-texts"></div>
            </div>
             <div class="nav-detail5 nav-detail1">
                <div class="title">
                    <p class="p1">未来计划</p>
                    <p class="p2"></p>
                </div>
                <div v-html="detailObj.futurePlan" class="fu-texts"></div>
            </div>
             <div class="nav-detail6 nav-detail1">
                <div class="title">
                    <p class="p1">项目附件</p>
                    <p class="p2"></p>
                </div>
                <div class="doc clearfix">
                    <span class="left">米筹金服服务计划书</span>
                    <span class="right">点击预览</span>
                </div>
                 <div class="doc clearfix" v-for="item in detailObj.projectDoc">
                    <span class="left">{{item.fileName}}</span>
                    <span class="right"><a :href="staticUrl+item.filePath">点击预览</a></span>
                </div>
            </div>
        </div>

    </div>
    <div class="bottomFixed">
        <span class="first icon-service"></span>
        <span :class="{'second icon-heart-active':active,'second icon-heart':!active}" @click="clickLove()"></span>
        <p class="third">{{selectNum}}</p>
        <span class="last">我感兴趣</span>
    </div>

</div>

</template>
<script>
import "./detail.scss";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import {getResult,staticUrl,hostUrl} from "../../api/common"
import * as wx from 'weixin-js-sdk'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      isShowNav: false,
      detailObj:{},
      userInfo:{},
      staticUrl:staticUrl(),
      mark:0,
      isScroll:false,
      active:false,
      selectNum:0,
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
        { text: "企业信息", isActive: true },
        { text: "商业模式", isActive: false },
        { text: "股东及高管团队", isActive: false },
        { text: "项目历史", isActive: false },
        { text: "未来计划", isActive: false },
        { text: "项目附件", isActive: false }
      ]
    };
  },
  methods: {
    goHome() {
      this.$router.push({ name: "first" });
    },
    changeNav(mark) {
      // tab切换
      this.mark = mark;
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
     if(scrolled > doms[4].offsetTop - 44-36 && scrolled < doms[5].offsetTop - 44-36){
          this.mark = 4;
      }
      if(scrolled > doms[5].offsetTop - 44-36){
          this.mark = 5;
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
        getResult('get',`/fa/v1/open/faproject/${this.$route.params.id}`).then((res)=>{
            if(res.result === 0){
                this.detailObj = res.data;
                this.userInfo = this.detailObj.projectUserDTO;
            }
        })
    },
    share(){
        getResult('post','/user/v1/open/wechat',{url:`${hostUrl}/#/detailzc/${this.$route.params.id}`}).then((res)=>{
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
                            link: `${hostUrl}/#/detailzc/${this.$route.params.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
                            link: `${hostUrl}/#/detailzc/${this.$route.params.id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
        this.active = !this.active;
        console.log(this.active);
        if(this.active){
            getResult('post','/group/v1/collection',{projectId:this.$route.params.id,projectType:1}).then((res)=>{
                this.getSelectNum();
            })
        }else{
            getResult('put','/group/v1/collection',{projectId:this.$route.params.id,projectType:1}).then((res)=>{
                this.getSelectNum();
            })
        }

    },
    getSelect(){
        getResult('get',`/group/v1/collection/1/${this.$route.params.id}`).then((res)=>{
            if(res.result === 0){
                this.active = true;
            }
        })
    },
    getSelectNum(){
        getResult('get',`/group/v1/open/collection/project/1/${this.$route.params.id}`).then((res)=>{
            if(res.result === 0){
                this.selectNum = res.data.collectionCount;
            }
        })
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.onScroll);
    });
    this.getDetail();
    this.getSelect();
    this.getSelectNum();
    this.share();
  },
  destroyed() {
    console.log("我已经离开了！");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.removeEventListener("scroll", this.onScroll);
 },
};
</script>

