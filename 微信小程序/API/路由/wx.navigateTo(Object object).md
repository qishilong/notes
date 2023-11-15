# wx.navigateTo(Object object)

>   **以 [Promise 风格](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html#异步-API-返回-Promise) 调用**：支持
>
>   **需要页面权限**：当前是插件页面时，宿主小程序不能调用该接口，反之亦然
>
>   **小程序插件**：支持，需要小程序基础库版本不低于 [2.2.2](https://developers.weixin.qq.com/miniprogram/dev/framework/compatibility.html)
>
>   在小程序插件中使用时，只能在当前插件的页面中调用
>
>   **微信 Windows 版**：支持
>
>   **微信 Mac 版**：支持

## 功能描述

保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 [wx.navigateBack](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html) 可以返回到原页面。小程序中页面栈最多十层。

## 参数

### Object object

| 属性      | 类型     | 默认值 | 必填 | 说明                                                         |
| :-------- | :------- | :----- | :--- | :----------------------------------------------------------- |
| url       | string   |        | 是   | 需要跳转的应用内非 tabBar 的页面的路径 (代码包路径), 路径后可以带参数。参数与路径之间使用 `?` 分隔，参数键与参数值用 `=` 相连，不同参数用 `&` 分隔；如 'path?key=value&key2=value2' |
| events    | Object   |        | 否   | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。基础库 2.7.3 开始支持。 |
| routeType | string   |        | 否   | 2.29.2 自定义路由类型，相关文档 [自定义路由](https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/custom-route.html) |
| success   | function |        | 否   | 接口调用成功的回调函数                                       |
| fail      | function |        | 否   | 接口调用失败的回调函数                                       |
| complete  | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

#### object.success 回调函数

##### 参数

###### Object res

| 属性         | 类型                                                         | 说明                 |
| :----------- | :----------------------------------------------------------- | :------------------- |
| eventChannel | [EventChannel](https://developers.weixin.qq.com/miniprogram/dev/api/route/EventChannel.html) | 和被打开页面进行通信 |

## 示例代码

```js
wx.navigateTo({
  url: 'test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})
//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
    })
  }
})
```