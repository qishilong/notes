# WXS

https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/

> 官方介绍：
>
> WXS（WeiXin Script）是小程序的一套脚本语言，结合 `WXML`，可以构建出页面的结构。
>
> WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致。

那么**这个 WXS 究竟要解决什么问题**呢？

在前面讲架构篇的时候，我们有讲过微信小程序的架构分为 app-service 和 page-frame，分别运行于不同的线程。

你在开发时写的所有 JS 都是运行在 app-service 线程里的，而每个页面各自的 WXML/WXSS 则运行在 page-frame 中。

app-service 与 page-frame 之间通过**桥协议**通信（包括 setData 调用、canvas指令和各种DOM事件），涉及消息序列化、跨线程通信与evaluateJavascript()。

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-02-17-030526.png" alt="image-20230217110526036" style="zoom:50%;" />

这个架构的好处是：分开了业务主线程和显示界面，即便业务主线程非常繁忙，也不会阻塞用户在 page-frame 上的交互。一个小程序可以有多个 page-frame （webview），页面间切换动画比SPA更流畅。

但是，这样的架构也不是说没有缺点，该架构的缺点就在于在 page-frame 上无法调用业务 JS。**跨线程通信的成本很高**，不适合需要频繁通信的场景。业务 JS 无法直接控制 DOM。



因此，针对微信小程序架构的缺点，微信团队推出了 WXS。

WXS 就是在 page-frame 中运行的 JS，可以对 view 数据做一些变换。

WXS 对性能的贡献就只有一点：与 WXML 是在同一个线程运行的，**避免了跨线程通信的开销**

简单来说就是可以在 WXML 里使用 JavaScript。

查看整个官方文档，可以看到官方文档在介绍 WXS 时分为了如下几个部分：

- [WXS 模块](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/01wxs-module.html)
- [变量](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/02variate.html)
- [注释](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/03annotation.html)
- [运算符](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/04operator.html)
- [语句](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/05statement.html)
- [数据类型](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/06datatype.html)
- [基础类库](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/07basiclibrary.html)

虽然官方强调 **WXS 与 JavaScript 是不同的语言，有自己的语法，并不和 JavaScript 一致**，但是我们可以看出基本上就是 JavaScript。

