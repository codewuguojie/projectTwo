
<template>
    <div class="pay-sucess">
        <div class="title">
            <span class="span1">支付结果</span>
            <span class="span2" @click="goList()">完成</span>
        </div>
        <div class="contents">
            <p class="img"><img src="./img/success.png"></p>
            <p class="nums"><b class="b1">成功支付：</b><b class="b2">￥{{money}}</b></p>
            <p class="show"@click="goDetail()">查看订单详情&nbsp;></p>
        </div>
        <!-- <div class="footer">
            <div class="contents">
                <p class="name"><img :src="staticUrl+detailObj.items[0].images[0].filePath"><span>{{productName}}</span></p>
                <p class="share"><span class="icon-forwarding"></span>&nbsp;&nbsp;分享项目给好友</p>
            </div>
            
        </div> -->
    </div>
</template>

<script>
import {getResult, staticUrl,hostUrl} from'../../api/common'
export default {
    data(){
        return{
            money:0,
            detailObj:{},
            staticUrl:staticUrl(),
            productName:""
        }
    },
    methods:{
        getDetail(){
            getResult('get',`/order/v1/order/${this.$route.query.orderId}`).then((res)=>{
                console.log(res);
                if(res.result === 0){
                    this.money=res.data.orderCost;
                    console.log(this.money);
                    this.detailObj = res.data;
                   
                    getResult('get',`/zc/v1/open/zcproject/${this.detailObj.items[0].projectId}`).then((res)=>{
                        if(res.result === 0 ){
                            this.productName=res.data.projectName
                        }
                    })
                }
            })
        },
        goDetail(){
            this.$router.push({name:'orderDetail',params:{id:this.$route.query.orderId}})
        },
        goList(){
            this.$router.push({name:'order',query:{all:0}})
        }
    },
    mounted(){
        console.log(this.$route.query.orderId);
        this.getDetail();
        this.$router.push({name:'success',query:{orderId:this.$route.query.orderId}})
    }
}
</script>

<style lang="scss" scoped>
.pay-sucess{
    width: 100%;
    height: 100%;
    .title{
        position: relative;
        width: 100%;
        margin:0 auto;
        text-align: center;
        padding:10px 0;
        font-size: 18px;
        color: #393A3F;
        background: #FFFFFF;
        box-shadow: 0 3px 10px 0 #F8F8F8;
        span.span1{
            display: inline-block;
            
        }
        span.span2{
            position: absolute;
            right: 15px;
            top: 10px;
        }
    }
    .contents{
        .img{
            text-align: center;
            padding-top: 40px;
            img{
                width: 144px;
                height: 97px;
            }
        }
        .nums{
            text-align: center;
            padding: 20px 0 15px 16px;
            .b1{
                font-size: 14px;
                color: #61687C;
                line-height: 22px;
            }
            .b2{
                font-size: 18px;
                color: #FB6B38;
                line-height: 22px;
            }
        }
        .show{
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            color: #218CF7;
            margin-bottom: 30px;
        }
    }
    .footer{
        width: 100%;
        height: 100%;
        background: #F8F8F8;
        padding-top: 15px;
        .contents{
            width: 345px;
            margin: 0 auto;
            background: #FFFFFF;
            border-radius: 10px;
             p {
                img{
                    width: 345px;
                    height:194px;
                    border-radius: 10px;
                }
            }
            p.share{
                font-size: 16px;
                color: #218CF7;
                line-height: 72px;
                text-align: center;

            }
            .icon-forwarding:before{
                color: #218CF7;
                line-height: 22px;
            }
            p.name{
                position: relative;
                span{
                    position: absolute;
                    left:15px;
                    bottom: 15px;
                    font-size: 16px;
                    color: #FFFFFF;
                }
            }
        }
       
        
    }
  
}
</style>
