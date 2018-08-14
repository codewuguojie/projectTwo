<template>
    <div class="order">
        <div class="orderdetail" v-if="!outLine" v-for="list in arr">
            <div class="orderheader">
                <div class="header">
                    <i @click="orderdetailBack()" class="icon-line-left"></i>
                    <span class="title">订单详情</span>
                </div>
                <div class="state">
                    <span class="left">{{status[list.orderStatus]}}</span>
                    <span class="right" v-if="list.orderStatus==3">感谢您的参与！</span>
                    <div class="right" v-if="list.orderStatus==0" style="text-align: right">
                        <p class="outTime" style="color: #fff; font-size: 16px;">{{'剩余时间：&nbsp;&nbsp;'+countDown1}}</p>
                        <p class="payMoney" style="color: #fff; font-size: 12px;">{{'需付款：￥'+list.orderPrice}}</p>
                    </div>
                </div>
            </div>
            <div class="middle">
                <div class="userone">
                    <div class="usermsg">
                        <div class="name-phone">
                            <span>{{list.orderName}}</span>
                            <span>{{list.orderCall}}</span>
                        </div>
                        <div class="useraddress">
                            <i class="icon-address"></i>
                            <p>{{list.orderAddr}}</p>
                        </div>
                    </div>
                    <div class="ordermsg">
                        <dl @click="goDetail(list)">
                            <dt><img :src="staticUrl+list.items[0].images[0].filePath"/></dt>
                            <dd>
                                <p class="ordermsgone">
                                    <span class="ordermsg-left">{{list.items[0].itemName}}</span>
                                    <span class="ordermsg-right">￥{{list.items[0].oneItemPrice}}</span>
                                </p>
                                <p class="ordermsgtwo">
                                    <span class="ordertype-left">
                                        <b style="margin-right: 10px" class="ordertype" v-for="type in list.items[0].itemAttribute">{{type.goodsAttributeName}}:{{type.goodsAttributeSpecName}}</b>

                                    </span>
                                    <span class="ordernum">x{{list.items[0].itemNum}}</span>
                                </p>
                            </dd>
                        </dl>
                    </div>
                    <div class="ordertotal">
                        <span>{{'共计'+list.items[0].itemNum+'件商品&nbsp;合计：'}}<b class="ordermoney">￥{{list.items[0].itemPrice}}</b></span>
                    </div>
                </div>
                <div class="usertwo">
                    <div class="dealmsg">
                        <p>订单号：<span>{{list.orderNo}}</span></p>
                        <p v-if="list.orderStatus!=0&&list.orderStatus!=5&&list.orderStatus!=6">支付方式：<span>{{paytype[list.orderPaychannel]}}</span></p>
                        <p v-if="list.orderStatus!=0 && list.orderStatus!=5 && list.orderStatus!=6">交易流水号：<span>{{list.payQueryDTO==null?'':list.payQueryDTO.payOrderNo}}</span></p>
                        <p>创建时间：<span>{{list.createTime}}</span></p>
                        <p v-if="list.orderStatus == 1 || list.orderStatus == 2 || list.orderStatus == 3 || list.orderStatus == 4">付款时间：<span>{{list.payDatetime}}</span></p>
                        <p v-if="list.orderStatus == 2 || list.orderStatus == 3">发货时间：<span>{{list.orderShipDTO.shipTime}}</span></p>
                        <p v-if="list.orderStatus == 3">成交时间：<span>{{list.orderShipDTO.signTime }}</span></p>
                    </div>
                    <div class="invoice" v-if="list.invoiceDTO.isNeed==1">
                        <p>发票类别：<span>{{list.invoiceDTO.invoiceType==0?'个人':'公司'}}</span></p>
                        <p>发票抬头：<span>{{list.invoiceDTO.invoiceHead}}</span></p>
                        <p v-if="list.invoiceDTO.invoiceType==1">纳税人识别号：<span>{{list.invoiceDTO.identifyNo}}</span></p>
                        <p>发票内容：<span>{{list.invoiceDTO.invoiceContent}}</span></p>
                    </div>
                </div>
                <div class="userthree">
                    <p><span class="moneymsg">金额合计：</span><span class="moneytotal">￥{{list.orderPrice}}</span></p>
                    <p><span class="moneymsg">运费：</span><span class="moneytotal">￥{{list.orderShip==0?'0.00':list.orderShip}}</span></p>
                    <p><span class="moneymsg">应付金额：</span><span class="moneytotal">￥{{list.orderPrice}}</span></p>
                    <p v-if="list.orderStatus!=0&&list.orderStatus!=5&&list.orderStatus!=6"><span class="moneymsg">实付金额：</span><span class="moneytotal moneysum">{{list.orderCost==null?'￥0.00':'￥'+list.orderCost}}</span></p>
                </div>
                <div class="userfour" v-if="list.refundOrderDTO.id!==null">
                    <p><span class="moneymsg">退款原因：</span><span class="moneytotal">{{list.refundOrderDTO.reason}}</span></p>
                    <p><span class="moneymsg">退款说明：</span><span class="moneytotal">{{list.refundOrderDTO.remark}}</span></p>
                    <p><span class="moneymsg">退款金额：</span><span class="moneytotal">{{list.refundOrderDTO.shouldRefundAmt==0?'￥0.00':'￥'+list.refundOrderDTO.shouldRefundAmt}}</span></p>
                    <p><span class="moneymsg">申请退款时间：</span><span class="moneytotal">{{list.refundOrderDTO.createTime}}</span></p>
                    <p v-if="list.refundOrderDTO.refundStatus==2"><span class="moneymsg">实际退款时间：</span><span class="moneytotal">{{list.refundOrderDTO.refundTime }}</span></p>
                    <p v-if="list.refundOrderDTO.refundStatus==3"><span class="moneymsg">驳回退款原因：</span><span class="moneytotal">{{list.refundOrderDTO.rejectReason }}</span></p>
                </div>
            </div>
            <div class="bottom">
                <div class="bottom-box">
                    <button @click="messageBox(list)" v-if="list.orderStatus==0">取消订单</button>
                    <button @click="myOrder(list)" v-if="list.orderStatus==0">立即支付</button>
                    <button @click="logictics(list)" v-if="list.orderStatus==2 || list.orderStatus==3">追踪物流</button>
                    <button @click="refundpopup(list)" v-if="list.orderStatus==1  && list.couldRefund">申请退款</button>
                </div>
            </div>
            <v-modal title="温馨提示" :isShow="isShowModal" :width="270" @close="isShowModal=false">
                <div class="messagebox">
                    <h3>温馨提示</h3>
                    <p>您确认要取消该订单吗</p>
                    <div class="btn">
                        <button @click="out()">取消</button>
                        <button @click="ok()">确定</button>
                    </div>
                </div>
            </v-modal>
            <!--申请退款弹框-->
            <mt-popup
                class="refundpopup"
                v-model="isrefund"
                position="bottom"
                :closeOnClickModal=false
                popup-transition="popup-fade"
            >
                <div class="refund">
                    <div class="refundtitle">
                        <i class="icon-mores"></i>
                        <span @click="refundBack()" class="title">申请退款</span>
                    </div>
                    <div class="refundcont">
                        <div class="refundone">
                            <p>订单号：<span>{{refundNo}}</span></p>
                        </div>
                        <div class="refundtwo">
                            <p>退款原因<span style="color: rgb(250,102,51);">*</span>:</p>
                            <select v-model="selected">
                                <option v-for="(item,index) in refundReason" :value="item.value">{{item.text}}</option>
                            </select>
                        </div>
                        <div class="refundthree">
                            <p>退款说明<span style="color: rgb(250,102,51);">*</span>:</p>
                            <textarea v-model="refundText" placeholder="退款说明内容请限制在5~50字符" maxlength="100" minlength="5"></textarea>
                        </div>
                        <div class="refundfour">
                            <p>退款金额：<span style="color: rgb(250,102,51);">{{'￥'+refundMoney}}</span></p>
                        </div>
                        <div class="refundfive">
                            <button @click="refund()">提交申请</button>
                        </div>
                    </div>
                </div>
            </mt-popup>
            <!--申请退款错误操作提示框-->
            <v-modal class="refunderrormsg" :isShow="isMsg" :width="200" @close="isMsg=false">
                <p>{{errorMessage}}</p>
            </v-modal>
        </div>

        <!--无网络状态显示页面-->
        <div class="outLine" v-if="outLine">
            <div class="content">
                <img src="./img/img_network.png"/>
                <h3>您的网络好像出现了问题</h3>
                <span @click="myReload()">重新加载</span>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import {getResult,staticUrl} from "../../api/common";
    import {toThousands} from "../../api/common";
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import modal from '@/components/base/modal/modal'
    import {Popup,Toast} from 'mint-ui'
    Vue.use(Popup.name,Popup)
    export default {
        components:{
          "v-modal":modal,
        },
        data(){
            return{
                isrefund:false,
                staticUrl:staticUrl(),
                refundText:'',
                refundMoney:'',
                refundId:'',
                refundNo:'',
                refundReason:[
                    {
                        text:'买错了',value:'0'
                    },
                    {
                        text:'我不想要了',value:'1'
                    },
                    {
                        text:'其他',value:'2'
                    }
                ],
                selected:'0',
                status:[
                    '待付款',
                    '待发货',
                    '待收货',
                    '已完成',
                    '退款中',
                    '已退款',
                    '已取消'
                ],
                paytype:[
                    '支付宝app',
                    '微信app',
                    '支付宝pc扫码',
                    '微信pc扫码',
                    '支付宝wap',
                    '微信h5',
                    '微信公众号'
                ],
                arr:[],
                isShowModal:false,
                myId:'',
                errorMessage:'',
                isMsg:false,
                countDown1:'',
                outLine:false
            }
        },
        methods:{
            ok(){
                this.isShowModal = false
                getResult('put','/order/v1/order/cancel',{
                    id:this.myId
                })
                    .then(data=>{
                        console.log(data.data)
                        this.$router.push({name:'order'})
                    })
            },
            myOrder(list){
                this.$router.push({name:'pay',params:{id:list.items[0].goodsId},query:{id:list.id,returnUrl:`/#/orderDetail/${list.id}?index=0`}})
            },
            out(){
                this.isShowModal = false
            },
            /*取消订单弹框内容*/
            messageBox(list){
                this.isShowModal = true
                this.myId = list.id
            },
            /*申请退款弹框*/
            refundpopup(list){
                this.isrefund = !this.isrefund
                this.refundMoney = list.orderPrice
                this.refundId = list.id
                this.refundNo = list.orderNo
            },
            refundBack(){
                this.isrefund = false
            },
            check(){
              if(!this.refundText){
                    this.errorMessage = "请补充退款说明";
                    this.isMsg = true
                    setInterval(()=>{
                        this.isMsg = false
                    },1000)
                  return false;
                }
                return true
            },
            refund(){
                if(!this.check()) return;
                getResult('post','/order/v1/refund_order',{
                    orderId : this.refundId,
                    reason:this.refundReason[this.selected].text,
                    remark:this.refundText,
                    shouldRefundAmt:this.refundMoney
                })
                    .then(data=>{
                        this.arr = []
                        console.log(data.msg)
                        //window.location.reload()
                        this.isrefund = false
                        getResult('get',`/order/v1/order/${this.$route.params.id}`)
                            .then(data=> {
                                console.log(data.data)
                                this.arr.push(data.data)
                            })
                    })
            },
            /*物流信息*/
            logictics(list){
                this.$router.push({name:'logistic',query:{id:this.$route.params.id,index:this.$route.query.index}})
            },
            orderdetailBack(){
                this.$router.push({name:'order',query:{index:this.$route.query.index}})
            },
            goDetail(list){
                getResult('get',`/zc/v1/open/zcproject/${list.items[0].projectId}`)
                    .then(data=>{
                        if(data.result==1){
                            Toast('商品已下架')
                        }
                        if(data.result==0){
                            this.$router.push({ name: "detailzc",params:{id:list.items[0].projectId},query:{returnUrl:`/orderDetail/${this.$route.params.id}?index=${this.$route.query.index}`}});
                        }
                    })
            },
            myReload(){
                window.location.reload()
            }
        },
        mounted(){
            getResult('get',`/order/v1/order/${this.$route.params.id}`)
                .then(data=>{
                    console.log(data.data)
                    this.arr.push(data.data)
                    this.arr.forEach((value,index,arr)=>{
                        //console.log(value.payExpireTime)
                        //value.countDown = '11'
                        // this.dountDown(value.sysTime,value.payExpireTime,value)
                        if(value.orderStatus != 0) return;
                        let myTime = (Date.parse(value.payExpireTime.replace(/-/g,'/'))-Date.parse(value.sysTime.replace(/-/g,'/')))/1000
                        let timer = setInterval(()=>{
                            myTime--;
                            let fen = Math.floor(myTime/60)>9?Math.floor(myTime/60):'0'+Math.floor(myTime/60)
                            let miao = Math.round(myTime%60)>9?Math.round(myTime%60):'0'+Math.round(myTime%60)
                            this.countDown1 = '00:'+fen+':'+miao
                            if(myTime == 0){
                                window.clearInterval(timer)
                            }
                        },1000)
                    })
                })
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/sass/order.scss";

    .outLine{
        width: 100%;
        height: 100%;
        position: relative;
        .content{
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 158px;
            height: 200px;
            img {
                display: block;
                width: 144px;
                height: 98px;
                margin: 0 auto;
            }
            h3{
                margin-top: 20px;
                font-size: 14px;
                text-align: center;
                color: #61687C;
            }
            span{
                display: block;
                width: 70px;
                height: 30px;
                background: #218CF7;
                color: #fff;
                text-align: center;
                line-height: 30px;
                border-radius: 15px;
                margin: 10px auto 0;
            }
        }
    }

</style>
