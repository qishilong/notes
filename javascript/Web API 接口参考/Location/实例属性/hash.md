# Location: hash

[`Location`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 接口的 **`hash`** 属性返回一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，其中会包含 URL 标识中的 `'#'` 和 后面 URL 片段标识符。

这里 fragment 不会经过[百分比编码](https://developer.mozilla.org/zh-CN/docs/Glossary/Percent-encoding)（URL 编码）。如果 URL 中没有 fragment，该属性会包含一个空字符串，`""`

## 语法

```js
string = object.hash;
object.hash = string;
```

## 示例

```js
<a id="myAnchor" href="/zh-CN/docs/Location.href#Examples">Examples</a>
<script>
  var anchor = document.getElementById("myAnchor");
  console.log(anchor.hash); // 返回'#Examples'
</script>
```