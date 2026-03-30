

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