# Date

创建一个 JavaScript `Date` 实例，该实例呈现时间中的某个时刻。`Date` 对象则基于 [Unix Time Stamp](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_16)，即自 1970 年 1 月 1 日（UTC）起经过的毫秒数。

## [尝试一下](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#尝试一下)

<iframe class="interactive is-js-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/js/date-constructor.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: 0px; max-width: 100%; width: 755px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 444px; margin: 1rem 0px; padding: 0px;"></iframe>

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#语法)

```js
new Date();
new Date(value);
new Date(dateString);
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

**备注：** 创建一个新`Date`对象的唯一方法是通过[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符，例如：`let now = new Date();` 若将它作为常规函数调用（即不加 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符），将返回一个字符串，而非 `Date` 对象。

### [参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#参数)

`Date()`构造函数有四种基本形式

#### 没有参数

如果没有提供参数，那么新创建的 Date 对象表示实例化时刻的日期和时间。

#### Unix 时间戳

- `value`

    一个 Unix 时间戳（[Unix Time Stamp](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_16)），它是一个整数值，表示自 1970 年 1 月 1 日 00:00:00 UTC（the Unix epoch）以来的毫秒数，忽略了闰秒。请注意大多数 Unix 时间戳功能仅精确到最接近的秒。

- 时间戳字符串 `dateString`

    表示日期的字符串值。该字符串应该能被 [`Date.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) 正确方法识别（即符合 [IETF-compliant RFC 2822 timestamps](https://tools.ietf.org/html/rfc2822#page-14) 或 [version of ISO8601](https://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15)）。**备注：** 由于浏览器之间的差异与不一致性，强烈不推荐使用`Date`构造函数来解析日期字符串 (或使用与其等价的`Date.parse`)。对 RFC 2822 格式的日期仅有约定俗成的支持。对 ISO 8601 格式的支持中，仅有日期的串 (例如 "1970-01-01") 会被处理为 UTC 而不是本地时间，与其他格式的串的处理不同。

#### 分别提供日期与时间的每一个成员

当至少提供了年份与月份时，这一形式的 `Date()` 返回的 `Date` 对象中的每一个成员都来自下列参数。没有提供的成员将使用最小可能值（对日期为`1`，其他为`0`）。

- `year`

    表示年份的整数值。0 到 99 会被映射至 1900 年至 1999 年，其他值代表实际年份。参见 [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#例子：将两位数年份映射为_1900_-_1999_年)。

- `monthIndex`

    表示月份的整数值，从 0（1 月）到 11（12 月）。

- date可选

    表示一个月中的第几天的整数值，从 1 开始。默认值为 1。

- `hours` 可选

    表示一天中的小时数的整数值 (24 小时制)。默认值为 0（午夜）。

- `minutes` 可选

    表示一个完整时间（如 01:10:00）中的分钟部分的整数值。默认值为 0。

- `seconds` 可选

    表示一个完整时间（如 01:10:00）中的秒部分的整数值。默认值为 0。

- `milliseconds` 可选

    表示一个完整时间的毫秒部分的整数值。默认值为 0。

## [使用注释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#使用注释)

**备注：** 参数`monthIndex` 是从“0”开始计算的，这就意味着一月份为“0”，十二月份为“11”。

**备注：** 当 Date 作为构造函数调用并传入多个参数时，如果数值大于合理范围时（如月份为 13 或者分钟数为 70），相邻的数值会被调整。比如 new Date(2013, 13, 1) 等于 new Date(2014, 1, 1)，它们都表示日期 2014-02-01（注意月份是从 0 开始的）。其他数值也是类似，new Date(2013, 2, 1, 0, 70) 等于 new Date(2013, 2, 1, 1, 10)，都表示同一个时间：`2013-03-01T01:10:00`。

**备注：** 当 Date 作为构造函数调用并传入多个参数时，所定义参数代表的是当地时间。如果需要使用世界协调时 UTC，使用 `new Date(Date.UTC(...))` 和相同参数。

## [简介](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#简介)

- 如果没有输入任何参数，则 Date 的构造器会依据系统设置的当前时间来创建一个 Date 对象。
- 如果提供了至少两个参数，其余的参数均会默认设置为 1（如果没有指定 day 参数）或者 0（如果没有指定 day 以外的参数）。
- JavaScript 的时间由世界标准时间（UTC）1970 年 1 月 1 日开始，用毫秒计时，一天由 86,400,000 毫秒组成。`Date` 对象的范围是 -100,000,000 天至 100,000,000 天（等效的毫秒值）。
- `Date` 对象为跨平台提供了统一的行为。时间属性可以在不同的系统中表示相同的时刻，而如果使用了本地时间对象，则反映当地的时间。
- `Date` 对象支持多个处理 UTC 时间的方法，也相应地提供了应对当地时间的方法。UTC，也就是我们所说的格林威治时间，指的是 time 中的世界时间标准。而当地时间则是指执行 JavaScript 的客户端电脑所设置的时间。
- 以一个函数的形式来调用 `Date` 对象（即不使用 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符）会返回一个代表当前日期和时间的字符串。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#属性)

- [`Date.prototype` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

    允许为 `Date` 对象添加属性。

- `Date.length`

    `Date.length` 的值是 7。这是该构造函数可接受的参数个数。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#方法)

- [`Date.now()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now)

    返回自 1970-1-1 00:00:00 UTC（世界标准时间）至今所经过的毫秒数。

- [`Date.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)

    解析一个表示日期的字符串，并返回从 1970-1-1 00:00:00 所经过的毫秒数。**备注：** 由于浏览器差异和不一致，强烈建议不要使用`Date.parse`解析字符串。

- [`Date.UTC()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC)

    接受和构造函数最长形式的参数相同的参数（从 2 到 7），并返回从 1970-01-01 00:00:00 UTC 开始所经过的毫秒数。

## [JavaScript `Date` 实例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#javascript_date_实例)

所有的 `Date` 实例都继承自 [`Date.prototype` (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)。修改 `Date` 构造函数的原型对象会影响到所有的 `Date` 实例。

### [实例属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#实例属性)

- `Date.prototype.constructor`

    返回创建了实例的构造函数，默认是 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 构造函数。

### [实例方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#实例方法)

- [`Date.prototype.getDate()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象为一个月中的哪一日（`1`-`31`）。

- [`Date.prototype.getDay()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象是在一周中的第几天（`0`-`6`），0 表示星期天。

- [`Date.prototype.getFullYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的完整年份（四位数年份）。

- [`Date.prototype.getHours()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的小时（`0`–`23`）。

- [`Date.prototype.getMilliseconds()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的毫秒数（`0`–`999`）。

- [`Date.prototype.getMinutes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的分钟数（`0`–`59`）。

- [`Date.prototype.getMonth()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的月份（`0`–`11`），0 表示一年中的第一月。

- [`Date.prototype.getSeconds()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的秒数（`0`–`59`）。

- [`Date.prototype.getTime()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)

    返回一个数值，表示从 1970 年 1 月 1 日 0 时 0 分 0 秒（UTC，即协调世界时）距离该 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象所代表时间的毫秒数。（更早的时间会用负数表示）

- [`Date.prototype.getTimezoneOffset()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)

    返回协调世界时（UTC）相对于当前时区的时间差值，单位为分钟。

- [`Date.prototype.getUTCDate()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDate)

    以协调世界时为标准，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象为一个月中的哪一日（`1`-`31`）。

- [`Date.prototype.getUTCDay()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay)

    以协调世界时为标准，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象是在一周中的第几天（`0`-`6`），0 表示星期天。

- [`Date.prototype.getUTCFullYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCFullYear)

    以协调世界时为标准，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的完整年份（四位数年份）。

- [`Date.prototype.getUTCHours()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCHours)

    以协调世界时为标准，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的小时（`0`–`23`）。

- [`Date.prototype.getUTCMilliseconds()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds)

    以协调世界时为标准，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的毫秒数（`0`–`999`）。

- [`Date.prototype.getUTCMinutes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMinutes)

    以协调世界时为标准，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的分钟数（`0`–`59`）。

- [`Date.prototype.getUTCMonth()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth)

    以协调世界时为标准，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的月份（`0`–`11`），0 表示一年中的第一月。

- [`Date.prototype.getUTCSeconds()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCSeconds)

    以协调世界时为标准，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的秒数（`0`–`59`）。

- [`Date.prototype.getYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getYear)

    根据本地时间，返回一个指定的 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的相对年份（相对 1900 年，通常是 2 到 3 位数字）。请改用 [`getFullYear`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) 。

- [`Date.prototype.setDate()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)

    根据本地时间，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象在所属月份中的天数。

- [`Date.prototype.setFullYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear)

    根据本地时间，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的完整年份（四位数年份）。

- [`Date.prototype.setHours()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours)

    根据本地时间，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的小时数。

- [`Date.prototype.setMilliseconds()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds)

    根据本地时间，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的豪秒数。

- [`Date.prototype.setMinutes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)

    根据本地时间，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的分钟数。

- [`Date.prototype.setMonth()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)

    根据本地时间，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的月份。

- [`Date.prototype.setSeconds()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds)

    根据本地时间，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的秒数。

- [`Date.prototype.setTime()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime)

    用一个从 1970-1-1 00:00:00 UTC 计时的毫秒数来为一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象设置时间。用负数来设置更早的时间。

- [`Date.prototype.setUTCDate()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCDate)

    以协调世界时为标准，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象在所属月份中的天数。

- [`Date.prototype.setUTCFullYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCFullYear)

    以协调世界时为标准，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的完整年份（四位数年份）。

- [`Date.prototype.setUTCHours()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCHours)

    以协调世界时为标准，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的小时数。

- [`Date.prototype.setUTCMilliseconds()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMilliseconds)

    以协调世界时为标准，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的豪秒数。

- [`Date.prototype.setUTCMinutes()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMinutes)

    以协调世界时为标准，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的分钟数。

- [`Date.prototype.setUTCMonth()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCMonth)

    以协调世界时为标准，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的月份。

- [`Date.prototype.setUTCSeconds()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setUTCSeconds)

    以协调世界时为标准，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的秒数。

- [`Date.prototype.setYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setYear)

    根据本地时间，设置一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的相对年份（相对 1900 年，通常是 2 到 3 位数字）。请改用 [`setFullYear`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear) 。

- [`Date.prototype.toDateString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toDateString)

    以美式英语和人类易读的表述形式返回一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象日期部分的字符串。

- [`Date.prototype.toISOString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)

    将指定 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象转换成 ISO 格式表述的字符串并返回。

- [`Date.prototype.toJSON()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON)

    返回指定 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象调用 [`toISOString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) 方法的返回值。在 [`JSON.stringify()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) 中使用。

- [`Date.prototype.toLocaleDateString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)

    返回一个表述指定 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的日期部分字符串。该字符串格式因不同语言而不同。

- [`Date.prototype.toLocaleString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)

    返回一个表述指定 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的字符串。该字符串格式因不同语言而不同。

- [`Date.prototype.toLocaleTimeString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString)

    返回一个表述指定 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象时间部分的的字符串。该字符串格式因不同语言而不同。

- [`Date.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toString)

    返回一个字符串，表示该 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象。覆盖了 [`Object.prototype.toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法。

- [`Date.prototype.toTimeString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toTimeString)

    以人类易读形式返回一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象时间部分的字符串，该字符串以美式英语格式化。

- [`Date.prototype.toUTCString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString)

    使用 UTC 时区，把一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象转换为一个字符串。

- [`Date.prototype.valueOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf)

    返回一个 [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) 对象的原始值。覆盖了 [`Object.prototype.valueOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf) 方法。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#示例)

### [创建一个日期对象的几种方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#创建一个日期对象的几种方法)

下例展示了用来创建一个日期对象的多种方法。

**备注：** 由于浏览器差异和不一致性，强烈建议不要使用`Date`构造函数（和`Date.parse`，它们是等效的）解析日期字符串。

```js
var today = new Date();
var birthday = new Date('December 17, 1995 03:24:00');
var birthday = new Date('1995-12-17T03:24:00');
var birthday = new Date(1995, 11, 17);
var birthday = new Date(1995, 11, 17, 3, 24, 0);
```

### [将两位数年份映射为 1900 - 1999 年](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#将两位数年份映射为_1900_-_1999_年)

为了创建和获取 0 到 99 之间的年份，应使用 [`Date.prototype.setFullYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/setFullYear) 和 [`Date.prototype.getFullYear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear) 方法。

```js
var date = new Date(98, 1); // Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)

// 已弃用的方法，同样将 98 映射为 1998
date.setYear(98);           // Sun Feb 01 1998 00:00:00 GMT+0000 (GMT)

date.setFullYear(98);       // Sat Feb 01 0098 00:00:00 GMT+0000 (BST)
```

### [计算经过的时间](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#计算经过的时间)

下例展示了如何以毫秒精度计算两个日期对象的时间差：

由于不同日期、月份、年份长度的不同（日期长度不同来自夏令时的切换），使用大于秒、分钟、小时的单位表示经过的时间会遇到很多问题，在使用前需要经过详尽的调研。

```js
// 使用 Date 对象
var start = Date.now();

// 调用一个消耗一定时间的方法：
doSomethingForALongTime();
var end = Date.now();
var elapsed = end - start; // 以毫秒计的运行时长
```

```js
// 使用内建的创建方法
var start = new Date();

// 调用一个消耗一定时间的方法：
doSomethingForALongTime();
var end = new Date();
var elapsed = end.getTime() - start.getTime(); // 运行时间的毫秒值
```

```js
// to test a function and get back its return
function printElapsedTime (fTest) {
    var nStartTime = Date.now(),
        vReturn = fTest(),
        nEndTime = Date.now();
    alert("Elapsed time: " + String(nEndTime - nStartTime) + " milliseconds");
    return vReturn;
}
yourFunctionReturn = printElapsedTime(yourFunction);
```

**备注：** 在支持 [`Web Performance API`](https://developer.mozilla.org/zh-CN/docs/Web/API/performance_property) 的高精细度（high-resolution）时间功能的浏览器中，[`Performance.now()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/now) 提供的所经过的时间比 [`Date.now()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now) 更加可靠、精确。

### [获取自 Unix 起始时间以来经过的秒数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date#获取自_unix_起始时间以来经过的秒数)

```js
var seconds = Math.floor(Date.now() / 1000);
```

注意此处需要返回一个整数（仅做除法得到的不是整数），并且需要返回实际已经经过的秒数（所以这里使用了[`Math.floor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)而不是[`Math.round()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round)).