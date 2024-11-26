# 如何利用 rebase 合并多次 commit

git rebase 除了可以处理冲突之外，另一个作用是可以合并多次 commit。有的公司对 commit 信息要求非常严格，但是有的时候自己难免要删删改改，后来发现，一些 commit 信息是不必要的，杂乱的，或者是被前者包含的，这个时候，我们可以利用 git rebase 来合并多个 commit。

比方说，你现在有一个 [readme.md](https://link.zhihu.com/?target=http%3A//readme.md/) 在 main 分支上。

- 第一次，你加了一行 123 在 [readme.md](https://link.zhihu.com/?target=http%3A//readme.md/) 里面，加完后 commit，commit 描述为 add 123
- 第二次，你加了一行 234 在 [readme.md](https://link.zhihu.com/?target=http%3A//readme.md/) 里面，commit，描述为 add 234
- 第三次，你加了一行 345 在 [readme.md](https://link.zhihu.com/?target=http%3A//readme.md/) 里面，commit，描述为 add 345

此时，你是用命令

```text
git log
```

打印输出为：

![img](https://qiniucloud.qishilong.space/images/202411261341582.jpg)

这个时候，你认为你添加的 123 234 345 都是数字，那么你想合并最后三次作为一次 commit，你可以使用

```text
git rebase -i hash
```

注意，合并是前开后闭的，也就是说，你的 hash 值需要写 ba70cc 那次的。

我们有

```text
git rebase -i ba70cc850c95d03ea43f4de412b101b39f4c0f48
```

此时，会弹出 vim

![img](https://qiniucloud.qishilong.space/images/202411261341897.jpg)

保留最老的一次，也就是 add 123，其他的 pick 都改成 s。（vim命令 i 进入插入模式，esc 退出插入模式，:wq 保存退出）

![img](https://qiniucloud.qishilong.space/images/202411261341365.jpg)

接着又会弹出另外一次 vim，

![img](https://qiniucloud.qishilong.space/images/202411261341700.jpg)

删除 add 123 add 234 add 345 那三行，写上新的 commit

![img](https://qiniucloud.qishilong.space/images/202411261341943.jpg)

保存，退出。

再输入

```text
git log
```

发现，此时 commit 已经变成一次，commit 描述为 add numbers

![img](https://qiniucloud.qishilong.space/images/202411261341088.jpg)

如果你认为 commit 描述需要调整，你可以利用

```text
git commit --amend
```

来修改，此操作会打开 vim，修改方法与之前的操作类似。

然后利用下面的命令将合并之后的 `commit` 提交到远程分支

```bash
git push -f origin <branch-name>
```