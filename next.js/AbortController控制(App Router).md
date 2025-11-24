# 客户端组件如何控制 Server Action 定义的请求方法是否取消（App Router)

## 所有的方式以及不同方式之间对比

| 方式                                         | 是否支持主动取消 | 是否自动注入 signal | 是否有 isPending | 是否被 Next.js 15+ 禁止     | 推荐度 | 适用场景             |
| -------------------------------------------- | ---------------- | ------------------- | ---------------- | --------------------------- | ------ | -------------------- |
| 1. `useActionState` + `dispatch(null)`       | Yes              | Yes（自动）         | Yes（自动）      | No                          | ★★★★★  | 绝大多数场景（首选） |
| 2. `<form action>` + `<button type="reset">` | Yes              | Yes（自动）         | Yes（自动）      | No                          | ★★★★★  | 简单表单或想最少代码 |
| 3. `startTransition(() => action().then())`  | No（只能被动）   | Yes（自动）         | No               | No                          | ★☆☆☆☆  | 仅临时测试用         |
| 4. 手动传 `AbortController.signal`           | No               | No（被禁止）        | 手动实现         | Yes（Next.js 15+ 直接报错） | ☠️      | 彻底废弃             |


### 错误的方式

**一开始大家可能都会想到的方式：**

server action 方法中添加一个 signal 参数，然后传给 fetch 配置对象，在客户端创建一个 AbortController 对象，然后将 signal 属性传给 server action 中的请求方法。类似下面这种：

客户端组件

```tsx
'use client';

import { useState, useRef } from 'react';
import { getTest } from '@/actions/test';

export default function OldStyleLoader() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 关键：自己维护一个 AbortController
  const controllerRef = useRef<AbortController | null>(null);

  const handleLoad = () => {
    // 每次点击都创建一个新的 controller
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    setData(null);

    getTest(params, controller.signal)  // ← 手动传 signal
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          console.log('【已取消】用户主动取消了请求');
          setError('CANCELLED');  // ← 你能捕获！
        } else {
          console.error('真实错误:', err);
          setError(err.message);
        }
      })
      .finally(() => {
        setLoading(false);
        // 清理
        if (controllerRef.current === controller) {
          controllerRef.current = null;
        }
      });
  };

  const handleCancel = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();  // ← 真正取消！
      controllerRef.current = null;
    }
  };

  return (
    <div>
      <button onClick={handleLoad} disabled={loading}>
        {loading ? '加载中...' : '加载历史（老方式）'}
      </button>

      {loading && (
        <button onClick={handleCancel} style={{ marginLeft: 8, color: 'red' }}>
          取消请求
        </button>
      )}

      {error === 'CANCELLED' && <div style={{ color: '#999' }}>请求已取消</div>}
      {error && error !== 'CANCELLED' && <div style={{ color: 'red' }}>错误：{error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

Server Action

```tsx
// actions/test.ts
"use server";

export async function getTest(
  params: any,
  signal?: AbortSignal   // ← 手动接收（Next.js 不会自动注入）
) {
  const response = await fetch('api', {
    signal,  // ← 用你传进来的 signal
    // ...
  });
  // ...
}
```

这种方式确实可能是大多数人刚开始想到的，但在 next.js 框架中根本不会生效，原因是：

> 核心问题：**你手动传的 signal 根本到不了服务端的 fetch**
>
> 现在的调用方式是：
>
> getTest(params, controller.signal).then()
>
> 这只是普通的 **JavaScript 函数直接调用**，不是通过 Next.js 提供的 Server Action 调用机制（form action / useActionState / startTransition）触发的。
>
> **Next.js 只有在通过它的“绑定机制”调用 Server Action 时，才会自动注入 AbortSignal**。 而你现在是直接 await 一个 server function，这等价于在服务端同步执行，根本不会走任何网络请求，更不会把你客户端创建的 AbortController.signal 传到服务端。
>
> 简单说：**客户端的 AbortController 永远不可能通过普通函数参数传到服务端去**，因为调用根本不是跨网络的。
>
> AbortController.signal 是 Client-only 的临时对象，Next.js 在服务端渲染阶段检测到你试图把 client 对象属性传给 server function → 直接抛错阻止：

### 正确的方式

（适用于 Next.js 14.1+ / 15 / 16）

| 方式                                         | 是否支持主动取消 | 是否自动注入 signal | 是否有 isPending | 是否被 Next.js 15+ 禁止     | 推荐度 | 适用场景             |
| -------------------------------------------- | ---------------- | ------------------- | ---------------- | --------------------------- | ------ | -------------------- |
| 1. `useActionState` + `dispatch(null)`       | Yes              | Yes（自动）         | Yes（自动）      | No                          | ★★★★★  | 绝大多数场景（首选） |
| 2. `<form action>` + `<button type="reset">` | Yes              | Yes（自动）         | Yes（自动）      | No                          | ★★★★★  | 简单表单或想最少代码 |
| 3. `startTransition(() => action().then())`  | No（只能被动）   | Yes（自动）         | No               | No                          | ★☆☆☆☆  | 仅临时测试用         |

### 1. useActionState + dispatch(null) —— 2025 年官方钦定王者

**为什么可以取消？**

useActionState 内部为每一次 dispatch 创建一个专属的 AbortController。当你再次 dispatch（哪怕是 dispatch(null)）时，React/Next.js 会自动 abort 上一次仍在 pending 的同一个 action。

```tsx
'use client';
import { useActionState, startTransition } from 'react';
import { getTest } from '@/actions';

export default function BestWay() {
  const [state, dispatch, pending] = useActionState(
    async (_: any, payload: any) =>
      await getTest(payload),
    null
  );

  const load = () => startTransition(() => dispatch(payload));
  const cancel = () => startTransition(() => dispatch(null as any)); // 主动取消！

  return (
    <>
      <button onClick={load} disabled={pending}>加载</button>
      {pending && <button onClick={cancel}>取消</button>}
    </>
  );
}
```

```tsx
// actions/test.ts
"use server";

export async function getTest(
  payload: any,
	signal?: AbortSignal                  // ← Next.js 自动注入的 signal，可选
) {
  const response = await fetch('api', {
    signal,        // ← 直接用就行，真的能被取消
    // ...
  });
  // ...
}
```

**优点**

- 自动 isPending、乐观更新、错误边界全家桶
- 任意 UI 都能触发（不依赖 form）
- 主动取消只需一行 dispatch(null)
- 服务端 signal 自动注入，fetch 真正可取消
- 捕获 AbortError 非常简单

**缺点**

- 必须用 startTransition 包裹（否则报错）
- 略比 \<form> 多几行代码

**结论：非表单场景的绝对首选**

### 2. \<form> + \<button type="reset"> —— 最少代码的官方神器

```tsx
<form action={getTest.bind(null, { sessionId: 'xxx' })}>
  <button type="submit">加载历史</button>
  <button type="reset" style={{color: 'red'}}>取消</button>
</form>
```

**为什么可以取消？** 浏览器原生 reset 事件 → Next.js 监听到 → 自动 abort 当前 pending 的 action。

**优点**

- 代码最少，几乎零成本
- pending 状态自动有（配合 useFormStatus）
- 原生语义完美，SEO/可访问性友好
- 永远不会过时

**缺点**

- 视觉上是个 \<form>（可用 CSS 完全隐藏）
- 想传复杂参数需要 hidden input 或 bind

**结论：想最快最稳就用这个**

### 3. startTransition(() => action().then()) —— 已经被时代抛弃的老古董

```tsx
startTransition(() => {
  getTest(payload)
    .then(setData)
    .catch(console.error);
});
```

**为什么还能取消？** startTransition 创建的 transition 被打断或页面卸载时，Next.js 会自动 abort。

**优点**

- 写法最像普通 async/await

**缺点（致命）**

- 没有 isPending（你得自己用 state 维护）
- 无法主动取消（只能靠切换页面）
- 取消时的 AbortError 会被 React 吞掉，捕获不到
- Next.js 官方已明确不推荐

**结论：仅用于只读、不需要 loading 和取消的场景**

最终推荐决策树

```
你是否接受使用 <form>？
├── Yes → 用方式 2（<form> + type="reset"），代码最少
└── No  → 用方式 1（useActionState + dispatch(null)），功能最全

永远不要碰：
• 手动 AbortController
• 直接 action().then()
```
