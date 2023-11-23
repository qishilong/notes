# git stash

`git stash` 是一个非常有用的命令，在你想要切换到别的工作分支，但又不希望提交当前工作的更改时，可以使用它来临时保存（或"储藏"）当前的更改。

具体来说，`git stash` 会取走修改过的未提交的代码（也就是你的工作副本）和暂存区的内容，保存它们以便后续恢复。

下面是一些常用`git stash`的用法：

1. `git stash save "message"`：保存当前的更改，"message"是你对这次储藏的描述。
2. `git stash list`: 查看现有的储藏。
3. `git stash apply`: 应用最新的储藏，但不删除储藏。
4. `git stash pop`: 应用最新的储藏，并且删除这个储藏。
5. `git stash drop stash@{n}`: 删除指定的储藏。
6. `git stash clear`: 删除所有的储藏。 

记住，`git stash`只会储藏已经追踪的文件的更改，也就是那些已经通过`git add`命令添加到Git系统中的文件。对于尚未追踪的文件，如果你希望一并储藏，需要使用`git stash -u`或`git stash --include-untracked`。

注意：当使用 `git stash pop` 或者 `git stash apply` 时，如果没有给出 `stash` 名字（比如 `stash@{0}` ），`Git` 默认使用最近的 `stash` 