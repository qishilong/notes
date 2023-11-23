// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    canIUseOpenData: false, // 如需尝试获取用户信息可改为false
    // 权限 key 和对应权限名称的映射
    keyName: {
      'scope.userInfo': '是否授权用户信息',
      'scope.userLocation': '是否授权地理位置',
      'scope.address': "是否授权通讯地址",
      'scope.invoiceTitle': '是否授权发票抬头',
      'scope.invoice': '是否授权获取发票',
      'scope.addPhoneContact': '是否添加通讯录联系人',
      'scope.addPhoneCalendar': '是否授权系统日历',
      'scope.record' : '是否允许使用麦克风'
    },
    // 存储处理好的权限信息
    sysOptList: [],
    // 是否显示权限列表
    showSysOpt : true, 
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 收货地址
  address(){
    // 涉及到 wx.chooseAddress
    // 在获取收货地址的时候，需要去微信公众平台开通此权限
    // 另外，还需要在 app.json 中添加配置，具体参阅文档
    wx.chooseAddress({
      success(res){
        console.log(res);
        wx.showModal({
          title: '展示',
          content: `你所在的${res.cityName}是我们的优质城市，可享受8折优惠`,
        })
      }
    })
  },
  // 查看用户权限
  userAuth(){
    // 调用 wx.getSetting
    wx.getSetting({
      success : ({authSetting}) =>{
        const settingArr = [];
        for(let k in authSetting){
          // k --> scope.userInfo ...
          settingArr.push({
            key : this.data.keyName[k],
            val : authSetting[k]
          });
        }
        this.setData({
          sysOptList : settingArr,
          showSysOpt : false
        })
      }
    })
  },
  // 设置用户权限
  sysOptSetting(){
    // 涉及到的 wx.openSetting
    wx.openSetting({
      success : ({authSetting}) => {
        // 这边拿到的是设置后的权限信息
        // 进行权限的更新即可
        const settingArr = [...this.data.sysOptList];
        console.log(settingArr);
        console.log(authSetting);
        for(let i of settingArr){
          for(let k in authSetting){
            if(i.key === this.data.keyName[k]){
              i.val = authSetting[k]
            }
          }
        }
        this.setData({
          sysOptList : settingArr,
        })
      }
    })
  }
})
