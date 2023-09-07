# DeviceMotionEvent

**实验性:** **这是一项[实验性技术](https://developer.mozilla.org/zh-CN/docs/MDN/Writing_guidelines/Experimental_deprecated_obsolete#实验性)**
在将其用于生产之前，请仔细检查[浏览器兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent#浏览器兼容性)。

`DeviceMotionEvent` 为 web 开发者提供了关于设备的位置和方向的改变速度的信息。

**警告：** 目前，Firefox 和 Chrome 处理坐标的方式不同。使用时要多加注意。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent#构造函数)

-   [`DeviceMotionEvent.DeviceMotionEvent()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent) 非标准

    创建一个新的 `DeviceMotionEvent`。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent#属性)

-   [`DeviceMotionEvent.acceleration`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent/acceleration) 只读

    提供了设备在 X,Y,Z 轴方向上加速度的对象。加速度的单位为 [m/s2](https://en.wikipedia.org/wiki/Meter_per_second_squared)。

-   [`DeviceMotionEvent.accelerationIncludingGravity`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent/accelerationIncludingGravity) 只读

    提供了设备在 X,Y,Z 轴方向上带重力的加速度的对象。加速度的单位为 [m/s2](https://en.wikipedia.org/wiki/Meter_per_second_squared)

-   [`DeviceMotionEvent.rotationRate`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent/rotationRate) 只读

    提供了设备在 alpha、beta、gamma 轴方向上旋转的速率的对象。旋转速率的单位为度每秒。

-   [`DeviceMotionEvent.interval`](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent/interval) 只读

    表示从设备获取数据的间隔时间，单位是毫秒。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent#示例)

```js
window.addEventListener('devicemotion', function(event) {
  console.log(event.acceleration.x + ' m/s2');
});
```