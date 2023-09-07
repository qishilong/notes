# Window: hashchange event

当 URL 的片段标识符更改时，将触发**hashchange**事件 (跟在＃符号后面的 URL 部分，包括＃符号)

| Bubbles       | Yes                                                          |
| :------------ | ------------------------------------------------------------ |
| Cancelable    | No                                                           |
| Interface     | [`HashChangeEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/HashChangeEvent) |
| Event handler | [`onhashchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event) |

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event#示例)

你可以在 [`addEventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 方法中使用 `hashchange` 事件：

```js
window.addEventListener('hashchange', function() {
  console.log('The hash has changed!')
}, false);
```

或使用 `onhashchange` 事件处理程序属性：

```js
function locationHashChanged() {
  if (location.hash === '#cool-feature') {
    console.log("You're visiting a cool feature!");
  }
}

window.onhashchange = locationHashChanged;
```