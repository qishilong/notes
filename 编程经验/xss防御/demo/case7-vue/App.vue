<template>
  <div style="display: flex; gap: 16px; padding: 20px; font-family: sans-serif">
    <div style="flex: 1">
      <h2>编辑器</h2>
      <textarea
        v-model="markdown"
        style="width: 100%; height: 400px; font-family: monospace; font-size: 14px"
      />
    </div>
    <div style="flex: 1">
      <h2>安全预览</h2>
      <div style="border: 1px solid #ddd; padding: 16px; border-radius: 4px">
        <MarkdownPreview :content="markdown" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MarkdownPreview from './MarkdownPreview.vue';

const markdown = ref(`# Vue 3 Markdown 预览

## 正常内容

- **加粗** 和 *斜体*
- [链接](https://example.com)
- ![图片](https://via.placeholder.com/100)

## XSS 测试

<script>alert('XSS')<\/script>

<img src=x onerror=alert('XSS')>

[恶意链接](javascript:alert('XSS'))

<svg onload=alert('XSS')>
`);
</script>
