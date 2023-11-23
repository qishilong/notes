Page({
  data: {
  },
  /**
   * 假设现在有一个业务逻辑
   * 获取公司的信息
   */
  async getCompanyInfo(){
    wx.checkSession({
      success:async ()=>{
        const { session_key, openid } = await wx.getStorage({key : 'wxUserInfo'});
        wx.request({
          url: 'http://www.xxxx.com/wx/companyinfo',
          // 这里发送什么 data，需要看后端的接口设计
          data : {
            openid,
            session_key,
            comID : '1231231'
          },
          success(){
            // 做额外的业务处理
          }
        })
      },
      fail:()=>{
        // 需要重新登录
        this.login();
      }
    });
  },

  /**
   * 登录
   */
  login(){
    wx.login({
      success(res){
        // console.log(res); // res 里面的这个 code 字符串就是我们需要的登录凭证
        // 接下来下一步就是带着这个 code 去请求我们自己的服务器的登录接口
        // 注意，请求后端服务器的登录接口时，需要在小程序的控制台配置合法的 request 域名
        wx.request({
          url: 'http://www.xxxx.com/wx/loginapi',
          data : {
            code : res.code
          },
          success(res){
            // 从后端服务器拿到 openid 以及 session_key
            let openid = res.openid;
            let session_key = res.session_key;
            // 接下来我们需要存储这个 session_key
            wx.setStorageSync('wxUserInfo', {
              openid,
              session_key
            })
          }
        })
      }
    });
  },
  tapHandle(){
    this.login();
  }
})
