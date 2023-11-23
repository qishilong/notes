# App与Page构造器



## App 构造器

App构造器位于 app.js 里面，整个应用只有这一个

**生命周期钩子函数**

如果你有 vue 或者 react 的开发经验，那么生命周期钩子函数也是非常熟悉的。所谓生命周期钩子函数，就是在一些固定的时间点自动触发的函数。

在 App 构造器中，我们能够书写的生命周期钩子函数如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-01-11-053925.png" alt="image-20230111133925087" style="zoom:50%;" />

什么叫做进入后台状态？

用户点击右上角的关闭按钮，或者按手机设备的Home键离开小程序，此时小程序并没有被销毁，这种情况称为“小程序进入后台状态”。



注意，onLaunch、onShow 这两个生命周期钩子函数是接收一个参数的。

因为打开小程序的方式多种多样，有些时候，我们需要根据不同的打开方式，做一些不同的业务处理。

示例如下：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-01-11-054913.png" alt="image-20230111134912620" style="zoom:50%;" />



**获取全局数据**

在微信小程序中，我们有些时候需要不同的页面共享一些公共的数据。

在诸如 vue、react 这种框架中，有专门的状态处理库，在微信小程序中，通过的是 globalData 来共享数据。

globalData 位于 App 构造器中，如下图：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-01-11-055223.png" alt="image-20230111135222913" style="zoom:50%;" />

其他页面如何获取公共的数据？

非常简单，在各个页面的 js 文件中，通过 getApp 函数首先获取到 App 的实例，之后访问该实例的 globalData 数据即可

```js
const app = getApp()
console.log("globalData: ",app.globalData);
```



有一点一定要注意，虽然在小程序中有多个页面，但是多个页面的 JS 跑在一个线程中，这也就意味着假设你在当前页面设置了定时器，从一个页面跳到另外一个页面，之前所设置的计时器并不会被清除掉。所以需要我们在离开页面的时候手动的来清理掉这些计时器。



另外还有一点，虽然我们通过 getApp 能够获取到 App 的实例，但是一般仅仅是拿来获取 globalData，不要去主动调用生命周期钩子函数，生命周期钩子函数应当是在对应的时间点主动触发的。



## Page 构造器

Page构造器位于每个页面的 JS 下面。

我们之前实际上已经接触过一个 Page 构造器的配置项，那就是 data。通过配置 data 里面的数据，可以指定在页面中渲染一些动态的数据。

**生命周期钩子函数**

Page 除了配置 data 配置项以外，还以配置相应的生命周期钩子函数。

能够配置的选项如下表：

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2023-01-11-060519.png" alt="image-20230111140518750" style="zoom:50%;" />

- onLoad：页面销毁之前会调用一次，当前页面已经加载好了
- onShow：每次当前页面被显示的时候会调用
- onReady：页面销毁之前会调用一次，表示当前页面已经渲染完毕

什么算是页面销毁？或者说什么时候页面会被销毁？

当前页面使用wx.redirectTo或wx.navigateBack返回到其他页时，当前页面会被微信客户端销毁回收



和 App 构造器中的生命周期钩子函数相同，不要去主动调用，而是应该在对应的时间点自动触发。总之你记住，只要是生命周期钩子函数，都应该是自动的触发，而不应该去手动的调用。



关于参数的传递

在进行页面跳转的时候，往往存在一种情况，就是当前页面需要传递一个 id 给新的页面，新的页面就根据当前这个 id 显示详情信息。

在跳转的时候，可以通过如下的方式来进行跳转：

```js
wx.navigateTo({ url: '/pages/detail/detail?id=1&other=abc' })
```

实际上就和我们 GET 请求传参是一样的。



接下来的问题就是新的页面如何拿到这个参数？

在 onLoad 生命周期钩子中，可以接收一个参数，通过该参数就能够拿到前一个页面传递过来的参数：

```js
Page({
  onLoad: function(option) {
      console.log(option.id)
      console.log(option.other)
  }
})
```



**data 中配置数据**

最后就是关于设置 Page 构造器中 data 里面数据的问题，通过 this.setData 来进行设置。该方法接收两个参数，一个是新的数据，另一个是页面随着数据更新重新渲染后的回调函数。

```js
editTestHandle(){
  this.setData({
    test : "aaaaaa"
  }, function(){
    console.log("修改完毕，页面已经更新了")
  })
}
```

设置的时候，只需要设置更新的数据即可。

同时还有如下的注意点：

1. 直接修改 Page实例的this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
2. 由于setData是需要两个线程的一些通信消耗，为了提高性能，每次设置的数据不应超过1024kB。
3. 不要把data中的任意一项的value设为undefined，否则可能会有引起一些不可预料的bug。



本节课结束，下来请通读官方文档对应部分：*https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0004eec99acc808b00861a5bd5280a*
