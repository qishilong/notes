# decodeURIComponent()

**`decodeURIComponent()`** 方法用于解码由 [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 方法或者其他类似方法编码的部分统一资源标识符（URI）。

## 语法

```js
decodeURIComponent(encodedURI)
```

### 参数

- [`encodedURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent#encodeduri)

  编码后的部分 URI

### 返回值

一个解码后的统一资源标识符（URI）字符串，处理前的 URI 经过了给定格式的编码。

### 异常

当该方法使用不当时，将会抛出一个[`URIError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError)（“格式错误的 URI 序列”）异常。

## 描述

将已编码 URI 中所有能识别的转义序列转换成原字符。

## 示例

### 解码一个西里尔字母的 URL

```js
decodeURIComponent("JavaScript_%D1%88%D0%B5%D0%BB%D0%BB%D1%8B");
// "JavaScript_шеллы"
```

### 捕捉异常

```js
try {
  var a = decodeURIComponent("%E0%A4%A");
} catch (e) {
  console.error(e);
}

// URIError: malformed URI sequence
```