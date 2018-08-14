<template>
	<div class="infos-up" v-bind:newfiles="newfiles">
        <div class="title">
            <span class="shangchuan" v-bind:class="{longWidth:isLong,hidden:isHidden}">+&nbsp;上传</span>
            <input v-bind:class="{longWidth:isLong,hidden:isHidden}" type='file' name="company"
             @change="addFileBtn($event)" multiple="multiple">
            <p class="title-s" ng-show="tipsText">&nbsp;&nbsp;&nbsp;<b v-text="tipsText"></b></p>
        </div>
        <div class="uploads" v-for="(item,index) in fileArr">
            <b class="info"><a :href="`${staticUrl+item.filePath}`" target="_blank">{{item.fileName}}</a></b>
            <b class="delete" @click="deleteItem($event,index)" v-bind:class="{longWidth:isLong,hidden:isHidden}">删除</b>

        </div>
        <b class="error" v-if="errorMessage"><img src="./img/error.png">{{errorMessage}}</b>
    </div>
</template>
<script>
import { hostUrl, getResult, staticUrl } from "api/common"; //导入api
import axios from "axios";
export default {
  data() {
    return {
      fileArr: [],
      dataList: [],
      staticUrl: staticUrl(),
      targets: "",
      errorMessage:''
    };
  },
  props: {
    titleText: String,
    isShow: Boolean,
    isLong: Boolean,
    newfiles: Array,
    isHidden: Boolean,
    tipsText:String
  },
  watch: {

    newfiles(value) {
      
      if (value) {
        this.fileArr = value;
        this.dataList = this.fileArr;
      }
    }
  },
  methods: {
    addFileBtn(event) {
        if(this.fileArr.length > 9){
            this.errorMessage = '上传文件不能超过十个';
            return;
        }
      this.errorMessage = '';
      let _target = event.target;
      this.targets = _target;
      let file = _target.files[0];
      //console.log(file);
      let fileName = _target.files[0].name;
      let fileType = fileName.substring(fileName.lastIndexOf("."));
      if(fileType === '.exe' || fileType === '.bat' || fileType === '.sh' || fileType === '.cmd'){
          this.errorMessage = '文件格式不对，请重新上传';
          return;
      }
      if(file.size >1024*1024*10){
          this.errorMessage = '文件大于10M,请重新选择';
          return;
      }
      if(file.size == 0 ){
          this.errorMessage = '文件为空，请重新选择';
          return;
      }
      let param = new FormData(); //创建form对象
      param.append("file", file); //通过append向form对象添加数据
      // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8",
          accept: "application/json;charset=UTF-8"
        }
      }; //添加请求头
      axios.defaults.withCredentials = true;
      axios.post(`${hostUrl}/basics/v1/upload`, param, config)
        .then(response => {
          if (response.data.result == 0) {
            //console.log(response.data);
            this.fileArr.push({
              fileName: fileName,
              filePath: response.data.data.filePath,
              realPath: `${hostUrl + response.data.data.filePath}`
            });
            this.dataList = this.fileArr;
            this.targets.value = ""; //清空文件
          }else{
            this.errorMessage = response.data.msg;
            this.targets.value = ""; //清空文件
          }
        });
    },
    deleteItem(event, index) {
      this.fileArr.splice(index, 1);
      this.targets.value = ""; //清空文件
      this.dataList = this.fileArr;
    },
    returnData() {
      return this.dataList;
    }
  },
  mounted() {
    this.$on("newfiles", msg => {
      this.fileArr = msg;
    });
    //console.log(staticUrl());
  }
};
</script>
<style  type="text/css" lang="scss">
.infos-up {
    width: 48px;
    height: 48px;
  position: relative;
  float: left;
  margin: 0;
  .title {
    height: 60px;
    b.next {
      color: red;
    }
    b {
      font-size: 14px;
      font-weight: 400;
    }
    span {
      display: block;
      position: absolute;
      right: 0;
      top: -10px;
      width: 70px;
      height: 36px;
      border: 1px solid #54b4fe;
      text-align: center;
      color: #54b4fe;
      line-height: 36px;
    }
    span.longWidth {
      right: -120px;
    }
    span.hidden {
      display: none;
    }
    input {
      position: absolute;
      right: 0;
      width: 80px;
      height: 34px;
      top: -8px;
      opacity: 0;
    }
    input.longWidth {
      right: -120px;
    }
    input.hidden {
      display: none;
    }
    .up-dis {
      position: absolute;
      right: 0;
      top: 0;
    }
    .title-s b{
        font-size:12px;
        color: #bbbbbb;
    }
  }
  .uploads {
    color: #54b4fe;
    font-size: 14px;
    position: relative;
    margin-bottom: 18px;
    b.info {
      width: 430px;
      display: inline-block;
      margin-left: 14px;
      a {
        color: #54b4fe;
        word-break: break-all;
        display: inline-block;
        width: 330px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        &:hover{
            color: #ff942a;
        }
      }
    }
    b.btn {
      color: #666;
      width: 70px;
      height: 20px;
      border: 1px solid #bbb;
      display: inline-block;
      text-align: center;
      line-height: 20px;
      border-radius: 2px;
    }
    b.delete {
        position: absolute;
        cursor: pointer;
        color: #bbbbbb;
        right: 22px;
        top: 0;
        &:hover{
            color:#54b4fe;
        }
    }
    b.longWidth{
        right: -94px;
    }
    b.hidden {
      display: none;
    }
    input {
      position: absolute;
      width: 74px;
      right: 276px;
      top: 0;
      height: 24px;
      display: inline-block;
      opacity: 0;
    }
  }
  b.error{
      font-size: 12px;
      margin-left: 10px;
      color:#ee2323;
      img{
        vertical-align: text-top;
        margin-right: 3px;
        width: 13px;
      }
  }
}
</style>

