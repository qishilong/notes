# [从命令行启动](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)

还可以在将 VS Code 添加到路径后键入“code”，从终端运行 VS Code：

-    启动 VS Code。
-   打开命令面板 （Cmd+Shift+P） 并键入“shell command”以查找 Shell 命令：在 PATH 命令中安装“code”命令。

![macOS shell commands](https://qiniucloud.qishilong.space/images/shell-command.png)

-   重新启动终端以使新 `$PATH` 值生效。您可以在任何文件夹中键入“代码”，以开始编辑该文件夹中的文件。

>   注意：如果早期 VS Code 版本中的旧别名 `.bash_profile` （或等效别名）中仍然存在， `code` 请将其删除并通过执行 Shell 命令：在 PATH 命令中安装“代码”命令来替换它。

### [替代手册说明](https://code.visualstudio.com/docs/setup/mac#_alternative-manual-instructions)

可以手动将 VS Code 添加到路径，而不是运行上述命令，为此，请运行以下命令：

```shell
cat << EOF >> ~/.bash_profile
# Add Visual Studio Code (code)
export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
EOF
```

启动一个新终端来获取您的 `.bash_profile` 更改。

注意：前导斜杠 `\` 是必需的，以防止 `$PATH` 在串联过程中扩展。如果要直接在终端中运行 export 命令，请删除前导斜杠。

注意：由于 `zsh` 成为 macOS Catalina 中的默认 shell，请运行以下命令将 VS Code 添加到路径：

```shell
cat << EOF >> ~/.zprofile
# Add Visual Studio Code (code)
export PATH="\$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
EOF
```