# Node.nodeValue

[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 的 **`nodeValue`** 属性返回或设置当前节点的值。

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeValue#语法)

```js
str = node.nodeValue;
node.nodeValue = str;
```

value 是一个包含当前节点的值的字符串（如果有的话）。

### [值](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeValue#值)

对于文档节点来说，`nodeValue`返回`null`. 对于 text, comment，和 CDATA 节点来说，`nodeValue 返回该节点的文本内容`. 对于 attribute 节点来说，返回该属性的属性值。

下表就是不同类型的节点所返回的该属性的值。

| Node                                                         | Value of nodeValue |
| :----------------------------------------------------------- | :----------------- |
| [`CDATASection`](https://developer.mozilla.org/zh-CN/docs/Web/API/CDATASection) | CDATA 的文本内容   |
| [`Comment`](https://developer.mozilla.org/zh-CN/docs/Web/API/Comment) | 注释的文本内容     |
| [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) | null               |
| [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) | null               |
| [`DocumentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentType) | null               |
| [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) | null               |
| [`NamedNodeMap`](https://developer.mozilla.org/zh-CN/docs/Web/API/NamedNodeMap) | null               |
| `EntityReference`                                            | null               |
| `Notation`                                                   | null               |
| [`ProcessingInstruction` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction) | 整个标签的文本内容 |
| [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) | 文本节点的内容     |

如果 `nodeValue` 的值为 `null`,则对它赋值也不会有任何效果。