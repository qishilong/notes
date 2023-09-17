# JS基本数据类型和引用数据类型的区别及深浅拷贝 

## 前言

**首先我们先来了解一下什么叫栈堆**，**基本数据类型**与**引用数据类型**

***\**\*1.栈(stack)和堆（heap）stack为自动分配的内存空间，它由系统自动释放；而heap则是动态分配的内存，大小也不一定会自动释放。\*\**\***

**2.基本的数据类型:String, Number, boolean, Null, Undefined,Symbol(ES6新增)**　　

　　**特点： 存储的是该对象的实际数据，\**（存放在栈中）\****

**3.对象数据类型(也称为引用数据类型):Array,Object,Function**

　　**特点： 存储的是该对象在栈中引用，真实的数据存放在堆内存里，\**（存放在\****堆内存中的对象，每个空间大小不一样，要根据情况进行特定的配置）

**注:\**在JS中除了基\*\*本\*\*数据类型以外的都是对象，数据是对象，函数是对象，正则表达式是对象\****

1、区别： 浅拷贝/深度拷贝
判断： 拷贝是否产生了新的数据还是拷贝的是数据的引用
知识点：对象数据存放的是对象在栈内存的引用，直接复制的是对象的引用

2、常用的拷贝技术
　　1). arr.concat(): 数组浅拷贝
　　2). arr.slice(): 数组浅拷贝
　　3).Object.assign()对象浅拷贝
　　4). JSON.parse(JSON.stringify(arr/obj)): 数组或对象深拷贝, 但不能处理函数数据
　　5). 浅拷贝包含函数数据的对象/数组
　　6). 深拷贝包含函数数据的对象/数组

## 1.浅拷贝

在ES6中，Object对象新增了一个assign方法，可以实现对象的浅复制。这里谈谈Object.assign方法的具体用法，因为稍后会分析jQuery的extend方法，实现的原理同Object.assign方法差不多。

对于基本数据类型来说，复制一个变量值，本质上就是copy了这个变量。一个变量值的修改，不会影响到另外一个变量。

```
<script type="text/javascript">
    /*1.直接赋值给一个变量*/
    let obj = {username:'genius'};
    console.log(obj);      //genius
    //拷贝数组/对象  没有生成新的数据而是复制了一份引用。
    let arr = [1,4,{username:'lucas',age:23}];
    let arr2 = arr;
    arr2[0] = 'abcd0';
    console.log(arr,arr2);  //俩个输出结果相同

    /*Object.assign*/
    let colors=['red','green','blue'];  
    let colors2=Object.assign([],colors);  
    colors2[0]="orange";  
    console.log(colors2);//['orange','green','blue']  
    console.log(colors);//['red','green','blue']  

    /*3.concat方式*/
    let arr = [1,3,{username:'lucas'}];
    let testArr = [2,4];
    let arr2 = arr.concat(testArr);  //连接函数
    //arr2[2] = {username:'tiantian'};
    console.log(arr2);  //输出如下:数组中有对象
    // 输出数组:
    // 0:1
    // 1:3
    // 2:{username:'lucas'}  //这个值会随下面的更改而变
    // 3:2
    // 4:4

    /*4.slice方式*/
    console.log('-------------------');
    arr2[2].username = 'fengdudu';   //修改了arr的值,因为arr2[2]等于arr[2]
    console.log(arr);                 //和922行输出结果一样,只是下标2的内容改变了
    let arr3 = arr.slice();         //有startindex,endindex选项
    arr3[2].username = 'HHHHH';         //修改了arr的值,因为arr2[2]等于arr[2]
    console.log(arr);                 //和922行输出结果一样,只是下标2的内容改变了

    /*5.深度克隆*/
    console.log('===================');
    let arr4 = JSON.parse(JSON.stringify(arr));
    console.log(arr4);          //只拷贝了arr并没有testArr的数组，所以只有下标3长度
    arr4[2].username = 'duncan';
    console.log(arr,arr4);
    arr[2].username='MM';     //修改了arr、arr2、arr3的下标2的值。
    //JSON.stringify要求你放入的是原生的JS对象或数组,不能放数组。
    //JSON.stringify(arr)执行后arr的数据已经是JSON 字符串了，然后parse又转字符串，最终拿到一个JSON字符串，然后转换为一个对应的JS数组。
    console.log('-------------------');
</script>
```

 注：只会对只是一级属性复制，比浅拷贝多深拷贝了一层而已,所以还是无法达到深度克隆的目的.

## 2.深拷贝

对于复杂数据类型来说，同基本数据类型实现的不太相同。对于复杂数据类型的复制，要注意的是，变量名只是指向这个对象的指针。当我们将保存对象的一个变量赋值给另一个变量时，实际上复制的是这个指针，而两个变量都指向都一个对象。因此，一个对象的修改，会影响到另外一个对象。

在实际的开发项目中，前后端进行数据传输，主要是通过JSON实现的。

JSON对象下有两个方法，一是将JS对象转换成字符串对象的JSON.stringify方法；一个是将字符串对象转换成JS对象的JSON.parse方法。

这两个方法结合使用可以实现对象的深复制。也就是说，当我们需要复制一个obj对象时，可以先调用JSON.stringify(obj)，将其转换为字符串对象，然后再调用JSON.parse方法，将其转换为JS对象。就可以轻松的实现对象的深复制。

 例1

```
function deepClone(obj){
    let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
    return objClone
}    
let a=[0,1,[2,3],4];
    b=deepClone(a);
    
    a[0]=1;
    a[2][0]=1;
console.log(a,b);
```

效果如下：

 ![img](https://qiniucloud.qishilong.space/images/202308191220895.png)

 例2

```
 1 <script type="text/javascript">
 2     /*
 3         思考:
 4             如何实现深度拷贝(克隆)
 5             拷贝的数据里有对象/数组
 6             拷贝的数据里不能有对象/数组,即使有对象/数组可以继续遍历对象、数组拿到里边每一项值，一直拿到是基本数据类型，然后再去复制，就是深度拷贝。
 7     */
 8 
 9     //知识点储备
10     /*
11         如何判断数据类型:arr-Array null -Null
12         1.typeof返回的数据类型有:String，Number,Boolean,Undefined,Object,Function。
13         2.Object.prototype.toString.call(obj)。
14     */
15     
16     let result = 'abcd';
17     result = null;
18     result = [1,3];
19     console.log(Object.prototype.toString.call(result).slice(8,-1)); //[object Array]，sclice截取字符串后:Array(拿到分类)。
20     //console.log(typeof Object.prototype.toString.call(result));  //string
21 
22 
23     //for in 循环对象(属性名)、数组(下标)，推荐在循环对象属性的时候，使用for...in,在遍历数组的时候的时候使用for...of。
24     //for in 循环遍历对象属性名
25     let obj = {username:'zhangsan',age:22};
26     for(let i in obj){
27         console.log(i);  //username age
28     }
29 
30     //for in 循环遍历数组下标
31     let arr = [1,3,'abc'];
32     for(let i in arr){        //数组的可以用for of对应数组值
33         console.log(i); //0 1 2
34     }
35 
36     //定义检测数据类型的功能函数
37     function checkedType(target){
38         return Object.prototype.toString.call(target).slice(8,-1);
39     }
40     console.log(checkedType(result));  //Array
41 
42     //实现深度克隆--对象/数组
43     function clone(target){
44         //判断拷贝的数据类型
45         //初始化变量的result 成为最终克隆的数据
46         let result,targetType = checkedType(target);
47         if(targetType === 'Object'){
48             result = {};
49         }else if(targetType === 'Array'){
50             result = [];
51         }else{
52             return target;   //如果是基本数据类型:(String, Number, boolean, Null, Undefined)就直接反回去。
53         }
54 
55         //遍历目标数据
56         for(let i in target){
57            //获取遍历数据结构的每一项值。
58             let value = target[i];   //i=1,i=2,i=..
59               //判断目标结构里的每一值是否存在对象/数组
60             if(checkedType(value) === 'Object' || checkedType(value) === 'Array'){ //如果对象OR数组里嵌套了对象/数组
61                 //继续遍历获取到的value值
62                 result[i] = clone(value);    //这个只执行一次,数组里只有一个对象
63             }else{  //获取到的value值是基本的数据类型或者是函数。
64                 result[i] = value;  //因为arr3数组的下标0和1都是Number类型,只有下标2才是Object(转去执行1046行)
65             }
66         }
67         return result;
68     }
69     let arr3 = [1,2,{username:'dudu',age:32}];
70     let arr4 = clone(arr3);    //相当于复制了一份arr3的基本数据
71     console.log(arr4);
72     arr4[2].username = 'gate';
73     arr4[2].age = 65;
74     console.log(arr3,arr4);  //arr3下标2是{username:'dudu':age:32},arr4下标2是{username:gate,age:65}
75 </script>
```

输出如下：

![img](https://qiniucloud.qishilong.space/images/202308191220922.png)

 

 

**总结基本数据类型和引用数据类型区别**

**1、声明变量时内存分配不同**

　*原始类型：在栈中，因为占据空间是固定的，可以将他们存在较小的内存中-栈中，这样便于迅速查询变量的值

　*引用类型：存在堆中，栈中存储的变量，只是用来查找堆中的引用地址。

　  这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响

**2、不同的内存分配带来不同的访问机制**

  在javascript中是不允许直接访问保存在堆内存中的对象的，所以在访问一个对象时，首先得到的是这个对象在堆内存中的地址，然后再按照这个地址去获得这个对象中的值，这就是传说中的**按引用访问**。

  而原始类型的值则是可以直接访问到的。

**3、复制变量时的不同**

 1）原始值：在将一个保存着原始值的变量复制给另一个变量时，会将原始值的副本赋值给新变量，**此后这两个变量是完全独立的，他们只是拥有相同的value而已。**

 2）引用值：在将一个保存着对象内存地址的变量复制给另一个变量时，会把这个内存地址赋值给新变量，

　　　　也就是说这两个变量都指向了堆内存中的同一个对象，他们中任何一个作出的改变都会反映在另一个身上。

　　　　（这里要理解的一点就是，复制对象时并不会在堆内存中新生成一个一模一样的对象，只是多了一个保存指向这个对象指针的变量罢了）。**多了一个指针**

**4、\**参数传递的不同（\*\*把实参复制给形参的过程\*\*）\****

首先我们应该明确一点：ECMAScript中所有函数的参数都是按值来传递的。

　　但是为什么涉及到原始类型与引用类型的值时仍然有区别呢？还不就是因为内存分配时的差别。 　

　　1）原始值：只是把变量里的值传递给参数，之后参数和这个变量互不影响。

　　2）引用值：对象变量它里面的值是这个对象在堆内存中的内存地址，这一点你要时刻铭记在心！

　　　　因此它传递的值也就是这个内存地址，这也就是为什么函数内部对这个参数的修改会体现在外部的原因了，因为它们都指向同一个对象。