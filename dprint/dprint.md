# dprint

## 介绍

`dprint` 是一个使用 `rust` 编写的高效灵活的代码格式化库。用于自动化和统一化代码格式。`dprint` 的目标是实现极速的格式化，并且提供高度可配置的选项供用户自定义格式化规则。

### 主要特性：

1.  **速度**：dprint 基于 Rust 语言，并使用 WASM（Web Assembly）进行跨平台部署，因此它的格式化速度非常快。
2.  **可配置性**：dprint 提供了大量的可配置选项，使得开发者可以很灵活的定义自己的代码样式。
3.  **多语言支持**：dprint 不仅支持 JavaScript、TypeScript，还对 Markdown、JSON 和 JSONC 等其他语言也有良好的支持。
4.  **插件系统**：dprint 具有完整的插件系统，开发者可以为不同类型的代码创建自己的格式化插件（可以通过创建 `.dprinitrc.json`）实现。
5.  **持续集成**：dprint 可以与各种持续集成系统配合，自动检查代码格式是否符合预设的规则。
6.  **多种使用方式**：dprint 支持直接从 cli 使用，也可以作为库集成到项目中

## 安装

`dprint` 支持多种安装方式：

### Shell(Mac, Linux, WSL)

```shell
curl -fsSL https://dprint.dev/install.sh | sh
```

### Windows

[Download](https://github.com/dprint/dprint/releases/latest/download/dprint-x86_64-pc-windows-msvc-installer.exe)

### Powershell (Windows)

```sh
iwr https://dprint.dev/install.ps1 -useb | iex
```

## [Scoop](https://scoop.sh/) (Windows)

```sh
scoop install dprint
```

### [Homebrew](https://brew.sh/) (Mac)

```sh
brew install dprint
```

### [Cargo](https://crates.io/) (在这里下载和安装 [cargo package](https://crates.io/crates/dprint))

```sh
# 这将会比较慢，因为它是从源代码构建的
cargo install --locked dprint
```

### [Deno](https://deno.land/)

>   需要讲下面内容添加到 deno.json 文件中

```json
{
  "tasks": {
    "fmt": "deno task dprint fmt",
    "fmt:check": "deno task dprint check",
    "dprint": "deno run -A npm:dprint"
  }
}
```

然后运行 `deno task dprint init` 来初始化和格式化 `deno task fmt`

同样，你也可以通过Deno全局安装它，但像npm一样，它有启动和内存成本，因为它需要先运行Deno，然后再运行dprint。建议通过另一种方法进行全局安装。

```sh
deno install -A npm:dprint
dprint help
```

-   [npm](https://www.npmjs.com/):

    ```sh
    # for your project
    npm install dprint
    npx dprint help
    
    # or install globally (not recommended because it has a startup and memory cost)
    npm install -g dprint
    dprint help
    ```

-   [asdf-vm](https://asdf-vm.com/) ([asdf-dprint](https://github.com/asdf-community/asdf-dprint)):

    ```sh
    asdf plugin-add dprint https://github.com/asdf-community/asdf-dprint
    asdf install dprint latest
    ```

For binaries and source, see the [GitHub releases](https://github.com/dprint/dprint/releases).

## [Editor Extensions](https://dprint.dev/install/#editor-extensions)

-   [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=dprint.dprint)
-   [IntelliJ](https://plugins.jetbrains.com/plugin/18192-dprint) - Thanks to the developers at [Canva](https://canva.com/)
-   More to come!

Next step: [Setup](https://dprint.dev/setup)