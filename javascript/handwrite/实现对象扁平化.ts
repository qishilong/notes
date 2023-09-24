/**
 * 对象扁平化
 * 将多层嵌套的 key 合并
 * @param {object} target
 * @param {string} tempKey
 * @param {object} res
 * @returns {object}
 */
function flattenObject(target: Object, tempKey = '', res: any = {}) {
	// 使用 Object.entries() 将键值对转换成数组，确保 key 与 val 的对应关系
	for (const [key, val] of Object.entries(target)) {
		// 如果 val 是对象，保存合并后的 key 进行递归
		// console.log(key, val);
		if (isObject(val)) {
			const tmp = tempKey + key + '.';
			flattenObject(val, tmp, res);
		} else {
			// 当 val 不是对象，合并 key 并对结果对象赋值
			const tmp = tempKey + key;
			res[tmp] = val;
		}
	}
	return res;
}

/**
 * 判断 target 是否为对象
 * @param {*} target
 */
function isObject(target: any) {
	return Object.prototype.toString.call(target) === '[object Object]';
}

const object = {
	d: {
		e: {
			f: {
				g: {
					h: 1,
				},
			},
		},
		i: {
			j: {
				k: {
					l: 2,
				},
			},
		},
	},
};

console.log(flattenObject(object));
// {
//   d.e.f.g.h: 1
//   d.i.j.k.l: 2
// }
