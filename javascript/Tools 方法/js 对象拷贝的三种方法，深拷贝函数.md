# js 对象拷贝的三种方法，深拷贝函数

以下面数据格式obj为例:

```js
const obj = {
    data: 1,
    un: undefined,
    info: {
        d: 2
    },
    fn: function() {
        console.log('Function')
    },
    get c() {
        return this.info.d
    }
}
```

### 方法一、Object.assign

```js
const objA = Object.assign({}, obj)
objA.data = 'a'
objA.info.d = 'b'

const objB = Object.assign({}, obj)
objB.data = 'c'
objB.info.d = 'd'

console.log(objA)
console.log(objB)

===================输出结果====================================
{data: 'a', un: undefined, info: {d: 'd'}, c: 2, fn: ƒ} 
{data: 'c', un: undefined, info: {d: 'd'}, c: 'b', fn: ƒ}
```

### 方法二、JSON.stringify & JSON.parse

```js
const objA = JSON.parse(JSON.stringify(obj))
objA.data = "a";
objA.info.d = "b";

const objB = JSON.parse(JSON.stringify(obj))
objB.data = "c";
objB.info.d = "d";

console.log(objA);
console.log(objB)

===================输出结果====================================
{data: 'a', info: {d: 'b'}, c: 2} 
{data: 'c', info: {d: 'd'}, c: 2}
```

### 方法三、Object.create

```js
const objA = Object.create(obj)
objA.data = "a";
objA.info.d = "b";

const objB = Object.create(obj)
objB.data = "c";
objB.info.d = "d";

console.log(objA);
console.log(objB)
console.log(objA.__proto__);
console.log(objB.__proto__);

===================输出结果====================================
{data: 'a'} 
{data: 'c'}
{data: 1, un: undefined, info: {d: 'd'}, fn: ƒ, c: 'd'}
{data: 1, un: undefined, info: {d: 'd'}, fn: ƒ, c: 'd'}
```

### 深拷贝函数

```js
function checkType(any) {
  return Object.prototype.toString.call(any).slice(8, -1)
}
function clone(any){
  if(checkType(any) === 'Object') { // 拷贝对象
    let o = {};
    for(let key in any) {
      o[key] = clone(any[key])
    }
    return o;
  } else if(checkType(any) === 'Array') { // 拷贝数组
    var arr = []
    for(let i = 0,leng = any.length;i<leng;i++) {
      arr[i] = clone(any[i])
    }
    return arr;
  } else if(checkType(any) === 'Function') { // 拷贝函数
    return new Function('return '+any.toString()).call(this)
  } else if(checkType(any) === 'Date') { // 拷贝日期
    return new Date(any.valueOf())
  } else if(checkType(any) === 'RegExp') { // 拷贝正则
    return new RegExp(any)
  } else if(checkType(any) === 'Map') { // 拷贝Map 集合
    let m = new Map()
    any.forEach((v,k)=>{
      m.set(k, clone(v))
    })
    return m
  } else if(checkType(any) === 'Set') { // 拷贝Set 集合
    let s = new Set()
    for(let val of any.values()) {
      s.add(clone(val))
    }
    return s
  }
  return any;
}
=======================测试代码==========================
var a = {
  name: '张三',
  skills: ['踢球', '跑步', '打羽毛球'],
  age: 18,
  love: {
    name: '小红',
    age: 16
  },
  map: new Map([['aaa', '123']]),
  fn:function(a){
    console.log(`我的名字叫${this.name}` + a)
  },
  set: new Set([1,2,3,4,5])
}
var newA = clone(a)
a.age = 100
a.love.age = 100
a.set.add('1123')
a.skills.push('计算机')
a.name = '小梅'
a.map.set('name', '小明')

console.log(a)
console.log(newA)

a.fn('a')
newA.fn('newA') 
```