# URL

**`URL`** 接口用于解析，构造，规范化和编码 [URL](https://developer.mozilla.org/zh-CN/docs/Glossary/URL)。它通过提供允许你轻松阅读和修改 URL 组件的属性来工作。通常，通过在调用 URL 的构造函数时将 URL 指定为字符串或提供相对 URL 和基本 URL 来创建新的 URL 对象。然后，你可以轻松读取 URL 的已解析组成部分或对 URL 进行更改。

如果浏览器尚不支持[`URL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL)构造函数，则可以使用[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)中的[`Window.URL` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/URL)属性。确保检查你的任何目标浏览器是否要求对此添加前缀。

**备注：** 此特性在 [Web Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API) 中可用

## 构造器

-   [`new URL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/URL)

    创建并返回一个`URL`对象，该 URL 对象引用使用绝对 URL 字符串，相对 URL 字符串和基本 URL 字符串指定的 URL。

## 属性

-   [`hash`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/hash)

    包含`'#'`的[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，后跟 URL 的片段标识符。

-   [`host`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/host)

    一个[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，其中包含域（即主机名），后跟（如果指定了端口）“：”和 URL 的端口。

-   [`hostname`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/hostname)

    包含 URL 域名的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

-   [`href`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href)

    包含完整 URL 的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

-   [`origin`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/origin) 只读

    返回一个包含协议名、域名和端口号的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

-   [`password`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/password)

    包含在域名前面指定的密码的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 。

-   [`pathname`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/pathname)

    以 '/' 起头紧跟着 URL 文件路径的 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

-   [`port`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/port)

    包含 URL 端口号的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

-   [`protocol`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/protocol)

    包含 URL 协议名的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，末尾带 `':'`。

-   [`search`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/search)

    一个[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) ，指示 URL 的参数字符串；如果提供了任何参数，则此字符串包括所有参数，并以开头的“？”开头 字符。

-   [`searchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/searchParams) 只读

    [`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)对象，可用于访问`search`中找到的各个查询参数。

-   [`username`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/username)

    包含在域名前面指定的用户名的 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。

## 方法

-   [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/toString)

    返回包含整个 URL 的[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。它是[`URL.href`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href)的同义词，尽管它不能用于修改值。

-   [`toJSON()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/toJSON)

    返回包含整个 URL 的[`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)。它返回与`href`属性相同的字符串。

## 静态方法

-   [`createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static)

    返回一个[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) ，包含一个唯一的 blob 链接（该链接协议为以 blob:，后跟唯一标识浏览器中的对象的掩码）。

-   [`revokeObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL_static)

    销毁之前使用[`URL.createObjectURL()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL_static)方法创建的 URL 实例。

## 使用说明

如果`url`参数是相对 URL，则构造函数将使用`url`参数和可选的`base`参数作为基础。

```
const url = new URL('../cats', 'http://www.example.com/dogs');
console.log(url.hostname); // "www.example.com"
console.log(url.pathname); // "/cats"
```

可以设置 URL 属性以构造 URL：

```
url.hash = 'tabby';
console.log(url.href); // "http://www.example.com/cats#tabby"
```

URL 根据 [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986)中的规则进行编码。例如：

```
url.pathname = 'démonstration.html';
console.log(url.href); // "http://www.example.com/d%C3%A9monstration.html"
```

[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)接口可用于构建和处理 URL 查询字符串。

要从当前窗口的 URL 获取搜索参数，可以执行以下操作：

```
// https://some.site/?id=123
const parsedUrl = new URL(window.location.href);
console.log(parsedUrl.searchParams.get("id")); // "123"
```

URL 的[`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/toString)方法仅返回[`href`](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/href) 属性的值，因此构造函数可以 用于直接对 URL 进行规范化和编码。

```
const response = await fetch(new URL('http://www.example.com/démonstration.html'));
```