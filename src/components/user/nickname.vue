<template>
    <div class="nickname">
        <div class="top">
            <i @click="goBack()" class="icon-line-left"></i>
            <span class="title">修改昵称</span>
            <b @click="changeName()">保存</b>
        </div>
        <div class="altername">
            <input type="text" v-model="altername" placeholder="输入您的新昵称"/>
        </div>
    </div>
</template>

<script>
    import {getResult} from "../../api/common";
    import {Toast} from 'mint-ui'

    export default {
        name: "nickname",
        data(){
            return{
                altername:''
            }
        },
        methods:{
            goBack(){
                window.history.go(-1)
            },
            check(){
                let nameReg = /^[\u4e00-\u9fa5a-zA-Z0-9_-]$/
                if(!this.altername){
                    Toast('请先填写新昵称')
                    return false
                }
                if(this.altername.length<2){
                    Toast('输入的新昵称字符不得少于2')
                    return false
                }

                if(!nameReg.test(this.altername)){
                    Toast('输入的新昵称不符合规范')
                    return false
                }
                if(this.altername.length>16){
                    Toast('输入的新昵称字符不得大于16')
                    return false
                }
                return true;
            },
            changeName(){
                if(!this.check()) return;
                this.altername = this.altername.replace(/\s/ig,'')
                getResult('put','/user/v1/edit_nickname',{
                    nickname:this.altername
                })
                    .then(msg=>{
                        if(msg.result == 0){
                            Toast('修改成功')
                            this.$router.push({path:'user'})
                        }else {
                            Toast(msg.msg)
                        }
                    })
            }
        },
        mounted(){
            getResult('get','/user/v1/one')
                .then(data=>{
                    console.log(data.data)
                    if(data.result == 0){
                        if(data.data.nickName == null || data.data.nickName == ''){
                            this.altername = data.data.username
                        }else {
                            this.altername = data.data.nickName
                        }
                    }else {
                        Toast(data.msg)
                    }
                })
        }
    }
</script>

<style scoped lang="scss">
.nickname{
    width: 100%;
    height: 100%;
    background: #fff;
    .top{
        width: 100%;
        height: 44px;
        font-size: 18px;
        color: #393A3F;
        line-height: 45px;
        background: #fff;
        margin-bottom: 10px;
        box-shadow: 0 6px 6px rgba(0,0,0,0.1);
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
        b{
            float: right;
            margin-top: -44px;
            margin-right: 15px;
            color: #218CF7;
            font-size: 16px;
        }
    }
    .altername{
        width: 94%;
        height: 44px;
        margin: 10px 3%;
        input{
            display: block;
            width: 96%;
            height: 100%;
            padding: 0 2%;
            background: #f8f8f8;
            font-size: 14px;
            border: 0;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #9FA3B0;
        }
        input:-moz-placeholder, textarea:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #9FA3B0;
        }
        input::-moz-placeholder, textarea::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #9FA3B0;
        }
        input:-ms-input-placeholder, textarea:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            color: #9FA3B0;
        }
    }
}
</style>
