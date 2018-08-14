<template>
    <div class="confirm">
        <div class="head">
            <div class="topTitle">
                <span class="span1 icon-line-left" @click="goPresent()"></span>
                <span class="text">确认赠送</span>
            </div>
            <div class="phone">
                <span>对方手机号</span>
                <b>{{phone}}</b>
            </div>
            <div class="phone">
                <span>对方姓名</span>
                <b>{{userName}}</b>
                <img src="./img/check.svg" @click="isShowConfirm=true" v-if="isChecked">
            </div>
        </div>
        <div class="contents">
            <!-- <div class="tips">
                <div class="left">REX  {{allAccount}}</div>
                <div class="right">
                    <span class="span1" @click="clickNum(1)">-</span>
                    <input type="number" v-model="amount" @keyup="keyup($event)">
                    <span class="span1 " @click="clickNum(2)">+</span>
                </div>
            </div> -->
            <div class="tips">
                <div class="left">可赠送余额</div>
                <div class="right">
                    <b>{{allAccount|toThousands}}REX</b>
                </div>
            </div>
            <div class="tips">
                <div class="left">赠送金额</div>
                <div class="center">
                    <input type="number" v-model="amount" @keyup="keyup($event)" placeholder="请输入赠送金额（REX)">
                </div>
            </div>
            <div class="tips">
                <div class="left">手续费</div>
                <div class="right">
                    <b>0.00REX</b>
                </div>
            </div>
            <div class="tips">
                <div class="left">实际付费</div>
                <div class="right">
                    <b class="b2">{{amount |toThousands}}REX</b>
                </div>
            </div>
        </div>
        <div class="texts">
            <div class="tips">
                <p class="p1">赠送规则</p>
                <p class="p2">1.赠送人和接受赠送的人必须为铼米平台实名认证的用户；</p>
                <p class="p2">2.赠送的铼米币最小数量为1，暂无上限；</p>
                <p class="p2">3.赠送铼米币给好友暂时不收取手续费；</p>     
                <p class="p2">4.铼米用户对个人的赠送行为负责，赠送所产生的纠纷铼米概不负责；</p>
                <p class="p2">5.若有其它疑问请咨询铼米客服：4000-925-008；</p>
                <p class="p2">6.该活动的最终解释权归上海八刀网络技术有限公司所有。</p>
            </div>
        </div>
        <div class="footer">
            <div class="submit" @click="checkSubmit()">确定</div>
        </div>
        <v-modal title="模态框" :isShow="isShowConfirm" @close="isShow=false" :width="270">
            <div class="modal-body">
                <p class="p1">请补全对方姓名</p>
                <p class="p1">确保资金安全</p>
                <p class="p2">
                    <input type="text" v-model="inputName">
                    <b>{{userNames}}</b>
                </p>
                <p class="btns">
                    <span class="span1" @click="isShowConfirm=false">取消</span>
                    <span class="span2" @click="confirmName()">确定</span>
                </p>
            </div>
            
        </v-modal>
    </div>
</template>
<script>
import modal from '@/components/base/modal/modal'
import {getResult} from '../../api/common.js'
 import { Toast } from 'mint-ui';
export default {
    components: {
        "v-modal": modal,
        
    },
    data(){
        return{
            isShowConfirm:false,
            phone:this.$route.query.phone,
            name:this.$route.query.realName,
            userName:'*'+this.$route.query.realName.substring(1,this.$route.query.realName.length),
            userNames:this.$route.query.realName.substring(1,this.$route.query.realName.length),
            inputName:'',
            allAccount:0,
            amount:'',
            isChecked:true,
            isCanSubmit:true,
        }
    },
    methods:{
        keyup(event){
            this.amount=this.amount.replace(/[^\d]/g,'') 
        },
        goPresent(){
            this.$router.push({name:'present'})
        },
        confirmName(){
            if(!this.inputName){
                Toast('请补全对方姓名');
                return;
            }
            if(this.inputName === this.$route.query.realName.substring(0,1)){
                this.isShowConfirm=false;
                this.isChecked = false;
                this.inputName = '';
                this.userName = this.name;
                Toast('验证通过');
                
            }else{
                this.isShowConfirm=false;
                Toast('姓名和账户不匹配，为避免赠送错误，请核对');
            }
            
        },
        getAccounts(){
            getResult('get',`/rex/v1/rex/user_account`).then((res)=>{
                if(res.result === 0){
                    this.allAccount = res.data.amount;
                }
            })
        },
        clickNum(type){
            if(type === 1){
                if(this.amount === 1) return;
                this.amount--;
            }
            if(type === 2){
                if(!this.checkAmount()) return;
                if(this.amount){
                    this.amount++;
                }
            }
        },
        checkAmount(){
            if(!this.amount || parseInt(this.amount) === 0){
                Toast('请输入赠送数量');
                return false;
            }
            if(this.amount<2000){
                Toast('赠送金额不能小于2000REX');
                return false;
            }
            if(this.amount >25000){
                Toast('您申请赠送的金额超过单笔限额2.5万REX，请重新输入');
                return false;
            }else if(this.amount > this.allAccount){
                Toast('余额不足，请重新输入');
                return false;
            }
            return true;
        },
        checkSubmit(){
            if(!this.isCanSubmit){
                return;
            }
            console.log(1111);
            this.isCanSubmit = false;
            if(!this.checkAmount()) return;
            getResult('post','/rex/v1/rex/presented_rex',{amount:this.amount,phone:this.$route.query.phone}).then((res)=>{
                if(res.result === 0){
                    this.isCanSubmit = false;
                    this.$router.push({name:'result',query:{amount:this.amount}})
                }else{
                    this.isCanSubmit =true;
                    Toast(res.msg);
                }
            })
           
        },
    },
    mounted(){
        this.getAccounts();
    }
}
</script>
<style lang="scss" scoped>
    .confirm{
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
                height: 60px;
                font-size: 16px;
                color: #393A3F;
                line-height: 60px;
                span{
                    margin-right: 20px;
                    display: inline-block;
                    width: 83px;
                    text-align: left;
                    line-height: 60px;
                }
                input{
                    line-height: 60px;
                }
                b{
                    font-size: 16px;
                    color: #393A3F;
                    line-height: 20px;
                    
                }
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
                height: 36px;
                padding: 12px 0;
                .left{
                    float: left;
                    line-height: 36px;
                    font-size: 16px;
                    color: #393A3F;
                }
                .right{
                    float: right;
                    span{
                        float: left;
                        display: inline-block;
                        width: 36px;
                        height: 36px;
                        background: #F1F3F6;
                        line-height: 36px;
                        text-align: center;
                        font-size: 20px;
                    }
                    .span1{
                        color: #D8DAE0;
                    }
                    .span2{
                        color: #61687C;
                    }
                    input{
                        float: left;
                        background: #F8F8F8;
                        font-size: 15px;
                        color: #393A3F;
                        line-height: 36px;
                        width: 82px;
                        border: 0;
                        text-align: center;
                    }
                    b{
                        line-height: 36px;
                        font-size: 15px;
                    }
                    .b2{
                        color: #FB6B38;
                    }
                }
                .center{
                    float: right;
                    line-height: 36px;
                    margin-left: 40px;
                    input{
                        line-height: 20px;
                        width: 148px;
                        padding:8px 0;
                        font-size: 14px;
                        border:0;
                        text-align: right;
                    }
                }
            }
        }
        .texts{
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
                    color: #61687c;
                    line-height: 20px;
                    margin-bottom: 10px;
                }
                p.p2{
                    font-size: 12px;
                    color: #61687c;
                    text-align: left;
                    line-height: 14px;
                    padding-bottom: 13px;
                }
            }
        }
        .footer{
            width: 100%;
            padding: 10px 0;
            text-align: center;
            background: #FFFFFF;
            box-shadow: 0 -3px 10px 0 #F6F6F8;
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
        .modal-body{
            padding:20px 15px;
            p.p1{
                font-size: 18px;
                color: #393A3F;
                line-height: 25px;
                text-align: center;
            }
            p.btns{
                .span1{
                    background: #FFFFFF;
                    border: 1px solid #9FA3B0;
                    border-radius: 24px;
                    width: 108px;
                    height: 36px;
                    display: inline-block;
                    text-align: center;
                    line-height: 36px;
                    margin-left: 10px;
                }
                .span2{
                    background-image: linear-gradient(-269deg, #25BEF2 0%, #218CF7 100%);
                    border-radius: 24px;
                    width: 108px;
                    height: 36px;
                    display: inline-block;
                    text-align: center;
                    line-height: 36px;
                    color: #ffffff;
                }
            }
            p.p2{
                font-size: 16px;
                color: #393A3F;
                line-height: 22px;
                text-align: center;
                padding:20px 0 30px 0;
                input{
                    border: 0;
                    border-bottom: 1px solid #218CF7;
                    width: 30px;
                }
                
            }
        }
    }
</style>


