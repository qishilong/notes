# Corepack

新增于： v16.9.0， v14.19.0

稳定性： 1 - 实验性

Corepack 是一个实验性工具，可帮助管理包管理器的版本。它为每个受支持的包管理器公开二进制代理，当调用这些代理时，将识别为当前项目配置的任何包管理器，根据需要透明地安装它，最后运行它，而无需显式用户交互。

此功能简化了两个核心工作流：

-   它简化了新贡献者的入职培训，因为他们不必再遵循特定于系统的安装过程，只是为了拥有您想要的包管理器。
-   它允许您确保团队中的每个人都将完全使用您希望他们使用的包管理器版本，而无需他们在每次需要进行更新时手动同步它。

###  工作流[#](https://nodejs.org/api/corepack.html#workflows)

####  启用该功能[#](https://nodejs.org/api/corepack.html#enabling-the-feature)

由于其实验状态，Corepack 目前需要显式启用才能产生任何效果。为此，请运行 `corepack enable` ，这将在您的环境中的 `node` 二进制文件旁边设置符号链接（并在必要时覆盖现有的符号链接）。

从现在开始，对受支持的二进制文件的任何调用都将正常工作，而无需进一步设置。如果您遇到问题，请运行 `corepack disable` 以从系统中删除代理（并考虑在 Corepack 存储库上打开问题以告知我们）。

####  配置软件包[#](https://nodejs.org/api/corepack.html#configuring-a-package)

Corepack 代理将在当前目录层次结构中找到最接近 `package.json` 的文件来提取其 `"packageManager"` 属性。

如果该值对应于受支持的包管理器，则 Corepack 将确保对相关二进制文件的所有调用都针对请求的版本运行，如果需要，请按需下载，如果无法成功检索，则中止。

你可以使用 要求 Corepack 更新你的本地 `package.json` ，以使用 `corepack use` 你选择的包管理器：

```bash
corepack use pnpm@7.x # sets the latest 7.x version in the package.json
corepack use yarn@* # sets the latest version in the package.json COPY
```

#### 升级全局版本[#](https://nodejs.org/api/corepack.html#upgrading-the-global-versions)

在现有项目之外运行时（例如，在运行时 `yarn init` ），Corepack 将默认使用预定义的版本，大致对应于每个工具的最新稳定版本。可以通过运行命令 `corepack install` 以及要设置的包管理器版本来覆盖这些版本：

```bash
corepack install --global yarn@x.y.z COPY
```

或者，可以使用标记或范围：

```bash
corepack install --global pnpm@*
corepack install --global yarn@stable COPY
```

####  离线工作流[#](https://nodejs.org/api/corepack.html#offline-workflow)

许多生产环境没有网络访问权限。由于 Corepack 通常直接从其注册表下载包管理器版本，因此它可能会与此类环境发生冲突。若要避免发生这种情况，请在仍具有网络访问权限时（通常在准备部署映像的同时）调用该 `corepack pack` 命令。这将确保即使没有网络访问，所需的包管理器也可用。

该 `pack` 命令具有各种标志。有关详细信息，请参阅详细的 Corepack 文档。

### 支持的包管理器[#](https://nodejs.org/api/corepack.html#supported-package-managers)

以下二进制文件通过 Corepack 提供：

| 包管理器                        | 二进制名称        |
| :------------------------------ | :---------------- |
| [ 纱](https://yarnpkg.com/)     | `yarn`, `yarnpkg` |
| [ PNPM的](https://pnpm.js.org/) | `pnpm`, `pnpx`    |

###  常见问题[#](https://nodejs.org/api/corepack.html#common-questions)

#### Corepack 如何与 npm 交互？[#](https://nodejs.org/api/corepack.html#how-does-corepack-interact-with-npm)

虽然 Corepack 可以像任何其他包管理器一样支持 npm，但默认情况下不会启用其填充码。这会产生一些后果：

-   始终可以在配置为与另一个包管理器一起使用的项目中运行 `npm` 命令，因为 Corepack 无法拦截它。
-   虽然 `npm` 是 `"packageManager"` 属性中的有效选项，但缺少填充码将导致使用全局 npm。

#### 跑步 `npm install -g yarn` 不起作用[#](https://nodejs.org/api/corepack.html#running-npm-install--g-yarn-doesnt-work)

npm 可防止在执行全局安装时意外覆盖 Corepack 二进制文件。若要避免此问题，请考虑以下选项之一：

-   不要运行此命令;无论如何，Corepack 都会提供包管理器二进制文件，并确保请求的版本始终可用，因此不需要显式安装包管理器。
-   将 `--force` 标志添加到 `npm install` ;这将告诉 npm 可以覆盖二进制文件，但您将在此过程中擦除 Corepack 文件。（运行 `corepack enable` 以重新添加它们。）