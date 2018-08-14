<template>
    <div class="order">
        <!--订单列表-->
        <div class="box" v-if="!ispay || !isLogictics || !isorderDetail">
            <div class="top"><i @click="goMycenter()" class="icon-line-left"></i></div>
            <div class="nav">
                <h1>我的订单</h1>
                <ul>
                    <li v-for="(item,index) in items" @click="tab(index)" ><p :class="{'active':index == nowindex}">{{item}}</p></li>
                </ul>
            </div>
            <!--没有数据展示页面-->
            <div v-if="orderlist" class="content">
                <div class="outlist" v-if="nowindex===0">
                    <img src="./img/img_order.png"/>
                    <p>您还没有相关订单呢</p>
                </div>
                <div class="outlist" v-if="nowindex===1">
                    <img src="./img/img_order.png"/>
                    <p>您还没有相关订单呢</p>
                </div>
                <div class="outlist" v-if="nowindex===2">
                    <img src="./img/img_order.png"/>
                    <p>您还没有相关订单呢</p>
                </div>
                <div class="outlist" v-if="nowindex===3">
                    <img src="./img/img_order.png"/>
                    <p>您还没有相关订单呢</p>
                </div>
                <div class="outlist" v-if="nowindex===4">
                    <img src="./img/img_order.png"/>
                    <p>您还没有相关订单呢</p>
                </div>
            </div>
            <!--没有网络展示页面-->
            <div v-if="outLine" class="content">
                <div class="outlist" v-if="nowindex===0">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                </div>
                <div class="outlist" v-if="nowindex===1">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                </div>
                <div class="outlist" v-if="nowindex===2">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                </div>
                <div class="outlist" v-if="nowindex===3">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                </div>
                <div class="outlist" v-if="nowindex===4">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                </div>
            </div>
            <!--全部订单列表-->
            <div class="orderlist" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <div class="list" v-for="list in orderList">
                    <div class="one">
                        <div class="left">{{'订单号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ list.orderNo }}</div>
                        <div class="right" :style="{color:color[list.orderStatus]}">{{orderstatus[list.orderStatus]}}</div>
                    </div>
                    <div class="two" @click="orderdetail(list)" v-for="goods in list.items">
                        <dl>
                            <dt v-for="picture in goods.images"><img :src="staticUrl+picture.filePath"/></dt>
                            <dd>
                                <div class="top-list">
                                    <p class="l">{{list.items[0].itemName | wordLeth}}</p>
                                    <p class="r">{{list.items[0].oneItemPrice | wordLeth}}</p>
                                </div>
                                <div class="bottom-list">
                                    <p class="l">
                                        <span class="promsg" v-for="type in list.items[0].itemAttribute">{{type.goodsAttributeName}}:{{type.goodsAttributeSpecName}}</span>
                                    </p>
                                    <p class="r">{{'x'+list.items[0].itemNum}}</p>
                                    <!--<p style="display: none;">{{list.userId}}</p>-->
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="three">
                        <span class="listnum">{{'共计'+list.items[0].itemNum+'件商品'}}</span>
                        <span class="listmoney"><b class="total">合计：</b><b class="totalnum">{{'￥'+list.orderPrice}}</b></span>
                    </div>
                    <div class="four">
                        <span class="timeout" v-if="list.orderStatus==0"><i><img src="./img/icon-10.png"/></i>{{list.countDown1}}</span>
                        <div class="l">
                            <button class="btntwo first" v-if="list.orderStatus==0" @click="messageBox(list)">取消订单</button>
                            <button class="btnone second" v-if="list.orderStatus==0" @click="myPay(list)">立即支付</button>
                            <button class="btnthree second" v-if="list.orderStatus==1 && list.couldRefund" @click="refundpopup(list)">申请退款</button>
                            <button class="btnfour first" v-if="list.orderStatus==2 || list.orderStatus==3" @click="logictics(list)">追踪物流</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--立即支付订单列表-->
            <div class="orderlist" v-if="nowindex==1">
                <div class="list" v-for="list in orderList">
                    <div class="one">
                        <div class="left">{{'订单号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ list.orderNo }}</div>
                        <div class="right" :style="{color:color[list.orderStatus]}">{{orderstatus[list.orderStatus]}}</div>
                    </div>
                    <div class="two" @click="orderdetail(list)" v-for="goods in list.items">
                        <dl>
                            <dt v-for="picture in goods.images"><img :src="staticUrl+picture.filePath"/></dt>
                            <dd>
                                <div class="top-list">
                                    <p class="l">{{list.items[0].itemName | wordLeth}}</p>
                                    <p class="r">{{list.items[0].oneItemPrice | wordLeth}}</p>
                                </div>
                                <div class="bottom-list">
                                    <p class="l">
                                        <span class="promsg" v-for="type in list.items[0].itemAttribute">{{type.goodsAttributeName}}:{{type.goodsAttributeSpecName}}</span>
                                    </p>
                                    <p class="r">{{'x'+list.items[0].itemNum}}</p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="three">
                        <span class="listnum">{{'共计'+list.items[0].itemNum+'件商品'}}</span>
                        <span class="listmoney"><b class="total">合计：</b><b class="totalnum">{{'￥'+list.orderPrice}}</b></span>
                    </div>
                    <div class="four">
                        <span class="timeout" v-if="list.orderStatus==0"><i><img src="./img/icon-10.png"/></i>{{list.countDown1}}</span>
                        <div class="l">
                            <button class="btntwo first" v-if="list.orderStatus==0" @click="messageBox(list)">取消订单</button>
                            <button class="btnone second" v-if="list.orderStatus==0" @click="myPay(list)">立即支付</button>
                            <button class="btnthree second" v-if="list.orderStatus==1 && list.couldRefund" @click="refundpopup(list)">申请退款</button>
                            <button class="btnfour first" v-if="list.orderStatus==2 || list.orderStatus==3" @click="logictics(list)">追踪物流</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--待发货订单列表-->
            <div class="orderlist" v-if="nowindex==2">
                <div class="list" v-for="list in orderList">
                    <div class="one">
                        <div class="left">{{'订单号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ list.orderNo }}</div>
                        <div class="right" :style="{color:color[list.orderStatus]}">{{orderstatus[list.orderStatus]}}</div>
                    </div>
                    <div class="two" @click="orderdetail(list)" v-for="goods in list.items">
                        <dl>
                            <dt v-for="picture in goods.images"><img :src="staticUrl+picture.filePath"/></dt>
                            <dd>
                                <div class="top-list">
                                    <p class="l">{{list.items[0].itemName | wordLeth}}</p>
                                    <p class="r">{{list.items[0].oneItemPrice | wordLeth}}</p>
                                </div>
                                <div class="bottom-list">
                                    <p class="l">
                                        <span class="promsg" v-for="type in list.items[0].itemAttribute">{{type.goodsAttributeName}}:{{type.goodsAttributeSpecName}}</span>
                                    </p>
                                    <p class="r">{{'x'+list.items[0].itemNum}}</p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="three">
                        <span class="listnum">{{'共计'+list.items[0].itemNum+'件商品'}}</span>
                        <span class="listmoney"><b class="total">合计：</b><b class="totalnum">{{'￥'+list.orderPrice}}</b></span>
                    </div>
                    <div class="four">
                        <span class="timeout" v-if="list.orderStatus==0"><i><img src="./img/icon-10.png"/></i>00:09:59</span>
                        <div class="l">
                            <button class="btntwo first" v-if="list.orderStatus==0" @click="messageBox(list)">取消订单</button>
                            <button class="btnone second" v-if="list.orderStatus==0" @click="myPay(list)">立即支付</button>
                            <button class="btnthree second" v-if="list.orderStatus==1 && list.couldRefund" @click="refundpopup(list)">申请退款</button>
                            <button class="btnfour first" v-if="list.orderStatus==2 || list.orderStatus==3" @click="logictics(list)">追踪物流</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--待收货订单列表-->
            <div class="orderlist" v-if="nowindex==3">
                <div class="list" v-for="list in orderList">
                    <div class="one">
                        <div class="left">{{'订单号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ list.orderNo }}</div>
                        <div class="right" :style="{color:color[list.orderStatus]}">{{orderstatus[list.orderStatus]}}</div>
                    </div>
                    <div class="two" @click="orderdetail(list)" v-for="goods in list.items">
                        <dl>
                            <dt v-for="picture in goods.images"><img :src="staticUrl+picture.filePath"/></dt>
                            <dd>
                                <div class="top-list">
                                    <p class="l">{{list.items[0].itemName | wordLeth}}</p>
                                    <p class="r">{{list.items[0].oneItemPrice | wordLeth}}</p>
                                </div>
                                <div class="bottom-list">
                                    <p class="l">
                                        <span class="promsg" v-for="type in list.items[0].itemAttribute">{{type.goodsAttributeName}}:{{type.goodsAttributeSpecName}}</span>
                                    </p>
                                    <p class="r">{{'x'+list.items[0].itemNum}}</p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="three">
                        <span class="listnum">{{'共计'+list.items[0].itemNum+'件商品'}}</span>
                        <span class="listmoney"><b class="total">合计：</b><b class="totalnum">{{'￥'+list.orderPrice}}</b></span>
                    </div>
                    <div class="four">
                        <span class="timeout" v-if="list.orderStatus==0"><i><img src="./img/icon-10.png"/></i>00:09:59</span>
                        <div class="l">
                            <button class="btntwo first" v-if="list.orderStatus==0" @click="messageBox(list)">取消订单</button>
                            <button class="btnone second" v-if="list.orderStatus==0" @click="myPay(list)">立即支付</button>
                            <button class="btnthree second" v-if="list.orderStatus==1 && list.couldRefund" @click="refundpopup(list)">申请退款</button>
                            <button class="btnfour first" v-if="list.orderStatus==2 || list.orderStatus==3" @click="logictics(list)">追踪物流</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--已完成订单列表-->
            <div class="orderlist" v-if="nowindex==4">
                <div class="list" v-for="list in orderList">
                    <div class="one">
                        <div class="left">{{'订单号：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ list.orderNo }}</div>
                        <div class="right" :style="{color:color[list.orderStatus]}">{{orderstatus[list.orderStatus]}}</div>
                    </div>
                    <div class="two" @click="orderdetail(list)" v-for="goods in list.items">
                        <dl>
                            <dt v-for="picture in goods.images"><img :src="staticUrl+picture.filePath"/></dt>
                            <dd>
                                <div class="top-list">
                                    <p class="l">{{list.items[0].itemName | wordLeth}}</p>
                                    <p class="r">{{list.items[0].oneItemPrice | wordLeth}}</p>
                                </div>
                                <div class="bottom-list">
                                    <p class="l">
                                        <span class="promsg" v-for="type in list.items[0].itemAttribute">{{type.goodsAttributeName}}:{{type.goodsAttributeSpecName}}</span>
                                    </p>
                                    <p class="r">{{'x'+list.items[0].itemNum}}</p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <div class="three">
                        <span class="listnum">{{'共计'+list.items[0].itemNum+'件商品'}}</span>
                        <span class="listmoney"><b class="total">合计：</b><b class="totalnum">{{'￥'+list.orderPrice}}</b></span>
                    </div>
                    <div class="four">
                        <span class="timeout" v-if="list.orderStatus==0"><i><img src="./img/icon-10.png"/></i>00:09:59</span>
                        <div class="l">
                            <button class="btntwo first" v-if="list.orderStatus==0" @click="messageBox(list)">取消订单</button>
                            <button class="btnone second" v-if="list.orderStatus==0" @click="myPay(list)">立即支付</button>
                            <button class="btnthree second" v-if="list.orderStatus==1 && list.couldRefund" @click="refundpopup(list)">申请退款</button>
                            <button class="btnfour first" v-if="list.orderStatus==2 || list.orderStatus==3" @click="logictics(list)">追踪物流</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--支付页面-->
        <div v-if="ispay" class="pay">
            <div class="paytop">
                <i class="icon-line-left" @click="payBack()"></i>
                <span>支付</span>
            </div>
            <div class="paycont">
                <div class="payorder">
                    <p class="paycode">订单编号：<span>LM20180529000001</span></p>
                    <p class="paymoney">应付金额：<span>¥897.00</span></p>
                    <p class="paytips">订单提交成功，请您尽快完成支付，否则订单会被自动取消！</p>
                </div>
                <div class="paytype">
                    <p class="paytitle">选择支付方式</p>
                    <div class="typeone">
                        <p class="alipay">
                            <i class="icon-alipay"></i><b class="wenzi">支付宝支付</b>
                        </p>
                        <p class="input" :style="{border:myBorderOne}">
                            <img v-if="myCheckboxOne" src="./img/select.png"/>
                            <input @click="checkboxOne()" type="checkbox"/>
                        </p>
                    </div>
                    <div class="typetwo">
                        <p class="wepay">
                            <i class="icon-wepay"></i><b class="wenzi">微信支付</b>
                        </p>
                        <p class="input" :style="{border:myBorderTwo}">
                            <img v-if="myCheckboxTwo" src="./img/select.png"/>
                            <input @click="checkboxTwo()" type="checkbox"/>
                        </p>
                    </div>
                </div>
            </div>
            <div class="paybottom">
                <button>立即支付</button>
            </div>
        </div>

        <!--取消订单弹框-->
        <!--messagebox-->
        <v-modal title="温馨提示" :isShow="isShowModal" :width="270" @close="isShowModal=false">
            <div class="messagebox">
                <h3>温馨提示</h3>
                <p>您确认要取消该订单吗</p>
                <div class="btn">
                    <button @click="ok()">确定</button>
                    <button @click="out()">取消</button>
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
                        <select @change="selectReason()" v-model="selected">
                            <option v-for="(item,index) in refundReason" :value="item.value">{{item.text}}</option>
                        </select>
                    </div>
                    <div class="refundthree">
                        <p>退款说明<span style="color: rgb(250,102,51);">*</span>:</p>
                        <textarea v-model="refundText" placeholder="退款说明内容请限制在5~50字符" maxlength="50" minlength="5"></textarea>
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
</template>

<script>
    import Vue from 'vue'
    import {getResult,staticUrl} from "../../api/common";
    import modal from '@/components/base/modal/modal'
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import {MessageBox,Popup,InfiniteScroll} from 'mint-ui'
    Vue.use(Popup.name,Popup)
    Vue.use(InfiniteScroll)

    export default {
        name: "order",
        components: {
            "v-modal":modal
        },
        data(){
            return{
                outLine:false,//判断是否连接网络
                myId:'',//取消订单所要依据的id
                refundId:'',//退款所依据的ID
                isShowModal:false,//订单取消控制
                staticUrl:staticUrl(),
                items:[
                    '全部',
                    '待付款',
                    '待发货',
                    '待收货',
                    '已完成'
                ],
                refundText:'',
                refundMoney:'',
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
                orderList:[],
                pageIndex:0,
                pageSize:'10',
                loading:false,
                orderstatus:[
                    '待付款',
                    '待发货',
                    '待收货',
                    '已完成',
                    '退款中',
                    '已退款',
                    '已取消'
                ],
                color: [
                    '#FB6B38',//橙色
                    '#FB6B38',//橙色
                    '#FB6B38',//橙色
                    '#218CF7',//蓝色
                    '#FB6B38',//橙色
                    '#218CF7',//蓝色
                    '#61687C'//灰色
                ],
                minHeight:'',
                nowindex: 0,
                orderlist:false,
                btn:false,
                myCheckboxOne:false,//支付方式判断支付宝
                myCheckboxTwo:false,//支付方式判断微信
                myBorderOne:'',
                myBorderTwo:'',
                listOrDetail:'',//判断从订单列表页还是从订单详情页进入支付页面
                ispay:false,//判断从订单列表页面进入支付，支付页面是否显示隐藏
                isorder:false,//判断从订单详情进入支付，支付页面是否显示隐藏
                isrefund:false,//判断退款弹框显示隐藏
                myindex:'',
                fen:'',
                miao:'',
                isMsg:false,
                errorMessage:'',
                refundNo:'',//退款订单号
                btnShow:true
            }
        },
        methods:{
            goMycenter(){
                this.$router.push({path:'mycenter'})
            },
            tab(index){
                this.nowindex = index;
                getResult('get',`/order/v1/order/list/${this.nowindex-1}`)
                    .then(data=>{
                        console.log(data.data)
                        this.orderList = data.data.list
                        if(this.orderList.length==0){
                            this.orderlist = true
                        }else {
                            this.orderlist = false
                        }
                    })
            },
            checkboxOne(){
                this.myCheckboxOne = !this.myCheckboxOne;
                if(this.myCheckboxOne){
                    this.myBorderOne = '0'
                }else {
                    this.myBorderOne = '1px solid #9fa3b0'
                }
            },
            checkboxTwo(){
                this.myCheckboxTwo = !this.myCheckboxTwo;
                if(this.myCheckboxTwo){
                    this.myBorderTwo = '0'
                }else {
                    this.myBorderTwo = '1px solid #9fa3b0'
                }
            },

            /*从订单列表进入控制支付页面*/
            myPay(list){
                this.$router.push({name:'pay',params:{id:list.items[0].goodsId},query:{id:list.id,returnUrl:'/#/order?all=0'}})
                this.listOrDetail = 0
                console.log(this.$route)
            },
            payBack(){
                if(this.listOrDetail = 0){
                    this.ispay = false
                    this.isorder = false
                }else if(this.listOrDetail = 1){
                    this.isorder = false
                    this.ispay = true
                }
            },
            /*物流信息*/
            logictics(list){
                this.$router.push({name:'logistic',query:{id:list.id,type:true}})
            },
            /*订单详情*/
            orderdetail(list){
                this.$router.push({name:'orderDetail',params:{id:list.id},query:{index:this.nowindex}})
                console.log('这个是列表传来的下标'+this.nowindex)
            },
            orderdetailBack(){
                this.isorderDetail = false
            },
            /*从订单详情进入控制支付页面*/
            myOrder(){
                this.isorder = !this.isorder
                this.listOrDetail = 1
            },
            ok(){
                this.isShowModal = false
                getResult('put','/order/v1/order/cancel',{
                    id:this.myId
                })
                    .then(data=>{
                        console.log(data.data)
                        window.location.reload()
                    })
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
                this.refundNo  = list.orderNo
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
                console.log(this.nowindex)
                getResult('post','/order/v1/refund_order',{
                    orderId : this.refundId,
                    reason:this.refundReason[this.selected].text,
                    remark:this.refundText,
                    shouldRefundAmt:this.refundMoney
                })
                    .then(data=>{
                        console.log(data.msg)
                        this.isrefund = false
                        this.btnShow = false
                        console.log(this.nowindex)
                        getResult('get',`/order/v1/order/list/${this.nowindex-1}`)
                            .then(data=>{
                                this.orderList = data.data.list
                                if(this.orderList.length==0){
                                    this.orderlist = true
                                }else {
                                    this.orderlist = false
                                }
                            })
                    })
            },
            selectReason(){
                //console.log('您选择了', this.selected)
            },


            /*上拉加载*/
            uploadData(){
                console.log(this.pageIndex)

                getResult('get',`/order/v1/order/list/${-1}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                    .then(data=>{
                        if(data.data.list.length == 0 && this.orderList.length == 0){
                            this.loading = true
                        }else {
                            if(data.data.list.length == parseInt(this.pageSize) || data.data.list.length < parseInt(this.pageSize)){
                                for(var i=0;i<data.data.list.length;i++){
                                    this.orderList.push(data.data.list[i])
                                }
                                console.log(this.pageIndex)
                                this.loading = false
                            }
                            if(data.data.list.length==0){
                                this.loading = true
                            }
                        }
                    })
            },
            loadMore(){
                this.loading = true
                this.pageIndex++
                this.uploadData()
            }

        },
        mounted(){

            /*
            *判断设备是否连接网络
            */
            // window.addEventListener('online',function () {
            //     this.outLine = false
            //     alert('有网啦')
            // })
            // window.addEventListener('offline',function () {
            //     this.outLine = true
            //     alert('断网啦')
            // })

            //console.log(this.nowindex)
            let height = document.body.clientHeight;
            this.minHeight = (height - 138) + 'px'

            if(this.$route.query.all==0){
                this.nowindex = Number(this.$route.query.all)
                this.myindex = this.nowindex - 1
            }else if(this.$route.query.id){
                this.nowindex = Number(this.$route.query.id) + 1
                this.myindex = this.$route.query.id
            }else if(this.$route.query.index!==undefined){
                this.nowindex = this.$route.query.index
                this.myindex = Number(this.$route.query.index)-1
            }

            //this.nowindex = this.$route.query.all==0?this.$route.query.all:Number(this.$route.query.id) + 1//判断订单点击来源（0：全部订单，1：立即支付，2：待发货，3：待收货，4：已完成）
            //console.log(this.nowindex)
            //console.log('这个是详情页传来的下标'+this.$route.params.numindex)
            // myindex = this.$route.params.numindex===undefined?-1:this.$route.params.numindex-1//判断是从个人中心进入订单列表，还是从订单详情返回订单列表，根据这个值调用订单接口
            //this.nowindex = myindex + 1
            console.log('这个是'+this.nowindex)
            console.log('这个是'+this.myindex)
            // getResult('get',`/order/v1/order/list/${-1}`)
            //     .then(data=>{
            //         console.log(data.data)
            //         data.data.list.forEach((value)=>{
            //             value.countDown1 = ''
            //         })
            //         this.orderList = data.data.list
            //         //console.log(this.orderList)
            //
            //         if(this.orderList !=null && this.orderList.length>0){
            //             this.orderList.forEach((value,index,arr)=>{
            //                 //console.log(value.payExpireTime)
            //                 //value.countDown = '11'
            //                 // this.dountDown(value.sysTime,value.payExpireTime,value)
            //                 if(value.orderStatus != 0) return;
            //                 let myTime = (Date.parse(value.payExpireTime)-Date.parse(value.sysTime))/1000
            //                 let timer = setInterval(()=>{
            //                     myTime--;
            //                     let fen = Math.floor(myTime/60)>9?Math.floor(myTime/60):'0'+Math.floor(myTime/60)
            //                     let miao = Math.round(myTime%60)>9?Math.round(myTime%60):'0'+Math.round(myTime%60)
            //                     value.countDown1 = '00:'+fen+':'+miao
            //                     //value.countDown = 111
            //                     //console.log(typeof value.countDown1)
            //                     if(myTime == 0){
            //                         window.clearInterval(timer)
            //                     }
            //                 },1000)
            //             })
            //         }
            //
            //
            //
            //         if(this.orderList.length==0){
            //             this.orderlist = true
            //         }else {
            //             this.orderlist = false
            //         }
            //     })
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/sass/order.scss";
</style>
