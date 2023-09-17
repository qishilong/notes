# DOMContentLoaded

当初始的 **HTML** 文档被完全加载和解析完成之后，**`DOMContentLoaded`** 事件被触发，而无需等待样式表、图像和子框架的完全加载。

例子

```js
document.addEventListener("DOMContentLoaded", function () {
    var img = document.querySelector("img");
    getImgSize(img, function (size) {
        console.log(size);
    });
})
```

