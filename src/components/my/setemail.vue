<template>
    <div class="setemail">
        <div class="top">
            <i @click="goUser()" class="icon-line-left"></i>
            <span class="title">{{text}}</span>
        </div>
        <div class="middle" :style="{height:minHeight}">
            <div v-if="emailState" class="two">
                <div class="msg">
                    <p class="title">原邮箱</p>
                    <b>{{email}}</b>
                </div>
                <div class="msg">
                    <p class="title">新邮箱</p>
                    <input v-model="myEmail" type="text" placeholder="请输入新邮箱"/>
                </div>
                <div class="msg">
                    <p class="title">邮箱验证码</p>
                    <input v-model="myEmailCode" type="text" placeholder="请输入邮箱验证码"/>
                    <button @click="getEmailCode()">{{btnText}}</button>
                </div>
            </div>


            <div v-if="!emailState" class="two">
                <div class="msg">
                    <p class="title">邮箱</p>
                    <input v-model="myEmail" type="text" placeholder="请输入新邮箱"/>
                </div>
                <div class="msg">
                    <p class="title">邮箱验证码</p>
                    <input v-model="myEmailCode" type="text" placeholder="请输入邮箱验证码"/>
                    <button @click="getEmailCode()">{{btnText}}</button>
                </div>
            </div>
        </div>
        <div class="bottom">
            <button @click="setEmail()">提交</button>
        </div>
    </div>
</template>

<script>
    import {getResult} from "../../api/common";
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import {Toast} from 'mint-ui'

    export default {
        name: "setemail",
        data(){
            return{
                minHeight:'',
                emailState:true,
                email:'',//判断绑定还是修改邮箱参数
                myEmail:'',//邮箱
                isEmail:false,//错误信息提示条件
                myEmailCode:'',//邮箱密码
                errorMessage:'',
                text:'',
                isVerClick:false,
                btnText:'获取验证码'
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
            checkEmail(){
                let reg_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                if(!this.myEmail){
                    this.isEmail = true;
                    this.errorMessage = "请输入邮箱";
                    this.toast();
                    return false;
                }
                if(!reg_email.test(this.myEmail)){
                    this.isEmail = true;
                    this.errorMessage = "邮箱输入有误";
                    console.log("邮箱错误喽")
                    this.toast();
                    return false;
                }
                this.isEmail = false;
                return true;
            },
            checkEmailCode(){
                if(!this.myEmailCode){
                    this.isEmail = true;
                    this.errorMessage = "邮箱验证码不能为空";
                    this.toast();
                    return false;
                }
                this.isEmail = false;
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
            getEmailCode(){
               console.log(111)
               if(!this.checkEmail()) return
               console.log("hahaahah")
                    getResult('post','/user/v1/email/sendcode',{
                        email:this.myEmail
                    })
                        .then(data=>{
                            console.log(data.msg)
                            if(data.result == 0){
                                this.settime()
                                this.errorMessage = '邮箱验证码发送成功'
                                this.toast()
                            }else {
                                if(data.result == 1){
                                    this.errorMessage = data.msg
                                    this.toast()
                                }
                            }
                        })


            },
            setEmail(){
                if(!this.checkEmail()) return;
                if(!this.checkEmailCode()) return;
                getResult('post','/user/v1/email',{
                    code:this.myEmailCode,
                    email:this.myEmail
                })
                    .then(data=>{
                        if(data.result == 0){
                            this.$router.push({path:'user'})
                        }
                        if(data.result !== 0){
                            this.errorMessage = '邮箱验证码验证失败'
                           this. toast()
                        }
                    })
            }
        },
        mounted(){
            let height = document.body.clientHeight;
            ///console.log(height)
            this.minHeight = (height - 104) + 'px'
            //console.log(this.minHeight)
            console.log(this.$route.query.id)
            if(this.$route.query.id == 0){
                this.emailState = false
                this.text = "绑定邮箱"
            }else {
                this.emailState = true
                this.text = "修改邮箱"
            }
            getResult('get','/user/v1/one')
                .then(data=>{
                    this.email = data.data.email
                })
        }
    }
</script>

<style scoped lang="scss">
.setemail{
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
        .two{
            width: 100%;
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
                b{
                    display: inline-block;
                    border: 0;
                    width: 65%;
                    padding-left: 2%;
                    font-size: 15px;
                    color: #9FA3B0;
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
                    border: 0;
                    position: absolute;
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
