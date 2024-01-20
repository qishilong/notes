/**
 * 解题思路：
 * 1. 先构建 map 结构，以各个子项的 id 为键
 * 2. 再循环目标结果，判断上面构建的 map 对象中，是否存在当前遍历的 pid
 * 3. 存在就可以进行 children 的插入
 * 4. 不存在说明就是顶级节点，直接 push 即可
 */

let arr = [
  {
    id: 1,
    pid: 0,
    name: "body",
  },
  {
    id: 2,
    pid: 0,
    name: "title",
  },
  {
    id: 3,
    pid: 1,
    name: "div",
  },
];

/**
 * 非递归解法
 * @param {*} data
 */
// const toTree = (data) => {
// 	const result = [];
// 	const map = {};
// 	data.forEach((item) => {
// 		// 1. 先构建 map 结构，以 id 为键
// 		map[item.id] = item;
// 	});
// 	data.forEach((item) => {
// 		// 2. 在遍历对象结构，判断上面构建的 map 中，是否存在当前遍历的 pid
// 		const parent = map[item.pid];
// 		if (parent) {
// 			// 3. 存在就进行 children 的插入
// 			(parent.children || (parent.children = [])).push(item);
// 		} else {
// 			// 4. 不存在就是顶级节点，直接 push 即可
// 			result.push(item);
// 		}
// 	});
// 	return result;
// };

/**
 * 递归的解法
 * @param {*} date
 */
const toTree = (data) => {
  const roots = [];
  for (let item of data) {
    if (item.pid === 0) {
      item.children = [];
      roots.push(item);
    } else {
      const parent = findParent(item, roots);
      if (parent) {
        item.children = [];
        parent.children.push(item);
      }
    }
  }
  return roots;
};
function findParent(item, roots) {
  for (let root of roots) {
    if (root.id === item.pid) {
      return root;
    }
    const parent = findParent(item, root.children);
    if (parent) {
      return parent;
    }
  }
}

const result = toTree(arr);
console.log(result);
