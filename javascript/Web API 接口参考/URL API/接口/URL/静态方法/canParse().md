# URL: canParse() 静态方法

`URL.canParse()` 接口的 `URL` 静态方法返回一个布尔值，指示绝对 URL 或与基本 URL 组合的相对 URL 是否可解析且有效。

这是一种快速且简单的替代方法，可在 try...catch 块中构建 `URL` 。对于 `URL()` 构造函数会成功的值，它会返回 `true` ，对于会导致构造函数引发异常的值，它会返回 `false` 。

##  语法

```
URL.canParse(url)
URL.canParse(url, base)
```

###  参数

-   [`url`](https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static#url)

    字符串或任何具有字符串化器的其他对象（例如， `<a>` 或 `<area>` 元素），表示绝对 URL 或相对 URL。如果 `url` 是相对 URL，则 `base` 是必需的，并且将用作基本 URL。如果 `url` 是绝对 URL，则会忽略给定的 `base` 。

-    `base` 可选

    一个字符串，表示在 `url` 是相对 URL 时要使用的基本 URL。如果未指定，则默认为 `undefined` 。

注意： `url` 和 `base` 参数将分别从你传递的任何值进行字符串化，就像其他接受字符串的 Web API 一样。特别是，你可以对任一参数使用现有的 `URL` 对象，它将被字符串化为对象的 `href` 属性。

###  返回值

`true` 如果 URL 可以解析且有效； `false` 否则。

##  示例

此实时示例演示如何对几个不同的绝对和相对 URL 值使用 `URL.canParse()` 静态方法。

示例的第一部分定义一个 HTML `<pre>` 元素以进行日志记录，以及一个日志记录方法 `log()` 。

```
<pre id="log"></pre>
```

```
const logElement = document.getElementById("log");
function log(text) {
  logElement.innerText += `${text}\n`;
}
```

接下来，我们使用条件 `"canParse" in URL` 检查是否支持 `URL.canParse()` 方法。如果支持该方法，我们将记录检查绝对 URL、没有基本 URL 的相对 URL 和具有有效基本 URL 的相对 URL 的结果。我们还将记录不支持 `URL.canParse()` 的情况。

```
if ("canParse" in URL) {
  log("Test valid absolute URL");
  let url = "https://developer.mozilla.org/";
  let result = URL.canParse(url);
  log(` URL.canParse("${url}"): ${result}`);

  log("\nTest relative URL with no base URL");
  url = "/en-US/docs";
  result = URL.canParse(url);
  log(` URL.canParse("${url}"): ${result}`);

  log("\nTest relative URL with valid base URL");
  let baseUrl = "https://developer.mozilla.org/";
  result = URL.canParse(url, baseUrl);
  log(` URL.canParse("${url}","${baseUrl}"): ${result}`);
} else {
  log("URL.canParse() not supported");
}
```

最后，下面的代码显示 `baseUrl` 不必是字符串。此处我们传递了一个 `URL` 对象。

```
if ("canParse" in URL) {
  log("\nTest relative URL with base URL supplied as a URL object");
  let baseUrl = new URL("https://developer.mozilla.org/");
  let url = "/en-US/docs";
  result = URL.canParse(url, baseUrl);
  log(` URL.canParse("${url}","${baseUrl}"): ${result}`);
}
```

每个检查的结果如下所示。

<iframe class="sample-code-frame" title="Examples sample" id="frame_examples" width="100%" height="200" src="https://live.mdnplay.dev/en-US/docs/Web/API/URL/canParse_static/runner.html?id=examples" loading="lazy" style="box-sizing: content-box; border-top: none; border-right-color: ; border-right-style: ; border-right-width: ; border-bottom-color: ; border-bottom-style: ; border-bottom-width: ; border-left-color: ; border-left-style: ; border-left-width: ; border-image-source: ; border-image-slice: ; border-image-width: ; border-image-outset: ; border-image-repeat: ; max-width: 100%; width: calc(100% - 2rem - 2px); background: rgb(255, 255, 255); border-top-left-radius: 0px; border-top-right-radius: 0px; border-bottom-right-radius: ; border-bottom-left-radius: ; padding: 1rem; margin-top: 0px;"></iframe>