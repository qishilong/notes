# 在本地创建完仓库后推送到 github 远端

在本地创建完仓库后推送到 GitHub 远端，你可以按照以下步骤进行：

1.   **初始化 Git 仓库**：在你的项目的根目录下打开终端，然后运行以下命令：

    ```bash
    git init -b main
    ```

    这个命令会在你的项目文件夹中创建一个隐藏的 `.git` 目录，Git 软件会识别这个目录并使用它来存储项目的元数据和版本历史。

2.   **添加文件到 Git 索引**：运行以下命令将你的文件添加到 Git 索引：

    ```bash
    git add -A
    ```

    `git add` 命令用于告诉 Git 哪些文件需要包含在提交中，`-A`（或 `--all`）参数表示“全部包含“。

3.   **提交已添加的文件**：运行以下命令创建一个新的提交，包含所有已“添加”的文件：

    ```bash
    git commit -m 'Added my project'
    ```

    `git commit` 命令会创建一个新的提交，包含所有已“添加”的文件。`-m`（或 `--message`）用于设置将与提交一起包含的消息，用于未来参考以理解提交。

4.   **添加新的远程源**：运行以下命令添加新的远程源：

    ```bash
    git remote add origin git@github.com:your_username/your_repository.git
    ```

    在 Git 中，“远程”指的是同一仓库的远程版本，通常位于某个服务器上（在这种情况下，是 GitHub）。`origin` 是 Git 给远程服务器的默认名称（你可以有多个远程），所以 `git remote add origin` 是指示 Git 添加默认远程服务器的 URL。

5.   **推送到 GitHub**：运行以下命令将你的本地提交推送到远程源：

    ```bash
    git push -u -f origin main
    ```