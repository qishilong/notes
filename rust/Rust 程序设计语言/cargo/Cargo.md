# Cargo

`Cargo` 是 `Rust` 的构建系统和包管理器

**检查 Cargo 是否安装**

```shell
cargo --version
```

**使用 Cargo 创建一个新项目**

```shell
cargo new xxx
```

使用这个命令后，Cargo 会为我们生成两个文件和一个目录：一个 Cargo.toml 文件和一个 src 目录，里面有一个 main.rs 文件

这个命令还会初始化一个新的 Git 存储库以及一个 `.gitignore` 文件。如果在现有的 Git 仓库中运行了 cargo new 命令，则不会生成 Git 文件。可以使用 `cargo new --vcs=git` 覆盖此行为。可以使用 `--vcs` 标志将 cargo new 更改为使用不同的版本控制系统或不使用版本控制系统。可以运行 `cargo new --help` 查看可用选项。

`Cargo` 的配置格式是 `TOML` 格式。

## Cargo 常用命令

### cargo new 

创建一个项目

### cargo build

构建一个项目，然后需要手动运行

### cargo run

构建一个项目并直接运行

### cargo check 

使用这个命令来检查是否有错误，而不必使用 cargo bulid 来检查，节约开发时间

### cargo build –release 进行编译优化，为发布作准备

