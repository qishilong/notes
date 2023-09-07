# 深入理解前端中的 hash 和 history 路由

我们在使用 Vue 或者 React 等前端渲染时，通常会有 hash 路由和 history 路由两种路由方式。

1.  hash 路由：监听 url 中 hash 的变化，然后渲染不同的内容，这种路由不向服务器发送请求，不需要服务端的支持；
2.  history 路由：监听 url 中的路径变化，需要客户端和服务端共同的支持；

我们一步步实现这两种路由，来深入理解下底层的实现原理。我们主要实现以下几个简单的功能：

1.  监听路由的变化，当路由发生变化时，可以作出动作；
2.  可以前进或者后退；
3.  可以配置路由；

### **1. hash 路由**

当页面中的 hash 发生变化时，会触发`hashchange`事件，因此我们可以监听这个事件，来判断路由是否发生了变化。

```js
window.addEventListener(
    'hashchange',
    function (event) {
        const oldURL = event.oldURL; // 上一个URL
        const newURL = event.newURL; // 当前的URL
        console.log(newURL, oldURL);
    },
    false
);
```

### **1.1 实现的过程**

对 oldURL 和 newURL 进行拆分后，就能获取到更详细的 hash 值。我们这里从创建一个 HashRouter 的 class 开始一步步写起：

```js
class HashRouter {
    currentUrl = ''; // 当前的URL
    handlers = {};

    getHashPath(url) {
        const index = url.indexOf('#');
        if (index >= 0) {
            return url.slice(index + 1);
        }
        return '/';
    }
}
```

事件`hashchange`只会在 hash 发生变化时才能触发，而第一次进入到页面时并不会触发这个事件，因此我们还需要监听`load`事件。这里要注意的是，两个事件的 event 是不一样的：hashchange 事件中的 event 对象有 oldURL 和 newURL 两个属性，但 load 事件中的 event 没有这两个属性，不过我们可以通过 location.hash 来获取到当前的 hash 路由：

```js
class HashRouter {
    currentUrl = ''; // 当前的URL
    handlers = {};

    constructor() {
        this.refresh = this.refresh.bind(this);
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }

    getHashPath(url) {
        const index = url.indexOf('#');
        if (index >= 0) {
            return url.slice(index + 1);
        }
        return '/';
    }

    refresh(event) {
        let curURL = '',
            oldURL = null;
        if (event.newURL) {
            oldURL = this.getHashPath(event.oldURL || '');
            curURL = this.getHashPath(event.newURL || '');
        } else {
            curURL = this.getHashPath(window.location.hash);
        }
        this.currentUrl = curURL;
    }
}
```

到这里已经可以实现获取当前的 hash 路由，但路由发生变化时，我们的页面应该进行切换，因此我们需要监听这个变化：

```js
class HashRouter {
    currentUrl = ''; // 当前的URL
    handlers = {};

    // 暂时省略上面的代码

    refresh(event) {
        // 当hash路由发生变化时，则触发change事件
        this.emit('change', curURL, oldURL);
    }

    on(evName, listener) {
        this.handlers[evName] = listener;
    }
    emit(evName, ...args) {
        const handler = this.handlers[evName];
        if (handler) {
            handler(...args);
        }
    }
}
const router = new HashRouter();
rouer.on('change', (curUrl, lastUrl) => {
    console.log('当前的hash:', curUrl);
    console.log('上一个hash:', lastUrl);
});
```

### **1.2 调用的方式**

到这里，我们把基本的功能已经完成了。来配合一个例子就更形象了：

```js
// 先定义几个路由
const routes = [
    {
        path: '/',
        name: 'home',
        component: <Home />,
    },
    {
        path: '/about',
        name: 'about',
        component: <About />,
    },
    {
        path: '*',
        name: '404',
        component: <NotFound404 />,
    },
];
const router = new HashRouter();
// 监听change事件
router.on('change', (currentUrl, lastUrl) => {
    let route = null;
    // 匹配路由
    for (let i = 0, len = routes.length; i < len; i++) {
        const item = routes[i];
        if (currentUrl === item.path) {
            route = item;
            break;
        }
    }
    // 若没有匹配到，则使用最后一个路由
    if (!route) {
        route = routes[routes.length - 1];
    }
    // 渲染当前的组件
    ReactDOM.render(route.component, document.getElementById('app'));
});
```

查看【[hash 路由的样例](https://link.zhihu.com/?target=https%3A//www.xiabingbao.com/demos/20200409/hash-router.html)】。

### **2. history 路由**

在 history 路由中，我们一定会使用`window.history`中的方法，常见的操作有：

-   back()：后退到上一个路由；
-   forward()：前进到下一个路由，如果有的话；
-   go(number)：进入到任意一个路由，正数为前进，负数为后退；
-   pushState(obj, title, url)：前进到指定的 URL，不刷新页面；
-   replaceState(obj, title, url)：用 url 替换当前的路由，不刷新页面；

调用这几种方式时，都会只是修改了当前页面的 URL，页面的内容没有任何的变化。但前 3 个方法只是路由历史记录的前进或者后退，无法跳转到指定的 URL；而`pushState`和`replaceState`可以跳转到指定的 URL。如果有面试官问起这个问题“如何仅修改页面的 URL，而不发送请求”，那么答案就是这 5 种方法。

如果服务端没有新更新的 url 时，一刷新浏览器就会报错，因为刷新浏览器后，是真实地向服务器发送了一个 http 的网页请求。因此若要使用 history 路由，需要服务端的支持。

### **2.1 应用的场景**

pushState 和 replaceState 两个方法跟 location.href 和 location.replace 两个方法有什么区别呢？应用的场景有哪些呢？

1.  location.href 和 location.replace 切换时要向服务器发送请求，而 pushState 和 replace 仅修改 url，除非主动发起请求；
2.  仅切换 url 而不发送请求的特性，可以在前端渲染中使用，例如首页是服务端渲染，二级页面采用前端渲染；
3.  可以添加路由切换的动画；
4.  在浏览器中使用类似抖音的这种场景时，用户滑动切换视频时，可以静默修改对应的 URL，当用户刷新页面时，还能停留在当前视频。

### **2.2 无法监听路由的变化**

当我们用 history 的路由时，必然要能监听到路由的变化才行。全局有个`popstate`事件，别看这个事件名称中有个 state 关键词，但`pushState`和`replaceState`被调用时，是不会触发触发 popstate 事件的，只有上面列举的前 3 个方法会触发。可以点击【[popState 不会触发 popstate 事件](https://link.zhihu.com/?target=https%3A//www.xiabingbao.com/demos/20200410/history-pushstate-popstate.html)】查看。

针对这种情况，我们可以使用`window.dispatchEvent`添加事件：

```js
const listener = function (type) {
    var orig = history[type];
    return function () {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
window.history.pushState = listener('pushState');
window.history.replaceState = listener('replaceState');
```

然后就可以添加对这两个方法的监听了：

```js
window.addEventListener('pushState', this.refresh, false);
window.addEventListener('replaceState', this.refresh, false);
```

### **2.3 完整的代码**

完整的代码如下：

```js
class HistoryRouter {
    currentUrl = '';
    handlers = {};

    constructor() {
        this.refresh = this.refresh.bind(this);
        this.addStateListener();
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('popstate', this.refresh, false);
        window.addEventListener('pushState', this.refresh, false);
        window.addEventListener('replaceState', this.refresh, false);
    }
    addStateListener() {
        const listener = function (type) {
            var orig = history[type];
            return function () {
                var rv = orig.apply(this, arguments);
                var e = new Event(type);
                e.arguments = arguments;
                window.dispatchEvent(e);
                return rv;
            };
        };
        window.history.pushState = listener('pushState');
        window.history.replaceState = listener('replaceState');
    }
    refresh(event) {
        this.currentUrl = location.pathname;
        this.emit('change', location.pathname);
        document.querySelector('#app span').innerHTML = location.pathname;
    }
    on(evName, listener) {
        this.handlers[evName] = listener;
    }
    emit(evName, ...args) {
        const handler = this.handlers[evName];
        if (handler) {
            handler(...args);
        }
    }
}
const router = new HistoryRouter();
router.on('change', function (curUrl) {
    console.log(curUrl);
});
```

使用方法与上面的 hash 路由一样，这里就不多赘述了。点击查看【[history 路由的实现应用](https://link.zhihu.com/?target=https%3A//www.xiabingbao.com/demos/20200410/history-router.html)】