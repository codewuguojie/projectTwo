/**
 * Created by wnn on 2018/4/24.
 */
/*
* 调后台api的公共方法

* */
import axios from 'axios'
import Vue from 'vue'
import qs from 'qs' /*用来解析axios传参的数据格式*/
var root = process.env.API_ROOT;
export function staticUrl(){
    let url = '';
    if(process.env.API_ROOT == 'http://testapi.laiminet.com/api'){ //测试
        url = "https://testoss.laiminet.com";
    }else if(process.env.API_ROOT == 'https://m.laiminet.com/api'){
        url = "https://oss.laiminet.com";
    }else{
        url = "https://testoss.laiminet.com";
    }
    return url
}
export const hostUrl = process.env.API_ROOT==='https://testm.laiminet.com/api' ? 'https://testm.laiminet.com':"https://m.laiminet.com";
export const hosts = process.env.API_ROOT;

export function myhost() {
    let url = '';
    if(process.env.API_ROOT === 'http://testm.laiminet.com/api'){ //测试
        url = 'https://testoss.laiminet.com';
    }else if(process.env.API_ROOT === 'https://m.laiminet.com/api'){//生产
        url = 'https://oss.laiminet.com';
    }else {//开发
        url = 'https://testoss.laiminet.com';
    }
    return url
}

/*数字格式转换千分位*/


export function getResult(method, url, data) {
    axios.defaults.withCredentials=true;//配置跨域
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: `${root + url}`,
            data: data || '',
            withCredentials: true,
            async:true,
        }).then((result) => {
            resolve(result.data)
        }).catch((result) => {
            reject(result.data);
        })
    })
}
//格式日期
export function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 11 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate()+1<11 ? '0'+date.getDate() : date.getDate();
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    //console.log(`${Y}:${M}:${D}`)
    return Y+M+D;
  }

export  function toThousands(num) {
    var num_str = num.toFixed(2).split(".")[0]
    return (num_str || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +'.'+ num.toFixed(2).split(".")[1];
}





