<template>
    <div class="altercode">
        <div class="top">
            <i @click="goSet()" class="icon-line-left"></i>
            <span class="title">修改密码</span>
        </div>
        <div class="middle" :style="{height:minHeight}">
            <div class="two">
                <div class="msg">
                    <p class="title">旧密码</p>
                    <input v-model="oldcode" type="password" placeholder="请输入旧密码"/>
                </div>
                <div class="msg">
                    <p class="title">新密码</p>
                    <input v-model="newcode" type="password" placeholder="新密码必须是6~20位字母数字组合"/>
                </div>
                <div class="msg">
                    <p class="title">确认密码</p>
                    <input v-model="affirm" type="password" placeholder="再次输入新密码"/>
                </div>
            </div>
        </div>
        <div class="bottom">
            <button @click="setcode()">保存</button>
        </div>
    </div>
</template>

<script>
    import {getResult} from "../../api/common";
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import { Toast } from 'mint-ui'

    export default {
        name: "altercode",
        data(){
            return{
                minHeight:'',
                oldcode:'',
                newcode:'',
                affirm:'',
                isoldcode:false,
                isnewcode:false,
                isaffirm:false,
                errorMessage:''
            }
        },
        methods:{
            goSet(){
                this.$router.push({path:'set'})
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
                /*验证旧密码输入正确与否*/
                if (!this.oldcode) {
                    this.isoldcode = true;
                    this.errorMessage = "请输入旧密码";
                    this.toast();
                    return false;
                }
                if (this.oldcode.length < 6) {
                    this.isoldcode = true;
                    this.errorMessage = "您输入的旧密码错误，请重新输入";
                    this.toast();
                    return false;
                }
                if (!reg_password.test(this.oldcode)) {
                    this.isoldcode = true;
                    this.errorMessage = "您输入的旧密码错误，请重新输入";
                    this.toast();
                    return false;
                }
                /*验证新密码输入正确与否*/
                if (!this.newcode) {
                    this.isnewcode = true;
                    this.errorMessage = "请输入新密码";
                    this.toast();
                    return false;
                }
                if (this.newcode.length < 6) {
                    this.isnewcode = true;
                    this.errorMessage = "您输入的新密码不符合规范，请重新输入";
                    this.toast();
                    return false;
                }
                if(this.newcode.length > 20){
                    this.isnewcode = true;
                    this.errorMessage = "您输入的新密码不符合规范，请重新输入";
                    this.toast();
                    return false;
                }
                if (!reg_password.test(this.newcode)) {
                    this.isnewcode = true;
                    this.errorMessage = "您输入的新密码不符合规范，请重新输入";
                    this.toast();
                    return false;
                }
                /*验证确认密码输入正确与否*/
                if (!this.affirm) {
                    this.isaffirm = true;
                    this.errorMessage = "请再次输入新密码";
                    this.toast();
                    return false;
                }
                if (this.affirm.length < 6) {
                    this.isaffirm = true;
                    this.errorMessage = "您两次输入的新密码不一致，请重新输入";
                    this.toast();
                    return false;
                }
                if (this.affirm.length > 20) {
                    this.isaffirm = true;
                    this.errorMessage = "您两次输入的新密码不一致，请重新输入";
                    this.toast();
                    return false;
                }
                if (!reg_password.test(this.affirm)) {
                    this.isaffirm = true;
                    this.errorMessage = "您两次输入的新密码不一致，请重新输入";
                    this.toast();
                    return false;
                }
                if(this.newcode != this.affirm){
                    this.isaffirm = true;
                    this.errorMessage = '您两次输入的新密码不一致，请重新输入'
                    this.toast();
                    return false;
                }
                this.isoldcode = false;
                this.isnewcode = false;
                this.isaffirm = false;
                return true;
            },

            setcode(){
                if(!this.checkPassword()) return;
                getResult('put','/user/v1/edit_password',{
                    oldPassword:this.oldcode,
                    newPassword:this.newcode
                })
                    .then(data=>{
                        console.log(data.result)
                        console.log(data.msg)
                        if(data.result !==0){
                            this.errorMessage = data.msg
                            this.toast()
                        }
                        if(data.result == 0){
                            getResult('post','/user/v1/logout')
                                .then(data=>{
                                    this.$router.push({name:'login'})
                                })
                        }
                    })
            }
        },
        mounted(){
            let height = document.body.clientHeight;
            console.log(height)
            this.minHeight = (height - 104) + 'px'
            console.log(this.minHeight)

        }
    }
</script>

<style scoped lang="scss">
.altercode{
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
            height: 240px;
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
                span{
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
