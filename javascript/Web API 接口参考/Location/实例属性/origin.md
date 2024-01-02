# Location: origin

`Location` 接口的 `origin` 只读属性是一个字符串，其中包含所表示 URL 的来源的 Unicode 序列化。

 那是：

-   对于使用 `http` or `https` 的 URL，方案后跟 ，后跟域，后跟 `'://'` `':'` ，后跟端口（默认端口， `80` 如果 `443` 明确指定，则分别为默认端口）;
-   对于 URL using `file:` scheme，该值取决于浏览器;
-   对于使用方案的 `blob:` URL，URL 的来源如下 `blob:` 。例如， `"blob:https://mozilla.org"` 将有 `"https://mozilla.org".`

注意：此功能在 Web Workers 中可用

## 返回值

 一个字符串。

## 示例

```js
// On this page, returns the origin
const result = window.location.origin; // Returns:'https://developer.mozilla.org'
```