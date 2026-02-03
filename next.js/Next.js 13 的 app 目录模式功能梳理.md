# Next.js 13 的 app 目录模式功能梳理

## 前言

Next.js 13 的 app 目录模式已经出来半年左右了，经过官方将近半年的迭代，大部分功能都完善了，用于生产环境的项目也可以考虑使用它来进行开发。（Next.js v13.4已经发布了app路由的稳定版本）

前段时间写了一篇 [Next.js了解篇｜一文带你梳理清楚Next.js的功能](https://juejin.cn/post/7206261082452639802) ，在文中梳理了 Next.js 13 使用旧版(pages/src)目录模式的功能，本篇文章将梳理 Next.js 13 新版(app)目录模式功能。

## Next.js app 目录模式的功能梳理

在梳理 Next.js 13 新目录模式之前，先来简单梳理一下旧的目录模式几个痛点：

1.  pages 目录的 js 文件全都会当成页面文件，导致组件不能写在 pages 目录下，使用起来不符合大部分人的代码组织习惯，虽然有一些方法可以处理，但仍然是一个不友好的点。
2.  几个入门级的 api ，比如 getInitialProps/getServerSideProps/getStaticProps 等等方法的使用并不是那么简单，不去深入了解渲染模式，对于 Next.js 初学者来说，不容易理解。
3.  服务端渲染和客户端渲染的代码有时候耦合会太深，有时候不好分清楚代码是在服务端渲染时执行的还是在客户端渲染时执行的，也容易出现一些错误，导致页面首次渲染时出现 hydrate 异常，这一点和第 2 点也有一些关系。

Next.js app 目录模式相对于[旧模式的功能列表](https://juejin.cn/post/7206261082452639802/#heading-1)说明：

1.  完善的工程化机制：变化较少
2.  良好的开发和构建性能：变化较少
3.  智能文件路由系统：app 目录模式完全解决了痛点 1 描述的问题，且极大的增强了代码的组织能力。
4.  多种渲染模式来保证页面性能体验：使用更加简单的方式让开发者来进行数据请求，且提供了数据缓存方式，以便于更方便的实现多种渲染模式，解决痛点 2 和 3 描述的问题，且带来了更好的客户端性能（尽量减少客户端需要加载的JS资源）。
5.  可扩展配置：提供了更加友好的配置方式，增强工程配置能力。
6.  提供其他多方面性能优化方案：变化较少
7.  提供性能数据，让开发者更好的分析性能：变化较少
8.  提供的其他常用功能或者扩展：供了更多更好的扩展方式。

其中最核心的变化就是第3、4点，下面对这两点单独进行简要的说明，更详细的内容还在写作中，结尾会有预告。

## 智能文件路由系统

以前的 pages 模式太过于笼统，导致了代码组织不符合习惯，而 app 模式则更加灵活，制定了更加完善的规范，让开发者组可以更好的组织代码。

app 模式主要从以下三个方面来扩展和调整文件路由系统：

-   约定页面相关内容
-   平行路由和插槽功能
-   约定 web api 路由实现

还有个 `拦截路由` 的功能路由定义方式，经过测试感觉这个暂时还有一些问题，本篇文章暂不涉及。

当前默认还是 pages 模式，可在配置中开启 app 模式：

[AI律师助理使用指南](https://kdocs.cn/l/ctQj3jDiWALh)

```js
js
复制代码// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  }
}

module.exports = nextConfig
```

### 约定页面相关内容

指约定一个页面需要有一个单独的目录，目录下约定以下文件：

-   `page.js` - 页面组件（`app/page.js`代表路由为 `/` 的页面，其实就类似于取代 `index.js`），有 page.js 才能表明该约定文件路由是一个页面
-   `layout.js` - 布局组件，切换路由时保留状态，不重新渲染。
-   `template.js` - 模版组件，和 `layout` 类似，但切换路由时会重新渲染，不保留状态。
-   `loading.js` - 加载组件，就是使用 `Suspense` 组件包裹 `Page` 组件，在 `Page` 组件渲染返回内容之前显示加载组件。
-   `error.js` - 错误文件，页面渲染异常的时候显示的组件。
-   `not-found.js` - 页面404组件，只在 `app` 目录下第一级目录生效，存在时只有根 layout 生效。

除了 `not-found.js` ，其他的约定组件则对app下所有目录生效。

这些将在合适的时机按照一定顺序组合显示到页面上，比如下面这样一个目录结构：

```tree
tree
复制代码app
├── features
│   ├── metadata
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── template.tsx
│   ├── loading.tsx
│   └── error.tsx
├── page.tsx
├── layout.tsx
├── template.tsx
├── loading.tsx
├── error.tsx
└── not-found.tsx
```

路由为 `/` 页面会组合成这样的代码结构：

```tsx
tsx
复制代码<Layout>
    <Template>
        <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<Loading />}>
                <Page />
            </Suspense>
        </ErrorBoundary>
    </Template>
</Layout>
```

路由为 `/features/metadata` 页面的代码结构：

```tsx
tsx
复制代码<Layout>
    <Template>
        <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<Loading />}>
                <Layout>
                    <Template>
                        <ErrorBoundary fallback={<Error />}>
                            <Suspense fallback={<Loading />}>
                                <Page />
                            </Suspense>
                        </ErrorBoundary>
                    </Template>
                </Layout>
            </Suspense>
        </ErrorBoundary>
    </Template>
</Layout>
```

如果访问不存在的路由，则代码结构为：

```tsx
tsx
复制代码<Layout>
    <NotFound />
</Layout>
```

### 平行路由和插槽功能

也就是多个平行的路由可以在同一个页面当成组件来显示，提升代码的组织能力。

使用方式为：使用 `@` 开头的目录名下面的文件，将会自动注入到 `Layout` 组件的 props 中。

比如有一个数据面板页面，页面分为了两个模块：用户数据模块、性能数据模块

```tree
tree
复制代码app
├── dashboard
│   ├── @userInfo  // 用户行为数据模块
│   │   ├── devices  // 用户设备信息
│   │   │   └── page.tsx
│   │   ├── locations  // 用户地理位置分布
│   │   │   └── page.tsx
│   │   ├── default.tsx
│   │   └── page.tsx
│   ├── @performance  // 性能数据模块
│   │   ├── app  // app 性能数据
│   │   │   └── page.tsx
│   │   ├── web  // web性能数据
│   │   │   └── page.tsx
│   │   ├── default.tsx
│   │   ├── page.tsx
│   │   └── default.tsx
│   └── layout.tsx
├── page.tsx
└── layout.tsx
```

`app/dashboard/layout.tsx` 代码：

```tsx
tsx
复制代码import Link from "next/link";

export default function Layout({ children, userInfo, performance }: any) {
  return (
    <>
      {children}
      <h2>用户行为数据</h2>
      {/* 导航 */}
      <div>
        <Link href={"/dashboard/devices"}>设备信息 </Link>
        <Link href={"/dashboard/locations"}>地理位置</Link>
      </div>
      <div className="userInfo">{userInfo}</div>
      <br />
      <h2>性能数据</h2>
      {/* 导航 */}
      <div>
        <Link href={"/dashboard/app"}>app 性能数据</Link>
        <Link href={"/dashboard/web"}>web 性能数据</Link>
      </div>
      <div className="performance">{performance}</div>
    </>
  );
}
```

其实也就是把路由当成组件来组织，如果你喜欢这种模式，那么可以这样使用，如果不喜欢，也可以自己单独写成组件，这样算是新增了一种规范，且省略了不少 `import` 代码。

从上面的代码可以看出来，路由是忽略插槽的，也就是 `app/dashboard/@performance/app` 路由为：`/dashboard/app`。

因此两个插槽内部的目录名需要不一样，否则切换同一个路由的时候另外一个也会变化，但如果想同步切换的话，特意写成一样也算是一种运用方式。

但这种插槽方式有一些问题，而且都是使用路由进行定位显示的组件，并行多个插槽会导致切换到某个插槽路由的后，如果刷新页面，那么只会定位到一个插槽的位置，其他路由的插槽会定位不到而导致整个页面显示 404。

比如在页面先后点击了 `设备信息` 和 `app 性能数据` ，页面会同时显示 `/dashboard/page.tsx` 、 `/dashboard/@performance/devices/page.tsx` 和 `/dashboard/@userInfo/app/page.tsx` 的内容。但刷新后，因为这时路由是 `/dashboard/app` ，因此只会显示 `/dashboard/@userInfo/app/page.tsx` 的内容，这里可以验证一个点，`children` 也是一个插槽，`/dashboard/page.tsx` 代指的就是 layout 组件里面的 `children`。

这时就是 `default.tsx` 发挥作用的时候了，当请求匹配不少就会读 `default.tsx`，而不会读取 `page.tsx`，但默认没有只路由的时候显示的又是 `page.tsx` ，比如这里访问 `/dashboard` 路由，因此如果 `default.tsx` 和 `page.tsx` 内容需要保持一致时，只保留 `default.tsx`，去除 `page.tsx`就行，没有 `default.tsx` 页面匹配不到时会 404，没有 `page.tsx` 却不会，可以说算是一个bug，不知道后面会不会修复。

还有一个注意点，插槽里面不能有自己的 layout 组件或者其他组件，但插槽内部的页面是可以有的。

### 约定 web api 路由实现

约定 `route.js` 为 api 文件，和 `page` 类似，即 `app/test/api/user/route.js` 代表的web接口为 `/test/api/user`，可以定义 GET 、POST、PUT、PATCH、DELETE、HEAD 和 OPTIONS 请求方式。如果调用了未定义的请求方式，则返回 405，表示不支持该请求方式。

写法如下：

```ts
ts
复制代码import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Record<string, string | string | undefined[]> }) {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return NextResponse.json({ data })
}

export async function POST(req: NextRequest, { params }: { params: Record<string, string | string | undefined[]> }) {
  // ...
  return NextResponse.json({
      // ...
  })
}
```

`route.js` 和 `page.js` 冲突，当有 `page.js` 时，`route.js` 就不会生效。

注意这里的 `web api` 路由和之前的 `pages/api` 是不一样的定义，虽然有些相似，但差别还是挺大的，如果使用了 `web api` 路由，则尽量不用再使用 `pages/api`，不过当前 `pages/api` 路由还没有支持 `revalidate` 下发指令的功能，后续也许会支持。

还有其他疑问可以去官方查看文档： [Route Handlers](https://link.juejin.cn/?target=https%3A%2F%2Fbeta.nextjs.org%2Fdocs%2Frouting%2Froute-handlers)

## 多种渲染模式来保证页面性能体验

app模式来处理渲染模式会比pages目录模式简单很多，主要是因为新的模式对js代码的管理方式进行了变更：

>   默认的js文件都只会运行在服务端，不会出现在客户端，如果需要在客户端进行交互的组件，那么需要在 `js` 文件最顶部添加 `"use client"` 来标识，表明代码需要在客户端运行，这时候这部分代码才会出现在客户端。

也就是代码默认只在服务端，那怎么实现多种渲染模式呢？

-   SSG：页面默认就是 SSG
-   CSR：在使用 `"use client"` 的客户端组件中进行请求数据，也是基于SSG，然后在客户端 hydrate 后进行请求数据更新页面内容。
-   SSR：服务端组件声明为异步组件，也就是 async 函数组件，且数据请求关闭缓存，也就是fetch请求时第二个参数中的cache字段设置为 `no-store` 、 `no-cache` 或者 设置`revalidate` 为 `0` 的时候，才会是动态服务端渲染。
-   ISR：在请求中设置 `revalidate` ，或者在 `page.js` 中设置 `revalidate` :`export revalidate = 60` 60秒进行增量静态化，也可以继续使用 `pages/api/revalidate` 的指令方式，需要注意还是需要写在 `pages` 目录。

不了解渲染模式的可以去看看 [理解前端基础渲染模式｜CSR、SSR、同构、静态化](https://juejin.cn/post/7204085076504920119)

其实 app 模式中不再需要根据一些默认导出函数来决定函数的渲染方式，但也需要注意页面到底使用的是哪种渲染模式，才能对整个应用的页面的性能有一定的把控。

## 最后

本篇文章只是对 Next.js 新模式功能的一个整体梳理，官方有新功能或者大变动，将会同步到此篇文章。

后续将会针对这些功能进行具体运用和原理探索，计划目录如下（不分先后顺序，正在写作过程中，写完就会单独发文章）：

-   Next.js 运用之项目初始化 - 利用完善的工程化机制，制定合适的项目文件目录结构，再结合一些工具，打造一个 Next.js 通用项目模版。
-   Next.js 运用之开发和构建性能探索 - 验证开发性能和构建性能。
-   Next.js 运用之智能文件路由系统探索 - 探索智能文件路由系统的整体功能。
-   Next.js 运用之数据请求和渲染模式 - 数据请求往往作为一个应用的核心部分，也决定了运用哪种渲染模式。
-   [Next.js 之metadata的运用和原理探索](https://juejin.cn/post/7222179242956095543) - Next.JS 新模式使用了 metadata 来取代 Head。
-   ......（有计划了再进行更新）