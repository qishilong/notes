# Exparser设计原理

本章主要包含以下内容：

- WebComponent原理
- Custom Element原理
- ShadowDOM思想
- Exparser原理



## 什么是WebComponent?

`WebComponent` 汉语直译过来第一感觉是web组件的意思，但是它只是一套规则、一套API。你可以通过这些API创建自定义的新的组件，并且组件是可以重复使用的，封装好的组件可以在网页和Web应用程序中进行使用。

当前的前端开发环境，Vue、React等都基于组件化开发的形式，但是他们的组件生态并不互通，如果你有过两个框架的开发经验的话，你应该知道最烦恼的就是两个框架的UI组件表现不一致的问题。

我们抽离组件为了提高复用率，提升开发效率。但是脱离了像`Vue、React`这样的框架后，你会发现，原生JS难道就不能开发自定义组件吗？`WebComponent`就是为了解决这个问题。

换一个角度来说，并不是所有的业务场景都需要`Vue\React`这样的框架进行开发、也并是都需要工程化。很多业务场景我们需要原生JS、HTML。

言归正传，`WebComponent`实现的组件可以和HTML原生标签一起使用，有了这个概念之后，我们看一下它的具体表现形式是怎样的。

```html
<body>
  <custom-component></custom-component>
</body>
```

上面我们看到`<body>`标签还是我们熟悉的标签，但是`<custom-component>`标签就是自定义组件的标签了，它不属于html语义化标签中的任何一个，是自定义的。

接下来我们从这个简单的DEMO入手，对`WebComponent`进行了解。首先就是三大规范：

- Custom Elements规范
- Template规范
- Shadow DOM规范

> MDN：https://developer.mozilla.org/zh-CN/docs/Web/Web_Components



### Custom Element

所谓自定义元素，即当内置元素无法为问题提供解决方案时，自己动手来创建一个自定义元素来解决，上方的`<custom-component>`就是我们手动创建的自定义元素。

元素的状态是指定义该元素（或者叫做升级该元素）时元素状态的改变，升级过程是异步的。 元素内部的状态有：

- `undefined` 未升级：即自定义元素还未被define。
- `failed` 升级失败：即define过了也实例化过了，但失败了。会自动按HTMLUnknownElement类来实例化。
- `uncustomized` 未定制化：没有define过但却被实例化了，会自动按HTMLUnknownElement类来实例化。
- `custom` 升级成功：define过并且实例化成功了。

接下来我们来看一个示例：

```html
<custom-component></custom-component>
```

```css
.custom-style{
  display: inline-block;
  padding: 15px;
  border: 1px solid red;
  border-radius: 4px;
  color: red;
}
```

```js
// 定义自定义组件
class CustomComponent extends HTMLElement {
  constructor() {
    super();

    const box = document.createElement("div");
    box.className = "custom-style";

    const text = document.createElement("p");
    text.innerText = "这是一个自定义组件";

    box.appendChild(text);

    this.appendChild(box);
  }
}
window.customElements.define("custom-component", CustomComponent);
```

效果如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-014800.png" alt="image-20230215094800286" style="zoom:50%;" />

首先可以看出，需要有个类的概念。自定义元素类必须继承自window内置的`HTMLElement`类。

然后在`constructor`中定义类一些标记模版，定义模板后，执行`this.appendChild`，其中`this`指向了当前类实例。

最后将自定义组件挂载到`customElements`上，通过`window.customElements.define`方法。这个时候注意了，需要给自定义组件起一个名字，可以看到上面例子中我起的名字为`custom-component`。起名字是有规则的，规则如下：

- 自定义元素的名称，**必须**包含短横线（-）。它可以确保html解析器能够区分常规元素和自定义元素，还能确保html标记的兼容性。
- 自定义元素只能一次定义一个，一旦定义无法撤回。
- 自定义元素不能单标记封闭。比如`<custom-component />`，必须写一对开闭标记。比如 `<custom-component></custom-component>`。

对于自定义组件挂载的相关API：

- `window.customElement.define('custom-component', CustomComponent, extendsInit)` // 定义一个自定义元素
- `window.customElement.get('custom-component')` // 返回已定义的自定义元素的构造函数
- `window.customElement.whenDefined('custom-component')` // 接收一个promise对象，是当定义自定义元素时返回的，可监听元素状态变化但无法捕捉内部状态值。

其中`window.customElement.whenDefined`方法监听的元素状态为上述讲解的四种元素状态中的： `failed`升级失败和`custom`升级成功。



这里有个问题，我们demo里的dom结构比较简单，所以我们通过`document.createElement`、`appendChild`方法进行构建还不算复杂，如果dom结构很复杂的组件怎么办呢？一顿使用createElement也不是个办法。这个时候我们就要引入`<template>`标记了。



### Template

`Web Components API` 提供了`<template>`标签，可以在它里面使用HTML定义DOM结构。这样的话我们改版一下我们的自定义组件：

```html
<custom-component></custom-component>

<template id="constomCompinentTemplate">
  <div class="custom-style">
    <p>这是一个自定义组件</p>
  </div>
</template>
```

```js
// 定义自定义组件
class CustomComponent extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("constomCompinentTemplate");
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}
window.customElements.define("custom-component", CustomComponent);
```

这里有两个需要考虑的地方：

1. 这里因为是demo演示所以把`<template>`标签写在了一起，其实可以用脚本把`<template>`注入网页。这样的话，JavaScript 脚本跟`<template>`就能封装成一个 JS 文件，成为独立的组件文件。网页只要加载这个脚本，就能使用`<custom-component>`组件。
2. `<template>`标签内的节点进行操作必须通过`template.content`返回的节点来操作。因为这里获取的`template`并不是一个正常的DOM结构，在控制台打印一下`template.content`得到的结果是`#document-fragment`。它其实是`DocumentFragment`节点，里面才是真正的结构。而且这个模板还要留给其他实例使用，所以不能直接移动它的子元素



在 Vue 和 React 中使用组件时，我们经常涉及到 props 的传递，例如：

```html
<custom-component></custom-component>
<custom-component text="显示这个文本"></custom-component>
```

传入自定义的文本text，如果有text内容那么就展示text，如果没有，那么展示默认值。

```html
<template id="constomCompinentTemplate">
  <style>
    .custom-style {
      display: inline-block;
      padding: 15px;
      border: 1px solid red;
      border-radius: 4px;
      color: red;
    }
  </style>
  <div class="custom-style">
    <p class="component-text">这是一个自定义组件</p>
  </div>
</template>
```

```js
// 定义自定义组件
class CustomComponent extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById("constomCompinentTemplate");
    const content = template.content.cloneNode(true);

    // 从 this 上获取 text 属性，如果有值就赋值给 content
    const textValue = this.getAttribute("text");
    if(textValue){
      content.querySelector(".component-text").innerHTML = textValue;
    }

    this.appendChild(content);
  }
}
window.customElements.define("custom-component", CustomComponent);
```

你看，这样之后就可以传入参数了，但是我们平常使用组件的时候是可以嵌套的，我们不仅仅需要参数注入的形式，还需要嵌套的children形式。继续修改自定义组件。



#### slot

WebComponent有一个slot概念，插槽，提供了一个“缺口”让给需要嵌套的dom。用法和Vue是比较相似的，例如：

```html
<custom-component>
  <p slot="my-text">这是插入的内容！</p>
</custom-component>
<custom-component text="显示这个文本"></custom-component>
<p class="custom-style">这是一个测试</p>

<template id="constomCompinentTemplate">
  <style>
    .custom-style {
      display: inline-block;
      padding: 15px;
      border: 1px solid red;
      border-radius: 4px;
      color: red;
    }
  </style>
  <div class="custom-style">
    <p class="component-text">这是一个自定义组件</p>
    <slot name="my-text">插槽默认内容</slot>
  </div>
</template>
```

```js
// 定义自定义组件
class CustomComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "closed" });

    const template = document.getElementById("constomCompinentTemplate");
    const content = template.content.cloneNode(true);

    // 从 this 上获取 text 属性，如果有值就赋值给 content
    const textValue = this.getAttribute("text");
    if (textValue) {
      content.querySelector(".component-text").innerHTML = textValue;
    }

    shadow.appendChild(content);
  }
}
window.customElements.define("custom-component", CustomComponent);
```

在上面的代码中，我们使用到了 slot 插槽，代码本身比较容易理解，但是注意我们这边还引入了一个新的东西，就是 shadow，这也是 webcomponents 的三大特性之一，shadow DOM中的结构是与外界隔离的，外界是无法获取到内部dom的，它可以理解为一颗单独的dom树，隐藏的dom树。因此组件内部的样式也和外界完全隔离，即使下面的 p 也使用了 custom-style 的类名。

有关shadow DOM将会在后面具体进行介绍。



#### 事件

有了参数之后不能离开事件Event，对吧，我们想添加一个文本的点击事件。继续来改造升级。

```js
// 定义自定义组件
class CustomComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "closed" });

    const template = document.getElementById("constomCompinentTemplate");
    const content = template.content.cloneNode(true);

    // 从 this 上获取 text 属性，如果有值就赋值给 content
    const textValue = this.getAttribute("text");
    const textDOM = content.querySelector(".component-text");
    if (textValue) {
      textDOM.innerHTML = textValue;
    }

    // 绑定事件
    textDOM.addEventListener("click", (e) => {
      e.stopPropagation();
      alert("Hello Web Components");
    });

    shadow.appendChild(content);
  }
}
window.customElements.define("custom-component", CustomComponent);
```

在上面的demo中，我们为里面的 p 元素绑定了一个点击事件，并且使用了`e.stopPropagation()`方法阻止了事件冒泡。

这里有个知识点，自定义事件 `new Event()`中，options有几个参数可以设置冒泡行为方式，其中就有关于`Shadow DOM`的。我们来看一下：

```js
var options = {
  detail : {
    ...
  },
  composed: false, // Boolean 类型，默认值为 false，指示事件是否会在 ShadowDOM 根节点之外触发侦听器
  bubbles: true, // Boolean 类型，默认值为 false，表示该事件是否冒泡
  canceable: false // Boolean 类型，默认值为 false，表示该事件是否能被取消
}
var myEvent = new CustomEvent(eventname, options);
```



### Shadow DOM

Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。

![image-20230215104608599](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-024609.png)

把本来DOM树中的一部分封装起来，并且隐藏起来，隐藏起来的树概念为Shadow Tree。把它理解成DOM上一棵特殊的子树，称之为shadow tree或影子树。也是树，但是很特殊，树里面也是DOM，就像我们上面用document.createElement创建的DOM一样。

影子树的根节点，我们称之为`shadow root`或`影子根`。

影子根的父节点，我称之为宿主`shadow host`

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-025037.png" alt="image-20230215105036312" style="zoom:50%;" />

在自定义元素中，里面的结构已经变成了Shadow DOM。顺带说下`attachShadow`中的mode参数有两种值“open”、“closed”；

- `open`： 表示可以通过页面内的 JavaScript 方法来获取 Shadow DOM，例如使用 Element.shadowRoot 属性：

```javascript
let myShadowDom = myCustomElem.shadowRoot;
```

- `closed`： 那么就不可以从外部获取`Shadow DOM了`。`myCustomElem.shadowRoot` 将会返回 null



ShadowDOM的概念在HTML中非常常见，举一个例子，在 HTML 中有 Video 标签

```html
<video 
 src="http://maoyan.meituan.net/movie/videos/854x4804c109134879943f4b24387adc040504b.mp4"
 controls
 width="500"
></video>
```

当我们使用该标签渲染一个视频的时候，会发现页面中会呈现出来一个完整的播放器，里面有播放视频的进度条、播放按钮、音量调节等。明明只有一个标签，为什么内部有如此丰富的内容呢？

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-030726.png" alt="image-20230215110726053" style="zoom:50%;" />

打开控制台查看结构时，看到的也仅仅是一个 video 标签而已，我们可以打开控制台的【设置】，勾选上【显示用户代理Shadow DOM】

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-031137.png" alt="image-20230215111137642" style="zoom:50%;" />

之后就可以看到在 video 中的 shadowDOM了

![image-20230215111304144](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-031304.png)

因此，像img、button、input、textarea、select、radio、checkbox，video等等这些标签是不可以作为宿主的，因为它们本身内部就已经有shadowDOM了。



## Exparser框架原理

`Exparser`是微信小程序的组件组织框架，内置在小程序基础库中，为小程序提供各种各样的组件支撑。内置组件和自定义组件都有Exparser组织管理。

有关`Exparser`可参阅官网：*https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0000aac998c9b09b00863377251c0a*

---

-*EOF*-



