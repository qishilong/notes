# Unix 时间戳问题

## 时间戳显示成 1970年1月1日 08:00 问题

时不时看到某些软件有 Bug, 时间错误显示成1970年1月1日，更详细的显示成 1970年1月1日 08:00。这种 Bug 跟 Unix 的时间戳（Timestamp）有关。

在 1971 年，《Unix Programmer's Manua》出版，将格林威治时间（GMT）1971年1月1日0时0分0秒作为系统的起始时间。后来为方便记忆和计算，起始时间修改成 1970 年。现今的计算机系统，或多或少受 Unix 的影响，延续 Unix 的计时方式。从此之后 **（GMT）1970年1月1日0时0分0秒** 就成为 Unix 世界的起始时间，甚至超越 Unix 而成为整个计算机世界的起始时间。

Unix 中常常使用一个数字记录时间，表示距离起始时间相差的秒数（根据系统的精度，时间单位有时毫秒，有时是纳秒）。大于 0 表示在起始时间之后，小于 0 就表示在起始时间之前。这个数字有时是浮点类型、有时是整数类型，但都称这个数字为 Unix 时间戳（Timestamp）。

基本上，每个编程系统都会有具体时间跟 Timestamp 相互转换的接口。在 Swift 中，表示时间的类是 Date, 它就有下面接口。在这里，Timestamp 是 TimeInterval 类型（其实是 Double 类型），时间单位为秒。

```text
public init(timeIntervalSince1970: TimeInterval)
var timeIntervalSince1970: TimeInterval { get }
```

当计算机存储或者传输 Timestamp 出错，这个 Timestamp 就会取默认值。而在计算机中，默认值通常是 0。

**当 Timestamp 为 0，就表示时间（GMT）1970年1月1日0时0分0秒。中国使用北京时间，处于东 8 区，相应就是早上 8 点。因此在中国这边，时间出错了，就经常会显示成 1970年1月1日 08:00。**

\------------------------

题外话：

我设计数据表或者文件格式时，Timestamp 通常选择一个整数而不是浮点。整数在存储和判断大小时更方便些。根据情况 Timestamp 可以是 32 位或者 64 位，通常是 64 位，时间单位是毫秒。这个整数最好是有符号，不要使用无符号。以 64 位为例，使用 Int64, 而不要使用 UInt64。我之前就碰到过一个 Bug。[Bug 备忘：Swift 中两个 UInt64 数据相减引起崩溃](https://link.zhihu.com/?target=http%3A//hjcapple.github.io/2015/10/15/bug-swift-timestamp.html)。

从时间转成具体的年月日时分秒，需要考虑日历和时区。在中国使用农历和公历。公历使用耶稣的日子作为时间起点。公历是罗马教皇的格列高利十三世批准实行的，因此也叫格列高利历（gregorian）。另外还有佛历（buddhist），使用释迦牟尼死后的一年作为时间起点。另外有些国家为了节省能源，夏天白天长些，就采用夏令时，将时间提前一小时。而在日本，一星期的第一天是星期一，而不是公历的星期日。用五行日月表示日子，周一到周日分别为，月火水木金土日。而不是这边的顺序，金木水火土日月。

将时间转成具体年月日，看似简单，其中需要考虑很多细节。

幸好系统都帮我们封装好了。在 Swift 中，时间用 Date 表示，日历用 Calendar 表示，时区用 TimeZone 表示，具体日子用 DateComponents 表示。将 Date、TimeZone 传给 Calendar，就得到 DateComponents。另外也可以使用 DateFormatter，从 Date 得到格式化后的显示时间，这也需要设置 TimeZone 和 Calendar。很多时候，TimeZone 和 Calendar 已经默认设置好了，是本地化的一部分，有些人大概没有注意到。

## 解决方法

使用 `getUTCHours()` 等方法解决

```js
const date = new Date(0);
console.log(date.getHours()); // 8
console.log(date.getMinutes()); // 0
console.log(date.getSeconds()); // 0
console.log(date.getDay()); // 4
console.log(date.getDate()); // 1
console.log(date.getFullYear()); // 1970
console.log(date.getUTCFullYear()); // 1970
console.log(date.getUTCHours()); // 0
console.log(date.getUTCMinutes()); // 0
console.log(date.getUTCSeconds()); // 0
console.log(date.getUTCDay()); // 4
console.log(date.getUTCDate()); // 1
```

