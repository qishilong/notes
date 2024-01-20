// 查询id为10的节点，输出节点路径如[1, 3, 10]
const treeData = [
  {
    id: 1,
    name: "jj1",
    children: [
      { id: 2, name: "jj2", children: [{ id: 4, name: "jj4" }] },
      {
        id: 3,
        name: "jj3",
        children: [
          { id: 8, name: "jj8", children: [{ id: 5, name: "jj5" }] },
          { id: 9, name: "jj9", children: [] },
          { id: 10, name: "jj10", children: [] },
        ],
      },
    ],
  },
];

const findPath = (target, data) => {
  let result = [];
  const dfs = (path, data) => {
    if (!data.length) {
      return;
    }
    data.forEach((item) => {
      path.push(item.id);
      if (item.id === target) {
        result = JSON.parse(JSON.stringify(path));
      } else {
        const children = item.children || [];
        dfs(path, children);
        path.pop();
      }
    });
  };
  dfs([], data);
  return result;
};

const path = findPath(10, treeData);
console.log(path);
