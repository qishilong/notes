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
    'open',                        // <details open>
    'type', 'checked', 'disabled', // <input type="checkbox">
    'align',                       // 表格对齐
    'colspan', 'rowspan',
  ],

  // 禁止 data-* 属性
  ALLOW_DATA_ATTR: false,

  // 链接协议白名单（关键！阻止 javascript: 等）
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,

  // 强制所有链接添加 target
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

const result = renderMarkdown(input);
console.log('=== 净化后的安全 HTML ===');
console.log(result);
