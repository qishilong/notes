import md5 from "./md5.min.js";

// 百度翻译的 APPID 以及 key
// 请填写你自己的 appid 和 key
const appid = "";
const key = "";

/**
 * 
 * @param {*} q 要翻译的文本
 * @param {*} from 原来的语言
 * @param {*} to 目标语言
 */
function transFunc(q, from = "auto", to) {
  return new Promise((resolve, reject) => {
    // 生成随机数
    const salt = Date.now(); // 随机数
    // 制作签名 appid+q+salt+密钥的MD5值
    const sign = md5(`${appid}${q}${salt}${key}`);
    // 发送请求进行翻译
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q, // 要翻译的文本
        from, // 原来的语言
        to, // 目标语言
        appid,
        salt, // 随机数
        sign // 签名
      },
      success(res) {
        console.log(res)
        if (res.data && res.data.trans_result) {
          // 说明翻译成功
          // 返回翻译的文本
          resolve(res.data.trans_result[0].dst)
        }
      },
      fail() {
        wx.showToast({
          title: '网络异常',
          icon: "error",
          duration: 2000
        })
        reject({
          status: "error",
          msg: "翻译失败"
        })
      }
    })
  })
}

module.exports = transFunc;