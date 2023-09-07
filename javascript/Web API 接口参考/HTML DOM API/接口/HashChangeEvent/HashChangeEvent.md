# HashChangeEvent

**`HashChangeEvent`** 接口表示一个变化事件，当 URL 中的片段标识符发生改变时，会触发此事件。

片段标识符指 URL 中 `#` 号和它以后的部分。

![image-20230705175846960](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202307051758007.png)

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent#属性)

*这个接口也从 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 中继承属性。*

-   [`HashChangeEvent.newURL`](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent/newURL) 只读

    window 即将导航到达的新 URL。

-   [`HashChangeEvent.oldURL`](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent/oldURL) 只读

    window 此前导航到达过的 URL。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent#方法)

*这个接口没有自己的方法，但从 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 中继承方法*

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent#示例)

### [井号内容变化的语法选择](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent#井号内容变化的语法选择)

你可以选择使用下述的任一方法监听 [`hashchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event) 事件。

```js
window.onhashchange = funcRef;
```

**或**

```html
<body onhashchange="funcRef();">
```

**或**

```js
window.addEventListener("hashchange", funcRef, false);
```

### [基本示例](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent#基本示例)

```js
function locationHashChanged() {
  if (location.hash === '#somecoolfeature') {
    somecoolfeature();
  }
}

window.addEventListener('hashchange', locationHashChanged);
```

## [回落方法（Polyfill）](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent#回落方法（polyfill）)

在 [Modernizr GitHub page](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills) 中列出了几种回落（fallback）脚本。基本上，这些脚本每隔一段时间检查以此 [`location.hash`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLAnchorElement/hash)。这里是其中一个版本，其仅允许一个处理程序（handler）绑定在 [`onhashchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event) 属性上：

```js
(function(window) {

  // 如果浏览器已经实现了此事件，则退出函数
  if ( "onhashchange" in window.document.body ) return;

  var location = window.location,
      oldURL  = location.href,
      oldHash = location.hash;

  // 每隔 100 毫秒，检查一次片段标识符
  setInterval(function() {
    var newURL  = location.href,
        newHash = location.hash;

    // 如果片段标识符有变化，且处理程序存在
    if ( newHash != oldHash && typeof window.onhashchange === "function" ) {
      // 执行处理程序
      window.onhashchange({
        type: "hashchange",
        oldURL: oldURL,
        newURL: newURL
      });

      oldURL = newURL;
      oldHash = newHash;
    }
  }, 100);

})(window);
```