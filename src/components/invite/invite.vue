<template>
    <div class="invite">
        <div class="header">
            <div class="content">
                <i class="icon-line-left" @click="goPrv()"></i>
                <p class="title">邀请好友，奖励铼米币</p>
                <!-- <i class="share"><img src="../../assets/img/icon-share.png"/></i> -->
            </div>
        </div>

        <div class="top">
            <div class="t-box">
                <div class="strategy" @click="goShow()">获奖攻略</div>
                <div class="mybtn">立即邀请 领取铼米币</div>
            </div>
        </div>

        <div class="bottom">
            <div class="title">
                <div class="t-box">
                    <img class="imgOne" src="../../assets/img/bg@2x.png"/>
                    <span class="b-title">我邀请的好友</span>
                    <img class="imgTwo" src="../../assets/img/bg@2x.png"/>
                </div>
            </div>
            <div class="list">
                <div class="content">
                    <span class="left">被邀请人</span>
                    <span class="right">注册时间</span>
                </div>
                <div class="l-content">
                    <span class="left">132****9999</span>
                    <span class="right">2018-06-26 19:00:08</span>
                </div>
            </div>
        </div>

        <v-modal :isShow="isshow" :width="300" @close="isshow=false">
            <div class="info-box">
                <h3>获奖攻略</h3>
                <p> 1、通过铼米APP“邀请有奖”分享活动页至微信，邀请好友注册；<br/>
                    2、老用户邀请新人注册成功可获得1个铼米币，被邀请人可获得1个铼米币，新用户注册成功后也可在铼米APP参加该活动；<br/>
                    3、所有用户获得的铼米币只能在铼米APP查看；<br/>
                    4、活动时间：长期有效；<br/>
                    5、您邀请的好友必须是铼米新用户，同一手机号、同一身份证号、同一设备视为同一用户，若发现作弊行为，铼米有权取消您的获奖资格；<br/>
                    6、若有其它疑问请咨询铼米客服：4000-925-008。</p>
                <div class="btn-box">
                    <span @click="goHidden()">我知道了</span>
                </div>
            </div>
        </v-modal>

        <div class="footer">若有疑问请咨询铼米客服：4000-925-008</div>
    </div>
</template>

<script>
    import modal from "@/components/base/modal/modal"
    export default {
        name: "invite",
        data(){
          return{
              isshow:false
          }
        },
        methods:{
            goShow(){
              this.isshow = true
            },
            goHidden(){
                this.isshow = false
            },
            goPrv(){
                window.history.go(-1)
            }
        },
        components:{
            "v-modal":modal
        }
    }
</script>

<style scoped lang="scss">
.invite{
    width: 100%;
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
        .list{
            width: 90%;
            margin: 0 auto;
            .content{
                width: 100%;
                height: 40px;
                line-height: 40px;
                color: #9FA3B0;
                font-size: 14px;
                .left{
                    float: left;
                }
                .right{
                    float: right;
                }
            }
            .l-content{
                width: 100%;
                height: 40px;
                line-height: 40px;
                margin: 0 auto;
                .left{
                    float: left;
                    color: #393A3F;
                    font-size: 16px;
                }
                .right{
                    float: right;
                    font-size: 14px;
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
