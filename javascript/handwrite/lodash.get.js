function get(obj, path, defaultValue = 'default') {
	if (typeof path !== 'string') {
		throw new TypeError('Expect path is a character string');
	}
	const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.');
	for (const item of paths) {
		obj = obj[item];
		if (obj === undefined) {
			return defaultValue;
		}
	}
	return obj;
}

const obj = {
	a: [1, 2, 3, { c: 1, d: { e: 1 } }],
	b: 2,
};

const result = get(obj, 'a[3].d.e');
console.log(result);
