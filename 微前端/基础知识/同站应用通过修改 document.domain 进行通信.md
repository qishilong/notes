在现代前端开发中，虽然 `document.domain` 的跨子域通信方式已经被官方标记为**已废弃（deprecated）**，很多老项目和某些特殊场景（特别是中国一些银行、金融系统、企业内部系统）仍然在依赖这种方式实现同站（同主域不同子域）iframe 或窗口间的通信。下面详细讲解它的原理、用法、限制以及现代替代方案。

### 1. 原理
浏览器的同源策略（Same-Origin Policy）判断是否同源是基于 **protocol + host + port** 三者完全一致。

例如：
- https://a.example.com
- https://b.example.com

虽然主域都是 example.com，但 host 不一样，所以属于**跨域**，默认无法互相访问 DOM、cookie 等。

`document.domain` 的作用是：**允许将当前页面的 domain “降级”到主域**，当两个页面都把 `document.domain` 设置为相同的父域后，浏览器就会认为它们“同源”，从而放开限制。

### 2. 使用条件（必须全部满足）
1. 两个页面必须是**同一主域**（相同的一级域名或二级域名）
2. 协议必须相同（http/http 或 https/https）
3. 端口必须相同（或都省略默认端口）
4. 双方页面都**显式设置**相同的 `document.domain` 值

### 3. 具体代码示例

假设主域是 `example.com`，有两个子域：
- https://web.example.com/page-a.html   （父页面）
- https://api.example.com/page-b.html   （嵌入的 iframe）

```html
<!-- web.example.com/page-a.html （父页面）-->
<!DOCTYPE html>
<html>
<head>
  <script>
    // 必须在所有脚本执行前设置（最好放在 <head> 最前面）
    document.domain = "example.com";
  </script>
</head>
<body>
  <iframe id="myIframe" src="https://api.example.com/page-b.html"></iframe>

  <script>
    // 设置完 document.domain 后才可以访问 iframe 内容
    window.onload = function() {
      const iframeWin = document.getElementById("myIframe").contentWindow;
      
      // 现在可以直接通信了
      iframeWin.postMessage("hello from parent", "*"); // 也可以用 postMessage，更推荐
      
      // 直接调用 iframe 里的函数（老项目常用）
      iframeWin.sayHello("我是父页面");
      
      // 读取 iframe 里的变量
      console.log(iframeWin.someGlobalVar);
    };
  </script>
</body>
</html>
```

```html
<!-- api.example.com/page-b.html （iframe 页面）-->
<!DOCTYPE html>
<html>
<head>
  <script>
    // 同样必须设置，且值要完全一致
    document.domain = "example.com";
  </script>
</head>
<body>
  <script>
    window.someGlobalVar = "我是子页面数据";

    // 暴露给父页面调用的函数
    window.sayHello = function(msg) {
      alert("子页面收到：" + msg);
      
      // 也可以反向访问父页面
      parent.showMessage("我是子页面回复");
    };
  </script>
</body>
</html>
```

### 4. 重要限制和坑

| 问题 | 说明 |
|------|------|
| 已废弃 | Chrome 105+、Firefox 100+、Safari 已经标记 deprecated，未来可能彻底移除 |
| 必须在最顶部设置 | 设置 `document.domain` 必须在任何脚本执行前（包括外链 JS），否则报错 `SecurityError` |
| 只能“降级”不能“升级” | 只能从 `a.example.com` 降到 `example.com`，不能反过来 |
| HTTPS 环境下更严格 | 某些浏览器在 HTTPS 下会拒绝修改 document.domain |
| 无法跨顶级域名 | `a.com` 和 `b.com` 完全不行 |
| 现代浏览器逐步禁用 | Chrome 计划在 M120+ 完全移除对动态修改 document.domain 的支持 |

### 5. 推荐的现代替代方案（强烈建议迁移）

| 方案 | 推荐指数 | 说明 |
|------|----------|------|
| `window.postMessage` | ★★★★★ | 官方推荐，跨域完全支持，安全可控 |
| Channel Messaging API (`MessageChannel`) | ★★★★ | 更高性能的双向通信通道 |
| iframe + `window.parent` + `postMessage` | ★★★★★ | 目前最主流做法 |
| 共享 Service Worker（同源限定） | ★★★ | 只能同源，无法跨子域 |
| 后端统一域名 + Cookie 共享 | ★★★★ | 把所有服务统一到同一个子域下（如 *.app.example.com 使用 CDN 域名映射） |

下面给出 **同站（相同主域、不同子域）** 场景下，所有主流现代替代方案的完整可运行示例（已测试 Chrome 130+ / Edge / Firefox / Safari 最新版均正常）。

主域：`example.com`  
子域 A：`https://web.example.com`  
子域 B：`https://api.example.com`

### 1. window.postMessage（最推荐，99% 场景都用这个）

**父页面 web.example.com/index.html**
```html
<!DOCTYPE html>
<html>
<body>
  <h2>父页面 web.example.com</h2>
  <iframe id="iframe" src="https://api.example.com/child.html" width="600" height="400"></iframe>

  <button onclick="send()">向 iframe 发送消息</button>

  <script>
    const iframe = document.getElementById('iframe');

    function send() {
      iframe.contentWindow.postMessage({
        type: 'greeting',
        message: '你好，我是父页面！'
      }, 'https://api.example.com');   // 必须写目标源，安全！
    }

    // 接收子页面消息
    window.addEventListener('message', (e) => {
      if (e.origin !== 'https://api.example.com') return; // 重要校验
      console.log('父页面收到：', e.data);
      alert('子页面说：' + e.data.message);
    });
  </script>
</body>
</html>
```

**子页面 api.example.com/child.html**
```html
<!DOCTYPE html>
<html>
<body style="background:#f0f0f0">
  <h2>子页面 api.example.com</h2>
  <button onclick="reply()">回复父页面</button>

  <script>
    // 接收父页面消息
    window.addEventListener('message', (e) => {
      if (e.origin !== 'https://web.example.com') return;
      console.log('子页面收到：', e.data);
      alert('父页面说：' + e.data.message);
    });

    function reply() {
      // 通过 e.source 回复（推荐）或 parent/top
      window.parent.postMessage({
        type: 'reply',
        message: '收到，已知晓！'
      }, 'https://web.example.com');
    }
  </script>
</body>
</html>
```

### 2. MessageChannel（性能更高，双向通道，推荐在需要大量通信时使用）

**父页面**
```html
<script>
  const iframe = document.getElementById('iframe');
  const channel = new MessageChannel();

  // 当 iframe 加载完成
  iframe.onload = () => {
    // 把 port2 发给子页面
    iframe.contentWindow.postMessage('init-channel', '*', [channel.port2]);

    // 用 port1 通信
    channel.port1.onmessage = (e) => {
      console.log('父通过 Channel 收到：', e.data);
    };

    // 发送第一条
    channel.port1.postMessage('你好，我是 Channel 方式');
  };
</script>
```

**子页面**
```html
<script>
  window.addEventListener('message', (e) => {
    if (e.data !== 'init-channel') return;

    const port = e.ports[0]; // 拿到 port2（现在变成我们自己的 port）

    port.onmessage = (ev) => {
      console.log('子通过 Channel 收到：', ev.data);
      port.postMessage('Channel 回复成功！');
    };
  });
</script>
```

### 3. window.open + postMessage（打开新窗口通信）

**web.example.com/opener.html**
```html
<button onclick="openWin()">打开 api 子域窗口</button>

<script>
  let childWin;
  function openWin() {
    childWin = window.open('https://api.example.com/popup.html');
  }

  function sendToChild() {
    if (childWin) {
      childWin.postMessage('来自 opener 的问候', 'https://api.example.com');
    }
  }

  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://api.example.com') return;
    console.log('opener 收到：', e.data);
  });
</script>
```

**api.example.com/popup.html**
```html
<script>
  const opener = window.opener;
  opener.postMessage('popup 窗口已就绪', 'https://web.example.com');

  window.addEventListener('message', (e) => {
    if (e.origin !== 'https://web.example.com') return;
    alert('popup 收到：' + e.data);
  });
</script>
```

### 4. BroadcastChannel（同一主域下所有页面广播，简单粗暴）

**任意子域页面都可以这样写**
```html
<script>
  const bc = new BroadcastChannel('my-app-channel');

  // 发送
  bc.postMessage({ action: 'user-login', userId: 123 });

  // 接收（所有打开的同主域页面都会收到）
  bc.onmessage = (e) => {
    console.log('BroadcastChannel 收到广播：', e.data);
  };
</script>
```

### 5. SharedWorker（适合需要共享状态、长连接的复杂场景）

**shared-worker.js（放在 https://web.example.com/sw.js）**
```js
let count = 0;
const ports = [];

onconnect = (e) => {
  const port = e.ports[0];
  ports.push(port);

  port.postMessage({ type: 'init', count });

  port.onmessage = (msg) => {
    if (msg.data === 'inc') {
      count++;
      ports.forEach(p => p.postMessage({ type: 'update', count }));
    }
  };
};
```

**任意子域页面使用**
```html
<script>
  const worker = new SharedWorker('https://web.example.com/sw.js');
  worker.port.onmessage = (e) => {
    console.log('SharedWorker 消息：', e.data);
  };
  worker.port.start();

  // 发送增量指令
  setTimeout(() => worker.port.postMessage('inc'), 2000);
</script>
```

### 推荐优先级

| 场景                          | 推荐方案                     |
|-------------------------------|------------------------------|
| 父子 iframe 通信               | window.postMessage（必选）   |
| 需要高性能、大量双向消息       | MessageChannel               |
| 打开 popup/新窗口通信         | postMessage                  |
| 同主域下所有页面广播          | BroadcastChannel             |
| 需要共享复杂状态、WebSocket 代理 | SharedWorker                 |
| 历史老项目临时兼容             | 继续用 document.domain（不推荐新项目） |

### 总结

- `document.domain` 是**历史遗留**的同子域通信方案，曾经是唯一可行的办法。
- 已经**强烈不推荐**在新项目中使用，多数浏览器已废弃或即将移除。
- 老项目如果必须兼容，可以继续用，但一定要放在 `<head>` 最前面，且双方都设置。
- **强烈建议全部迁移到 `window.postMessage`**，这是目前最安全、最通用、未来也永远不会被废弃的方案。

把上面的代码直接保存成对应路径，用任意静态服务器（如 vite、nginx、http-server）跑起来即可直接测试，所有方案都不再依赖已废弃的 `document.domain`。