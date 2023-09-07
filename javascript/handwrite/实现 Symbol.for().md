# 实现 Symbol.for()
Symbol.for()其实内部是有一个注册表，第一次使用某个字符串调用时，它会检查全局运行时注册表，发现不存在对应的符号，于是就会生成一个新符号实例并添加到注册表中。后续使用相同字符串的调用同样会检查注册表，如果存在就直接返回，不存在就创建新符号并添加到注册表中。

## 实现
```js
const SymbolFor = ((name) => {
	const global = {};
	return function (name) {
		if (!global[name]) {
			global[name] = Symbol(name);
		} else {
			return global[name];
		}
	};
})();
```