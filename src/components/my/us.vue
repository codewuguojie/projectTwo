<template>
    <div class="us">
        <div class="top" v-if="from">
            <i @click="goSet()" class="icon-line-left"></i>
            <span class="title">关于我们</span>
        </div>
        <div class="us-box" v-if="!outLine"  v-html="content"></div>
       <!--<div class="middle" :style="{height:minHeight}">
            <img src="./img/logo_about_us@2x.png">
            <h4>铼米，为每一次价值创造</h4>
            <h5>客服中心</h5>
            <p>4000-925-008</p>
        </div>
        <div class="bottom">
            <h3>铼米V1.0</h3>
            <p>{{ '&copy;' + compony}}</p>
        </div>-->

        <!--无网络状态显示页面-->
        <div class="outLine" v-if="outLine">
            <div class="content">
                <img src="./img/img_network.png"/>
                <h3>您的网络好像出现了问题</h3>
                <span @click="myReload()">重新加载</span>
            </div>
        </div>

    </div>
</template>

<script>
    import {getResult} from "../../api/common";

    export default {
        name: "us",
        data(){
            return{
                compony:`${new Date().getFullYear()}上海八刀网络技术有限公司`,
                minHeight:'',
                content:'',
                from:true,
                outLine:false
            }
        },
        methods:{
          goSet(){
              this.$router.push({path:'set'})
          },
          myReload(){
              window.location.reload()
          }

        },
        mounted(){

            /*
            *判断设备是否连接网络
            */
            if (navigator.onLine) {
                //alert('online')
                this.outLine = false
            } else {
                //alert('offline');
                this.outLine = true
            }


            if(this.$route.query.from !=undefined){
                this.from = false
            }else {
                this.from = true
            }


            let height = document.body.clientHeight;
            console.log(height)
            this.minHeight = (height - 138) + 'px'
            console.log(this.minHeight)
            getResult('get',`/operate/v1/open/company/${'关于我们'}`)
                .then(data=>{
                    if(data.data != null && data.data.length > 0){
                        this.content = data.data[0].content
                    }
                })
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
        .middle{
            width: 100%;
            background: #fff;
            overflow: hidden;
            text-align: center;
            img{
                display: block;
                width: 80px;
                height: 80px;
                margin: 110px auto 40px;
            }
            h4{
                font-size: 14px;
                color: #393A3F;
                font-weight: bold;
                margin: 0 auto 40px;
            }
            h5{
                margin: 0 auto 15px;
                color: #393A3F;
                font-size: 14px;
            }
            P{
                font-size: 14px;
                color: #218CF7;
                margin: 0 auto 190px;
            }
        }
        .bottom{
            width: 100%;
            background: #fff;
            height: 84px;
            text-align: center;
            h3{
                margin-bottom: 10px;
                font-size: 14px;
                color: #393A3F;
            }
            p{
                font-size: 12px;
                color: #9FA3B0;
            }
        }
        .us-box{
            width: 90%;
            padding: 0 5%;
            background: #F8F8F8;
        }
        .outLine{
            width: 100%;
            height: 91.9%;
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
