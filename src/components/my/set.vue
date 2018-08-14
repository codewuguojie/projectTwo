<template>
    <div class="set">
        <div class="top">
            <i @click="goMycenter()" class="icon-line-left"></i>
            <span class="title">设置</span>
        </div>
        <div class="content">
            <ul v-if="isshow" class="outlogin">
                <li @click="goUs()">
                    <span class="settitle">关于我们</span>
                    <i class="icon-more"></i>
                </li>
            </ul>
            <ul v-if="!isshow" class="onlogin">
                <li @click="goAltercode()">
                    <span class="settitle">修改密码</span>
                    <i class="icon-more"></i>
                </li>
                <li @click="goUs()">
                    <span class="settitle">关于我们</span>
                    <i class="icon-more"></i>
                </li>
            </ul>
        </div>
        <v-modal :isShow="myBtn" :width="200" @close="myBtn=false">
            <div class="info-box">
                <h2>提示</h2>
                <p>确定要退出登录？</p>
                <div class="btn-box">
                    <span @click="myBtn=false">取消</span>
                    <span @click="goLoginout()">确定</span>
                </div>
            </div>
        </v-modal>
        <button v-if="btnShow" @click="myBtn=true">退出登录</button>
    </div>
</template>

<script>
    import { getResult} from "../../api/common";
    import modal from '@/components/base/modal/modal'

    export default {
        name: "set",
        components:{
          "v-modal":modal
        },
        data(){
            return{
                isshow:true,
                myBtn:false,
                btnShow:false
            }
        },
        methods:{
            goMycenter(){
                this.$router.push({path:'mycenter'})
            },
            goUs(){
                this.$router.push({path:'us'})
            },
            goAltercode(){
                this.$router.push({path:'altercode'})
            },
            goLoginout(){
                getResult('post','/user/v1/logout')
                    .then(data=>{
                        console.log("退出")
                        this.$router.push({path:'mycenter'})
                    })
            }
        },
        mounted(){
            getResult('get','/user/v1/curruser')
                .then(data=>{
                    console.log(data.data)
                    if(data.result == 0){
                        this.isshow = !this.isshow
                        this.btnShow = true
                    }
                })
        }
    }
</script>

<style scoped lang="scss">
    .set{
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
            background: #fff;
            margin-bottom: 50px;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    height: 70px;
                    line-height: 70px;
                    span{
                        float: left;
                        padding-left: 15px;
                        font-size: 15px;
                        color: #393A3F;
                    }
                    b,i{
                        float: right;
                        padding-right: 15px;
                        line-height: 70px;
                        vertical-align: text-top;
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
        button{
            width: 100%;
            height: 60px;
            border: 0;
            color: #393A3F;
            font-size: 16px;
            font-weight: 600;
            margin: 0 auto;
            display: block;
            background: #fff;
        }
    }
</style>
