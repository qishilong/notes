// const myCurrying = (fn, ...args) => {
// 	if (args.length >= fn.length) {
// 		return fn(...args);
// 	} else {
// 		return (...args2) => myCurrying(fn, ...args, ...args2);
// 	}
// };

function myCurrying(fn, ...args) {
	if (fn.length === args.length) {
		return fn(...args);
	} else {
		return (...args1) => myCurrying(fn, ...args, ...args1);
	}
}

const add = (x, y, z) => {
	return x + y + z;
};

const curFn = myCurrying(add, 1);
console.log(curFn(1, 2));
console.log(curFn(2, 3));

const addCurry = myCurrying(add);
const sum1 = addCurry(1, 2, 3);
const cur1 = addCurry(1);
const cur2 = cur1(2, 3);
const sum2 = addCurry(1)(2)(3);

console.log(sum1, 'sum1');
console.log(cur2, 'sum2');

/**
 * 函数科里化
 * 科里化最重要的作用是把多参函数变为单参函数
 */
// function curry(func) {
// 	// 当前调用的参数
// 	var args = Array.prototype.slice.call(arguments, 1);
// 	// 保存 this
// 	var that = this;
// 	return function () {
// 		// 当前调用的参数
// 		var currentArgs = Array.from(arguments);
// 		// 总参数
// 		var totalArgs = args.concat(currentArgs);
// 		if (totalArgs.length >= func.length) {
// 			// 参数数量够了
// 			return func.apply(null, totalArgs);
// 		} else {
// 			// 当前参数数量仍然不够
// 			totalArgs.unshift(func);
// 			return that.current.apply(that, totalArgs);
// 		}
// 	};
// }

// function add(x, y, z) {
// 	return x + y + z;
// }
// const curFn = curry(add, 1);
// console.log(curFn(1, 2));
// console.log(curFn(2, 3));
