<template>
    <div class="setphone">
        <div class="top">
            <i @click="goUser()" class="icon-line-left"></i>
            <span class="title">修改手机号</span>
        </div>
        <div class="middle" :style="{height:minHeight}">
            <div class="one">
                <div class="msg">
                    <p class="title">原手机号</p>
                    <p class="msginfo">{{myphone}}</p>
                </div>
                <div class="msg">
                    <p class="title">密码</p>
                    <input type="password" v-model="password" placeholder="请输入登录密码"/>
                </div>
            </div>
            <div class="two">
                <div class="msg">
                    <p class="title">新手机号</p>
                    <input type="text" v-model="newphone" placeholder="请输入新手机号"/>
                </div>
                <div class="msg">
                    <p class="title">手机验证码</p>
                    <input type="text" v-model="verifycode" placeholder="请输入验证码"/>
                    <button @click="getVerifyCode()">{{btnText}}</button>
                </div>
            </div>
        </div>
        <div class="bottom">
            <button @click="setphoneBtn()">提交</button>
        </div>
    </div>
</template>

<script>
    import {getResult} from "../../api/common";
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import { Toast } from 'mint-ui'

    export default {
        name: "setphone",
        data(){
            return{
                minHeight:'',
                myphone:'',//旧手机号
                password:'',//登录密码
                newphone:'',//新手机号
                verifycode:'',//手机验证码
                isPhone:false,
                isPassword:false,
                isVerify:false,
                isVerClick:true,
                btnText:'获取验证码',
                errorMessage:''//操作信息提示语
            }
        },
        methods:{
            goUser(){
                this.$router.push({path:'user'})
            },
            toast(){
                Toast({
                    message: this.errorMessage,
                    position: 'middle',
                    duration: 1000
                })
            },
            checkPassword() {
                let reg_password = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![!@#$%^&*]+$)/;
                if (!this.password) {
                    this.isPassword = true;
                    this.errorMessage = "请输入登录密码";
                    this.toast();
                    return false;
                }
                if (this.password.length < 6) {
                    this.isPassword = true;
                    this.errorMessage = "您输入的密码不正确，请重新输入";
                    this.toast();
                    return false;
                }
                if (!reg_password.test(this.password)) {
                    this.isPassword = true;
                    this.errorMessage = "您输入的密码不正确，请重新输入";
                    this.toast();
                    return false;
                }
                this.isPassword = false;
                return true;
            },
            checkPhone() {
                let reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!this.newphone) {
                    console.log("手机号是空的")
                    this.isPhone = true;
                    this.errorMessage = "请输入新手机号";
                    this.toast();
                    return false;
                }
                if (!reg_phone.test(this.newphone)) {
                    this.isPhone = true;
                    this.errorMessage = "新手机号格式不对，请重新输入";
                    this.toast();
                    return false;
                }
                this.isPhone = false;
                return true;
            },
            checkImgcode() {
                if (!this.verifycode) {
                    this.isVerify = true;
                    this.errorMessage = "请输入手机验证码";
                    this.toast();
                    return false;
                }
                this.isVerify = false;
                return true;
            },
            settime() {
                this.isVerClick = false;
                let times = 60;
                let timer = setInterval(() => {

                    this.btnText = times + "秒";
                    times--;
                    if (times == 0) {
                        //console.log(this.btnText);
                        this.btnText = "重新获取";
                        this.isVerClick = true;
                        window.clearInterval(timer);
                    }
                }, 1000);
            },
            getVerifyCode(){
                if(!this.checkPassword()) return;
                if(!this.checkPhone()) return;
                if(this.isVerClick){
                    getResult('post','/user/v1/edit_mobile/sendcode',{
                        mobile:this.newphone
                    })
                        .then(data=>{
                            console.log(data.msg)
                            console.log(data.result)
                            if (data.result == 0) {
                                this.errorMessage = '验证码发送成功'
                                this.toast()
                                this.settime()
                            }
                            if(data.result !== 0){
                                console.log(data.msg)
                                this.errorMessage = data.msg
                                this.toast()
                            }
                        })
                }else {
                    Toast('请等待60秒之后再发送验证码')
                }

            },
            setphoneBtn(){
                console.log(this.password)
                console.log(this.verifycode)
                console.log(this.newphone)
                if(!this.checkPassword()) return;
                if(!this.checkPhone()) return;
                if(!this.checkImgcode()) return;
                getResult('put','/user/v1/edit_mobile',{
                    password:this.password,
                    smsCode:this.verifycode,
                    username:this.newphone
                })
                    .then(data=>{
                        console.log(data.data)
                        if(data.result == 0){
                            getResult('post','/user/v1/logout')
                                .then(data=>{
                                    this.$router.push({name:'login'})
                                })
                        }
                        if(data.result !== 0){
                            console.log(data.msg)
                            this.errorMessage = data.msg
                            this.toast()
                        }
                    })
            }
        },
        mounted(){
            let height = document.body.clientHeight;
            console.log(height)
            this.minHeight = (height - 104) + 'px'
            console.log(this.minHeight)
            getResult('get','/user/v1/one')
                .then(data=>{
                    this.myphone = data.data.username
                })
        }
    }
</script>

<style scoped lang="scss">
.setphone{
    width: 100%;
    height: 100%;
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
        .one{
            width: 100%;
            height: 160px;
            background: #fff;
            margin-bottom: 10px;
            .msg{
                width: 100%;
                height: 80px;
                line-height: 80px;
                p{
                    display: inline-block;
                }
                .title{
                    padding-left: 5%;
                    width: 27%;
                    font-size: 15px;
                    color: #393A3F;
                }
                .msginfo{
                    font-size: 15px;
                    color: #9FA3B0;
                }
                input{
                    display: inline-block;
                    border: 0;
                    width: 65%;
                    height: 40px;
                    font-size: 15px;
                    color: #9FA3B0;
                }
            }
        }
        .two{
            width: 100%;
            height: 160px;
            background: #fff;
            margin-bottom: 10px;
            .msg{
                width: 100%;
                height: 80px;
                line-height: 80px;
                position: relative;
                p{
                    display: inline-block;
                }
                .title{
                    padding-left: 5%;
                    width: 25%;
                    font-size: 15px;
                    color: #393A3F;
                }
                input{
                    display: inline-block;
                    border: 0;
                    width: 65%;
                    height: 40px;
                    padding-left: 2%;
                    font-size: 15px;
                    color: #9FA3B0;
                }
                button{
                    position: absolute;
                    border:0;
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    background: #25BEF2;
                    color: #fff;
                    text-align: center;
                    border-radius: 4px;
                    top: 25px;
                    right: 15px;
                }
            }
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
