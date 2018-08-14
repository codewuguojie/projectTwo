<template>
    <!--物流追踪-->
    <div class="order">
        <div class="logistics">
            <div class="logistics-top">
                <div class="logistics-title">
                    <i @click="myback()" class="icon-line-left"></i>
                    <span>物流详情</span>
                </div>
            </div>
            <div v-if="outCompany" class="logistics-order">
                <dl v-for="item in goodArr.items">
                    <dt v-for="nextItem in item.images"><img :src="staticUrl+nextItem.filePath"/></dt>
                    <dd>
                        <span class="logistics-one">{{'订单号' + ':'+goodArr.orderNo}}</span>
                        <span class="logistics-one">{{'快递公司：'+logisticArr.companyName}}</span>
                        <span class="logistics-one">{{'运单号：'+logisticArr.expressNo}}</span>
                    </dd>
                </dl>
            </div>
            <div v-if="!outdata" class="logistics-detail">
                <div class="firstAddress">
                    <div class="fa-left">111</div>
                    <div class="fa-middle">
                        <p class="circle"></p>
                        <p class="line"></p>
                    </div>
                    <div class="fa-right">{{'[收货地址]'+address}}</div>
                </div>
                <div class="infomation" v-for="info in logistics">
                    <div class="logistics-left">
                        <p class="time">{{info.day}}</p>
                        <p class="day">{{info.time}}</p>
                    </div>
                    <div class="logistics-middle">
                        <p class="circle"><span></span></p>
                        <p class="line"></p>
                    </div>
                    <div class="logistics-right">
                        <p class="logistics-msg">{{info.areaName+'&nbsp;&nbsp;'+ info.desc+'&nbsp;&nbsp;' + info.context}}</p>
                    </div>
                </div>
            </div>
            <div class="msgshow" v-if="outdata">
                <div class="box">
                    <p>暂无物流信息</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getResult,staticUrl} from "../../api/common";

    export default {
        data(){
          return{
              staticUrl:staticUrl(),
              goodArr:{},
              logisticArr:{},
              logistics:{},
              address:'',
              outdata:true,
              outCompany:true
          }
        },
        methods:{
            myback(){
                if(this.$route.query.type){
                    this.$router.push({name:'order',query:{id:this.$route.query.id,all:0}})
                }else {
                    this.$router.push({name:'orderDetail',params:{id:this.$route.query.id},query:{index:this.$route.query.index}})
                }
            },
        },
        mounted(){
            getResult('get',`/order/v1/order/${this.$route.query.id}`)
                .then(data=>{
                    if(data.data != null){
                        this.goodArr = data.data
                        console.log(this.goodArr.items[0].images[0])
                        this.address = this.goodArr.orderAddr
                    }
                })
            getResult('get',`/external/v1/express/${this.$route.query.id}`)
                .then(data=>{
                    console.log(data.msg)
                    if(data.data != null){
                        this.logisticArr = data.data
                        this.logistics = data.data.items
                        data.data.items.forEach(value=>{
                            value.day = ''
                            value.time = ''
                        })
                    }
                    if(this.logistics != null && this.logistics.length > 0){
                        this.logistics.forEach(value=>{
                            let firstArr = value.createTime.split(" ")[0]
                            let lastArr = value.createTime.split(" ")[1]
                            //console.log(typeof firstArr)
                            //console.log(lastArr)
                            value.day = firstArr.slice(5,7) +'月'+ firstArr.slice(8,10) +'日'
                            console.log(value.day)
                            value.time = lastArr.slice(0,5)
                            console.log(lastArr.slice(0,5))
                        })
                    }

                    if(this.logisticArr == null){
                        this.outCompany = false
                    }else {
                        this.outCompany = true
                    }

                    if(this.logistics == null){
                        this.outdata = true
                    }else {
                        this.outdata = false
                    }
                })
            // if(){
            //
            // }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/sass/order.scss";
    .msgshow{
        width: 100%;
        height: 80%;
        position: fixed;
        bottom: 0;
        left: 0;
        .box{
            text-align: center;
            margin: 50% auto;
            img{
                display: block;
                width: 145px;
                height: 100px;
                margin: 0 auto 10px;
            }
            p{
                font-size: 16px;
                color: #61687C;
            }
        }
    }
</style>
