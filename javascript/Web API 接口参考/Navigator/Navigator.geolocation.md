# Navigator.geolocation

**安全上下文:** 此项功能仅在一些[支持的浏览器](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation#浏览器兼容性)的[安全上下文](https://developer.mozilla.org/zh-CN/docs/Web/Security/Secure_Contexts)（HTTPS）中可用。

**`Navigator.geolocation`** 只读属性返回一个 [`Geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) 对象，通过这个对象可以访问到设备的位置信息。使网站或应用可以根据用户的位置提供个性化结果。

**备注：** 出于安全考虑，当网页请求获取用户位置信息时，用户会被提示进行授权。注意不同浏览器在请求权限时有不同的策略和方式。Windows 10 在未开启定位的情况下无法获取位置

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation#语法)

```js
geo = navigator.geolocation
```