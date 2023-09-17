# nodeValue

## 语法

```js
// 获取
const str = Element.childNodes[0].nodeValue;
// 赋值
Element.childNodes[0].nodeValue = value;
```

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

## 例子1

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <p>
        文本
    </p>
    <script>
        const element = document.getElementsByTagName('p')[0];
        const nodeValue = element.childNodes[0].nodeValue;
        console.log(nodeValue)
        
    // 文本

        // 会将换行和空格也打印出来
        // Node 的 nodeValue 属性返回或设置当前节点的值。
    </script>
</body>

</html>
```

## 例子2

```html
<!DOCTYPE html>
<html>
<body>
<h1>The Element Object</h1>
<h2>The nodeValue Property</h2>

<button>Try it</button>

<p>The node value of the first button element is:</p>
<p id="demo"></p>

<script>
const element = document.getElementsByTagName("button")[0];
let value = element.childNodes[0].nodeValue;  
document.getElementById("demo").innerHTML = value;
</script>

</body>
</html>

```

<img src="https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306030909462.png" alt="image-20230603090904430"  />