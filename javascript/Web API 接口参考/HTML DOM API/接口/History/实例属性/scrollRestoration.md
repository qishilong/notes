# History.scrollRestoration

[`History`](https://developer.mozilla.org/zh-CN/docs/Web/API/History) 的接口——**`滚动恢复属性`**允许 web 应用程序在历史导航上显式地设置默认滚动恢复行为

## [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration#语法)

```
const scrollRestore = history.scrollRestoration
```

### [值](https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration#值)

-   `auto`

    将恢复用户已滚动到的页面上的位置。

-   `manual`

    未还原页上的位置。用户必须手动滚动到该位置。

## [案例](https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration#案例)

### [查看当前页面滚动恢复行为](https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration#查看当前页面滚动恢复行为)

```
const scrollRestoration = history.scrollRestoration;
if (scrollRestoration === "manual") {
  console.log(
    "The location on the page is not restored, user will need to scroll manually.",
  );
}
```

### [防止自动恢复页面位置](https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration#防止自动恢复页面位置)

```
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
```