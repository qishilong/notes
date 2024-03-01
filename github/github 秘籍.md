# GitHub 秘籍

Git 和 Github 秘籍，灵感来自于 [Zach Holman](https://github.com/holman) 在 2012 年 Aloha Ruby Conference 和 2013 年 WDCNZ 上所做的演讲：[Git and GitHub Secrets](http://www.confreaks.com/videos/1229-aloharuby2012-git-and-github-secrets)([slides](https://speakerdeck.com/holman/git-and-github-secrets)) 和 [More Git and GitHub Secrets](https://vimeo.com/72955426)([slides](https://speakerdeck.com/holman/more-git-and-github-secrets))。

# 目录

-   GitHub
    -   [不比较空白字符](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#不比较空白字符)
    -   [调整 Tab 字符所代表的空格数](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#调整-tab-字符所代表的空格数)
    -   [查看某个用户的 Commit 历史](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#查看某个用户的-commit-历史)
    -   [仓库克隆](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#仓库克隆)
    -   分支
        -   [将某个分支与其他所有分支进行对比](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#将某个分支与其他所有分支进行对比)
        -   [比较分支](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#比较分支)
        -   [比较不同派生库的分支](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#比较不同派生库的分支)
    -   [Gists](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#gists)
    -   [Git.io](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#gitio)
    -   [键盘快捷键](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#键盘快捷键)
    -   [整行高亮](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#整行高亮)
    -   [用 Commit 信息关闭 Issue](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#用-commit-信息关闭-issue)
    -   [链接其他仓库的 Issue](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#链接其他仓库的-issue)
    -   [锁定项目对话功能](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#锁定项目对话功能)
    -   [设置 CI 对每条 Pull Request 都进行构建](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#设置-ci-对每条-pull-request-都进行构建)
    -   [Markdown 文件语法高亮](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#markdown-文件语法高亮)
    -   [表情符](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#表情符)
    -   图片 / GIF 动画
        -   [在 GitHub Wiki 中引用图片](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#在-github-wiki-中引用图片)
    -   [快速引用](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#快速引用)
    -   [粘贴剪贴板中的图片到评论](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#粘贴剪贴板中的图片到评论)
    -   [快速添加许可证文件](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#快速添加许可证文件)
    -   任务列表
        -   [Markdown 文件中的任务列表](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#markdown-文件中的任务列表)
    -   [相对链接](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#相对链接)
    -   [GitHub Pages 的元数据与插件支持](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#github-pages-的元数据与插件支持)
    -   [查看 YAML 格式的元数据](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#查看-yaml-格式的元数据)
    -   [渲染表格数据](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#渲染表格数据)
    -   [撤销 Pull Request](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#撤销-pull-request)
    -   Diffs
        -   [可渲染文档的Diffs](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#可渲染文档的diffs)
        -   [可比较的地图数据](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#可比较的地图数据)
        -   [在 Diff 中展开查看更多的上下文](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#在-diff-中展开查看更多的上下文)
        -   [获取 Pull Request 的 diff 或 patch 文件](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#获取-pull-request-的-diff-或-patch-文件)
        -   [显示图片以及比较图片](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#显示图片以及比较图片)
    -   [Hub](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#hub)
    -   [贡献者指南](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#贡献者指南)
    -   [Octicons](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#octicons)
    -   GitHub 资源
        -   [GitHub 相关演讲视频](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#github-相关演讲视频)
-   Git
    -   [从工作区去除大量已删除文件](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#从工作区去除大量已删除文件)
    -   [上一个分支](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#上一个分支)
    -   [去除空白](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#去除空白)
    -   [检出 Pull Requests](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#检出-pull-requests)
    -   [没有任何改动的提交](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#没有任何改动的提交)
    -   [美化 Git Status](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#美化-git-status)
    -   [美化 Git Log](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#美化-git-log)
    -   [Git 查询](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#git-查询)
    -   [合并分支](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#合并分支)
    -   [修复有问题的提交以及自动合并](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#修复有问题的提交以及自动合并)
    -   [以网站方式查看本地仓库](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#以网站方式查看本地仓库)
    -   Git 配置
        -   [Git 命令自定义别名](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#git-命令自定义别名)
        -   [自动更正](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#自动更正)
        -   [颜色输出](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#颜色输出)
    -   Git 资源
        -   [Git 参考书籍](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#git-参考书籍)

## GitHub



### 不比较空白字符



在任意 diff 页面的 UR L后加上 `?w=1`，可以去掉那些只是空白字符的改动，使你能更专注于代码改动。

[![Diff without whitespace](https://camo.githubusercontent.com/797184940defadec00393e6559b835358a863eeb/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f626c6f672f323031312f736563726574732f776869746573706163652e706e67)](https://camo.githubusercontent.com/797184940defadec00393e6559b835358a863eeb/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f626c6f672f323031312f736563726574732f776869746573706163652e706e67)

[*详见 GitHub secrets.*](https://github.com/blog/967-github-secrets)

### 调整 Tab 字符所代表的空格数



在 diff 或文件的 URL 后面加上 `?ts=4` ，这样当显示 tab 字符的长度时就会是 4 个空格的长度，不再是默认的 8 个空格。 `ts` 后面的数字还可以根据你个人的偏好进行修改。这个技巧不适用于 Gists，或者以 Raw 格式查看文件， 但有浏览器扩展插件可以帮你自动调整: [Chrome 扩展](https://chrome.google.com/webstore/detail/github-tab-size/ofjbgncegkdemndciafljngjbdpfmbkn)。

下面以一个 Go 语言源文件为例，看看在 URL 里添加 `?ts=4` 参数的效果。添加前：

[![Before, tab space example](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f474954314672302e706e67-20240301111202930.png)](https://camo.githubusercontent.com/70fd9c24ec1af9ebcf179afa03c8f6cbf5d4eec3cfb71fb2e519c57b175b34e3/687474703a2f2f692e696d6775722e636f6d2f474954314672302e706e67)

... 添加后的样子：

[![After, tab space example](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f3730464c3448392e706e67-20240301111203089.png)](https://camo.githubusercontent.com/62edffbc5796f16ad27ed776a11d8ddcf6cc23cf5d72891e0057278774293710/687474703a2f2f692e696d6775722e636f6d2f3730464c3448392e706e67)

### 查看用户的全部 Commit 历史



在 Commits 页面 URL 后加上 `?author={user}` 查看用户全部的提交。

```
https://github.com/rails/rails/commits/master?author=dhh
```



[![DHH commit history](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f533741453239622e706e67-20240301111203299.png)](https://camo.githubusercontent.com/10efb19deb6eb5413e6752b14b71c6dcafb2784a3c7bf89fe6d891fecb759f73/687474703a2f2f692e696d6775722e636f6d2f533741453239622e706e67)

[*深入了解提交视图之间的区别*](https://help.github.com/articles/differences-between-commit-views)

### 仓库克隆



当克隆仓库时可以不要那个`.git`后缀。

```
$ git clone https://github.com/tiimgreen/github-cheat-sheet
```



[*更多对 Git `clone` 命令的介绍.*](http://git-scm.com/docs/git-clone)

### 分支



#### 将某个分支与其他所有分支进行对比



当你查看某个仓库的分支（Branches）页面（紧挨着 Commits 链接）时

```
https://github.com/{user}/{repo}/branches
```



你会看到一个包含所有未合并的分支的列表。

在这里你可以访问分支比较页面或删除某个分支。

[![Compare branches not merged into master in rails/rails repo - https://github.com/rails/rails/branches](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f3046456533307a2e706e67-20240301111203463.png)](https://camo.githubusercontent.com/6b1e3ae559dc0dc0d41f654682db97b0f0c73d643def38cfafe889fd862ff092/687474703a2f2f692e696d6775722e636f6d2f3046456533307a2e706e67)

#### 比较分支



如果要在 GitHub 上直接比较两个分支，可以使用如下形式的 URL ：

```
https://github.com/{user}/{repo}/compare/{range}
```



其中 `{range} = master...4-1-stable`

例如：

```
https://github.com/rails/rails/compare/master...4-1-stable
```



[![Rails branch compare example](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f744952434f734b2e706e67-20240301111203630.png)](https://camo.githubusercontent.com/de2a5192ea81adf9e18c37fbbbf91fe28fc182e70577ae920af7ebd25980929f/687474703a2f2f692e696d6775722e636f6d2f744952434f734b2e706e67)

`{range}` 参数还可以使用下面的形式:

```
https://github.com/rails/rails/compare/master@{1.day.ago}...master
https://github.com/rails/rails/compare/master@{2014-10-04}...master
```



*日期格式 `YYYY-MM-DD`*

[![Another compare example](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f3564747a45537a2e706e67-20240301111203781.png)](https://camo.githubusercontent.com/1ced48daeb01c04a59d8035653404e3c3a60ee3b220720391967bdcc84d6cab1/687474703a2f2f692e696d6775722e636f6d2f3564747a45537a2e706e67)

在 `diff` 和 `patch` 页面里也可以比较分支：

```
https://github.com/rails/rails/compare/master...4-1-stable.diff
https://github.com/rails/rails/compare/master...4-1-stable.patch
```



[*了解更多关于基于时间的 Commit 比较.*](https://help.github.com/articles/comparing-commits-across-time)

#### 比较不同派生库的分支



想要对派生仓库（Forked Repository）之间的分支进行比较，可以使用如下的 URL：

```
https://github.com/user/repo/compare/{foreign-user}:{branch}...{own-branch}
```



例如：

```
https://github.com/rails/rails/compare/byroot:master...master
```



[![Forked branch compare](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f513157367163422e706e67-20240301111203941.png)](https://camo.githubusercontent.com/0bdf4d60eb62998012a447dfd4545f8e012469048f0b057c6ccce66f291ce423/687474703a2f2f692e696d6775722e636f6d2f513157367163422e706e67)

### Gists



[Gists](https://gist.github.com/) 方便我们管理代码片段，不必使用功能齐全的仓库。

[![Gist](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f566b4b49314c432e706e673f31-20240301111204100.png)](https://camo.githubusercontent.com/9d8f34c0ca45b5161c716ea5fd803990453d7811fa601bd7fec949a5d1ac170c/687474703a2f2f692e696d6775722e636f6d2f566b4b49314c432e706e673f31)

Gist 的 URL 后加上 `.pibb`（[像这样](https://gist.github.com/tiimgreen/10545817.pibb)）可以得到便于嵌入到其他网站 的 HTML 代码。

Gists 可以像任何标准仓库一样被克隆。

```
$ git clone https://gist.github.com/tiimgreen/10545817
```



[![Gists](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f4263467a6162702e706e67-20240301111204248.png)](https://camo.githubusercontent.com/ce7a855fbfa21b42ad5f33fe901cf3c1e8cd280cc2ef772e2e4ea9ca6a8c4e15/687474703a2f2f692e696d6775722e636f6d2f4263467a6162702e706e67)

这意味着你可以像 Github 仓库一样修改和更新 Gists :

```
$ git commit
$ git push
Username for 'https://gist.github.com':
Password for 'https://tiimgreen@gist.github.com':
```



但是， Gists 不支持目录。所有文件都必须添加在仓库的根目录下。 [*进一步了解如何创建 Gists.*](https://help.github.com/articles/creating-gists)

### Git.io



[Git.io](http://git.io/)是 Github 的短网址服务。

[![Git.io](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f364a55666263472e706e673f31-20240301111204409.png)](https://camo.githubusercontent.com/89e78102aec3e2786b1554baf988e6052890061139e23be5bae8fbf5b389389a/687474703a2f2f692e696d6775722e636f6d2f364a55666263472e706e673f31)

你可以通过 Curl 命令以普通 HTTP 协议使用它：

```
$ curl -i http://git.io -F "url=https://github.com/..."
HTTP/1.1 201 Created
Location: http://git.io/abc123

$ curl -i http://git.io/abc123
HTTP/1.1 302 Found
Location: https://github.com/...
```



[*进一步了解 Git.io.*](https://github.com/blog/985-git-io-github-url-shortener)

### 键盘快捷键



在仓库页面上提供了快捷键方便快速导航。

-   按 `t` 键打开一个文件浏览器。
-   按 `w` 键打开分支选择菜单。
-   按 `s` 键聚焦光标到当前仓库的搜索框。此时按退格键就会从搜索当前仓库切换到搜索整个 Github 网站。
-   按 `l` 键编辑 Issue 列表页的标签。
-   **查看文件内容时**（如：`https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.md`），按 `y` 键将会冻结这个页面，这样就算代码被修改了也不会影响你当前看到的。

按`?`查看当前页面支持的快捷键列表：

[![Keyboard shortcuts](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f79355a664e456d2e706e67-20240301111204560.png)](https://camo.githubusercontent.com/7484266da1742acb07fcd785b0ec3d3f6350d8b5303a168c0aba8022481ccafe/687474703a2f2f692e696d6775722e636f6d2f79355a664e456d2e706e67)

[*进一步了解可用的搜索语法.*](https://help.github.com/articles/search-syntax/)

### 整行高亮



在代码文件地址 URL 后加上`#L52`或者单击行号 52 都会将第 52 行代码高亮显示。

多行高亮也可以，比如用`#L53-L60`选择范围，或者按住 `shift` 键，然后再点击选择的两行。

```
https://github.com/rails/rails/blob/master/activemodel/lib/active_model.rb#L53-L60
```



[![整行高亮](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f3841686a72437a2e706e67-20240301111204710.png)](https://camo.githubusercontent.com/ef3f00508f993518b9ef9abf5a9875191907f501c088f57b9c153a322acc72ca/687474703a2f2f692e696d6775722e636f6d2f3841686a72437a2e706e67)

### 用 Commit 信息关闭 Issue



如果某个提交修复了一个 Issue，当提交到 master 分支时，提交信息里可以使用 `fix/fixes/fixed`, `close/closes/closed` 或者 `resolve/resolves/resolved` 等关键词，后面再跟上 Issue 号，这样就会关闭这个 Issue 。

```
$ git commit -m "Fix screwup, fixes #12"
```



这将会关闭 Issue #12，并且在 Issue 讨论列表里关联引用这次提交。

[![Closing Repo](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f556831675a64782e706e67-20240301111204849.png)](https://camo.githubusercontent.com/0d2c8ce26205a64cadc02a10a00f08cf5038788ab47341d5086492f51f5375cd/687474703a2f2f692e696d6775722e636f6d2f556831675a64782e706e67)

[*进一步了解通过提交信息关闭 Issue.*](https://help.github.com/articles/closing-issues-via-commit-messages)

### 链接其他仓库的 Issue



如果你想引用到同一个仓库中的一个 Issue，只需使用井号 `#` 加上 Issue 号，这样就会自动创建到此 Issue 的链接。

要链接到其他仓库的 Issue ，就使用`{user}/{repo}#ISSUE_NUMBER`的方式，例如`tiimgreen/toc#12`。

[![Cross-Link Issues](https://camo.githubusercontent.com/447e39ab8d96b553cadc8d31799100190df230a8/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f626c6f672f323031312f736563726574732f7265666572656e6365732e706e67)](https://camo.githubusercontent.com/447e39ab8d96b553cadc8d31799100190df230a8/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f626c6f672f323031312f736563726574732f7265666572656e6365732e706e67)

### 锁定项目对话功能



现在仓库的管理员和合作者可以将 Pull Requests 和 Issue 的评论功能关闭。

[![Lock conversation](https://qiniucloud.qishilong.space/images/bf54dd44-f00d-11e3-8eb6-bb51e825bc2c-20240301111205705.png)](https://cloud.githubusercontent.com/assets/2723/3221693/bf54dd44-f00d-11e3-8eb6-bb51e825bc2c.png)

这样，不是项目合作者的用户就不能在这个项目上使用评论功能。

[![Comments locked](https://qiniucloud.qishilong.space/images/d6e513b0-f00e-11e3-9721-2131cb37c906-20240301111205884.png)](https://cloud.githubusercontent.com/assets/2723/3221775/d6e513b0-f00e-11e3-9721-2131cb37c906.png)

[*进一步了解对话锁定功能.*](https://github.com/blog/1847-locking-conversations)

### 设置 CI 对每条 Pull Request 都进行构建



如果配置正确，[Travis CI](https://travis-ci.org/) 会为每个你收到的 Pull Request 执行构建，就像每次提交也会触发构建一样。想了解更多关于 Travis CI 的信息，请参考 [Travis CI入门](http://docs.travis-ci.com/user/getting-started/)。

[![Travis CI status](https://qiniucloud.qishilong.space/images/3a88838c-c410-11e3-9a46-e65e2a0458cd-20240301111206088.png)](https://github.com/octokit/octokit.rb/pull/452)

[*进一步了解提交状态 API.*](https://github.com/blog/1227-commit-status-api)

### Markdown 文件语法高亮



例如，可以像下面这样在你的 Markdown 文件里为 Ruby 代码添加语法高亮：

````
```ruby
require 'tabbit'
table = Tabbit.new('Name', 'Email')
table.add_row('Tim Green', 'tiimgreen@gmail.com')
puts table.to_s
```
````



效果如下：

```
require 'tabbit'
table = Tabbit.new('Name', 'Email')
table.add_row('Tim Green', 'tiimgreen@gmail.com')
puts table.to_s
```



Github使用 [Linguist](https://github.com/github/linguist) 做语言识别和语法高亮。你可以仔细阅读 [languages YAML file](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml)，了解有哪些可用的关键字。

[*进一步了解 GitHub Flavored Markdown.*](https://help.github.com/articles/github-flavored-markdown)

### 表情符



可以在 Pull Requests, Issues, 提交消息, Markdown 文件里加入表情符。使用方法 `:name_of_emoji:`

```
:smile:
```



将输出一个笑脸：

😄

Github 支持的完整表情符号列表详见[emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com/) 或 [scotch-io/All-Github-Emoji-Icons](https://github.com/scotch-io/All-Github-Emoji-Icons)。

Github 上使用最多的5个表情符号是：

1.  `:shipit:`
2.  `:sparkles:`
3.  `:-1:`
4.  `:+1:`
5.  `:clap:`

### 图片 / GIF 动画



注释和README等文件里也可以使用图片和 GIF 动画：

```
![Alt Text](http://www.sheawong.com/wp-content/uploads/2013/08/keephatin.gif)
```



仓库中的图片可以被直接引用：

```
![Alt Text](https://github.com/{user}/{repo}/raw/master/path/to/image.gif)
```





所有图片都缓存在 Github，不用担心你的站点不能访问时就看不到图片了。

#### 在 GitHub Wiki 中引用图片



有多种方法可以在 Wiki 页面里嵌入图片。既可以像上一条里那样使用标准的 Markdown 语法，也可以像下面这样指定图片的高度或宽度：

```
[[ http://www.sheawong.com/wp-content/uploads/2013/08/keephatin.gif | height = 100px ]]
```



结果：

[![Just a screenshot](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f4a35624d6637532e706e67-20240301111206253.png)](https://camo.githubusercontent.com/46ba73e6b17e87a1aa856a43378e29c8ab77d67448e1c0b1aea5982b92b7f7a1/687474703a2f2f692e696d6775722e636f6d2f4a35624d6637532e706e67)

### 快速引用



在主题评论中引用之前某个人所说的，只需选中文本，然后按 `r` 键，想要的就会以引用的形式复制到你的输入框里。

[![Quick Quote](https://qiniucloud.qishilong.space/images/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3239363433322f3132343438332f62306661363230342d366566302d313165322d383363332d3235366333376661376162632e676966-20240301111206477.gif)](https://camo.githubusercontent.com/1bc99bfc9a9fe11db01b804ef6562d7d8d11f7379237209241bc15cbc46828e1/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3239363433322f3132343438332f62306661363230342d366566302d313165322d383363332d3235366333376661376162632e676966)

[*进一步了解快速引用.*](https://github.com/blog/1399-quick-quotes)

### 粘贴剪贴板中的图片到评论



*（仅适用于 Chrome 浏览器）*

当截屏图片复制到剪贴板后（mac 上用 `cmd-ctrl-shift-4`），你可以用(`cmd-v / ctrl-v`)把图片粘贴到评论框里，然后它就会自动上传到 Github。

[![Pasting Clipboard Image to Comments](https://qiniucloud.qishilong.space/images/39c9b65a-9f1b-11e4-9bc7-04e41f59ea5f-20240301111206624.png)](https://cloud.githubusercontent.com/assets/39191/5794265/39c9b65a-9f1b-11e4-9bc7-04e41f59ea5f.png)

[*进一步了解在 issue 中使用附件*](https://help.github.com/articles/issue-attachments)

### 快速添加许可证文件



创建一个仓库时，Github会为你提供一个预置的软件许可列表：

[![License](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f4368716a3446672e706e67-20240301111206788.png)](https://camo.githubusercontent.com/c4b57a7edbe4e895810d86d0e4887881c9aff2737c82f7c0ccadb844cb589c94/687474703a2f2f692e696d6775722e636f6d2f4368716a3446672e706e67)

对于已有的仓库，可以通过 web 界面创建文件来添加软件许可。输入`LICENSE`作为文件名后，同样可以从预置的列表中选择一个作为模板。

[![License](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f66546a516963742e706e67-20240301111206930.png)](https://camo.githubusercontent.com/136d4115f6716f34a9df178659ebee7e7a1ad7bdb4990ce65515f71372fd6f1d/687474703a2f2f692e696d6775722e636f6d2f66546a516963742e706e67)

这个技巧也适用于 `.gitignore` 文件。

[*进一步了解开源许可证*](https://help.github.com/articles/open-source-licensing)

### 任务列表



Issues 和 Pull requests 里可以添加复选框，语法如下（注意空白符）：

```
- [ ] Be awesome
- [ ] Prepare dinner
  - [ ] Research recipe
  - [ ] Buy ingredients
  - [ ] Cook recipe
- [ ] Sleep
```



[![Task List](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f6a4a42586873592e706e67-20240301111207070.png)](https://camo.githubusercontent.com/4def45301bbc4bb523d58341ff5d81d586f601a994aba637853713b20e4a584e/687474703a2f2f692e696d6775722e636f6d2f6a4a42586873592e706e67)

当项目被选中时，它对应的 Markdown 源码也被更新了：

```
- [x] Be awesome
- [ ] Prepare dinner
  - [x] Research recipe
  - [x] Buy ingredients
  - [ ] Cook recipe
- [ ] Sleep
```



[*进一步了解任务列表.*](https://help.github.com/articles/writing-on-github#task-lists)

#### Markdown 文件中的任务列表



在完全适配Markdown语法的文件中可以使用以下语法加入一个**只读**的任务列表

```
- [ ] Mercury
- [x] Venus
- [x] Earth
  - [x] Moon
- [x] Mars
  - [ ] Deimos
  - [ ] Phobos
```



-    Mercury

-    Venus

-    

    Earth

    -    Moon

-    

    Mars

    -    Deimos
    -    Phobos

[*进一步了解 Markdown 文件中的任务列表*](https://github.com/blog/1825-task-lists-in-all-markdown-documents)

### 相对链接



Markdown文件里链接到内部内容时推荐使用相对链接。

```
[Link to a header](#awesome-section)
[Link to a file](docs/readme)
```



绝对链接会在 URL 改变时（例如重命名仓库、用户名改变，建立分支项目）被更新。使用相对链接能够保证你的文档不受此影响。

[*进一步了解相对链接.*](https://help.github.com/articles/relative-links-in-readmes)

### GitHub Pages 的元数据与插件支持



在 Jekyll 页面和文章里，仓库信息可在 `site.github` 命名空间下找到，也可以显示出来，例如，使用 `{{ site.github.project_title }}`显示项目标题。

Jemoji 和 jekyll-mentions 插件为你的 Jekyll 文章和页面增加了[emoji](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#emojis)和[@mentions](https://github.com/blog/821)功能。

[*了解更多 GitHub Pages 的元数据和插件支持.*](https://github.com/blog/1797-repository-metadata-and-plugin-support-for-github-pages)

### 查看 YAML 格式的元数据



许多博客站点，比如基于 [Jekyll](http://jekyllrb.com/)的[GitHub Pages](http://pages.github.com/) ，都依赖于一些文章头部的 YAML 格式的元数据。 Github 会将其渲染成一个水平表格，方便阅读。

[![YAML metadata](https://camo.githubusercontent.com/47245aa16728e242f74a9a324ce0d24c0b916075/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f36343035302f313232383236372f65303439643063362d323761302d313165332d396464382d6131636432323539393334342e706e67)](https://camo.githubusercontent.com/47245aa16728e242f74a9a324ce0d24c0b916075/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f36343035302f313232383236372f65303439643063362d323761302d313165332d396464382d6131636432323539393334342e706e67)

[*进一步了解 在文档里查看 YAML 元数据.*](https://github.com/blog/1647-viewing-yaml-metadata-in-your-documents)

### 渲染表格数据



GitHub 支持将 `.csv` (逗号分隔)和 `.tsv` (制表符分隔)格式的文件渲染成表格数据。

[![Tabular data](https://camo.githubusercontent.com/1b6dd0157ffb45d9939abf14233a0cb13b3b4dfe/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3238323735392f3937363436322f33323038336463652d303638642d313165332d393262322d3566323863313061353035392e706e67)](https://camo.githubusercontent.com/1b6dd0157ffb45d9939abf14233a0cb13b3b4dfe/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3238323735392f3937363436322f33323038336463652d303638642d313165332d393262322d3566323863313061353035392e706e67)

[*进一步了解渲染表格数据.*](https://github.com/blog/1601-see-your-csvs)

### 撤销 Pull Request



合并一个 Pull Request 之后，你可能会反悔：要么是这次 Pull Request 没什么用处，要么是还不到合并的时候。

此时可以通过 Pull Request 中的 Revert 按钮来撤销一个已合并的 Pull Request 中的 commit。按下按钮后将自动生成一个进行逆操作的 Pull Request。

[![Revert button](https://camo.githubusercontent.com/0d3350caf2bb1cba53123ffeafc00ca702b1b164/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f68656c702f70756c6c5f72657175657374732f7265766572742d70756c6c2d726571756573742d6c696e6b2e706e67)](https://camo.githubusercontent.com/0d3350caf2bb1cba53123ffeafc00ca702b1b164/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f68656c702f70756c6c5f72657175657374732f7265766572742d70756c6c2d726571756573742d6c696e6b2e706e67)

[*进一步了解“撤销”按钮](https://github.com/blog/1857-introducing-the-revert-button)

### Diffs



#### 可渲染文档的Diffs



Commit 和 Pull Request 里包含有 Github 支持的可渲染文档（比如 Markdown）会提供*source* 和 *rendered* 两个视图功能。

[![Source / Rendered view](https://camo.githubusercontent.com/516364900fbbe109852cd107bf2efc070e28bac6fca027b882d4d084d6b92a26/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f68656c702f7265706f7369746f72792f72656e64657265645f70726f73655f646966662e706e67)](https://camo.githubusercontent.com/516364900fbbe109852cd107bf2efc070e28bac6fca027b882d4d084d6b92a26/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f68656c702f7265706f7369746f72792f72656e64657265645f70726f73655f646966662e706e67)

点击 "rendered" 按钮，看看改动在渲染后的显示效果。当你添加、删除或修改文本时，渲染纯文本视图非常方便。

[![Rendered Prose Diffs](https://qiniucloud.qishilong.space/images/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f31373731352f323030333035362f33393937656462342d383632622d313165332d393062652d3565393538366564656364372e706e67-20240301111208651.png)](https://camo.githubusercontent.com/6916c495144ba1d56f3d112283b86527e084386663b6d5200a119680fa0e8035/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f31373731352f323030333035362f33393937656462342d383632622d313165332d393062652d3565393538366564656364372e706e67)

[*进一步了解渲染纯文本视图Diffs.*](https://github.com/blog/1784-rendered-prose-diffs)

#### 可比较的地图数据



当你在GitHub上查看一个包含地理数据的 commit 或 pull request时，Github 将以可视化的方式对比版本之间的差异。

[![Diffable Maps](https://qiniucloud.qishilong.space/images/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3238323735392f323039303636302f36336632653435612d386539372d313165332d396438622d6434633830373862303034652e676966-20240301111208828.gif)](https://github.com/benbalter/congressional-districts/commit/2233c76ca5bb059582d796f053775d8859198ec5)

[*进一步了解可比较的地图数据.*](https://github.com/blog/1772-diffable-more-customizable-maps)

#### 在 Diff 中展开查看更多的上下文



你可以通过点击 diff 边栏里的 *unfold* 按钮来多显示几行上下文。你可以一直点击 *unfold* 按钮直到显示了文件的全部内容。这个功能在所有 GitHub 的 diff 功能中都可以使用。

[![Expanding Context in Diffs](https://qiniucloud.qishilong.space/images/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f32323633352f313631303533392f38363363316636342d353538342d313165332d383262662d3135316234303661323732662e676966-20240301111209003.gif)](https://camo.githubusercontent.com/40b58854095435880f804a19ab2b15270f7ea76eb1f72bc9b2726a8a96640be3/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f32323633352f313631303533392f38363363316636342d353538342d313165332d383262662d3135316234303661323732662e676966)

[*进一步了解展开 Diff 上下文.*](https://github.com/blog/1705-expanding-context-in-diffs)

#### 获取 Pull Request 的 diff 或 patch 文件



在 Pull Request 的 URL 后面加上 `.diff` 或 `.patch` 的扩展名就可以得到它的 diff 或 patch 文件，例如：

```
https://github.com/tiimgreen/github-cheat-sheet/pull/15
https://github.com/tiimgreen/github-cheat-sheet/pull/15.diff
https://github.com/tiimgreen/github-cheat-sheet/pull/15.patch
```



`.diff` 扩展会使用普通文本格式显示如下内容：

```
diff --git a/README.md b/README.md
index 88fcf69..8614873 100644
--- a/README.md
+++ b/README.md
@@ -28,6 +28,7 @@ All the hidden and not hidden features of Git and GitHub. This cheat sheet was i
 - [Merged Branches](#merged-branches)
 - [Quick Licensing](#quick-licensing)
 - [TODO Lists](#todo-lists)
+- [Relative Links](#relative-links)
 - [.gitconfig Recommendations](#gitconfig-recommendations)
     - [Aliases](#aliases)
     - [Auto-correct](#auto-correct)
@@ -381,6 +382,19 @@ When they are clicked, they will be updated in the pure Markdown:
 - [ ] Sleep

(...)
```



#### 显示图片以及比较图片



GitHub 可以显示包括 PNG、JPG、GIF、PSD 在内的多种图片格式并提供了几种方式来比较这些格式的图片文件版本间的不同。

[![Diffable PSD](https://qiniucloud.qishilong.space/images/55f2798a-eb56-11e3-92e7-b79ad791a697-20240301111209322.gif)](https://github.com/blog/1845-psd-viewing-diffing)

[*查看更多关于图片显示和比较*](https://help.github.com/articles/rendering-and-diffing-images)

### Hub



[Hub](https://github.com/github/hub) 是一个对 Git 进行了封装的命令行工具，可以帮助你更方便的使用 Github。

例如可以像下面这样进行克隆：

```
$ hub clone tiimgreen/toc
```



[*查看更多 Hub 提供的超酷命令.*](https://github.com/github/hub#commands)

### 贡献者指南



在仓库的根目录添加一个名为 `CONTRIBUTING` 的文件后，贡献者在新建 Issue 或 Pull Request 时会看到一个指向这个文件的链接。

[![Contributing Guidelines](https://camo.githubusercontent.com/71995d6b0e620a9ef1ded00a04498241c69dd1bf/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f736b697463682f6973737565732d32303132303931332d3136323533392e6a7067)](https://camo.githubusercontent.com/71995d6b0e620a9ef1ded00a04498241c69dd1bf/68747470733a2f2f6769746875622d696d616765732e73332e616d617a6f6e6177732e636f6d2f736b697463682f6973737565732d32303132303931332d3136323533392e6a7067)

[*进一步了解贡献者指南.*](https://github.com/blog/1184-contributing-guidelines)

### Octicons



GitHubs 图标库 (Octicons) 现已开源。

[![Octicons](https://camo.githubusercontent.com/62ec185e8506e3b0d3a92e3211a352791f81d958aa1381cde93416b8d75851b2/68747470733a2f2f6f672e6769746875622e636f6d2f6f637469636f6e732f6f637469636f6e734031323030783633302e706e67)](https://camo.githubusercontent.com/62ec185e8506e3b0d3a92e3211a352791f81d958aa1381cde93416b8d75851b2/68747470733a2f2f6f672e6769746875622e636f6d2f6f637469636f6e732f6f637469636f6e734031323030783633302e706e67)

[*进一步了解 GitHub 图标库*](https://octicons.github.com/)

### GitHub 资源



| 内容          | 链接                          |
| ------------- | ----------------------------- |
| 探索 GitHub   | https://github.com/explore    |
| GitHub 博客   | https://github.com/blog       |
| GitHub 帮助   | https://help.github.com/      |
| GitHub 培训   | http://training.github.com/   |
| GitHub 开发者 | https://developer.github.com/ |

#### GitHub 相关演讲视频



| 内容                                            | 链接                                        |
| ----------------------------------------------- | ------------------------------------------- |
| How GitHub Uses GitHub to Build GitHub          | https://www.youtube.com/watch?v=qyz3jkOBbQY |
| Introduction to Git with Scott Chacon of GitHub | https://www.youtube.com/watch?v=ZDR433b0HJY |
| How GitHub No Longer Works                      | https://www.youtube.com/watch?v=gXD1ITW7iZI |
| Git and GitHub Secrets                          | https://www.youtube.com/watch?v=Foz9yvMkvlA |
| More Git and GitHub Secrets                     | https://www.youtube.com/watch?v=p50xsL-iVgU |

## Git



### 从工作区去除大量已删除文件



当用 `/bin/rm` 命令删除了大量文件之后，你可以用下面一条命令从工作区和索引中去除这些文件，以免一个一个的删除：

```
$ git rm $(git ls-files -d)
```



例如:

```
$ git status
On branch master
Changes not staged for commit:
	deleted:    a
	deleted:    c

$ git rm $(git ls-files -d)
rm 'a'
rm 'c'

$ git status
On branch master
Changes to be committed:
	deleted:    a
	deleted:    c
```



### 上一个分支



快速检出上一个分支：

```
$ git checkout -
# Switched to branch 'master'

$ git checkout -
# Switched to branch 'next'

$ git checkout -
# Switched to branch 'master'
```



[*进一步了解 Git 分支.*](http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging)

### 去除空白



Git Stripspace 命令可以:

-   去掉行尾空白符
-   多个空行压缩成一行
-   必要时在文件末尾增加一个空行

使用此命令时必须传入一个文件，像这样：

```
$ git stripspace < README.md
```



[*进一步了解 Git `stripspace` 命令.*](http://git-scm.com/docs/git-stripspace)

### 检出 Pull Requests



对 Github 仓库来说，Pull Request 是种特殊分支， 可以通过以下多种方式取到本地：

取出某个特定的 Pull Request 并临时作为本地的 `FETCH_HEAD` 中以便进行快速查看更改( diff )以及合并( merge )：

```
$ git fetch origin refs/pull/[PR-Number]/head
```



通过 refspec 获取所有的 Pull Request 为本地分支：

```
$ git fetch origin '+refs/pull/*/head:refs/remotes/origin/pr/*'
```



或在仓库的 `.git/config` 中加入下列设置来自动获取远程仓库中的 Pull Request

```
[remote "origin"]
    fetch = +refs/heads/*:refs/remotes/origin/*
    url = git@github.com:tiimgreen/github-cheat-sheet.git
```



```
[remote "origin"]
    fetch = +refs/heads/*:refs/remotes/origin/*
    url = git@github.com:tiimgreen/github-cheat-sheet.git
    fetch = +refs/pull/*/head:refs/remotes/origin/pr/*
```



对基于派生库的 Pull Request，可以通过先 `checkout` 代表此 Pull Request 的远端分支再由此分支建立一个本地分支：

```
$ git checkout pr/42 pr-42
```



操作多个仓库的时候，可以在 Git 中设置获取 Pull Request 的全局选项。

```
git config --global --add remote.origin.fetch "+refs/pull/*/head:refs/remotes/origin/pr/*"
```



此时可以在任意仓库中使用以下命令：

```
 git fetch origin
```



```
git checkout pr/42
```



[*进一步了解如何本地检出 pull request.*](https://help.github.com/articles/checking-out-pull-requests-locally)

### 没有任何改动的提交



可以使用`--allow-empty`选项强制创建一个没有任何改动的提交：

```
$ git commit -m "Big-ass commit" --allow-empty
```



这样做在如下几种情况下是有意义的：

-   标记新的工作或一个新功能的开始。
-   记录对项目的跟代码无关的改动。
-   跟使用你仓库的其他人交流。
-   作为仓库的第一次提交，因为第一次提交后不能被 rebase： `git commit -m "init repo" --allow-empty`.

### 美化 Git Status



在命令行输入如下命令:

```
$ git status
```



可以看到:

[![git status](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f716a50797658622e706e67-20240301111210203.png)](https://camo.githubusercontent.com/fa8b2a8b3729baa2aa44bb913dedfb552103c06ba0d231bffa271ce4150db924/687474703a2f2f692e696d6775722e636f6d2f716a50797658622e706e67)

加上`-sb`选项:

```
$ git status -sb
```



这会得到:

[![git status -sb](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f4b304f59336e6d2e706e67-20240301111210349.png)](https://camo.githubusercontent.com/b53cbd3ae271475921e6382580d5763e0b2d31df58c06cc6948c36b4487e9bec/687474703a2f2f692e696d6775722e636f6d2f4b304f59336e6d2e706e67)

[*进一步了解 Git `status` 命令.*](http://git-scm.com/docs/git-status)

### 美化 Git Log



输入如下命令:

```
$ git log --all --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
```



可以看到:

[![git log --all --graph --pretty=format:'%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f3538654f746b572e706e67-20240301111210522.png)](https://camo.githubusercontent.com/deed9b916025f61924c272984d220d92d70f1739629c9d6c8594ac09768d5ac9/687474703a2f2f692e696d6775722e636f6d2f3538654f746b572e706e67)

这要归功于 [Palesz](http://stackoverflow.com/users/88355/palesz) 在 stackoverflow 的回答。

*这个命令可以被用作别名，详细做法见[这里](https://github.com/tiimgreen/github-cheat-sheet/blob/master/README.zh-cn.md#git命令自定义别名)。*

[*进一步了解 Git `log` 命令.*](http://git-scm.com/docs/git-log)

### Git 查询



Git 查询运行你在之前的所有提交信息里进行搜索，找到其中和搜索条件相匹配的最近的一条。

```
$ git show :/query
```



这里 `query` （区别大小写）是你想要搜索的词语， 这条命令会找到包含这个词语的最后那个提交并显示变动详情。

```
$ git show :/typo
```



[![git show :/query](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f69636147694e742e706e67-20240301111210687.png)](https://camo.githubusercontent.com/03e53b90e2506358ec3d298363546385f420ac5a65394c5fe5b1beb1e4a0039d/687474703a2f2f692e696d6775722e636f6d2f69636147694e742e706e67)

-   按 `q` 键退出命令。*

### 合并分支



输入命令:

```
$ git branch --merged
```



这会显示所有已经合并到你当前分支的分支列表。

相反地：

```
$ git branch --no-merged
```



会显示所有还没有合并到你当前分支的分支列表。

[*进一步了解 Git `branch` 命令.*](http://git-scm.com/docs/git-branch)

### 修复有问题的提交以及自动合并



如果上一个或多个提交包含了错误，可以在你修复问题后使用下列命令处理（假设要修复的提交版本是`abcde`）：

```
$ git commit --fixup=abcde
$ git rebase abcde^ --autosquash -i
```



[*进一步了解 Git `commit` 命令.*](http://git-scm.com/docs/git-commit) [*进一步了解 Git `rebase` 命令.*](http://git-scm.com/docs/git-rebase)

### 以网站方式查看本地仓库



使用 Git 的 `instaweb` 可以立即在 `gitweb` 中浏览你的工作仓库。这个命令是个简单的脚本，配置了 `gitweb` 和用来浏览本地仓库的Web服务器。*（译者注：默认需要lighttpd支持）*

```
$ git instaweb
```



执行后打开：

[![Git instaweb](https://qiniucloud.qishilong.space/images/687474703a2f2f692e696d6775722e636f6d2f4478656b6d71632e706e67-20240301111210848.png)](https://camo.githubusercontent.com/d9d7a7d07b34bf6e60cc55833305cb3ea0859009171638e09efff511551ab99a/687474703a2f2f692e696d6775722e636f6d2f4478656b6d71632e706e67)

[*进一步了解 Git `instaweb` 命令.*](http://git-scm.com/docs/git-instaweb)

### Git 配置



所有 Git 配置都保存在你的 `.gitconfig` 文件中。

#### Git 命令自定义别名



别名用来帮助你定义自己的 git 命令。比如你可以定义 `git a` 来运行 `git add --all`。

要添加一个别名， 一种方法是打开 `~/.gitconfig` 文件并添加如下内容：

```
[alias]
  co = checkout
  cm = commit
  p = push
  # Show verbose output about tags, branches or remotes
  tags = tag -l
  branches = branch -a
  remotes = remote -v
```



...或者在命令行里键入：

```
$ git config --global alias.new_alias git_function
```



例如：

```
$ git config --global alias.cm commit
```



指向多个命令的别名可以用引号来定义：

```
$ git config --global alias.ac 'add -A . && commit'
```



下面列出了一些有用的别名：

| 别名 Alias     | 命令 Command                                                 | 如何设置 What to Type                                        |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `git cm`       | `git commit`                                                 | `git config --global alias.cm commit`                        |
| `git co`       | `git checkout`                                               | `git config --global alias.co checkout`                      |
| `git ac`       | `git add . -A` `git commit`                                  | `git config --global alias.ac '!git add -A && git commit'`   |
| `git st`       | `git status -sb`                                             | `git config --global alias.st 'status -sb'`                  |
| `git tags`     | `git tag -l`                                                 | `git config --global alias.tags 'tag -l'`                    |
| `git branches` | `git branch -a`                                              | `git config --global alias.branches 'branch -a'`             |
| `git cleanup`  | `git branch --merged | grep -v '*' | xargs git branch -d`    | `git config --global alias.cleanup "!git branch --merged | grep -v '*' | xargs git branch -d"` |
| `git remotes`  | `git remote -v`                                              | `git config --global alias.remotes 'remote -v'`              |
| `git lg`       | `git log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --` | `git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --"` |

#### 自动更正



如果键入 `git comit` 你会看到如下输出：

```
$ git comit -m "Message"
# git: 'comit' is not a git command. See 'git --help'.

# Did you mean this?
#   commit
```



为了在键入 `comit` 调用 `commit`命令，只需启用自动纠错功能：

```
$ git config --global help.autocorrect 1
```



现在你就会看到：

```
$ git comit -m "Message"
# WARNING: You called a Git command named 'comit', which does not exist.
# Continuing under the assumption that you meant 'commit'
# in 0.1 seconds automatically...
```



#### 颜色输出



要在你的 Git 命令输出里加上颜色的话，可以用如下命令：

```
$ git config --global color.ui 1
```



[*进一步了解 Git `config` 命令.*](http://git-scm.com/docs/git-config)

### Git 资源



| Title                                     | Link                                                    |
| ----------------------------------------- | ------------------------------------------------------- |
| Official Git Site                         | http://git-scm.com/                                     |
| Official Git Video Tutorials              | http://git-scm.com/videos                               |
| Code School Try Git                       | http://try.github.com/                                  |
| Introductory Reference & Tutorial for Git | http://gitref.org/                                      |
| Official Git Tutorial                     | http://git-scm.com/docs/gittutorial                     |
| Everyday Git                              | http://git-scm.com/docs/everyday                        |
| Git Immersion                             | http://gitimmersion.com/                                |
| Git for Computer Scientists               | http://eagain.net/articles/git-for-computer-scientists/ |
| Git Magic                                 | http://www-cs-students.stanford.edu/~blynn/gitmagic/    |
| GitHub Training Kit                       | http://training.github.com/kit                          |
| Git Visualization Playground              | http://onlywei.github.io/explain-git-with-d3/#freeplay  |

#### Git 参考书籍



| Title                               | Link                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| Pragmatic Version Control Using Git | http://www.pragprog.com/titles/tsgit/pragmatic-version-control-using-git |
| Pro Git                             | http://git-scm.com/book                                      |
| Git Internals Pluralsight           | https://github.com/pluralsight/git-internals-pdf             |
| Git in the Trenches                 | http://cbx33.github.com/gitt/                                |
| Version Control with Git            | http://www.amazon.com/Version-Control-Git-collaborative-development/dp/1449316387 |
| Pragmatic Guide to Git              | http://www.pragprog.com/titles/pg_git/pragmatic-guide-to-git |
| Git: Version Control for Everyone   | http://www.packtpub.com/git-version-control-for-everyone/book |