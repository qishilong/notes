# DOMTokenList

**`DOMTokenList`** 接口表示一组空格分隔的标记（tokens）。如由 [`Element.classList`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList)、[`HTMLLinkElement.relList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement/relList)、[`HTMLAnchorElement.relList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/relList) 或 [`HTMLAreaElement.relList` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAreaElement/relList) 返回的一组值。它和 JavaScript [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array) 对象一样，索引从 0 开始。`DOMTokenList` 总是区分大小写（case-sensitive）。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList#属性)

-   [`DOMTokenList.length`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/length) 只读

    一个整数，表示存储在该对象里值的个数。

-   [`DOMTokenList.value` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/value)

    该属性以 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的形式返回 **`DOMTokenList`** 列表的值。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList#方法)

-   [`DOMTokenList.item(index)`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/item)

    根据传入的索引值返回一个值，如果索引值大于等于符号列表的长度（`length`），则返回 `undefined` 或 `null`，在 Gecko 7.0 之前的版本中返回 `null`。

-   [`DOMTokenList.contains(token)`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/contains)

    如果 DOMTokenList 列表中包括相应的字符串 `token`，则返回 `true`，否则返回 `false`。

-   [`DOMTokenList.add(token1[, token2[, ...tokenN\]])`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/add)

    添加一个或多个标记（`token`）到 `DOMTokenList` 列表中。

-   [`DOMTokenList.remove(token1[, token2[, ...tokenN\]])`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/remove)

    从 `DOMTokenList` 列表中移除一个或多个标记（`token`）。

-   [`DOMTokenList.replace(oldToken, newToken)`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/replace)

    使用 `newToken` 替换 `token`_ 。_

-   [`DOMTokenList.supports(token)`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/supports)

    如果传入的 `token` 是相关属性（attribute）支持的标记，则返回 `true` 。

-   [`DOMTokenList.toggle(token [, force])`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/toggle)

    从 DOMTokenList 字符串中移除标记字串（`token`），并返回 `false`。如果传入的字串（`token`）不存在，则将其添加进去，并返回 `true` 。`force` 是一个可选的布尔值，如果传入 `true` ，且传入的 *`token`* 不存在，则将其添加进去并返回 `true` ，若传入的 _`token` _存在，则直接返回 `true` ；反之，如果传入 `false` ，则移除存在的 `token`，并返回 `false` ，如 `token` 不存在则直接返回 `false` 。

-   [`DOMTokenList.entries()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/entries)

    返回一个迭代器（[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)），以遍历这个对象中的所有键值对。

-   [`DOMTokenList.forEach(callback [, thisArg])` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/forEach)

    为每个 `DOMTokenList` 中的元素都调用一次传入的 `callback` 函数。

-   [`DOMTokenList.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/keys)

    返回一个迭代器（[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)）以遍历这个对象中所有键值对的键。

-   [`DOMTokenList.values()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/values)

    返回一个迭代器（[`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)）以遍历这个对象中所有键值对的值。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList#示例)

在下面这个简单的例子中，我们使用 [`Element.classList`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList) 获取了 [`<p>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 元素的 class 列表，也就是一个`DOMTokenList` ，再使用 [`DOMTokenList.add()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/add) 添加了一个 class，然后更新 `<p>` 元素的[`Node.textContent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)以显示这个新的 `DOMTokenList`。

### [HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList#html)

```html
<p class="a b c"></p>
```

### [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList#javascript)

```js
let para = document.querySelector("p");
let classes = para.classList;
para.classList.add("d");
para.textContent = `paragraph classList is "${classes}"`;
```

输出类似这样：

<iframe class="sample-code-frame" title="示例 sample" id="frame_示例" width="100%" height="60" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/DOMTokenList/_sample_.%E7%A4%BA%E4%BE%8B.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

## [去除空格和重复项目](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList#去除空格和重复项目)

修改 `DOMTokenList` 的方法（例如 [`DOMTokenList.add()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList/add)）会自动去除多余的空格（[Whitespace (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/Whitespace)）和列表中的重复项目。例如：

```html
<span class="    d   d e f"></span>
```

```js
let span = document.querySelector("span");
let classes = span.classList;
span.classList.add("x");
span.textContent = `span classList is "${classes}"`;
```

输出类似这样：

<iframe class="sample-code-frame" title="去除空格和重复项目 sample" id="frame_去除空格和重复项目" width="100%" height="60" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/DOMTokenList/_sample_.%E5%8E%BB%E9%99%A4%E7%A9%BA%E6%A0%BC%E5%92%8C%E9%87%8D%E5%A4%8D%E9%A1%B9%E7%9B%AE.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>