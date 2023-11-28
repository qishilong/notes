# 基础教程

## 一、前言

本文基于开源项目：

>   https://github1s.com/vercel/next.js
>
>   https://nextjs.org/

## 二、基础知识

### 系统环境需求

Node.js 12.22.0 或更高版本

MacOS、Windows (包括 WSL) 和 Linux 都被支持



### 安装

```
yarn global add create-next-app
# or
npm i -g create-next-app
```



or 官方推荐

```
npx create-next-app@latest
# or
yarn create next-app
```

TypeScript 项目

```
npx create-next-app@latest --typescript
# or
yarn create next-app --typescript
```



## 三、目录梳理

### 运行Demo

我们安装好项目，运行：**http://localhost:3000/**

### 目录结构说明

![image.png](https://qiniucloud.qishilong.space/images/pb2xwjvbsnpdo_eb19c339af9b4b6ab217904fb8f24d9c.png)



next.config.js // 是我们的配置文件，用来修改next以及webpack的配置

pages       // Next.js路由文件夹

|--index.js    // 入口文件

|--_app.js     // 用来定义一些页面共用的

Home.module.css // 带有.module后缀的样式文件一般是用来做样式隔离的



【温馨提示】

一般抽取组件的时候，我们可以在根目录创建components文件夹

（不能存储在pages目录，会导致路由错乱）



## 四、配置修改

### 便捷开发

一般在Next项目中，我们会结合antd搭配开发，常见的两种使用方式如下：



一、Next.js + Antd (with Less)

安装

```
yarn add next-plugin-antd-less
yarn add --dev babel-plugin-import
```



使用

```
// next.config.js
const withAntdLess = require('next-plugin-antd-less');
module.exports = withAntdLess({
  // 可选
  modifyVars: { '@primary-color': '#04f' },
  // 可选
  lessVarsFilePath: './src/styles/variables.less',
  // 可选
  lessVarsFilePathAppendToEndOfContent: false,
  // 可选 https://github.com/webpack-contrib/css-loader#object
  cssLoaderOptions: {},
  // 其他配置在这里...
  webpack(config) {
    return config;
  },
  //  仅适用于 Next.js 10，如果您使用 Next.js 11，请删除此块
  future: {
    webpack5: true,
  },
});
```



添加一个 .babelrc.js

```
// .babelrc.js
module.exports = {
  presets: [['next/babel']],
  plugins: [['import', { libraryName: 'antd', style: true }]],
};
```

详细前往：https://www.npmjs.com/package/next-plugin-antd-less



二、安装antd同时也开启css modules



安装支持**next-css****、**babel-plugin-import



```
yarn add @zeit/next-css babel-plugin-import
# or
npm install @zeit/next-css babel-plugin-import --save-dev
```



修改babelrc

```
{
    "presets": [
        "next/babel"
    ],
    "plugins": [
        [
            "import",
            {
                "libraryName": "antd",
                "libraryDirectory":"lib",
                "style": true
            }
        ]
    ]
}
```



增加next-less.config.js

```
const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }
      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        lessLoaderOptions = {}
      } = nextConfig
      options.defaultLoaders.less = cssLoaderConfig(config, {
        extensions: ['less'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'less-loader',
            options: lessLoaderOptions
          }
        ]
      })
      config.module.rules.push({
        test: /\.less$/,
        exclude: /node_modules/,
        use: options.defaultLoaders.less
      })
      // 我们禁用了antd的cssModules
      config.module.rules.push({
        test: /\.less$/,
        include: /node_modules/,
        use: cssLoaderConfig(config, {
          extensions: ['less'],
          cssModules:false,
          cssLoaderOptions:{},
          dev,
          isServer,
          loaders: [
            {
              loader: 'less-loader',
              options: lessLoaderOptions
            }
          ]
        })
      })
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    }
  })
}
```



修改next.config.js

```
const withLessExcludeAntd = require("./next-less.config.js")
// choose your own modifyVars
const modifyVars = require("./utils/modifyVars")
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}
module.exports = withLessExcludeAntd({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: modifyVars
    }
```

详细前往：https://www.yuque.com/steven-kkr5g/aza/ig3x9w



三、组件级css

Next.js 通过 [name].module.css 文件命名约定来支持 CSS 模块 。



## 五、SSG和SSR

### SSG-静态生成

最简单、性能也最优的预渲染方式就是静态生成（SSG），**把组件渲染工作完全前移到编译时**：

-   （编译时）获取数据
-   （编译时）渲染组件，生成 HTML



  Demo:

```
// pages/demo.js
export default function Home(props) { ... }
 
// 获取静态数据
export async function getStaticProps() {
  const data = ...
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

getStaticProps只在服务端执行（根本不会进入客户端 bundle），返回的静态数据会传递给页面组件（上例中的Home）。也就是说，要求通过getStaticProps提前备好页面所依赖的全部数据，数据 ready 之后组件才开始渲染，并生成 HTML。



Tips:  只有页面能通过`getStaticProps`声明其数据依赖，普通组件不允许，所以要求将整页依赖的所有数据都组织到一处。



### SSR-服务端渲染

Next.js 提供了 SSR 专用的getServerSideProps(context)：



```
// pages/demo.js
export async function getServerSideProps(context) {
  const res = await fetch(`https://...`)
  const data = await res.json()
 
  if (!data) {
    return {
      notFound: true,
    }
  }
 
  return {
    props: {}, // will be passed to the page component as props
  }
}
```



每个请求过来时都执行，所以能够拿到请求上下文参数（context）

## 六、路由系统

   Nextjs默认匹配pages目录的index.js作为根路径/，其他的路径也是这样按文件名匹配的。



### 路由跳转

  Nextjs官方推荐了两种跳转方式，一种是Link组件包裹，一种使用Router。Link的原理也是用Router实现的，Link用起来总感觉很冗余，个人推荐使用Router。



  Nextjs提供了一个'next/router'的包，专门用来处理路由。Router便是其中一个对象，Router.push('url')进行跳转。



简单Demo：

```
import React from 'react'     
import Router from 'next/router'
export default () => {
 return(
    <>
      <button onClick={()=>Router.push('/demo')} >前往demo页</button>
      <div>这里是首页</div>
    </>
  )
}
```



### 路由传参

  Nextjs使用query传参数!



官方例子：

```
import { useRouter } from 'next/router'
export default function ReadMore({ post }) {
  const router = useRouter()
  return (
    <button
      type="button"
      onClick={() => {
        router.push({
          pathname: '/post/[pid]',
          query: { pid: post.id },
        })
      }}
    >
      Click here to read more
    </button>
  )
}
```



接收参数的时候使用props.router.query.pid



### 6个路由钩子

```
// routeChangeStart     history模式路由改变刚开始  
// routeChangeComplete  history模式路由改变结束
// routeChangeError     路由改变失败
// hashChangeStart      hash模式路由改变刚开始
// beforeHistoryChange  在routerChangeComplete之前执行
// hashChangeComplete   hash模式路由改变结束
```



来个Demo看看：

```
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'  
 
const Home = () => {
    /**6个钩子事件
    routeChangeStart
    routerChangeComplete
    beforeHistoryChange
    routeChangeError
    hashChangeStart
    hashChangeComplete*/
    //路由开始变化
    Router.events.on('routeChangeStart',(...args)=>{
        console.log('1.routeChangeStart->路由开始变化，参数为：',...args)
    })
    //路由变化结束
    Router.events.on('routeChangeComplete',(...args)=>{
        console.log('2.routeChangeComplete->路由变化结束，参数为：',...args)
    })
    //Next.js全部都用History模式
    Router.events.on('beforeHistoryChange',(...args)=>{
        console.log('3.beforeHistoryChange，参数为：',...args)
    })
    //路由发生错误时，404不算
    Router.events.on('routeChangeError',(...args)=>{
        console.log('4.routeChangeError->路由发生错误，参数为：',...args)
    })
    //Hash路由切换之前
    Router.events.on('hashChangeStart',(...args)=>{
        console.log('5.hashChangeStart，参数为：',...args)
    })
    //Hash路由切换完成
    Router.events.on('hashChangeComplete',(...args)=>{
        console.log('6.hashChangeComplete，参数为：',...args)
    })
 
    function gotoSport(){
        Router.push({
            pathname:'/sport',
            query:{name:'前端早茶'}
        })
        // 同以下：
        // Router.push('/sport?前端早茶')
    }
 
    return (
        <>
            <div>调试下6个钩子</div>
            <div>
                <Link href={{pathname:'/sport',query:{name:'前端早茶'}}}><a>选择前端早茶</a></Link>
                <br/>
                <Link href="/sport?name=广东靓仔"><a>选择广东靓仔</a></Link>
            </div>
            <div>
                <button onClick={gotoSport}>选前端早茶</button>
            </div>
            <!-- 这里没有设置锚点，因此不会有跳转效果 -->
            <div>
                <Link href='/#juan'><a>选Juan</a></Link>
            </div>
        </>
    )
}
```



## 七、状态管理

### Token存储

SSR之间只能通过cookie才能在Client和Server之间通信，以往我们在SPA项目中是使用localStorage或者sessionStorage来存储，但是在SSR项目中Server端是拿不到的，因为它是浏览器的属性，要想客户端和服务端同时都能拿到我们可以使用Cookie，所以token信息只能存储到Cookie中。



### 集成状态管理器

大型项目推荐使用Redux，方便我们维护以及二次开发。



**四个步骤**

-   创建store/axios.js文件
-   修改pages/_app.js文件
-   创建store/index.js文件
-   创建store/slice/auth.js文件
-   

**核心梳理：**pages/_app.js文件使用next-redux-wrapper插件将redux store数据注入到next.js。



```
import {Provider} from 'react-redux'
import {store, wrapper} from '@/store'
 
const MyApp = ({Component, pageProps}) => {
  return <Component {...pageProps} />
}
 
export default wrapper.withRedux(MyApp)
```



### store/index.js文件

使用@reduxjs/toolkit集成reducer并创建store，

使用next-redux-wrapper连接next.js和redux，

使用next-redux-cookie-wrapper注册要共享到cookie的slice信息。



```
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper";
import {authSlice} from './slices/auth';
import logger from "redux-logger";
 
const combinedReducers = combineReducers({
  [authSlice.name]: authSlice.reducer
});
export const store = wrapMakeStore(() => configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      nextReduxCookieMiddleware({
        // 在这里设置在客户端和服务器端共享的cookie数据
        subtrees: ["auth.accessToken", "auth.isLogin", "auth.me"], 
        }) 
    ).concat(logger) 
}));
const makeStore = () => store; 
export const wrapper = createWrapper(store, {storeKey: 'key', debug: true});
```



store/slice/auth.js

```
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from '../axios';
import qs from "qs";
import {HYDRATE} from 'next-redux-wrapper';
 
// 获取用户信息
export const fetchUser = createAsyncThunk('auth/me', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/account/me');
    return response.data.name;
  } catch (error) {
    return thunkAPI.rejectWithValue({errorMsg: error.message});
  }
});
 
// 登录
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
  
    // 获取token信息
    const response = await axios.post('/auth/oauth/token', qs.stringify(credentials));
    const resdata = response.data;
    if (resdata.access_token) {
      // 获取用户信息
      const refetch = await axios.get('/account/me', {
        headers: {Authorization: `Bearer ${resdata.access_token}`},
      });
      
      return {
        accessToken: resdata.access_token,
        isLogin: true,
        me: {name: refetch.data.name}
      };
    } else {
      return thunkAPI.rejectWithValue({errorMsg: response.data.message});
    }
 
  } catch (error) {
    return thunkAPI.rejectWithValue({errorMsg: error.message});
  }
});
 
// 初始化数据
const internalInitialState = {
  accessToken: null,
  me: null,
  errorMsg: null,
  isLogin: false
};
 
// reducer
export const authSlice = createSlice({
  name: 'auth',
  initialState: internalInitialState,
  reducers: {
    updateAuth(state, action) {
      state.accessToken = action.payload.accessToken;
      state.me = action.payload.me;
    },
    reset: () => internalInitialState,
  },
  extraReducers: {
    // 水合，拿到服务器端的reducer注入到客户端的reducer，达到数据统一的目的
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return Object.assign({}, state, {...action.payload.auth});
    },
    [login.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isLogin = action.payload.isLogin;
      state.me = action.payload.me;
    },
    [login.rejected]: (state, action) => {
      console.log('action=>', action)
      state = Object.assign(Object.assign({}, internalInitialState), {errorMsg: action.payload.errorMsg});
      console.log('state=>', state)
      // throw new Error(action.error.message);
    },
    [fetchUser.rejected]: (state, action) => {
      state = Object.assign(Object.assign({}, internalInitialState), {errorMsg: action.errorMsg});
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.me = action.payload;
    }
  }
});
 
export const {updateAuth, reset} = authSlice.actions;
```


Tips:

1、使用了next-redux-wrapper一定要加HYDRATE，目的是同步服务端和客户端reducer数据，否则两个端数据不一致造成冲突

2、注意next-redux-wrapper和next-redux-cookie-wrapper版本



## 八、旧项目升级Next12

温馨提示：看Nextjs的文档我们最好选择英文版本，中文文档好像很久不更新了



### React Server Components

允许我们在服务器上渲染所有内容，包括组件本身。



开启配置：

```
// next.config.js
module.exports = {
  experimental: {
    concurrentFeatures: true,
    serverComponents: true
  }
}
```



现在我们可以在组件级别进行数据获取，通过使用 React Server 组件，我们可以简化事情。不再需要`getServerSideProps`或`getStaticProps`。



我们可以将任何 Next.js 页面重命名为`.server.js`以创建服务器组件并直接在我们的服务器组件中导入客户端组件。



我们需要安装React18才能使用哦~

React 18添加了新功能，包括 Suspense、自动批处理更新、API 等`startTransition`，以及支持`React.lazy`.



## 详细内容

官方出了一个 demo ：https://github1s.com/vercel/next-rsc-demo/blob/HEAD/pages/ssr.js

demo在线预览地址：https://next-news-rsc.vercel.sh/



目录如下所示：

![image.png](https://qiniucloud.qishilong.space/images/pb2xwjvbsnpdo_94cc7c4c3d424ec5b11fe20a15624fe8.png)



**以往的SSR****：**

```
import Page from '../components/page.client'
import Story from '../components/story.client'
import Footer from '../components/footer.client'
// Utils
import fetchData from '../lib/fetch-data'
import { transform } from '../lib/get-item'
export async function getServerSideProps() {
  const storyIds = await fetchData('topstories', 500)
  const data = await Promise.all(
    storyIds
      .slice(0, 30)
      .map((id) => fetchData(`item/${id}`).then(transform))
  )
  return {
    props: {
      data,
    },
  }
}
export default function News({ data }) {
  return (
    <Page>
      {data.map((item, i) => {
        return <Story key={i} {...item} />
      })}
      <Footer />
    </Page>
  )
}
```

页面添加 getServerSideProps 函数用于 服务端获取数据，每个页面都需要这样编写。



**更新后rsc.server.js ：**

```
import { Suspense } from 'react'
// Shared Components
import Spinner from '../components/spinner'
// Server Components
import SystemInfo from '../components/server-info.server'
// Client Components
import Page from '../components/page.client'
import Story from '../components/story.client'
import Footer from '../components/footer.client'
// Utils
import fetchData from '../lib/fetch-data'
import { transform } from '../lib/get-item'
import useData from '../lib/use-data'
function StoryWithData({ id }) {
  const data = useData(`s-${id}`, () => fetchData(`item/${id}`).then(transform))
  return <Story {...data} />
}
function NewsWithData() {
  const storyIds = useData('top', () => fetchData('topstories'))
  return (
    <>
      {storyIds.slice(0, 30).map((id) => {
        return (
          <Suspense fallback={<Spinner />} key={id}>
            <StoryWithData id={id} />
          </Suspense>
        )
      })}
    </>
  )
}
export default function News() {
  return (
    <Page>
      <Suspense fallback={<Spinner />}>
        <NewsWithData />
      </Suspense>
      <Footer />
      <SystemInfo />
    </Page>
  )
}
```

可以看到，我们还是按平时React项目来开发就可以实现SSR了。
最重要的一点，支持 HTTP Streaming，文档还没加载完，页面已经开始渲染了。

详情前往：https://nextjs.org/blog/next-12

