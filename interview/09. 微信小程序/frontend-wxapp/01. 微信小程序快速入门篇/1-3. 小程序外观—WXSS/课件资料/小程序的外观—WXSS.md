# 小程序的外观—WXSS



WXSS 英语全称为 Wei Xin Style Sheets

回顾每一个页面下面，有 4 个文件：

- wxml：当前页面的结构（必须）
- wxss：当前页面的样式（可选）
- js：当前页面的逻辑（必须）
- json：当前页面的配置（可选）



app.wxsss 位于项目的根目录下面，是整个项目的公共样式，它会被注入到小程序的每个页面。



**尺寸单位**

在微信小程序中，专门对尺寸进行了优化。为了适配不同分辨率的屏幕，小程序引入了新的单位：rpx

同一个元素，在不同宽度的屏幕下，如果使用px为尺寸单位，有可能造成页面留白过多。

以前在开发 WebApp 的时候，我们通过 JS 获取到屏幕的尺寸信息，然后手动去计算应该如何进行缩放。（手机端如何适配）

但是在小程序里面就不存在这个问题，因为它已经为我们封装好了。我们只需要使用 rpx 这个单位即可。



**WXSS引用**

基本上和 CSS 也是相同的，使用 @import 来进行引用。

但是和原生 CSS 有一个区别在于，WXSS 会把 @import 引用的 CSS 打包到一块儿



**内联样式**

关于内联样式，基本上和原生 CSS 一模一样。

在此基础上支持动态的样式。

```wxml
<text style="color:{{color}};font-size: {{eleFontsize}};">当前时间：{{time}}</text>
```

```js
Page({
  data: {
    // ...
    color: 'blue',
    eleFontsize: '48rpx'
  },
})
```



**组件库**

微信小程序官方提供了一套组件库，扫码如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-01-11-010523.png" alt="image-20230111090523483" style="zoom: 33%;" />

关于这个组件，我们会在第二章专门拿一个章节来说，这一章就不展开了。

这节课结束后，下来通读官方文档对应的：*https://developers.weixin.qq.com/ebook?action=get_post_info&docid=000c44c49141887b00864fbba5100a*