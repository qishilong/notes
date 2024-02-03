// 创建一个函数用于递归地将对象转换为响应式对象
const reactive = (obj) => {
  return new Proxy(obj, {
    get(target, key, receiver) {
      const val = Reflect.get(target, key);
      // 递归的将嵌套对象转为响应式
      if (val !== "null" && typeof val === "object") {
        return reactive(val);
      }
      return val;
    },
    set(target, key, newValue, receiver) {
      const result = Reflect.set(target, key, newValue);
      // console.log(`Set ${key} to ${newValue}`);
      return result;
    },
  });
};

// 创建一个 computed 函数，接受一个包含计算属性的对象和一个计算属性的 getter 函数
const computed = (fn) => {
  let value = fn();
  const proxy = new Proxy(
    { value },
    {
      // 如果对象中存在该属性，则直接返回属性值
      get(target, key, receiver) {
        // console.log(target, key, "computed");
        return Reflect.get(target, key, receiver);
      },
      set(target, key, newValue, receiver) {
        Reflect.set(target, key, newValue);
        upload();
        return true;
      },
    },
  );
  const upload = () => {
    value = fn();
    proxy.value = value;
  };
  return proxy;
};
// 测试
const node = reactive({
  leftChildren: 1,
  // rightChildren: 0
});
console.log(node.leftChildren, node.rightChildren); // 1 undefined
const children = computed(() => node.leftChildren + (parseInt(node.rightChildren) || 0));
console.log(children.value); // 1
node.leftChildren = 10;
console.log(children.value); // 10
node.rightChildren = 2;
console.log(children.value); // 12
