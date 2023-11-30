# git 回滚到指定版本

在Git中回滚到指定版本通常有几种方法。以下是一些最常见的方法：

1. **使用`git reset`**（会修改历史）：
   想要回滚到特定的提交，可以使用带有提交hash值的`git reset`命令。比如：

   ```
   git reset --hard <commit-hash>
   ```

   这个命令会将HEAD指针移动到指定的提交，同时**放弃**当前工作目录和索引中的所有更改，在`--hard`模式下，此命令会重置工作目录以匹配该提交。

   如果你不想放弃工作目录中的更改，可以使用`--soft`或者`--mixed`选项：

   ```
   git reset --soft <commit-hash>
   ```

   这只会重置HEAD指针，但是当前的更改会被保留在暂存区。

   ```
   git reset --mixed <commit-hash>
   ```

   默认选项，它会移动HEAD指针并更新索引，但是保留工作区的更改。

2. **使用`git revert`**（不会修改历史）：
   如果你不想修改仓库的历史，可以使用`git revert`命令生成一个新的提交，它与指定的提交具有相反的更改。例如：

   ```
   git revert <commit-hash>
   ```

   命令执行完成后，它会提示你输入一个提交消息，然后创建一个新的提交。

3. **使用`git checkout`**（分离头指针状态）：
   如果目的是检查一个老的版本，而不是永久回滚到那个状态，你可以使用`git checkout`命令加上提交hash值：

   ```
   git checkout <commit-hash>
   ```

   这会让你进入一个分离HEAD状态，在这个状态下，你可以浏览、测试老的版本，但如果你在这个状态下提交，那么你需要创建一个新的分支来保存更改，否则当你切换出这个状态时，这些更改可能会丢失。

请谨慎地使用`git reset --hard`和`git revert`命令，尤其是在共享的仓库上，因为它们可能会影响其他人的工作。在执行回滚操作之前，应确保已经备份了所有重要数据。



本地分支回滚到指定版本

```shell
git reset --hard <commit ID 号>
```

强制推送到远程分支

```shell
git push -f origin <branch name>
```

