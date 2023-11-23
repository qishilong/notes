# 2. *WebView* 介绍



在前面我们已经介绍了什么是 *WebApp*，简单来讲就是移动端的网站或 *H5* 应用。那么既然是一个 *Web* 网站，必然就是使用浏览器来打开。但是只能用浏览器打开么？

举个例子，现在国内很流行扫码打开一个应用或者小程序，例如有下面的一个二维码：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034812.png" alt="image-20220222114812180" style="zoom:50%;" />

那么大家一般都习惯使用微信上面的扫一扫功能来扫码，之后在微信中打开的页面如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034834.png" alt="image-20220222114833333" style="zoom:50%;" />

实际上，除了可以使用微信扫一扫以外，凡是手机中具备扫一扫功能的应用，都能打开此页面。

![image-20220222114854631](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034855.png)

正如上图所示，我分别使用百度、抖音、微信、支付宝以及手机默认浏览器都打开了此页面。

百度和默认浏览器自不用说，因为这两个本身就是浏览器，用浏览器打开网页没什么稀奇的，但是微信、支付宝、抖音这些应用为什么也能打开此页面呢？

这就不得不提我们这篇文章的主角 *WebView* 了。本文主要介绍什么是 *WebView*，并不会涉及到具体的编码，大家可以放心食用。

- *WebView* 介绍
- *WebView* 常见使用场景



## *WebView* 介绍

*WebView* 是一种嵌入式浏览器，原生应用可以用它来展示网络内容。

我们都知道浏览器是什么，它是让我们可以浏览网页的独立应用：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-034925.png" alt="image-20220222114924513" style="zoom:50%;" />

而如果你把浏览器想象成两部分，那么一部分是 *UI*（地址栏，导航栏按钮等），其它部分是把标记跟代码转换成我们可见和可交互视图的浏览器引擎。

![image-20220222115102001](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035102.png)

*WebView* 就是浏览器引擎部分，你可以像插入 *iframe* 一样将 *Webview* 插入到你的原生应用中，并且编程化的告诉它将会加载什么网页内容。这样我们可以用它来作为我们原生 *app* 的视觉部分。当你使用原生应用时，*WebView* 可能只是被隐藏在普通的原生 *UI* 元素中，你甚至用不到注意到它。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035122.png" alt="image-20220222115121519" style="zoom:50%;" />

运行在你的 *WebView* 中的 *JavaScript* 有能力调用原生的系统 *API*。这意味着你不必受到 *Web* 代码通常必须遵守的传统浏览器安全沙箱的限制。

下图解释了使这样成为可能的架构差异：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035143.png" alt="image-20220222115143384" style="zoom:50%;" />

*Web* 代码和原生应用代码相互通信。这种沟通通常称为 *bridge*。

通过上图我们可以看到 *bridge* 可视化为 *Native Bridge* 和 *JavaScript Bridge* 的一部分。正因为 *bridge* 的存在，我们所编写的 *JavaScript* 不仅可以在 *WebView* 中运行，还可以调用原生 *API* 帮助我们的应用更深入地集成酷炫的系统级功能，如传感器，存储，日历/联系人等。

## *WebView* 常见使用场景

现在我们已经了解了 *WebView* 的概况以及他们所拥有的一些强大作用，接下来我们来看一下 *WebView* 的使用场景。

### *App* 内置浏览器

*WebView* 最常见的用途之一是显示链接的内容。

在移动设备上启动浏览器，将用户从一个应用切换到另一个应用，操作完成后再返回原本的应用，这样的操作体验相当的糟糕。*WebView* 通过在应用本身内完全加载链接的内容来很好地解决这个问题。

这也解释了为什么上面提到的抖音、微信、支付宝都可以打开那个页面。

### 广告

广告仍然是原生应用最流行的赚钱方式之一。这些广告大部分是如何投放的？答案是通过 *WebView* 提供的 *Web* 内容：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035208.png" alt="image-20220222115208421" style="zoom:50%;" />



### 混合开发（*Hybrid App*）

到目前为止，我们一直在将 *WebView* 视为舞台上的次要支持角色，并由原生应用和其他原生 *UI* 元素完全支配。

但是近年来出现了一种新的开发模式，叫做混合开发（*Hybrid App*）。这种开发模式介于 *WebApp* 和 *NativeApp* 这两者之间的 *App* 开发技术，兼具“*Native App* 良好交互体验的优势”和“*WebApp* 跨平台开发的优势”。其原理就是原生客户端的壳 *WebView*，里面是 *HTML5* 的网页。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035228.png" alt="image-20220222115228652" style="zoom:50%;" />

混合应用很受欢迎有如下的原因：

1. 开发成本较低，可以跨平台，调试方便

    *Hybrid* 模式下，由原生提供统一的 *API* 给 *JS* 调用，实际的主要逻辑由 *HTML* 和 *JS* 来完成，而由于最终是放在 *WebView* 中显示的，所以只需要写一套代码即可，达到跨平台效果，另外也可以直接在浏览器中调试，很为方便。

    最重要的是只需要一个前端人员稍微学习下 *JS API* 的调用即可，无需两个独立的原生人员

    一般 *Hybrid* 中的跨平台最少可以跨三个平台：*Android、iOS* 和普通 *Webkit* 浏览器

2. 维护成本低，功能可复用

    同上，如果代码合理，只需要一名前端就可以维护多个 *app*，而且很多功能还可以互相复用。

3. 更新较为自由

    虽然没有 *WebApp* 更新那么快速，但是 *Hybrid* 中也可以通过原生提供 *api* 进行资源主动下载，达到只更新资源文件，不更新 *apk(ipa)* 的效果。



<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035255.png" alt="image-20220222115255033" style="zoom:50%;" />

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035306.png" alt="image-20220222115306789" style="zoom:50%;" />

现在国内外也有很多将 *WebApp* 打包成 *Hybrid App* 的应用技术，例如：

- [*Cordova*](https://cordova.apache.org/)
- [*DCloud*](https://dcloud.io/)
- [*API Cloud*](https://www.apicloud.com/)

### 桌面应用扩展

*WebView* 的使用场景不仅仅只是在移动端应用上面，许多桌面应用也可以使用 *WebView* 来扩展自己的功能。由于 *Web* 技术的简单性和强大性，很多加载和扩展项通常选择以 *HTML、CSS* 和 *JavaScript* 技术而非 *C++、C#* 来进行构建。

下面以 *Microsoft Office* 为例，我们可以针对某一个特殊的词使用维基百科进行查询。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035325.png" alt="image-20220222115325430" style="zoom:50%;" />

而这里的维基百科内容就是通过 *WebView* 显示出来的。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-02-22-035343.png" alt="image-20220222115342513" style="zoom:50%;" />

## 总结

目前为止，我们就已经介绍了 *3* 种移动端开发的方式了。这里我们以表格的形式做一个总结：

|                      | *Native App*                  | *Web App*                      | *Hybrid App*                     |
| -------------------- | ----------------------------- | ------------------------------ | -------------------------------- |
| 原生功能体验         | 优秀                          | 一般                           | 良好                             |
| 渲染性能             | 非常快                        | 一般                           | 良好                             |
| 是否支持设备底层访问 | 支持                          | 不支持                         | 支持                             |
| 网络要求             | 支持离线                      | 依赖网络                       | 支持离线(资源存本地情况)         |
| 更新复杂度           | 高(几乎总是通过应用商店更新)  | 低(服务器端直接更新)           | 较低(可以进行资源包更新)         |
| 编程语言             | *Android(Java) iOS(OC/Swift)* | *js+html+css3*                 | *js+html+css3*                   |
| 社区资源             | 丰富(*Android、iOS* 单独学习) | 丰富(大量前端资源)             | 有局限(不同的 *Hybrid* 相互独立) |
| 上手难度             | 难(不同平台需要单独学习)      | 简单(写一次，支持不同平台访问) | 简单(写一次，运行任何平台)       |
| 开发周期             | 长                            | 短                             | 较短                             |
| 开发成本             | 昂贵                          | 便宜                           | 较为便宜                         |
| 跨平台               | 不跨平台                      | 所有浏览器                     | 可以打包到不同的平台             |
| *APP* 发布           | *App Store*                   | *Web* 服务器                   | *App Store*                      |


-*EOF*-