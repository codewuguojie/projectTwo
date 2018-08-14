<template>
    <div class="collect">
        <div class="top">
            <i @click="goMycenter()" class="icon-line-left"></i>
            <span class="title">我的收藏</span>
        </div>

        <!--空页面-->
        <div class="empty" v-if="listShow && !outLine">
            <div class="empty-box">
                <img src="./img/img_content.png"/>
                <p>没有内容，去首页看看？</p>
                <button @click="goHome()">去看看</button>
            </div>
        </div>

        <div class="content" v-if="!listShow && !outLine">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li v-for="item in listArr" @click="goDetail(item)">
                    <div class="list-top" v-if="item.projectType===1 || item.projectType===0">
                        <span class="product-state-two" :class="{productStateOne:item.status ==3,productStateThree:item.status ==1}">{{status[item.status - 1]}}</span>
                        <span class="product-plan" v-if="item.status==3 || item.status==2"><b class="word">剩余天数</b><b class="other">{{item.remainDays+'天'}}</b></span>
                    </div>
                    <dl v-if="item.projectType===1">
                        <dt v-for="myimage in item.listImage"><img :src="myhost+myimage.filePath"/></dt>
                        <dd>
                            <p class="protitle">{{item.projectName | wordLeth}}</p>
                            <p class="prodescribe">{{item.productBrief | wordLeth}}</p>
                            <p class="promoney">
                                <span class="big">{{item.targetAmt}}</span>
                                <span class="small">万</span>
                            </p>
                            <p class="proform">
                                <span class="yellow">{{financeType[item.financeType]}}</span>
                                <span class="blue">{{atStage[item.atStage]}}</span>
                            </p>
                            <p class="proadd">
                                <i class="icon-address"></i>
                                <span class="proaddress">{{item.address}}</span>
                                <span class="prodate">{{item.createTime | jiequ}}</span>
                            </p>
                        </dd>
                    </dl>
                    <dl v-if="item.projectType===0">
                        <dt v-for="myimage in item.listImage"><img :src="myhost+myimage.filePath"/></dt>
                        <dd>
                            <p class="protitle">{{item.projectName | wordLeth}}</p>
                            <p class="prodescribe">{{item.productBrief | wordLeth}}</p>
                            <p class="prochou">
                                <span class="sum">已筹到<b class="money">{{'￥'+item.raisedAmt}}</b></span>
                                <span class="orange"><v-progress :percent="item.currentProgress"></v-progress></span>
                            </p>
                            <p class="promsg">
                                <span class="propercent">
                                    <b class="number">{{item.currentProgress+'%'}}</b>
                                    <b class="text">当前进度</b>
                                </span>
                                <span class="prodate">
                                    <b class="number">{{item.supportNum }}</b>
                                    <b class="text">支持人数</b>
                                </span>
                            </p>
                        </dd>
                    </dl>
                    <dl v-if="item.projectType===2">
                        <dt v-for="myimage in item.listImage"><img :src="myhost+myimage.filePath"/></dt>
                        <dd>
                            <p class="protitle">{{item.projectName | wordLeth}}</p>
                            <p class="prodescribe">{{item.productBrief | wordLeth}}</p>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>

        <!--无网络状态显示页面-->
        <div class="outLine" v-if="outLine">
            <div class="content">
                <img src="./img/img_network.png"/>
                <h3>您的网络好像出现了问题</h3>
                <span @click="myReload()">重新加载</span>
            </div>
        </div>

    </div>
</template>

<script>

    import progress from "@/components/base/progressbar/ProgressBar";
    import {getResult,staticUrl} from "../../api/common";

    export default {
        name: "collect",
        data(){
          return{
              myhost:staticUrl(),
              type:0,
              financeType:[
                  '股权融资',
                  '债券融资'
              ],
              atStage:[
                  '种子期',
                  '天使轮',
                  'A轮',
                  'A+轮',
                  'B轮',
                  'C轮',
                  'D轮',
                  'IOP',
                  '上市',
              ],
              listArr:[],
              status:[
                  '未开始',
                  '进行中',
                  '已完成'
              ],//表示项目状态
              listShow:false,
              /*分页相关数据*/
              pageIndex:0,
              pageSize:'10',
              loading:false,
              outLine:false
          }
        },
        components:{
            "v-progress": progress,
        },
        methods:{
            goMycenter(){
                this.$router.push({path:'mycenter'})
            },
            goDetail(item){
                if(item.projectType === 0){ //0众筹，1股权
                    this.$router.push({ name: "detailzc",params:{id:item.id}});
                }else{
                    this.$router.push({ name: "detailfa",params:{id:item.id}});
                }
            },
            goHome(){
                this.$router.push({name:'home'})
            },
            /*上拉加载*/
            uploadData(){
                console.log(this.pageIndex)

                getResult('get',`/group/v1/collection/list/${this.type}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
                    .then(data=>{
                        if(data.data != null){
                            if(data.data.list.length == 0 && this.listArr.length == 0){
                                console.log(wu)
                                this.loading = true
                            }else {
                                if(data.data.list.length == parseInt(this.pageSize) || data.data.list.length < parseInt(this.pageSize)){
                                    for(var i=0;i<data.data.list.length;i++){
                                        this.listArr.push(data.data.list[i])
                                    }
                                    console.log(this.pageIndex)
                                    console.log(this.listArr)
                                    this.loading = false
                                }
                                if(data.data.list.length==0){
                                    this.loading = true
                                }
                            }
                        }
                    })
            },
            loadMore(){
                this.loading = true
                this.pageIndex++
                this.uploadData()
            },
            myReload(){
                window.location.reload()
            }
        },
        mounted(){
            getResult('get',`/group/v1/collection/list/${this.type}`)
                .then(data=>{
                    if(data.data === null){
                        this.listShow = true
                    }else {
                        this.listShow = false
                    }
                })
        }
    }
</script>

<style scoped lang="scss">
.collect{
    width: 100%;
    height: 100%;
    background: #f8f8f8;
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
    .empty{
        width: 100%;
        height: 100%;
        .empty-box{
            width: 100%;
            margin: 50% auto;
            text-align: center;
            img{
                display: block;
                width: 145px;
                height: 100px;
                margin: 0 auto 20px;
            }
            p{
                font-size: 14px;
                color: #61687C;
                margin-bottom: 25px;
            }
            button{
                width: 110px;
                height: 34px;
                border: 0;
                border-radius: 17px;
                color: #fff;
                background: -webkit-linear-gradient(left, #218CF7, #25BEF2); /* Safari 5.1 - 6.0 */
                background: -o-linear-gradient(left, #218CF7, #25BEF2); /* Opera 11.1 - 12.0 */
                background: -moz-linear-gradient(left, #218CF7, #25BEF2); /* Firefox 3.6 - 15 */
                background: linear-gradient(left, #218CF7, #25BEF2); /* 标准的语法 */
            }
        }
    }
    .content{
        width: 100%;
        ul{
            width: 100%;
            li{
                width: 100%;
                background: #fff;
                overflow: hidden;
                margin-bottom: 10px;
                .list-top{
                    width: 90%;
                    height: 22px;
                    margin: 15px auto 10px;
                    .product-state-two{
                        float: left;
                        width: 44px;
                        height: 100%;
                        line-height: 22px;
                        font-size: 12px;
                        text-align: center;
                        color: #FB6B38;
                        font-weight: bold;
                        background: rgba(250,102,51,0.1);
                    }
                    .productStateOne{
                        float: left;
                        width: 44px;
                        height: 100%;
                        line-height: 22px;
                        font-size: 12px;
                        text-align: center;
                        color: #218CF7;
                        font-weight: bold;
                        background: rgba(5,142,244,0.1);
                    }
                    .productStateThree{
                        float: left;
                        width: 44px;
                        height: 100%;
                        line-height: 22px;
                        font-size: 12px;
                        text-align: center;
                        color: #61687C;
                        font-weight: bold;
                        background: rgba(170,173,184,0.1);
                    }
                    .product-plan{
                        float: right;
                        line-height: 22px;
                        font-size: 12px;
                        .word{
                            color: #9FA3B0;
                        }
                        .other{
                            color: #FB6B38;
                        }
                    }
                }
                dl{
                    width: 90%;
                    height: 130px;
                    margin: 10px auto 10px;
                    dt{
                        float: left;
                        width: 130px;
                        height: 130px;
                        margin-right: 5px;
                        img{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                    dd{
                        float: left;
                        width: 60%;
                        height: 100%;
                        p{
                            width: 100%;
                        }
                        .protitle{
                            font-size: 14px;
                            color: #393A3F;
                            font-weight: bold;
                            margin-bottom: 10px;
                        }
                        .prodescribe{
                            font-size: 12px;
                            color: #9FA3B0;
                            margin-bottom: 10px;
                        }
                        .promoney{
                            color: #FB6B38;
                            margin-bottom: 10px;
                            .big{
                                font-size: 18px;
                            }
                            .small{
                                font-size: 12px;
                            }
                        }
                        .proform{
                            font-size: 12px;
                            margin-bottom: 10px;
                            .yellow{
                                padding: 3px 6px;
                                color: #FB6B38;
                                background: rgba(250,102,51,0.1);
                                margin-right: 5px;
                            }
                            .blue{
                                padding: 3px 6px;
                                color: #218CF7;
                                background: rgba(5,142,244,0.1);
                            }
                            .sum{
                                color: #FB6B38;
                                font-size: 12px;
                                margin-bottom: 11px;
                                .money{
                                    font-size: 18px;
                                }
                            }
                            .orange{
                                width: 100%;
                                .progress{
                                    display: inline-block;
                                }
                            }
                        }
                        .prochou{
                            margin-bottom: 10px;
                            .sum{
                                color: #FB6B38;
                                font-size: 12px;
                                margin-bottom: 11px;
                                .money{
                                    font-size: 18px;
                                }
                            }
                        }
                        .proadd{
                            color: #9FA3B0;
                        }
                        .promsg{
                            overflow: hidden;
                            b{
                                display: block;
                            }
                            .propercent{
                                float: left;
                            }
                            .prodate{
                                float: right;
                                text-align: right;
                            }
                        }
                    }
                }
            }
        }
    }
    .outLine{
        width: 100%;
        height: 91.9%;
        position: relative;
        .content{
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 158px;
            height: 200px;
            img {
                display: block;
                width: 144px;
                height: 98px;
                margin: 0 auto;
            }
            h3{
                margin-top: 20px;
                font-size: 14px;
                text-align: center;
                color: #61687C;
            }
            span{
                display: block;
                width: 70px;
                height: 30px;
                background: #218CF7;
                color: #fff;
                text-align: center;
                line-height: 30px;
                border-radius: 15px;
                margin: 10px auto 0;
            }
        }
    }
}
</style>
