<template>
    <div class="invite">
        <div class="top">
            <div class="t-box">
                <div class="strategy" @click="goShow()">获奖攻略</div>
                <div class="mybtn" @click="goRegister()">我要注册 获得铼米币</div>
            </div>
        </div>

        <div class="bottom">
            <div class="title">
                <div class="t-box">
                    <img class="imgOne" src="../../assets/img/bg@2x.png"/>
                    <span class="b-title">获奖攻略</span>
                    <img class="imgTwo" src="../../assets/img/bg@2x.png"/>
                </div>
            </div>
            <div class="introduction">
                <div class="i-content">
                    <p>1、通过铼米APP“邀请有奖”分享活动页至微信，邀请好友注册；</p>
                    <p>2、老用户邀请一个新人注册成功可获得500个铼米币，被邀请人可获得300个铼米币，新用户注册成功后也可在铼米APP参加该活动；</p>
                    <p>3、老用户邀请新人注册每天最高可获得3万铼米币；</p>
                    <p>4、活动时间：长期有效；</p>
                    <p>5、您邀请的好友必须是铼米新用户，同一手机号、同一身份证号、同一设备视为同一用户，若发现作弊行为，铼米有权取消您的获奖资格；</p>
                    <p>6、若有其它疑问请咨询铼米客服：4000-925-008；</p>
                    <p>7、该活动的最终解释权归上海铼米科技有限公司所有。</p>
                </div>
            </div>
        </div>



        <!--<div class="footer">若有疑问请咨询铼米客服：4000-925-008</div>-->
    </div>
</template>

<script>
    import modal from "@/components/base/modal/modal"
    import {hostUrl,getResult }from "../../api/common.js"
    import * as wx from 'weixin-js-sdk'
    export default {
        name: "invited",
        components:{
            "v-modal":modal
        },
        data(){
            return{
                isshow:false,
                shareObj:{}
            }
        },
        methods:{
            goShow(){
                document.body.scrollTop = 546;
                document.documentElement.scrollTop = 546;
                console.log(document.documentElement.scrollTop);
            },
            goHidden(){
                this.isshow = false
            },
            goRegister(){
                this.$router.push({name:'register',query:{returnUrl:`${hostUrl}/activity?userId=${this.$route.query.userId}`,userId:this.$route.query.userId}})
            },
            share(){
                this.shareObj = {
                    title:'邀请好友，每天最高可获得20万铼米币',
                    detail:'成功邀请一个新人可获得2000个铼米币',
                    imgUrl:`${hostUrl}/static/img/share.png`
                }
                console.log(this.shareObj);
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
                                    title: this.shareObj.title, // 分享标题
                                    desc: this.shareObj.detail, // 分享描述
                                    link: `${hostUrl}/invited?userId=${this.$route.params.userId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: this.shareObj.imgUrl, // 分享图标
                                    type: 'link', // 分享类型,music、video或link，不填默认为link
                                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                    success: function () {
                                    }
                                });
                                // 分享到朋友圈
                                wx.onMenuShareTimeline({
                                    title: this.shareObj.title, // 分享标题
                                    desc: this.shareObj.detail, // 分享描述
                                    link: `${hostUrl}/invited?userId=${this.$route.query.userId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: this.shareObj.imgUrl, // 分享图标
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
        },
        mounted(){
            this.share();
        }

    }
</script>

<style scoped lang="scss">
    .invite{
        width: 100%;
        height: 100%;
        background: #F8F8F8;
        .header{
            width: 100%;
            height: 44px;
            background: #fff;
            .content{
                width: 90%;
                margin: 0 5%;
                .icon-line-left{
                    height: 44px;
                    float: left;
                    width: 15%;
                    line-height: 44px;
                    font-size: 18px;
                    text-align: left;
                    display: inline-block;
                }
                p{
                    display: inline-block;
                    font-size: 18px;
                    height: 44px;
                    line-height: 44px;
                    color: #393A3F;
                    width: 70%;
                    text-align: center;
                }
                .share{
                    margin-top: 11px;
                    float: right;
                    width: 15%;
                    img{
                        float: right;
                    }
                }
            }
        }
        .top{
            width: 100%;
            height: 470px;
            background: #fff;
            .t-box{
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: url("../../assets/img/bg1@2x.png") no-repeat;
                background-size: 100%;
                .strategy{
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    background: #FB6B38;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    border-radius: 15px 0 0 15px;
                    float: right;
                    margin-top: 15px;
                }
                .mybtn{
                    width: 305px;
                    height: 44px;
                    font-size: 16px;
                    line-height: 44px;
                    text-align: center;
                    border-radius: 22px;
                    color: #fff;
                    margin: 390px auto 0;
                    background: -webkit-linear-gradient(left, #FD7B45, #FD5429); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(left, #FD7B45, #FD5429); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(left, #FD7B45, #FD5429); /* Firefox 3.6 - 15 */
                    background: linear-gradient(left, #FD7B45, #FD5429); /* 标准的语法 */
                    box-shadow: 0 6px 15px 0 rgba(251,107,56,0.40);
                }
            }
        }
        .bottom{
            background: #fff;
            margin-top: 10px;
            .title{
                width: 100%;
                height: 50px;
                overflow: hidden;
                .t-box{
                    width: 190px;
                    height: 50px;
                    margin: 0 auto;
                    img{
                        width: 30px;
                        height: 20px;
                        margin-top: 15px;
                    }
                    .imgOne{
                        float: left;
                    }
                    .imgTwo{
                        float: right;
                    }
                    .b-title{
                        display: inline-block;
                        font-size: 18px;
                        color: #393A3F;
                        font-weight: 700;
                        line-height: 50px;
                        text-align: center;
                        width: 110px;
                        padding: 0 10px;
                    }
                }

            }
            .introduction{
                width: 90%;
                margin: 0 auto;
                .i-content{
                    width: 100%;
                    font-size: 14px;
                    padding-bottom: 20px;
                    p{
                        margin: 15px 0;
                    }
                }
            }
        }
        .footer{
            background: #f8f8f8;
            width: 100%;
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 12px;
            color: #9FA3B0;
        }
        .info-box{
            width: 90%;
            margin: 0 auto;
            h3{
                width: 100%;
                height: 50px;
                text-align: center;
                line-height: 50px;
                font-size: 18px;
                color: #393A3F;
                font-weight: 700;
            }
            p{
                font-size: 14px;
                color: #393A3F;
            }
            .btn-box{
                width: 100%;
                height: 44px;
                margin: 20px 0;
                span{
                    display: block;
                    width: 220px;
                    height: 100%;
                    line-height: 44px;
                    border-radius: 22px;
                    margin: 0 auto;
                    color: #fff;
                    background: -webkit-linear-gradient(bottom, #FD7B45, #FD5429); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(bottom, #FD7B45, #FD5429); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(bottom, #FD7B45, #FD5429); /* Firefox 3.6 - 15 */
                    background: linear-gradient(bottom, #FD7B45, #FD5429); /* 标准的语法 */
                    font-size: 16px;
                    text-align: center;

                }
            }
        }
    }
</style>
