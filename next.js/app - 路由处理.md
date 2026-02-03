# 路由处理（route handlers)

>   https://nextjs.org/docs/app/building-your-application/routing/route-handlers

## 功能

### 缓存

当将 `GET` 方法与 `Response` 对象一起使用时，默认情况下会缓存路由处理程序。

```ts
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
 
  return Response.json({ data })
}
```

>   TypeScript 警告： `Response.json()` 仅从 TypeScript 5.2 起有效。如果您使用较低的 TypeScript 版本，则可以使用 `NextResponse.json()` 来代替键入响应。

### 退出缓存

可以通过以下方式选择退出缓存：

-   将 `Request` 对象与 `GET` 方法一起使用。
-   使用任何其他 HTTP 方法。
-   使用动态函数，例如 `cookies` 和 `headers` 。
-   **段配置选项**手动指定动态模式。

```ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const product = await res.json()
 
  return Response.json({ product })
}
```

**POST 方法直接就可以退出缓存**

```ts
export async function POST() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  })
 
  const data = await res.json()
 
  return Response.json(data)
}
```

### 路由匹配

`route` 文件不参与页面路由匹配

可以将 `route` 视为最低级别的路由原语。

-   它们不参与布局或客户端导航，例如 `page` 。
-   与 `page.js` 相同的路由中不能有 `route.js` 文件。

| 页                   | 路线               | 结果   |
| -------------------- | ------------------ | ------ |
| `app/page.js`        | `app/route.js`     | 冲突   |
| `app/page.js`        | `app/api/route.js` | 有效的 |
| `app/[user]/page.js` | `app/api/route.js` | 有效的 |

每个 `route.js` 或 `page.js` 文件接管该路由的所有 HTTP 动词。

```ts
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
 
// ❌ Conflict
// `app/route.js`
export async function POST(request) {}
```

## 例子

## 段配置选项

路由处理程序使用与页面和布局相同的路由段配置。

```ts
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
```

更多的，请参考：https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

