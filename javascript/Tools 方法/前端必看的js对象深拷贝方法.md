# 前端必看的js对象深拷贝方法

## 前言

>   为什么js对象的赋值有时候需要进行深拷贝？

 首先js的数据值按照类型主要分为两大类，**基本数据类型**和**引用数据类型**。基本数据类型包括Undefined、Null、Number、String、Boolean、Symbol；引用数据类型则为Object,那些Array、Set、Map数据也属于Object。

然后接下来，看一个非常典型的例子

```ini
// 基本数据类型赋值
var a = 'aaa';
var b = a;
console.log(a);  // 'aaa'
console.log(b);  // 'aaa'
b = 'bbb';
console.log(a);  // 'aaa'
console.log(b);  // 'bbb'

// 引用数据类型赋值
var a = {    name: '张三'};
var b = a;
console.log(a);  // {name: "张三"}
console.log(b);  // {name: "张三"}
b.name = '李四';
b.age = 18;
console.log(a);  // {name: "李四", age: 18}
console.log(b);  // {name: "李四", age: 18}
```



 ![img](https://qiniucloud.qishilong.space/images/202308151623862.awebp)



从上述代码和图可以看出，基本数据类型的赋值其实是拷贝了一个副本，之后两个变量所标识的值没有任何关系。而创建了一个引用数据类型的对象后，这个对象存放在内存中，此时变量a所指向的是这个对象在内存中的地址，然后将变量a赋值到变量b后，a和b所指向的其实是同一个对象，所以无论是修改变量a还是变量b,它们都会输出相同的内容。

因此如果我们在对对象进行赋值时，如果不希望共享这个对象，那么就需要进行深拷贝，就像基本数据类型那样，复制出一个副本来。

## 深拷贝方法

### 1. JSON.parse(  JSON.stringify()  ) 序列化和反序列

先将需要拷贝的对象进行JSON字符串化，然后再pase解析出来，赋给另一个变量，实现深拷贝。

这个方法有一些弊端，我开始用一些例子来展示出来。

```javascript
// 测试数据
var test = {  name: "test"};
var data = {  a: "123", 
              b: 123, 
              c: true, 
              d: [43, 2], 
              e: undefined,
              f: null,
              g: function() {    console.log("g");  },
              h: new Set([3, 2, null]),
              i: Symbol("fsd"),
              j: test,
              k: new Map([    ["name", "张三"],    ["title", "Author"]  ])
            };

JSON.stringify(data) 
```

**执行结果**

![img](https://qiniucloud.qishilong.space/images/202308151623879.awebp)

可以看到data这个对象的属性里基本上包含了所有的数据类型，但通过JSON字符串化后，返回的值却有缺失，原因是JSON在执行字符串化的这个过程时，会先进行一个JSON格式化，获得安全的JSON值，因此如果是非安全的JSON值，就会被丢弃掉。其中undefined、function、symbol这三种类型的值就是非安全的（包括该对象的属性循环赋值该对象），所以格式化后，就被过滤掉了，而set、map这种数据格式的对象，也并没有被正确处理，而是处理成了一个空对象。

**再看一个极端的例子**

```kotlin
// 测试数据
var data = {
    name: 'foo',
    child: null,
}
data.child = data
```



![img](https://qiniucloud.qishilong.space/images/202308151623881.awebp)

将这种对象的属性进行循环引用，就形成了一个闭环，执行一下序列化，看看结果

![img](https://qiniucloud.qishilong.space/images/202308151623891.awebp)

可以看到，将含有闭环的对象进行JSON序列化，爆出了错误

所以使用JSON序列化这种方式时，要注意避免包含上述那几种数据类型，不过这种方式也有几个好的地方，还是先看例子。

```css
// 测试数据
var test = {  name: "test"};
var data = {  a: "123",
              b: 123,
              c: true,
              d: [43, 2],
              e: test,
              f: { 
                    name: '张三',
                    age: 18, 
                    likes: {         
                         ball: ['足球','篮球']    
                           }  
                 }
            };
JSON.stringify(data) 
```



执行结果

![img](https://qiniucloud.qishilong.space/images/202308151623928.awebp)

它在处理这种嵌套的对象或者是属性值是对另一个对象的引用时，都能很好的进行字符串化，不会出现丢失数据，所以这是这种方式的一个优点。

>   具体方法

```javascript
function deepCopy(obj){ 
   if(typeof obj === 'function'){   
     throw new TypeError('请传入正确的数据类型格式')
    }
    try {
        let data = JSON.stringify(obj)
        let newData = JSON.parse(data)
        return newData
     } catch(e) {
      console.log(e)
      }
}
```



### 2. Object.assign(target, source1, source2)

es6新增的方法，可用于对象合并，将源对象的所有可枚举属性，复制到目标对象上。

```javascript
var data = {
              a: "123",
              b: 123,
              c: true,
              d: [43, 2],
              e: undefined,
              f: null,
              g: function() {    console.log("g");  },
              h: new Set([3, 2, null]),
              i: Symbol("fsd"),
              k: new Map([    ["name", "张三"],    ["title", "Author"]  ])
        };

var newData = Object.assign({},data)
console.log(newData)  
```



执行结果

![img](https://qiniucloud.qishilong.space/images/202308151623973.awebp)

可以看到这个API可以将源对象上的全部数据类型属性值完全复制到一个新的对象上，这难道就是我们所寻找的最完美的深拷贝方式了吗？答案是否，只能说是部分深拷贝，或者说就是浅拷贝，为什么这么说呢，接着往下看。

```css
var test = {  name: '张三' }
var data = { 
              a: 123,
              b: test
            }
var newData = Object.assign({},data)
console.log(newData) 
// {  a: 123,  b: {    name: '张三'  }}
test.age = 18
console.log(newData)
// {  a: 123,  b: {    name: '张三',   age: 18  }}
```

结果很明显，这种方式的拷贝，如果源目标对象中某个属性值是对另一个对象的引用，那么这个属性的拷贝仍然是对引用的拷贝。

### 3. 迭代递归方法

话不多说，先附上自己写的代码

```javascript
function deepCopy(data) {
      if(typeof data !== 'object' || data === null){
            throw new TypeError('传入参数不是对象')
        }
      let newData = {};
      const dataKeys = Object.keys(data);
      dataKeys.forEach(value => {
         const currentDataValue = data[value];
         // 基本数据类型的值和函数直接赋值拷贝 
         if (typeof currentDataValue !== "object" || currentDataValue === null) {
              newData[value] = currentDataValue;
          } else if (Array.isArray(currentDataValue)) {
             // 实现数组的深拷贝
            newData[value] = [...currentDataValue];
          } else if (currentDataValue instanceof Set) {
             // 实现set数据的深拷贝
             newData[value] = new Set([...currentDataValue]);
          } else if (currentDataValue instanceof Map) {
             // 实现map数据的深拷贝
             newData[value] = new Map([...currentDataValue]);
          } else { 
             // 普通对象则递归赋值
             newData[value] = deepCopy(currentDataValue);
          } 
       }); 
      return newData;
  }
```

然后写一个测试数据实测一下

```css
// 测试数据项
var data = {
              age: 18,
              name: "liuruchao",
              education: ["小学", "初中", "高中", "大学", undefined, null],
              likesFood: new Set(["fish", "banana"]),
              friends: [
                    { name: "summer",  sex: "woman"},
                    { name: "daWen",   sex: "woman"},
                    { name: "yang",    sex: "man" }  ], 
              work: { 
                      time: "2019", 
                      project: { name: "test",obtain: ["css", "html", "js"]} 
                    }, 
              play: function() {    console.log("玩滑板");  }
          }
```

执行结果

![img](https://qiniucloud.qishilong.space/images/202308151623066.awebp)

基本上可以满足常用的数据结构的值的深拷贝，但因为js对象的数据结构较多，所以并不能全部覆盖，比如说new Number(),这种基本数据类型的包装对象，就没有进行处理。因此在使用时，可以先对所要进行深拷贝的对象进行一个预判，来决定使用哪种方式。

**同样再试一下，第一种方法中，含有闭环对象的这种极端例子**

```kotlin
// 测试数据
var data = {
    name: 'foo',
    child: null,
}
data.child = data

deepCopy(data)
```

![img](https://qiniucloud.qishilong.space/images/202308151623079.awebp)

阿欧，直接栈溢出，爆栈了！！递归方法真得得谨慎使用啊，稍不注意就入栈太多了，只能接着优化这个函数吧。

### 4. 迭代递归方法（解决闭环问题）

```javascript
function deepCopy(data, hash = new WeakMap()) {
      if(typeof data !== 'object' || data === null){
            throw new TypeError('传入参数不是对象')
        }
      // 判断传入的待拷贝对象的引用是否存在于hash中
      if(hash.has(data)) {
            return hash.get(data)
        }
      let newData = {};
      const dataKeys = Object.keys(data);
      dataKeys.forEach(value => {
         const currentDataValue = data[value];
         // 基本数据类型的值和函数直接赋值拷贝 
         if (typeof currentDataValue !== "object" || currentDataValue === null) {
              newData[value] = currentDataValue;
          } else if (Array.isArray(currentDataValue)) {
             // 实现数组的深拷贝
            newData[value] = [...currentDataValue];
          } else if (currentDataValue instanceof Set) {
             // 实现set数据的深拷贝
             newData[value] = new Set([...currentDataValue]);
          } else if (currentDataValue instanceof Map) {
             // 实现map数据的深拷贝
             newData[value] = new Map([...currentDataValue]);
          } else { 
             // 将这个待拷贝对象的引用存于hash中
             hash.set(data,data)
             // 普通对象则递归赋值
             newData[value] = deepCopy(currentDataValue, hash);
          } 
       }); 
      return newData;
  }
```

比之前的1.0版本多了个存储对象的容器WeakMap，思路就是，初次调用deepCopy时，参数会创建一个WeakMap结构的对象，这种数据结构的特点之一是，存储键值对中的健必须是对象类型。

1.  首次调用时，weakMap为空，不会走上面那个if(hash.has())语句，如果待拷贝对象中有属性也为对象时，则将该待拷贝对象存入weakMap中，此时的健值和健名都是对该待拷贝对象的引用
2.  然后递归调用该函数
3.  再次进入该函数，传入了上一个待拷贝对象的对象属性的引用和存储了上一个待拷贝对象引用的weakMap，因为如果是循环引用产生的闭环，那么这两个引用是指向相同的对象的，因此会进入if(hash.has())语句内，然后return，退出函数，所以不会一直递归进栈，以此防止栈溢出。