# http 缓存-关于强缓存介绍

## 由慢到快的过程

这里，模拟第一次打开某宝首页（浏览器未有缓存资源），打开开发者工具我们可以看到资源的加载情况。

![image-20240223200543110](https://qiniucloud.qishilong.space/images/image-20240223200543110.png)

重点关注下 `Size` 和 `Time` 列的数据，Size 列表示浏览器从服务器获取资源的大小，Time 列表示资源加载耗时。因为几乎每一个资源都需要从服务器获取并加载，所以网页打开速度会受到影响，这里浏览器用了 **1.64s** 加载完了页面的所有资源（图片、脚本、样式等），1.2 MB 的数据被传输到了本地。

那么从强缓存的角度来看，其实第一次访问网页时浏览器已经开始在背后进行强缓存的判断和处理，我们可以通过下方流程图一探究竟。

![image-20240223202632427](https://qiniucloud.qishilong.space/images/image-20240223202632427.png)

当浏览器发起 HTTP 请求时，会向浏览器缓存进行一次询问，若浏览器缓存没有该资源的缓存数据，那么浏览器便会向服务器发起请求，服务器接收请求后将资源返回给浏览器，浏览器会将资源的响应数据存储到浏览器缓存中，这便是**强缓存的生成过程**。

当第二次访问某宝，继续观察开发者工具中原来的几项指标。

![image-20240223202809669](https://qiniucloud.qishilong.space/images/image-20240223202809669.png)

Size 一列大部分由原先的资源加载大小变成了 `disk cache`（**磁盘缓存**），而变成这一数据对应的 Time 列资源加载速度异常之快，加载总耗时由原来的 1.64s 变成了 **1.23s**，而传输到本地的数据降到了 270 KB，**加载速度提升了 25%**（受网速影响该数据每次都不一样，只用做对比参考）。这便是强缓存生效导致的现象。

强缓存的生效流程如下图所示：

![image-20240223203638819](https://qiniucloud.qishilong.space/images/image-20240223203638819.png)

图中可以看到**浏览器并没有和服务器进行交互**，而是在发起请求时浏览器缓存告诉浏览器它那有该资源的缓存数据并且还没有过期，于是浏览器直接加载了缓存中的数据资源。

大家是否会认为只有开发者工具中的 Size 值变成了 disk cache 才代表强缓存生效，也称为**命中强缓存**。其实不然，别忘了开篇提到除了 Disk cache，还有 `Memory Cache`（**内存缓存**）。这时候我们不关闭 Tab 页，重新刷新下某宝页面，再观察下 Network 面板中的变化。

![image-20240223203851068](https://qiniucloud.qishilong.space/images/image-20240223203851068.png)

开发者工具中的 Size 列大部分变成了 memory Cache，其对应的 Time 列变成了 **0ms**。可见，**memory Cache 比 disk cache 更快**，快到不需要时间。加载总耗时缩短到了 800ms。

按照缓存位置的读取顺序，相比 disk cache，浏览器会优先读取 memory Cache。通过对以上开发者工具图例的对比不难得出，读取磁盘缓存会存在稍许的耗时，而读取内存缓存是及时性的，不存在耗时。

Disk cache 和 Memory Cache 这两者属于浏览器缓存的一部分，本章节不做详细的介绍。

## max-age 与 s-maxage

继续来看一下那些被浏览器缓存的资源的特点，响应报头中都包含了与强缓存有关的首部字段：Expires 或 Cache-Control。

![image-20240223204055691](https://qiniucloud.qishilong.space/images/image-20240223204055691.png)

按照上图所示报头的 Cache-Control 首部，根据上一章节介绍的知识点，此资源将被浏览器缓存 2592000 秒（即 30 天），30 天之内我们再次访问，该资源都将从浏览器缓存中读取，这不难理解。但是需要注意图中首部值还包括了 s-maxage=3600 秒，下面便到了划重点的时候：

-   **s-maxage 仅在代理服务器中生效**
-   **在代理服务器中 s-maxage 优先级高于 max-age，同时出现时 max-age 会被覆盖**

理解完以上两点，我们再来看一下该资源其实是一个 CDN 资源，属于代理服务器资源，在其服务器中的缓存时间并不是 30 天，而是 3600 秒（1 个小时），所以当浏览器缓存 30 天之后重新向 CDN 服务器获取资源时，此时 CDN 缓存的资源也已经过期，会触发回源机制，即向源服务器发起请求更新缓存数据。

![image-20240223204903652](https://qiniucloud.qishilong.space/images/image-20240223204903652.png)

以上例子直接描述了 max-age 与 s-maxage 的联系和区别。

## expires 与 max-age

上篇介绍到 **Expires 设置的缓存过期时间是一个绝对时间，所以会受客户端时间的影响而变得不精准**，这句话怎么理解？我们以下图为例来讲解：

![image-20240223205503472](https://qiniucloud.qishilong.space/images/image-20240223205503472.png)

该资源是掘金首页加载的一张图片，已经被笔者浏览器缓存，其首部 expires 字段值表示浏览器可以将该资源缓存至 2025年1月31日的上述时间点，那么在我们把图中 max-age 首部当做不存在的情况下（因为 max-age 会覆盖 expires 值），把电脑客户端时间修改为 2025年1月32日，此时再次访问网页你会发现浏览器重新向服务器获取了该资源，原来的缓存失效了。这便解释了 expires “不精准”的概念。

**expires “不精准” 是因为它的值是一个绝对时间，而 max-age 与其相反却是一个相对时间**，还是拿上图举例，由于 max-age 优先级更高，表示浏览器可以将该资源缓存 3153600 秒（365天），起始时间是从浏览器获取并缓存该资源的时间开始算起。那么此时我们修改电脑客户端时间为 1 年后，该缓存是否就不会失效了？

在此先给出答案：**缓存还是会失效**。

对于以上回答大家必然会产生不解，比如浏览器到底依据什么来判断缓存的有效期限？会在下一章给出答案。

## 结语

本文从访问网页由慢到快的现象出发，从现象到本质揭示了网页背后的浏览器强缓存生成和生效的过程，至于针对强缓存关键首部字段的介绍，本文通过对比方式让大家产生思考并提升知识点的理解程度，最后通过**不精准导致的资源失效问题**为下文埋下伏笔。

下文我们将继续探索强缓存背后的秘密，揭秘影响强缓存有效性的公式和原理。