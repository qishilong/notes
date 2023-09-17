# Geolocation.getCurrentPosition()

**`Geolocation.getCurrentPosition()`** 方法用来获取设备当前位置。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition#语法)

```js
navigator.geolocation.getCurrentPosition(success, error, options)
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition#参数)

-   *success*

    成功得到位置信息时的回调函数，使用[`Position`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPosition) 对象作为唯一的参数。

-   *error* 可选

    获取位置信息失败时的回调函数，使用 [`PositionError`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPositionError) 对象作为唯一的参数，这是一个可选项。

-   *options* 可选

    一个可选的[`PositionOptions`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition) 对象。