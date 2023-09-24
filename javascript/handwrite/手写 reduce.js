Array.prototype.myReduce = function (callback, initialValue) {
	if (typeof callback !== 'function') {
		throw new TypeError('Expect callback is a function');
	} else if (!this.length && initialValue === undefined) {
		throw new TypeError('Expect this.length 大于 0 或者 initialValue 不为空');
	} else if (
		(this.length === 1 && initialValue) ||
		(!this.length && initialValue === undefined)
	) {
		return this[0] || initialValue;
	} else {
		// 注意是否有初始值
		let value = initialValue === undefined ? this[0] : initialValue;
		for (let i = initialValue === undefined ? 1 : 0; i < this.length; i++) {
			const element = this[i];
			value = callback(value, element, i, this);
		}
		return value;
		// let hasInitialValue = initialValue !== undefined;
		// let value = hasInitialValue ? initialValue : this[0];
		// for (let index = hasInitialValue ? 0 : 1; index < this.length; index++) {
		//     const element = this[index];
		//     value = callback(value, element, index, this);
		// }
		// return value;
	}
};

const arrayLike = {
	length: 3,
	0: 2,
	1: 3,
	2: 4,
};
console.log(Array.prototype.myReduce.call(arrayLike, (x, y) => x + y));
