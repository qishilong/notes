import { useState } from 'react';
import MarkdownPreview from './MarkdownPreview';

const defaultMarkdown = `# React Markdown 预览

## 正常内容

- **加粗** 和 *斜体*
- [链接](https://example.com)
- ![图片](https://via.placeholder.com/100)

## XSS 测试

<script>alert('XSS')</script>

<img src=x onerror=alert('XSS')>

[恶意链接](javascript:alert('XSS'))

<svg onload=alert('XSS')>

| 表头 | 数据 |
|------|------|
| 正常 | <div onmouseover=alert(1)>hover</div> |
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  return (
    <div style={{ display: 'flex', gap: '16px', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ flex: 1 }}>
        <h2>编辑器</h2>
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          style={{ width: '100%', height: '400px', fontFamily: 'monospace', fontSize: '14px' }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <h2>安全预览</h2>
        <div style={{ border: '1px solid #ddd', padding: '16px', borderRadius: '4px' }}>
          <MarkdownPreview content={markdown} />
        </div>
      </div>
    </div>
  );
}

export default App;
