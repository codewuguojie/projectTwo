<template>
    <div class="user" :style="{height:`${height}%`}">
        <div class="top">
            <i @click="goMycenter" class="icon-line-left"></i>
        </div>
        <div class="usermsg">
            <div class="userone" @click="sheetVisible=true">
                <h2 v-if="isName">{{username | star}}</h2>
                <h2 v-if="!isName">{{myname | nameLeth}}</h2>
                <i class="icon-self"><img :src="photo"/></i>
                <input type="file" accept="image/jpg,image/png,image/gif,image/jpeg" @change="fileImage($event)"/>
            </div>
            <div class="userinfo" @click="goSetphone()">
                <span class="infotitle">手机号码</span>
                <div class="right">
                    <span class="infomsg">{{username | star}}</span>
                    <i class="icon-more"></i>
                </div>
            </div>
            <div class="userinfo" @click="goSetemail()">
                <span class="infotitle">邮箱</span>
                <div class="right">
                    <span class="infomsg">{{email}}</span>
                    <i class="icon-more"></i>
                </div>
            </div>
            <div class="userinfo" @click="goNickname()">
                <span class="infotitle">昵称</span>
                <div class="right">
                    <span v-if="isName" class="infomsg">{{username | star}}</span>
                    <span v-if="!isName" class="infomsg">{{myname}}</span>
                    <i class="icon-more"></i>
                </div>
            </div>
            <div class="userinfo" @click="sexShow()">
                <span class="infotitle">性别</span>
                <div class="right">
                    <span class="infomsg">{{sex}}</span>
                    <i class="icon-more"></i>
                </div>
            </div>
        </div>
        <div class="usermsg">
            <div class="userinfo" @click="goAttest()">
                <span class="infotitle">实名认证</span>
                <div class="right">
                    <span class="infomsg">{{isAuthName}}</span>
                    <i class="icon-more"></i>
                </div>
            </div>
            <div class="userinfo" @click="addsShow()">
                <span class="infotitle">所在地区</span>
                <div class="right">
                    <span class="infomsg">{{myAddress}}</span>
                    <i class="icon-more"></i>
                </div>
            </div>
            <div class="userinfo" @click="goAddress()">
                <span class="infotitle">收货地址</span>
                <div class="right"><i class="icon-more"></i></div>
            </div>

        </div>

        <!--选择性别-->
        <mt-popup
            style="width: 100%; height: 180px;"
            v-model="sexshow"
            position="bottom"
        >
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </mt-popup>
        <!--上传头像-->


        <!--选择所在区域-->
        <address-picker :addressShow="addressShow" @ok="ok" @cancel="addressShow=false"></address-picker>
        <!--<mt-popup
            style="width: 100%;"
            v-model="addsshow"
            position="bottom">
        </mt-popup>-->
    </div>
</template>

<script>
    import Vue from 'vue'
    import { getResult,myhost} from "../../api/common";
    import addressPicker from '../test/test'
    import '../../../node_modules/mint-ui/lib/index'
    import '../../../node_modules/mint-ui/lib/style.css'
    import userImg from '../../assets/img/icon_Avatar_1@2x.png'
    import {Picker,Popup,Actionsheet,Toast} from 'mint-ui'
    Vue.component(Picker.name,Picker)
    Vue.component(Popup.name,Popup)
    export default {
        name: "user",
        components:{
            "address-picker":addressPicker,
            Actionsheet
        },
        data(){
            return{
                imgUrl:myhost(),
                photo:userImg,
                fileArr:[],
                feedbackImg:'',
                username:'',
                email:'',
                isName:true,
                myname:'',
                sex:'',
                isAuthName:'未实名认证',
                sexState: 0,
                town:'',//区
                city:'',//市
                province:'',//省
                myAddress:'',
                sexshow:false,
                addressShow:false,
                getproshow:false,
                bottom:'',
                height:'',
                emailState:0,
                slots:[
                    {
                        values:['男','女'],
                        textAlign:'center',
                        defaultIndex:this.sexState
                    }
                ],

            }
        },
        methods:{
            goMycenter(){
                this.$router.push({path:'mycenter'})
            },
            goSetphone(){
                this.$router.push({path:'setphone'})
            },
            goSetemail(){
                this.$router.push({path:`setemail?id=${this.emailState}`})
            },
            goAddress(){
                this.$router.push({path:'location'})
            },
            goNickname(){
                this.$router.push({path:'nickname'})
            },
            goAttest(){
                this.$router.push({path:'attest'})
            },
            sexShow(){
              this.sexshow = !this.sexshow
            },

            fileImage(event){
                let param = new FormData(); //创建form对象
                param.append("file", event.target.files[0]);
                let config = {
                    headers: {
                        "Content-Type": "multipart/form-data;charset=UTF-8",
                        accept: "application/json;charset=UTF-8"
                    }
                };
                if(event.target.files[0].size>1024*1024*5){
                    /*this.errorMessage = '图片大于5M，上传失败，请重新上传'
                    this.toast()*/
                    Toast('图片大于5M，上传失败，请重新上传')
                    return;
                }
                this.fileArr.push(event.target.files[0])
                //console.log(this.fileArr)
                getResult('post','/operate/v1/open/upload',param,config)
                    .then(data=>{
                        console.log(data.data.filePath)
                        if(data.result == 0){
                            Toast('修改成功')
                            // this.feedbackImg = JSON.stringify(data.data)
                            // console.log(this.feedbackImg)
                            // console.log(this.feedbackImg.filePath)
                            this.photo = this.imgUrl + data.data.filePath
                            getResult('put','/user/v1/edit_photo',{
                                photo:data.data.filePath
                            })
                                .then(msg=>{

                                })
                        }
                    })
                    .catch(()=>{
                        /*this.errorMessage = '上传失败，请重新上传'
                        this.toast()*/
                        Toast('上传失败，请重新上传')
                    })
            },

            addsShow(){
                this.addressShow = !this.addressShow
            },
            getproShow(){
                this.getproshow = !this.getproshow
            },
            ok(data){
              console.log(data)
                console.log(data.province)
                console.log(data.city)
                console.log(data.town)
                this.addressShow = false
                getResult('put','/user/v1/edit',{
                    province:data.province,
                    city:data.city,
                    district:data.town
                })
                    .then(data=>{
                    console.log(data.result)
                        getResult('get','/user/v1/one')
                            .then(data=>{
                                this.province = data.data.province
                                this.city = data.data.city
                                this.town = data.data.district
                                if(this.province == null && this.city == null && this.town){
                                    this.myAddress = ''
                                }else {
                                    this.myAddress = this.province+' '+this.city+' '+this.town
                                }
                            })
                })
            },
            onValuesChange(picker, values) {
                /*if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }*/
                //console.log(typeof values[0])
                this.sexState = values[0] === '男'? 1:2
                this.slots.defaultIndex = this.sexState
                //console.log(typeof this.sex)
                console.log("buyaoshuchu")
                if(this.sexshow){
                    getResult('put','/user/v1/edit',{
                        sex:this.sexState
                    })
                        .then(data=>{
                            console.log(data.result)
                            //this.sexshow = false
                            getResult('get','/user/v1/one')
                                .then(data=>{
                                    console.log(data.data)
                                    console.log('性别'+data.data.sex)
                                    if(data.data.sex == 1){
                                        this.sex = '男';
                                        this.sexState == 1
                                    }else if(data.data.sex == 2){
                                        this.sex = '女'
                                        this.sexState == 2
                                    }else {
                                        this.sex = ''
                                    }
                                })
                        })
                }
            },

        },
        mounted(){

            console.log(this.$route.query)

            let h = document.body.clientHeight
            //console.log(h)
            this.bottom = h - 180
            getResult('get','/user/v1/one')
                .then(data=>{
                    console.log(data.data)
                    this.username = data.data.username;
                    if(data.data.photo==null || data.data.photo==''){
                        this.photo = userImg
                    }else {
                        this.photo = this.imgUrl+data.data.photo
                    }
                    this.email = data.data.email== null || data.data.email== ''?'未绑定':data.data.email;

                    if(data.data.nickName==null || data.data.nickName==''){
                        this.isName = true
                    }else {
                        this.isName = false
                        this.myname = data.data.nickName
                    }
                    //console.log(this.email.length)
                    if(data.data.email == "" || data.data.email == null){
                        this.emailState = 0
                    }else {
                        this.emailState = 1
                    }
                    if(data.data.isAuth == 0){
                        this.isAuthName = '未实名认证'
                    }else {
                        this.isAuthName = '已认证'
                    }
                    /*if(data.data.email !== "" && data.data.email.length > 0){
                        this.emailState = 1
                    }*/
                    //console.log(this.emailState)
                    if(data.data.sex == 1){
                        this.sex = '男';
                        this.sexState = 1
                    }else if(data.data.sex == 2){
                        this.sex = '女'
                        this.sexState = 2
                    }else {
                        this.sex = ''
                    }

                    if(data.data.district == null){
                        this.town = ''
                    }else {
                        this.town = data.data.district
                    }
                    if(data.data.city == null){
                        this.city =''
                    }else {
                        this.city = data.data.city;
                    }
                    if(data.data.province == null){
                        this.province = ''
                    }else {
                        this.province = data.data.province;
                    }
                    this.myAddress = this.province+' '+this.city+' '+this.town
                })
        }
    }
</script>

<style scoped lang="scss">
@import "../../assets/sass/user";
</style>
