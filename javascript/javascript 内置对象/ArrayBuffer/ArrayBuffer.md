# ArrayBuffer

**`ArrayBuffer`** 对象用来表示通用的、固定长度的原始二进制数据缓冲区。

它是一个字节数组，通常在其他语言中称为“byte array”。你不能直接操作 `ArrayBuffer` 中的内容；而是要通过[类型化数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)或 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView) 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

[`ArrayBuffer()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/ArrayBuffer) 构造函数创建一个以字节为单位的给定长度的新 `ArrayBuffer`。你也可以从现有的数据（例如，从 [Base64](https://developer.mozilla.org/zh-CN/docs/Glossary/Base64) 字符串或者[从本地文件](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsArrayBuffer)）获取数组缓冲区。

`ArrayBuffer` 是一个[可转移对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Transferable_objects)。

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer#构造函数)

-   [`ArrayBuffer()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/ArrayBuffer)

    创建一个新的 `ArrayBuffer` 对象。

## [静态属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer#静态属性)

-   [`get ArrayBuffer[@@species\]`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/@@species)

    用于创建派生对象的构造函数。

## [静态方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer#静态方法)

-   [`ArrayBuffer.isView()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView)

    如果 `arg` 是 ArrayBuffer 视图之一，则返回 `true`，例如[类型化数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)或者[`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)。否则返回 `false`。

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer#实例属性)

-   `ArrayBuffer.prototype[@@toStringTag]`

    [`@@toStringTag`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值是 `"ArrayBuffer"` 字符串。该属性在 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 中被使用。

-   [`ArrayBuffer.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength)

    `ArrayBuffer` 的只读大小（以字节为单位）。这是在数组构建时确定的，无法更改。

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer#实例方法)

-   [`ArrayBuffer.prototype.slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/slice)

    返回一个新的 `ArrayBuffer`，它的内容是该 `ArrayBuffer` 从 `begin`（包括）到 `end`（不包括）字节的拷贝。如果 `begin` 或 `end` 是负数，它则指的是从数组末尾开始的索引，而不是从头开始的索引。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer#示例)

### [创建 ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer#创建_arraybuffer)

下面的例子创建了一个 8 字节的缓冲区，并使用 [`Int32Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Int32Array) 视图引用它。

```js
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
```