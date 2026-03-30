import express from 'express';
import { marked } from 'marked';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const app = express();
app.use(express.json());

const purifyConfig = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img',
    'strong', 'em', 'del', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
  ALLOW_DATA_ATTR: false,
};

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
  const cleanHtml = DOMPurify.sanitize(rawHtml, purifyConfig);

  res.json({ html: cleanHtml });
});

// 简单的测试页面
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>Node.js Markdown 渲染服务</title>
      <style>
        body { font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; }
        textarea { width: 100%; font-family: monospace; }
        #preview { border: 1px solid #ddd; padding: 16px; margin-top: 16px; }
        button { margin-top: 8px; padding: 8px 16px; cursor: pointer; }
      </style>
    </head>
    <body>
      <h1>案例 4：Node.js 服务端渲染</h1>
      <textarea id="editor" rows="10" placeholder="输入 Markdown...">
# 标题

正常 **加粗** 和 *斜体*

<script>alert('XSS')</script>

<img src=x onerror=alert(1)>
      </textarea>
      <button onclick="render()">发送到服务端渲染</button>
      <div id="preview"></div>
      <script>
        async function render() {
          const markdown = document.getElementById('editor').value;
          const res = await fetch('/api/render', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ markdown }),
          });
          const data = await res.json();
          document.getElementById('preview').innerHTML = data.html;
        }
      </script>
    </body>
    </html>
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`服务已启动: http://localhost:${PORT}`);
});
