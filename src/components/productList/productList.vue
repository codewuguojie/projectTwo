<template>
    <div class="productList">
        <!--订单列表-->
        <div class="box">
            <div class="top"><i @click="goBack()" class="icon-line-left"></i></div>
            <div class="nav">
                <h1>项目列表</h1>
                <ul>
                    <li v-for="(item,index) in items" @click="tab(index)" ><p :class="{'active':index == nowindex}">{{item}}</p></li>
                </ul>
            </div>
            <!--没有数据展示页面-->
            <div v-if="orderlist && !outLine" class="content">
                <div class="outlist">
                    <img src="./img/img_order.png"/>
                    <p>您还没有相关订单呢</p>
                </div>
                <!--<div class="outlist" v-if="nowindex===1">
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
                </div>-->
            </div>
            <!--没有网络展示页面-->
            <div v-if="outLine" class="content">
                <div class="outlist" v-if="nowindex===0">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                    <span>重新加载</span>
                </div>
                <!--<div class="outlist" v-if="nowindex===1">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                    <span>重新加载</span>
                </div>
                <div class="outlist" v-if="nowindex===2">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                    <span>重新加载</span>
                </div>
                <div class="outlist" v-if="nowindex===3">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                    <span>重新加载</span>
                </div>
                <div class="outlist" v-if="nowindex===4">
                    <img src="./img/img_network.png"/>
                    <p>您的网络好像出现了问题</p>
                    <span>重新加载</span>
                </div>-->
            </div>

            <div class="list-show" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <div class="product-box" v-for="item in orderList" @click="goDetail(item)">
                    <div class="pro-top" v-if="item.projectType==0 || item.projectType==1">
                        <p v-if="item.status==2" class="pro-stateOne">进行中</p>
                        <p v-if="item.status==3" class="pro-stateTwo">已完成</p>
                        <p v-if="item.status==1" class="pro-stateThree">未开始</p>
                        <p class="pro-day">剩余天数<span>{{item.remainDays}}</span></p>
                    </div>
                    <div style="width: 100%; height: 20px;" v-if="item.projectType==2"></div>
                    <!--众筹项目-->
                    <div class="pro-describe" v-if="item.projectType==0">
                        <dl v-for="img in item.listImage">
                            <dt><img :src="imgUrl+img.filePath"/></dt>
                            <dd>
                                <p class="pro-title">{{item.projectName | wordLeth}}</p>
                                <p class="pro-text">{{item.productBrief | wordLeth}}</p>
                                <p class="pro-progress">已筹到<span>￥{{item.raisedAmt }}</span></p>
                                <p class="money-progress">
                                    <v-progress :percent="item.currentProgress "></v-progress>
                                </p>
                                <div class="pro-show">
                                    <p class="pro-left">
                                        <span class="num">{{item.currentProgress }}%</span>
                                        <span class="num-text">当前进度</span>
                                    </p>
                                    <p class="pro-right">
                                        <span class="num">{{item.supportNum }}人</span>
                                        <span class="num-text">支持人数</span>
                                    </p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <!--股权项目-->
                    <div class="pro-describe" v-if="item.projectType==1">
                        <dl v-for="img in item.listImage">
                            <dt><img :src="imgUrl+img.filePath"/></dt>
                            <dd>
                                <p class="pro-title">{{item.projectName | wordLeth}}</p>
                                <p class="pro-text">{{item.productBrief | wordLeth}}</p>
                                <p class="pro-progress">已筹到<span>￥{{item.raisedAmt }}</span></p>
                                <p class="money-progress">
                                    <v-progress :percent="item.currentProgress "></v-progress>
                                </p>
                                <div class="pro-show">
                                    <p class="pro-left">
                                        <span class="num">{{item.currentProgress }}%</span>
                                        <span class="num-text">当前进度</span>
                                    </p>
                                    <p class="pro-right">
                                        <span class="num">{{item.supportNum }}人</span>
                                        <span class="num-text">支持人数</span>
                                    </p>
                                </div>
                            </dd>
                        </dl>
                    </div>
                    <!--第三方项目-->
                    <div class="pro-describe" v-if="item.projectType==2">
                        <dl v-for="img in item.listImage">
                            <dt><img :src="imgUrl+img.filePath"/></dt>
                            <dd>
                                <p class="pro-title">{{item.projectName | wordLeth}}</p>
                                <p class="pro-text">{{item.productBrief | wordLeth}}</p>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import {getResult,staticUrl,myhost,hostUrl} from "../../api/common";
    import progress from "@/components/base/progressbar/ProgressBar";
    export default {
        name: "productList",
        components:{
            "v-progress": progress,
        },
        data(){
            return{
                imgUrl:myhost(),
                outLine:false,//判断是否连接网络
                nowindex: 0,

                orderList:[],
                orderlist:false,
                staticUrl:staticUrl(),
                /*下拉加载相关的参数*/
                numIndex:this.$route.query.myIndex,
                pageIndex:0,
                pageSize:'10',
                loading:false,
                items:[
                    '全部',
                    '美食',
                    '产品',
                    '教育',
                    '文娱',
                    '旅行'
                ],
            }
        },
        methods:{
            goBack(){
              window.history.go(-1)
            },
            goDetail(item){
                //this.$router.push({name:'detailzc',params:{id:item.id}})
                if(item.projectUrl == null){
                    window.location.href=`${hostUrl}/detailzc/${item.id}`
                    //this.$router.push({ name: "test",query:{id:item.id,type:item.projectType}});
                }else {
                    window.location.href=`${hostUrl}/tpos/?indexUrl=${item.projectUrl}`
                    //this.$router.push({name:'tpos',query:{indexUrl:item.projectUrl}})
                }
            },
            tab(index){
                this.nowindex = index
                if(index == 0){
                    this.numIndex = -1
                }
                if(index == 1){
                    this.numIndex = 0
                }
                if(index == 2){
                    this.numIndex = 3
                }
                if(index == 3){
                    this.numIndex = 2
                }
                if(index == 4){
                    this.numIndex = 1
                }
                if(index == 5){
                    this.numIndex = 4
                }
                this.orderList = []
                this.pageIndex='1'
                this.pageSize='10'
                this.uploadData()
            },


            /*上拉加载*/
            uploadData(){
                console.log(this.numIndex)

                getResult('get',`/group/v1/open/project/list/${this.numIndex}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                    .then(data=>{
                        if(data.data.list.length == 0 && this.orderList.length == 0){
                            this.loading = true
                        }else {
                            if(data.data.list.length == parseInt(this.pageSize) || data.data.list.length < parseInt(this.pageSize)){
                                for(var i=0;i<data.data.list.length;i++){
                                    this.orderList.push(data.data.list[i])
                                }
                                //console.log(this.pageIndex)
                                this.loading = false
                            }
                            if(data.data.list.length==0){
                                this.loading = true
                            }
                        }
                        if(this.orderList.length==0){
                            this.orderlist = true
                        }else {
                            this.orderlist = false
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
            this.loadMore()
            this.nowindex = this.$route.query.index
            this.numIndex = this.$route.query.myIndex
            console.log(this.numIndex)
            /*
            *判断设备是否连接网络
            */
            window.addEventListener("offline", (e)=> {this.outLine=true})
            window.addEventListener("online", (e)=> {this.outLine=false})

            let height = document.body.clientHeight;
            this.minHeight = (height - 138) + 'px'



        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/sass/productList";
</style>
