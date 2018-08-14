<template>
    <div class="three">
        <div class="head">
            <div class="topTitle">
                <span class="span1 icon-line-left" @click="goAccount()"></span>
                <span class="text">申请转出</span>
                <span class="span2" @click="goRecall()">转入</span>
            </div>
        </div>
        <div class="contents">
            <div class="tips">
                <p class="p1">可转出余额（REX）</p>
                <p class="p2">{{money|toThousands}}</p>
            </div>
            <div class="transfer-money">
                <span>REX</span>
                <input type="number" placeholder="请输入转出金额（REX）" v-model="transMoney"  maxlength="11">
            </div>
        </div>
        <div class="line"></div>
        <div class="btn"><span @click="applayTransfer()">申请转出</span></div>
        <div class="footer">
            <p><b>*</b>REX将从我的钱包转出到小鲸库钱包中</p>
            <p class="p2" @click="goThree()">点击下载小鲸库</p>
        </div>
        <div class="protocal">
            <div @click="isShowProtocal=true">
                <div>
                    <img src="./img/tips.png">
                    <b >转出规则</b>
                </div>
                
            </div>
        </div>
        <v-modal title="模态框" :isShow="isShowConfirm" @close="isShow=false" :width="270">
            <div class="modal-body">
                <p class="p1">提示</p>
                <p class="p2">您正在申请将{{transMoney|toThousands}}REX，从我的钱包转出到小鲸库钱包！</p>
                
                <p class="btns">
                    <span class="span1" @click="isShowConfirm=false">取消</span>
                    <span class="span2" @click="submitBtn()">确定提交</span>
                </p>
            </div>
        </v-modal>
        <v-modal title="模态框" :isShow="isShowProtocal" @close="isShowProtocal=false" :width="320">
            <div class="modal-body">
                <p class="p1">转出规则</p>
                <p class="texts first">1.使用转出功能必须为铼米平台实名认证的用户；</p>
                <p class="texts">2.从我的钱包转出到小鲸库钱包的铼米币最小数量为5000；</p>
                <p class="texts">3.铼米币单笔转出限额（2.5万REX）、单日转出限额（50万REX）、单月转出限额（1500万REX）；</p>
                <p class="texts">4.从我的钱包转出铼米币到第三方钱包暂时不收取手续费；</p>
                <p class="texts">5.若有其他疑问请咨询铼米客服:4000-925-008</p>
                <p class="texts">6.该活动的最终解释权归上海铼米科技有限公司所有。</p>
                <p class="btnss">
                    <span class="span3" @click="isShowProtocal=false">我知道了</span>
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
    data(){
        return{
            isShowConfirm:false,
            money:0.00,
            transMoney:'',
            isShowProtocal:false
        }
    },
    components: {
        "v-modal": modal,
        
    },
    methods:{
        keyup(event){
            this.transMoney=this.transMoney.replace(/[^\d]/g,'') 
        },
        goAccount(){
            this.$router.push({name:'account'})
        },
        goRecall(){
            this.$router.push({name:'recall'})
        },
        getAccounts(){
            getResult('get',`/rex/v1/rex/user_account`).then((res)=>{
                if(res.result === 0){
                    this.money = res.data.amount;
                }
            })
        },
        applayTransfer(){
            if(parseInt(this.transMoney)===0 || !this.transMoney || parseInt(this.transMoney)<0){
                Toast('请输入转出金额')
                return;
            }
            if(this.transMoney<5000){
                Toast('转出金额不能小于5000REX');
                return;
            }
            if(this.transMoney>this.money){
                Toast('转出金额不能大于余额');
                return;
            }
            this.isShowConfirm = true;
        },
        submitBtn(){
            
            getResult('post','/rex/v1/whale_bank/laimi_to_whalebank',{amount:this.transMoney}).then((res)=>{
                if(res.result == 0){
                    this.$router.push({name:'transucess',query:{count:this.transMoney}})
                }else{
                    this.isShowConfirm = false;
                    Toast(res.msg);
                }
            })
        },
        goThree(){
            window.location.href='https://dl.whalebank.cn/?channel=CK1395421172909';
        }
    },
    mounted(){
        this.getAccounts();
    }
}
</script>
<style lang="scss" scoped>
    .three{
        width: 100%;
        height: 100%;
        background: #ffffff;
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
                    border:0;
                }
                .span2{
                    position: absolute;
                    line-height: 44px;
                    right: 15px;
                    top:0;
                    font-size: 18px;
                    color: #218CF7;
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
                background: url('./img/transfer2.png');
                background-size:cover;
                box-shadow: 0 6px 15px 0 #218CF7;
                height: 140px;
                border-radius: 15px;
                .p1{
                    padding:40px 0 5px 15px;
                    font-size: 12px;
                    color: #FFFFFF;
                }
                .p2{
                    font-size: 24px;
                    color: #FFFFFF;
                    padding-left: 15px;
                }
            }
            .transfer-money{
                width: 345px;
                margin:0 auto;
                height: 60px;
                font-size: 16px;
                color: #393A3F;
                line-height: 60px;
                margin-top: 20px;
                span{
                    margin-right: 20px;
                    display: inline-block;
                    text-align: left;
                    line-height: 60px;
                }
                input{
                    padding: 20px 0;
                    line-height: 20px;
                    border: 0;
                }
                b{
                    font-size: 16px;
                    color: #393A3F;
                    line-height: 20px;
                    
                }
            }
        }
        .footer{
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 20px;
            p{  
                padding-left: 15px;
                font-size: 12px;
                color: #9FA3B0;
                text-align: center;
                font-size: 12px;
                line-height: 18px;
                b{
                    color: #FB6B38;
                    
                }
            }
            .p2{
                margin-top: 10px;
                text-decoration:underline;
                color: #218CF7;
            }
        }
        .line{
            width: 100%;
            background: #F8F8F8;
            height: 10px;

        }
        .btn{
            width: 100%;
            text-align: center;
            margin-top: 40px;
            span{
                display: inline-block;
                background-image: linear-gradient(-269deg, #25BEF2 0%, #218CF7 100%);
                border-radius: 24px;
                font-size: 15px;
                color: #FFFFFF;
                width: 220px;
                height: 40px;
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
                    margin-right: 15px;
                    font-size: 14px;
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
                    font-size: 14px;
                }
                
            }
            p.btnss{
                text-align:center;
                margin-top: 30px;
                .span3{
                    display: inline-block;
                    width: 220px;
                    height: 40px;
                    background-image: linear-gradient(-269deg, #25BEF2 0%, #218CF7 100%);
                    border-radius: 22px;
                    line-height: 40px;
                    text-align:center;
                    color:#ffffff;
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
            p.texts{
                font-size: 14px;
                line-height: 22px;
            }
            p.first{
                margin-top: 20px;
            }
        }
        .protocal{
            margin:0 auto;
            text-align: center;
            div{
                display: inline-block;
                font-size: 12px;
                color: #218CF7;
                line-height: 36px;
                div{
                    img{
                        float: left;
                        width: 25px;
                        vertical-align: middle;
                    }
                    b{
                        float: left;
                    }
                }
                
            }
        }
    }
</style>


