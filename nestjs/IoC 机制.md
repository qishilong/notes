# IoC 机制

后端系统有很多的对象，这些对象之间的关系错综复杂，如果手动创建并组装对象比较麻烦，所以后端框架一般都提供了 IoC 机制。

IoC 机制是在 class 上标识哪些是可以被注入的，它的依赖是什么，然后从入口开始扫描这些对象和依赖，自动创建和组装对象。

Nest 里通过 @Controller 声明可以被注入的 controller，通过 @Injectable 声明可以被注入也可以注入别的对象的 provider，然后在 @Module 声明的模块里引入。

并且 Nest 还提供了 Module 和 Module 之间的 import，可以引入别的模块的 provider 来注入。

虽然 Nest 这套实现了 IoC 的模块机制看起来繁琐，但是却解决了后端系统的对象依赖关系错综复杂的痛点问题。