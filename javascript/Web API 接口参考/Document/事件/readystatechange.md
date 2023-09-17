# Document: readystatechange 事件

当文档的 [`readyState`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readyState) 属性发生改变时，会触发 `readystatechange` 事件。

| 是否冒泡           | 否                                                           |
| :----------------- | ------------------------------------------------------------ |
| 是否可取消         | 否                                                           |
| 接口               | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) |
| Event handler 属性 | `onreadystatechange`                                         |

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readystatechange_event#示例)

### [实时演示](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/readystatechange_event#实时演示)

#### HTML

```html
<div class="controls">
  <button id="reload" type="button">Reload</button>
</div>

<div class="event-log">
  <label>Event log:</label>
  <textarea readonly class="event-log-contents" rows="8" cols="30"></textarea>
</div>
```

#### JS

```js
const log = document.querySelector('.event-log-contents');
const reload = document.querySelector('#reload');

reload.addEventListener('click', () => {
  log.textContent ='';
  window.setTimeout(() => {
      window.location.reload(true);
  }, 200);
});

window.addEventListener('load', (event) => {
    log.textContent = log.textContent + 'load\n';
});

document.addEventListener('readystatechange', (event) => {
    log.textContent = log.textContent + `readystate: ${document.readyState}\n`;
});

document.addEventListener('DOMContentLoaded', (event) => {
    log.textContent = log.textContent + `DOMContentLoaded\n`;
});
```

#### 结果

<iframe class="sample-code-frame" title="实时演示 sample" id="frame_实时演示" width="100%" height="160px" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/Document/readystatechange_event/_sample_.%E5%AE%9E%E6%97%B6%E6%BC%94%E7%A4%BA.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>