

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