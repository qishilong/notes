// 树形结构数据
const treeData = [
  {
    id: 1,
    name: '节点1',
    children: [
      {
        id: 2,
        name: '节点1-1',
        children: [
          { id: 3, name: '节点1-1-1' },
          { id: 4, name: '节点1-1-2' }
        ]
      },
      {
        id: 5,
        name: '节点1-2'
      }
    ]
  },
  {
    id: 6,
    name: '节点2',
    children: [
      { id: 7, name: '节点2-1' },
      { id: 8, name: '节点2-2' }
    ]
  }
];

/**
 * 利用reduce遍历树形结构，保存新创建的数据结构，设置父节点ID
 * 利用arguments.callee方法，严格模式会报错，不推荐
 * @param {Array} treeData - 树形结构数据
 * @returns {Array} - 转换后的列表数据
 */
const treeToListReduce = treeData => {
  const result = treeData.reduce(function (acc, cur) {
    acc.push({
      id: cur.id,
      name: cur.name,
      parentId: cur.parentId
    });

    cur.children &&
      cur.children.forEach(child => {
        child.parentId = cur.id ? cur.id : null;
        arguments.callee(acc, child);
        delete child.parentId;
      });

    return acc;
  }, []);

  return result;
};

/**
 * 保存新创建的数据结构，dfs遍历树形结构，设置父节点ID
 * @param {Array} treeData - 树形结构数据
 * @returns {Array} - 转换后的列表数据
 */
const treeToListDfs = treeData => {
  const res = [];

  const dfs = (data, parentId = null) => {
    const newNode = {
      id: data.id,
      name: data.name,
      parentId // 添加父节点ID，如果没有父节点则为null，通过参数传递，避免直接修改原数据
    };

    res.push(newNode);

    if (data.children) {
      for (const item of data.children) {
        dfs(item, data.id); // 递归调用，传递当前节点ID作为子节点的父节点ID
      }
    }
  };

  for (const item of treeData) {
    dfs(item);
  }

  return res;
};

// const res = treeToListReduce(treeData);

const res = treeToListDfs(treeData);

console.log(res);
