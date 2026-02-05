# 位运算符>>操作符和Math.floor()方法的区别

**`>>` 位运算会将数值强制转换为 32 位有符号整数，而 `Math.floor` 使用的是 JavaScript 默认的双精度浮点数（64 位）。**

比如下面一段代码

```js
var myPow = function (x, n) {
  if (typeof x !== 'number' || typeof n !== 'number') {
    return;
  }

  if (x === 0) {
    return 0;
  }

  if (n === 0) {
    return 1;
  }

  /**
   * 分治求乘积
   * @param {number} x
   * @param {number} decomposeN
   * @returns
   */
  const decompose = (x, decomposeN) => {
    if (decomposeN === 0) {
      return 1;
    }

    const y = decompose(x, Math.floor(decomposeN / 2));

    return decomposeN % 2 === 0 ? y * y : y * y * x;
  };

  return n >= 0 ? decompose(x, n) : 1 / decompose(x, -n);
};
```

功能的是实现 `Math.pow(x,y)` 方法

在下面这个递归方法中

```js
const decompose = (x, decomposeN) => {
  if (decomposeN === 0) {
    return 1;
  }

  const y = decompose(x, Math.floor(decomposeN / 2));

  return decomposeN % 2 === 0 ? y * y : y * y * x;
};
```

如果 y 是使用 `Math.floor` 方法对 `decomposeN` 取半值，则不会有问题，如果通过位运算符`decompose(x, decomposeN >> 1)` 对`decomposeN` 取半值，则会导致递归栈溢出，代码错误，具体原因如下：

简单来说：**`>>` 位运算会将数值强制转换为 32 位有符号整数，而 `Math.floor` 使用的是 JavaScript 默认的双精度浮点数（64 位）。**

导致“无限递归”的具体原因如下：

### 1. 触发问题的临界值
定义 `n` 的取值范围是 $[-2^{31}, 2^{31}-1]$。
也就是 `n` 可以等于 `-2147483648`。

当 `n = -2147483648` 时，代码会执行 `1 / decompose(x, -n)`，此时传入 `decompose` 的参数是 `2147483648`。

### 2. 位运算的溢出 (The Overflow)
JavaScript 的位运算符（如 `>>`）在执行前，会隐式地调用 `ToInt32` 将操作数转换为 **32 位有符号整数**。
*   32 位有符号整数的最大值是 `2147483647` ($2^{31}-1$)。
*   传入的 `decomposeN` 是 `2147483648` ($2^{31}$)。
*   **出现问题**：`2147483648` 超出了 32 位有符号正数的范围。在二进制中它变成了 `1000...000` (1后跟31个0)。
*   当被强制看作“32位有符号整数”时，这一位被当成了符号位（负号）。所以 `2147483648` 在位运算眼中变成了 `-2147483648`。

### 3. 右移导致的死循环
接下来执行 `decomposeN >> 1`：
*   实际上是在计算 `-2147483648 >> 1`，结果是 `-1073741824`（仍然是负数）。
*   递归继续进行，数值一直是负数，且绝对值不断减半。
*   当数值最终变成 `-1` 时：
    *   `-1` 的二进制全是 1。
    *   `-1 >> 1`（带符号右移）补位补的是符号位 1，结果**仍然是 `-1`**。
*   于是，参数永远停留在 `-1`，递归永远无法使得 `decomposeN === 0`，导致**栈溢出（Maximum call stack size exceeded）**。

### 4. 为什么 Math.floor 没问题
*   `Math.floor(decomposeN / 2)` 是在标准的 JavaScript `Number` 类型（双精度浮点数）下进行的算术运算。
*   它能准确表示并计算 `2147483648 / 2 = 1073741824`，结果是正数，递归能正常收敛到 0。

### 总结
*   **`decomposeN >> 1`**：对于大于 $2^{31}-1$ 的数会发生溢出，变成负数，导致死循环。
*   **`Math.floor(decomposeN / 2)`**：安全，适用于所有 JavaScript 能表示的安全整数范围。
