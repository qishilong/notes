# Navigator

`Navigator` 接口表示用户代理的状态和标识。它允许脚本查询它和注册自己进行一些活动。

可以使用只读的 [`window.navigator`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/navigator) 属性检索 navigator 对象。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator#属性)

不从 *[`NavigatorID` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)、[`NavigatorLanguage` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)、[`NavigatorOnLine` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)、[`NavigatorGeolocation` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)、[`NavigatorPlugins` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)、`NavigatorUserMedia`* 和 *[`NetworkInformation`](https://developer.mozilla.org/zh-CN/docs/Web/API/NetworkInformation)* 中继承任何属性，但是实现了定义在这些对象中的如下属性。

### [标准属性](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator#标准属性)

-   [`Navigator.activeVRDisplays`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/activeVRDisplays) 只读 实验性

    筛选所有的 [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) 对象，把其中所有 [`VRDisplay.ispresenting` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/VRDisplay/isPresenting) 属性的值为 `true` 的对象以数组的形式返回。

-   [`NavigatorID.appCodeName` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appCodeName) 只读 已弃用

    返回当前浏览器的内部“开发代号”名称。不能保证此属性返回的值是正确的。

-   [`NavigatorID.appName` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appName) 只读 已弃用

    以 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的形式返回浏览器官方名称。不能保证此属性返回的值是正确的。

-   [`NavigatorID.appVersion` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/appVersion) 只读 已弃用

    以 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的形式返回浏览器版本。不能保证此属性返回的值是正确的。

-   [`Navigator.battery`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/getBattery) 只读 已弃用

    返回一个 [`BatteryManager`](https://developer.mozilla.org/zh-CN/docs/Web/API/BatteryManager) 对象，你可以用它来获取一些电池充电状态的信息。

-   [`Navigator.connection`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/connection) 只读 实验性

    提供一个 [`NetworkInformation`](https://developer.mozilla.org/zh-CN/docs/Web/API/NetworkInformation) 对象来获取设备的网络连接信息。

-   [`Navigator.cookieEnabled`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/cookieEnabled) 只读

    当忽略 Cookie 时返回 false，否则返回 true

-   [`Navigator.geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/geolocation) 只读

    返回一个 [`Geolocation`](https://developer.mozilla.org/zh-CN/docs/Web/API/Geolocation) 对象，据之可访问设备的地理位位置信息。

-   [`NavigatorConcurrentHardware.hardwareConcurrency` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency) 只读

    返回可用的逻辑处理器核心数。

-   [`NavigatorPlugins.javaEnabled` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/javaEnabled) 只读 实验性

    返回 [`Boolean` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 表明浏览器是否支持 Java。

-   [`Navigator.keyboard`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/keyboard) 只读 实验性

    返回一个 [`Keyboard`](https://developer.mozilla.org/zh-CN/docs/Web/API/Keyboard) 对象，该对象提供对以下功能的访问：检索键盘布局图和切换从物理键盘捕获按键的功能。

-   [`NavigatorLanguage.language` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) 只读

    返回 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 表示用户的首先语言，通常是浏览器用户界面的语言。当未知的时，返回 null。

-   [`NavigatorLanguage.languages` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages) 只读

    返回一个表示用户已知语言的 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 数组，并按优先顺序排列。

-   [`NavigatorPlugins.mimeTypes` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mimeTypes) 只读 实验性

    返回 [`MimeTypeArray` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MimeTypeArray) 数组用于列举浏览器所支持的 MIME 类型。

-   [`Navigator.locks` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/locks) 只读 实验性

    Returns a [`LockManager` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/LockManager) object which provides methods for requesting a new [`Lock` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Lock) object and querying for an existing [`Lock` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Lock) object

-   [`Navigator.mediaCapabilities` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaCapabilities) 只读 实验性

    Returns a [`MediaCapabilities` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MediaCapabilities) object that can expose information about the decoding and encoding capabilities for a given format and output capabilities.

-   [`Navigator.maxTouchPoints`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/maxTouchPoints) 只读

    Returns the maximum number of simultaneous touch contact points are supported by the current device.

-   [`NavigatorOnLine.onLine` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) 只读

    返回 [`Boolean` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 来表明浏览器是否联网。

-   [`Navigator.oscpu`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/oscpu)

    返回当前操作系统名。

-   [`Navigator.permissions`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/permissions) 只读 实验性

    返回一个 [`Permissions`](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions) 对象，该对象可用于查询和更新 [Permissions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Permissions_API) 涵盖的 API 的权限状态。

-   [`NavigatorID.platform` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform) 只读 实验性

    返回浏览器平台名，不确定此值是否有效。

-   [`NavigatorPlugins.plugins` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/plugins) 只读 实验性

    返回 [`PluginArray` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PluginArray) 数组用于列举出浏览器安装的插件。

-   [`NavigatorID.product` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/product) 只读 实验性

    在任意浏览器下都只返回 `'Gecko'`，此属性只用于兼容的目的。

-   [`Navigator.serviceWorker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/serviceWorker) 只读

    返回 [`ServiceWorkerContainer`](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerContainer) 对象用于提供注册、删除、更新以及为了 [associated document](https://html.spec.whatwg.org/multipage/browsers.html#concept-document-window) 的 [`ServiceWorker`](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker) 对象之间的通信。

-   [`NavigatorStorage.storage` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/storage) 只读

    Returns the singleton [`StorageManager`](https://developer.mozilla.org/zh-CN/docs/Web/API/StorageManager) object used for managing persistence permissions and estimating available storage on a site-by-site/app-by-app basis.

-   [`NavigatorID.userAgent` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) 只读

    返回当前浏览器的用户代理。

-   [`Navigator.webdriver` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/webdriver) 只读 实验性

    TBD

### [非标准方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator#非标准方法)

-   `navigator.buildID` 非标准

    返回浏览器识别码。这一方法返回时间戳，例如：在 Firefox 64 发行版中返回 `20181001000000`。

-   [`Navigator.cookieEnabled`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/cookieEnabled) 非标准

    返回布尔值以表明 Cookies 是否能再浏览器中启用

-   [`navigator.doNotTrack`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/doNotTrack) 非标准

    报告用户的不追踪参数值，当值为 yes，你的网址或应用将不追踪用户

-   `navigator.id` 非标准

    返回 `id` 对象，你能用 [BrowserID](https://developer.mozilla.org/zh-CN/docs/BrowserID) 添加支持到你的网址。

-   `navigator.mozApps` 非标准

    Returns an `Apps` object you can use to install, manage, and control [Open Web apps](https://developer.mozilla.org/Open_Web_Apps).

-   `navigator.mozAudioChannelManager` 非标准

    The `navigator.mozAudioChannelManager` object provides access to the `mozAudioChannelManager` interface, which is used to manage your Firefox OS device's audio channels, including setting what channel's volume to affect when the volume buttons are pressed inside a particular app.

-   `navigator.mozNotification` 已弃用 非标准 `navigator.webkitNotification`

    Returns a `notification` object you can use to deliver notifications to the user from your web application.

-   `navigator.mozSocial` 非标准

    The Object, returned by the `navigator.mozSocial` property, is available within the social media provider's panel to provide functionality it may need.

-   `navigator.productSub` 非标准

    Returns the build number of the current browser (e.g., "20060909").

-   `navigator.securitypolicy` 非标准

    Returns an empty string. In Netscape 4.7x, returns "US & CA domestic policy" or "Export policy".

-   `navigator.standalone` 非标准

    Returns a boolean indicating whether the browser is running in standalone mode. Available on Apple's iOS Safari only.

-   `navigator.vendor` 非标准

    返回当前浏览器的供应商的名字（例如：“Netscape6”）。

-   `navigator.vendorSub` 非标准

    返回供应商版本号码（例如：“6.1”）。

-   [`navigator.webkitPointer`](https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_Lock_API) 非标准

    Returns a PointerLock object for the [Mouse Lock API](https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_Lock_API).

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator#方法)

*Doesn't inherit any method, but implements those defined in [`NavigatorID` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator), `NavigatorContentUtils`, \*`NavigatorUserMedia`,\* and `NavigatorStorageUtils`.*

### [标准方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator#标准方法)

-   [`Navigator.getVRDisplays()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getVRDisplays) 已弃用

    Returns a promise that resolves to an array of [`VRDisplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/VRDisplay) objects representing any available VR devices connected to the computer.

-   `NavigatorUserMedia.getUserMedia()`已弃用

    After having prompted the user for permission, returns the audio or video stream associated to a camera or microphone on the local computer.

-   `navigator.registerContentHandler`

    Allows web sites to register themselves as a possible handler for a given MIME type.

-   [`navigator.registerProtocolHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/registerProtocolHandler)

    Allows web sites to register themselves as a possible handler for a given protocol.

-   [`Navigator.requestMediaKeySystemAccess()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/requestMediaKeySystemAccess) 实验性

    Returns a [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) for a MediaKeySystemAccess object.

-   [`Navigator.sendBeacon()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon)实验性

    Used to asynchronously transfer a small amount of data using [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) from the User Agent to a web server.

-   [`Navigator.share()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/share)实验性

    Invokes the native sharing mechanism of the current platform.

-   [`NavigatorID.taintEnabled()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/taintEnabled) 已弃用 实验性

    Returns `false`. JavaScript taint/untaint functions removed in JavaScript 1.2.

-   [`Navigator.vibrate()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/vibrate)

    Causes vibration on devices with support for it. Does nothing if vibration support isn't available.