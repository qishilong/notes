# 使用 new Array() 创建数组时的注意事项

## 初始化元素时的注意事项

### 下面两种初始化数组的方式有什么不同？

1. `new Array(length).fill(new Array(length).fill("."));`
2. `new Array(length).fill(0).map(_ => new Array(length).fill('.'));`

#### 解答

在JavaScript中，下面两种初始化数组的方式有显著不同：

```javascript
// 第一种
new Array(n).fill(new Array(n).fill("."));

// 第二种
new Array(n).fill(0).map(_ => new Array(n).fill('.'));
```

##### 第一种方式

```javascript
new Array(n).fill(new Array(n).fill("."));
```

- `new Array(n)` 创建一个长度为 `n` 的数组，其元素初始为 `undefined`。
- `.fill(new Array(n).fill("."))` 用一个内部数组 `new Array(n).fill(".")` 来填充这个外部数组的每一个元素。

**结果**：所有的内部数组实际上都是引用同一个数组对象。这意味着修改任何一个内部数组中的元素会影响到所有的内部数组，因为它们实际上是同一个数组的引用。

**示例**：

```javascript
let arr1 = new Array(n).fill(new Array(n).fill("."));
arr1[0][0] = "X";
console.log(arr1); // 你会发现所有的内部数组的第一个元素都变成了 "X"
```

##### 第二种方式

```javascript
new Array(n).fill(0).map(_ => new Array(n).fill('.'));
```

- `new Array(n)` 创建一个长度为 `n` 的数组，其元素初始为 `undefined`。
- `.fill(0)` 将所有元素都设置为 `0`，这一步其实只是为了确保数组每个元素都被填充了一个初始值（可以是任意值），以便 `map` 方法可以遍历。
- `.map(_ => new Array(n).fill('.'))` 使用 `map` 方法遍历数组，为每一个元素创建一个新的内部数组 `new Array(n).fill('.')`。

**结果**：每个内部数组都是独立的新数组对象。这意味着修改一个内部数组不会影响其他内部数组。

**示例**：

```javascript
let arr2 = new Array(n).fill(0).map(_ => new Array(n).fill('.'));
arr2[0][0] = "X";
console.log(arr2); // 只有 arr2[0][0] 被修改，其他内部数组不受影响
```

##### 总结

- **第一种方式**：所有内部数组都是同一个数组的引用，修改一个会影响全部。
- **第二种方式**：每个内部数组都是独立的，修改一个不会影响其他。

在大多数情况下，使用第二种方式来初始化二维数组，以避免意外的共享引用带来的副作用。