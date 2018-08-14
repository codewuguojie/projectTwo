<template>
<div class="turnTable">
    <div class="top" v-if="from">
        <i class="icon-line-left" @click="goBack()"></i>
        <span class="title">铼米大转盘</span>
    </div>
    <div v-if="!from" style="width: 100%; height: 10px;"></div>
    <div class="rules">
        <span @click="isshow = true">活动规则</span>
    </div>
    <div class="turnTable-box">
        <div class="banner">
            <div class="turnplate">
                <canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas>
                <img class="pointer" src="../../assets/img/turnplate-pointer.png"  v-on:click="pointer"/>
            </div>
        </div>
    </div>
    <div class="tishi">
        <p class="xiaohao">每转一次消耗100铼米币</p>
        <div class="cishu">您今天还有<span>{{cishu}}</span>次抽奖机会</div>
    </div>
    <v-modal :isShow="isshow" :width="320" @close="isshow=false">
        <div class="modal">
            <h2>活动规则</h2>
            <p class="content">
                1、每转一次消耗100个铼米币，每个账户每日最多可抽奖三次；<br/>
                2、奖励依次为谢谢参与、50个铼米币、100个铼米币、200个铼米币、300个铼米币、500个铼米币；<br/>
                3、活动时间：长期有效；<br/>
                4、若发现作弊行为，铼米有权取消您的获奖资格；<br/>
                5、若有其它疑问请咨询铼米客服:4000-925-008;<br/>
                6、该活动的最终解释权归上海铼米科技有限公司所有;<br/>
                7、本活动与苹果公司无关。
            </p>
            <div class="myBtn" @click="isshow = false">我知道了</div>
        </div>
    </v-modal>
    <v-modal
        :isShow="issuccess" :width="280" @close="issuccess=false"
    >
        <div class="success">
            <img src="../../assets/img/turnTable@2x.png"/>
            <p class="on">{{sorry}}</p>
            <p class="get">{{success}}</p>
            <p class="know" @click="issuccess=false"><span>我知道了</span></p>
        </div>
    </v-modal>
</div>
</template>

<script>
    import lottery from '../base/lottery/lottery'
    import modal from '../base/modal/modal'
    import {getResult} from "../../api/common";
    import {myfun} from '../../assets/js/awardRotate'
    import {Toast} from 'mint-ui'
    import Vue from 'vue'
    import VueCookies from 'vue-cookies'
    Vue.use(VueCookies)

    export default {
        name: "turnTable",
        components:{
            "lottery":lottery,
            "v-modal":modal,
            myfun
        },
        data () {
            return {
                from:true,//是否显示头部
                isLogin:false,//是否登录
                cishu:3,//每日抽奖次数
                myShow:false,//判断抽奖结果是否显示参数
                isshow:false,
                issuccess:false,//抽奖结果显示参数
                toggle:true,
                sorry:'抱歉哦',//抽奖结果头部提示语
                success:'111',//抽奖结果
                myRex: 0,//抽奖条件（钱）
                activityId:1,//接口参数
                canBtn:true,//是否可以点击进行抽奖参数
                msg: '',
                turnplate: {
                    restaraunts: [],//抽奖结果数组
                    colors: [],//转盘北京颜色数组
                    outsideRadius: 192,//大转盘外圆的半径
                    textRadius: 155,//大转盘奖品位置距离圆心的距离
                    insideRadius: 68,//大转盘内圆的半径
                    startAngle: 0,//开始角度
                    bRotate: false//是否让转动
                },
            }
        },
        created () {
            let that = this
            this.$nextTick(() => {
                this.turnplate.restaraunts = [
                    '300个REX',
                    '100个REX',
                    '200个REX',
                    '50个REX',
                    '100个REX',
                    '谢谢参与',
                    '50个REX',
                    '500个REX'
                ]
                this.turnplate.colors = ['#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF', '#FFF4D6', '#FFFFFF']
                this.rotateTimeOut()
                this.rotateFn()
                $(document).ready(function () {
                    // 解决转盘图片不加载
                    that.drawRouletteWheel()
                })
            })
        },
        methods: {
            goBack(){
                window.history.go(-1)
            },

            rotateTimeOut: function () {},
            rotateFn: function (item, txt) {
                var that = this
                var angles = item * (360 / this.turnplate.restaraunts.length) - (360 / (this.turnplate.restaraunts.length * 2))
                if (angles < 270) {
                    angles = 270 - angles
                } else {
                    angles = 360 - angles + 270
                }
                var bRotateT = this.turnplate.bRotate
                this.$nextTick(() => {
                    $('#wheelcanvas').stopRotate()
                    $('#wheelcanvas').rotate({
                        angle: 0,
                        animateTo: angles + 1800,
                        duration: 3000,
                        callback: function () {
                            that.canBtn = true
                            if(txt === '谢谢参与'){
                                that.sorry = '抱歉哦'
                                that.success = '您没有获得铼米币'
                            }else {
                                that.sorry = '恭喜你'
                                that.success = '获得'+txt
                            }
                            if(that.myShow){
                                that.issuccess = true
                            }else {
                                that.issuccess = false
                            }
                            //Toast({message: txt, position: 'middle'})
                            console.log(that.issuccess)
                            if (bRotateT) {
                                bRotateT = false
                            } else {
                                bRotateT = true
                            }
                        }
                    })
                })
                this.turnplate.bRotate = bRotateT
            },
            pointer () {
                //if (this.turnplate.bRotate) return
                //this.turnplate.bRotate = true

                if(this.myRex < 100){
                    this.turnplate.bRotate = false
                    Toast('您的铼米币不足')
                    return
                }else {
                    this.turnplate.bRotate = true
                }

                if(this.cishu == 0 || this.cishu < 0){
                    this.turnplate.bRotate = false
                    Toast('今日3次抽奖，已用完')
                    return
                }else {
                    this.turnplate.bRotate = true
                }

                if(!this.canBtn){
                    return
                }
                this.canBtn = false

                this.turnplate.bRotate = !this.turnplate.bRotate
                // 获取随机数(奖品个数范围内)
                getResult('post','/activity/v1/luck',{
                    activityId:1
                })
                    .then(msg=>{
                        console.log(msg.data)
                        if(msg.result == 0){
                            if(this.cishu == 0 || this.cishu < 0 ){
                                this.myShow = false
                                this.turnplate.bRotate = false
                            }else {
                                this.myShow = true
                                this.turnplate.bRotate = true
                                this.cishu-=1
                                let item = parseInt(msg.data.prizeLv)
                                this.rotateFn(item, this.turnplate.restaraunts[item - 1])
                            }
                        }else {
                            this.turnplate.bRotate = false
                            this.myShow = false
                            Toast(msg.msg)
                        }
                    })
                // var item = Math.floor(Math.random() * (this.turnplate.restaraunts.length - 1 + 1) + 1)
                // 奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]

            },
            drawRouletteWheel () {
                var canvas = document.getElementById('wheelcanvas')
                if (canvas.getContext) {
                    // 根据奖品个数计算圆周角度
                    var arc = Math.PI / (this.turnplate.restaraunts.length / 2)
                    var ctx = canvas.getContext('2d')
                    // 在给定矩形内清空一个矩形
                    ctx.clearRect(0, 0, 422, 422)
                    // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                    ctx.strokeStyle = '#FFBE04'
                    // font 属性设置或返回画布上文本内容的当前字体属性
                    ctx.font = '16px Microsoft YaHei'
                    for (var i = 0; i < this.turnplate.restaraunts.length; i++) {
                        var angle = this.turnplate.startAngle + i * arc
                        ctx.fillStyle = this.turnplate.colors[i]
                        ctx.beginPath()
                        //  arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                        ctx.arc(211, 211, this.turnplate.outsideRadius, angle, angle + arc, false)
                        ctx.arc(211, 211, this.turnplate.insideRadius, angle + arc, angle, true)
                        ctx.stroke()
                        ctx.fill()
                        // 锁画布(为了保存之前的画布状态)
                        ctx.save()

                        // ----绘制奖品开始----
                        ctx.fillStyle = '#E5302F'
                        var text = this.turnplate.restaraunts[i]
                        var lineHeight = 17
                        // translate方法重新映射画布上的 (0,0) 位置
                        ctx.translate(211 + Math.cos(angle + arc / 2) * this.turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * this.turnplate.textRadius)

                        // rotate方法旋转当前的绘图
                        ctx.rotate(angle + arc / 2 + Math.PI / 2)

                        /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                        if (text.indexOf('个') > 0) { // 流量包
                            var texts = text.split('个')
                            for (var j = 0; j < texts.length; j++) {
                                ctx.font = j === 0 ? 'bold 20px Microsoft YaHei' : '16px Microsoft YaHei'
                                if (j === 0) {
                                    ctx.fillText(texts[j] + '个', -ctx.measureText(texts[j] + '个').width / 2, j * lineHeight)
                                } else {
                                    ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * lineHeight)
                                }
                            }
                        } else if (text.indexOf('个') === -1 && text.length > 6) { // 奖品名称长度超过一定范围
                            text = text.substring(0, 6) + '||' + text.substring(6)
                            var textst = text.split('||')
                            for (var ji = 0; ji < textst.length; ji++) {
                                ctx.fillText(textst[ji], -ctx.measureText(textst[ji]).width / 2, ji * lineHeight)
                            }
                        } else {
                            // 在画布上绘制填色的文本。文本的默认颜色是黑色
                            // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                            ctx.fillText(text, -ctx.measureText(text).width / 2, 0)
                        }
                        // 把当前画布返回（调整）到上一个save()状态之前
                        ctx.restore()
                        // 绘制奖品结束
                    }
                }
            }
        },
        mounted(){
            //判断是否需要页面头部
            if(this.$route.query.from !=undefined){
                this.from = false
            }else {
                this.from = true
            }
            //app登录获取并设置用户信息
            let getCookie = this.$route.query.session_token
            if(getCookie){
                this.$cookies.set('JSESSIONID',getCookie)
            }

            getResult('get','/user/v1/one')
                .then(msg=>{
                    if(msg.result == 0){
                        this.isLogin = true
                        getResult('get','/rex/v1/rex/user_account')
                            .then(msg=>{
                                console.log(msg.data)
                                if(msg.result == 0){
                                    this.myRex = msg.data.amount
                                    getResult('get',`/activity/v1/luck/count/${this.activityId=1}`)
                                        .then(msg=>{
                                            if(msg.result == 0){
                                                this.cishu = msg.data
                                            }
                                        })
                                }
                            })
                    }else {
                        this.isLogin = false
                    }
                })
        }
    }
</script>

<style scoped lang="scss">
.turnTable{
    width: 100%;
    height: 100%;
    min-height: 667px;
    background: url("../../assets/img/turnplateBg.png") no-repeat;
    background-size: 100% 100%;
    .top{
        width: 100%;
        height: 44px;
        font-size: 18px;
        color: #393A3F;
        line-height: 45px;
        background: #fff;
        margin-bottom: 10px;
        i{
            margin-left: 5%;
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
    .rules{
        width: 100%;
        height: 30px;
        margin: 25px 0 120px 0;
        span{
            display: block;
            float: right;
            width: 80px;
            height: 100%;
            line-height: 30px;
            text-align: center;
            border-radius: 15px 0 0 15px;
            background: #FD592D;
            color: #fff;
            font-size: 14px;
        }
    }
    .turnTable-box{
        width: 90%;
        margin: 0 auto;
        .banner{display:block;width:95%;margin-left:auto;margin-right:auto;margin-bottom: 20px;}
        .banner .turnplate{display:block;width:100%;position:relative;background-image:url(../../assets/img/turnplate-bg.png);background-size:100% 100%;}
        .banner .turnplate canvas.item{width:100%;}
        .banner .turnplate img.pointer{position:absolute;width:31.5%;height:42.5%;left:34.5%;top:23%;}
    }
    .tishi{
        width: 100%;
        .xiaohao{
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #9FA3B0;
            margin-bottom: 10px;
        }
        .cishu{
            width: 100%;
            text-align: center;
            font-size: 16px;
            color: #fff;
            span{
                color: #fd592d;
            }
        }
    }
    .modal{
        h2{
            width: 100%;
            text-align: center;
            font-size: 16px;
            color: #000;
            font-weight: 600;
            margin: 20px 0;
        }
        .content{
            width: 90%;
            margin: 0 auto 30px;
            color: #393A3F;
            font-size: 14px;
        }
        .myBtn{
            width: 220px;
            height: 44px;
            margin: 30px auto 20px;
            background: #fd592d;
            border-radius: 22px;
            color: #fff;
            font-size: 16px;
            line-height: 44px;
            text-align: center;
        }
    }
    .success{
        width: 100%;
        height: 370px;
        background: rgb(0,0,0);
        position: relative;
        /*background: url("../../assets/img/turnTable@2x.png") no-repeat;
        background-size: 100%;*/
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
        p{
            position: absolute;
            width: 100%;
            height: 44px;
            line-height: 44px;
            text-align: center;
        }
        .on{
            top: 0;
            left: 0;
            font-size: 24px;
            color: rgba(0,0,0,0.26);
        }
        .yes{
            color: #fff;
        }
        .get{
            top: 210px;
            left: 0;
            font-size: 20px;
            color: #61687C;
        }
        .know{
            top: 280px;
            left: 0;
            span{
                display: block;
                width: 220px;
                height: 44px;
                font-size: 16px;
                color: #fff;
                border-radius: 22px;
                line-height: 44px;
                text-align: center;
                background: orangered;
                margin: 0 auto;
            }
        }
    }
}
</style>





