# PopStateEvent

**`PopStateEvent`**是事件的接口[`popstate`](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)。

每次活动`popstate`历史记录条目在同一文档的两个历史记录条目之间发生变化时，都会向窗口发送一个事件。如果正在激活的历史条目是通过调用创建的`history.pushState()`或受调用影响的`history.replaceState()`，则`popstate` 事件的`state`属性包含历史条目状态对象的副本。

![image-20230705175315752](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202307051753788.png)

## [构造函数](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent#constructor)

-   [`PopStateEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent/PopStateEvent)

    创建一个新`PopStateEvent`对象。

## [实例属性](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent#instance_properties)

*该接口还继承了其父接口 的属性[`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)。*

-   [`PopStateEvent.state`](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent/state) 只读

    `pushState()`返回提供给或 的信息的副本`replaceState()`。

## [实例方法](https://developer.mozilla.org/en-US/docs/Web/API/PopStateEvent#instance_methods)

*该接口没有自己的方法，但继承了其父接口 的方法[`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event)。*