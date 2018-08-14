<template>
    <div class="present">
        <div class="head">
            <div class="topTitle">
                <span class="span1 icon-line-left" @click="goAccount()"></span>
                <span class="text">选择赠送人</span>
            </div>
            <div class="phone">
                <span>对方手机号</span>
                <input type="text" placeholder="请输入对方手机号" @keyup="keyup($event)" v-model="phone" maxlength="11">
            </div>
        </div>
        <div class="contents">
            <div class="tips">
                <p class="p1">赠送规则</p>
                <p class="p2">1、赠送人和接受赠送的人必须为铼米平台实名认证的用户；</p>
                <p class="p2">2、赠送给好友的铼米币最小数量为2000；</p>
                <p class="p2">3、铼米币单笔赠送限额（2.5万REX）、单日赠送限额（50万REX）、单月赠送限额（1500万REX）；</p>
                <p class="p2">4、赠送铼米币给好友暂时不收取手续费；</p>
                <p class="p2">5、铼米用户对个人的赠送行为负责，赠送所产生的纠纷铼米概不负责；</p>
                <p class="p2">6、若有其它疑问请咨询铼米客服：4000-925-008；</p>
                <p class="p2">7、该活动的最终解释权归上海铼米科技有限公司所有</p>
            </div>
        </div>
        <div class="footer">
            <div class="submit" @click="checkSubmit()">提交</div>
        </div>
    </div>
</template>
<script>
 import {getResult} from '../../api/common.js'
 import { Toast } from 'mint-ui';
export default {
   
    data(){
        return{
            phone:''
        }
    },
    methods:{
        goAccount(){
            this.$router.push({name:'account'})
        },
        checkPhone() {
            let reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!this.phone) {
                console.log("手机号是空的")
                this.isPhone = true;
                Toast("请输入手机号");
                return false;
            }
            if (!reg_phone.test(this.phone)) {
                this.isPhone = true;
                Toast("手机号格式不对，请重新输入");
                return false;
            }
            this.isPhone = false;
            return true;
        },
        checkSubmit(){
            if(!this.checkPhone()){
                return;
            }
            getResult('post','/user/v1/present_user',{phone:this.phone}).then((res)=>{
                if(res.result == 0){
                    this.$router.push({name:'confirm',query:{phone:res.data.phone,realName:res.data.realName,userId:res.data.userId}})
                }else{
                    Toast(res.msg);
                }
                
            })
            
        },
        keyup(event){
            this.phone=this.phone.replace(/[^\d]/g,'') 
        },

    }
}
</script>
<style lang="scss" scoped>
    .present{
        width: 100%;
        height: 100%;
        background: #F6F6F8;
        .head{
            position: relative;
            width: 100%;
            background: #ffffff;
            .topTitle{
                width: 100%;
                height: 44px;
                color: #000000;
                position: relative;
                line-height: 44px;
                background: #FFFFFF;
                box-shadow: 0 6px 6px 0 rgba(0,0,0,0.02);
                .span1{
                position: absolute;
                line-height: 44px;
                left: 15px;
                }
                .icon-line-left:before{
                color: #000000;
                font-size: 22px;
                }
                span.text{
                    display: inline-block;
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    line-height: 44px;
                }
                
            }
            .phone{
                width: 345px;
                margin:0 auto;
                padding:20px 0;
                font-size: 16px;
                color: #393A3F;
                line-height: 20px;
                position: relative;
                span{
                    margin-right: 20px;
                    display: inline-block;
                    width: 83px;
                    text-align: left;
                }
                input{
                    line-height: 22px;
                    border: 0;
                }
                b{
                    font-size: 16px;
                    color: #393A3F;
                }
                // img{
                //     position: absolute;
                //     left:0;
                //     top: 0;
                // }
            }
        }
        .contents{
            width: 100%;
            margin-top: 10px;
            background: #ffffff;
            padding-bottom: 10px;
            .tips{
                width: 345px;
                margin:0 auto;
                padding-top: 20px;
                p.p1{
                    font-size: 14px;
                    color: #393A3F;
                    line-height: 20px;
                    margin-bottom: 10px;
                }
                p.p2{
                    font-size: 12px;
                    color: #000000;
                    text-align: left;
                    line-height: 14px;
                    padding-bottom: 13px;
                }
            }
        }
        .footer{
            width: 100%;
            background: #ffffff;
            padding: 10px 0;
            text-align: center;
            position: fixed;
            bottom: 0;
            left: 0;
            .submit{
                display: inline-block;
                width: 345px;
                height: 40px;
                background-image: linear-gradient(-90deg, #218CF7 0%, #25BEF2 100%);
                border-radius: 24px;
                font-size: 15px;
                color: #FFFFFF;
                line-height: 40px;
            }
        }
    }
</style>


