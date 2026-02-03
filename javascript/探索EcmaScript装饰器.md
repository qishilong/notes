# 探索EcmaScript装饰器

[迭代器](http://jakearchibald.com/2014/iterators-gonna-iterate/)、[生成器](http://www.2ality.com/2015/03/es6-generators.html)和[数组推导式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Array_comprehensions)；JavaScript和Python之间的相似之处随着时间的推移不断增加，就我而言，对此再兴奋不过了。今天我们要讨论的是下一个面向ECMAScript的Python风格提案——由Yehuda Katz提出的[装饰器](https://github.com/wycats/javascript-decorators)。

*2017年7月29日更新：装饰器在TC39的推进工作正在进行中。关于它们的最新研究成果可以在*[*提案*](https://github.com/tc39/proposal-decorators)*仓库中找到。此外，一些*[*新示例*](http://tc39.github.io/proposal-decorators/)*现已更新。*

*更新于10/02/18：现在有一个命令行工具可将您的脚本从旧版装饰器提案升级到新版提案，该工具*[*现已可用*](https://github.com/nicolo-ribaudo/legacy-decorators-migration-utility)*。*

## 装饰器模式

到底什么是装饰器呢？好吧，在Python中，装饰器为调用[高阶](https://en.wikipedia.org/wiki/Higher-order_function)函数提供了一种非常简单的语法。Python装饰器是一个函数，它接收另一个函数作为参数，在不明确修改后者的情况下扩展其行为。Python中[最简单](http://www.saltycrane.com/blog/2010/03/simple-python-decorator-examples/)的装饰器可能如下所示：

按回车键或点击可查看全尺寸图片

![img](https://qiniucloud.qishilong.space/images20260203172220947.png)

最顶部的那个东西（`@mydecorator`）是一个装饰器，在ES2016（ES7）中看起来不会有太大不同，所以要注意哦！：）。

*`@`* 向解析器表明我们正在使用装饰器，而 *mydecorator* 引用了一个以此命名的函数。我们的装饰器接收一个参数（即被装饰的函数），并返回具有附加功能的同一个函数。

装饰器对于任何你想要以透明方式包装额外功能的场景都很有用。这包括记忆化、强制访问控制和身份验证、工具和计时函数、日志记录、速率限制等等。

## ES5和ES2015（又称ES6）中的装饰器

在ES5中，实现命令式装饰器（作为纯函数）相当简单。在ES2015（以前称为ES6）中，虽然类支持扩展，但当我们有多个类需要共享单一功能时，我们需要更好的方式；一种具有更优分发方式的机制。

耶胡达的装饰器提案旨在支持在设计时对JavaScript类、属性和对象字面量进行注释和修改，同时保持声明式的语法。

让我们来看一些实际应用中的ES2016装饰器！

## ES2016 装饰器的实际应用

还记得我们从Python中学到的知识。ES2016装饰器是一个返回函数的表达式，它可以接收目标、名称和属性描述符作为参数。使用时，在装饰器前加上`@`字符，并将其放在要装饰的内容的最上方。装饰器可以为类或属性定义。

### 装饰属性

让我们来看一个基本的Cat类：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172303527.png)

对该类进行求值会导致将 meow 函数安装到 `Cat.prototype` 上，大致如下：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172303750.png)

假设我们想要将某个属性或方法名称标记为不可写。装饰器位于定义属性的语法之前。因此，我们可以像下面这样为其定义一个`@readonly`装饰器：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172303915.png)

并按如下方式将其添加到我们的meow属性中：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172304089.png)

装饰器只是一个会被求值且必须返回函数的表达式。这就是为什么`@readonly`和`@something(parameter)`都能生效的原因。

现在，在将描述符安装到`Cat.prototype`上之前，引擎会首先调用装饰器：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172304983.png)

实际上，这导致“meow”现在变成了只读。我们可以按以下方式验证此行为：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172305205.png)

非常出色，对吧？我们马上就来看看如何装饰类（而不仅仅是属性），不过先花点时间聊聊相关的库。尽管2016年的装饰器还比较新，但相关的库已经开始出现，其中包括Jay Phelps开发的https://github.com/jayphelps/core-decorators.js。

与我们上面尝试只读属性的做法类似，它包含了自己的`@readonly`实现，只需导入即可：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172305795.png)

它还包括其他装饰器工具，例如`@deprecate`，用于当API需要提示某些方法可能会发生变化的情况：

> *使用弃用消息调用console.warn()。提供自定义消息以覆盖默认消息。你还可以提供带有url的选项哈希，以供进一步阅读。*

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172306148.png)

### 装饰类

接下来让我们看看类的装饰。在这种情况下，根据提议的规范，装饰器会接收目标构造函数。对于一个虚构的`MySuperHero`类，我们可以使用`@superhero`装饰来为它定义一个简单的装饰器，如下所示：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172306359.png)

这可以进一步扩展，使我们能够提供参数，将装饰器函数定义为工厂：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172306645.png)

ES2016 装饰器适用于属性描述符和类。它们会自动接收属性名和目标对象，这一点我们很快会讲到。能够访问描述符使装饰器可以执行一些操作，比如将属性改为使用 getter，从而实现一些原本很繁琐的行为，例如在首次访问属性时自动将方法绑定到当前实例。

### ES2016装饰器和混入

我非常喜欢阅读雷格·布雷斯韦特最近关于[作为混入的ES2016装饰器](http://raganwald.com/2015/06/26/decorators-in-es7.html)的文章，以及其前篇[函数式混入](http://raganwald.com/2015/06/17/functional-mixins.html)。雷格提出了一个辅助工具，可将行为混入任何目标（类原型或独立对象），并接着描述了一个特定于类的版本。将实例行为混入类原型的函数式混入如下所示：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172307017.png)

#### mixin代码

```javascript
function mixin(behaviour, sharedBehaviour = {}) {
  const instanceKeys = Reflect.ownKeys(behaviour);
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol('isa');

  function _mixin(clazz) {
    for (let property of instanceKeys) {
      Object.defineProperty(clazz.prototype, property, { value: behaviour[property] });
    }
    Object.defineProperty(clazz.prototype, typeTag, { value: true });
    return clazz;
  }

  for (let property of sharedKeys) {
    Object.defineProperty(_mixin, property, {
      value: sharedBehaviour[property],
      enumerable: sharedBehaviour.propertyIsEnumerable(property)
    });
  }

  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: (i) => !!i[typeTag]
  });

  return _mixin;
}
```

很好。现在我们可以定义一些混入类，并尝试使用它们来装饰一个类。让我们设想我们有一个简单的`ComicBookCharacter`类：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172307198.png)

这很可能是世界上最无趣的角色，但我们可以定义一些混入，这些混入将提供赋予`SuperPowers`（超能力）和`UtilityBelt`（工具带）的行为。让我们使用Reg的混入助手来实现这一点：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172307430.png)

有了这个基础，我们现在可以使用带有混入函数名称的`@`语法来为`ComicBookCharacter`添加我们期望的行为。注意我们是如何用多个装饰器语句作为类的前缀的：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172307706.png)

现在，让我们用我们所定义的内容来塑造一个蝙蝠侠角色。

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172307949.png)

这些类装饰器相对简洁，我能想象自己将它们用作函数调用的替代方案，或者作为高阶组件的辅助工具。

*注意：@WebReflection 对本节中使用的混入模式有一些不同的看法，你可以在评论中找到*[*此处*](https://gist.github.com/addyosmani/a0ccf60eae4d8e5290a0#comment-1489585)*。*

## 通过Babel启用装饰器

装饰器（在撰写本文时）仍只是一项提案，尚未获得批准。不过，值得庆幸的是，Babel在实验模式下支持这种语法的转译，因此本文中的大多数示例都可以直接用它来尝试。

如果使用Babel命令行工具，你可以按以下方式启用装饰器：

```
$ babel --optional es7.decorators
```

或者，你也可以使用转换器开启支持：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172308086.png)

甚至有一个在线Babel REPL</b0；点击“实验性”复选框即可启用装饰器。试试看！

## 有趣的实验

保罗·刘易斯（幸运的是我就坐在他旁边）一直在尝试使用装饰器作为重新安排读写DOM代码的手段。这借鉴了威尔逊·佩奇的FastDOM中的理念，但提供了一个更小的API界面。保罗的读/写装饰器还能通过控制台发出警告，如果你在@write期间调用了触发布局的方法或属性（或者在@read期间修改了DOM）。

以下是保罗实验中的一个示例，其中尝试在@read内部修改DOM会向控制台抛出警告：

按回车键或点击可查看完整尺寸的图片

![img](https://qiniucloud.qishilong.space/images20260203172308332.png)

## 现在就去试试装饰器吧！

短期内，ES2016 装饰器可用于声明式装饰和注解、类型检查，以及解决将装饰器应用于 ES2015 类时面临的难题。从长远来看，它们可能在静态分析方面非常有用（这可能会催生用于编译时类型检查或自动补全的工具）。

它们与经典面向对象编程中的装饰器并没有太大区别，在那种模式下，一个对象可以被添加行为（可以是静态的，也可以是动态的），且不会影响同一类中的其他对象。我认为它们是一个不错的补充。不过，类属性上装饰器的语义仍在不断变化中，大家可以关注Yehuda的代码仓库以获取更新。

库作者们目前正在讨论装饰器可能在哪些地方取代混入，而且它们无疑可以通过某些方式用于React中的高阶组件。

我个人很高兴看到围绕它们使用的实验有所增加，希望你能尝试使用Babel，找到可复用的装饰器，甚至像Paul那样分享你的成果：）

## 进一步阅读和参考资料

- https://github.com/wycats/javascript-decorators
- https://github.com/jayphelps/core-decorators.js
- http://blog.developsuperpowers.com/eli5-ecmascript-7-decorators/
- http://elmasse.github.io/js/decorators-bindings-es7.html
- http://raganwald.com/2015/06/26/decorators-in-es7.html
- [杰伊的函数表达式ES2016装饰器示例](https://babeljs.io/repl/#?experimental=true&evaluate=true&loose=false&spec=false&playground=true&code=class Foo {  @function (target%2C key%2C descriptor) {       descriptor.writable %3D false%3B     return descriptor%3B   }  bar() {      } }&stage=0)