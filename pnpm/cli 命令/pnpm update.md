# pnpm update

别名： `up`, `upgrade`

`pnpm update` 根据指定的范围更新软件包的最新版本。

在不带参数的情况下使用时，将更新所有依赖关系。

## 摘要：

| Command              | Meaning                                                |
| -------------------- | ------------------------------------------------------ |
| `pnpm up`            | 遵循 `package.json` 指定的范围更新所有的依赖项         |
| `pnpm up --latest`   | 更新所有依赖项，此操作会忽略 `package.json` 指定的范围 |
| `pnpm up foo@2`      | 将 `foo` 更新到 v2 上的最新版本                        |
| `pnpm up "@babel/*"` | 更新 `@babel` 范围内的所有依赖项                       |

## 使用模式匹配选择依赖项

您可以使用 Pattern 来更新特定的依赖项。

更新所有 `babel` 包:

```sh
pnpm update "@babel/*"
```



更新所有依赖项，除了 `webpack` :

```sh
pnpm update "\!webpack"
```



Pattern 也可以组合使用，所以下一个命令将更新所有 `babel` 包，除了 `core`：

```sh
pnpm update "@babel/*" "\!@babel/core"
```



## 配置项

### --recursive, -r

同时在所有子目录中使用 `package.json` (不包括 node_modules) 运行更新。

用法示例：

```sh
pnpm --recursive update
# 更新子目录深度为 100 以内的所有包
pnpm --recursive update --depth 100
# 将每个包中的 typescript 更新为最新版本
pnpm --recursive update typescript@latest
```



### --latest, -L

忽略在 `package.json` 中指定的版本范围。 相反，版本将被指定为 `latest` 被使用 (可能会导致跨主版本的升级) 。

### --global, -g

更新全局安装的依赖包。

### --workspace

尝试链接工作区中所有的包。 版本将更新至与工作区内的包匹配的版本。

如果更新了特定的包，而在工作区内也找不到任何可更新的 依赖项，则命令将会失败。 例如，如果 `Express` 不是工作区内的包，那么以下 命令将失败:

```sh
pnpm up -r --workspace express
```



### --prod, -P

仅更新在 `dependencies` 和 `optionalDependencies` 中的依赖项。

### --dev, -D

仅更新在 `devDependencies`中的依赖项。

### --no-optional

忽略在 `optionalDependencies` 中的依赖项。

### --interactive, -i

显示过时的依赖项并选择要更新的依赖项。

### --filter <package_selector>

[阅读更多有关 filter 的内容。](https://pnpm.io/zh/filtering)