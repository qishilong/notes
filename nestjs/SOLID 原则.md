# SOLID 原则

在[程序设计](https://zh.wikipedia.org/wiki/程序设计)领域， **SOLID**（**单一功能、开闭原则、里氏替换、接口隔离**以及**依赖反转**）是由[罗伯特·C·马丁](https://zh.wikipedia.org/w/index.php?title=Robert_C._Martin&action=edit&redlink=1)在21世纪早期引入的[记忆术](https://zh.wikipedia.org/wiki/记忆术)[首字母缩略字，指代了[面向对象编程](https://zh.wikipedia.org/wiki/面向对象编程)和[面向对象设计](https://zh.wikipedia.org/wiki/面向对象设计)的五个基本原则。当这些原则被一起应用时，它们使得一个[程序员](https://zh.wikipedia.org/wiki/程序员)开发一个容易进行[软件维护](https://zh.wikipedia.org/wiki/軟體維護)和扩展的系统变得更加可能。SOLID所包含的原则是通过引发程序设计者进行软件[源代码](https://zh.wikipedia.org/wiki/源代码)的[代码重构](https://zh.wikipedia.org/wiki/代码重构)进行软件的[代码异味](https://zh.wikipedia.org/wiki/代码异味)清扫，从而使得软件清晰可读以及可扩展时可以应用的指南。SOLID被典型的应用在[测试驱动开发](https://zh.wikipedia.org/wiki/测试驱动开发)上，并且是[敏捷开发](https://zh.wikipedia.org/wiki/敏捷开发)以及[自适应软件开发](https://zh.wikipedia.org/w/index.php?title=Adaptive_programming&action=edit&redlink=1)的基本原则的重要组成部分。

| 首字母 |                            指代                            |                             概念                             |
| :----: | :--------------------------------------------------------: | :----------------------------------------------------------: |
|   S    | [单一功能原则](https://zh.wikipedia.org/wiki/单一功能原则) | 认为“[对象](https://zh.wikipedia.org/wiki/对象_(计算机科学))应该仅具有一种单一功能”的概念。 |
|   O    |     [开闭原则](https://zh.wikipedia.org/wiki/开闭原则)     |  认为“软件应该是对于扩展开放的，但是对于修改封闭的”的概念。  |
|   L    | [里氏替换原则](https://zh.wikipedia.org/wiki/里氏替换原则) | 认为“程序中的对象应该是可以在不改变程序正确性的前提下被它的子类所替换的”的概念。参考[契约式设计](https://zh.wikipedia.org/wiki/契约式设计)。 |
|   I    | [接口隔离原则](https://zh.wikipedia.org/wiki/接口隔离原则) |   认为“多个特定客户端接口要好于一个宽泛用途的接口”的概念。   |
|   D    | [依赖反转原则](https://zh.wikipedia.org/wiki/依赖反转原则) | 认为一个方法应该遵从“依赖于抽象而不是一个实例”的概念。 [依赖注入](https://zh.wikipedia.org/wiki/依赖注入)是该原则的一种实现方式。 |