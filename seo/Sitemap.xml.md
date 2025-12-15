# Sitemap.xml

## Sitemap.xml 多语言生成脚本

```js
const fs = require("fs");
const path = require("path");
const routes = require("../routes.config");

const domain = "xxx"; // 域名
const locales = ["", "en", "de", "fr", "ja", "ko"];

function formatDate() {
  return new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().replace("Z", "+08:00"); // 生成东八区时间
}

function generateSitemap() {
  let urlEntries = "";

  for (const { url: rawPath, priority = 0.8, changefreq } of routes) {
    // 统一路径格式
    let cleanPath = rawPath.trim();
    if (cleanPath !== "/" && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.slice(0, -1);
    }
    if (cleanPath === "") cleanPath = "/";

    // 生成所有语言版本的 hreflang 链接
    const alternates = locales
      .map((loc) => {
        const hreflang = loc === "" ? "x-default" : loc;
        const prefix = loc === "" ? "" : `/${loc}`;
        const href = `${domain}${prefix}${cleanPath}`;
        return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}" />`;
      })
      .join("\n");

    // 只有「无语言前缀」的版本作为 <loc>（即 x-default 版）
    const locUrl = `${domain}${cleanPath}`;

    urlEntries +=
      `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${formatDate()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
${alternates}
  </url>
` + "\n";
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${urlEntries}</urlset>`;
}
const sitemap = generateSitemap();

// 输出到 public 目录
fs.writeFileSync(path.join(__dirname, "../scripts/sitemap.global.xml"), sitemap, "utf8");

console.log("✅ sitemap.global.xml 已生成");
console.log(`路径数量：${routes.length} 条`);
console.log(`语言变体：${routes.length * (locales.length + 1)} 个（含 x-default）`);
```

