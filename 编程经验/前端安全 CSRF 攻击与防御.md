# 前端安全 CSRF 攻击与防御

CSRF（跨站请求伪造）攻击是一种安全威胁，攻击者可以利用受害者的身份执行未授权的操作。为了防御此类攻击，前端开发者通常需要结合后端验证和特定的前端策略。

## 令牌验证

这是最常见的防御机制，涉及在客户端和服务器之间生成和交换 CSRF 令牌。

### 服务器端令牌生成

用户成功登录后，服务器会生成一个 CSRF 令牌并将其存储在用户的会话中。

```python
# Python example
from flask import Flask, session
app = Flask(__name__)

@app.route('/login')
def login():
    session['csrf_token'] = generate_csrf_token()
    return render_template('login.html', csrf_token=session['csrf_token'])
```

### 客户端令牌使用

将令牌嵌入每个受保护表单中，或将其作为 HTTP 头的一部分包含。

```html
<!-- HTML example -->
<form action="/protected" method="POST">
  <input type="hidden" name="csrf_token" value="{{ csrf_token }}">
  <!-- ...other form fields... -->
</form>
```

```js
// JavaScript example (using Fetch API)
fetch('/protected', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-CSRF-Token': window.csrfToken
  },
  body: formData
});
```

## 检查 Referer 头

尽管由于浏览器可能禁用或篡改 Referer 头部，它并非完全可靠，但可以作为一项补充防御措施。

```python
# Python example (Flask middleware)
from flask import request

@app.before_request
def check_referer():
    if request.method in ['POST', 'PUT', 'DELETE']:
        if not request.referrer or request.referrer != app.config['APP_BASE_URL']:
            return abort(403)
```

## 双因素认证

要求用户通过辅助步骤（如弹窗或验证码）确认敏感操作。

## SameSite Cookie 属性

将 cookies 的 `SameSite` 属性设置为 `Lax` 或 `Strict` 以限制跨站提交。 `Lax` 允许在顶级导航中使用 cookies，而 `Strict` 更为严格，仅允许同站请求使用 cookies。

```python
# Python example (using Flask-Session extension)
from flask_session import Session
from flask import Flask

app = Flask(__name__)
Session(app)
app.session_interface.cookie_samesite = 'Lax'
```

## 仅接受 POST 接口

对于敏感操作，仅接受 POST 请求并避免 GET 请求，因为 GET 请求容易受到浏览器书签、链接预加载或第三方脚本的滥用。

在前端代码中，防御 CSRF 通常涉及在表单提交或 Ajax 请求中包含 CSRF 令牌。在后端验证令牌的真实性至关重要，因为前端防御可能被绕过。

**示例：Node.js + Express 带有 CSRF 保护**

```js

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const csrf = require('csurf');
const app = express();

// Use cookie-parser middleware to parse cookies
app.use(require('cookie-parser')());

// Use middleware to generate and inject CSRF tokens
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Protect route
app.post('/protected', csrfProtection, (req, res) => {
  // Validate token and perform action
  if (req.csrfToken() === req.body.csrfToken) {
    // Safe operation
  } else {
    // Invalid CSRF token, return error
    res.status(403).send('CSRF token mismatch');
  }
});

// Respond with HTML page containing CSRF token
app.get('/', (req, res) => {
  res.send(`
    <form action="/protected" method="POST">
      <input type="hidden" name="csrfToken" value="${req.csrfToken()}">
      <button type="submit">Submit</button>
    </form>
  `);
});

app.listen(3000);
```

## 使用 CSP（内容安全策略）

内容安全策略（CSP）是一种网络安全策略，通过指定哪些外部资源可以被加载或执行，来降低跨站脚本（XSS）攻击的风险。虽然 CSP 主要针对 XSS，但在正确配置的情况下，它可以通过限制第三方网站发起对您应用程序的请求，间接帮助防御 CSRF 攻击。

```js
// Set CSP header in an Express application
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'");
  next();
});
```

## 验证来源头

尽管不如 CSRF 令牌可靠，但在某些情况下，检查 Origin 头部可以作为一种补充防御措施。如果请求来自不可信的源，服务器可以拒绝该请求。

```python

# Flask example
from flask import request

@app.before_request
def verify_origin():
    if request.method == 'POST':
        allowed_origins = ['https://your-trusted-origin.com']
        origin = request.headers.get('Origin')
        if origin not in allowed_origins:
            return 'Unauthorized', 401
```

## HTTPS (HTTP 严格传输安全)

强制与服务器仅通过 HTTPS 进行通信可以防止中间人攻击，通过使攻击者更难拦截或修改 HTTPS 通信来降低 CSRF 风险。

```python
# Flask example
@app.after_request
def apply_hsts(response):
    response.he
    aders['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response
```

## 使用 Web 应用防火墙（WAF）

Web 应用防火墙通过检测和阻止恶意请求，包括 CSRF 攻击，提供了一层额外的保护。WAF 可以是硬件设备、软件服务或基于云的解决方案，通常使用特征匹配、行为分析或机器学习算法来识别和阻止攻击。

## 限制敏感操作速率

限制敏感操作的频率有助于防止大规模的 CSRF 攻击。例如，限制用户每分钟只能更改几次密码或删除几个账户。

```js

// Simple rate limiting with JavaScript
let lastRequestTime = null;
const LIMIT = 60 * 1000; // One minute

function submitSensitiveAction() {
  const currentTime = Date.now();
  if (lastRequestTime && currentTime - lastRequestTime < LIMIT) {
    alert('Too many requests, please try again later.');
    return;
  }

  // Submit request...
  lastRequestTime = currentTime;
}
```

## 避免对敏感操作使用 GET 请求

虽然 POST 请求通常比 GET 请求更安全，但在某些情况下，GET 请求可能不可避免。在这种情况下，确保 URL 不会被缓存或存储在浏览器历史记录中，以降低 CSRF 风险。例如，使用动态生成的随机参数，而不是直接暴露敏感信息。

```python
# Django example
from django.http import HttpResponseBadRequest

def sensitive_get_view(request):
    if not request.GET.get('random_token') == request.session.get('random_token'):
        return HttpResponseBadRequest('Invalid token')

    # Perform sensitive operation...

    # Clear random token to prevent replay attacks
    request.session.pop('random_token', None)
```

## 使用 OAuth 2.0 或 JWT

现代网页应用常使用 OAuth 2.0 或 JSON Web Tokens（JWT）进行身份验证。这些协议提供了内置机制来验证请求来源和授权状态，从而降低 CSRF 风险。然而，正确的实现至关重要，因为这些协议自身也存在安全挑战。

## 保持框架和库的更新

确保前端框架、后端库和服务器软件保持最新，以受益于最新的安全补丁和修复。

## 安全编码和测试

遵循安全编码最佳实践，如输入验证、输出编码、错误处理和日志记录，可以帮助识别和修复潜在漏洞。此外，定期的安全测试，如渗透测试和代码审查，可确保应用程序在部署前是安全的。