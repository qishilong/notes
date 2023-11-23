# Mac系统下安装nvm

nvm 全称为 node version manger，顾名思义就是管理 node 版本的一个工具，通过这个工具，我们可以在一台计算机上安装多个版本的 node，并且随时进行无缝的切换。

**1.  卸载原本的 node.js（重要）**

https://blog.csdn.net/huangpb123/article/details/120248002



**2. 下载安装nvm**

nvm github 地址：https://github.com/nvm-sh/nvm

可以直接下载压缩包，解压后将整个文件夹命名为 .nvm，在 Mac 要查看隐藏文件，可以通过 Shift + command + .

放入根目录（$HOME）下

之后看你的终端是什么，比如现在 mac 推荐的终端工具是 zsh，我们输入 vi ~/.zshrc 打开 zsh 终端的配置文件，添加如下的代码来对 nvm 进行配置。

> 输入 vi ~/.zshrc 命令之后，会打开 zsh 终端的配置文件，输入 i 进入 insert 编辑模式，我们可以进行编辑操作，编辑完成之后先按 ESC 推出编辑模式，然后输入 :wq 保存刚才的编辑并退出

这里的配置主要包含两个方面，一个是 nvm 路径的配置，另一个是镜像的配置

> 如果你使用的是 bash 终端，那么对应的就是执行 vi ~/.bashrc 打开 bash 终端的配置文件，添加如下的配置代码

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
export NVM_NODEJS_ORG_MIRROR=http://npm.taobao.org/mirrors/node # 修改镜像
export NVM_IOJS_ORG_MIRROR=http://npm.taobao.org/mirrors/iojs
```

配置完成后，通过命令 source ~/.zshrc 来使刚才的配置文件生效。

> 同样，如果你使用的是 bash 终端，那么应该输入 source ~/.bashrc 来使刚才的配置生效



**3. nvm常用命令**

```shell
# 查看当前安装和使用的 node 版本
nvm list

# 安装某个 node 版本
nvm install 版本号

# 切换 node 版本
nvm use 版本号

# 设置默认版本
nvm alias default v12.22.12
```



**4. 配置 npm 源**

安装 node 之后，一般对应的 npm 也会被安装好，但是默认 npm 的源是指向 npm 官网的，这就导致我们在下载包的时候会很慢。

我们需要修改 npm 的源

```js
npm config set registry=https://registry.npm.taobao.org
npm config get registry
```

