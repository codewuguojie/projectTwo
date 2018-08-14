<template>
    <div class="login">
        <div class="box"></div>
        <div class="content">
            <div class="top">
                <i class="icon-line-left" @click="back()"></i>
                <div class="gologin" @click="goRegister()">注册</div>
            </div>
            <div class="bottom">
                <h2>登录</h2>
                <p class="one">前所未见，世界因你而美好！</p>
                <div class="usermsg">
                    <input type="text" v-model="phone" placeholder="手机号"/>
                </div>
                <div class="usermsg">
                    <input type="password" v-model="password" placeholder="密码"/><span @click="goReset()">{{btnText}}</span>
                </div>

                <button class="btn" @click="submitLogin()">登录</button>

            </div>
        </div>
    </div>
</template>

<script>
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import { getResult, hostUrl} from "api/common";
    import { Toast } from 'mint-ui'
    export default {
        name: "login",
        data(){
            return{
                btnText:"忘记密码？",
                phone: "",
                password: "",
                isPhone: false,
                isPassword: false,
                errorMessage:''
            }
        },
        methods:{
            back(){
              
                this.$router.push({name:'mycenter'})
             
            },
            goRegister(){
              this.$router.push({path:'register'})
            },
            goReset(){
              this.$router.push({path:'reset'})
            },
            toast(){
                Toast({
                    message: this.errorMessage,
                    position: 'middle',
                    duration: 1000
                })
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
                if (!this.password) {
                    this.isPassword = true;
                    this.errorMessage = "请输入密码";
                    this.toast();
                    return false;
                }
                this.isPassword = false;
                return true;
            },
            initError(){
                this.isPhone = false;
                this.isPassword = false;
            },
            submitLogin() {
                // this.$router.push({name:'next',params:{参数名:参数值,参数名:参数值}})
                this.initError();
                if (!this.checkPhone()) return;
                if (!this.checkPassword()) return;
                getResult("post", "/user/v1/open/login", {
                    password: this.password,
                    fromType : 1,
                    username: this.phone
                }).then(res => {
                    if (res.result === 0) {
                        console.log(this.$route.query.returnUrl);
                        if(this.$route.query.returnUrl){
                             window.location.href = this.$route.query.returnUrl;
                        }else{
                            this.$router.push({ name: "mycenter" });
                        }

                    } else {
                        this.isPassword = true;
                        this.errorMessage = res.msg;
                        this.toast();
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/sass/login.scss";
</style>
