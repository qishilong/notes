# React SSR 原理梳理

## 背景

本文从React + Redux + React-Router + Express 搭建的 SSR 框架具体讲一下 Next.js 的同构和getServerSideProps是如何实现的

## 什么是SSR

CSR是Client Side Render简称；页面上的内容是我们加载的js文件渲染出来的，js文件运行在浏览器上面，服务端只返回一个html模板。
![image.png](https://qiniucloud.qishilong.space/images/bVcWUkE.png)
服务端渲染（Server-Side Rendering），页面上的内容是通过服务端渲染生成的，服务端直接返回拼接好的html，浏览器直接显示服务端返回的html就可以了。
![image.png](https://qiniucloud.qishilong.space/images/bVcWUkF.png)

## Next.js

Next.js是一个最常用的React SSR框架：包括静态及服务器端融合渲染、 支持 TypeScript、智能化打包、 路由预取等功能无需任何配置。

SSG：在build时生成静态html，适用于内容不会发生改变且对所有用户展示内容都一样的页面。

```javascript
function Content({ detail }) {
    return <div>
        {detail}
    </div>
  }

  // This function gets called at build time
  export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('.../content')
    const result = await res.json();
    // console.log(result);

    // By returning { props: { posts } }, the Content component
    // will receive `posts` as a prop at build time
    return {
      props: {
        detail: result.result,
      },
    }
  }

  export default Content
```

![image.png](https://qiniucloud.qishilong.space/images/bVcWUkM.png)

SSR：在运行时生成html，适用于动态数据，会比较消耗服务器资源。

```javascript
// This gets called on every request
  export async function getServerSideProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('.../get-list')
    const result = await res.json();
    // console.log(result);

    // By returning { props: { posts } }, the List component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts: result.result
      },
    }
  }

  function List({ posts }) {
    return <div>
      {posts.map(post => <div key={post.id}>{post.name}</div>)}
    </div>
  }

  export default List
```

实际业务场景中使用较多的还是SSR，也就是通过getServerSideProps来实时获取服务端数据。 下面就从React + Redux + React-Router + Express 搭建的SSR框架具体讲一下 SSR 的同构和getServerSideProps是如何实现的。

>   版本号 react:16.4.1 express:4.16.3

## 同构及其实现原理

所谓同构，通俗的讲，就是一套 React 代码在服务器上运行一遍，到达浏览器又运行一遍。 服务端渲染完成页面结构，客户端渲染绑定事件。

### 同构的代码实现

>   代码参考：[https://github.com/Lie8466/re...](https://link.segmentfault.com/?enc=CzK0TtRTEqcKmqUieGB1cA%3D%3D.AViuJK%2Byj5B%2F08KVYv8UakOoYNzSQ9iHK8p7VxbmM0Yf3bee%2B7f5k7ewslLi%2FYENcQFIL6YizTHuimFAGXSSvA%3D%3D)

```javascript
// src/index.js
import express from 'express';
import React from 'react';
// IMP: 需要使用react-dom/server. 虚拟DOM为react实现客户端和服务端渲染提供了很大的便利性
import { renderToString } from 'react-dom/server';
import Home from './features/Home';

const app = express();
const content = renderToString(<Home />);
const port = 3000

console.log(content);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.end(`
        <html>
            <head>
                <title>ssr</title>
            </head>
            <body>
                <div id="root">${content}</div>
            </body>
        </html>
  `);
});

// Home.js
const Home = () => {
    return (<div>
        This is Home
        <button onClick={() => alert('clicked')}>click</button>
        </div>);
}

export default Home;
```

页面html返回
![image.png](https://qiniucloud.qishilong.space/images/bVcWUnX.png)

此时button并没有点击事件。如何让button有点击事件？借助hydrate方法。

>   [https://zh-hans.reactjs.org/d...](https://link.segmentfault.com/?enc=CakpOpfpXIu1ByHz8iqa0w%3D%3D.uMykbwy98TdKTxRKFx6haHR6TtoQ0Xnbao70tq7zoA7jasZOa53uCyBDnn%2F7XmNINJzsleendm7CqJxtrys7cg%3D%3D)
>   与 render() 相同，但它用于在 ReactDOMServer 渲染的容器中对 HTML 的内容进行 hydrate 操作。React 会尝试在已有标记上绑定事件监听器

```coffeescript
// src/client.js
import React from 'react';
import ReactDom from 'react-dom';

import Home from '../features/Home';

// https://reactjs.org/docs/react-dom.html#render 认为元素已经在服务端渲染过，会做一些增加事件的操作
ReactDom.hydrate(<Home />, document.getElementById('root'))

// src/index.js

app.get('/', function (req, res) {
    res.end(`
        <html>
            <head>
                <title>ssr</title>
            </head>
            <body>
                <div id="root">${content}</div>
                // 新增下面这行
                <script src="./index.js"></script>
            </body>
        </html>
  `);
});
```

### hydrate是如何实现的

**一、监听全局事件**

在客户端运行hydrate时，首先会统一增加对所有支持事件的监听（与render类似）。
![image.png](https://qiniucloud.qishilong.space/images/bVcWUxF.png)

值得注意的是，与render不同，这里监听的是div#root 元素的所有事件，而render方法监听的是document元素。

![image.png](https://qiniucloud.qishilong.space/images/bVcWUxG.png)

>   React合成事件：
>   如何监听？监听的什么元素？(使用到的根据registrationNameDependencies对应关系才会去监听，且使用一个set避免重复监听。监听了document元素)
>   如何模拟捕获和冒泡？(找到元素的path链，按不同顺序依次取出对应的事件)

**二、为元素添加事件**

其次前面的工作与render是一致的，客户端会将React Element组装为Fiber Node的树。类似下图，其中

-   child — 指向第一个child
-   sibling — 指向下一个兄弟节点
-   return — 指向父节点

![image.png](https://qiniucloud.qishilong.space/images/bVcWUxI.png)

在对这个树进行遍历的时候，有几个特别重要的function

-   performUnitOfWork
-   beginWork
-   completeUnitOfWork
-   completeWork

hydrate与render对这个树进行遍历的逻辑是一样的，区别是render不需要考虑旧节点，将新节点渲染到页面上即可，而运行hydrate时页面上已经有渲染的元素，需要考虑页面元素是否需要保留、修改或者删除。hydrate采用的方式是：从#root节点开始，在遍历fiber树过程中按fiberNode节点的遍历顺序依次获取到newFiberNode，并且分别找到页面已经渲染出元素的firstChild节点或nextSibling节点作为oldFiberNode节点。

![image.png](https://qiniucloud.qishilong.space/images/bVcWUxN.png)

最后在completeWork中对domElement和FiberNode进行比对，进行属性和节点的更新（一般情况下就是属性的更新，特殊情况例如客户端渲染结果与服务端不一致的情况下需要更新节点）。

![image.png](https://qiniucloud.qishilong.space/images/bVcWUxO.png)
![image.png](https://qiniucloud.qishilong.space/images/bVcWUxS.png)
![image.png](https://qiniucloud.qishilong.space/images/bVcWUxT.png)

如图所示，会给对应的FiberNode增加上onClick属性，元素在被点击时会触发对应onClick的执行。

>   React事件是通过事件代理实现的。以点击事件为例，在页面有点击事件发生时，会根据event.target对应的FiberNode依次往上遍历（取父节点即return），取出对应FiberNode的onClick点击事件放到数组中后，依次执行。

### 小结

1.  什么是同构？所谓同构，就是一套 React 代码在服务器上运行一遍，到达浏览器又运行一遍。 服务端渲染完成页面结构，客户端渲染绑定事件。
2.  服务端执行流程：在服务端使用react-dom/server下的renderToString将React组件转化为string，拼接在html中进行返回。此时html中不包含元素对应的事件。打包时把react-dom下的hydrate的逻辑打包到js中，拼接在html中作为script标签返回，提供给客户端运行使用
3.  浏览器执行流程：请求html，渲染html返回的页面内容并下载js文件，此时页面显示元素但不可交互，运行js中的ReactDom.hydrate给页面元素绑定事件，页面可交互。

## 数据的注水与脱水及其实现原理

>   参考代码 [https://github.com/Lie8466/re...](https://link.segmentfault.com/?enc=b%2FFtVZ8phdjH2yfIBKYmCA%3D%3D.PqnQqJsvfGDBQ5j3HwVpwKRhkfQR1L1HA6aBZv0EGpVVLlw4%2B95VRMGsxy%2FlDOXBaGmEGKhRR1O8s0zaUmD9yA%3D%3D)

SSR 模式下，服务端只执行 3 个生命周期函数：

-   constructor
-   getDerivedStateFromProps
-   render
    其余任何生命周期在服务端都不执行，因此下面代码中的componentDidMount在服务端并不会执行。如下代码所示的componentDidMount在服务端并不会执行

```javascript
import React, { Component } from 'react';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getHomeList } from './store/actions';

class Home extends Component {

    getList() {
        const { list } = this.props;
        return list.map(item => <div key={item.id}>{item.name}</div>)
    }

    render() {
        return (
            <div>
                <Header />
                {this.getList()}
                <button onClick={()=>{alert('click1')}}>
                    click
                </button>
            </div>
        )
    }

    componentDidMount() {
        this.props.getHomeList();
    }
}

const mapStateToProps = state => ({
    list: state.home.newsList
});

const mapDispatchToProps = dispatch => ({
    getHomeList() {
        dispatch(getHomeList());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

如果想要在服务端返回数据后返回应该怎么做呢？

### 实现原理

首先给页面挂载loadData方法（类比getServerSideProps），loadData会在请求完成后更新store数据，从而使Home渲染出来有数据的内容。

```javascript
// Home.js
Home.loadData = (store) => {
    // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
    return store.dispatch(getHomeList())
}

// Routes.js
import Home from './containers/Home';
import Login from './containers/Login';

export default [
 { 
    path: '/',
    component: Home,
    exact: true,
    // 新增下面一行
    loadData: Home.loadData,
    key: 'home'
  }, { 
    path: '/login',
    component: Login,
    exact: true,
    key: 'login'
  }
];
```

服务端接收到请求后，根据request请求的页面地址，获取匹配到的页面，将其loadData放在一个数组中。

```javascript
import { matchRoutes } from 'react-router-config'
// ...

// server/index.js
app.get('*', function (req, res) {
    const store = getStore();
    // 根据路由的路径，来往store里面加数据
    const matchedRoutes = matchRoutes(routes, req.path);
    // 让matchRoutes里面所有的组件，对应的loadData方法执行一次
    const promises = [];
    matchedRoutes.forEach(item => {
        if (item.route.loadData) {
            promises.push(item.route.loadData(store))
        }
    })
    Promise.all(promises).then(() => {
        res.send(render(store, routes, req));
    })
});
```

待所有的loadData执行完毕后再返回html，并且将数据注入到html中

```dust
import { renderToString } from 'react-dom/server';
//...

export const render = (store, routes, req) => {
   const content = renderToString((
            <Provider store={store}>
                <StaticRouter location={req.path} context={{}}>
                    <div>
                        {routes.map(route => (
                      <Route {...route}/>
                    ))}
                </div>
                </StaticRouter>
            </Provider>
        ));
    
        return `
            <html>
                <head>
                    <title>ssr</title>
                </head>
                <body>
                    <div id="root">${content}</div>
          <script>
                        window.context = {
                            state: ${JSON.stringify(store.getState())}
                        }
                    </script>
                    <script src='/index.js'></script>
                </body>
            </html>
      `;

}
```

客户端根据window.context.state初始化store数据

```pf
// store/index.js
export const getClientStore = () => {
    const defaultState = window.context.state;
    return createStore(reducer, defaultState, applyMiddleware(thunk));
}
```

### 小结

-   数据的注水与脱水：注水指的是服务端请求数据后，将数据传递给客户端，脱水就是客户端使用数据的过程。
-   服务端执行流程：服务端根据request请求中的页面path，获取匹配到的路由对象，将路由对象上挂载的静态方法loadData放在promise中统一执行后，并将请求数据注入到html的<script>标签中，返回给客户端。
-   客户端执行流程：请求html，收到带有数据的html，渲染带有服务端数据的页面。运行<script>window.context...</script>，下载并运行index.js文件,js代码中会直接取用window.context初始化initialState，从而保证客户端首次计算出的页面与服务端返回的html完全一致。

## 总结

本篇文章以React + Redux + React-Router + Express 搭建的SSR框架具体讲解了 SSR 的同构和getServerSideProps是如何实现的。其实Next.js的实现原理与这个是类似的，本篇文章是一个简化的实现可以帮助理解。小的区别是Next.js在注水和脱水的过程中，不是使用的redux的state来初始化数据，而是使用的<Page {...pageProps} />来初始化的页面。

![image.png](https://qiniucloud.qishilong.space/images/bVcWUyc.png)
![image.png](https://qiniucloud.qishilong.space/images/bVcWUyd.png)
![image.png](https://qiniucloud.qishilong.space/images/bVcWUye.png)
![image.png](https://qiniucloud.qishilong.space/images/bVcWUyf.png)

服务端使用react-dom/server的renderToString，客户端使用ReactDom.hydrate实现代码同构；服务端通过matchRoutes找到匹配路由的loadData，请求后再返回html，且会往html中注入数据，客户端渲染html执行js拿到数据后初始化页面。