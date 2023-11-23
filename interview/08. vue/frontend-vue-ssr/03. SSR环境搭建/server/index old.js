const express = require('express');
const server = express();
const fs = require('fs');
const { resolve } = require('path');
const { createRenderer } = require('vue-server-renderer');
const {default: createApp} = require('../dist/server.bundle.js');
server.use(express.static(resolve('../dist'), { index: false }))
server.get('*', async (req, res) => {
  try {
    // 1. 创建vue实例
    const app = createApp();
    // 2. 创建渲染器
    const render = createRenderer({
      template: fs.readFileSync('./index.ssr.html', 'utf-8')
    });
    const html = await render.renderToString(app);
    res.send(html)
    // 3. 利用渲染器将vue实例转化成html字符串
  } catch (error) {
    console.log(error);
    res.status(500).send('服务器错误');
  }

  // res.send('hello');
});

server.listen(12306, () => console.log('server is run at 12306'));