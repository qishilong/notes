# handler.apply()

**`handler.apply()`** 方法用于拦截函数的调用。

## [尝试一下](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply#尝试一下)

<iframe class="interactive is-taller-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/proxyhandler-apply.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 755px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 654px; margin: 1rem 0px; padding: 0px;"></iframe>

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply#语法)

```js
var p = new Proxy(target, {
  apply: function(target, thisArg, argumentsList) {
  }
});
```

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply#参数)

以下是传递给 apply 方法的参数，`this` 上下文绑定在 handler 对象上。

-   `target`

    目标对象（函数）。

-   `thisArg`

    被调用时的上下文对象。

-   `argumentsList`

    被调用时的参数数组。

### [返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply#返回值)

`apply` 方法可以返回任何值。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply#描述)

**`handler.apply`** 方法用于拦截函数的调用。

### [拦截](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply#拦截)

该方法会拦截目标对象的以下操作：

-   `proxy(...args)`
-   [`Function.prototype.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 和 [`Function.prototype.call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
-   [`Reflect.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)

### [约束](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply#约束)

如果违反了以下约束，代理将抛出一个 TypeError：

`target` 必须是可被调用的。也就是说，它必须是一个函数对象。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply#示例)

以下代码演示如何捕获函数的调用。

```js
var p = new Proxy(function() {}, {
  apply: function(target, thisArg, argumentsList) {
    console.log('called: ' + argumentsList.join(', '));
    return argumentsList[0] + argumentsList[1] + argumentsList[2];
  }
});

console.log(p(1, 2, 3)); // "called: 1, 2, 3"
                         // 6
```