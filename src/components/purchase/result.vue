<template>
    <div class="result">
        <div class="head">
            <div class="topTitle">
                <span class="span1 icon-line-left" @click="goAccount()"></span>
                <span class="text">赠送结果</span>
            </div>
        </div>
        <div class="contents">
            <div class="tips">
                <p class="p4"><img src="./img/result.png"><p>
                <p class="p1">赠送成功，请到我的钱包查看</p>
                <p class="p2">赠送金额：<b>{{this.$route.query.amount}}REX</b></p>
                <p class="p3"><span @click="goPurchase()">确定</span></p>
                
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    methods:{
        goAccount(){
            this.$router.push({name:'account'})
        },
        checkSubmit(){
            this.$router.push({name:'confirm'})
        },
        goPurchase(){
            this.$router.push({name:'account'})
        }

    }
}
</script>
<style lang="scss" scoped>
    .result{
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
                    margin-bottom: 10px;
                    color: #393A3F;
                    text-align: center;
                    b{
                        color: #00001A;
                    }
                }
                p.p2{
                    font-size: 15px;
                    color: #218CF7;
                    text-align: left;
                    line-height: 14px;
                    text-align: center;
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
                    } 
                }
                p.p4{
                    padding-top: 80px;
                    text-align: center;
                    img{
                        width: 114px;
                        // height: 98px;
                    }
                    
                }
            }
        }
        
    }
</style>


