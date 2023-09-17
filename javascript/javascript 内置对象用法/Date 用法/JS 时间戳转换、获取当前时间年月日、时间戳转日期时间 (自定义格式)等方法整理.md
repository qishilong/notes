### 1.时间戳转换（10位数）/（13位）

```js
//时间戳13位
formatDate: function (time) {//时间戳转日期
    let date = new Date(time);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    // return y + '-' + MM + '-' + d;
},
//时间戳10位
formatDate: function (time) {//时间戳转日期
    let date = new Date(parseInt(time) * 1000);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    // return y + '-' + MM + '-' + d;
},
复制代码
```

### 2.时间戳转日期时间 (可自定义返回格式)

这里使用的JavaScript函数库jutils的formatDate函数，引用地址jutils附上： `<script src="https://cdn.jsdelivr.net/npm/jutils-src"></script>`

```js
function formatDate(data,formatstr){
    var arrweek=["日","一","二","三","四","五","六"];
    var str=formatstr.replace(/yyyy|YYYY/,date.getFullYear()).replace(/yy|YY/,
    $addZero(date.getFullYear() % 100,2)).replace(/mm|MM/,$addZero(date.getMonth() + 1,
    2)).replace(/m|M/g,date.getMonth() + 1).replace(/dd|DD/,$addZero(date.getDate(),2)).replace(/d|D/g,
    date.getDate()).replace(/hh|HH/,$addZero(date.getHours(),2)).replace(/h|H/g,
    date.getHours()).replace(/ii|II/,$addZero(date.getMinutes(),2)).replace(/i|I/g,
    date.getMinutes()).replace(/ss|SS/,$addZero(date.getSeconds(),2)).replace(/s|S/g,
    date.getSeconds()).replace(/w|g/,$addZero(date.getDay(),2)).replace(/W/g,arrweek[date.getDay()]);
    return str;
}
function $addZero(v,size){
  for(var i=0,len=size-(v+"").length;i<len;i++){
    v="0"+v;
  }
  return v+""
}

使用示例

// 年、月、日、时、分、秒
var date = jutils.formatDate(new Date(1634002035*1000),"YYYY-MM-DD HH:ii:ss");
// 2021-10-12 09:27:15

//年、月、日、周
var date = jutils.formatDate(new Date(1634002035*1000),"YYYY-MM-DD 周W");
//2021-10-12 周二

//时、分、秒
var date = jutils.formatDate(new Date(1634002035*1000),"HH:ii:ss");
//09:27:15
复制代码
```

### 3.获取当前时间戳的方法

```js
var times = Date.parse(new Date());//不推荐使用，因为毫秒级别的数值被转化为000 ，不准确！

var times = (new Date()).valueOf();//获取当前毫秒的时间戳，准确！

var times = new Date().getTime();//返回数值单位是毫秒；
复制代码
```

### 4.时间转时间戳毫秒方法

```js
(new Date(this.zzsj)).getTime()   //getTime()返回数值的单位是毫秒   
复制代码
```

### 5.时间转换成时间戳

```js
Date.parse（）//转时间戳
复制代码
```

### 6.获取当前的年月日

```js
getDatetime(){
    //获取当前的年月日
    let date_ = new Date();
    let seperator1 = "-";
    let year = date_.getFullYear();
    let month = date_.getMonth() + 1;
    let strDate = date_.getDate();
}
复制代码
```

### 7.获取当前星期几

```js
getDatetime(){
    //获取当前星期几
    let date_ = new Date();
    let days = date_.getDay();
    switch(days) {
        case 1:
            days = '星期一';
            break;
        case 2:
            days = '星期二';
            break;
        case 3:
            days = '星期三';
            break;
        case 4:
            days = '星期四';
            break;
        case 5:
            days = '星期五';
            break;
        case 6:
            days = '星期六';
            break;
        case 0:
            days = '星期日';
            break;
    }
    this.days = days;
}

//简写方式，把星期写成数组从数组中获取
getDatetime(){
    //获取当前星期几
    let date_ = new Date();
    let days = date_.getDay();
    let arr = ['星期日', '星期一','星期二','星期三','星期四','星期五','星期六']
    this.days = arr[days]
}
复制代码
```

### 8.Js获取当前日期时间及其它操作

```js
var Date = new Date();
Date.getYear();        //获取当前年份(2位)
Date.getFullYear();    //获取完整的年份(4位,1970-????)
Date.getMonth();       //获取当前月份(0-11,0代表1月)
Date.getDate();        //获取当前日(1-31)
Date.getDay();         //获取当前星期X(0-6,0代表星期天)
Date.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
Date.getHours();       //获取当前小时数(0-23)
Date.getMinutes();     //获取当前分钟数(0-59)
Date.getSeconds();     //获取当前秒数(0-59)
Date.getMilliseconds();    //获取当前毫秒数(0-999)
Date.toLocaleDateString();     //获取当前日期
var time=Date.toLocaleTimeString();     //获取当前时间
Date.toLocaleString( );        //获取日期与时间
复制代码
```