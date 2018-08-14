<template>
    <div class="register">
        <div class="box"></div>
        <div class="content">
            <div class="top">
                <i class="icon-line-left" @click="back()"></i>
            </div>
            <div class="bottom">
                <h2>重置密码</h2>
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
                    <input type="password" v-model="password" placeholder="密码必须是6到20位字母数字组合"/>
                </div>
                <button class="btn" @click="submitRegister()">重置</button>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import { getResult, hosts} from "api/common";
    import { Toast } from 'mint-ui'


    export default {
        name:'reset',
        components:{ },
        data(){
            return{
                imgUrl: `${hosts}/basics/v1/open/imgcode?${new Date()}`,
                btnText:"获取验证码",
                phone: "",
                password: "",
                imgCode: "",
                verifyCode: "",
                isPhone: false,
                isPassword: false,
                isVerify: false,
                isImgCode: false,
                isVerClick: true,
                errorMessage:''
            }
        },
        methods:{
            back(){
              this.$router.push({name:'login'})
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
                        this.isVerClick = true;
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
            checkPassword() {
                let reg_password = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![!@#$%^&*]+$)/;
                if (!this.password) {
                    this.isPassword = true;
                    this.errorMessage = "请输入新密码";
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
            initError(){
                this.isPhone = false;
                this.isPassword = false;
                this.isImgCode = false;
                this.isVerify = false;
            },
            getVerifyCode() {
                this.initError();
                if (!this.checkPhone()) return;
                if (!this.checkImgcode()) return;

                if(this.isVerClick){
                    getResult("post", "/user/v1/open/reset/sendcode", {
                        imgCode: this.imgCode,
                        mobile: this.phone
                    }).then(data => {
                        if (data.result != 0) {
                            this.getImgCode();
                            this.errorMessage = data.msg;
                            this.toast();
                        }else{
                            this.settime();
                        }
                    });
                }else {
                    Toast('请等待60秒之后再发送验证码')
                }

            },
            submitRegister() {
                // this.$router.push({name:'next',params:{参数名:参数值,参数名:参数值}})
                this.initError();
                if (!this.checkPhone()) return;
                if (!this.checkPassword()) return;
                if (!this.checkImgcode()) return;
                if (!this.checkPhonecode()) return;
                getResult("put", "/user/v1/open/reset_password", {
                    smsCode: this.verifyCode,
                    username: this.phone,
                    newPassword:this.password
                }).then(res => {
                    if (res.result == 0) {
                        console.log("修改密码成功")
                        this.$router.push({ name: "login" });
                    } else {
                        this.result = true;
                        this.errorMessage = res.msg;
                        this.toast();
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/sass/register.scss";
</style>
