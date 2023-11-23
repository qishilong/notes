var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("req.query>>>",req.query); // 获取客户端传递过来的 GET 请求的参数
  // 向客户端返回响应
  // res.send({
  //   name : "zhangsan",
  //   age : 18
  // })
});

router.post('/abc', function(req, res, next) {
  console.log("req.body>>>",req.body); // 获取客户端传递过来的的 POST 请求的参数
  // 向客户端返回响应
  res.send({
    name : "lisi",
    age : 20
  })
});

module.exports = router;
