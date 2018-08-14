<template>
<div class="first">
    <v-header></v-header>
    <div v-if="outLine" class="content">
        <div class="outlist">
            <img src="./img/img_network.png"/>
            <p>您的网络好像出现了问题</p>
            <p><span class="down"@click="goDownload()">重新加载<b class="icon-close"></b></span></p>
        </div>
    </div>
    <div class="content" v-if="!outLine">
        <ul>
            <li v-for="(item,index) in items" @click="goProduct(index)">
                <img :src="item"/>
            </li>
        </ul>
    </div>
    <v-footer></v-footer>
</div>
</template>

<script>
    import header from "@/components/base/header/header";
    import footer from "@/components/base/footer/footer";
    import imgOne from '../../assets/img/bg_Find_allCopy@2x.png'
    import imgTwo from '../../assets/img/bg_Find_foodCopy@2x.png'
    import imgThree from '../../assets/img/bg_Find_productCopy@2x.png'
    import imgFour from '../../assets/img/bg_Find_educationCopy@2x.png'
    import imgFive from '../../assets/img/bg_Find_cultureCopy@2x.png'
    import imgSix from '../../assets/img/bg_Find_travelCopy@2x.png'

    export default {
        name: "first",
        components:{
            "v-header": header,
            "v-footer": footer,
        },
        data(){
            return{
                outLine:false,
                items:[
                    imgOne,
                    imgTwo,
                    imgThree,
                    imgFour,
                    imgFive,
                    imgSix
                ],
                getIndex:-1
            }
        },
        methods:{
            goProduct(index){
                if(index == 0){
                    this.getIndex = -1
                }
                if(index == 1){
                    this.getIndex = 0
                }
                if(index == 2){
                    this.getIndex = 3
                }
                if(index == 3){
                    this.getIndex = 2
                }
                if(index == 4){
                    this.getIndex = 1
                }
                if(index == 5){
                    this.getIndex = 4
                }
                // switch (index){
                //     case 0:this.getIndex = -1;break;
                //     case 1:this.getIndex = 0;break;
                //     case 2:this.getIndex = 3;break;
                //     case 3:this.getIndex = 2;break;
                //     case 4:this.getIndex = 1;break;
                //     case 5:this.getIndex = 4;break;
                // }
                this.$router.push({path:'productList',query:{index:index,myIndex:this.getIndex}})
            }
        },
        mounted(){
            window.addEventListener("offline", (e)=> {this.outLine=true})
            window.addEventListener("online", (e)=> {this.outLine=false})
        },
    }
</script>

<style scoped lang="scss">
.first{
    width: 100%;
    background: #222222;
    .content {
        width: 100%;
        height: 92%;
        padding-bottom: 45px;
        background: #444444;

        .outlist {
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 158px;
            height: 150px;
            img {
                display: block;
                width: 144px;
                height: 98px;
                margin: 0 auto;
            }
            p {
                margin-top: 20px;
                font-size: 14px;
                text-align: center;
                color: #61687C;
                span.down{
                    display: inline-block;
                    width: 86px;
                    height: 30px;
                    font-size: 14px;
                    color: #ffffff;
                    line-height: 31px;
                    text-align: center;
                    background-image: linear-gradient(-90deg, #218CF7 0%, #25BEF2 100%);
                    border-radius: 24px;
                }
            }
        }
        ul{
            width: 94%;
            overflow: hidden;
            padding: 10px 3%;
            li{
                width: 165px;
                height: 220px;
                margin: 0 0 10px 8px;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
        }
    }
}
</style>
