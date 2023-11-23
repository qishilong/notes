// 在该文件中来封装云函数逻辑

const cloud = require('wx-server-sdk');

exports.main = async(event) => {
  let result = 0;
  // 根据传递过来的参数做不同的计算
  // num1、num2、tag（+ - * /）
  switch(event.tag){
    case "+": {
      result = ~~event.num1 + ~~event.num2;
      break;
    }
    case "-":{
      result = ~~event.num1 - ~~event.num2;
      break;
    }
    case "*":{
      result = ~~event.num1 * ~~event.num2;
      break;
    }
    case "/":{
      result = ~~event.num1 / ~~event.num2;
      break;
    }
  }
  return {
    calcResult : result
  }
}