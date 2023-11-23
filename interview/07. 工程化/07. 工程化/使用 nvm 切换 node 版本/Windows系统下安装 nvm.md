# Windows系统下安装 nvm

nvm 全称为 node version manger，顾名思义就是管理 node 版本的一个工具，通过这个工具，我们可以在一台计算机上安装多个版本的 node，并且随时进行无缝的切换。

**1.  卸载原本的 node.js**

如果之前有安装过 node.js，那么首先我们需要卸载掉之前的安装



**2. 下载安装nvm**

链接:https://pan.baidu.com/s/1uoxlk8CVNHV2KTCwIGbQMQ?pwd=yi5m 

提取码: yi5m



**3. 修改nvm源**

如果直接用 nvm 命令下载 node 的话，因为源在国外，所以会导致下载失败，所以我们最好修改 nvm 的源

打开 nvm 的下载路径，如果你是一路 next 的，那么一般就在：C:\Users\你现在用的用户名\AppData\Roaming\nvm

打开 setting.txt 文件，在末尾写入：

```shell
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```



**4. nvm常用命令**

```shell
# 查看当前安装和使用的 node 版本
nvm list

# 安装某个 node 版本
nvm install 版本号

# 切换 node 版本
nvm use 版本号

# 设置默认版本
nvm alias v12.22.12
```



**5. 配置 npm 源**

安装 node 之后，一般对应的 npm 也会被安装好，但是默认 npm 的源是指向 npm 官网的，这就导致我们在下载包的时候会很慢。

我们需要修改 npm 的源

```js
npm config set registry=https://registry.npm.taobao.org
npm config get registry
```

