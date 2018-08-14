<template>
    <div class="register">
        <div class="box"></div>
        <div class="content">
            <div class="top">
                <i class="icon-line-left" @click="back()"></i>
                <div class="gologin" @click="goLogin()">登录</div>
            </div>
            <div class="bottom">
                <h2>注册</h2>
                <p class="one">前所未见，世界因你而美好！</p>
                <div class="usermsg">
                    <input type="text" v-model="phone" placeholder="手机号"/>
                </div>
                <div class="usermsg">
                    <input type="text" v-model="imgCode" placeholder="图形验证码"/>
                    <b @click="getImgCode()"><img :src="imgUrl"/></b>
                </div>
                <div class="usermsg">
                    <input type="text" v-model="verifyCode" placeholder="手机验证码"/>
                    <button @click="getVerifyCode()">{{btnText}}</button>
                </div>
                <div class="usermsg">
                    <input :type="myType" v-model="password" placeholder="密码必须是6到20位字母数字组合"/>
                    <img @click="tog()" class="eyes" :src="toggle?imgTwo:imgOne"/>
                </div>
                <button class="btn" @click="submitRegister()">注册</button>
                <p class="two">点击注册代表您已同意<b class="agreenment" @click="goAgreement()">《用户协议》</b>及<b class="privacy" @click="goClause()">《隐私政策》</b></p>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import { getResult, hostUrl,staticUrl,hosts} from "api/common";
    import { Toast } from 'mint-ui'
    import imgOne from '../../assets/img/icon_display.svg'
    import imgTwo from '../../assets/img/icon_hide.svg'


    export default {
        name:'register',
        components:{ },
        data(){
            return{
                imgUrl: `${hosts}/basics/v1/open/imgcode?${new Date()}`,
                btnText:"获取验证码",
                phone: "",
                password: "",
                imgCode: "",
                verifyCode: "",
                isVerClick:true,
                isPhone: false,
                isPassword: false,
                isVerify: false,
                isImgCode: false,
                errorMessage:'',
                toggle:true,
                myType:'password',
                imgOne,
                imgTwo
            }
        },
        methods:{
            tog(){
              this.toggle = !this.toggle
                if(this.toggle){
                  this.myType = 'password'
                }else {
                    this.myType = 'text'
                }
            },
            back(){
                if(this.$route.query.userId){
                    this.$router.push({name:'invited',query:{userId:this.$route.query.userId}})
                }else if(this.$route.query.returnUrl){
                    window.location.href=this.$route.query.returnUrl;
                }else{
                    this.$router.push({name:'mycenter'})
                }
            },
            goAgreement(){
                this.$router.push({name:'agreement'})
            },
            goClause(){
                this.$router.push({name:'clause'})
            },
            goLogin(){
                this.$router.push({path:'login'})
            },
            getImgCode() {
                this.imgUrl = `${hosts}/basics/v1/open/imgcode?${new Date()}`;
            },
            toast(){
                Toast({
                    message: this.errorMessage,
                    position: 'middle',
                    duration: 1000
                })
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
                        window.clearInterval(timer);
                    }
                }, 1000);
            },
            checkPhone() {
                let reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!this.phone) {
                    console.log("手机号是空的")
                    this.isPhone = true;
                    this.errorMessage = "请输入手机号";
                    this.toast();
                    return false;
                }
                if (!reg_phone.test(this.phone)) {
                    this.isPhone = true;
                    this.errorMessage = "手机号格式不对，请重新输入";
                    this.toast();
                    return false;
                }
                this.isPhone = false;
                return true;
            },
            checkImgcode() {
                if (!this.imgCode) {
                    this.isImgCode = true;
                    this.errorMessage = "请输入图形验证码";
                    this.toast();
                    return false;
                }
                this.isImgCode = false;
                return true;
            },
            checkPhonecode() {
                if (!this.verifyCode) {
                    this.isVerify = true;
                    this.errorMessage = "请输入手机验证码";
                    this.toast();
                    return false;
                }
                if(this.verifyCode.length<6){
                    this.isVerify = true;
                    this.errorMessage = "请输入正确的手机验证码";
                    this.toast();
                    return false;
                }
                this.isVerify = false;
                return true;
            },
            checkPassword() {
                let reg_password = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![!@#$%^&*]+$)/;
                if (!this.password) {
                    this.isPassword = true;
                    this.errorMessage = "请输入密码";
                    this.toast();
                    return false;
                }
                if (this.password.length < 6) {
                    this.isPassword = true;
                    this.errorMessage = "您输入的密码不符合规范，请重新输入";
                    this.toast();
                    return false;
                }
                if(this.password.length > 20){
                    this.isPassword = true;
                    this.errorMessage = "您输入的密码不符合规范，请重新输入";
                    this.toast();
                    return false;
                }
                if (!reg_password.test(this.password)) {
                    this.isPassword = true;
                    this.errorMessage = "您输入的密码不符合规范，请重新输入";
                    this.toast();
                    return false;
                }
                this.isPassword = false;
                return true;
            },
            initError(){
                this.isPhone = false;
                this.isPassword = false;
                this.isImgCode = false;
                this.isVerify = false;
                this.result = false;
            },
            getVerifyCode() {
                this.initError();
                if (!this.checkPhone()) return;
                if (!this.checkImgcode()) return;

                if(this.isVerClick){
                    getResult("post", "/user/v1/open/reg/sendcode", {
                        imgCode: this.imgCode,
                        mobile: this.phone
                    }).then(result => {
                        if (result.result != 0) {
                            this.isVerify = true;
                            this.isPassword = true;
                            this.getImgCode();
                            this.result = true;
                            this.errorMessage = result.msg;
                            this.toast();
                        }else{
                            this.settime();
                        }
                    })
                }else {
                    Toast('请等待60秒之后再发送验证码')
                }

            },
            submitRegister() {
                // this.$router.push({name:'next',params:{参数名:参数值,参数名:参数值}})
                
                console.log(data);
                this.initError();
                if (!this.checkPhone()) return;
                if (!this.checkImgcode()) return;
                if (!this.checkPhonecode()) return;
                if (!this.checkPassword()) return;
                let data = {
                    password: this.password,
                    fromType : 1,
                    smsCode: this.verifyCode,
                    source: "h5",
                    username: this.phone
                }
                if(this.$route.query.userId){
                    data.invitePhone = this.$route.query.userId;
                }
                
                getResult("post", "/user/v1/open/reg", data).then(res => {
                    if (res.result === 0) {
                        if(this.$route.query.userId){
                            window.location.href=this.$route.query.returnUrl;
                        }else{
                            this.$router.push({ name: "mycenter" });
                        }
                    } else {
                        this.result = true;
                        this.errorMessage = res.msg;
                        this.toast(res.msg);
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
@import "../../assets/sass/register.scss";
</style>
