# React v19

发布时间为 2024 年 12 月 5 日 00:00:00

## 博客
### React v19
注意：React 19 现已稳定！

自今年 4 月与 React 19 候选版本首次共享此文章以来的新增内容：
- 对暂停树的预热：见 Suspense 的改进。
- React DOM 静态 API：见新的 React DOM 静态 API。

此文章的日期已更新以反映稳定发布日期。

React v19 现已在 npm 上可用！

在我们的 React 19 升级指南中，我们分享了将应用升级到 React 19 的逐步说明。在本文中，我们将概述 React 19 的新功能以及如何采用它们。

### React 19 中的新功能
- React 19 的改进
- 如何升级

### React 19 中的新功能
#### 操作（Actions）
在 React 应用中，一个常见用例是执行数据变更，然后相应地更新状态。例如，当用户提交表单更改其姓名时，您将发出 API 请求，然后处理响应。过去，您需要手动处理挂起状态、错误、乐观更新和顺序请求。

例如，您可以在 `useState` 中处理挂起和错误状态：
```jsx
// 在 Actions 之前
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const handleSubmit = async () => {
    setIsPending(true);
    const error = await updateName(name);
    setIsPending(false);
    if (error) {
      setError(error);
      return;
    }
    redirect("/path");
  };
  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        更新（Update）
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```
在 React 19 中，我们增加了对在过渡中使用异步函数的支持，以自动处理挂起状态、错误、表单和乐观更新。

例如，您可以使用 `useTransition` 为您处理挂起状态：
```jsx
// 使用来自 Actions 的挂起状态
function UpdateName({}) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const handleSubmit = () => {
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
      redirect("/path");
    });
  };
  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        更新（Update）
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
```
异步过渡将立即将 `isPending` 状态设置为 `true`，进行异步请求，并在任何过渡完成后将 `isPending` 切换为 `false`。这使您能够在数据更改时保持当前 UI 的响应性和交互性。

注意：按照惯例，使用异步过渡的函数称为“操作（Actions）”。

操作自动为您管理提交数据：
- 挂起状态：操作提供一个挂起状态，该状态在请求开始时启动，并在最终状态更新提交时自动重置。
- 乐观更新：操作支持新的 `useOptimistic` 钩子，因此您可以在请求提交时向用户显示即时反馈。
- 错误处理：操作提供错误处理，因此当请求失败时，您可以显示错误边界，并自动将乐观更新恢复为其原始值。
- 表单：`<form>` 元素现在支持将函数传递给 `action` 和 `formAction` 属性。将函数传递给 `action` 属性默认使用操作，并在提交后自动重置表单。

在操作的基础上，React 19 引入了 `useOptimistic` 来管理乐观更新，并引入新钩子 `React.useActionState` 来处理操作的常见情况。在 `react-dom` 中，我们添加了 `<form>` 操作以自动管理表单，并添加 `useFormStatus` 来支持表单中操作的常见情况。

在 React 19 中，上述示例可以简化为：
```jsx
// 使用 <form> 操作和 useActionState
function ChangeName({ name, setName }) {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name"));
      if (error) {
        return error;
      }
      redirect("/path");
      return null;
    },
    null,
  );
  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>更新（Update）</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```
在下一节中，我们将分解 React 19 中每个新的操作功能。

#### 新钩子：`useActionState`
为了简化操作的常见情况，我们添加了一个名为 `useActionState` 的新钩子：
```jsx
const [error, submitAction, isPending] = useActionState(
  async (previousState, newName) => {
    const error = await updateName(newName);
    if (error) {
      // 您可以返回操作的任何结果。
      // 这里，我们只返回错误。
      return error;
    }
    // 处理成功
    return null;
  },
  null,
);
```
`useActionState` 接受一个函数（“操作”），并返回一个包装后的操作以供调用。这是可行的，因为操作是可组合的。当调用包装后的操作时，`useActionState` 将返回操作的最后结果作为 `data`，并将操作的挂起状态作为 `pending`。

注意：在 Canary 版本中，`React.useActionState` 以前称为 `ReactDOM.useFormState`，但我们已重命名并弃用了 `useFormState`。

#### React DOM：`<form>` 操作
操作还与 React 19 中 `react-dom` 的新 `<form>` 功能集成。我们添加了对将函数作为 `<form>`、`<input>` 和 `<button>` 元素的 `action` 和 `formAction` 属性传递的支持，以使用操作自动提交表单：
```jsx
<form action={actionFunction}>
```
当 `<form>` 操作成功时，React 将自动重置不受控组件的表单。如果您需要手动重置 `<form>`，可以调用新的 React DOM API `requestFormReset`。

#### React DOM：新钩子：`useFormStatus`
在设计系统中，编写需要访问其所在 `<form>` 信息的设计组件而无需将属性向下传递到组件是很常见的。这可以通过上下文（Context）完成，但为了简化常见情况，我们添加了一个新钩子 `useFormStatus`：
```jsx
import { useFormStatus } from'react-dom';
function DesignButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} />
}
```
`useFormStatus` 读取父 `<form>` 的状态，就好像表单是一个上下文提供者。

#### 新钩子：`useOptimistic`
在执行数据变更时，另一个常见的 UI 模式是在异步请求进行期间乐观地显示最终状态。在 React 19 中，我们添加了一个名为 `useOptimistic` 的新钩子来简化此操作：
```jsx
function ChangeName({ currentName, onUpdateName }) {
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);
  const submitAction = async formData => {
    const newName = formData.get("name");
    setOptimisticName(newName);
    const updatedName = await updateName(newName);
    onUpdateName(updatedName);
  };
  return (
    <form action={submitAction}>
      <p>您的名字是：{optimisticName}</p>
      <p>
        <label>更改名字：</label>
        <input
          type="text"
          name="name"
          disabled={currentName!== optimisticName}
        />
      </p>
    </form>
  );
}
```
`useOptimistic` 钩子将在 `updateName` 请求进行期间立即渲染 `optimisticName`。当更新完成或出错时，React 将自动切换回 `currentName` 值。

#### 新 API：`use`
在 React 19 中，我们引入了一个新 API `use` 来在渲染中读取资源。

例如，您可以使用 `use` 读取一个 Promise，React 将暂停直到 Promise 解决：
```jsx
import { use } from'react';
function Comments({ commentsPromise }) {
  // `use` 将暂停直到 Promise 解决。
  const comments = use(commentsPromise);
  return comments.map(comment => <p key={comment.id}>{comment}</p>);
}
function Page({ commentsPromise }) {
  // 当 `use` 在 Comments 中暂停时，
  // 此 Suspense 边界将显示。
  return (
    <Suspense fallback={<div>正在加载...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```
注意：`use` 不支持在渲染中创建的 Promise。

如果您尝试将在渲染中创建的 Promise 传递给 `use`，React 将发出警告：

![image-20241209下午71604110](https://qiniucloud.qishilong.space/images/20241209191604448.png)

控制台
一个组件因未缓存的 Promise 而暂停。除通过与 Suspense 兼容的库或框架外，在客户端组件或钩子内部创建 Promise 目前不受支持。

要解决此问题，您需要传递来自支持 Promise 缓存的 Suspense 驱动库或框架的 Promise。未来我们计划推出功能，使在渲染中缓存 Promise 更容易。

您还可以使用 `use` 读取上下文，允许您在提前返回等条件下有条件地读取上下文：
```jsx
import { use } from'react';
import ThemeContext from './ThemeContext'
function Heading({ children }) {
  if (children == null) {
    return null;
  }
  
  // 由于提前返回，这在使用 useContext 时不起作用。
  const theme = use(ThemeContext);
  return (
    <h1 style={{ color: theme.color }}>
      {children}
    </h1>
  );
}
```
`use` API 只能在渲染中调用，类似于钩子。与钩子不同，`use` 可以有条件地调用。未来我们计划支持更多使用 `use` 在渲染中消耗资源的方式。

#### 新的 React DOM 静态 API
我们为静态站点生成向 `react-dom/static` 添加了两个新 API：
- `prerender`
- `prerenderToNodeStream`

这些新 API 通过等待数据加载来改进 `renderToString` 以生成静态 HTML。它们旨在与 Node.js 流和 Web 流等流环境一起使用。例如，在 Web 流环境中，您可以使用 `prerender` 将 React 树预渲染为静态 HTML：
```jsx
import { prerender } from'react-dom/static';
async function handler(request) {
  const { prelude } = await prerender(<App />, {
    bootstrapScripts: ['/main.js']
  });
  return new Response(prelude, {
    headers: { 'content-type': 'text/html' },
  });
}
```
预渲染 API 将在返回静态 HTML 流之前等待所有数据加载。流可以转换为字符串，或通过流响应发送。它们不支持在加载时流式传输内容，这是现有 React DOM 服务器渲染 API 支持的。

#### React 服务器组件
##### 服务器组件
服务器组件是一种新选项，允许在打包之前在与客户端应用程序或 SSR 服务器分开的环境中提前渲染组件。此单独环境是 React 服务器组件中的“服务器”。服务器组件可以在构建时在您的 CI 服务器上运行一次，或者可以使用 Web 服务器为每个请求运行。

React 19 包含来自 Canary 频道的所有 React 服务器组件功能。这意味着附带服务器组件的库现在可以将 React 19 作为对等依赖项，并带有 `react-server` 导出条件，用于支持全栈 React 架构的框架。

注意：如何构建对服务器组件的支持？

虽然 React 19 中的 React 服务器组件是稳定的，并且在主要版本之间不会中断，但用于实现 React 服务器组件打包器或框架的底层 API 不遵循语义化版本控制，并且在 React 19.x 的次要版本之间可能会中断。

要支持 React 服务器组件作为打包器或框架，我们建议固定到特定的 React 版本或使用 Canary 版本。我们将继续与打包器和框架合作，以在未来稳定用于实现 React 服务器组件的 API。

##### 服务器操作
服务器操作允许客户端组件调用在服务器上执行的异步函数。

当使用 `"use server"` 指令定义服务器操作时，您的框架将自动创建对服务器函数的引用，并将该引用传递给客户端组件。当在客户端调用该函数时，React 将向服务器发送请求以执行该函数，并返回结果。

注意：服务器组件没有指令。

一个常见的误解是服务器组件由 `"use server"` 表示，但服务器组件没有指令。`"use server"` 指令用于服务器操作。

服务器操作可以在服务器组件中创建并作为属性传递给客户端组件，或者可以在客户端组件中导入和使用。

### React 19 的改进
#### `ref` 作为属性
从 React 19 开始，您现在可以将 `ref` 作为函数组件的属性访问：
```jsx
function MyInput({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />
}
//...
<MyInput ref={ref} />
```
新的函数组件将不再需要 `forwardRef`，我们将发布一个代码转换工具来自动更新您的组件以使用新的 `ref` 属性。在未来版本中，我们将弃用并移除 `forwardRef`。

注意：传递给类的 `refs` 不作为属性传递，因为它们引用组件实例。

#### 水合错误的差异
我们还改进了 `react-dom` 中水合错误的错误报告。例如，在开发环境中，以前会记录多个关于不匹配的错误，但没有关于不匹配的任何信息：

![image-20241209下午71650566](https://qiniucloud.qishilong.space/images/20241209191650882.png)

控制台
警告：文本内容不匹配。服务器：“Server” 客户端：“Client” 在 span 元素处，位于 App 组件中
警告：水合期间发生错误。服务器 HTML 在 <div> 中被客户端内容替换。
警告：文本内容不匹配。服务器：“Server” 客户端：“Client” 在 span 元素处，位于 App 组件中
警告：水合期间发生错误。服务器 HTML 在 <div> 中被客户端内容替换。
未捕获错误：文本内容与服务器渲染的 HTML 不匹配。在 checkForUnmatchedText 处...

现在我们记录一条带有不匹配差异的单个消息：

![image-20241209下午71716896](https://qiniucloud.qishilong.space/images/20241209191717211.png)

控制台
未捕获错误：水合失败，因为服务器渲染的 HTML 与客户端不匹配。因此，此树将在客户端重新生成。如果 SSR 客户端组件使用以下内容，可能会发生这种情况： - 服务器/客户端分支 `if (typeof window!== 'undefined')`。 - 每次调用都会改变的变量输入，例如 `Date.now()` 或 `Math.random()`。 - 用户区域设置中的日期格式与服务器不匹配。 - 外部更改数据而未随 HTML 一起发送其快照。 - 无效的 HTML 标签嵌套。如果客户端安装了在 React 加载之前干扰 HTML 的浏览器扩展，也可能发生这种情况。https://react.dev/link/hydration-mismatch <App> <span> + 客户端 - 服务器 在 throwOnHydrationMismatch 处...

#### `<Context>` 作为提供者
在 React 19 中，您可以将 `<Context>` 渲染为提供者，而不是 `<Context.Provider>`：
```jsx
const ThemeContext = createContext('');
function App({ children }) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );
}
```
新的上下文提供者可以使用 `<Context>`，我们将发布一个代码转换工具来转换现有提供者。在未来版本中，我们将弃用 `<Context.Provider>`。

#### 引用（refs）的清理函数
我们现在支持从 `ref` 回调中返回清理函数：
```jsx
<input
  ref={(ref) => {
    // ref 创建
    // 新增：返回一个清理函数，以便在元素从 DOM 中移除时重置 ref
    return () => {
      // ref 清理
    };
  }}
/>
```
当组件卸载时，React 将调用从 `ref` 回调返回的清理函数。这适用于 DOM 引用、类组件的引用和 `useImperativeHandle`。

注意：以前，React 会在卸载组件时用 `null` 调用 `ref` 函数。如果您的 `ref` 返回清理函数，React 现在将跳过此步骤。

在未来版本中，我们将弃用在卸载组件时用 `null` 调用 `ref`。

由于引入了 `ref` 清理函数，从 `ref` 回调返回其他任何内容现在都会被 TypeScript 拒绝。通常的解决方法是停止使用隐式返回，例如：
```jsx
- <div ref={current => (instance = current)} />
+ <div ref={current => { instance = current; }} />
```
原始代码返回了 `HTMLDivElement` 的实例，而 TypeScript 不知道这是否应该是清理函数，或者您是否不想返回清理函数。

您可以使用 `no-implicit-ref-callback-return` 对这种模式进行代码转换。

#### `useDeferredValue` 的初始值
我们为 `useDeferredValue` 添加了 `initialValue` 选项：
```jsx
function Search({ deferredValue }) {
  // 初始渲染时的值为 ''
  // 然后使用 deferredValue 安排重新渲染
  const value = useDeferredValue(deferredValue, '');
  
  return (
    <Results query={value} />
  );
}
```
当提供 `initialValue` 时，`useDeferredValue` 将在组件初始渲染时将其作为 `value` 返回，并在后台安排使用返回的 `deferredValue` 进行重新渲染。

#### 对文档元数据的支持
在 HTML 中，文档元数据标签如 `<title>`、`<link>` 和 `<meta>` 保留用于放置在文档的 `<head>` 部分。在 React 中，决定应用程序合适元数据的组件可能离渲染 `<head>` 的地方很远，或者 React 根本不渲染 `<head>`。过去，这些元素需要在效果中手动插入，或者通过像 `react-helmet` 这样的库插入，并且在服务器渲染 React 应用程序时需要小心处理。

在 React 19 中，我们添加了对在组件中本地渲染文档元数据标签的支持：
```jsx
function BlogPost({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>
        Eee 等于 em-see-squared...
      </p>
    </article>
  );
}
```
当 React 渲染此组件时，它将看到 `<title>`、`<link>` 和 `<meta>` 标签，并自动将它们提升到文档的 `<head>` 部分。通过本地支持这些元数据标签，我们能够确保它们在仅客户端应用程序、流式 SSR 和服务器组件中正常工作。

注意：您可能仍需要元数据库

对于简单用例，将文档元数据渲染为标签可能合适，但库可以提供更强大的功能，例如根据当前路由用特定元数据覆盖通用元数据。这些功能使像 `react-helmet` 这样的框架和库更容易支持元数据标签，而不是取代它们。

#### 对样式表的支持
外部链接的样式表（`<link rel="stylesheet" href="...">`）和内联样式表（`<style>...</style>`）由于样式优先级规则，需要在 DOM 中小心定位。构建允许在组件内组合的样式表功能很困难，因此用户通常最终要么将所有样式加载到远离可能依赖它们的组件的地方，要么使用封装此复杂性的样式库。

在 React 19 中，我们解决了此复杂性，并通过内置的样式表支持为客户端的并发渲染和服务器的流式渲染提供了更深入的集成。如果您告诉 React 样式表的 `precedence`，它将管理样式表在 DOM 中的插入顺序，并确保样式表（如果是外部的）在显示依赖于这些样式规则的内容之前加载。
```jsx
function ComponentOne() {
  return (
    <Suspense fallback="加载中...">
      <link rel="stylesheet" href="foo" precedence="default" />
      <link rel="stylesheet" href="bar" precedence="high" />
      <article class="foo-class bar-class">
        {...}
      </article>
    </Suspense>
  );
}
function ComponentTwo() {
  return (
    <div>
      <p>{...}</p>
      <link rel="stylesheet" href="baz" precedence="default" />  <-- 将插入在 foo 和 bar 之间
    </div>
  );
}
```
在服务器端渲染期间，React 将把样式表包含在 `<head>` 中，这确保浏览器在加载完成之前不会绘制。如果在我们已经开始流式传输后很晚才发现样式表，React 将确保在客户端将样式表插入到 `<head>` 中，然后再显示依赖于该样式表的 Suspense 边界的内容。

在客户端渲染期间，React 将等待新渲染的样式表加载后再提交渲染。如果您从应用程序的多个位置渲染此组件，React 将只在文档中包含一次样式表：
```jsx
function App() {
  return <>
    <ComponentOne />
  ...
    <ComponentOne /> // 不会导致 DOM 中出现重复的样式表链接
  </>
}
```
对于习惯手动加载样式表的用户，这是一个将样式表与依赖它们的组件放在一起的机会，从而便于本地推理，并更容易确保只加载实际依赖的样式表。

样式库和与打包器的样式集成也可以采用此新功能，因此即使您不直接渲染自己的样式表，也可以在工具升级以使用此功能时受益。

#### 对异步脚本的支持
在 HTML 中，普通脚本（`<script src="...">`）和延迟脚本（`<script defer="" src="...">`）按文档顺序加载，这使得在组件树深处渲染这些类型的脚本具有挑战性。然而，异步脚本（`<script async="" src="...">`）将以任意顺序加载。

在 React 19 中，我们通过允许您在组件树的任何位置、在实际依赖脚本的组件内部渲染异步脚本，从而更好地支持异步脚本，而无需管理脚本实例的重新定位和去重。
```jsx
function MyComponent() {
  return (
    <div>
      <script async={true} src="..." />
      你好世界
    </div>
  );
}
function App() {
  <html>
    <body>
      <MyComponent>
      ...
      </MyComponent> // 不会导致 DOM 中出现重复的脚本
    </body>
  </html>
}
```
在所有渲染环境中，异步脚本将被去重，因此即使由多个不同组件渲染，React 也只会加载和执行脚本一次。

在服务器端渲染中，异步脚本将包含在 `<head>` 中，并在诸如样式表、字体和图像预加载等阻止绘制的更关键资源之后进行优先级排序。

#### 对预加载资源的支持
在初始文档加载和客户端更新期间，尽早告知浏览器可能需要加载的资源可以对页面性能产生巨大影响。

React 19 包含许多用于加载和预加载浏览器资源的新 API，以尽可能轻松地构建不受低效资源加载阻碍的出色体验。
```jsx
import { prefetchDNS, preconnect, preload, preinit } from'react-dom'
function MyComponent() {
  preinit('https://.../path/to/some/script.js', { as:'script' }) // 急切加载并执行此脚本
  preload('https://.../path/to/font.woff', { as: 'font' }) // 预加载此字体
  preload('https://.../path/to/stylesheet.css', { as:'style' }) // 预加载此样式表
  prefetchDNS('https://...') // 当您可能实际上不会从此主机请求任何内容时
  preconnect('https://...') // 当您将请求某些内容但不确定是什么时
}
```
```html
<!-- 上述内容将导致以下 DOM/HTML -->
<html>
<head>
  <!-- 链接/脚本根据其对早期加载的效用而非调用顺序进行优先级排序 -->
  <link rel="prefetch-dns" href="https://...">
  <link rel="preconnect" href="https://...">
  <link rel="preload" as="font" href="https://.../path/to/font.woff">
  <link rel="preload" as="style" href="https://.../path/to/stylesheet.css">
  <script async="" src="https://.../path/to/some/script.js"></script>
</head>
<body>
 ...
</body>
</html>
```
这些 API 可用于通过将字体等额外资源的发现从样式表加载中移出，优化初始页面加载。它们还可以通过预取预期导航使用的资源列表，然后在点击甚至悬停时急切预加载这些资源，使客户端更新更快。

#### 与第三方脚本和扩展的兼容性
我们改进了水合以考虑第三方脚本和浏览器扩展。

在水合时，如果在客户端渲染的元素与服务器 HTML 中的元素不匹配，React 会强制客户端重新渲染以修复内容。以前，如果元素由第三方脚本或浏览器扩展插入，会触发不匹配错误和客户端渲染。

在 React 19 中，`<head>` 和 `<body>` 中的意外标签将被跳过，避免不匹配错误。如果由于不相关的水合不匹配而需要 React 重新渲染整个文档，它将保留第三方脚本和浏览器扩展插入的样式表。

#### 更好的错误报告
我们改进了 React 19 中的错误处理，以消除重复并提供处理捕获和未捕获错误的选项。例如，当在渲染中由错误边界捕获错误时，以前 React 会两次抛出错误（一次是原始错误，然后是自动恢复失败后），然后使用 `console.error` 记录错误发生的位置信息。

这导致每个捕获错误出现三个错误：

![image-20241209下午71754371](https://qiniucloud.qishilong.space/images/20241209191754696.png)

控制台
未捕获错误：在 Throws 组件的 renderWithHooks 处发生错误...
未捕获错误：在 Throws 组件的 renderWithHooks 处发生错误 <-- 重复
上述错误发生在 Throws 组件中：在 App 组件的 Throws 处的错误边界，React 将尝试使用您提供的错误边界 ErrorBoundary 从头重新创建此组件树。

在 React 19 中，我们记录一条包含所有错误信息的单个错误：

![image-20241209下午71817600](https://qiniucloud.qishilong.space/images/20241209191817989.png)

控制台
错误：在 Throws 组件的 renderWithHooks 处发生错误... 上述错误发生在 Throws 组件中：在 App 组件的 Throws 处的错误边界，React 将尝试使用您提供的错误边界 ErrorBoundary 从头重新创建此组件树。在 App 组件的 ErrorBoundary 处

此外，我们添加了两个新的根选项来补充 `onRecoverableError`：
- `onCaughtError`：当 React 在错误边界中捕获错误时调用。
- `onUncaughtError`：当抛出错误且未被错误边界捕获时调用。
- `onRecoverableError`：当抛出错误并自动恢复时调用。

#### 对自定义元素的支持
React 19 增加了对自定义元素的全面支持，并通过了 Custom Elements Everywhere 的所有测试。

在过去版本中，在 React 中使用自定义元素很困难，因为 React 将无法识别的属性视为属性而非属性。在 React 19 中，我们添加了在客户端和 SSR 期间对属性的支持，策略如下：
- 服务器端渲染：传递给自定义元素的属性如果其类型是原始值（如 `string`、`number`）或值为 `true`，将渲染为属性。具有非原始类型（如 `object`、`symbol`、`function`）或值为 `false` 的属性将被省略。
- 客户端渲染：与自定义元素实例上的属性匹配的属性将被分配为属性，否则将被分配为属性。

感谢 Joey Arhar 推动 React 中自定义元素支持的设计和实现。

### 如何升级
请参阅 React 19 升级指南，以获取逐步说明以及所有重大更改和值得注意更改的完整列表。 