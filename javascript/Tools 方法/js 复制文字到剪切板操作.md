## JS复制文字到剪切板的极简实现及扩展

### 一、execCommand方法

复制一段文字内容实现的老牌方法就是 `document.execCommand` 方法了，示意：

```javascript
document.execCommand('copy', true);
```

且兼容性超级棒，如下截图：

![execCommand兼容性](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202304202141194.png)

是不是大有大结局 happy ending 的感觉？

别急，`execCommand()` 并没有表面看上去的那么美好。

#### 1. 执行有限制

首先，必须文字内容选中，再执行 `execCommand()` 方法才有效，如何让文字选中呢？

通常做法是放在一个 `<input>` 或者 `<textarea>` 元素中，然后让这个输入框元素选中，示意如下：

```csharp
textarea.select();
// 执行复制
document.execCommand('copy', true);
```

但是，实际开发，怎么可能让你在页面上塞一个输入框呢？

所以，通常做法是创建一个隐藏的输入框，赋值，选中，然后复制。

```javascript
// 创建输入框
var textarea = document.createElement('textarea');
document.body.appendChild(textarea);
// 隐藏此输入框
textarea.style.position = 'absolute';
textarea.style.clip = 'rect(0 0 0 0)';
// 赋值
textarea.value = '复制的文本内容...';
// 选中
textarea.select();
// 复制
document.execCommand('copy', true);
```

还没完，有时候，输入框可能不在页面的可视区域之内，此时执行 `textarea.select()` 方法会触发浏览器默认的控件跳转行为，也就是页面会触发滚动行为进行重定位。

所以，创建的文本域务必要保证在屏幕区域内，否则复制行为执行的时候，会出现意料之外的体验问题（可以使用固定定位解决）。

#### 2. 性能隐患

其次，就算复制功能实现了，性能也是个需要留意的问题。

日常开发，我们需要复制的内容一般是一段口令，一个链接，内容信息并不大，使用 `execCommand()` 方法完全没问题，是无感知的。

但是，如果需要复制的是非常大段的内容，则 `execCommand()` 方法可能会引起卡顿，因为 `execCommand()` 方法是一个同步方法，必须等复制操作结束，才能继续执行后面的代码。

#### 3. 无法修改复制内容

使用 `execCommand()` 方法复制的文字内容，是无法进行修改与替换的，这其实是不友好的，因为对复制或拖拽的本文内容进行处理还是比较常见的。

正是由于以上一些限制，`execCommand()` 已经是不推荐的使用的方法，业界推荐使用全新的 Clipboard API。

// zxx: 虽然不推荐，但是架不住兼容性好，且以后浏览器也没有理由不继续支持（否则影响太大了），因此，`execCommand()` 方法还是目前的主流实现方案。

### 二、Clipboard API

使用 Clipboard API 实现复制效果就简单了，

```scss
if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
}
```

其中，`text` 就是需要复制的文本内容，就这么简单。

无需浏览器权限申请，文字内容直接进入剪切板，代码简单，使用方便，同时是异步，不用担心阻塞。

然而，兼容性这块的不足实在是让人遗憾。

![clipboard writeText兼容性](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202304202141169.png)



### 三、代码整合与封装

所以要复制一段文字到剪切板，可以试试下面的代码：

```javascript
var text = '被复制的内容，啦啦啦~';
if (navigator.clipboard) {
    // clipboard api 复制
    navigator.clipboard.writeText(text);
} else {
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值
    textarea.value = text;
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    // 移除输入框
    document.body.removeChild(textarea);
}
```

包括 IE 在内的浏览器全兼容。

眼见为实，您可以狠狠地点击这里：[复制文字到剪切板JS代码片段demo](https://www.zhangxinxu.com/study/202110/js-copy-text-demo.php)

点击下图按钮，就可以复制文字内容到剪切板了，可以粘贴到下面的多行文本输入框中进行测试。

![demo页面截图示意](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202304202141205.png)

上面代码虽好，却没有复制成功的提示效果。

所以我结合实际开发需求，重新整个了个 JS 文件，并放在了 gitee 上。

#### Gitee 仓库开源

地址是：https://gitee.com/zhangxinxu/copy-text

![JS 代码示意](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202304202141183.png)

效果是这样的，点击按钮复制后，按钮上方会出现绿色的文字提示一闪而过。

![复制成功提示](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202304202141879.gif)

语法如下：

```css
// content 只能是字符串类型
copyText(content);
// 或者
// content 此时也可以是 DOM 元素对象
copyText(button, content);
```

其中：

- **button**

    可选。Element。表示触发复制的按钮元素。

- **content**

    必须。String|Element。表示需要复制的内容。如果是 DOM 元素，则会使用内部的文本或者值作为复制内容。如果使用的是 `copyText(content)` 语法，content 只能是字符串。

也就是如果有 button 参数，点击时候就会自动出现提示，如果第一个参数是字符串，则直接复制内容。

这样，就可以兼顾多种场景了。

此 JS 代码片段非常时候需要敏捷开发的演示页面，活动页面，对视觉要求不高的后台页面等。

也欢迎大家关注[我的 gitee 账号](https://gitee.com/zhangxinxu)，会不定期更新 JS 相关的小玩意。

### 四、知名开源 clipboard.js 项目

如果项目对代码体积不那么在意，自己也不想关心具体的实现细节，可以使用这个著名的剪切板项目 clipboard.js：https://github.com/zenorocha/clipboard.js/

不仅有复制的实现，还有剪切等。

提示效果是小黑提示，如下图示意：

![复制效果提示截图](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202304202141457.png)

更多信息不展开，大家可以去项目主页去查找。