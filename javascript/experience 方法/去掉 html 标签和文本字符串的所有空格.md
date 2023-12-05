# js 实现去掉 html 标签和文本字符串的所有空格

## 去掉 html 标签

```js
function delHtmlTag(str){
	sreturn str.replace(/<[^>]+>/g,"");	//去掉所有的html标记
}
```

## 去掉字符串前后所有空格

```js
function Trim(str){ 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
```

## 去掉字符串中所有空格

```js
function Trim(str,is_global){
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g"){
        result = result.replace(/\s/g,"");
     }
    return result;
}
```

## 使用 replace 方法将字符串中的 `&nbsp;` 全部替换为空字符串

```js
var str="this &nbsp; is &nbsp; a test";
str = .replace(/&nbsp;/ig, "");
```

