# 一次就能看懂的Tailwind CSS介绍

本文面向从未使用过 Taliwind CSS 的初学者。将通过搭建 Tailwind CSS 的环境来讲解基本设置和自定义方法，以此来了解Taliwind CSS这一个日益流行的 CSS 框架。

>   当前Taliwind CSS的使用情况是，用户数量在增加，新功能也在陆续添加。当前最新版本为 v3.0。本文档中描述的一些内容在 v3.0 中也可以通过更简单的方式进行设置。但是，`Utilize Class` 的基础知识没有改变，因此提供了学习基础知识的信息。

## 目录

-   1 什么是 Tailwind CSS？
    -- 1.1 什么是Utilize Class？
    -- 1.2 为什么选择 Tailwind CSS？
-   2 营造环境
    -- 2.1 使用cdn的方法
    -- 2.2 使用 npm 安装 Tailwind css
-   3 如何使用 Tailwind CSS
    -- 3.1 显示 Hello Tailwind CSS
    -- 3.2 字符大小设置
    -- 3.3 字符粗细设置
    -- 3.4 字符颜色设置
    -- 3.5 创建按钮
    -- 3.6 Tailwind CSS 定制
    -- 3.7 伪类设置悬停
    -- 3.8 伪类设置重点
    -- 3.9 过渡设置
    -- 3.10 变换设置
    -- 3.11 分组设置
    -- 3.12 动画设置
-   4 tailwind.confing.js 配置文件
    -- 4.1 创建配置文件
    -- 4.2 添加颜色
    -- 4.3 增加最大宽度和间距
    -- 4.4 添加字体大小 -- 4.5 如何自定义其他值
-   5 Tailwind CSS 插件设置

## 1、什么是 Tailwind CSS？

Tailwind CSS 是一个利用公用程序类（`Utilize Class`，下文皆称Utilize Class）的 CSS 框架。许多人会想到 CSS 框架，有很多，例如 `Bootstrap、Bulma 和 Material UI`。Bootstrap 和 Bulma 等框架利用预先准备好的组件（例如按钮、菜单和面包屑）进行设计。在 Tailwind CSS 中，没有准备任何组件，而是使用`Utilize Class`来创建和设计自己的组件。

>   Tailwind CSS 还提供了一个Headless UI ([headlessui.dev)，如果你想创建复杂的组件（例如下拉菜单和对话框），你可以使用它。](https://link.juejin.cn/?target=https%3A%2F%2Fheadlessui.dev)%EF%BC%8C%E5%A6%82%E6%9E%9C%E4%BD%A0%E6%83%B3%E5%88%9B%E5%BB%BA%E5%A4%8D%E6%9D%82%E7%9A%84%E7%BB%84%E4%BB%B6%EF%BC%88%E4%BE%8B%E5%A6%82%E4%B8%8B%E6%8B%89%E8%8F%9C%E5%8D%95%E5%92%8C%E5%AF%B9%E8%AF%9D%E6%A1%86%EF%BC%89%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E4%BD%BF%E7%94%A8%E5%AE%83%E3%80%82)

原来Bootstrap等框架可以通过提前准备组件集合来高效地设计网站，但是有一个缺点，就是因为使用了相同的设计，所以没有原创性。相比之下，Tailwind CSS 没有组件集合，所以即使你创建一个名为相同按钮的组件，每个人都会应用不同的`Utilize Class`创建它，可以创建出一个高度原创的网站。

>   两者都有优点和缺点，所以使用哪一个取决于个人，但使用 Tailwind CSS 的人数正在稳步增加。

### 1.1、什么是Utilize Class？

例如，如果要使用 Bootstrap 创建按钮，请将`class`设置为`btn` 。但是，在 Tailwind 中，并没有 `btn` 等用于创建按钮的class，你可以通过编写如下所示的`Utilize Class`来创建按钮。你可能会觉得要设置的类太多了，但是学习成本很低，因为你一用就习惯了。如果不知道类名，可以通过搜索 `Tailwind CSS 文档`轻松找到它。

```html
html
复制代码<button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded">前端晚间课</button>
```

`bg-indigo-700` 设置颜色，`font-semibold` 设置字体粗细，`text-white` 设置文本颜色，`py-2` 设置左右填充，`px` 设置上下填充，`rounded `设置圆角。

![img](https://qiniucloud.qishilong.space/images/3839a1cffe2f451e8b3688a84b84cedb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**创建一个按钮**
这里设置的`Utilize Class`在类本身中没有特定的含义（不像`Bootstrap`的class `btn`代表的就是按钮），可以用在各种地方（有时用于按钮），有时用于导航链接等，所以它被命名为实用程序类（`Utilize Class`）。也就是说`Utilize Class`是 Tailwind CSS 中预先配置的类。

>   在解释 Tailwind 的`Utilize Class`时，社区中使用了低级别一词，例如低级别样式、低级别实用程序类和低级别框架。

有 9 种不同的字体大小和相当多的颜色的`Utilize Class`，因此你可以通过仅更新 html 文件进行设计，而无需编写自己的 css 样式。

如果你想使用未在 Tailwind CSS 的`Utilize Class`中注册的颜色，你可能想知道该怎么做。在这种情况下，你可以通过在 Tailwind CSS 配置文件中注册它，以与其他 Tailwind CSS `Utilize Class`相同的方式使用它。

>   在当前版本中，即使未在`Utilize Class`中注册，也可以使用括号设置`text-[#121212]`和`w-[100px]`等固定值，而无需在配置文件中对其进行描述。对于经常使用的那些，继续在配置文件中进行设置会更有效率。

### 1.2 为什么选择 Tailwind CSS？

读到这里之后，你可能想知道是否应该在不使用 Tailwind CSS 的情况下使用 style 属性进行编写？与 style 属性相比，使用 Tailwind CSS 是有一些优势的。

使用 Tailwind CSS，你可以使用`Utilize Class`轻松设置响应式设计，因此您无需设置媒体查询。一旦习惯了 Tailwind CSS，你就会忘记使用媒体查询。此外，作为伪类的悬停和焦点等设置无法通过 style 属性进行设置，但在 Tailwind CSS 中，可以通过利用类设置伪类。你还可以使用`Utilize Class`通过 CSS 设置动画和渐变颜色。

## 搭建环境

### 使用cdn的方法

使用cdn时，请将以下链接标签粘贴到html中。

```html
html
复制代码<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
```

>   请注意，如果你使用 cdn，你将无法自定义 Tailwind CSS，这将在本文档后面介绍，例如添加颜色。

### 使用 npm/yarn 安装 Tailwind css

你无法使用 `cdn` 自定义 Tailwind CSS。如果要自定义，需要用npm、yarn来安装 Tailwind CSS。

```ruby
ruby
复制代码 $ npm init -y
 
 $ npm install tailwindcss@latest
```

接下来，创建一个 css 目录并在其中创建一个 style.css 文件。将以下三个 `tailwind 指令`添加到 style.css 文件中。这个 style.css 不能直接从 html 中读取。因此，我们稍后会构建它，并将其转换为熟悉的 html 可以读取的 css 文件。通过构建，Tailwindcss 使用的`Utilize Class`将从基础、组件和实用程序中提取。

```css
css
复制代码@tailwind base;
@tailwind components;
@tailwind utilities;
```

创建一个`public/css`目录来存放构建后创建的css文件。

让我们实际构建并创建一个 css 文件，以从添加了 Tailwind 指令的 style.css 文件中读取 html。

```bash
bash
复制代码$  % npx tailwind build ./css/style.css -o ./public/css/style.css
  
   tailwindcss 2.1.2
  
   🚀 Building: css/style.css
  
   ✅ Finished in 2.61 s
   📦 Size: 3.81MB
   💾 Saved to public/css/style.css
```

你可以看到创建的 css 文件包含普通的 CSS。由于 Twailwind 预先创建的所有`Utilize Class`都有描述，因此文件很大，行数为 50,000 或更多。

```css
css
复制代码/*! tailwindcss v2.1.2 | MIT License | https://tailwindcss.com */

/*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */

/*
Document
========
*/

/**
Use a better box model (opinionated).
*/

*,
::before,
::after {
  box-sizing: border-box;
}
```

>   你还可以看到在创建的 style.css 文件的顶部应用了现代规范化。

使用 npx 命令构建，可以将 build 命令添加到 package.json 文件中

```json
json
复制代码
"scripts": {
  "build": "tailwind build css/style.css -o public/css/style.css"
},
```

这样就完成了可以使用 Tailwind CSS 的环境搭建。

## 如何使用 Tailwind CSS

### Hello Tailwind CSS

现在你已经构建了一个使用 Tailwind 的环境，请在 `public` 目录中创建以下 index.html 文件。使用link标签指定构建后的style.css。

```html
html
复制代码<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <title>Document</title>
</head>
<body>
    <h1>Hello Tailwind CSS</h1>
</body>
</html>
```

打开浏览器，显示如下：

![img](https://qiniucloud.qishilong.space/images/05ca439b4eff4686aa225a3f3a9b9216~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

使用`Utilize Class`来装饰文本。设置四个实用程序类：字体大小、颜色、位置和粗细。

```html
html
复制代码<h1 class="text-4xl text-green-700 text-center font-semibold">Hello Tailwind</h1>
```

![img](https://qiniucloud.qishilong.space/images/3a9ef88732d745d4b21e0e364bb6de6e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

从这里开始，我们来介绍经常使用的`Utilize Class`。

### 字符大小设置

要设置字体大小，请使用 `text- {size}`。大小可以取 13 个值。相应的 CSS 样式在括号中。

```css
css
复制代码.text-xs（字体大小：.75rem；）
.text-sm（字体大小：.875rem；）
.text-base（字体大小：1rem;）
.text-lg（字体大小：1.125rem；）
.text-xl（字体大小：1.25rem；）
.text-2xl（字体大小：1.5rem；）
.text-3xl（字体大小：1.875rem；）
.text-4xl（字体大小：2.25rem；）
.text-5xl（字体大小：3rem；）
.text-6xl（字体大小：4rem；）
.text-7xl（字体大小：4.5rem；）
.text-8xl（字体大小：6rem；）
.text-9xl（字体大小：8rem；）
```

当实际应用于html时，它将如下所示:

```html
html
复制代码<div class="text-center mt-10">
    <p class="text-xs">前端晚间课</p>
    <p class="text-sm">前端晚间课</p>
    <p class="text-base">前端晚间课</p>
    <p class="text-lg">前端晚间课</p>
    <p class="text-xl">前端晚间课</p>
    <p class="text-2xl">前端晚间课</p>
    <p class="text-3xl">前端晚间课</p>
    <p class="text-4xl">前端晚间课</p>
    <p class="text-5xl">前端晚间课</p>
    <p class="text-6xl">前端晚间课</p>
</div>
```

![img](https://qiniucloud.qishilong.space/images/685b52a744a74895a464fe8a1a4de878~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 字符粗细设置

要设置字符粗细，请使用 `font- {thickness}`。厚度可以取 9 个值。相应的 CSS 样式在括号中。

```css
css
复制代码.font-thin (font-weight: 100;)
.font-extralight (font-weight: 200;)
.font-light (font-weight: 300;)
.font-normal (font-weight: 400;)
.font-medium (font-weight: 500;)
.font-semibold (font-weight: 600;)
.font-bold（font-weight：700；）
.font-extrabold（font-weight：800；）
.font-black（font-weight：900；）
html
复制代码<div class="text-center mt-10">
    <p class="font-thin">前端晚间课</p>
    <p class="font-extralight">前端晚间课</p>
    <p class="font-light">前端晚间课</p>
    <p class="font-normal">前端晚间课</p>
    <p class="font-medium">前端晚间课</p>
    <p class="font-semibold">前端晚间课</p>
    <p class="font-bold">前端晚间课</p>
    <p class="font-extrabold">前端晚间课</p>
    <p class="font-black">前端晚间课</p>
</div>
```

![img](https://qiniucloud.qishilong.space/images/e5fe539b530848338cc525d8552b8ed1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 文字颜色设置

要设置文本颜色，请使用 `text- {color}-{color depth}`。颜色可以设置为白色、黑色、红色、蓝色、靛蓝色……等。颜色强度可以取 **9** 个值。例如，在绿色的情况下，如下所示。

```css
css
复制代码text-green-100（颜色：# f0fff4;）
text-green-200（颜色：#c6f6d5；）
text-green-300（颜色：#9ae6b4；）
text-green-400（颜色：#68d391；）
text-green-500（颜色：#48bb78；）
text-green-600（颜色：#38a169；）
text-green-700（颜色：#2f855a；）
text-green-800（颜色：#276749；）
text-green-900（颜色：#22543d；）
```

>   如果要将文本颜色更改为红色而不是绿色，可以像 text-red-500 一样更改它。如果要更改背景颜色，可以使用 bg-red-500 进行设置。

```html
html
复制代码<div class="text-center mt-10">
    <p class="text-green-100">前端晚间课</p>
    <p class="text-green-200">前端晚间课</p>
    <p class="text-green-300">前端晚间课</p>
    <p class="text-green-400">前端晚间课</p>
    <p class="text-green-500">前端晚间课</p>
    <p class="text-green-600">前端晚间课</p>
    <p class="text-green-700">前端晚间课</p>
    <p class="text-green-800">前端晚间课</p>
    <p class="text-green-900">前端晚间课</p>
</div>
```

![img](https://qiniucloud.qishilong.space/images/a8d130f4909749d487c6b97f58b22a71~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

也可以使用诸如边距、填充和 flexbox 之类的实用程序类。您可以在[官方文档](https://link.juejin.cn/?target=)中查看每个`Utilize Class`。

### 创建按钮

现在你知道`Utilize Class`的样子，让我们使用`Utilize Class`来创建一个按钮。

```html
html
复制代码<button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded">前端晚间课</button>
```

![img](https://qiniucloud.qishilong.space/images/49d431211b2e4f19b66f8a323aad181a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在`py-2`中，上下设置了`.5rem padding`，在`px-4`中，左右设置了`1rem padding`。在圆形中，边界半径 .25rem 被应用并且角被圆化。

### Tailwind CSS 自定义

>   由于按钮是一个很有可能被重用的组件，并且你希望在应用程序中统一设计，你可以注册`Utilize Class`集来创建按钮作为另一个类。

打开预构建的 `css / style.css` 文件并在` @components` 和 `@utility` 指令之间添加以下内容。

```css
css
复制代码@tailwind base;

@tailwind components;

.btn{
    @apply font-semibold text-white py-2 px-4 rounded;
}

@tailwind utilities;
```

然后重新构建一下，`npm run build`,

会覆盖构建完后的`public/css/style.css`，所以打开`style.css`文件，搜索`btn`

可以看到刚才用`@apply `添加的内容已经作为css添加到`style.css`文件中了,

```css
css
复制代码.btn{
  font-weight: 600;
  color: #fff;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.25rem;
}
```

使用 `btn 类`和添加的按钮创建，只将背景颜色更改为红色。

```html
html
复制代码<div class="text-center mt-10">
    <button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded">前端晚间课</button>
    <button class="bg-red-700 btn">前端晚间课</button>
</div>
```

![img](https://qiniucloud.qishilong.space/images/d3fa78cf4c8f41aeb03d82bcb3364e5b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 伪类设置悬停

了解如何通过悬停在 Tailwind 中执行伪类，以在光标悬停在按钮上时更改按钮的颜色。如果要更改颜色，请在悬停后设置颜色，设置将可以体现出来。

```ini
ini
复制代码<button class="bg-red-700 btn hover:bg-red-500">前端晚间课</button>
```

![img](https://qiniucloud.qishilong.space/images/4442c565f01d4745b39ea0040818bb5d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 伪类设置焦点

单击按钮时还要设置焦点。为了清晰起见，从圆角变为圆形以强调按钮的圆度。修改`@apply`

```less
less
复制代码@tailwind base;

@tailwind components;
.btn{
    @apply font-semibold text-white py-2 px-4 rounded-full;
}
@tailwind utilities;
```

![img](https://qiniucloud.qishilong.space/images/8af08559cb304fccb6aab7e3262651cf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

当选择按钮（使用选项卡）时，将显示一个方框。单击时会出现一个方框，因此我们通过设置焦点以擦除方框。

![img](https://qiniucloud.qishilong.space/images/74be595155274cf7804be4a02cf93057~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

当我将焦点设置为无轮廓时，外框消失，但我不知道按钮是否被选中。

```html
html
复制代码<button class="bg-red-700 btn hover:bg-red-500 focus:outline-none">前端晚间课</button>
```

设置阴影轮廓，以便您可以看到按钮被选中。如果你设置它，会沿着按钮创建一个阴影，所以用户不会感到任何不适。

```html
html
复制代码<button class="bg-red-700 btn hover:bg-red-500 focus:outline-none focus:shadow-outline">前端晚间课</button>
```

![img](https://qiniucloud.qishilong.space/images/bff588b785d24efc875b742e66ff3c5d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 过渡设置

我确认通过设置伪类的悬停可以在光标移到按钮上时更改按钮的颜色。当光标悬停在按钮上时，你可以看到颜色。你可以通过使用过渡慢慢改变按钮的颜色。下面通过设置duration-1000，颜色会在1秒内缓慢变化。持续时间的多个值从duration-75 到duration-1000 注册。

```html
html
复制代码<button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded hover:bg-red-700 duration-1000">前端晚间课</button>
```

### 变换设置

如果你想让按钮本身变大并通过悬停更改按钮的颜色，您可以使用`transform` 和`scaling` 的`Utilize Class`来实现。

```html
html
复制代码<button class="bg-indigo-700 font-semibold text-white py-2 px-4 rounded transform hover:scale-110 hover:bg-red-700 duration-1000">前端晚间课</button>
```

### 群组设置

到目前为止的hover设置中，当光标经过目标元素时，hover的变化就会发生在元素上，但是在group设置中，当光标经过父元素时，设置hover的子元素中就可以呈现hover效果。

在下面的示例中，当光标经过设置了 group 的父元素时，由于为子元素设置的悬停设置，一个 p 标签元素的文本颜色变为红色，另一个变为蓝色。

```html
html
复制代码<div class="group m-10 p-10 border hover:bg-gray-100">
  <p class="font-black group-hover:text-red-900">前端晚间课</p>
  <p class="font-black group-hover:text-blue-900">前端晚间课</p>
</div>
```

![img](https://qiniucloud.qishilong.space/images/7c3e2fc2063549b7a9a1b9b6aa895e45~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 动画设置

只需将 `animate-bounce` 和 `animate-pulse` 设置为 class，您就可以轻松设置动画，而无需设置复杂的 CSS。

## tailwind.confing.js 配置文件

### 创建配置文件

使用 Tailwind CSS，你可以通过添加 Tailwind CSS `Utilize Class`中未包含的颜色、边距、宽度等进行自定义。自定义需要配置文件，但默认情况下不会创建，所以使用命令创建。

```bash
bash
复制代码% npx tailwind init
  
   tailwindcss 2.1.2
  
   ✅ Created Tailwind config file: tailwind.config.js
```

上面的命令将创建一个 `tailwind.config.js` 文件。

### 添加颜色

```js
js
复制代码module.exports = {
  theme: {
    extend: {
      colors: {
        cyan: '#9cdbff',
      }
    }
  },
  variants: {},
  plugins: []
}
```

>   即使不使用配置文件，也可以通过将颜色用括号括起来来设置应用程序中不常用的颜色，例如 `bg-[#9cdbff]`。

添加后，构建，`npm run build`

将按钮颜色从红色更改为青色。由于加入青色时没有设置色深，所以设置为`bg-cyan`（从`bg-red-700`改为`bg-cyan`）。

```ini
ini
复制代码<button class="bg-cyan btn hover:bg-red-500 focus:outline-none focus:shadow-outline">前端晚间课</button>
```

![img](https://qiniucloud.qishilong.space/images/c560c0f67ebd48388283a14a469a7636~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 添加最大宽度并添加间距

你可以使用 `max-width` 设置浏览器上元素的最大宽度，但你可能希望将其设置为与 Tailwind CSS 中默认注册的宽度不同的宽度。在这种情况下，请在 tailwind.config.js 以及颜色中进行其他设置。

```js
js
复制代码theme: {
    extend: {
        colors:{
            'cyan':'#9cdbff',
        },
        maxWidth:{
            custom:'60rem',
        },
    },
    variants: {},
    plugins: []
},
```

在class属性中使用时，设置`max-w-custom`。

可以使用间距设置宽度。

```js
js
复制代码theme: {
    extend: {
        colors:{
            'cyan':'#9cdbff',
        },
        maxWidth:{
            custom:'60rem',
        },
        spacing:{
            76: '19rem',
        },
    },
    variants: {},
    plugins: []
},
```

在class属性中使用时，设置为`w-76`。

>   即使你不使用配置文件，你也可以为那些不经常使用的样式设置一个诸如`p-[19rem]`之类的描述。

### 添加字体大小

最小的字体大小类是`text-xs`，但是如果你想添加一个更小的字体大小类，你可以这样做。

```css
css
复制代码theme: {
    extend: {
        colors:{
            'cyan':'#9cdbff',
        },
        maxWidth:{
            custom:'60rem',
        },
        spacing:{
            76: '19rem',
        },
        fontSize:{
            xxs:['0.625em',{lineHeight:'1rem'}],
        },
    },
    variants: {},
    plugins: []
},
```

如果要使用它，请在 class 属性中设置 `text-xxs` 。

### 如何自定义其他值

我解释了如何添加颜色、最大宽度、宽度和字体大小，但是当我想添加框阴影时，我应该在哪里查看设置方法，例如？

首先，转到官方` Tailwind CSS` 文档并进行搜索。 ![img](https://qiniucloud.qishilong.space/images/d4b13ecdd95a4eefa0a248e71c073235~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在文档中搜索 搜索时，将显示 Box Shadow 页面。

![img](https://qiniucloud.qishilong.space/images/ec88b634a2d649a8908fcaa623c8bd2b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

盒子阴影页面

滚动时，您会找到`自定义`。Tailwind CSS 中默认注册的值会显示在那里，所以如果你想用一个没有包含的值来设置它，请根据显示的设置方法将它添加到 `tailwind.config.js` 文件中。

![img](https://qiniucloud.qishilong.space/images/ae05979f17a24671b6e3f35e4156489f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## Tailwind CSS 插件设置

Tailwind CSS 提供了一些官方插件。让我们检查一下如何设置`tailwindcss / line-clamp`，这是插件之一。

当在浏览器上显示像下面这样的长句时，它也会在浏览器上显示多行。

```html
html
复制代码<div class="m-20">
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit a in ad voluptatem necessitatibus et laborum, minus amet aliquid pariatur fugit recusandae neque illum voluptatibus repellendus est natus harum modi maxime eos aliquam eum ratione tempore? Sapiente nam corrupti odio quibusdam dolore harum consequatur sint mollitia at? Voluptas quae eligendi quia omnis porro totam laudantium dolorum. Ipsum quasi cupiditate expedita! Dolor ut voluptatibus quos ipsa beatae, accusamus, a incidunt provident, delectus tempore id ex placeat quo laboriosam iusto velit animi molestiae dignissimos sint perspiciatis quis accusantium maxime corrupti. Repellat hic error in totam consequuntur non magni maiores quibusdam quidem cum.
  </div>
</div>
```

如果你只想查看前几行而不是所有行，则可以使用插件 `tailwindcss / line-clamp`。

```bash
bash
复制代码% npm install @tailwindcss/line-clamp
```

安装完成后，需要在`tailwind.config.js`中注册安装包的信息。

```css
css
复制代码    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
```

进行设置后，你将需要构建。运行 `npm run build`。构建完成后，使用插件的设置就完成了。

`line-clamp` 设置 `line-clamp` 后要显示的行数，如下所示。

```html
html
复制代码<div class="m-20">
  <div class="line-clamp-3">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit a in ad voluptatem 
//略
  </div>
</div>
```

只能显示设置了 line-clamp-3 的 3 行。

![img](https://qiniucloud.qishilong.space/images/61aa281aed594aff99fd8833fe3c0055~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

至此，我们已经了解了什么是 Tailwind CSS？搭建Tailwind CSS环境、如何使用 Tailwind CSS？ Tailwind CSS 定制以及插件的使用，相信大家对Tailwind CSS已经有一个全面的认识，接下来就是动手写了。