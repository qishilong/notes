# Geolocation

**安全上下文:** 此项功能仅在一些[支持的浏览器](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation#浏览器兼容性)的[安全上下文](https://developer.mozilla.org/zh-CN/docs/Web/Security/Secure_Contexts)（HTTPS）中可用。

**`Geolocation`** 接口是一个用来获取设备地理位置的可编程的对象，它可以让 Web 内容访问到设备的地理位置，这将允许网站或应用基于用户的地理位置提供定制的信息。

带有此接口的对象可以用由 [`Navigator`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 实现的属性 [`NavigatorGeolocation.geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation) 来获得。

**备注：** 出于安全考虑，当一个网页尝试获取地理位置信息时，会请求用户批准地理位置访问权限。因为每个浏览器都有各自请求用户批准该权限的策略和方法。

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation#实例属性)

*`Geolocation` 接口不实现，也不继承任何属性。*

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation#实例方法)

*`Geolocation` 接口不继承任何方法。*

-   [`Geolocation.getCurrentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition)

    确定设备的位置并返回一个携带位置信息的 [`Position`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPosition) 对象。

-   [`Geolocation.watchPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition)

    注册一个位置改变监听器，每当设备位置改变时，返回一个 `long` 类型的该监听器的 ID 值。

-   [`Geolocation.clearWatch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/clearWatch)

    取消由 `watchPosition()` 注册的位置监听器。