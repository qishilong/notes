# Array.prototype.flat()

**`flat()`** 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

## 尝试一下

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/array-flat.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 755px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```js
flat()
flat(depth)
```

### 参数

- `depth` 可选

    指定要提取嵌套数组的结构深度，默认值为 1。

### 返回值

一个包含将数组与子数组中所有元素的新数组。

## 示例

### 扁平化嵌套数组

```js
var arr1 = [1, 2, [3, 4]];
arr1.flat();
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### 扁平化与数组空项

`flat()` 方法会移除数组中的空项：

```js
var arr4 = [1, 2, , 4, 5];
arr4.flat();
// [1, 2, 4, 5]
```

```js
const arr = [1, 2, 3, 4, , 5, 6, , , 7, , 7, 8, [1, 3, 4, 4, [, 1, 3, 4, 5, 5, 4, [3, 3, 5, 3, 4, [3, 4, 3, 4,]]]]];

console.log(arr.flat(Infinity));
// [1, 2, 3, 4, 5, 6, 7, 7, 8, 1, 3, 4, 4, 1, 3, 4, 5, 5, 4, 3, 3, 5, 3, 4, 3, 4, 3, 4]
```

