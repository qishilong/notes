# RTK-一款节省token消耗的工具

#### 项目介绍
> github 地址：[https://github.com/rtk-ai/rtk](https://github.com/rtk-ai/rtk)
> 这个项目叫 RTK，开源一年多，现在已经接近 16.8 K Star 了。

![](https://qiniucloud.qishilong.space/20260403155402444.png)
它是一个 CLI 代理工具，坐在你的命令行和 AI 之间。

命令的输出在塞进上下文之前，它会先自己过滤一遍。

一大堆废话直接砍掉，基本能去掉 60-90% 的垃圾，让上下文干净多了。

![](https://qiniucloud.qishilong.space/20260403155402584.png)
归根结底，就是让AI少看一堆垃圾，多看真正有用的东西。

#### 它到底怎么省 token 的？
1.**「自动砍噪音」**

注释、空白行、各种样板代码，这些对AI其实没啥帮助，RTK现在会自动识别并删掉，只留核心逻辑。

举个例子：一个 `git status` 输出原来119个字符，过滤后只剩

28个，压缩了76%，但该有的信息一个都没少。

![](https://qiniucloud.qishilong.space/20260403155403020.png)
2.**「把相似的合并起来」**

测试跑了50个用例，失败了10个,以前AI会傻傻看到10条几乎一模一样的错误日志。

现在RTK会按目录或错误类型自动聚合，AI只用看一条摘要就够了。

对那些动不动跑几百个测试的项目来说，这点改动真的很实用。

3.**「该砍就砍，不该丢的不丢」**

`git log` 输出几百行提交记录？ RTK现在会聪明地只保留最近的几条和关键节点。

既减少了废话，又不会让AI突然失去上下文。

![](https://qiniucloud.qishilong.space/20260403155403392.png)
4.**「重复日志直接合并」**

Docker日志里同一条错误刷了100次？RTK会直接合并成一条，后面加个 `(x100)`。

简单直接，但用起来真舒服。

#### 能省多少？
一个 30 分钟的 Claude Code 会话，原本消耗 118,000 tokens。

用了 RTK 之后，只用了 23,900 tokens。

节省了 80%，属实太猛了。

具体到每个命令：

`ls / tree` 跑了 10 次，从 2,000 tokens 降到 400，省了 80% ，`cat / read` 跑了 20 次，从 40,000 降到 12,000，省了 70% ，`cargo test` 跑了 5 次，从 25,000 降到 2,500，省了 90%。

![](https://qiniucloud.qishilong.space/20260403155403387.png)
最夸张的是 git add/commit/push，8 次操作直接从 1,600 tokens 干到 120 tokens。

压缩效果简直“毫无人性”。

#### 上手教程
安装不难，两分钟搞定：

用Mac的朋友,直接执行

`brew install rtk`

Linux更简单，也推荐这种方式，直接复制执行。

`curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh`

装完别忘了，配置全局 hook（让 Claude Code 自动使用）

`rtk init --global`

重启 Claude Code 就好了。

装完之后，跑一下 `rtk gain` 看看你能省多少 token。

用 `rtk discover` 发现更多节省机会。

如果你想体验「只看签名」模式，试试：

`rtk read file.rs -l aggressive`

这个模式会把函数实现全部隐藏，只保留签名。

#### 支持哪些 AI 工具？
目前支持 10 个主流 AI 编码工具：

Claude Code、GitHub Copilot、Cursor、Gemini CLI、Codex、Windsurf、Cline/Roo Code、OpenCode、OpenClaw。

基本上你能想到的，它都支持。

**「能和其他工具叠加吗？」**

能，而且效果更好。

Reddit 上有人分享了一个「token 优化栈」：

RTK（压缩命令输出）+ Headroom（压缩 API 流量）+ MemStack（防止重复读取）。

![](https://qiniucloud.qishilong.space/20260403155358667.png)
三个工具作用在不同层面，可以叠加使用。

这波属于是把 token 优化玩明白了。

#### 值得试一下
如果你也在用 AI 编码工具，如果你也觉得 token 消耗太快。

RTK 真的值得试一下。

单一 Rust 二进制文件，零依赖，性能开销小于 10ms。

装上就能用，不改你的任何习惯。

感兴趣的可以玩玩。

`GitHub：https://github.com/rtk-ai/rtk`