<template>
    <div class="pay">
            <div class="paytop">
                <i class="icon-line-left" @click="goCheck()"></i>
                <span>支付</span>
            </div>
            <div class="paycont">
                <div class="payorder">
                    <p class="paycode">订单编号：<span>{{orderNo}}</span></p>
                    <p class="paymoney">应付金额：<span>¥{{orderPrice}}</span></p>
                    <p class="paytips">订单提交成功，请您尽快完成支付，否则订单会被自动取消！</p>
                </div>
                <div class="paytype">
                    <p class="paytitle">选择支付方式</p>
                    <div class="typeone">
                        <p class="alipay">
                            <i class="icon-alipay"></i><b class="wenzi">支付宝支付</b>
                        </p>
                        <p class="input" >
                            <span :class="{'icon-Selected':isAlipay,'icon-unselected':!isAlipay}" @click="isAlipay=!isAlipay"></span>
                        </p>
                    </div>
                    <div class="typetwo">
                        <p class="wepay">
                            <i class="icon-wepay"></i><b class="wenzi">微信支付</b>
                        </p>
                        <p class="input" >
                            <span :class="{'icon-Selected':!isAlipay,'icon-unselected':isAlipay}" @click="isAlipay=!isAlipay"></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="paybottom">
                <button @click="submitPay()" :class="{'btn-disabled':isDisabled}" :disabled="isDisabled">立即支付</button>
            </div>
            <div class="fixed-modal" v-if="isWechart">
                <div class="title3"><img src="./img/go.svg"></div>
                <div class="title1"><p class="p1">因浏览器限制，请点击右上角</p><p>选择其他浏览器打开</p></div>
                <div class="title2"><span @click="isWechart=!isWechart">我知道了</span></div>
            </div>
        </div>
</template>
<script>
import {getResult, staticUrl,hostUrl} from'../../api/common'
import pingpp from 'pingpp-js'
import pingpp2 from 'pingpp-js/dist/pingpp_ui'
import checkVue from './check.vue';
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            orderNo:'',
            orderPrice:'',
            isAlipay:true,
            isWechart:false,
            payType:4,
            hostUrl:hostUrl,
            isDisabled:false,
        }
        
    },
    methods:{
        
        goCheck(){
            if(this.$route.query.returnUrl){
               window.location.href = this.$route.query.returnUrl;
            }else{
                this.$router.push({'name':'check',params:{id:this.$route.params.id},query:{goodsId:this.$route.query.goodsId,count:this.$route.query.count}})
            }
            
        },
        getDetail(){
           getResult('get',`/order/v1/order/${this.$route.query.id}`).then((res)=>{
               if(res.result === 0){
                    this.orderPrice = res.data.orderPrice;
                    this.orderNo = res.data.orderNo;
               }    

           })
        },
        pay(){
            getResult('post',"/pay/v1/pay",{orderId:parseInt(this.$route.query.id),payChannelCode:this.payType}).then(res=>{
                if(res.result === 0){
                    pingpp.createPayment(res.data.payResponse, function(result, err){
                        // 可按需使用 alert 方法弹出 log
                        console.log(result);
                        console.log(err.msg);
                        console.log(err.extra);
                        if (result == "success") {
                            // 只有微信公众号 (wx_pub)、QQ 公众号 (qpay_pub)支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
                        } else if (result == "fail") {
                            this.isDisabled = false;
                            alert('微信不存在请先下载');
                            // Ping++ 对象不正确或者微信公众号 / QQ公众号支付失败时会在此处返回
                        } else if (result == "cancel") {
                            this.isDisabled = false;
                            alert('微信不存在请先下载');
                            // 微信公众号支付取消支付
                        }
                    });
                }else{
                    Toast(res.msg);
                    this.isDisabled = false;
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
        getCurrent(){
            getResult('get','/user/v1/curruser').then((res)=>{
                if(res.result === -2){
                    this.$router.push({name:'login',query:{returnUrl:`/#/pay/${this.$route.params.id}?id=${this.$route.query.id}`}})
                }
            })
        },
        submitPay(){
            this.isDisabled = true;
            if(this.isDisabled){

            }
            console.log(this.isDisabled);
            if(this.isAlipay ){
                if(this.checkDevice().isWeixin ){    //是否在微信端     
                    console.log('是微信');
                    this.isWechart = true;
                    this.isDisabled = false;
                    return;
                } 
            }
            if(!this.isAlipay){
                if(this.checkDevice().isWeixin ){    //是否在微信端   
                    this.isWechart = true;
                    // const redirectUri = encodeURIComponent(`https://www.i8dao.com/pay/wechatapp/BD20180620110559933019`) 
                    // console.log(redirectUri);
                    // const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='
                    //     + 'wx258309c3e0955c02'
                    //     + '&redirect_uri='
                    //     + redirectUri
                    //     + '&response_type=code&scope=snsapi_userinfo&state=web#wechat_redirect'
                    // window.location.href = url
                    console.log('是微信');
                    this.isDisabled = false;
                    return;
                }
                this.payType = 5;  
                
            }
            this.pay();
        },
    },
    mounted(){
        console.log(this.hostUrl);
        this.getCurrent();
        this.getDetail();
        

    }
}

</script>

<style lang="scss" scoped>
    /*支付页面*/
    .pay{
        width: 100%;
        height: 100%;
        background: #f8f8f8;
        .paytop{
            width: 100%;
            // height: 44px;
            font-size: 18px;
            color: #393A3F;
            line-height: 45px;
            background: #FFFFFF;
            i{
                margin-left: 5%;
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
        .paycont{
            width: 100%;
            height: 180px;
            background: #fff;
            box-shadow: 0 -3px 10px 0 #F8F8F8;
            .payorder{
                width: 100%;
                p{
                    width: 345px;
                    height: 60px;
                    line-height: 60px;
                    margin:0 auto;
                }
                .paycode{
                    font-size: 15px;
                    span{
                        font-size: 15px;
                        color: #1B0000;
                    }
                }
                .paymoney{
                    font-size: 15px;
                    span{
                        font-size: 15px;
                        color: #FB6B38;
                    }
                }
                .paytips{
                    width:345px;
                    margin:0 auto;
                    font-size: 12px;
                    color: rgb(255,144,76);
                }
            }
            .paytype{
                width: 100%;
                background: #fff;
                margin-top: 10px;
                .paytitle{
                    width: 95%;
                    padding-left: 5%;
                    font-size: 15px;
                    line-height: 60px;
                    height: 60px;
                }
                .typeone{
                    height: 70px;
                    width: 90%;
                    padding-left: 5%;
                    padding-right: 5%;
                    .alipay{
                        font-size: 15px;
                        float: left;
                        line-height: 60px;
                        i{
                            float: left;
                            font-size: 22px;
                            margin-right: 12px;
                            margin-top: 18px;
                        }
                        .wenzi{
                            float: left;
                            height: 60px;
                            line-height: 60px;
                        }
                    }
                    .input{
                        float: right;
                        width: 18px;
                        height: 18px;
                        margin: 20px 0;
                        .icon-unselected:before{
                            font-size: 18px;
                        }
                        .icon-Selected:before{
                            font-size: 18px;
                        }
                    }
                }
                .typetwo {
                    height: 70px;
                    width: 90%;
                    padding-left: 5%;
                    padding-right: 5%;
                    .wepay {
                        font-size: 15px;
                        float: left;
                        line-height: 60px;
                        i {
                            float: left;
                            font-size: 22px;
                            margin-right: 12px;
                            margin-top: 18px;
                        }
                        .wenzi{
                            float: left;
                            height: 60px;
                            line-height: 60px;
                        }
                    }
                    .input{
                        float: right;
                        width: 18px;
                        height: 18px;
                        margin: 20px 0;
                        .icon-unselected:before{
                            font-size: 18px;
                        }
                        .icon-Selected:before{
                            font-size: 18px;
                        }
                        
                        
                    }
                }
            }
        }
        .paybottom{
            position: fixed;
            bottom: 0;
            width: 100%;
            background: #fff;
            height: 50px;
            button{
                display: block;
                width: 90%;
                height: 34px;
                border: 0;
                font-size: 16px;
                color: #fff;
                margin: 7px auto;
                border-radius: 17px;
                background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
            }
            .btn-disabled{
                background: #E3E7ED;
                color: #9FA3B0;
            }
        }
        .fixed-modal{
            width: 100%;
            height: 100%;
            position:fixed;
            left:0;
            top: 0;
            z-index: 2000000;
            background: rgba(0, 0, 0, 0.5);
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
