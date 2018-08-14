<template>
    <div class="account">
        <div class="head">
            <div class="topTitle">
                <span class="span1 icon-line-left" @click="goHome()"></span>
                <span class="text">我的钱包</span>
            </div>
            <div class="topTitle2">
                <span class="span1">余额（REX）</span>
                <!-- <span class="text" @click="giveOthers()">赠送好友REX<b class="icon-more"></b></span> -->
            </div>
            <div class="topTitle3">{{this.accountObj.amount |toThousands}}</div>
            <div class="topTitle4">
                <span class="span1">昨日收益 +{{this.accountObj.yesterdayAmount|toThousands}}</span>
                <span class="span2">累计收益 +{{this.accountObj.income |toThousands}}</span>
            </div>
            <div class="topTitle6 clearfix">
                <span class="span1" @click="giveOthers(1)">赠送好友REX</span>
                <span class="span2" @click="giveOthers(2)">第三方数字钱包</span>
            </div>
        </div>
        <div class="contents" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
            <div class="contents-title clearfix" >
                <span class="span1"></span>
                <span class="span2">交易记录</span>
            </div>
            <div class="records">
                <div class="records-lists clearfix" v-for="item in recordsList">
                    <div class="left">
                        <p class="top">{{item.type.substring(5,10)}}</p>
                        <p class="bottom">{{item.type.substring(0,4)}}</p>
                    </div>
                    <div class="right">
                        <div class="texts clearfix" v-for="item2 in item.arr">
                            <div class="left1">
                                <p class="top1">{{item2.sourceName}}</p>
                                <p class="bottom1">{{item2.createTime}}</p>
                            </div>
                            <div :class="{'right1':(item2.type === 2),'right1 textActive':(item2.type === 1)}"><b v-if="item2.type === 1">+</b><b v-if="item2.type === 2">-</b>{{item2.amount}}REX</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-modal title="模态框" :isShow="isShow" :width="270" @close="isShow=false">
            <div class="modal-body">
                <p class="texts">温馨提示</p>
                <p class="tips">使用赠送和我的第三方数字钱包功能必须要进行实名认证！</p>
                <p class="btns">
                    <span class="span1" @click="isShow=false">取消</span>
                    <span class="span2" @click="goName()">去实名认证</span>
                </p>
            </div>
        </v-modal>
    </div>
</template>
<script>
import './account.scss'
import modal from'@/components/base/modal/modal'
import {getResult} from '../../api/common.js'
export default {
    components:{
        "v-modal":modal
    },
    data(){
        return{
            accountObj:{},
            recordsList:[],
            isShow:false,
            pageIndex:1,
            pageSize:10,
            count:10,
            loading:false,
            outLine:false,
            isOnline:navigator.onLine,
            recordsData:[]
        }
    },
    methods:{
        giveOthers(type){
            getResult('get','/user/v1/one').then((res)=>{
                if(res.result === 0){ //isAuthName:0 未实名，1已实名
                    if(res.data.isAuth ===1){
                        
                        if(type === 1){
                            this.$router.push({name:'present'})
                        }else{
                            this.$router.push({name:'three'})
                        }

                    }else{
                        this.isShow = true;
                        // this.$router.push({name:'authName'})
                    }
                }
            })

        },
        goThree(){
            this.$router.push({name:'three'})
        },
        goHome(){
            this.$router.push({name:'mycenter'})
        },
        giveThree(){
            this.$router.push({name:'three'})
        },
        goName(){
            this.$router.push({name:'authName'})
        },
        getDetail(){
            getResult('get',`/rex/v1/rex/user_account`).then((res)=>{
                if(res.result === 0){
                    this.accountObj = res.data;
                }
            })
        },
        loadMore() {
            if(this.pageIndex >(this.count/10)+1 ){
                return;
            }
            console.log(this.pageIndex);
            this.loading = true;
            getResult('get',`/rex/v1/rex/rex_trading_record?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then((res)=>{
                if(res.result === 0){
                    this.recordsList = [];
                    res.data.list.forEach((value,index,arr)=>{
                        this.recordsData.push(value);
                    })
                    let temp = {};
                    let newArr = [];
                    this.recordsData.forEach((value,index,arr) => {
                        value.types = value.createTime.split(' ')[0];
                    });
                    this.recordsData.forEach((value,index,arr) => {
                        temp[value.types] = []
                    });
                    this.recordsData.forEach((value,index,arr) => {
                        temp[value.types].push(value);
                    });
                    for(var key in temp){
                        this.recordsList.push({type:key,arr:temp[key]})
                    }
                    this.count = res.data.count;
                    this.pageIndex++;
                    this.loading = false;
                    console.log(this.recordsList);
                }
            })
        },

    },
    mounted(){
        this.getDetail();
        this.loadMore();
    },
    destroyed() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },

}
</script>

















