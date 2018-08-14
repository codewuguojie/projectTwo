<template>
    <div class="mycenter">
        <!--个人中心-->
        <div class="top">
            <div class="top-top">
                <div class="top-right">
                    <span :class="{signIn:btnShow,signIned:!btnShow}" @click="goSignIn()">{{text}}</span>
                    <i @click="goSet()"><img src="../../assets/img/bar_Setting@2x.png"/></i>
                </div>
            </div>
            <div class="top-bottom">
                <div class="left">
                    <i><img class="imgOne" :src="touxiang"/><img class="imgTwo" :src="starImg"/></i>
                    <span><b class="login" v-if="isshow" @click="goLogin()">登录 /</b><b class="register" v-if="isshow" @click="goRegister()"> 注册</b><b class="usermsg"  v-if="!isshow && !isName">{{username | star}}</b><b class="usermsg" v-if="!isshow && isName">{{myname | nameLeth}}</b></span>
                </div>
                <div class="right">
                    <i @click="goUser()" class="icon-mores"></i>
                </div>
            </div>
        </div>

        <div class="middle" >
            <div v-if="logined" class="m-top">
                <div class="rex">
                    <div class="rex-left">
                        <div class="rexHead">余额(REX)</div>
                        <div class="rexMoeny" @click="goPurchase()">{{amount}}</div>
                    </div>
                    <div class="rex-right" @click="goRules()">获币规则</div>
                </div>
                <div class="earn">
                    <span class="yesterday">昨日收益&nbsp;{{yesterdayAmount}}</span>
                    <span class="total">累计收益&nbsp;{{income}}</span>
                </div>
            </div>
            <!-- <div class="m-bottom" @click="goInvite()">
                <div class="invite">
                    <img src="../../assets/img/ing_invite@2x.png"/>
                    <i class="icon-more"></i>
                </div>
            </div> -->
        </div>

        <div class="bottom">
            <div class="msg" @click="goOrder()">
                <p class="title"><img src="../../assets/img/icon_Order@2x.png"/>我的订单</p>
                <span>全部订单<i class="icon-more"></i></span>
            </div>
            <!--<div class="ordermsg">
                <ul>
                    <li class="li-left" v-for="(item,index) in items" @click="checkOrder(index)">
                        <dl>
                            <dt><img :src="item.list[1]"/></dt>
                            <dd>{{item.list[0]}}</dd>
                        </dl>
                    </li>
                </ul>
            </div>-->
            <div class="msg" @click="goPurchase()">
                <p class="title"><img src="../../assets/img/icon_wallet@2x.png"/>我的钱包</p>
                <span><i class="icon-more"></i></span>
            </div>
            <div class="msg" @click="goCollect()">
                <p class="title"><img src="../../assets/img/icon_Collection@2x.png"/>我的收藏</p>
                <span><i class="icon-more"></i></span>
            </div>
            <div class="msg" @click="goHelp()">
                <p class="title"><img src="../../assets/img/icon_help@2x.png"/>帮助中心</p>
                <span><i class="icon-more"></i></span>
            </div>
            <div class="msg" @click="goOpinion()">
                <p class="title"><img src="../../assets/img/icon_Feedback@2x.png"/>意见反馈</p>
                <span><i class="icon-more"></i></span>
            </div>
            <div class="msg" @click="goContact()">
                <p class="title"><img src="../../assets/img/icon_contact@2x.png"/>联系我们</p>
                <span><i class="icon-more"></i></span>
            </div>
            <!--<div class="msg" @click="goCopy()">
                <p class="title">客服邮箱</p>
                <span>service@laiminet.com<i class="icon-more"></i></span>
            </div>-->
            <div class="msg">
                <b>&copy;{{new Date().getFullYear()}}&nbsp;上海铼米科技有限公司</b>
            </div>
        </div>

        <div class="drag" ref="moveDiv" @touchmove.prevent
             @mousedown="down" @touchstart="down"
             @mousemove="move" @touchmove="move"
             @mouseup="end" @touchend="end"
             @click="goTurntable()"
        >
            <img class="img_Turntable" src="../../assets/img/img_Turntable@2x.png"/>
        </div>

        <!--底部导航栏-->
        <v-footer class="footer"></v-footer>
    </div>
</template>

<script>
    import {getResult,toThousands,myhost} from "../../api/common";
    import footer from '../base/footer/footer'
    import imgOne from '../../assets/img/icon_Pending_payment.png'
    import imgTwo from '../../assets/img/icon_Delivery.png'
    import imgThree from '../../assets/img/icon_Inbound.png'
    import imgFour from '../../assets/img/icon_completed.png'
    import onImg from '../../assets/img/icon_Avatar_1@2x.png'
    import outImg from '../../assets/img/icon_Avatar_2@2x.png'
    import onStar from '../../assets/img/Group 9 Copy 5@2x.png'
    import outStar from '../../assets/img/Group 9 Copy 3@2x.png'
    export default {
        name: "mycenter",
        components:{
            "v-footer":footer
        },
        data(){
            return{
                imgUrl:myhost(),
                isshow:true,
                username:'',
                minHeight:'',
                isName:true,
                myname:'',
                id:'',
                amount:0,
                yesterdayAmount:0,
                income:0,
                items:[
                    {list:['待付款',imgOne]},
                    {list:['待发货',imgTwo]},
                    {list:['待收货',imgThree]},
                    {list:['已完成',imgFour]}
                ],
                logined:false,
                touxiang:outImg,
                starImg:outStar,
                text:'签到',
                btnShow:true,
                isAuthName:false,
                //拖动元素的相关数据
                flags: false,
                position: {
                    x: 0,
                    y: 0
                },
                nx: '',
                ny: '',
                dx: '',
                dy: '',
                xPum: '',
                yPum: ''

            }
        },
        methods: {
            goLogin() {
                this.$router.push({path: 'login'})
            },
            goRegister() {
                this.$router.push({path: 'register'})
            },
            goSignIn() {
                if (this.logined) {
                    this.$router.push({path: 'signIn'})
                } else {
                    this.$router.push({path: 'login'})
                }
            },
            goRules(){
                this.$router.push({path:'rexRule'})
            },
            goUser() {
                if (this.logined) {
                    this.$router.push({path: 'user'})
                } else {
                    this.$router.push({path: 'login'})
                }
            },
            goSet() {
                this.$router.push({path: 'set'})
            },
            goHelp() {
                this.$router.push({path: 'help'})
            },
            /*goInvite() {
                if (this.logined) {
                    this.$router.push({path: `invite?phone=${this.username}`})
                } else {
                    this.$router.push({path: 'login'})
                }
            },*/
            goOpinion() {
                this.$router.push({path: 'opinion'})
            },
            goCollect() {
                if (this.logined) {
                    this.$router.push({path: 'collect'})
                } else {
                    this.$router.push({path: 'login'})
                }
            },
            goContact() {
                this.$router.push({path: 'contactUs'})
            },
            goOrder() {
                if (this.logined) {
                    this.$router.push({path: 'order?all=0'})
                } else {
                    this.$router.push({path: 'login'})
                }
            },
            checkOrder(index) {
                this.id = index
                console.log(this.id)
                if (this.logined) {
                    this.$router.push({path: `order?id=${this.id}`})
                } else {
                    this.$router.push({path: 'login'})
                }
            },
            goCopy() {
                document.execCommand("Copy");
            },
            //拖动元素的相关函数
            goTurntable(){
                if (this.logined) {
                    this.$router.push({path: 'turnTable'})
                } else {
                    this.$router.push({path: 'login'})
                }
            },
            goPurchase(){
                if (this.logined) {
                    this.$router.push({name:'account'})
                } else {
                    this.$router.push({path: 'login'})
                }
            },
            down() {
                this.flags = true
                let touch
                if (event.touches) {
                    touch = event.touches[0]
                } else {
                    touch = event
                }
                this.position.x = touch.clientX
                this.position.y = touch.clientY
                this.dx = this.$refs.moveDiv.offsetLeft
                this.dy = this.$refs.moveDiv.offsetTop
            },
            move() {
                if (this.flags) {
                    let touch
                    if (event.touches) {
                        touch = event.touches[0]
                    } else {
                        touch = event
                    }

                    this.nx = touch.clientX - this.position.x
                    this.ny = touch.clientY - this.position.y
                    this.xPum = this.dx + this.nx
                    this.yPum = this.dy + this.ny
                    if (this.xPum <= 0) {
                        this.xPum = 0
                    }
                    if (this.xPum >= document.body.clientWidth - 100) {
                        this.xPum = document.body.clientWidth - 100
                    }
                    if (this.yPum <= 0) {
                        this.yPum = 0
                    }
                    if (this.yPum >= document.body.clientHeight - 100) {
                        this.yPum = document.body.clientHeight - 100
                    }
                    this.$refs.moveDiv.style.left = this.xPum + 'px'// 横坐标
                    this.$refs.moveDiv.style.top = this.yPum + 'px'// 纵坐标
                    // console.log(this.$refs.moveDiv.style.left)
                    // console.log(this.$refs.moveDiv.style.top)
                    // 阻止页面的滑动默认事件
                    // document.addEventListener('touchmove', function (event) {
                    //   if (event.cancelable) {
                    //     // 判断默认行为是否已经被禁用
                    //     if (!event.defaultPrevented) {
                    //       event.preventDefault()
                    //     }
                    //   }
                    // }, false)
                }


            },
            end () {
                this.flags = false
            }
        },
        mounted(){
            console.log(this.isshow)


            let height = document.body.clientHeight;
            console.log(height)
            this.minHeight = (height - 250) + 'px'
            console.log(this.minHeight)
            getResult('get','/user/v1/one')
                .then(data=>{
                    if(data.result == 0){
                        console.log(111)
                        this.logined = true
                        this.isshow = !this.isshow
                        this.username = data.data.username
                        if(data.data.photo != null && data.data.photo != ''){
                            this.touxiang = this.imgUrl + data.data.photo
                        }else {
                            this.touxiang = onImg
                        }

                        if(data.data.nickName==null || data.data.nickName==''){
                            this.isName = false
                            console.log('没有名字')
                        }else {
                            this.isName = true
                            console.log('有名字')
                            this.myname = data.data.nickName
                        }

                    }else {
                        console.log(222)
                    }

                    if(data.data.isAuth == 1){
                        this.starImg = onStar
                    }

                })

            getResult('get','/activity/v1/sign')
                .then(msg=>{
                    if(msg.result == 0){
                        if(msg.data.currSign == 1){
                            this.text = '已签到'
                            this.btnShow = false
                        }else {
                            this.text = '签到'
                            this.btnShow = true
                        }
                    }
                })


            getResult('get','/rex/v1/rex/user_account')
                .then(msg=>{
                    console.log(msg.data)
                    if(msg.result == 0){

                        if(msg.data.amount>0){
                            this.amount = toThousands(msg.data.amount)
                        }else {
                            this.amount = toThousands(0)
                        }
                        if(msg.data.yesterdayAmount>0 || msg.data.yesterdayAmount==0){
                            this.yesterdayAmount = '+' + toThousands(msg.data.yesterdayAmount)
                        }else {
                            this.yesterdayAmount = '+' + toThousands(msg.data.yesterdayAmount)
                        }
                        if(msg.data.income>0){
                            this.income = '+' + toThousands(msg.data.income)
                        }else {
                            this.income = '+' + toThousands(msg.data.income)
                        }

                    }
                })

        }
    }
</script>

<style scoped lang="scss">
@import "../../assets/sass/mycenter.scss";
.mycenter{
    width: 100%;
    .drag{
        width: 92px;
        height: 92px;
        color: #fff;
        text-align: center;
        line-height: 100px;
        font-size: 30px;
        position: fixed;
        right: 15px;
        bottom: 100px;
        .img_Turntable{
            display: block;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
