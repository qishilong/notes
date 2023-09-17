# DocumentFragment

**`DocumentFragment`**，文档片段接口，表示一个没有父对象的最小文档对象。

它被作为一个轻量版的 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 使用，就像标准的 document 一样，存储由节点（nodes）组成的文档结构。与 document 相比，最大的区别是它不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的[重新渲染](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)，且不会对性能产生影响。

![image-20230603081917678](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306030819555.png)

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment#构造函数)

-   [`DocumentFragment()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment/DocumentFragment)

    创建并返回一个新的 `DocumentFragment` 对象。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment#属性)

*该接口没有特殊的属性，其属性都继承自 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node)。*

-   [`DocumentFragment.childElementCount` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/childElementCount) 只读

    返回所有属于 `DocumentFragment` 的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 类型的子对象。

-   [`DocumentFragment.children` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/children) 只读

    返回一个实时的 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)，其中包含了所有属于 `DocumentFragment` 的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 类型的子对象。

-   [`ParentNode.firstElementChild` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild) 只读

    返回 `DocumentFragment` 的第一个 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 类型的子对象，如果没有则返回 `null`。

-   [`ParentNode.lastElementChild` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Element/lastElementChild) 只读

    返回 `DocumentFragment` 的最后一个 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 类型的子对象，如果没有则返回 `null`。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment#方法)

*该接口继承 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 的全部方法。*

-   [`DocumentFragment.append()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/append)

    在文档片段的最后一个子对象后插入一组 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 或字符串对象。

-   [`DocumentFragment.prepend()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/prepend)

    在文档片段的第一个元素前插入一组 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 或字符串对象。

-   [`DocumentFragment.querySelector()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment/querySelector)

    返回在 `DocumentFragment` 中以文档顺序排列的第一个符合指定选择器的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 节点。

-   [`DocumentFragment.querySelectorAll()`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment/querySelectorAll)

    返回在 `DocumentFragment` 中所有的符合指定选择器的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 节点组成的 `NodeList` 数组。

-   [`DocumentFragment.getElementById()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment/getElementById)

    返回在 `DocumentFragment` 中以文档顺序排列的第一个符合指定 ID 选择器的 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 节点。与 `Document.getElementById()` 作用相同。

## [使用说明](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment#使用说明)

最常用的方法是使用 `DocumentFragment` 创建并组成一个 DOM 子树，然后使用 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 接口方法（如：[`appendChild()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild) 或 [`insertBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore)）将其插入到 DOM 中。这种情况下会插入片段的所有子节点，并留下一个空的 `DocumentFragment`。因为所有的节点会被一次插入到文档中，所以仅会发生一个重渲染的操作，而不是每个节点分别被插入到文档中从而发生多次重渲染的操作。

该接口在 Web 组件（Web components）中也非常有用：[` 元素在其 [`HTMLTemplateElement.content`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTemplateElement/content) 属性中包含了一个 `DocumentFragment`。

可以使用 [`document.createDocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment) 方法或者构造函数来创建一个空的 `DocumentFragment`。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment#示例)

### [HTML](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment#html)

```html
<ul id="list"></ul>
```

### [JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment#javascript)

```javascript
const list = document.querySelector('#list')
const fruits = ['Apple', 'Orange', 'Banana', 'Melon']

const fragment = new DocumentFragment()

fruits.forEach((fruit) => {
  const li = document.createElement('li')
  li.textContent = fruit
  fragment.appendChild(li)
})

list.appendChild(fragment)
```