<template>
    <!--修改收货地址-->
        <div class="amend">
            <div class="top" @click="togModify()">
                <i class="icon-line-left"></i>
                <span class="title">{{title}}</span>
            </div>
            <div class="content">
                <div class="cont-one">
                    <p class="pagetitle">收件人</p>
                    <input v-model="myname" type="text" class="pagemsg" maxlength="20"/>
                </div>
                <div class="cont-three">
                    <p class="pagetitle">手机号</p>
                    <input v-model="myphone" type="text" class="pagemsg"/>
                </div>
                <div class="cont-two">
                    <p class="pagetitle">省市区</p>
                    <div class="pagebox">
                        <h2 class="pagemsg">{{ssq}}</h2>
                        <span @click="changesddress()">请选择<i class="icon-more"></i></span>
                    </div>
                </div>
                <div class="cont-four">
                    <p class="pagetitle">详细地址</p>
                    <textarea v-model="myaddress" type="text" maxlength="50"></textarea>
                </div>
                <div class="cont-five">
                    <p class="pagetitle">设置默认地址</p>
                    <mt-switch class="switch" v-model="value" @change="turn()"></mt-switch>
                </div>
                <address-picker :addressShow="addressShow" @ok="ok" @cancel="addressShow=false"></address-picker>
            </div>
            <div class="bottom">
                <button @click="mybtn()">保存</button>
            </div>
        </div>
</template>
<script>
    import {getResult} from "../../api/common";
    import addressPicker from '../test/test'
    import {Toast} from 'mint-ui'

    export default {
        components:{
            "address-picker":addressPicker
        },
    data(){
      return{
          addressShow:false,
          value:false,
          title:'修改收货地址',
          state:'',
          province:'',
          city:'',
          town:'',
          username:'',
          userphone:'',
          ssq:'',
          addressDetail:'',
          myname:'',
          myphone:'',
          myaddress:'',
          default:1
      }
    },
    methods:{
        toast(){
            Toast({
                message: this.errorMessage,
                position: 'center',
                duration: 1000
            });
        },
        turn(){
            console.log(this.value)
            this.default = this.value?2:1
        },
        togModify(){
            this.$router.push({path:'location'})
        },
        changesddress(){
            this.addressShow = !this.addressShow
        },
        ok(data){
            this.province = data.province
            this.city = data.city
            this.town = data.town
            this.addressShow = false
            this.ssq = this.province+this.city+this.town
        },
        mybtn(){
            console.log(this.myname)
            let reg_phone = /^[1][3,4,5,7,8][0-9]{9}$/;
            let usersite = this.province+this.city+this.town;
            let name =  /^[\u4E00-\u9FA5A-Za-z]+$/;//汉字跟英文
            let pattern = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;//除去这些特殊字符


            if(!this.myname){
                this.errorMessage = '请填写收货人姓名'
                this.toast()
                return true;
            }
            if(!name.test(this.myname)){
                this.errorMessage = '您输入的收件人信息不规范，请重新输入'
                this.toast()
                return true
            }
            if(!this.myphone){
                this.errorMessage = '请填写收货人手机号'
                this.toast()
                return true
            }
            if(!reg_phone.test(this.myphone)){
                this.errorMessage = '请填写正确的手机号'
                this.toast()
                return true;
            }
            if(this.ssq == ''){
                this.errorMessage = '请选择地址'
                this.toast()
                return true;
            }
            if(!this.myaddress){
                this.errorMessage = '请填写详细地址'
                this.toast()
                return true;
            }
            if(!pattern.test(this.myaddress)){
                this.errorMessage = '您输入的详细地址信息含有特殊字符，请重新输入'
                this.toast()
                return true
            }
            getResult('put','/user/v1/edit_address',{
                receiveName:this.myname,
                receiveMobile:this.myphone,
                provinceName:this.province,
                cityName:this.city,
                districtName:this.town,
                address:this.myaddress,
                id:this.$route.query.id,
                provinceId:0,
                cityId:0,
                districtId:0,
                isDefault:this.default
            })
                .then(data=>{
                    if(data.result === 0){
                        if(this.$route.query.returnUrl){
                            console.log(data.data);
                            window.location.href=`${this.$route.query.returnUrl}&addressId=${data.data}`;
                        }else{
                            this.$router.push({path:'location'})
                        }
                    }
                })
        }
    },
    mounted(){
        console.log(this.$route.query.id)
        getResult('get',`/user/v1/address/one/${this.$route.query.id}`)
            .then(data=>{
                console.log(data.data)
                this.myname = data.data.receiveName
                this.myphone = data.data.receiveMobile
                this.province = data.data.provinceName
                this.city = data.data.cityName
                this.town = data.data.districtName
                this.ssq = data.data.provinceName+data.data.cityName+data.data.districtName
                this.myaddress = data.data.address
                this.value = data.data.isDefault == 1?false:true
                if(this.value){
                    this.default = 2
                }else{
                    this.default = 1
                }
            })
    }
}
</script>

<style lang="scss">
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
</style>

