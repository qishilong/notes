const arr = [
	1,
	1,
	1,
	1,
	2,
	2,
	3,
	3,
	true,
	true,
	'true',
	'true',
	false,
	false,
	'false',
	'false',
	NaN,
	NaN,
	'NaN',
	'NaN',
	null,
	null,
	'null',
	'null',
	undefined,
	undefined,
	'undefined',
	'undefined',
	'{}',
	'{}',
	'[]',
	'[]',
	{},
	undefined,
	{},
	{ a: 1, b: 2 },
	{ a: 1, b: 2 },
	{ a: 1, b: 2, c: 3 },
	[1, 2],
	[1, 2],
	[1, 2, 3],
	[],
	[],
];

/**
 * 1. ES6 Set
 * @param {*} arr
 */
function fn1(arr) {
	return Array.from(new Set(arr));
}
// console.log(fn1(arr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
// 不考虑兼容性，这种去重的方法代码最少。这种方法还无法去掉 {} 空对象，后面的高阶方法会添加去掉重复 {} 的方法。

/**
 * 2. 利用 for 嵌套 for，然后 splice 去重（ES5 中最常用）
 * 双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。(条件：数组有序)
 * @param {*} arr
 */
function fn2(arr) {
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[i] === arr[j]) {
				arr.splice(j, 1);
				j--;
			}
		}
	}
	return arr;
}
// console.log(fn2(arr));

/**
 * 3. 利用 indexOf 去重
 * 新建一个空的结果数组，for 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则 push 进数组。
 * @param {*} arr
 */
function fn3(arr) {
	const result = [];
	const length = arr.length;
	for (let i = 0; i < length; i++) {
		if (result.indexOf(arr[i]) === -1) {
			result.push(arr[i]);
		}
	}
	return result;
}
// console.log(fn3(arr));

/**
 * 4. 利用 sort()
 * 利用 sort() 排序方法，然后根据排序后的结果进行遍历及相邻元素比对。
 * @param {*} arr
 */
function fn4(arr) {
	const result = [];
	arr.sort((a, b) => a - b);
	const length = arr.length;
	for (let i = 1; i <= length; i++) {
		if (arr[i] !== arr[i - 1]) {
			result.push(arr[i - 1]);
		}
	}
	return result;
}
// console.log(fn3(arr));

/**
 * 5. 利用对象的属性不能相同的特点进行去重（这种数组去重的方法有问题，不建议用，有待改进）
 * @param {*} arr
 */
function fn5(arr) {
	const result = [];
	const obj = {};
	const length = arr.length;
	for (let i = 0; i < length; i++) {
		if (!(arr[i] in obj)) {
			result.push(arr[i]);
			obj[arr[i]] = 1;
		}
	}
	return result;
}
// console.log(fn5(arr));

/**
 * 6. 利用 includes
 * @param {*} arr
 */
function fn6(arr) {
	const result = [];
	const length = arr.length;
	for (let i = 0; i < length; i++) {
		if (!result.includes(arr[i])) {
			result.push(arr[i]);
		}
	}
	return result;
}
// console.log(fn6(arr));

/**
 * 7. 利用 hasOwnProperty
 * 利用 hasOwnProperty 判断是否存在对象属性
 * @param {*} arr
 */
function fn7(arr) {
	const obj = {};
	return arr.filter((item, index, array) => {
		return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true);
	});
}
// console.log(fn7(arr)); // 都去重了

/**
 * 8. 利用 filter
 * @param {*} arr
 */
function fn8(arr) {
	return arr.filter(function (item, index, array) {
		return arr.indexOf(item, 0) === index;
	});
}
// console.log(fn8(arr));

/**
 * 9. 利用递归去重
 * @param {*} arr
 */
function fn9(arr) {
	const length = arr.length;
	arr.sort((a, b) => a - b);

	function loop(index) {
		if (index >= 1) {
			if (arr[index] === arr[index - 1]) {
				arr.splice(index, 1);
			}
			loop(index - 1); // 递归 loop，然后数组去重
		}
	}
	loop(length - 1);
	return arr;
}
// console.log(fn9(arr));

/**
 * 10. 利用 Map 数据结构去重
 * @param {*} arr
 */
function fn10(arr) {
	const map = new Map();
	const result = [];
	for (let item of arr) {
		if (!map.has(item)) {
			result.push(item);
			map.set(item, true);
		}
	}
	return result;
}
// console.log(fn10(arr));

/**
 * 11. 利用 reduce + includes
 * @param {*} arr
 */
function fn11(arr) {
	return arr.reduce((pre, cur) => (pre.includes(cur) ? pre : [...pre, cur]), []);
}
// console.log(fn11(arr));

/**
 * 12. [...new Set(arr)]
 * @param {*} arr
 */
function fn12(arr) {
	return [...new Set(arr)];
}
// console.log(fn12(arr));

/**
 * 双重循环
 * 在这个方法中，我们使用循环嵌套，最外层循环 array，里面循环 res，如果 array[i] 的值跟 res[j] 的值相等，就跳出循环，如果都不等于，说明元素是唯一的，这时候 j 的值就会等于 res 的长度，根据这个特点进行判断，将值添加进 res。看起来很简单吧，之所以要讲一讲这个方法，是因为——————兼容性好！
 * @param {*} arr
 */
function fn13(arr) {
	const result = [];
	const length = arr.length;
	for (let i = 0; i < length; i++) {
		const resLength = result.length;
		let j = 0;
		for (; j < resLength; j++) {
			if (arr[i] === result[j]) {
				break;
			}
		}
		if (j === result.length) {
			result.push(arr[i]);
		}
	}
	return result;
}
// console.log(fn13(arr));
