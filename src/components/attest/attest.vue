<template>
<div class="attest">
    <div class="top">
        <i @click="goBack()" class="icon-line-left"></i>
        <span class="title">实名认证</span>
    </div>
    <div class="content" v-if="!isShow">
        <div class="one">
            <div class="img">
                <img src="../../assets/img/img_notcertified@2x.png"/>
            </div>
            <p class="text">请前往铼米APP进行实名认证</p>
        </div>
        <div class="two">
            <div class="btn" @click="download()">下载铼米APP</div>
        </div>
    </div>
    <div class="content" v-if="isShow">
        <div class="one">
            <div class="img">
                <img src="../../assets/img/img_success@2x.png"/>
            </div>
            <p class="text">恭喜您通过实名认证</p>
        </div>
        <div class="two">
            <h3 class="title">实名信息</h3>
            <p class="name">真实姓名：{{realName}}</p>
            <p class="code">身份证号：{{userCode}}</p>
        </div>
    </div>
</div>
</template>

<script>
    import {getResult} from "../../api/common";

    export default {
        name: "attest",
        data(){
          return{
              isShow:true,
              realName:'',
              userCode:''
          }
        },
        methods:{
            goBack(){
                window.history.go(-1)
            },
            download(){
                this.$router.push({path:'download'})
            }
        },
        mounted(){
            getResult('get','/user/v1/one')
                .then(msg=>{
                    if(msg.result == 0){
                        if(msg.data.isAuth == 0){
                            this.isShow = false
                        }else {
                            this.isShow = true
                        }
                        this.realName = '*' + msg.data.realName.slice(1,msg.data.realName.length)
                        this.userCode = msg.data.idcardNo.slice(0,3)+'************'+msg.data.idcardNo.slice(14,17)
                    }
                })
        }

    }
</script>

<style scoped lang="scss">
.attest{
    width: 100%;
    height: 100%;
    background: #fff;
    .top{
        width: 100%;
        height: 44px;
        font-size: 18px;
        color: #393A3F;
        line-height: 45px;
        background: #fff;
        margin-bottom: 10px;
        box-shadow: 0 6px 6px rgba(0,0,0,0.1);
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
        .one{
            width: 100%;
            .img{
                width: 145px;
                height: 100px;
                margin: 40px auto 20px;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .text{
                width: 100%;
                color: #393A3F;
                font-size: 14px;
                text-align: center;
                margin-bottom: 40px;
            }
        }
        .two{
            width: 90%;
            margin: 0 auto;
            height: 44px;
            .btn{
                width: 220px;
                height: 40px;
                margin: 0 auto;
                line-height: 40px;
                text-align: center;
                border-radius: 20px;
                color: #fff;
                font-size: 14px;
                background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
            }
            .title{
                font-size: 14px;
                color: #393A3F;
                font-weight: 600;
                margin-bottom: 15px;
            }
            .name{
                font-size: 14px;
                color: #61687C;
                margin-bottom: 10px;
            }
            .code{
                font-size: 14px;
                color: #61687C;
            }
        }
    }
}
</style>
