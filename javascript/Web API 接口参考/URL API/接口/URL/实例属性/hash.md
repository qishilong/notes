# URL.hash 属性

[`URL`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL) 接口的 **`hash`** 属性是一个包含 URL 标识中的 `'#'` 和片段（fragment）标识符的字符串。

片段不会经过 [URL 解码](https://zh.wikipedia.org/wiki/百分号编码)。如果某个 URL 没有片段，该属性会包含一个空字符串——`""`。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 值

一个字符串。

## 示例

```
const url = new URL(
  "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href#示例",
);
console.log(url.hash); // 输出：'#%E7%A4%BA%E4%BE%8B'
```