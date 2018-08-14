<template>
<div class="order">
    <div class="orderlist" v-infinite-scroll="loadMore" infinite-scroll-disabled="moreLoading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
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
</div>
</template>

<script>
    export default {
        name: "scroll"
    }
</script>

<style scoped>

</style>
