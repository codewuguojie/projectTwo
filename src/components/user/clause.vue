<template>
    <div class="clause">
        <div class="top" v-if="from">
            <i @click="goRegister()" class="icon-line-left"></i>
            <span class="title">隐私政策</span>
        </div>
        <div class="content" v-if="!outLine" v-html="content"></div>

        <!--无网络状态显示页面-->
        <div class="outLine" v-if="outLine">
            <div class="content">
                <img src="../my/img/img_network.png"/>
                <h3>您的网络好像出现了问题</h3>
                <span @click="myReload()">重新加载</span>
            </div>
        </div>

    </div>
</template>

<script>
    import {getResult} from "../../api/common";

    export default {
        name: "clause",
        data(){
            return{
                content:'',
                from:true,
                outLine:false
            }
        },
        methods:{
            goRegister(){
                this.$router.push({name:'register'})
            },
            myReload(){
                window.location.reload()
            }
        },
        mounted(){
            if(this.$route.query.from !=undefined){
                this.from = false
            }else {
                this.from = true
            }
            getResult('get',`/operate/v1/open/company/${'隐私政策'}`)
                .then(data=>{
                    if(data.data != null && data.data.length > 0){
                        this.content = data.data[0].content
                    }
                })
        }
    }
</script>

<style scoped lang="scss">
    .clause{
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
            width: 90%;
            padding: 0 5%;
            background: #fff;
        }
        .outLine{
            width: 100%;
            height: 91.9%;
            background: #f8f8f8;
            position: relative;
            .content{
                position: absolute;
                margin: auto;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 158px;
                height: 200px;
                background: #f8f8f8;
                img {
                    display: block;
                    width: 144px;
                    height: 98px;
                    margin: 0 auto;
                }
                h3{
                    margin-top: 20px;
                    font-size: 14px;
                    text-align: center;
                    color: #61687C;
                }
                span{
                    display: block;
                    width: 70px;
                    height: 30px;
                    background: #218CF7;
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 15px;
                    margin: 10px auto 0;
                }
            }
        }
    }
</style>
