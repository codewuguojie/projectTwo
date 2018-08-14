<template>
    <div class="address">
        <!--收货地址列表-->
        <div class="address-box" v-if="isaddress && !isadd">
            <div class="top">
                <i @click="goUser()" class="icon-line-left"></i>
                <span class="title">收货地址</span>
            </div>
            <div class="content">
                <div class="address-list" v-for="(item,index) in items" :key="item.id">
                    <p class="user">
                        <span class="username">{{item.receiveName | wordLeth}}</span>
                        <span class="userphone">{{item.receiveMobile}}</span>
                    </p>
                    <p class="useraddress">
                        <span class="default" v-if="item.isDefault==2" style="color: #fc9660;">[默认] </span>
                        <b class="addressdetail">{{item.provinceName+item.cityName+item.districtName+item.address | strLeth}}</b>
                    </p>
                    <p class="useroperation">
                        <span class="delete" @click="modifyAddress(index)">修改</span>
                        <span class="modificate" @click="deleteAddress(index)">删除</span>
                    </p>
                </div>
            </div>

            <v-modal :isShow="myBtn" :width="200" @close="myBtn=false">
                <div class="info-box">
                    <h2>提示</h2>
                    <p>确定删除该地址？</p>
                    <div class="btn-box">
                        <span @click="myBtn=false">取消</span>
                        <span @click="goLoginout()">确定</span>
                    </div>
                </div>
            </v-modal>

            <div class="bottom">
                <button @click="addAddress()">新增收货地址</button>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { getResult, hostUrl} from "../../api/common";
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import modal from '@/components/base/modal/modal'
    import {Switch,Toast} from 'mint-ui'

    Vue.component(Switch.name,Switch)
    export default {
        components:{
            "v-modal":modal
        },
        data(){
            return{
                isaddress:true,
                value:false,
                isadd:false,
                state:false,
                items:[],
                isdefault:false,
                myBtn:false,
                myIndex:''
            }
        },
        methods:{
            goUser(){
                this.$router.push({path:'user'})
            },
            togModify(){
                this.isaddress = !this.isaddress
            },
            togAdd(){
              this.isadd = !this.isadd
            },
            modifyAddress(index){
                this.$router.push({path:`editAddress?id=${this.items[index].id}`})
            },
            addAddress(){
                this.$router.push({path:'add'})
            },
            turn(){
                console.log(this.value)
            },
            goLoginout(){
                getResult('delete',`/user/v1/delete_address/${this.myIndex}`)
                    .then(data=>{
                        if(data.result==0){
                            this.myBtn = true
                            getResult('get','/user/v1/address/list')
                                .then(data=>{
                                    //console.log(data.data)
                                    this.items = data.data
                                    Toast('删除成功')
                                    this.myBtn = false
                                })
                        }
                    })
            },
            deleteAddress(index){
                console.log(index)
                this.myIndex = this.items[index].id
                if(this.items[index].isDefault == 2){
                    this.myBtn = false
                    Toast('默认地址不可删除')
                }else {
                    this.myBtn = true
                }
            }
        },
        mounted(){
            getResult('get','/user/v1/address/list')
                .then(data=>{
                    console.log(data.data)
                    this.items = data.data

                })
        }
    }
</script>

<style scoped lang="scss">
    .address{
        width: 100%;
        background: #f8f8f8;
        .address-box{
            width: 100%;
            .top{
                width: 100%;
                height: 44px;
                font-size: 18px;
                color: #393A3F;
                line-height: 45px;
                background: #fff;
                margin-bottom: 10px;
                i{
                    margin-left: 15px;
                    vertical-align: text-top;
                }
                span{
                    float: left;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    margin-top: -44px;
                    font-weight: bold;
                }
            }
            .content{
                width: 100%;
                padding-bottom: 50px;
                .address-list{
                    width: 100%;
                    height: 130px;
                    background: #fff;
                    margin-bottom: 10px;
                    overflow: hidden;
                    p{
                        width: 90%;
                        margin: 0 5% 0 5%;
                    }
                    .user{
                        margin-top: 20px;
                        margin-bottom: 6px;
                        .username{
                            margin-right: 20px;
                            font-size: 15px;
                            color: #393A3F;
                        }
                        .userphone{
                            font-size: 12px;
                            color: #9FA3B0;
                        }
                    }
                    .useraddress{
                        font-size: 12px;
                        color: #61687C;
                        margin-bottom: 20px;
                        line-height: 20px;
                    }
                    .useroperation{
                        span{
                            float: right;
                        }
                        .delete{
                            margin-left: 40px;
                            color: #218CF7;
                        }
                        .modificate{
                            color: #61687C;
                        }
                    }
                }
            }
            .info-box{
                height: 100px;
                padding: 0 15px;
                h2{
                    padding: 10px 0 5px;
                    font-weight: 600;
                }
                p{
                    padding-bottom: 15px;
                }
                .btn-box{
                    text-align: right;
                    color: #218CF7;
                    span:nth-child(1){
                        margin-right: 25px;
                    }
                }
            }
            .bottom{
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 50px;
                background: #fff;
                overflow: hidden;
                button{
                    width: 92%;
                    height: 36px;
                    display: block;
                    margin: 7px auto;
                    border: 0;
                    border-radius: 18px;
                    font-size: 15px;
                    color: #fff;
                    background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                    background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
                }
            }
        }
        /*修改收货地址*/
        .amend{
            width: 100%;
            height: 100%;
            .top{
                width: 100%;
                height: 44px;
                font-size: 18px;
                color: #393A3F;
                line-height: 45px;
                background: #fff;
                margin-bottom: 10px;
                i{
                    margin-left: 15px;
                    vertical-align: text-top;
                }
                span{
                    float: left;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    margin-top: -44px;
                    font-weight: bold;
                }
            }
            .content{
                width: 100%;
                background: #fff;
                overflow: hidden;
                .cont-one{
                    width: 90%;
                    margin: 10px 5% 10px 5%;
                    height: 50px;
                    .pagetitle{
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                    }
                    .pagemsg{
                        font-size: 14px;
                        color: #393A3F;
                        font-weight: bold;
                        height: 20px;
                        width: 100%;
                        border: 0;
                        &::placeholder{
                            font-size: 14px;
                            color: #9FA3B0;
                            font-weight: 100;
                        }
                    }
                }
                .cont-three{
                    width: 90%;
                    margin: 0 5% 10px 5%;
                    height: 50px;
                    .pagetitle{
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                    }
                    .pagemsg{
                        font-size: 14px;
                        color: #393A3F;
                        font-weight: bold;
                        height: 20px;
                        width: 100%;
                        border: 0;
                        &::placeholder{
                            font-size: 14px;
                            color: #9FA3B0;
                            font-weight: 100;
                        }
                    }
                }
                .cont-two{
                    width: 90%;
                    height: 50px;
                    margin: 0 5% 10px 5%;
                    .pagetitle{
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                    }
                    .pagebox{
                        width: 100%;
                        .pagemsg{
                            float: left;
                            font-size: 15px;
                            color: #393A3F;
                            font-weight: bold;
                        }
                        span{
                            float: right;
                            font-size: 12px;
                            color: #9FA3B0;
                            i{
                                margin-left: 20px;
                                vertical-align: text-top;
                                &:before{
                                    color: #9FA3B0;
                                }
                            }
                        }
                    }
                }
                .cont-four{
                    width: 90%;
                    height: 70px;
                    margin: 0 5% 0 5%;
                    .pagetitle{
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                    }
                    textarea{
                        display: block;
                        width: 100%;
                        height: 40px;
                        border: 0;
                        font-size: 14px;
                        resize: none;
                        color: #393A3F;
                        font-weight: bold;
                        &::placeholder{
                            color: #9FA3B0;
                            font-weight: 100;
                        }
                    }
                }
                .cont-five{
                    width: 90%;
                    height: 35px;
                    margin: 0 5% 0 5%;
                    .pagetitle{
                        float: left;
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                        line-height: 35px;
                    }
                    .switch{
                        float: right;
                        vertical-align: middle;
                    }
                }
            }
            .bottom{
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 50px;
                background: #fff;
                overflow: hidden;
                button{
                    width: 92%;
                    height: 36px;
                    display: block;
                    margin: 7px auto;
                    border: 0;
                    border-radius: 18px;
                    font-size: 15px;
                    color: #fff;
                    background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                    background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
                }
            }
        }
        /*新增收货地址*/
        .add{
            width: 100%;
            height: 100%;
            .top{
                width: 100%;
                height: 44px;
                font-size: 18px;
                color: #393A3F;
                line-height: 45px;
                background: #fff;
                margin-bottom: 10px;
                i{
                    margin-left: 15px;
                    vertical-align: text-top;
                }
                span{
                    float: left;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    margin-top: -44px;
                    font-weight: bold;
                }
            }
            .content{
                width: 100%;
                background: #fff;
                overflow: hidden;
                .cont-one{
                    width: 90%;
                    margin: 10px 5% 10px 5%;
                    height: 50px;
                    .pagetitle{
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                    }
                    .pagemsg{
                        font-size: 14px;
                        color: #393A3F;
                        font-weight: bold;
                        height: 20px;
                        width: 100%;
                        border: 0;
                        &::placeholder{
                            font-size: 14px;
                            color: #9FA3B0;
                            font-weight: 100;
                        }
                    }
                }
                .cont-three{
                    width: 90%;
                    margin: 0 5% 10px 5%;
                    height: 50px;
                    .pagetitle{
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                    }
                    .pagemsg{
                        font-size: 14px;
                        color: #393A3F;
                        font-weight: bold;
                        height: 20px;
                        width: 100%;
                        border: 0;
                        &::placeholder{
                            font-size: 14px;
                            color: #9FA3B0;
                            font-weight: 100;
                        }
                    }
                }
                .cont-two{
                    width: 90%;
                    height: 50px;
                    margin: 0 5% 10px 5%;
                    .pagetitle{
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                    }
                    .pagebox{
                        width: 100%;
                        .pagemsg{
                            float: left;
                            font-size: 15px;
                            color: #393A3F;
                            font-weight: bold;
                        }
                        span{
                            float: right;
                            font-size: 12px;
                            color: #9FA3B0;
                            i{
                                margin-left: 20px;
                                vertical-align: text-top;
                                &:before{
                                    color: #9FA3B0;
                                }
                            }
                        }
                    }
                }
                .cont-four{
                    width: 90%;
                    height: 70px;
                    margin: 0 5% 0 5%;
                    .pagetitle{
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                    }
                    textarea{
                        display: block;
                        width: 100%;
                        height: 40px;
                        border: 0;
                        resize: none;
                        font-size: 14px;
                        color: #393A3F;
                        font-weight: bold;
                        &::placeholder{
                            color: #9FA3B0;
                            font-weight: 100;
                        }
                    }
                }
                .cont-five{
                    width: 90%;
                    height: 35px;
                    margin: 0 5% 0 5%;
                    .pagetitle{
                        float: left;
                        font-size: 12px;
                        color: #393A3F;
                        margin-bottom: 5px;
                        line-height: 35px;
                    }
                    .switch{
                        float: right;
                        vertical-align: middle;
                    }
                }
            }
            .bottom{
                position: fixed;
                bottom: 0;
                width: 100%;
                height: 50px;
                background: #fff;
                overflow: hidden;
                button{
                    width: 92%;
                    height: 36px;
                    display: block;
                    margin: 7px auto;
                    border: 0;
                    border-radius: 18px;
                    font-size: 15px;
                    color: #fff;
                    background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                    background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                    background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                    background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
                }
            }
        }
    }
</style>
