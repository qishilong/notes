# Web Worker API

**Web Worker** 使得在一个独立于 Web 应用程序主执行线程的后台线程中运行脚本操作成为可能。这样做的好处是可以在独立线程中执行费时的处理任务，使主线程（通常是 UI 线程）的运行不会被阻塞/放慢。

## [Web Worker 概念与用法](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API#web_worker_概念与用法)

Worker 是一个使用构造函数创建的对象（例如 [`Worker()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker)），它运行一个具名 JavaScript 文件——该文件包含将在 worker 线程中运行的代码。

除了标准的 [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript) 函数集（如 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)、[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)、[`JSON`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON) 等），你可以在 worker 线程中运行任何你喜欢的代码，有一些例外：你不能直接在 worker 线程中操作 DOM 元素，或使用 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 对象中的某些方法和属性。有关你可以运行的代码的信息，请参见下面的 [Worker 全局上下文和函数](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API#worker_全局上下文和函数)和[支持的 Web API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API#支持的_web_api) 。

数据通过消息系统在 worker 和主线程之间发送——双方都使用 `postMessage()` 方法发送消息，并通过 `onmessage` 事件处理程序响应消息（消息包含在 [`message`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/message_event) 事件的 `data` 属性中）。数据是复制的，而不是共享的。

worker 可以依次生成新的 worker，只要这些 worker 与父页面托管在同一个 [origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin) 中。此外，worker 可以通过 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 来访问网络，但 `XMLHttpRequest` 的 `responseXML` 和 `channel` 属性始终返回 `null`。

### [Worker 类型](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API#worker_类型)

有许多不同类型的 worker：

-   专用 worker 是由单个脚本使用的 worker。该上下文由 [`DedicatedWorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/DedicatedWorkerGlobalScope) 对象表示。
-   [`Shared worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker) 是可以由在不同窗口、IFrame 等中运行的多个脚本使用的 worker ，只要它们与 worker 在同一域中。它们比专用的 worker 稍微复杂一点——脚本必须通过活动端口进行通信。
-   [Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 基本上是作为代理服务器，位于 web 应用程序、浏览器和网络（如果可用）之间。它们的目的是（除开其他方面）创建有效的离线体验、拦截网络请求，以及根据网络是否可用采取合适的行动并更新驻留在服务器上的资源。它们还将允许访问推送通知和后台同步 API。

**备注：** 根据 [web worker 规范](https://html.spec.whatwg.org/multipage/workers.html#runtime-script-errors-2)，worker 错误事件不应该冒泡（参见 [Firefox bug 1188141](https://bugzil.la/1188141)）。该规范已在 Firefox 42 中实现。

### [Worker 全局上下文和函数](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API#worker_全局上下文和函数)

worker 在一个与当前 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 不同的全局上下文中运行！虽然 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 不能直接用于 worker，但许多相同的方法被定义在一个共享的混入（`WindowOrWorkerGlobalScope`）中，并通过 worker 自己的 [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope) 衍生的上下文提供给它们：

-   [`DedicatedWorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/DedicatedWorkerGlobalScope) 用于专用 worker
-   [`SharedWorkerGlobalScope` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope) 用于共享 worker
-   [`ServiceWorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerGlobalScope) 用于 [service worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)

所有 worker 和主线程（来自 `WindowOrWorkerGlobalScope`）共有的一些函数（子集）是：

-   [`atob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/atob)
-   [`btoa()`](https://developer.mozilla.org/zh-CN/docs/Web/API/btoa)
-   [`clearInterval()`](https://developer.mozilla.org/zh-CN/docs/Web/API/clearInterval)
-   [`clearTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/clearTimeout)
-   [`dump()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/dump) 非标准
-   [`setInterval()`](https://developer.mozilla.org/zh-CN/docs/Web/API/setInterval)
-   [`setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout)

以下函数**仅**对 worker 可用：

-   [`WorkerGlobalScope.importScripts()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope/importScripts)（所有 worker）
-   [`DedicatedWorkerGlobalScope.postMessage` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage)（仅限专用 worker）

### [支持的 Web API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API#支持的_web_api)

**备注：** 如果列出的 API 被某一平台的特定版本所支持，那么一般可以认为它在 web worker 中是可用的。你也可以使用网站来测试对某个特定对象/函数的支持：https://worker-playground.glitch.me/

以下 Web API 对 worker 是可用的：

-   [`Barcode Detection API` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API)

-   [`Broadcast Channel API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API)

-   [`Cache API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache)

-   [`Channel Messaging API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API)

-   [`Console API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Console_API)

-   [Web Crypto API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Crypto_API)（例如 [`Crypto`](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto)）

-   [CSS Font Loading API](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Font_Loading_API)

-   [`CustomEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

-   [`Encoding API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Encoding_API)（例如 [`TextEncoder`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextEncoder)、[`TextDecoder`](https://developer.mozilla.org/zh-CN/docs/Web/API/TextDecoder)）

-   [`Fetch API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

-   [`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

-   [`FileReaderSync`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReaderSync)（仅在 worker 中有效！）

-   [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

-   [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData)

-   [`IndexedDB`](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

-   [Network Information API](https://developer.mozilla.org/zh-CN/docs/Web/API/Network_Information_API)

-   [`Notifications API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API)

-   `Performance API`

    ，包括：

    -   [`Performance`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)
    -   [`PerformanceEntry`](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceEntry)
    -   [`PerformanceMeasure` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMeasure)
    -   [`PerformanceMark` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceMark)
    -   [`PerformanceObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceObserver)
    -   [`PerformanceResourceTiming`](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceResourceTiming)

-   [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

-   [Server-sent 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events)

-   [`ServiceWorkerRegistration`](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerRegistration)

-   [`URL API`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL_API)（例如 [`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL)）

-   [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 与 [`OffscreenCanvas`](https://developer.mozilla.org/zh-CN/docs/Web/API/OffscreenCanvas)

-   [`WebSocket`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

-   [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

worker 也可以派生其他 worker，所以这些 API 也是可用的：

-   [`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)
-   [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope)
-   [`WorkerLocation` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation)
-   [`WorkerNavigator` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator)

## [Web Worker 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API#web_worker_接口)

-   [`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)

    表示正在运行的 worker 线程，允许你将信息传递到正在运行的 worker 程序代码。

-   [`WorkerLocation` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation)

    定义由 [`Worker`](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 执行的脚本的绝对位置。

-   [`SharedWorker`](https://developer.mozilla.org/zh-CN/docs/Web/API/SharedWorker)

    表示一种特定的 worker，可以从多个[浏览上下文](https://developer.mozilla.org/zh-CN/docs/Glossary/Browsing_context)（即窗口、标签或 iframe）甚至其他 worker 访问。

-   [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope)

    表示任意 worker 的通用作用域（对于正常的网页类容来说与 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 有相同的作用）。不同类型的 worker 都有从接口继承作用域对象，并且可以添加更多特定特性。

-   [`DedicatedWorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/DedicatedWorkerGlobalScope)

    表示一个专用 worker 的作用域，继承自 [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope)，且可添加一些特有的特性。

-   [`SharedWorkerGlobalScope` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope)

    表示一个共享 worker 的作用域，继承自 [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope)，且可添加一些特有的特性。

-   [`WorkerNavigator` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WorkerNavigator)

    表示用户代理（客户端）的身份和状态。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API#示例)

我们创建了几个演示来展示 Web Worker 的使用：

-   [基本的专用 worker 示例](https://github.com/mdn/dom-examples/tree/main/web-workers/simple-web-worker)（[运行专用 worker](https://mdn.github.io/dom-examples/web-workers/simple-web-worker/)）。
-   [基本的共享 worker 示例](https://github.com/mdn/dom-examples/tree/main/web-workers/simple-shared-worker)（[运行共享 worker](https://mdn.github.io/dom-examples/web-workers/simple-shared-worker/)）。
-   [OffscreenCanvas worker 示例](https://github.com/mdn/dom-examples/tree/main/web-workers/offscreen-canvas-worker)（[运行 OffscreenCanvas worker](https://mdn.github.io/dom-examples/web-workers/offscreen-canvas-worker/)）。

你可以在[使用 web worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers) 中找到有关这些演示是如何工作的更多信息。