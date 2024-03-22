# polyfill

## 对Polyfill的理解

官方说法:Polyfill（填充物）是用于在旧版本浏览器或环境中实现新的Web标准功能的代码库或脚本。它们填补了浏览器对新功能的支持不足或不完整的差距，使开发人员能够在各种浏览器上使用最新的Web功能。

个人见解:可以把旧版本的浏览器看作一道有很多小裂缝的墙，而新版本浏览器则是光滑如玉，~~美艳不可方物~~。而Polyfill就是起到了填充的作用，可以把旧墙进行美化填平，至少可以从表面看起来没有任何差别。

代码层面理解: 比如JavaScript中数组中的forEach方法，是JavaScript 1.6开始支持数组的新的方法 而IE8以下的浏览器就无法支持forEach的使用，而我们现在绝大多数人用的浏览器(google万岁)都是支持forEach方法的。Polyfill就可以帮我们做到在IE8以下的浏览器也可以使用forEach方法！

## 底层原理代码理解

下面一个常规的forEach的使用，使用forEach打印数组中的每一项

```js
let arr = [3,4,5,6]
arr.forEach(item=>{
	console.log(item) // 打印 3,4,5,6
})
```

通过Polyfill去模拟一个forEach，这里我往Array的原型中去新增了一个forEach2的方法。这里的this指向的是调用者，也就是arr,this[i]代表的就是数组arr中的每一项。

最后经过测试，打印结果依旧为3，4，5，6。说明我们已经实现了一个相对简陋的forEach的功能(核心逻辑已经完完全全复刻实现了)。

而在低版本的浏览器中如果要用到forEach，我们就可以做一个判断，如果数组没有forEach方法，我们就用自己编写的forEach方法即可实现polyfill的功效。

```javascript
// 模拟forEach方法
Array.prototype.forEach2 = function(callback){
    for(let i = 0; i < this.length;i++){
      callback(this[i])
    }
}
arr.forEach2(item=>{
	console.log(item)  // 打印结果依旧为3,4,5,6
})
```

## 使用流程

以上的例子只是单个举例，去完成forEach对低版本浏览器的兼容。实际使用，自然不可能为了做兼容每个功能还要自己去写(~~这不是折磨人吗~~)。

1.  确定需要的Polyfill：首先，确定你想要在旧版本浏览器中实现的新功能。这可以是新的API、语法或其他特性。了解所需的Polyfill将有助于找到适合你需求的Polyfill库。
2.  导入Polyfill库：找到一个提供所需Polyfill的库或脚本。一些常见的Polyfill库包括`"polyfill.io"、"core-js"、"Babel polyfill"`等。你可以通过下载这些库的文件或通过CDN引入它们。
3.  加载Polyfill：在你的网页或应用程序中，将Polyfill库的文件链接或脚本标签插入到HTML文件的`<head>`或`<body>`部分。确保将其放置在其他JavaScript文件之前，以便在其他脚本执行之前加载Polyfill。

```xml
<script src="path/to/polyfill.js"></script>
```

1.  检测功能支持：一些Polyfill库可以自动检测浏览器是否支持某个功能，并只在必要时加载相应的Polyfill。但是，如果你使用的Polyfill库没有内置的功能检测机制，你可能需要自行检测功能支持，并根据需要加载Polyfill。

```javascript
if (!Array.prototype.includes) { 
// 加载Array.includes的Polyfill 
// 例如：loadPolyfill('array-includes-polyfill.js'); 
}
```

1.  测试和部署：在旧版本浏览器中测试你的网页或应用程序，确保所需的功能在这些浏览器中正常工作。一旦确认一切正常，你可以部署你的网页或应用程序，并确保Polyfill被正确加载和应用。

## 总结

使用Polyfill可以帮助开发人员更轻松地编写跨浏览器兼容的代码，而不必为旧版本的浏览器编写特定的兼容性代码。开发人员可以依赖Polyfill库来提供对新功能的支持，而无需担心用户使用旧版本浏览器时出现错误或功能不完整的情况。

Polyfill虽然能够在旧版本浏览器中模拟新功能，但并不能解决所有兼容性问题。有些功能可能无法通过Polyfill来完全模拟，或者某些功能在旧版本浏览器上的性能可能会受到影响。因此，了解Polyfill的限制和适用情况是很重要的。

此外，随着浏览器的更新和新标准的普及，某些Polyfill库可能不再维护或更新。因此，要定期检查和更新你使用的Polyfill库，以确保它们与最新的浏览器兼容，并且没有潜在的安全漏洞。