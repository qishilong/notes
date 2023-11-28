# css 实现指定行数并且溢出省略

本文将结合之前的文章用css代替js实现动态“多行溢出省略”效果，并描述由此带来的一些“周边”问题。

首先，在上一篇文章中也提到，很多情况下我们确实要去实现“多行溢出省略”的效果，单行的文字会给用户带来不好的体验。所以在第一篇文章中通过js实现了这一功能。
但抛开js中繁杂的计算不说，这已然‘违背’了笔者曾经提过的「优先策略」之一：HTML > CSS > JavaScript！

这里依然从实际场景（代码及截图已脱敏）一步一步分析：

## 多行溢出

一开始笔者的代码是这样写的：

```
<!-- region是“xxx;xxx;xxx”这样的字符串格式 -->
<div class="fss-r-detail" v-if="ele.region">{{ele.region}}</div>1.2.
```

要求最多显示两行，溢出省略：

```
.fss-r-detail {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}1.2.3.4.5.6.
```

![三探【文字溢出省略】：纯css实现“任意行数”截断处理_html](https://qiniucloud.qishilong.space/images/06142527_6316e7d71c32d7882.png)

这样的代码不仅只能在`webkit` 内核浏览器中才能生效，还有一个关键问题：它必须和外层设置的“高度”合作 —— 如果外层设置的高度不足以支撑 `-webkit-line-clamp: 2;` ，那结果岂不是很尴尬？

如何让外层高度控制一切呢？
由于高度是固定的，如果让内容部分自适应剩余空间，就可以完美实现这个效果。这就要用到 ​​`​flex​`​ 布局：

```
<div class="fss-r-detail" v-if="ele.region">
    <div class="fss_r-detail-li">{{ele.region}}</div>
</div>1.2.3.
.fss-r-detail {
  max-height: 81rpx; //这里给一个高度
}
.fss_r-detail-li {
  flex: 1;
  overflow: hidden;
}1.2.3.4.5.6.7.
```

当然，很多元素像「行内元素」我们就完全不需要考虑flex的问题：因为他们本身就是一个接一个铺满父元素的！

接下来就是省略号的问题：省略号永远在右侧，那我们其实可以考虑一个“很少被使用”的属性——浮动`float`

```
.fss-r-detail::before {
  content: "...";
  float: right;
}1.2.3.4.
```

现在看效果的话，其实省略号是在“右上角”的，和子元素顶部对齐。要将它移到右下角，有两种方案：

-   通过一个浮动元素将其现在的位置占住
-   shapes布局

第一种方案显然是“不合时宜”的：从省略号本身来说，他是伪元素，脱离于文档流存在，能不借助于额外元素移动位置必然是我们首要考虑的。

在此之前，应当将省略号高度撑满整个父元素，并且向下对齐：

```
.fss-r-detail::before {
  content: "...";
  float: right;
  height: 100%;
  display: flex;
  align-items: flex-end;
}1.2.3.4.5.6.7.
```

然后现在又来了一个新问题：因为是高度撑满的，所以省略号所在位置上面的文字也被挤走了，形成了一个鲜明的左右布局而不是环绕效果！
这时候就需要 **shapes布局** 出手了：

```
.fss-r-detail::before {
  /** 其它样式 **/
  shape-outside: inset(calc(100% - 1.5em) 0 0);
}1.2.3.4.
```

>   `shape-outside`属性要想生效，本身需要是浮动float元素。

![三探【文字溢出省略】：纯css实现“任意行数”截断处理_html_02](https://qiniucloud.qishilong.space/images/06142527_6316e7d74be7335487.png)

可以看到，目前已经实现我们需要的效果了。

接下来是文章开头提到的问题：**如何自动隐藏省略号？**

这个其实就是取巧的方法，也可以说是“视觉屏蔽”：用一个足够大的色块（和背景色一样）盖住省略号，设置绝对定位后，色块会跟随内容文本。当文字较多时，色块也就跟随文本移动，看着像是“被挤下去了”。此时结合`overflow:hidden`的效果就隐藏了省略号：

```
.fss-r-detail {
  /** 其它属性 **/
  position: relative;
}
.fss-r-detail::after {
  content: "";
  position: absolute;
  width: 999vh;
  height: 999vh;
  background: #fff;
  box-shadow: -2em 2em #fff;
}1.2.3.4.5.6.7.8.9.10.11.12.
```

最后的`box-shadow`是向下的阴影，为了应对个别情况下可能遮挡不住省略号的问题！

## 结构改变

在上面的HTML结构中，提到“region是“xxx;xxx;xxx”这样的字符串格式”，现在因为要对其中某个地区文字做样式处理，所以它不能是纯字符串展示。于是我将其改为下面的样式：

```
<div class="fss-r-detail" v-if="ele.region">
    <ul>
        <li class="fss_r-detail-li" :class="这里做特殊样式处理" v-for="(item, index) in ele.region.split(';')" :key="index">{{item}}</li>
    </ul>
</div>1.2.3.4.5.
```

因为`li`是块元素，所以我要对`ul`做处理：很容易想到的是`flex`：

```
ul {
  display: flex;
  flex-wrap: wrap; //flex默认是不允许换行的
}1.2.3.4.
```

然后问题就又出现了：

![三探【文字溢出省略】：纯css实现“任意行数”截断处理_css_03](https://qiniucloud.qishilong.space/images/06142527_6316e7d76986292544.png)

咦？为嘛没有超过两行也显示出了省略号？这河里吗？

我们看一下此时的文本dom是什么样的：

![三探【文字溢出省略】：纯css实现“任意行数”截断处理_html_04](https://qiniucloud.qishilong.space/images/06142527_6316e7d7a65ac50376.png)

给浮动的省略号加一个`margin-left`：

![三探【文字溢出省略】：纯css实现“任意行数”截断处理_shape-outside_05](https://qiniucloud.qishilong.space/images/06142527_6316e7d7c783066507.png)

OK，可以看到，文字部分因为有了flex而默认铺满整个父元素的，而此时触碰了省略号元素的位置，由上面定制的规则来看，被认为是“有文字超出规定区域了”。

这时我突然想到，为什么要加`ul`呢？索性直接对`li`设置display属性让其变为行内元素：

```
<div class="fss-r-detail" v-if="ele.region">
    <li class="fss_r-detail-li" v-for="(item, index) in ele.region.split(';')" :key="index">{{item}}</li>
</div>1.2.3.
.fss_r-detail-li {
    position: relative;
    display: inline;
    margin-right: 8rpx;
    &:not(:nth-of-type(1)) {
        padding-left: 4rpx;
    }
    &::after { //不用字符串后为了不添加复杂结构的前提下不对现在文字的样式造成影响，用伪元素的形式实现文字后面的“;”
        content: ";";
        position: absolute;
        top: 0;
        right: 100%;
    }
}1.2.3.4.5.6.7.8.9.10.11.12.13.14.
```

就可以了！

### inline-block导致的问题

上面我对`li`设置了`inline`，那能不能用`inline-block`呢？
不能。块级元素（行内块也有块级的效果）不能自动折行，这会导致我们前面辛辛苦苦设置的“环绕效果”毫无用武之地。哪怕你设置了​​`​word-break:break-all;​`​

![三探【文字溢出省略】：纯css实现“任意行数”截断处理_html_06](https://qiniucloud.qishilong.space/images/06142527_6316e7d7e7db530128.png)

而且最离谱的是：为了达到和纯字符串一样的效果，笔者用伪元素实现了每个词后面的分号“；”，但是为了最后一个没有分号而不加过多的css样式，采用了“前置伪元素”的做法：每个`li`元素后面的分号实际上是下一个元素的伪元素，第一个元素的伪元素被隐藏在前面了！
这样的话用block得到的效果就是如上面这张图一样：第一行最后的分号不见了。

## 涉及的样式代码

笔者的项目是使用less写样式的，这里就不做改变了，直接放出：

```css
.fss-r-detail {
    max-height: 81rpx;
    position: relative;
    overflow: hidden;

    .fss_r-detail-li {
        position: relative;
        display: inline;
        // white-space: nowrap;
        margin-right: 8rpx;
            &:not(:nth-of-type(1)) {
                padding-left: 4rpx;
            }
        &::after {
            content: ";";	// 这里的分号有点多余，直接在 html 中加入 ; 就可以
            position: absolute;
            top: 0;
            right: 100%;
        }
    }

    &::before{
        content: "...";
        float: right;
        height: 100%;
        display: flex;
        align-items: flex-end;
        shape-outside: inset(calc(100% - 1.5em) 0 0); // 以自身为边界，四个方向向内缩进到靠近省略号位置，神来之笔
    }
    &::after {
        content: "";
        position: absolute;
        width: 999vh;
        height: 999vh;
        background: #FFFFFF;
        box-shadow: -2em 2em #FFFFFF;
    }
}
```