const express = require('express');
const server = express();

server.use(express.json());

server.post('/login', async(req, res) => {
  try {
    const {userName, password} = req.body;
    if (userName == 'root' && password == '123123') {
      res.cookie('session', '123456');
      res.cookie('username', '小丁');
      res.json({
        name: '小丁',
        msg: '登录成功',
        code: 200,
      })
    } else {
      res.json({
        code: 400,
        msg: '用户名密码错误'
      });
    }
  } catch (error) {
    console.log(error);
    res.statusCode(500).send('服务器错误');
  }
});

server.listen(8080, _ => console.log('server is running at 8080'));