const list = [
  { id: 1, name: '节点1', parentId: null },
  { id: 2, name: '节点1-1', parentId: 1 },
  { id: 3, name: '节点1-1-1', parentId: 2 },
  { id: 4, name: '节点1-1-2', parentId: 2 },
  { id: 5, name: '节点1-2', parentId: 1 },
  { id: 6, name: '节点2', parentId: null },
  { id: 7, name: '节点2-1', parentId: 6 },
  { id: 8, name: '节点2-2', parentId: 6 }
];

/**
 * 列表转树形结构（递归）
 * @param {Array<Object>} listData
 * @param {number|null} id
 * @param {Array<Object>} treeList
 * @returns {Array<Object>}
 */
const listToTreeRecursion = (listData, id, treeList) => {
  for (const item of listData) {
    if (item.parentId === id) {
      treeList.push(item);
    }
  }

  for (const item of treeList) {
    item.children = [];
    listToTree(listData, item.id, item.children);
    if (item.children.length === 0) {
      delete item.children;
    }
  }

  return treeList;
};

/**
 * 列表转树形结构（利用ForEach)
 * 时间复杂度：O(n^2)
 * @param {Array<Object>} listData
 * @returns {Array<Object>}
 */
const listToTreeForEach = listData => {
  const treeList = [];

  listData.forEach(item => {
    const children = listData.filter(i => item.id === i.parentId);

    if (children.length > 0) {
      item.children = children;
    }

    if (item.parentId === null) {
      treeList.push(item);
    }
  });

  return treeList;
};

/**
 * 列表转树形结构（利用hashMap)
 * 时间复杂度：O(n)
 * @param {Array<Object>} listData
 * @returns {Array<Object>}
 */
const listToTreeHashMap = listData => {
  const treeList = [];
  const hashMap = {};

  const length = listData.length;

  for (let i = 0; i < length; i++) {
    const id = listData[i].id;
    const parentId = listData[i].parentId;

    if (!hashMap[id]) {
      hashMap[id] = { children: [] };
    }

    hashMap[id] = { ...listData[i], children: hashMap[id].children };

    if (parentId === null) {
      treeList.push(hashMap[id]);
    } else {
      if (!hashMap[parentId]) {
        hashMap[parentId] = {
          children: []
        };
      }

      hashMap[parentId].children.push(hashMap[id]);
    }
  }

  return treeList;
};

const res = listToTreeHashMap(list);
console.dir(res, { depth: null });
