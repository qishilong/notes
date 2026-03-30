import { useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const PURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'span',
    'a', 'img', 'strong', 'em', 'del', 'table', 'thead',
    'tbody', 'tr', 'th', 'td', 'details', 'summary', 'input',
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'class', 'id',
    'target', 'rel', 'open', 'type', 'checked', 'disabled',
  ],
  ALLOW_DATA_ATTR: false,
  ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
};

// 初始化 Hook（只执行一次）
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.tagName === 'A') {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

function MarkdownPreview({ content }) {
  const safeHtml = useMemo(() => {
    if (!content) return '';
    const rawHtml = marked.parse(content);
    return DOMPurify.sanitize(rawHtml, PURIFY_CONFIG);
  }, [content]);

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}

export default MarkdownPreview;
