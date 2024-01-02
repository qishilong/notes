# URL.revokeObjectURL()

**`URL.revokeObjectURL()`** 静态方法用来释放一个之前已经存在的、通过调用 [`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static) 创建的 URL 对象。当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。

你可以在 `sourceopen` 被处理之后的任何时候调用 `revokeObjectURL()`。这是因为 `createObjectURL()` 仅仅意味着将一个媒体元素的 `src` 属性关联到一个 [`MediaSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource) 对象上去。调用`revokeObjectURL()` 使这个潜在的对象回到原来的地方，允许平台在合适的时机进行垃圾收集。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 语法

```js
window.URL.revokeObjectURL(objectURL);
```

### 参数

-   [`objectURL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL_static#objecturl)

    一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，表示通过调用 [`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static) 方法产生的 URL 对象。

### 返回值

undefined

## 示例

查看[使用对象 URL 显示图片](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications#example.3a_using_object_urls_to_display_images)。