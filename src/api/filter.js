let cutoutStr = value => {
    let str = '';
    if (!value) str = '';
    if (value.length > 10) {
        str = value.substring(0,10)+'......';
    }else{
        str = value;
    }
    return str;
}
let cutoutNum = value => {
    let str = '';
    console.log(typeof value);
    if(!value){
        value = '';
        return ''
    }
    str = value.substring(0,3)+'***'+value.substring(7,11);
    return str;
}

/*文本过滤器*/
let wordStr = value => {
    let str = '';
    if (!value) str = '';
    if (value.length > 50) {
        str = value.substring(0,50)+'...';
    }else{
        str = value;
    }
    return str;
}

/*电话号加星号*/
let star = value =>{
    let str = '';
    if(!value && value == null) str = '';
    if(value!=null){
        str = value.slice(0,3)+'****'+value.slice(7.10)
    }
    return str
}


/*文本字符长度限制*/
let wordLeth = value =>{
    let str = '';
    if(!value && value == null) str = '';
    if(value != null && value.length > 12 ){
        str = value.substring(0,12) + '...'
    }else{
        str = value
    }
    return str
}

let nameLeth = value =>{
    let str = '';
    if(!value && value == null) str = '';
    if(value != null && value.length > 8 ){
        str = value.substring(0,8) + '...'
    }else{
        str = value
    }
    return str
}

let strLeth = value =>{
    let str = '';
    if(!value && value == null) str = '';
    if(value != null && value.length > 50 ){
        str = value.substring(0,50) + '...'
    }else{
        str = value
    }
    return str
}


let jiequ = value =>{
    let str = ''
    str = value.split(" ")
    return str[0]
}

let zrProgress = type =>{
    var maps = {
        "0":'种子期',
        "1": "天使轮",
        "2": "A轮",
        "3": "A+轮",
        "4": "B轮",
        "5":'C轮',
        "6": "D轮",
        "7": "IOP",
        "8": "上市",
    };
    return maps[type];
}
let zrType = type =>{
    var maps = {
        "0":'传统实业',
        "1": "大健康",
        "2": "大金融",
        "3": "高新科技",
        "4": "IT互联网",
        "5":'大教育',
        "6": "企业服务"
    };
    return maps[type];
}
let statusType = type =>{
    var maps = {
        "1": "未开始",
        "2": "进行中",
        "3": "已完成",
    };
    return maps[type];
}
// 保留两位小数
let pointsTwo = num =>{
    if(!num) num = 0;
    var f = Math.round(num*Math.pow(10,2))/Math.pow(10,2);
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        s += '.';
    }
    for(var i = s.length - s.indexOf('.'); i <= 2; i++){
      s += "0";
    }
    return s;
}
let toThousands = num =>{
    num = num*1;
    var num_str = num.toFixed(2).split(".")[0]
    return (num_str || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') +'.'+ num.toFixed(2).split(".")[1];
}

export { cutoutStr,cutoutNum,wordStr,star,jiequ,wordLeth,nameLeth,strLeth,zrProgress,zrType,statusType,pointsTwo,toThousands }
