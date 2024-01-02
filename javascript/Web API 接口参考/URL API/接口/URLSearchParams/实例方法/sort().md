# URLSearchParams.sort()

**`URLSearchParams.sort()`** 方法对包含在此对象中的所有键/值对进行排序，并返回 undefined。排序顺序是根据键的 Unicode 代码点。该方法使用稳定的排序算法 (即，将保留具有相等键的键/值对之间的相对顺序)。

## 语法

```js
searchParams.sort();
```

### 返回值

`undefined`

## 示例

```js
// Create a test URLSearchParams object
var searchParams = new URLSearchParams("c=4&a=2&b=3&a=1");

// Sort the key/value pairs
searchParams.sort();

// Display the sorted query string
console.log(searchParams.toString());
```

输出结果

```
a=2&a=1&b=3&c=4
```