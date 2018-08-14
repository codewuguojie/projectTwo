<template>
    <div class="transfer">
        <div class="head">
            <div class="topTitle">
                <span class="span1 icon-line-left" @click="goAccount()"></span>
                <span class="text">第三方数字钱包</span>

            </div>
        </div>
        <div class="contents">
            <div class="tips">
                <p class="p4"><img src="./img/result.png"><p>
                <p class="p1">小鲸库</p>
                <p class="p2">小鲸库专注于交易引擎，为用户提供安全、便捷和稳定的数字资产管理服务，包括一般保管，增值存管服务和虚拟资产财富管理。</p>
                <p class="p3"><span @click="goTransferout()">立即进入</span></p>
            </div>
        </div>
        <div class="footer">
            <p><b>*</b>使用第三方数字钱包可以进行REX的交易,第三方数字钱包和铼</p>
            <p>米相互独立,并无关系,此处只提供入口。</p>
        </div>
    </div>
</template>
<script>
import {getResult,hostUrl} from '../../api/common.js'
export default {
    methods:{
        goAccount(){
            this.$router.push({name:'account'})
        },
        goTransferout(){
            getResult('get','/rex/v1/whale_bank/binding_customer').then((res)=>{
                if(res.result === 0){ //isAuth:0未授权，1授权
                    if(res.data.isAuth ===1){
                        this.$router.push({name:'transferout'})
                    }else{
                        window.location.href= `${res.data.authUrl}&callback_url=${hostUrl}/transferout`;
                    }
                }
            })

        }

    }
}
</script>
<style lang="scss" scoped>
    .transfer{
        width: 100%;
        height: 100%;
        background: #ffffff;
        .head{
            position: relative;
            width: 100%;
            background: #ffffff;
            .topTitle{
                width: 100%;
                height: 44px;
                color: #000000;
                position: relative;
                line-height: 44px;
                background: #FFFFFF;
                box-shadow: 0 6px 6px 0 rgba(0,0,0,0.02);
                .span1{
                position: absolute;
                line-height: 44px;
                left: 15px;
                }
                .icon-line-left:before{
                color: #000000;
                font-size: 22px;
                }
                span.text{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    line-height: 44px;
                }

            }

        }
        .contents{
            width: 100%;
            margin-top: 10px;
            background: #ffffff;
            padding-bottom: 10px;
            .tips{
                width: 345px;
                margin:0 auto;
                padding-top: 20px;
                p.p1{
                    font-size: 16px;
                    color: #393A3F;
                    line-height: 20px;
                    margin-bottom: 15px;
                    color: #393A3F;
                    text-align: center;
                    b{
                        color: #00001A;
                    }
                }
                p.p2{
                    font-size: 12px;
                    color: #393A3F;
                    line-height: 16px;
                }
                p.p3{
                    text-align: center;
                    span{
                        display: inline-block;
                        background-image: linear-gradient(-269deg, #25BEF2 0%, #218CF7 100%);
                        border-radius: 24px;
                        width: 220px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        margin-top: 40px;
                        color: #ffffff;
                        font-size: 16px;
                    }
                }
                p.p4{
                    text-align: center;
                    img{
                        width: 60px;

                    }

                }
            }
        }
        .footer{
            position: fixed;
            left: 0;
            bottom: 20px;
            p{
                padding-left: 15px;
                font-size: 12px;
                color: #9FA3B0;
                text-align: center;
                font-size: 12px;
                line-height: 18px;
                b{
                    color: #FB6B38;
                }
            }
        }
    }
</style>


