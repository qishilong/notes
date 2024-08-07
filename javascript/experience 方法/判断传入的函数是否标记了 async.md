# 判断传入的函数是否标记了 async

JavaScript是一门非常灵活和强大的语言，它拥有许多新颖和有趣的特性，让我们可以更方便地处理异步操作，编写更优雅和清晰的代码。

比如，你一定听说过async/await、Promise、Generator等等。但你是否真正理解这些特性背后的原理和机制呢？

## 问题描述

比如：你知道如何准确地判断一个函数是否标记了async吗？

今天跟着子辰来看这道字节的面试题，相信能对你有所启发。


![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281559679.png)



通过本文你将会学习如何用一种简单而精确的方法来判断一个函数是否标记了async，以及这个方法背后的原理和知识点。

让我们开始吧！



## **分析解题**



面试题要求我们写一个函数来判断传入的函数是否标记了async，并给出两个示例，传入一个普通函数的话就返回false，传入一个async 函数的话就返回true。

子辰首先帮你排除一个错误的解答，有些同学可能会想到，可以在isAsyncFunction 里直接调用func，如果它返回的是一个Promise，那么它就标记了async，但是这样做是不行的。

首先你并不知道这个函数要传递多少个参数，参数怎么传递，有些函数可能有很多个参数，但是你一个参数不传就可能会报错了。

其次是这个函数可能没有标记async 却依然返回Promise，比如

 function f(){ return new Promise() }

还有一种情况就是这个函数里有副作用，比如更改了全局的一些东西或者是发送了一个请求，那么这一调用这个函数的话，就造成了副作用，所以说调用是肯定不行的。

那么现在我们没思路就先观察一下普通函数和标记了async 的函数到底有什么区别。

我们先在控制台中输出一下标记了async 的函数。



![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281559742.png)



可以看到在async函数的原型上有一个符号，而且是一个知名的符号，叫做toStringTag，它的值是AsyncFunction。

我们再看一下普通函数。



![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281559755.png)



可以看到在普通函数的原型上就没有这么一个知名符号。

我们暂时不去考虑这个知名符号到底有什么作用，由于它们存在这样一个差别，所以说代码就很好写了，我们只要判断这个函数是否带这个知名符号，并且值是AsyncFunction 就可以了。

![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281559779.png)

![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281559767.png)

可以看到无论什么情况都是可以的，现在可以精确的判断这个函数，到底有没有标记async 了。

接下来我们研究一下这个知名符号到底是什么作用。

在过去要判断一个东西它是不是数组，经常是这么判断的。



![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281602504.png)



通过字符串的第二个单词就可以知道它是不是一个数组了，那么这种表达格式以前只针对部分的内置对象有效。

如果说是我们自己写的对象就是无效的。



![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281559198.png)



得到的字符串里并不能把这个类型F给表达出来，而且在过去这种行为是无法更改的。

但是到了ES6给我们提供了一种方式，可以更改这个行为，更改方式就是知名符号。



![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281559238.png)



我们给F 的原型上的Symbol.toStringTag赋值为一个字符串类型的大写F。

由于有了知名符号，我们可以看到f 的原型上就出现了一个知名符号"F"，然后Object.prototype.toString.call()返回字符串的第二个单词就变成了我们设置的F。

同理可得，async函数它的原型上既然有这个知名符号，所以我们也可以使用下图这种方式来判断。



![图片](https://images-1305186932.cos.ap-beijing.myqcloud.com/images/202306281559562.png)



## **总结**

通过这篇文章，我们了解了如何用知名符号Symbol.toStringTag来判断一个函数是否标记了async。

这个知名符号是ES6新增的一种特性，它可以让我们自定义对象的类型，并且影响Object.prototype.toString方法的返回值。

这个知名符号不仅可以用来判断async函数，还可以用来判断其他内置对象，比如数组、Map、Set等等。

它也可以让我们给自己定义的对象添加一个更有意义的类型，方便我们进行类型检测和区分。

知名符号是一个非常有用的工具，我们应该掌握它的用法和原理，以便在实际开发中灵活运用。