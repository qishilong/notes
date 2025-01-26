# Hello world

>   rust 程序始终以 .rs 结尾，如果文件名中使用了多个单词，惯例是使用下划线分割他们。例如：使用 `hello_world.rs` 而不是 `helloworld.rs` 

## hello world

```rust
fn main(){
    printIn!("hello world")
}
```

## 程序剖析

1.   `main` 函数是 Rust 程序执行的入口文件，如果有参数就放在 （） 里面

2.   下载 Rust 时，会自动附带一个 rustfmt 的自动格式化工具

3.   调用宏

     `println!` 被称作 rust 的宏，如果只是调用一个函数，将会输入为 `println` 不带 `!` .

## 编译和运行时分开的步骤

在运行 rust 程序之前，必须使用 rust 编译器编译它，方法是输入 `rustc` 命令并向其传递源文件的名称

```shell
rustc main.rs
```

编译成成功后，会输出一个二进制可执行文件。

在 Linux 和 macOS 上，会有两个文件，`main main.rs`

在 Windows 的 CMD 和 PowerShell 上，将会有三个文件，`main.exe main.pdb main.rs` 

