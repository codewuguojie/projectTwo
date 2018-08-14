<template>
    <!-- 进度条组件 -->
    <div class="progress">
      <div class="progress-bar" :class="[typeClass]" :style="{width: time + '%'}">
        <span class="progress-info" v-if="showinfo">{{ percent +"%"}}
          <!-- <span></span> -->
        </span>

      </div>
    </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ""
    },

    percent: {
      type: Number,
      default: 0
    },
  },

  data() {
    return {
      pointer: "",
      time: 0,
      timer: "",
      showinfo: false
    };
  },
  watch: {
    percent(value) {
      if (value) {
          this.pointer = value;
        if (value > 100) {
          this.pointer = 100;
        }
        console.log(value);
        this.time = this.pointer;
      }
    }
  },
  computed: {
    typeClass() {
      return this.type ? `is-${this.type}` : null;
    }
  },
  methods: {
    beginAnimate() {
      console.log(this.percent);
      this.timer = setInterval(() => {
        if(this.percent === 0)return;
        this.time += 1;
        if (this.time === this.pointer){
          clearInterval(this.timer);
        } 
      }, 10);
    },
    showinfos() {
      this.showinfo = true;
    },
    hideinfos() {
      this.showinfo = false;
    }
  },
  mounted() {
    this.pointer = this.percent;
    if (this.percent > 100) {
      this.pointer = 100;
    }
    this.time = this.pointer;
    
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/sass/common.scss";
.progress {
  display: block;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.065);
  z-index: 100;
  cursor: pointer;
}
.progress-bar {
  position: relative;
  display: inline-block;
  float: left;
  height: 100%;
  text-align: center;
  border-radius: 3px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  z-index: 100;
  background: linear-gradient(to right , #feaa5f, #fb6b38);
  background: -moz-linear-linear-gradient(to right , #feaa5f, #fb6b38);
  background: -webkit-linear-gradient(to right , #feaa5f, #fb6b38);
  background: -o-linear-gradient(to right , #feaa5f, #fb6b38);
  background: -ms-linear-gradient(to right , #feaa5f, #fb6b38);

}
.progress-info {
  display: block;

  position: absolute;
  right: -12px;
  top: -28px;
  width: 48px;
  height: 20px;
  background-color: $fontColor4;
  z-index: 1000;
  color: #ffffff;
  font-size: 12px;
  line-height: 20px;
  border-radius: 16px;
  span {
    display: inline-block;
    position: absolute;
    left: 50%;
    margin-left: -4px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid $fontColor4;
    bottom: -3px;
  }
}
</style>
