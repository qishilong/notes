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
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img',
    'strong', 'em', 'del', 's', 'mark',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    // 代码高亮会生成 <span>
    'span',
  ],
  ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
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
      .filter((c) => c.startsWith('hljs') || c.startsWith('language-'))
      .join(' ');
  }
});

function renderMarkdown(markdownText) {
  const rawHtml = md.render(markdownText);
  return DOMPurify.sanitize(rawHtml, purifyConfig);
}

// 测试
const input = `
# markdown-it + 代码高亮 + DOMPurify

## 代码块测试

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
  const arr = [1, 2, 3];
  return arr.map(x => x * 2);
}
\`\`\`

\`\`\`python
def hello():
    print("Hello, World!")
    return [x * 2 for x in [1, 2, 3]]
\`\`\`

## 恶意代码测试

<script>alert('XSS')</script>

<img src=x onerror=alert(1)>

内联代码: \`<script>alert(1)</script>\`
`;

const result = renderMarkdown(input);
console.log('=== markdown-it + 高亮 + 净化后的 HTML ===');
console.log(result);
