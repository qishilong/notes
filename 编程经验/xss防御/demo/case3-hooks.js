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

// 测试
const input = `
# Hook 安全增强测试

外部链接: [Google](https://google.com)

恶意链接: [XSS](javascript:alert('XSS'))

HTTPS 图片: ![ok](https://example.com/img.png)

HTTP 图片: ![blocked](http://example.com/img.png)

样式注入: <div style="width:expression(alert(1))">test</div>
`;

const result = renderMarkdown(input);
console.log('=== Hook 净化后的安全 HTML ===');
console.log(result);
