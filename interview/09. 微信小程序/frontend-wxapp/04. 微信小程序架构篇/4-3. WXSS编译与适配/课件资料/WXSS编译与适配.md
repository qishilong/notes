# WXSS编译与适配

在前面我们有讲过，微信小程序的本质是一个 Hybrid 应用，在App组件中有一个 WebView 的组件可以用来显示网页。

而如果你把浏览器想象成两部分，那么一部分是 *UI*（地址栏，导航栏按钮等），其它部分是把标记跟代码转换成我们可见和可交互视图的浏览器引擎。

![image-20220222115102001](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035102.png)

*WebView* 就是浏览器引擎部分，你可以像插入 *iframe* 一样将 *Webview* 插入到你的原生应用中，并且编程化的告诉它将会加载什么网页内容。这样我们可以用它来作为我们原生 *app* 的视觉部分。当你使用原生应用时，*WebView* 可能只是被隐藏在普通的原生 *UI* 元素中，你甚至用不到注意到它。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035122.png" alt="image-20220222115121519" style="zoom:50%;" />

明确了这一点之后，那么我们可以知道，最终微信小程序中的 `WXML` 以及 `WXSS`  还是离不开原生的 `HTML、CSS`

有关 `WXML` 之前我们已经看过了，实际上就是使用的类似 `WebComponents` 来自定义的组件。

那么 `WXSS` 呢？

`WXSS`并不可以直接执行在`webview`层进行渲染，而是通过了一层编译。我们接下来就带大家编译一个`WXSS`看一下。

编译的工具名字叫`WCSC`，这个编译的过程是在微信开发者工具端执行的，那么这个编译工具在哪呢，我们来找一下。在微信开发者工具的控制台界面，输入`help()`命令可见如所示界面。

![image-20230215141015364](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-061015.png)

> 如果help( )函数执行后无效果或者抛错，请检查控制台下方位置是否为top选项卡。

可以看到这里有一些命令。我们继续在控制台执行第八条`openVendor()`命令。

这时候弹出了一个名为`WeappVendor`的文件夹。在我截图的这个顺序里，可以看到最后一个文件名称正是我们要寻找的`WCSC`。文件种类是可执行文件。`WXSS`正是用这个工具来编译的。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-061123.png" alt="image-20230215141122926" style="zoom:50%;" />

我们找到了`WCSC`编译工具后，把这个工具复制到项目的`pages/index`目录下，与`index.wxss`同目录。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-061202.png" alt="image-20230215141202360" style="zoom:50%;" />

把终端目录打开到`pages/index`目录中。执行：

```js
./wcsc -js index.wxss >> wxss.js
```

这时候可以看到目录中多了一个`wxss.js`文件。



`wxss.js`文件就是`WXSS`文件编译后的文件，`index.wxss`文件会先通过`WCSC`可执行程序文件编译成`js`文件。并不是直接编译成`css`文件。



那么我们直接看一下内部代码是怎样的呢。

这里我拆成了三部分来看，三部分加一起就是完整的代码。第一部分：`设备信息`。

![image-20230215141434913](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-061435.png)

这个部分用于获取一套基本设备信息，包含`设备高度`、`设备宽度`、`物理像素与CSS像素比例`、`设备方向`。

![image-20230215141502522](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-061503.png)

这里就是`rpx转化`的方法了，`rpx转化`的具体算法就是中间那两句，并且做了一个精度收拢的优化。把那两句单独提取出来再看一下，平常在开发中自己写一个这样的方法也是一种不错的选择。

```js
number = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
number = Math.floor(number + eps);
```

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-15-061653.png" alt="image-20230215141653173" style="zoom: 67%;" />

最后这一段代码比较长，看到方法名称我们就可以猜到这个函数是干嘛用的了`setCssToHead`。

首先看到最下方执行`setCssToHead`方法时候的传入参数。隐约可以看出来是我们在`index.wxss`之中写入的样式。但是仔细一看，格式不太一样了，变成了结构化数据，方便遍历处理，并且处理后便于`makeup`组装。还哪里不一样了呢，可以看到其中在`index.wxss`中写`rpx`单位的属性都变成了区间的样子`[0, 128]`、`[0, 20]`。其他单位并没有转换。这样的话就可以方便的识别哪里写了`rpx`单位，然后执行第二部分的`transformRPX`方法即可。

`makeup`组装之后，创建`<style>`标记，插入到`<head>`中。



这就是整个 `WXSS` 编译后得到的结果，编译后的 `JS` 代码是通过`eval`方法注入执行，这样的话完成了`WXSS`的一整套流程。

---

-*EOF*-

