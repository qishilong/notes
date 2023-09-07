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
