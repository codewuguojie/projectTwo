<template>
    <div class="box1111">
        <div class="one" style="height: 200px; width: 100%;"></div>
        <div>
            <lottery
                @lotteryDone = "lotteryDone"
                :lottery-angle = "0"
                :lottery-flag = 'isCan'
                :lottery-prizenum = "prizeNum"
                :lottery-prizeno = "prizeNo"
                :lottery-bg = "lotterybg"
                :content-bg = "contentbg"
                :pointer-bg = "pointerbg"
                :lottery-width = "lotteryWidth"
            >
            </lottery>
        </div>
    </div>
</template>

<script>
    import lottery from '../base/lottery/lottery'
    export default {
        name: 'app',
        components: {
            'lottery': lottery,
           
        },
        data () {
            return {
                'isCan':false,
                prizeNo: 1,
                prizeNum: 8,
                lotteryWidth: ['85%', '35%'],
                lotterybg: require('../../assets/img/turnplate-bg.png'),
                contentbg: require('../../assets/img/turntable.png'),
                pointerbg: require('../../assets/img/pointer.png'),
                prizeList: [
                    '500REX',
                    '100REX',
                    '200REX',
                    '50REX',
                    '100REX',
                    '谢谢参与',
                    '50REX',
                    '1000REX'
                ]
            }
        },
        methods: {
            lotteryDone (res) {
                let rodom = 1 + parseInt(Math.random() * this.prizeNum)
                this.prizeNo = rodom
                console.log(res)
                console.log(res.prizeNo)
                console.log(this.prizeList[res.prizeNo - 1])
                alert(this.prizeList[res.prizeNo - 1])
            }
        }
    }
</script>

<style lang="scss">
.box1111{
    width: 100%;
    height: 100%;
    background: url("../../assets/img/turnplateBg.png") no-repeat;
    background-size: 100%;
}
</style>
