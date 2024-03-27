# 面向方面编程（AOP）

**面向方面编程**（Aspect-oriented programming，AOP，又译作**面向方面程序设计**、**面向切面程序设计**、**剖面导向程序设计**），是[计算机科学](https://zh.wikipedia.org/wiki/计算机科学)中的一种[编程范型](https://zh.wikipedia.org/wiki/编程范型)，旨在将[交叉切入关注](https://zh.wikipedia.org/wiki/横切关注点)与作为业务主体的[核心关注](https://zh.wikipedia.org/wiki/主关注点)进行分离，以提高程序代码的[模块化](https://zh.wikipedia.org/wiki/模块化编程)程度。“方面”（aspect）通过规定叫做“点切入”（pointcut）的一种量化或查询，在各种接合点（join point）上应用通告（advice），从而改变现有基础代码的行为（behavior）。比如点切入与通告的一个实例：“对所有方法名以`set*`开头的方法添加后台日志”。该思想使得开发人员能够将与代码核心业务逻辑关系不那么密切的功能（如日志功能）添加至程序中，同时又不降低业务代码的可读性。

## 简介

面向方面编程将代码逻辑切分为不同的[模块](https://zh.wikipedia.org/wiki/模块化编程)（即[关注](https://zh.wikipedia.org/w/index.php?title=关注&action=edit&redlink=1)，一段特定的逻辑功能）。几乎所有的编程思想都涉及代码功能的分类，将各项关注（concern）封装成独立的抽象模块（如函数、过程、模块、类以及方法等），后者又可供进一步实现、封装和重写。部分关注“交叉切入”程序代码中的数个模块，即在多个模块中都有出现，它们即被称作[交叉切入关注](https://zh.wikipedia.org/wiki/横切关注点)。

日志功能即是交叉切入关注的一个典型案例，因为日志功能往往跨越系统中的每个业务模块，即交叉切入（crosscut）所有有日志需求的类及方法体。而对于一个信用卡应用程序来说，存款、取款、帐单管理是它的核心关注，日志和持久化将成为交叉切入整个对象结构的交叉切入关注。

方面的概念源于对[面向对象编程](https://zh.wikipedia.org/wiki/面向对象编程)和[计算反射](https://zh.wikipedia.org/wiki/反射式编程)的融合。面向方面编程语言拥有很多类似于[元对象协议](https://zh.wikipedia.org/wiki/元对象协议)的功能，但有更多的限制。方面相关的编程概念包括[主题](https://zh.wikipedia.org/w/index.php?title=面向主题编程&action=edit&redlink=1)、[混入](https://zh.wikipedia.org/wiki/混入)和[委托](https://zh.wikipedia.org/w/index.php?title=委托_(计算)&action=edit&redlink=1)。使用面向方面思想的其他方式有[复合过滤器](https://zh.wikipedia.org/w/index.php?title=复合过滤器&action=edit&redlink=1)和Hyper/J的hyperslices方式。

## 历史

“面向方面编程”这一术语由[施乐](https://zh.wikipedia.org/wiki/施乐)[帕洛阿尔托研究中心](https://zh.wikipedia.org/wiki/帕洛阿尔托研究中心)的Chris Maeda首先提出，但其具体时间已经不可考证了。术语“交叉切入”（crosscut）是由[Gregor Kiczales](https://zh.wikipedia.org/w/index.php?title=Gregor_Kiczales&action=edit&redlink=1)提出的。同许多重大的技术创新一样，面向方面编程，也是在不同的地方被独立发展出来。面向方面编程的早期工作，主要是由下面几个机构和人员作出的：

- [施乐](https://zh.wikipedia.org/wiki/施乐)[帕洛阿尔托研究中心](https://zh.wikipedia.org/wiki/帕洛阿尔托研究中心)：Gregor Kiczales、John Lamping、Cristina Videira Lopes等人，进行的早期工作有关于[反射机制](https://zh.wikipedia.org/wiki/反射式编程)和[元对象协议](https://zh.wikipedia.org/wiki/元对象协议)，在1997年Gregor Kiczales发表了论文《面向方面编程》[[1\]](https://zh.wikipedia.org/wiki/面向切面的程序设计#cite_note-1)；代表系统是基于[元对象协议](https://zh.wikipedia.org/wiki/元对象协议)的面向方面编程系统和[AspectJ](https://zh.wikipedia.org/w/index.php?title=AspectJ&action=edit&redlink=1)。
- [国际商用机器公司](https://zh.wikipedia.org/wiki/国际商用机器公司)[托马斯·J·沃森研究中心](https://zh.wikipedia.org/w/index.php?title=托马斯·J·沃森研究中心&action=edit&redlink=1)：William Harrison、Harold Ossher、Peri Tarr等人，在1980年代末进行的早期工作，有关于软件开发环境与工具集成；后来提出了多维关注分离（MDSOC），代表系统是Hyper/J。
- 美国[东北大学](https://zh.wikipedia.org/wiki/东北大学_(美国))：Karl Lieberherr等人，进行的早期工作是研究软件演化，提出了[得墨忒耳定律](https://zh.wikipedia.org/wiki/得墨忒耳定律)、传播模式、适应性编程[[2\]](https://zh.wikipedia.org/wiki/面向切面的程序设计#cite_note-2)；代表系统是Demeter/C++和Demeter/Java。
- 荷兰[特文特大学](https://zh.wikipedia.org/wiki/特文特大学)：Mehmet Aksit等人，其代表系统是[复合过滤器](https://zh.wikipedia.org/w/index.php?title=复合过滤器&action=edit&redlink=1)。

## 基本概念

[关注](https://zh.wikipedia.org/w/index.php?title=关注&action=edit&redlink=1)是对软件工程有意义的小的、可管理的、可描述的软件组成部分，一项关注通常只同一个特定概念或目标相关联。传统的编程语言，以一种线性的文本来描述软件，只采用一种方式比如类，将软件分解成模块；这导致某些关注比较好的被捕捉，容易进一步组合、扩展；但还有一些关注没有被捕捉，弥散在整个软件内部。

[关注分离](https://zh.wikipedia.org/wiki/关注点分离)（SOC）是标识、封装和操纵只与特定概念、目标相关联的软件组成部分的能力，即标识、封装和操纵关注的能力。分离关注使得解决特定领域问题的代码从业务逻辑中独立出来，业务逻辑的代码中不再含有针对特定领域问题代码的调用，业务逻辑同特定领域问题的关系通方面来封装、维护，这样原本分散在在整个应用程序中的变动就可以很好的管理起来。

[核心关注](https://zh.wikipedia.org/wiki/主关注点)是一个软件最主要的关注。在传统的编程语言中，将软件分解成模块的主要方式，是支配性分解，即按主关注进行模块分解。用来描述、设计、实现一项给定关注的软件构造单位是[方法](https://zh.wikipedia.org/wiki/方法)。如果两个关注的实现的方法存在交集，则称谓这两个关注相互交叉切入（crosscut）。

面向方面编程的核心概念，是从[核心关注](https://zh.wikipedia.org/wiki/主关注点)中分离出[交叉切入关注](https://zh.wikipedia.org/wiki/横切关注点)。面向方面编程，在支配性分解的基础上，提供叫做[方面](https://zh.wikipedia.org/w/index.php?title=方面&action=edit&redlink=1)（aspect）的一种辅助的模块化机制，这种新的模块化机制可以捕捉交叉切入关注。

## 接合点模型

面向方面编程语言的通告相关构件，定义了一个接合点模型（JPM）。一个JPM定义了三种东西：

1. 何时通告可以运行。这些叫做[接合点](https://zh.wikipedia.org/w/index.php?title=接合点_(编程)&action=edit&redlink=1)，因为在一个运行的程序中，它们是可以有用的接合上额外行为的点。一个接合点想要有用，它必需是可寻址的，并且对普通程序员是可理解的。它还应该经历无关紧要的程序变更而保持稳定，使得一个方面经历这种变更而保持稳定。很多AOP实现支持方法执行和字段引用作为接合点。
2. 规定（或量化）接合点的方式，这叫做[点切入](https://zh.wikipedia.org/w/index.php?title=点切入&action=edit&redlink=1)。点切入确定是否匹配一个给定接合点。最有用的点切入语言使用像基础语言的语法（例如[AspectJ](https://zh.wikipedia.org/w/index.php?title=AspectJ&action=edit&redlink=1)使用Java[签名](https://zh.wikipedia.org/wiki/类型签名)），并允许通过命名和组合来重新使用。
3. 指定在接合点要运行的代码的手段。[AspectJ](https://zh.wikipedia.org/w/index.php?title=AspectJ&action=edit&redlink=1)称之为[通告](https://zh.wikipedia.org/w/index.php?title=通告_(编程)&action=edit&redlink=1)，并且可以在接合点之前、之后和周围运行。一些实现还支持在一个方面中定义另一个类上的一个方法。

对接合点模型进行比较可以基于：所暴露的接合点，如何规定接合点，在接合点上允许的操作，能够表达的结构性增强机制。

### AspectJ的接合点模型

所有有效的Java程序也是有效的AspectJ程序，但是AspectJ容许编程者定义叫[方面](https://zh.wikipedia.org/w/index.php?title=方面_(编程)&action=edit&redlink=1)的特殊构造。方面包含一些对于标准类不能获得到的实体。它们是扩展方法、点切入和通告。

#### 扩展方法

[扩展方法](https://zh.wikipedia.org/w/index.php?title=扩展方法&action=edit&redlink=1)允许编程者在这个方面之内向现存的类增加方法、字段或接口。下面例子中，方面`VisitAspect`向类`Point`增加一个`acceptVisitor`方法（参见[访问者模式](https://zh.wikipedia.org/wiki/访问者模式)）：

```
aspect VisitAspect {
  void Point.acceptVisitor(Visitor v) {
    v.visit(this);
  }
  ⋮
}
```

#### 点切入

在AspectJ中接合点包括：方法或构造子调用或执行，一个类或对象的初始化，字段读或写访问，异常处理等。接合点不包括：循环、`super`调用，`throw`子句，多个语句等。

点切入是通过组合“原始点切入指示符”（PCD - primitive pointcut designator）来规定的。例如：

```
aspect VisitAspect {
  ⋮
  pointcut set() : execution(* set*(*) ) && this(Point) && within(com.company.*);
  ⋮
}
```

这个点切入匹配一个方法执行接合点，如果这个方法名字开始于`set`，并且此对象（`this`）是在`com.company`包中类型`Point`的实例。这个点切入可以使用名字`set()`来提及。点切入可以复合和命名来重新使用。

“种类”PCD匹配特定种类的接合点（比如方法执行），并且倾向于接受类似Java模样的签名作为输入：

```
execution(* set*(*))
```

这个点切入匹配一个方法执行接合点，如果这个方法名字开始于`set`，并且精确的只有一个任何类型的实际参数。

“动态”PCD检查运行时间类型和绑定变量：

```
this(Point)
```

这个点切入在当前执行对象是类`Point`的实例之时匹配。注意一个类的未限定名字可以通过Java的正常类型查找来使用。

“范围”PCD限制接合点的词法作用域：

```
within(com.company.*)
```

这个点切入匹配在`com.company`包中任何类型的任何接合点。`*`是一种形式的通配符，它用来匹配具有一个签名的任何东西。

#### 通告

通告规定在（通过点切入指定的）一个接合点（之前、之后或周围）运行特定代码（指定如若一个方法中的代码）。面向方面编程的运行时间系统，在这个点切入匹配一个接合点的时候，自动调用通告。例如：

```
aspect VisitAspect {
  ⋮
  after() : set() {
    Display.update();
  }
}
```

这在效果上指定了：“如果`set()`点切入匹配这个接合点，在接合点完成之后，运行代码`Display.update()`。”

## 实现

下列[编程语言](https://zh.wikipedia.org/wiki/编程语言)已经实现了AOP，于语言之内或外部库：

- .NET Framework语言（C#/VB.NET）
    - PostSharp，是一个商业AOP实现，具有免费但有限制的版本。
    - Unity，提供到在核心编程领域包括数据访问、安全性、日志、异常处理和其他之中经过实践检验的设施的API。
- ActionScript
- Ada
- AutoHotkey
- C / C++
- COBOL
- The Cocoa Objective-C框架
- ColdFusion
- Common Lisp
- Delphi
- Delphi Prism
- e（IEEE 1647）
- Emacs Lisp
- Groovy
- Haskell
- Java
    - AspectJ
    - Spring Framework
- JavaScript
- Logtalk
- Lua
- make
- Matlab
- ML
- Perl
- PHP
- Prolog
- Python
- Racket
- Ruby
- Squeak Smalltalk
- UML 2.0
- XML