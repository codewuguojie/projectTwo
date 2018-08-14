<template>
    <div class="us">
        <div class="top">
            <i @click="goSet()" class="icon-line-left"></i>
            <span class="title">联系我们</span>
        </div>
        <div class="content">
            <div class="msg">
                <p class="title">客服电话<span>(工作日9:00-18:00)</span></p>
                <span><a href="tel:4000-925-008">4000-925-008</a><i class="icon-more"></i></span>
            </div>
            <div class="msg" @click="goContact()">
                <p class="title">客服邮箱</p>
                <span>service@laiminet.com<i class="icon-more"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "contactUs",
        methods:{
            goSet(){
                window.history.go(-1)
            }
        }
    }
</script>

<style scoped lang="scss">
.us{
    width: 100%;
    height: 100%;
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
        width: 100%;
        .msg{
            width: 100%;
            height: 60px;
            line-height: 61px;
            padding: 5px 0 0;
            background: #fff;
            .title{
                height: 60px;
                float: left;
                padding-left: 16px;
                font-size: 15px;
                color: #393A3F;
                span{
                    line-height: 64px;
                    font-size: 12px;
                }
            }
            span{
                float: right;
                margin-right: 16px;
                font-size: 12px;
                font-size: 14px;
                a{
                    color: #218CF7;
                }
                i{
                    margin-left: 10px;
                    i:before{
                        font-size: 12px;
                    }
                }
            }
            b{
                display: block;
                width: 100%;
                text-align: center;
            }
        }
    }
}
</style>
