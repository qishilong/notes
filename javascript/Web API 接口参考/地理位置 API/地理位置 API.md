# 地理位置 API

**安全上下文:** 此项功能仅在一些[支持的浏览器](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API#浏览器兼容性)的[安全上下文](https://developer.mozilla.org/zh-CN/docs/Web/Security/Secure_Contexts)（HTTPS）中可用。

**地理位置 API**（Geolocation API）允许用户向 web 应用程序提供他们的位置。出于隐私考虑，报告地理位置前会先请求用户许可。

Web 扩展若期望使用 `Geolocation` 对象，则必须将 `"geolocation"` 权限添加到其清单（manifest）中。在第一次请求地理位置访问时，用户的操作系统将提示用户提供相应的权限。

## [概念和用法](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API#概念和用法)

通常，要在地图上标出用户的位置或显示与用户地理位置相关的个性化信息时，我们需要在 web 应用程序中检索用户的位置信息。

地理位置 API 是通过调用 [`navigator.geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation) 来访问的；这将使得用户的浏览器请求获得用户位置数据相关的权限。如果用户授予了权限，则浏览器将使用设备上可用的最佳方式来获取此信息（例如 GPS）。

开发人员现在可用通过不同的方式访问位置信息：

-   [`Geolocation.getCurrentPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/getCurrentPosition)：检索设备的当前位置。
-   [`Geolocation.watchPosition()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation/watchPosition)：注册一个处理函数，在设备位置发生改变时都会自动调用，并返回改变后的位置信息。

对于上述的几种方法，其回调函数最多有三个参数：

-   一个必须的成功的回调函数：如果位置检索成功，则调用该回调函数，并以 [`GeolocationPosition`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPosition) 对象（用于提供位置数据）作为其唯一的参数。
-   一个可选的错误回调函数：如果位置检索失败，则调用该回调函数，并以 [`GeolocationPositionError`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPositionError) 对象（用于提供访问出错的信息）作为其唯一的参数。
-   一个可选的对象：用于提供检索位置数据的选项。

有关地理位置使用的信息，请参阅[使用地理位置 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API)。

## [接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API#接口)

-   [`Geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation)

    该 API 的主类——包含检索用户当前的位置、监听位置变化以及清除先前设置的监听器的方法。

-   [`GeolocationPosition`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPosition)

    表示用户的位置。`GeolocationPosition` 实例会在成功调用 [`Geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) 中的方法时返回。包含了一个时间戳和一个 [`GeolocationCoordinates`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationCoordinates) 对象实例。

-   [`GeolocationCoordinates`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationCoordinates)

    表示用户位置的坐标。`GeolocationCoordinates` 实例包含经纬度和其他相关的重要信息。

-   [`GeolocationPositionError`](https://developer.mozilla.org/zh-CN/docs/Web/API/GeolocationPositionError)

    `GeolocationPositionError` 实例会在未能成功调用 [`Geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) 中的方法时返回。包含了错误代码和错误消息。

-   [`Navigator.geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation)

    API 的入口点。返回一个 [`Geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) 对象实例，从中可以访问所有其他的功能。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API#示例)

参见[使用地理位置 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#示例) 以获取示例代码。