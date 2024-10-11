# Debugging Next.js in VSCode (with Turbopack) – launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "port": 9230,
      "request": "attach",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "node",
      "sourceMapPathOverrides": {
         "/turbopack/[project]/*": "${webRoot}/*"
      }
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Next.js: debug client-side",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}",
      "sourceMapPathOverrides": {
         "/turbopack/[project]/*": "${webRoot}/*"
      }
    }
  ],
  "compounds": [
    {
      "name": "Next.js: debug full stack",
      "configurations": ["Next.js: debug client-side", "Next.js: debug server-side"],
      "stopAll": true
    }
  ]
}
```

