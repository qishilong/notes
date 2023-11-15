# 如何给你的 Next.js（App 路由）应用添加 RSS

本文将详细讲述如何添加 RSS 功能到你的 Next.js（app 路由）网站当中。

随着 Next.js 13 的 App 路由前阵子在 Vercel Ship 上宣布进入了[Stable（稳定)版](https://nextjs.org/blog/next-13-4)以后，越来越多的 Next.js 开发者肯定都陷入了窘境，意味着从今以后我们新建项目都会默认使用 App 路由了，也就代表着你不得不去重新学习一遍这崭新的 Next.js 应用架构。

在我看来，Next.js 目前的 App 路由变“稳定”是个**海市蜃楼**，它当然还有很长的路要走才能真正达到 **bug 少，兼容性拓展性高**。

Pages 目录迁移到 App 目录不是件容易事，特别是如果你的代码库特别庞大的话。而且新的 RSC（React Server Component)也不一定适用所有项目，加上整个 paradigm shift 范式转移会让原本的“前端”开发转向了真·全栈开发。

相信这一系列举动必然会给很多原本缺乏后端知识或者技能的前端小伙伴们增添了不少困惑，我也会在以后出一些关于 Next.js App 路由模式下的各类教程和指南。

好了，吐槽 Next.js 的废话就到这里了，接下来开始正片。

一般我们在网站里添加 RSS 功能的原因比较简单，大多数人我相信应该都是为自己的博客文章去添加支持 RSS 方便他人订阅。

不过不管你是什么原因，给你的 Next.js 站点添加 RSS 订阅其实非常容易，让我们开始吧！

## 安装依赖

首先我们需要安装 `rss` 这个 npm 库，它可以帮我们生成最终渲染出来的 RSS xml 格式，那就用你最喜欢的包管理器（npm/yarn/pnpm）添加到你的 Next.js 项目中吧：

命令行

```sh
1npm i rss && npm i -D @types/rss
2yarn add rss && yarn add -D @types/rss
3pnpm i rss && pnpm i -D @types/rss
```

为什么我们选择用 rss 呢？

其实主要是因为在我踩了 [![img](https://qiniucloud.qishilong.space/images/favicon?url=www.npmjs.png)feed](https://www.npmjs.com/package/feed) 的坑以后还是发现 rss 更好用一点 😂。（比如在 iOS Safari 中访问 rss 地址的话会出现自动添加 `.rss` 后缀导致不会自动触发 iOS 的 RSS 全局检测链接从而打开兼容的阅读器自动触发添加操作）

总而言之，我推荐你使用 `rss` 而不是 `feed`。

那我们安装好了以后要怎么开始实现 RSS 功能呢？

## API 路由定义

首先就是我们需要明确自己的 RSS 订阅最终地址是什么，常见的地址后缀有：

-   `/feed`
-   `/feed.xml`
-   `/rss`
-   `/rss.xml`

那么如果你跟我一样，就会想让自己的网站适配到每一个地址都可以访问。

完全没问题的，我们等下就来专门利用 Next.js 的 Rewrite 功能来实现一下。

但我们需要一个入口，所以无论你选哪个都是 OK 的，为了本教程，我选择标准化的 `/feed.xml`

首先我们在 app 路由下需要添加一个 [![img](https://qiniucloud.qishilong.space/images/favicon?url=nextjs.png)Route Handler（路由解析器)](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)，一个简单的例子比如我们想发一条 **GET/POST/PATCH/DELETE** 请求到某个接口，那么在 app 路由的范式下，我们就称之为一个 **Route Handler**。

![img](https://qiniucloud.qishilong.space/images/image?url=https%253A%252F%252Fcdn.sanity.io%252Fimages%252Fi81ys0da%252Fproduction%252Fb17773bfca3b54d8389e3977b6b76f7454591015-1600x444.png)

Next.js Route Handler 示例

其实要想定义一个 Route Handler，我们不一定要放在 api 文件夹下，特别是我们现在想实现的场景是访问 `/feed.xml`从而达到渲染 RSS xml，那么我们完全可以用 **[![img](https://qiniucloud.qishilong.space/images/favicon?url=nextjs.png)Static Route Handler](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#static-route-handlers)（静态路由解析）** 来帮我们。

接下来我们在 app 目录下创建一个文件夹叫 feed.xml（没错，文件夹可以带任何看起来像文件类型后缀一样的字符，所以你也可以创建一个 `.php` 后缀的路由，然后看起来就很值钱了，距离兰博基尼梦不远了），然后在这个文件夹里创建一个 `route.ts` 文件：

app/feed.xml/route.ts

```typescript
1import RSS from 'rss'
2
3export async function GET() {
4  const feed = new RSS({
5    title: '你的网站标题',
6    description: '你的网站介绍',
7    site_url: 'https://yourdomain.com', // 你的网站域名
8    feed_url: 'https://yourdomain.com/feed.xml', // 尽可能用绝对 URL
9    language: 'zh-CN', // 网站语言代码
10    image_url: 'https://yourdomain.com/opengraph-image.png', // 放一个叫 opengraph-image.png 的1200x630尺寸的图片到你的 app 目录下即可
11    generator: 'PHP 9.0', // 想写什么就写什么，也可以不提供
12  })
13 
14  return new Response(feed.xml(), {
15    headers: {
16      'content-type': 'application/xml'
17    }
18  })
19}
```

基本上我们的文件结构就是这样子。

接下来需要你在这个路由里去动态的获取你所有的数据源，可以是从数据库里获取的文章数据，也可以是从 CMS 获取的数据。

因为我没办法知道你的具体数据源来自哪里，所以这里我假设你有一个 async 函数可以获取数据源叫做 `fetchData`：

app/feed.xml/route.ts

```typescript
1import RSS from 'rss'
2
3export async function GET() {
4  const feed = new RSS({
5    title: '你的网站标题',
6    description: '你的网站介绍',
7    site_url: 'https://yourdomain.com', // 你的网站域名
8    feed_url: 'https://yourdomain.com/feed.xml', // 尽可能用绝对 URL
9    language: 'zh-CN', // 网站语言代码
10    image_url: 'https://yourdomain.com/opengraph-image.png', // 放一个叫 opengraph-image.png 的1200x630尺寸的图片到你的 app 目录下即可
11    generator: 'PHP 9.0', // 想写什么就写什么，也可以不提供
12  })
13
14  const data = await fetchData() // 获取文章数据才能填充 RSS feed
15  // 假设 data 是一个类型为文章的数组：
16  data.forEach((post) => {
17    feed.item({
18      title: post.title, // 文章名
19      guid: post.id, // 文章 ID
20      url: `https://yourdomain.com/blog/${post.slug}`, // 文章的链接
21      description: post.description, // 文章的介绍，如果有的话
22      date: new Date(post.publishedAt), // 文章的发布时间
23      enclosure: {
24        url: post.imageUrl, // 文章的图片，如果有的话
25      }
26    })
27  })
28 
29  return new Response(feed.xml(), {
30    headers: {
31      'content-type': 'application/xml'
32    }
33  })
34}
```

到这里就大功告成啦，在本地通过启动 Next.js 进程（`npm run dev`）以后到浏览器里访问 `http://localhost:3000/feed.xml`，你应该就可以看到 xml 被成功打印出来了。

![img](https://qiniucloud.qishilong.space/images/image?url=https%253A%252F%252Fcdn.sanity.io%252Fimages%252Fi81ys0da%252Fproduction%252F8aebc6a3ae1d29621c01e9c8164ca3308d3d8432-2568x1608.png)

## 多路由匹配

为了实现让 `/rss` `/rss.xml` `/feed` 都能获取到相同的 xml 内容，我们需要借力 Next.js 自带的[Rewrites（路由重写)](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites)功能：

next.config.js

```javascript
1module.exports = {
2  // ...
3  async rewrites() {
4    return [
5      {
6        source: '/rss',
7        destination: '/feed.xml',
8      },
9      {
10        source: '/rss.xml',
11        destination: '/feed.xml',
12      },
13      {
14        source: '/feed',
15        destination: '/feed.xml',
16      },
17    ]
18  },
19}
```

这样就完成了在你的网站可以通过以下4个地址访问到你的 RSS 订阅：

-   `/feed`
-   `/feed.xml`
-   `/rss`
-   `/rss.xml`

## 小技巧

大部份浏览器都支持 RSS Autodiscovery（自动识别 RSS），那我们如果也希望给自己的网站加上这个功能的话，就必须要在 HTML 的 `<head>` 标签里添加： `<link rel="alternate" type="application/rss+xml"title="RSS Feed"href="" />`

在 Next.js 的 app 路由范式下，我们有 [**Metadata**](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) 可以让我们少写一点 `<head>` HTML：

app/layout.tsx

```tsx
1import type { Metadata } from 'next'
2
3export const metadata = {
4  // ...
5  alternates: {
6    canonical: 'https://yourdomain.com',
7    types: {
8      'application/rss+xml': [{ url: 'feed.xml', title: 'RSS 订阅' }],
9    },
10  },
11} satisfies Metadata
```

这回我们网站的 RSS 功能就算比较完整了。

## 回顾总结

本次知识点回顾：

1.  我们运用了[!**Static Route Handler**](https://nextjs.org/docs/app/building-your-application/routing/router-handlers#static-route-handlers) 来生成静态的 `/feed.xml`；
2.  我们运用了 [**Rewrites**](https://nextjs.org/docs/app/api-reference/next-config-js/rewrites) 来实现多路由的重写映射；
3.  我们运用了 [**Metadata**](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) 来为网站添加 RSS Autodiscovery；

最后奉上我在 [Feedly](https://feedly.com/) 里测试添加 RSS 后的效果图：

![img](https://qiniucloud.qishilong.space/images/image?url=https%253A%252F%252Fcdn.sanity.io%252Fimages%252Fi81ys0da%252Fproduction%252Fc95f87cfa45eb59161793f6772fda838b286969b-2713x2027.png)

在 Feedly 中添加后的效果图