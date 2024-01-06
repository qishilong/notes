# Symbol 相关属性

symbol 可用作对象的属性

## Symbol.iterator

一个符号值，可用作方法名，让对象变得可迭代

## Symbol.keyFor()

**`Symbol.keyFor(sym)`** 方法用来获取全局 symbol 注册表中与某个 symbol 关联的键。

如果全局注册表中查找到该 symbol，则返回该 symbol 的 key 值，返回值为字符串类型。否则返回 undefined

```js
// 创建一个全局 Symbol
var globalSym = Symbol.for("foo");
Symbol.keyFor(globalSym); // "foo"

var localSym = Symbol();
Symbol.keyFor(localSym); // undefined，

// 以下 Symbol 不是保存在全局 Symbol 注册表中
Symbol.keyFor(Symbol.iterator); // undefined
```

