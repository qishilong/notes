# URL.createObjectURL()

**`URL.createObjectURL()`** 静态方法会创建一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，其中包含一个表示参数中给出的对象的 URL。这个 URL 的生命周期和创建它的窗口中的 [`document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 绑定。这个新的 URL 对象表示指定的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

**备注：** 此特性在 [Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 中不可用，因为它有可能导致内存泄漏。

## 语法

```
objectURL = URL.createObjectURL(object);
```

### 参数

-   [`object`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static#object)

    用于创建 URL 的 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 对象、[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象或者 [`MediaSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource) 对象。

### 返回值

一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)包含了一个对象 URL，该 URL 可用于指定源 `object`的内容。

## 示例

查看[使用对象 URL 显示图片](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications#example.3a_using_object_urls_to_display_images).

## 附注

### 内存管理

在每次调用 `createObjectURL()` 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 [`URL.revokeObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL_static) 方法来释放。

浏览器在 document 卸载的时候，会自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

### 使用相对 URLs 作为媒体流

在旧版本的媒体资源规范中，添加流作为[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video)元素需要创建一个关于 [`MediaStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream)的对象 URL。现已没必要这样做了，浏览器已经移除了该操作的支持。

**警告：** 如果你为了去添加流作为媒体元素，而仍旧使用着依赖[`createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static) 的代码，你需要更新的代码，仅需要设定[`srcObject`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/srcObject) 到 `MediaStream` 即可。