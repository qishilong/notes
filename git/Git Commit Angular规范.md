# Git Commit Angular规范

【前言】 熟悉 git 的小伙伴都知道，在 `git commit` 时需要填写对应的 message（提交信息），可能平常大家不太注意提交信息的规范化，在工程化的一个项目中或者比较大型的项目中如果有很多五花八门的提交，那么在像 code review 时就会产生很多不必要的问题，所以对于 commit 的提交进行规范化是很有必要的，而其中较为出名的规范便是**Angular规范**，因此本文针对 Angular 规范进行讲解。

ps：Angular规范不是指的 Angular 框架，而是其 `git commit` 的提交规范

像各位小伙伴熟知的一些框架如（Vue、Angular）都有在使用 Angular 规范

![image.png](https://qiniucloud.qishilong.space/images/be405de89e1b457091e3f459d8f286d4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![image.png](https://qiniucloud.qishilong.space/images/b02d14557a874c83a6426b00d83e6fe8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在图中所框住的内容便是 Angular 规范最重要的内容之一，日常写的 message 就是 `commit` 里面的 `header`，Angular 规范中将 `header` 拆分成三个字段（部分）：`type` (MUST)、`scope`(OPTIONAL)、`subject`(MUST)，也就是 type 和 subject 是必须的，而 scope 为可选的，正常的一个提交信息为：`type(scope): subject`。每个提交都**必须**使用类型字段前缀，它由一个名词构成，诸如 `feat` 或 `fix` ， 其后接**可选的**范围字段。

举个栗子：`fix(src/login): 修复登录页弹窗问题`，这里的 fix 就是 type 的其中一个，括号内的内容就是 scope，而“修复登录页弹窗问题”毫无疑问就是 subject，这便是一条遵循 Angular 规范的 `git commit `提交。

## type 的类型

在 Angular 规范中对于 `type` 许多场景有所定义，在不同的时候使用不同的字段，能够更好地概括此次提交，这里是看了各路大神文章与参考了angular官方文档的 type 进行整理：

| type       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| `feat`     | 当一个提交为应用或类库实现了新功能时，**必须**使用 `feat` 类型。 |
| `fix`      | 当一个提交为应用修复了 bug 时，**必须**使用 `fix` 类型。     |
| `style`    | 当一个提交仅修改了代码格式（如删除空格、换行等）或不影响代码逻辑本身的修改时，**必须**使用 `style` 类型。 |
| `docs`     | 当一个提交仅修改了 md 文件或其他阅读性文件时，**必须**使用 `docs` 类型。 |
| `build`    | 当一个提交修改了编译相关的内容，发布版本、对项目构建或者依赖的改动，即npm、gulp、yarn等文件的修改时，**必须**使用 `build` 类型。 |
| `ci`       | 当一个提交修改了持续集成，示例范围：Travis、Circle、BrowserStack、SauceLabs，**必须**使用 `ci` 类型。 |
| `perf`     | 当一个提交包含优化相关，比如提升性能、优化用户体验时，**必须**使用 `perf`类型。 |
| `test`     | 当一个提交包含测试用例的修改时，**必须**使用`test`类型。     |
| `chore`    | 当一个提交有其他修改（不在上述类型中的修改），**必须**使用`chore`类型。 |
| `refactor` | 当一个提交既不修复错误也不添加功能的代码更改，**必须**使用`refactor`类型。 |



## scope 与 subject

1.  `scope`其实是可选的内容，如果项目较为庞大的话，加上 `scope` 能够帮助你更好地知道改动的位置
2.  `subject`是必须的，只需要简单明了的描述清楚事件即可，例如“修复了登录页弹窗显示不了的问题” “删除多余空格”等等，这就已经足够了

## 注意点

1、其实在这其中有比较多的注意点，如subject内包含英文的部分，需要两端加入空格

举个错误栗子：`fix: 修复login页面的弹窗问题`

咋一看好像没啥问题

其实在subject中包含了英文（login），因此需要加入两边空格，产生间距，方便阅读。

举个正确栗子： `fix: 修复 login 页面的弹窗问题`

2、**必要的**冒号（英文半角）和空格，如冒号后面接上空格需要养成习惯。

3、**提交需要分批进行提交，不要一次性将所有内容进行提交，一句话不能概括完所有的更改时，请将各类型文件进行分批提交，对应type的类型进行描述。**

4、诸如Angular 规范其他内容（`!`的使用）请自行阅读 [Angular 规范文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.conventionalcommits.org%2Fzh-hans%2Fv1.0.0%2F%23%e7%ba%a6%e5%ae%9a%e5%bc%8f%e6%8f%90%e4%ba%a4%e8%a7%84%e8%8c%83)

5、人是活的，规范是死的，请各位小伙伴根据自己各自需要可以扩展type的字段，只有合适的才是最重要的。