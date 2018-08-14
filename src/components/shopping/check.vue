<template>
    <div class="check">
        <div class="top">
            <div class="topfixed">
                <span class="span1 icon-line-left" @click="goReback()"></span>
                <span class="span2" >确认订单</span>
            </div>
        </div>
        <div class="address">
            <div class="item">
                <!-- 收货地址 -->
                <div v-if="addressObj.isDefault==2 || addressObj.isActive" @click="isShowAddress=true">
                    <div class="title clearfix">
                        <span class="span1">{{addressObj.receiveName}}</span>
                        <span class="span2">{{addressObj.receiveMobile}}</span>
                        <span class="span3" v-if="addressObj.isDefault==2">默认地址</span>
                    </div>
     
                    <div class="address-detail clearfix">
                        <span class="span1 icon-address"></span>
                        <span class="span2">{{addressObj.provinceName+addressObj.cityName+addressObj.address}}</span>
                        <span class="span3 icon-more"></span>
                    </div>
                </div>
                <div v-if="addressList.length>0 && !addressObj.id">
                    <p class="empty">请选择收货地址</p>
                    <p class="empty-btn"><span @click="isShowAddress=true">选择地址</span></p>
                </div>
                <div v-if="addressList.length == 0">
                    <p class="empty">您还没有收货地址哦～</p>
                    <p class="empty-btn"><span @click="goAddress()">添加地址</span></p>
                </div>
                <div class="address-img"><img src="./img/line.png"></div>

                <!-- 订单信息 -->
                <div class="item-info clearfix">
                    <div class="left"><img :src="staticUrl+this.imageUrl" v-if="this.imageUrl"></div>
                    <div class="right">
                        <p class="p1 clearfix">
                            <span class="span1">{{goodsDetail.goodsGroupName}}</span>
                            <span class="span2">￥{{goodsDetail.price|pointsTwo}}</span>
                        </p>
                        <p class="p2 clearfix">
                            <span class="span1"v-for="item in goodsDetail.goodsAttribute"><b>{{item.goodsAttributeName}}</b>：<b>{{item.goodsAttributeSpecName}}</b>&nbsp;&nbsp;</span>

                            <span class="span3">x<b>{{goodsDetail.count}}</b></span>
                        </p>
                    </div>
                </div>
                <div class="item-total">
                    共计<b>{{goodsDetail.count}}</b>件商品，合计<b class="last">￥{{goodsDetail.totalPriece |pointsTwo}}</b>
                </div>
            </div>
        </div>
        <!-- 发票信息 -->
        <div class="bill">
            <div class="title clearfix">
                <span class="left">索要发票</span>
                <!-- <span class="right ">需要&nbsp;&nbsp;<b class="icon-more"></b></span> -->
            </div>
            <div class="tab clearfix">
                <span :class="{'active':isNeed ,'span1':isNeed}" @click="isNeed=!isNeed">不需要发票</span>
                <span :class="{'active':!isNeed }" @click="isNeed=!isNeed">需要发票</span>
            </div>
            <div class="conetents" v-if="!isNeed">
                <div class="types clearfix">
                    <div class="left">发票类别</div>
                    <div class="right">
                        <span :class="{'icon-Selected':isSelf,'icon-unselected':!isSelf }" @click="isSelf=!isSelf">&nbsp;个人&nbsp;&nbsp;</span>
                        <span :class="{'icon-Selected':!isSelf,'icon-unselected':isSelf}" @click="isSelf=!isSelf">&nbsp;公司</span>
                    </div>
                </div>
                <!-- 个人发票 -->
                <div v-if="isSelf">
                    <div class="types clearfix">
                        <div class="left">发票抬头</div>
                        <div class="right">
                            <p class="self">个人</p>
                        </div>
                    </div>
                    <div class="types clearfix">
                        <div class="left">发票内容</div>
                        <div class="right">
                            <p class="self">商品明细</p>
                        </div>
                    </div>
                </div>
                <!-- 公司发票 -->
                <div v-if="!isSelf">
                    <div class="types clearfix">
                        <div class="left">发票抬头</div>
                        <div class="right">
                            <input type="text" placeholder="请输入发票抬头" v-model="billObj.invoiceHead" maxlength="50">
                        </div>
                    </div>
                    <div class="types clearfix">
                        <div class="left">纳税人识别号</div>
                        <div class="right">
                            <input type="text" placeholder="请输入纳税人识别号" v-model="billObj.identifyNo" maxlength="18">
                        </div>
                    </div>
                    <div class="types clearfix">
                        <div class="left">发票内容</div>
                        <div class="right">
                            <p class="self">商品明细</p>
                        </div>
                    </div>
                </div>
                <div class="tips">
                    <p>备注：</p>
                    <p>1. 赠送积分和优惠券抵扣金额不计入发票金额。</p>
                    <p>2.国家税务局规定：自2017年7月1日起，购买方为企业的，索取增值税普通发票时，应向销售方提供纳税人识别号或统一社会信用代码，不符合规定的发票，不得作为税收凭证。</p>
                </div>
               
            </div>
            
        </div> 
         <div class="money clearfix padding1">
            <span class="span1">金额合计：</span>
            <span class="span2">￥{{goodsDetail.totalPriece |pointsTwo}}</span>
        </div>
        <div class="money clearfix padding2" >
            <span class="span1">运费：</span>
            <span class="span2">￥{{goodsDetail.shipCost|pointsTwo}}</span>
        </div>
        <div class="submit-order">
            <span class="span1">应付金额：<b>￥{{goodsDetail.totalPriece|pointsTwo}}</b></span>
            <span class="span2" @click="goPay()">提交订单</span>
        </div>
         <!--收货地址更改弹框  -->
         <div class="fixAddress">
            <mt-popup v-model="isShowAddress" position="bottom" :closeOnClickModal='false'>
                <div class="title clearfix">
                    <span class="left">选择收货地址</span>  
                    <span class="right icon-close2" @click="isShowAddress=false"></span>   
                </div>    
                <div class="item" v-for="item in addressList">
                    <p class="title"><span class="span1">{{item.receiveName}}</span><span class="span2">{{item.receiveMobile}}</span></p>
                    <p class="fix-address clearfix">
                        <span class="span1"><b v-if="item.isDefault==2">[默认]</b>{{item.provinceName+item.cityName+item.address}}</span>
                        <span :class="{'span2 icon-Selected':item.isActive,'span2 icon-unselected':!item.isActive}" @click="changeChose(item)"></span>
                    </p>
                    <p class="fix-edit clearfix">
                        <span class="delete" @click="deleteItem(item.id)">删除</span>
                        <span class="edits" @click="editAddrss(item.id)">修改</span>    
                    </p>
                </div>
               
                <div class="add-address">
                    <span @click="goAddress()">新增收货地址</span>
                </div>
            </mt-popup>
         </div>
         
    </div>
</template>
<script>
import './check.scss'
import {getResult,staticUrl} from'../../api/common'
import { Toast } from 'mint-ui';
export default {
    
    data(){
        return{
            isSelf:true,
            isNeed:true,
            isShowAddress:false,
            goodsDetail:{},
            addressObj:{},
            addressList:[],
            isActive:false,
            billObj:{},
            submitData:{},
            staticUrl:staticUrl(),
            imageUrl:''
        }
    },
    methods:{
        goReback(){
            this.$router.push({name:'reback',params:{id:this.$route.params.id}})
        },
        goAddress(){
            this.$router.push({name:'add',query:{returnUrl:`/check/${this.$route.params.id}?goodsId=${this.$route.query.goodsId}&count=${this.$route.query.count}`}})
        },
        editAddrss(id){
            this.$router.push({name:'editAddress',query:{id:id,returnUrl:`/check/${this.$route.params.id}?goodsId=${this.$route.query.goodsId}&count=${this.$route.query.count}`}})
        },
        getAddress(){
            
            let checkId = this.$route.query.addressId;
            getResult('get','/user/v1/address/list').then((res)=>{
                if(res.result === 0){
                    this.addressList = res.data;
                    this.addressList.forEach((value,index,array)=>{
                        value.isActive = false;
                    })
                    res.data.forEach((value,index,array) => {
                        if( value.isDefault == 2 || value.id===parseInt(checkId)){
                            this.addressObj = value;
                            this.addressObj.isActive = true;
                        }
                    });
                }else{
                    this.addressObj = {};
                    this.addressList =[];
                }
            })
        },
        getDetail(){
            getResult('get',`/goods/v1/open/goods/confirm_order/${this.$route.query.goodsId}/${this.$route.query.count}`).then((res)=>{
                console.log(res);
                if(res.result === 0){
                    this.goodsDetail = res.data;
                    this.imageUrl = this.goodsDetail.image[0].filePath;
                }
            })
        },
        changeChose(item){
            console.log(item.isActive)
            item.isActive=!item.isActive;
            if(item.isActive) {
                this.addressObj = item;
                this.addressList.forEach((value,index,array)=>{
                    if(value.id != item.id){
                        value.isActive=false;
                    }
                })
                this.isShowAddress = false;
            }
            
        },
        
        goPay(){
            console.log(navigator.onLine);
            if (!navigator.onLine) {
                Toast('网络已断开，请打开网络设置');
                return;
            }

            if(!this.addressObj.id){
                Toast('收货地址不能为空，请先添加收货地址');
                return;
            }
            if(!this.isNeed && !this.isSelf && !this.billObj.invoiceHead){
                Toast('请填写发票抬头');
                return;
            };
            if(!this.isNeed && !this.isSelf && !this.billObj.identifyNo){
                Toast('请填写纳税人识别号');
                return;
            };
            this.submitData = {
                goodId:this.$route.query.goodsId,
                invoiceContent:'商品明细',
                isNeed:!this.isNeed ?1:0,         //0不需要，1需要
                number:this.goodsDetail.count, //订购数量
                orderFrom:1, //1订单来源
                userAddressId:this.addressObj.id //用户收货地址id
            }
            
            if(!this.isNeed){
                //发票抬头 invoiceHead:'', 
                //0个人 1公司 invoiceType:1, 
                //纳税人识别号 identifyNo
                if(this.isSelf){
                    this.submitData.invoiceType = 0;
                    this.submitData.invoiceHead = '个人';
                    console.log('个人');
                }else{
                    console.log('公司');
                    this.submitData.invoiceType = 1;
                    this.submitData.invoiceHead = this.billObj.invoiceHead;
                    this.submitData.identifyNo = this.billObj.identifyNo;
                }
            }else{
                this.submitData.invoiceContent ="";
            }
            
            getResult('post','/order/v1/order',this.submitData).then((res)=>{
                console.log(res)
                if(res.result === 0){
                    this.$router.push({name:'pay',params:{id:this.$route.params.id},query:{id:res.data.orderId,goodsId:this.$route.query.goodsId,count:this.$route.query.count}});
                }else{
                    Toast(res.msg);
                }
            })
        },
        deleteItem(id){
            console.log(id);  
            getResult('delete',`/user/v1/delete_address/${id}`).then((res)=>{
                if(res.result === 0){
                    this.getAddress();
                }else{
                    Toast(res.msg);
                }
            })
        }
    },
    mounted(){
        this.getAddress();
        this.getDetail();
    }
}
</script>


