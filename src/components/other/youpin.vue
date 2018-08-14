<template>
    <div class="help">
        <!-- <div class="top" v-if="from">
            <i @click="goMycenter()" class="icon-line-left"></i>
            <span class="title">帮助中心</span>
        </div> -->
        <!--<iframe src="https://m.laiminet.com/" width="100%" height="100%"  noresize="noresize" frameborder="0" ></iframe>-->
        <iframe src="https://home.mi.com/detail?gid=100568" width="100%" height="100%"  noresize="noresize" frameborder="0" ></iframe>
    </div>
</template>

<script>
    import {getResult} from "../../api/common";

    export default {
        name: "help",
        data(){
            return{
                content:'',
                from:true
            }
        },
        methods:{
            goMycenter(){
                this.$router.push({path:'mycenter'})
            }
        },
        mounted(){
            if(this.$route.query.from !=undefined){
                this.from = false
            }else {
                this.from = true
            }

            getResult('get',`/operate/v1/open/company/${'帮助中心'}`)
                .then(data=>{
                    console.log(data.data)
                    if(data.data != null && data.data.length > 0){
                        this.content = data.data[0].content
                    }
                })
        }
    }
</script>

<style scoped lang="scss">
    .help{
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
            width: 90%;
            margin: 0 5%;
        }
    }
</style>
