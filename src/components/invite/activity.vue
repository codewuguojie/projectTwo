<template>
    <div class="invite">
        <div class="top">
            <div class="t-box">
                <div class="strategy" @click="goShow()">获奖攻略</div>
                <div class="get">恭喜您获得</div>
                <div class="your">500个铼米币</div>
                <div class="mybtn" @click="goDownload()"></div>
            </div>
        </div>

        <div class="bottom">
            <div class="title">
                <div class="t-box">
                    <img class="imgOne" src="../../assets/img/bg@2x.png"/>
                    <span class="b-title" >获奖攻略</span>
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
    export default {
        name: "activity",
        methods:{
            goDownload(){
                this.$router.push({name:'download'})
            },
            goShow(){
                document.body.scrollTop = 546;
                document.documentElement.scrollTop = 546;
                console.log(document.documentElement.scrollTop);
            },
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
                background: url("../../assets/img/bg2@2x.png") no-repeat;
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
                .get{
                    width: 100%;
                    text-align: center;
                    margin-top: 210px;
                    color: #C37C3B;
                    font-size: 18px;
                    font-weight: 700;
                }
                .your{
                    width: 100%;
                    text-align: center;
                    font-size: 34px;
                    color: #FB6B38;
                }
                .mybtn{
                    width: 248px;
                    height: 52px;
                    margin: 30px auto;
                    border-radius: 24px;
                    background: url("../../assets/img/download@2x.png") no-repeat;
                    background-size: 100%;
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
