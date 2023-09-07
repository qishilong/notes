## [JS reduce()方法详解，使用reduce数组去重](https://www.cnblogs.com/echolun/p/11929564.html)

 **壹 ❀ 引**

稍微有了解JavaScript数组API的同学，对于reduce方法至少有过一面之缘，也许是for与forEach太强大，或者filter，find很实用，在实际开发中我至始至终没使用过reduce方法一次。很巧的是今天再刷面试题的过程中，遇到了一题关于数组操作的的题，相关解析中有人使用到了reduce方法，好吧我承认我看着有点茫然，因为我从未正眼过它，那么今天就给彼此一首歌的时间，让我们好好了解你，关于reduce本文开始。

 **贰 ❀ 关于reduce**

一个完整的reduce方法应该是这样：

```
array.reduce(function(accumulator, currentValue, currentIndex, array), initialValue)
```

它由一个回调函数与一个初始值组成，其中回调函数接受四个参数，我们先解释回调函数形参与initialValue的含义：

**1.initialValue [ɪˈnɪʃl]  [ˈvæljuː] 初始值**

initialValue 表示reduce方法第一次执行时的初始值，是一个可选值。

**2.accumulator [əˈkjuːmjəleɪtər] 累加器；积聚者**

accumulator 正如翻译的那样，它是 reduce 方法多次执行的累积结果，accumulator 的初始值分两种情况：

若有提供 initialValue 初始值，第一次循环时 accumulator 的值便为 initialValue，后续循环时 accumulator 为上次循环的返回值。

若未提供initialValue，第一次循环时 accumulator 的值为数组第一项arr[0]，后续循环时为上次循环的返回值。

**3.currentValue [ˈkɜːrənt] [ˈvæljuː] 当前值**

这个应该不难理解，数组循环当前处理的值。currentValue 的初始值也受到initialValue的影响：

若有提供 initialValue 初始值，第一次循环currentValue 的值为数组第一项arr[0]，后续变化随索引递增变化。

若未提供initialValue，第一次循环由于arr[0]成了accumulator 的值，所以currentValue 只能从arr[1]开始，后续变化随索引递增。

**4.currentIndex**

数组循环当前处理值的索引，currentValue 与 currentIndex是同步变化的。

**5.array**

当前正在被循环的数组。

说的有点糊涂？没关系，我们通过例子循序渐进的来理解，加深这几个参数的印象。先看第一个例子：

```
let arr = ['e', 'l', 'l', 'o'];
arr.reduce((accumulator, currentValue, currentIndex, array) => {
    console.log(accumulator, currentValue, currentIndex, array);
});
```

![img](https://qiniucloud.qishilong.space/images/202307261541033.png)

我们直接打印出四个参数，咦？为什么 accumulator第一次循环是e，后续循环怎么都是undefined了？

前面说了，由于reduce方法没有提供初始值，所以第一次循环数组的第一项作为了reduce方法的初始值，后续循环中由于没 return操作，导致accumulator拿不到上次返回值，所以就是undefined了。

我们在console后面加上return操作，再看：

```
return accumulator+currentValue;
```

![img](https://qiniucloud.qishilong.space/images/202307261541127.png)

这不就有值了吗，所以使用reduce方法得记住，由于reduce是一个对数组累积操作的方法，在使用中一定得记得加return返回你希望累积操作的数据。

那也不对啊，我数组明明有四项，照输出来看reduce方法怎么只执行了三次？

这是因为我们没提供初始值 initialValue ，导致reduce方法将数组的第一项作为了初始值，所以循环第一次是从数组第二项开始的，我们尝试给reduce添加一个默认值：

```
let arr = ['e', 'l', 'l', 'o'];
arr.reduce((accumulator, currentValue, currentIndex, array) => {
    console.log(accumulator, currentValue, currentIndex, array);
    return accumulator+currentValue;
},'h');
```

![img](https://qiniucloud.qishilong.space/images/202307261541115.png)

可以看到有了默认值，数组第一次循环是从索引 0 开始，完完整整的执行了四次。

也不对啊，accumulator不是循环的累加值吗，执行完毕了怎么显示的是 hell，o怎么没加进去？这不是因为我console写在了return前面了么（我故意的），执行完最后一次跳出循环，reduce方法会返回最终的执行结果，我们用一个变量来保存试试，像这样：

```
let arr = ['e', 'l', 'l', 'o'];
let result = arr.reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator+currentValue;
},'h');
console.log(result);//hello
```

看，这不就是一个完整的单词 hello了；

其实对于reduce让人疑惑的无非就是initialValue与accumulator，currentValue的关系，这里我们做个小总结：

如果reduce有提供初始值，则循环从索引0开始，此时accumulator就是initialValue，currentValue值就是arr[0]；如果reduce未提供初始值，则arr[0]作为初始值赋予给accumulator，循环从索引1开始，currentValue值就是arr[1]了；

 **叁 ❀ reduce作用**

那么到这里我们详细介绍了reduce方法的参数与执行规则，了解了这些，我们可以用reduce方法做些什么呢？

**1.数组求和**

reduce方法本意就是用来记录循环的累积结果，用于数组求和是最合适不过了。比如我们要求数组 [1,2,3,4] 的元素之和，用forEach你得这样写：

```
let total = 0;
[1, 2, 3, 4].forEach(item => total += item);
console.log(total); //10
```

但通过reduce方法就简单的多，我们可以这么写：

```
let total = [1, 2, 3, 4].reduce((accumulator, current) => accumulator += current); // 10
```

假设我们希望求数字90与数组 [ 1,2,3,4] 元素的和呢，那就这么写：

```
let total = [1, 2, 3, 4].reduce((accumulator, current) => accumulator += current, 90); // 100
```

**2.数组去重**

比如我们要将数组 [1,2,2,4,null,null] 去除掉重复项，用filter可以这样做：

```
let arr = [1, 2, 2, 4, null, null].filter((item, index, arr) => arr.indexOf(item) === index); // [1,2,4,null]
```

当然单说实现使用 new Set 更简单：

```
let arr = [...new Set([1, 2, 2, 4, null, null])]; // [1,2,4,null]
```

现在我们知道了reduce方法，其实也可以通过reduce去重，像这样：

```
let arr = [1, 2, 2, 4, null, null].reduce((accumulator, current) => {
    return accumulator.includes(current) ? accumulator : accumulator.concat(current);
}, []);
```

**3.数组降维**

比如我们要将二维数组 [[1,2],[3,4],[5,6]] 降维成一维数组，最简单的做法是通过flat方法，像这样：

```
let arr = [[1,2],[3,4],[5,6]].flat();//[1, 2, 3, 4, 5, 6]
```

通过reduce也挺简单，我们可以结合concat方法，像这样：

```
let arr = [[1,2],[3,4],[5,6]].reduce((accumulator, current)=>accumulator.concat(current),[]);//[1, 2, 3, 4, 5, 6]
```

那如果是个多维数组呢，reduce可以这样做：

[![复制代码](https://qiniucloud.qishilong.space/images/202307261541102.gif)](javascript:void(0);)

```
let arr = [0,[1],[2, 3],[4, [5, 6, 7]]];

let dimensionReduction = function (arr) {
    return arr.reduce((accumulator, current) => {
        return accumulator.concat(
            Array.isArray(current) ? 
            dimensionReduction(current) : 
            current
            );
    }, []);
}
dimensionReduction(arr); //[0, 1, 2, 3, 4, 5, 6, 7]
```

[![复制代码](https://qiniucloud.qishilong.space/images/202307261541102.gif)](javascript:void(0);)

相对而言，多维数组降维flat会更简单，当然flat存在兼容问题：

```
let arr = [0,[1],[2, 3],[4, [5, 6, 7]]].flat(Infinity);// [0, 1, 2, 3, 4, 5, 6, 7]
```

 **肆 ❀ 使用注意**

在使用reduce方法有一点需要注意，若有初始值但数组为空，或无初始值但数组只有一项时，reduce方法都不会执行。

```
[].reduce(() => console.log(1), 1); //不会执行
[1].reduce(() => console.log(1)); //不执行
```

若数组为空且没有初始值，reduce方法报错。

```
[].reduce(() => console.log(1)); //报错
```

所以如果没有初始值，你至少得保证数组有2项才能执行；如果给了初始值，你至少得保证数组有一项才能执行。

```
[1, 2].reduce(() => console.log(1)); //1
[1].reduce(() => console.log(1), 1); //1
```

 **伍 ❀ 总**

通过文本，我们知道了reduce是一个进行累积操作的方法，当我们提供初始值时，循环从0开始，如果不提供，则循环从索引1开始。

我们知道了reduce还有那么点傲娇，如果数组为空且不提供初始值时reduce会报错，如果想reduce执行，你的数组最低标准应该有一项，同时提供默认值（或数组有两项无初始值）。

那么到这里，关于reduce方法参数与基本用法就全部介绍完毕了。