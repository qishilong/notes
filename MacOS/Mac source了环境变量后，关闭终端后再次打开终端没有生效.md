# Mac source了环境变量后，关闭终端后再次打开终端没有生效

在 ~/.bash_profile 中配置环境变量, 每次重启终端后配置的环境变量不生效。需要重新执行 : `$ source ~/.bash_profile` 才可以。

是因为zsh加载的是 `~/.zshrc` 文件，而 `.zshrc` 文件中并没有定义环境变量。

解决办法：

`source ~/.zshrc`
在~/.zshrc文件最后，增加一行：

`source ~/.bash_profile`