<template>
    <div class="result">
        <div class="head">
            <div class="topTitle">
                <span class="span1 icon-line-left" @click="goAccount()"></span>
                <span class="text">转出结果</span>
            </div>
        </div>
        <div class="contents">
            <div class="tips">
                <p class="p4"><img src="./img/transucess.png"><p>
                <p class="p1">转出成功，请到小鲸库钱包查看</p>
                <p class="p2">转出金额：<b>{{count |toThousands}}REX</b></p>
                <p class="p3"><span @click="goAccount()">确定</span></p>
                
            </div>
        </div>
        <div class="footer">
            <p class="p2">点击下载小鲸库</p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            count:this.$route.query.count,
        }
    },
    methods:{
        goAccount(){
            this.$router.push({name:'account'})
        },
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
                        font-size: 16px;
                    } 
                }
                p.p4{
                    padding-top: 80px;
                    text-align: center;
                    margin-bottom: 20px;
                    img{
                        width: 144px;
                        // height: 98px;
                    }
                    
                }
            }
        }
        .footer{
            width: 100%;
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
            .p2{
                margin-top: 10px;
                text-decoration:underline;
                color: #218CF7;
            }
        }
        
    }
</style>


