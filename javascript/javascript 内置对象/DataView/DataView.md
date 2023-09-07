# DataView

**`DataView`** 视图是一个可以从二进制 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 对象中读写多种数值类型的底层接口，使用它时，不用考虑不同平台的[字节序（endianness）](https://developer.mozilla.org/zh-CN/docs/Glossary/Endianness)问题。

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#描述)

### [字节序](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#字节序)

多字节的数字格式在内存中的表示方式因机器架构而异——相关的解释请参阅[字节序](https://developer.mozilla.org/zh-CN/docs/Glossary/Endianness)。`DataView` 访问器（accessor）提供了对如何访问数据的明确控制，而不管执行代码的计算机的字节序如何。

```js
const littleEndian = (() => {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true /* 小端对齐 */);
  // Int16Array 使用平台的字节序。
  return new Int16Array(buffer)[0] === 256;
})();
console.log(littleEndian); // true 或 false
```

### [64 位整数值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#64_位整数值)

某些浏览器不支持 [`DataView.prototype.setBigInt64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setBigInt64) 和 [`DataView.prototype.setBigUint64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setBigUint64)。因此，要在代码中启用跨浏览器的 64 位操作，你可以实现自己的 `getUint64()` 函数，以获得精度达到 [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) 的值——这对于某些情况足够使用。

```js
function getUint64(dataview, byteOffset, littleEndian) {
  // 将 64 位的数字拆分位两个 32 位（4 字节）的部分
  const left =  dataview.getUint32(byteOffset, littleEndian);
  const right = dataview.getUint32(byteOffset+4, littleEndian);

  // 将两个 32 位的值组合在一起
  const combined = littleEndian? left + 2**32*right : 2**32*left + right;

  if (!Number.isSafeInteger(combined))
    console.warn(combined, '超过 MAX_SAFE_INTEGER。可能存在精度丢失。');

  return combined;
}
```

或者，如果你需要完整的 64 位的范围，你可以创建 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。此外，尽管原生 BigInt 比等效的用户态的库快得多，但由于其大小可变的性质，BigInt 始终比 JavaScript 中的 32 位整数要慢得多。

```js
const BigInt = window.BigInt, bigThirtyTwo = BigInt(32), bigZero = BigInt(0);
function getUint64BigInt(dataview, byteOffset, littleEndian) {
  // 将 64 位的数字拆分位两个 32 位（4 字节）的部分
  const left = BigInt(dataview.getUint32(byteOffset|0, !!littleEndian)>>>0);
  const right = BigInt(dataview.getUint32((byteOffset|0) + 4|0, !!littleEndian)>>>0);

  // 将两个 32 位的值组合在一起并返回该值
  return littleEndian ? (right<<bigThirtyTwo)|left : (left<<bigThirtyTwo)|right;
}
```

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#构造函数)

-   [`DataView()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/DataView)

    创建一个新的 `DataView` 对象。

## [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#实例属性)

-   `DataView.prototype[@@toStringTag]`

    [`@@toStringTag`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) 属性的初始值为字符串 `"DataView"`。该属性用于 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)。

-   [`DataView.prototype.buffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/buffer)

    [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 是引用该缓冲区的视图。在构造时会被固定，因此该属性**只读**。

-   [`DataView.prototype.byteLength`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteLength)

    视图的长度（以字节为单位）。在构造时会被固定，因此该属性**只读**。

-   [`DataView.prototype.byteOffset`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteOffset)

    至 [`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 的视图开始位置的字节偏移量。在构造时会被固定，因此该属性**只读**。

## [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#实例方法)

-   [`DataView.prototype.getInt8()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt8)

    从视图开始的指定字节偏移处获取一个带符号 8 位整数（byte）。

-   [`DataView.prototype.getUint8()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint8)

    从视图开始的指定字节偏移处获取一个无符号 8 位整数（unsigned byte）。

-   [`DataView.prototype.getInt16()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt16)

    从视图开始的指定字节偏移处获取一个带符号 16 位整数（short）。

-   [`DataView.prototype.getUint16()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint16)

    从视图开始的指定字节偏移处获取一个无符号 16 位整数（unsigned short）。

-   [`DataView.prototype.getInt32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt32)

    从视图开始的指定字节偏移处获取一个带符号 32 位整数（long）。

-   [`DataView.prototype.getUint32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint32)

    从视图开始的指定字节偏移处获取一个无符号 32 位整数（unsigned long）。

-   [`DataView.prototype.getFloat32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat32)

    从视图开始的指定字节偏移处获取一个带符号 32 位浮点数（float）。

-   [`DataView.prototype.getFloat64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat64)

    从视图开始的指定字节偏移处获取一个带符号 64 位浮点数（double）。

-   [`DataView.prototype.getBigInt64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getBigInt64)

    从视图开始的指定字节偏移处获取一个带符号 64 位整数（long long）。

-   [`DataView.prototype.getBigUint64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/getBigUint64)

    从视图开始的指定字节偏移处获取一个无符号 64 位整数（unsigned long long）。

-   [`DataView.prototype.setInt8()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt8)

    在视图开始的指定字节偏移处存储一个带符号 8 位整数（byte）。

-   [`DataView.prototype.setUint8()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint8)

    在视图开始的指定字节偏移处存储一个无符号 8 位整数（unsigned byte）。

-   [`DataView.prototype.setInt16()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt16)

    在视图开始的指定字节偏移处存储一个带符号 16 位整数（short）。

-   [`DataView.prototype.setUint16()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint16)

    在视图开始的指定字节偏移处存储一个无符号 16 位整数（unsigned short）。

-   [`DataView.prototype.setInt32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt32)

    在视图开始的指定字节偏移处存储一个带符号 32 位整数（long）。

-   [`DataView.prototype.setUint32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint32)

    在视图开始的指定字节偏移处存储一个无符号 32 位整数（unsigned long）。

-   [`DataView.prototype.setFloat32()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat32)

    在视图开始的指定字节偏移处存储一个带符号 32 位浮点数（float）。

-   [`DataView.prototype.setFloat64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat64)

    在视图开始的指定字节偏移处存储一个带符号 64 位浮点数（double）。

-   [`DataView.prototype.setBigInt64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setBigInt64)

    在视图开始的指定字节偏移处存储一个带符号 64 位 BigInt（long long）。

-   [`DataView.prototype.setBigUint64()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView/setBigUint64)

    在视图开始的指定字节偏移处存储一个无符号 64 位 BigInt（unsigned long long）。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#示例)

### [使用 DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView#使用_dataview)

```js
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer, 0);

view.setInt16(1, 42);
view.getInt16(1); // 42
```