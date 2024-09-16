# decodeURI()

**`decodeURI()`** 函数能解码由[`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 创建或其他流程得到的统一资源标识符（URI）。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/globalprops-decodeuri.html" title="MDN Web Docs Interactive Example" allow="clipboard-write" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 765.711px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
decodeURI(encodedURI)
```

### 参数

- [`encodedURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI#encodeduri)

  一个完整的编码过的 URI

### 返回值

返回一个给定编码统一资源标识符 (URI) 的未编码版本的新字符串。

### 异常

当`encodedURI` 包含无效字符序列时，引发[`URIError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError)（“格式错误的 URI 序列”）异常。

## 描述

将已编码 URI 中所有能识别的转义序列转换成原字符，但不能解码那些不会被 [`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 编码的内容（例如 "`#`"）。

## 示例

### 解码一个西里尔字母（Cyrillic）URL

```js
decodeURI(
  "https://developer.mozilla.org/ru/docs/JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B",
);
// "https://developer.mozilla.org/ru/docs/JavaScript_шеллы"
```

### 捕捉异常

```js
try {
  var a = decodeURI('%E0%A4%A');
} catch(e) {
  console.error(e);
}

// URIError: malformed URI sequence
```