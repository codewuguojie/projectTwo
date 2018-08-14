<template>
    <div class="signIn">
        <div class="top" v-if="from">
            <i @click="goSet()" class="icon-line-left"></i>
            <span class="title">每日签到</span>
        </div>
        <div class="content">
            <div class="imgOne"></div>
            <div class="signIn-day">
                <div class="day">
                    <ul>
                        <li>
                            <dl :class="{dlOne:classShow}">
                                <dt>第{{day}}天</dt>
                                <dd>{{day*2>10?10:day*2}}</dd>
                            </dl>
                            <strong :class="{strongOne:classShow}"></strong>
                        </li>
                        <li>
                            <dl>
                                <dt>第{{day+1}}天</dt>
                                <dd>{{(day+1)*2>10?10:(day+1)*2}}</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>第{{day+2}}天</dt>
                                <dd>{{(day+2)*2>10?10:(day+2)*2}}</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>第{{day+3}}天</dt>
                                <dd>{{(day+3)*2>10?10:(day+3)*2}}</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>第{{day+4}}天</dt>
                                <dd>{{(day+4)*2>10?10:(day+4)*2}}</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>第{{day+5}}天</dt>
                                <dd>{{(day+5)*2>10?10:(day+5)*2}}</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dt>第{{day+6}}天</dt>
                                <dd>{{(day+6)*2>10?10:(day+6)*2}}</dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <div class="rex-day">
                    <h2 class="count" v-if="rexShow">+{{count}}REX</h2>
                    <p>今日可获铼米币 | 连续签到&nbsp;<a>{{successDay}}</a>&nbsp;天</p>
                </div>
                <span :class="{activeBtn:btnShow,signInBtn:!btnShow}" @click="signIn()">{{text}}</span>
            </div>
            <div class="rules">
                <div class="title">
                    <h3 class="title-rules">活动规则</h3>
                    <p class="bottom-box"></p>
                </div>
                <div class="content-rules">
                    <p class="rules-detail">
                        1、连续5天签到分别获得(2、4、6、8、10)个铼米币；<br/><br/>
                        2、第5天之后保持连续签到，可持续每天获得10个铼米币；<br/><br/>
                        3、中断连续签到，则需要重新从第1天获得2个铼米币开始；<br/><br/>
                        4、若发现作弊行为，铼米有权取消您的获奖资格；<br/><br/>
                        5、若有其它疑问请咨询铼米客服：4000-925-008；<br/><br/>
                        6、该活动的最终解释权归上海铼米科技有限公司所有。
                    </p>
                </div>
            </div>
        </div>
        <v-modal :isShow="resultShow" :width="250" @close="isshow=false">
            <div class="result">
                <dl>
                    <dt><img src="../../assets/img/money.png"/></dt>
                    <dd @click="resultShow=false">我知道了</dd>
                </dl>
            </div>
        </v-modal>
    </div>
</template>

<script>
    import {getResult} from "../../api/common";
    import modal from '../base/modal/modalNew'
    import {Toast} from 'mint-ui'

    export default {
        name: "signIn",
        components:{
          "v-modal":modal
        },
        data(){
          return{
              day:1,
              successDay:0,
              text:'立即签到',
              hadRex:2,
              count:2,
              btnShow:false,
              resultShow:false,
              from:true,
              classShow:false,
              rexShow:false,
              resultShow:false
          }
        },
        methods:{
            goSet(){
                window.history.go(-1)
            },
            signIn(){
                getResult('post','/activity/v1/sign',{
                    fromType:1
                })
                    .then(msg=>{
                        if(msg.result == 0){
                            this.btnShow = true
                            this.text = '已签到'
                            getResult('get','/activity/v1/sign')
                                .then(msg=>{
                                    if(msg.result == 0){
                                        console.log(msg.data)
                                        this.classShow = true
                                        this.rexShow = true
                                        this.resultShow = true
                                        if(msg.data.signDays == 0){
                                            this.day = msg.data.signDays + 1
                                        }else {
                                            this.day = msg.data.signDays
                                        }
                                        this.successDay = msg.data.signDays
                                        if(this.day>=5){
                                            this.count = 10
                                        }else {
                                            this.count = this.day * 2
                                        }
                                    }
                                })
                        }else {
                            Toast('今天已经签到完成')
                        }
                    })
            }
        },
        mounted(){

            let getCookie = this.$route.query.session_token
            if(getCookie){
                //alert(getCookie)
                this.$cookies.set('JSESSIONID',getCookie)
            }

            if(this.$route.query.from !=undefined){
                this.from = false
            }else {
                this.from = true
            }
            getResult('get','/activity/v1/sign')
                .then(msg=>{
                    if(msg.result == 0){
                        console.log(msg.data)
                        if(msg.data.currSign == 1){
                            this.classShow = true
                            this.btnShow = true
                            this.rexShow = true
                            this.text = '已签到'
                            this.day = msg.data.signDays
                        }else {
                            this.classShow = false
                            this.btnShow = false
                            this.rexShow = false
                            this.text = '立即签到'
                            this.day = msg.data.signDays + 1
                        }
                        this.successDay = msg.data.signDays
                        if(this.day>=5){
                            this.count = 10
                        }else {
                            this.count = this.day * 2
                        }
                    }
                })
        }
    }
</script>

<style scoped lang="scss">
.signIn{
    width: 100%;
    background: #F8F8F8;
    .top{
        width: 100%;
        height: 44px;
        font-size: 18px;
        color: #393A3F;
        line-height: 45px;
        background: #fff;
        margin-bottom: 10px;
        i{
            margin-left: 15px;
            vertical-align: text-top;
        }
        span{
            float: left;
            width: 100%;
            height: 100%;
            text-align: center;
            margin-top: -44px;
            font-weight: bold;
        }
    }
    .content{
        width: 94%;
        padding: 0 3%;
        .imgOne{
            width: 100%;
            height: 84px;
            background: url("../../assets/img/bg_Signin@2x.png") no-repeat;
            background-size: 100%;
        }
        .signIn-day{
            width: 100%;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 8px #ccc;
            ul{
                overflow: hidden;
                width: 94%;
                margin: 10px 3%;
                li{
                    width: 14.28%;
                    height: 90px;
                    float: left;
                    dl{
                        width: 100%;
                        height: 70px;
                        background: #7abafa;
                        dt{
                            width: 100%;
                            height: 30px;
                            font-size: 12px;
                            line-height: 30px;
                            text-align: center;
                            color: #fff;
                        }
                        dd{
                            width: 70%;
                            height: 40px;
                            background: url("../../assets/img/icon_gold@2x.png") no-repeat;
                            background-size: 100%;
                            line-height: 34px;
                            text-align: center;
                            font-size: 16px;
                            color: #fff;
                            margin-left: 15%;
                        }
                    }
                    strong{
                        display: block;
                        width: 0;
                        height: 0;
                        margin: 0 auto;
                        border-top: 10px solid #7abafa;
                        border-right: 10px solid #fff;
                        border-bottom: 0 solid #fff;
                        border-left: 10px solid #fff;
                    }
                    .strongOne{
                        display: block;
                        width: 0;
                        height: 0;
                        margin: 0 auto;
                        border-top: 10px solid #218CF7;
                        border-right: 10px solid #fff;
                        border-bottom: 0 solid #fff;
                        border-left: 10px solid #fff;
                    }
                    .dlOne{
                        background: #218CF7;
                    }
                }
            }
            .rex-day{
                width: 90%;
                margin: 0 5%;
                .count{
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    color: #393A3F;
                    font-size: 24px;
                    margin: 10px 0;
                    font-weight: 600;
                }
                p{
                    width: 100%;
                    margin: 0 0 30px;
                    font-size: 12px;
                    color: #393A3F;
                    a{
                        color: orangered;
                    }
                }
            }
            .signInBtn{
                display: block;
                width: 220px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                margin: 0 auto 30px;
                color: #fff;
                font-size: 14px;
                border-radius: 20px;
                background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
            }
            .activeBtn{
                display: block;
                width: 220px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                margin: 0 auto 30px;
                color: #fff;
                font-size: 14px;
                border-radius: 20px;
                background: #E3E7ED;
            }
        }
        .rules{
            width: 100%;
            margin-top: 17px;
            .title{
                width: 100%;
                height: 37px;
                margin: 0 0 17px;
                .title-rules{
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    font-size: 14px;
                    font-weight: 600;
                }
                .bottom-box{
                    width: 30px;
                    height: 2px;
                    background: #218CF7;
                }
            }
            .content-rules{
                width: 100%;
                .rules-detail{
                    width: 100%;
                    font-size: 14px;
                    padding-bottom: 20px;
                    color: #61687C;
                }
            }
        }
    }
    .result{
        width: 100%;
        dl{
            width: 100%;
            dt{
                width: 100%;
                height: 250px;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            dd{
                width: 144px;
                height: 40px;
                border: 1px solid #ccc;
                border-radius: 20px;
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                color: #fff;
                margin: 10px auto 0;
            }
        }
    }
}
</style>
