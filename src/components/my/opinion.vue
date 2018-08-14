<template>
    <div class="opinion">
        <div class="top">
            <i @click="goMycenter()" class="icon-line-left"></i>
            <span class="title">意见反馈</span>
        </div>
        <div class="middle">
            <div class="one">
                <i class="icon-customer-service"></i><p>告诉我们您遇到了什么问题或有何建议吧！</p>
            </div>
            <div class="two">
                <p>问题描述</p>
                <textarea v-model="feedbackContent" placeholder="请描述问题或建议，我们会为您不断改进" maxlength="200" minlength="6"></textarea>
                <span class="stringNum">{{feedbackContent.length+'/200'}}</span>
            </div>
            <div class="three">
                <p>上传相关图片（选填，单张最大5M，最多三张）</p>
                <div>
                    <div class="box">
                        <span><i><img src="./img/icon-7.png"/></i></span>
                        <input type="file" accept="image/jpg,image/png,image/gif,image/jpeg" @change="fileImage($event)" :disabled="myDisabled"/>
                    </div>
                    <div class="img">
                        <div class="imgbox" v-for="(list,index) in imgArr">
                            <img class="myimg" :src="hosts+list.filePath"/>
                            <i class="icon-new12" @click="mydelete(list,index)"><img src="./img/icon-2.png"/></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="four">
                <p>联系方式（手机号码/微信号/邮箱）</p>
                <input v-model="username" typeof="text"/>
            </div>
        </div>

        <v-modal :isShow="myBtn" :width="200" @close="myBtn=false">
            <div class="info-box">
                <h3>提示</h3>
                <p>提交成功</p>
                <div class="btn-box">
                    <span @click="goLoginout()">确定</span>
                </div>
            </div>
        </v-modal>

        <div class="bottom">
            <button @click="opinionBtn()">提交</button>
        </div>
    </div>
</template>

<script>
    import { getResult,staticUrl,myhost} from "../../api/common";
    import upload from "@/components/base/upload/upload"
    import modal from "@/components/base/modal/modal"
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import {Toast} from 'mint-ui'
    export default {
        name: "opinion",
        components:{
            "v-upload":upload,
            "v-modal":modal
        },
        data(){
          return{
              fileArr:[],
              minHeight:'',
              username:'',
              hosts:myhost(),
              imgArr:[],
              feedbackContent:'',
              feedbackImg :'',
              myDisabled:false,
              errorMessage:'',
              myBtn:false
          }
        },
        methods:{
            toast(){
                Toast({
                    message:this.errorMessage,
                    position:'middle',
                    duration:1000
                })
            },
            goMycenter(){
                this.$router.push({path:'mycenter'})
            },
            mydelete(list,index){
                console.log(index)
                //console.log(list.length)
                this.imgArr.splice(index,1)
                console.log(this.imgArr)
                this.myDisabled = false
            },
            fileImage(event){
                let param = new FormData(); //创建form对象
                param.append("file", event.target.files[0]);
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data;charset=UTF-8",
                        accept: "application/json;charset=UTF-8"
                    }
                };
                if(event.target.files[0].size>1024*1024*5){
                    this.errorMessage = '图片大于5M，上传失败，请重新上传'
                    this.toast()
                    return;
                }
                this.fileArr.push(event.target.files[0])
                console.log(this.fileArr)
                getResult('post','/operate/v1/open/upload',param,config)
                    .then(data=>{
                        console.log(data.data)
                        this.imgArr.push(data.data)
                        if(this.imgArr.length>=3){
                            this.myDisabled = true
                        }else {
                            this.myDisabled = false
                        }
                        this.feedbackImg = JSON.stringify(this.imgArr)
                        console.log(this.feedbackImg)
                    })
                    .catch(()=>{
                        this.errorMessage = '上传失败，请重新上传'
                        this.toast()
                    })
            },
            checkmsg(){
              if(!this.feedbackContent){
                  this.errorMessage = '请先填写相关的问题描述'
                  this.toast()
                  return false
              }
              if(this.feedbackContent.length<6){
                  this.errorMessage = '相关描述字符不能少于6个字符'
                  this.toast()
                  return false
              }
              if(this.username){
                  let reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;//联系方式是手机号时进行正则校验 11位
                  let reg_wx1 = /[1-9]\\d{5,19}/;//联系方式是微信号（微信号是qq号）时进行校验 6-20位数字
                  let reg_wx2 = /[a-zA-Z][-_a-zA-Z0-9]{5,19}/;//联系方式是微信号（微信号带有字母）时进行校验 6-20位数字字母下划线
                  let reg_email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;//联系方式是邮箱时进行正则校验
                  if (!reg_phone.test(this.username)) {
                      if(!reg_wx1.test(this.username)){
                          if(!reg_wx2.test(this.username)){
                              if(!reg_email.test(this.username)){
                                  this.errorMessage = "联系方式填写有误";
                                  this.toast();
                                  return true
                              }
                          }
                      }
                  }
              }
                return true
            },
            opinionBtn(){
                if(!this.checkmsg()) return;
                getResult('post','/operate/v1/open/feed_back',{
                    feedbackContent:this.feedbackContent,
                    feedbackImg:this.feedbackImg?this.feedbackImg:'',
                    userPhone:this.username?this.username:''
                })
                    .then(data=>{
                        console.log(data.data)
                        if(data.result == 0){
                            this.errorMessage = '意见反馈提交成功'
                            this.toast()
                            this.myBtn = true
                        }
                    })
            },
            goLoginout(){
                this.myBtn = false
                this.$router.push({name:'mycenter'})
            }
        },
        mounted(){
            getResult('get','/user/v1/one')
                .then(data=>{
                    //console.log(data.data)
                    this.username = data.data.username
                })
        }
    }
</script>

<style scoped lang="scss">
    .opinion{
        width: 100%;
        background: #f8f8f8;
        .top{
            width: 100%;
            height: 44px;
            font-size: 18px;
            color: #393A3F;
            line-height: 45px;
            background: #fff;
            margin-bottom: 10px;
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
        .middle{
            width: 100%;
            height: 84.4%;
            overflow: hidden;
            .one{
                width: 100%;
                height: 60px;
                line-height: 60px;
                background: #fff;
                margin-bottom: 20px;
                i{
                    float: left;
                    padding-left: 5%;
                    font-size: 30px;
                    margin-top: 15px;
                }
                p{
                    float: left;
                    padding-left: 15px;
                    font-size: 14px;
                    color: #393A3F;
                }
            }
            .two{
                width: 100%;
                margin-bottom: 15px;
                position: relative;
                p{
                    padding-left: 5%;
                    margin-bottom: 10px;
                    font-size: 12px;
                    color: #393A3F;
                }
                textarea{
                    width: 90%;
                    height: 200px;
                    padding-left: 5%;
                    padding-top: 10px;
                    padding-right: 5%;
                    border: 0px;
                    resize: none;
                    line-height: 18px;
                }
                .stringNum{
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                }
            }
            .three{
                width: 100%;
                margin-bottom: 15px;
                p{
                    padding-left: 5%;
                    font-size: 12px;
                    color: #393A3F;
                    margin-bottom: 10px;
                }
                .box{
                    display: inline-block;
                    width: 65px;
                    height: 66px;
                    margin-left: 5%;
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                    i{
                        display: block;
                        width: 65px;
                        height: 66px;
                        line-height: 60px;
                        font-size: 30px;
                        text-align: center;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    input{
                        display: block;
                        width: 65px;
                        height: 66px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        opacity: 0;
                        background: #CCCCCC;
                    }
                }
                .img{
                    display: inline-block;
                    .imgbox{
                        float: left;
                        width: 60px;
                        margin: 0 10px;
                        position: relative;
                        .myimg{
                            display: block;
                            width: 100%;
                            height: 60px;
                        }
                        i{
                            position: absolute;
                            width: 16px;
                            height: 16px;
                            line-height: 16px;
                            text-align: center;
                            font-size: 12px;
                            font-weight: bold;
                            background: #FB6B38;
                            top: -6px;
                            right: -6px;
                            border-radius: 50%;
                            &:before{
                                color: #fff;
                            }
                            img{
                                display: block;
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                    }
                }
            }
            .four{
                width: 100%;
                margin-bottom: 70px;
                p{
                    padding-left: 5%;
                    font-size: 14px;
                    color: #393A3F;
                    margin-bottom: 10px;
                }
                input{
                    display: block;
                    width: 95%;
                    height: 40px;
                    line-height: 40px;
                    background: #fff;
                    padding-left: 5%;
                    font-size: 12px;
                    color: #393A3F;
                    border: 0;
                }
            }
        }
        .info-box {
            height: 100px;
            padding: 0 15px;
            h3{
                width: 100%;
                text-align: center;
                margin: 10px 0 15px 0;
                font-weight: 700;
            }
            p{
                width: 100%;
                text-align: center;
                margin-bottom: 20px;
            }
            .btn-box{
                width: 70px;
                height: 24px;
                line-height: 24px;
                border-radius: 12px;
                text-align: center;
                color: #fff;
                margin: 0 auto;
                background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
            }
        }
        .bottom{
            width: 100%;
            height: 50px;
            background: #fff;
            overflow: hidden;
            button{
                width: 92%;
                height: 36px;
                display: block;
                margin: 7px auto;
                border: 0;
                border-radius: 18px;
                font-size: 15px;
                color: #fff;
                background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
            }
        }
    }
</style>
