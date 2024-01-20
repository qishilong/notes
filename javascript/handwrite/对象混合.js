// 混合产生新的对象
function mixin(obj1, obj2) {
  // 方法一
  // const newObj = {};
  // for (const key in obj1) {
  //     newObj[key] = obj1[key];
  // }

  // for (const key in obj2) {
  //     if (!(key in obj1)) {
  //         newObj[key] = obj2[key];
  //     }
  // }
  // return newObj;

  // 方法二
  return Object.assign({}, obj1, obj2);
}
