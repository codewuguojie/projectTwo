<template>
    <div class="help">
        <div class="top" v-if="from">
            <i @click="goMycenter()" class="icon-line-left"></i>
            <span class="title">帮助中心</span>
        </div>
        <div class="content" v-if="!outLine" v-html="content"></div>

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
        name: "help",
        data(){
          return{
              content:'',
              from:true,
              outLine:false
          }
        },
        methods:{
            goMycenter(){
                this.$router.push({path:'mycenter'})
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

            getResult('get',`/operate/v1/open/company/${'帮助中心'}`)
                .then(data=>{
                    console.log(data.data)
                    if(data.data != null && data.data.length > 0){
                        this.content = data.data[0].content
                    }
                })
        }
    }
</script>

<style scoped lang="scss">
    .help{
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
            background: #f8f8f8;
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
