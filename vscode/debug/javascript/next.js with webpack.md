# Debugging Next.js in VSCode (with Webpack) – launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "port": 9230,  // 因为 Next.js 的一些原因，实际开启的调试端口是 9230
      "request": "attach",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node"
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Next.js: debug client-side",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ],
  "compounds": [
    {
      "name": "Next.js: debug full stack",
      "configurations": ["Next.js: debug client-side", "Next.js: debug server-side"],
      "stopAll": true  // 停止一个配置后，停止所有配置
    }
  ]
}
```

