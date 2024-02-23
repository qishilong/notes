# 、ResizeObserver.disconnect()

[`ResizeObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver) 接口的 **`disconnect()`** 方法取消所有的对 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 或 [`SVGElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGElement) 目标的监听。

## 语法

```js
disconnect()
```

### 参数

无。

### 返回值

无（[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)）。

### 异常

无。

## 示例

```js
btn.addEventListener("click", () => {
  resizeObserver.disconnect();
});
```