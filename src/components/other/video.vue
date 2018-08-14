<template>
    <div class="box">
        <v-touch
            class="touch"
            v-on:swipeleft="left()"
            v-on:swiperight="right()"
        >
            <video :autoplay="autoplay" moted loop="loop">
                <source src="./test.mp4" type="video/mp4"/>
            </video>

            <input type="text" v-model="disX"/>
        </v-touch>

    </div>
</template>

<script>
    import Vue from 'vue'
    import vueTouch from 'vue-touch'
    Vue.use(vueTouch,{name:'v-touch'})
    export default {
        data(){
            return{
                startX:0,//开始触摸的位置
                moveX:0,//滑动时的位置
                endX:0,//结束触摸的位置
                disX:0,//移动距离
                autoplay:true,
            }
        },
        methods:{
            left (event) {
                // alert(event)
                this.$router.push({path: 'home'})
            },
            right (event) {
                // alert(event)
                this.$router.push({path: 'mycenter'})
            }
        },
        mounted(){

        }
    }
</script>

<style scoped lang="scss">
    .box{
        width: 100%;
        height: 100%;
        .touch{
            width: 100%;
            height: 100%;
            #video{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
