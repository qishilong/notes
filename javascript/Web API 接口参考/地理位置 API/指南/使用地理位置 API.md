# 使用地理位置 API

**安全上下文:** 此项功能仅在一些[支持的浏览器](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#浏览器兼容性)的[安全上下文](https://developer.mozilla.org/zh-CN/docs/Web/Security/Secure_Contexts)（HTTPS）中可用。

地理位置 API 用于检索用户的位置，因此，利用地图 API，可以显示用户的位置。本文将阐述基础的使用方法。

## [geolocation 对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#geolocation_对象)

[地理位置 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) 通过 [`navigator.geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation) 对象提供。

如果该对象存在，那么地理位置服务可用。你可以测试 `geolocation` 是否存在：

```js
if ('geolocation' in navigator) {
  /* geolocation 存在 */
} else {
  /* geolocation 不存在 */
}
```

### [获取当前位置](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#获取当前位置)

你可以调用 [`getCurrentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition) 函数获取用户当前定位位置。这会异步地请求获取用户位置，并查询定位硬件来获取最新信息。当定位被确定后，定义的回调函数就会被执行。你可以选择性地提供第二个回调函数，当有错误时会被执行。第三个参数也是可选的，你可以通过该对象参数设定最长可接受的定位返回时间、等待请求的时间和是否获取高精度定位。

**备注：** 默认情况下，[`getCurrentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition) 会尽快返回一个低精度结果，这在你不关心准确度只关心快速获取结果的情况下很有用。有 GPS 的设备可能需要一分钟或更久来获取 GPS 定位，在这种情况下 `getCurrentPosition()` 会返回低精度数据（基于 IP 的定位或 Wi-Fi 定位）。

```js
navigator.geolocation.getCurrentPosition((position) => {
  doSomething(position.coords.latitude, position.coords.longitude);
});
```

上述示例中，当获取位置后 `doSomething()` 函数会被执行。

### [监视定位](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#监视定位)

你可以设定一个回调函数来响应定位数据发生的变更（设备发生了移动，或获取到了更高精度的地理位置信息）。你可以通过 [`watchPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition) 函数实现该功能。它与 [`getCurrentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition) 接受相同的参数，但回调函数会被调用多次。错误回调函数与 [`getCurrentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition) 中一样是可选的，也会被多次调用。

**备注：** 你可以直接调用 [`watchPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition) 函数，不需要先调用 [`getCurrentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition) 函数。

```js
const watchID = navigator.geolocation.watchPosition((position) => {
  doSomething(position.coords.latitude, position.coords.longitude);
});
```

[`watchPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition) 函数会返回一个 ID，唯一地标记该位置监视器。你可以将这个 ID 传给 [`clearWatch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/clearWatch) 函数来停止监视用户位置。

```js
navigator.geolocation.clearWatch(watchID);
```

### [调整返回结果](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#调整返回结果)

[`getCurrentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition) 和 [`watchPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition) 都接受一个成功回调、一个可选的失败回调和一个可选的 options 对象。

该对象允许你指定是否启用高精度、返回位置数据的最长缓存时间（在达到最长缓存时间之前，结果会被缓存，且在请求时的位置相同时，会返回缓存的结果；在过期后，浏览器会请求刷新位置数据），以及超时时间（用于表示浏览器在超时前最大的尝试获取位置数据的时间）。

对 [`watchPosition`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition) 的调用类似于这样：

```js
function success(position) {
  doSomething(position.coords.latitude, position.coords.longitude);
}

function error() {
  alert('Sorry, no position available.');
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

const watchID = navigator.geolocation.watchPosition(success, error, options);
```

## [描述位置](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#描述位置)

用户的位置由一个包含 [`GeolocationCoordinates`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationCoordinates) 对象实例的 [`GeolocationPosition`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPosition) 对象实例描述。

`GeolocationPosition` 实例包含两个属性：`coords` 包含一个 `GeolocationCoordinates` 实例，`timestamp` 属性则包含一个 [`DOMTimeStamp`](https://developer.mozilla.org/zh-CN/docs/Glossary/Unix_time) 实例，用于表示检索位置数据花费的时间。

`GeolocationCoordinates` 实例包含多个属性，但主要使用的是其中的两个属性：`latitude`（纬度）和 `longitude`（经度），它们是你在地图上绘制位置所需的。因此，许多地理定位成功的回调看起来相当简单：

```js
function success(position) {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  // 使用 latitude 和 longitude 做些什么
}
```

你也可以从 `GeolocationCoordinates` 对象中获取许多其他的信息，包括高度、速度、设备面朝的方向，以及对高度、经纬度数据的精准测量值。

## [错误处理](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#错误处理)

如果调用 `getCurrentPosition()` 或 `watchPosition()` 时提供了错误回调函数，回调函数的第一个参数将会是一个 [`GeolocationPositionError`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPositionError) 对象实例。该对象包含两个属性：`code` 表示返回的错误类型，`message` 表示人类可读的、对错误码（`code`）的描述。

你可以像这样使用它：

```js
function errorCallback(error) {
  alert(`ERROR(${error.code}): ${error.message}`);
};
```

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#示例)

在以下示例中，Geolocation API 用于检索用户的经纬度。如果检索成功，则在超链接中填充一个可以显示用户位置的 `openstreetmap.org` 的 URL。

### [HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#html)

```html
<button id = "find-me">显示我的位置</button><br/>
<p id = "status"></p>
<a id = "map-link" target="_blank"></a>
```

### [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#javascript)

```js
function geoFindMe() {

  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `纬度：${latitude} °，经度：${longitude} °`;
  }

  function error() {
    status.textContent = '无法获取你的位置';
  }

  if (!navigator.geolocation) {
    status.textContent = '你的浏览器不支持地理位置';
  } else {
    status.textContent = '定位中……';
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

document.querySelector('#find-me').addEventListener('click', geoFindMe);
```

### [结果](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#结果)

### [结果](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#结果)

<iframe class="sample-code-frame" title="示例 sample" id="frame_示例" width="350" height="150" src="https://live.mdnplay.dev/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API/runner.html?id=%E7%A4%BA%E4%BE%8B" allow="geolocation" loading="lazy" style="box-sizing: content-box; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>