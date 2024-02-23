# quotes

**`quotes`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性用于设置引号的样式。

## 尝试一下

<iframe class="interactive is-default-height" height="200" src="https://interactive-examples.mdn.mozilla.net/pages/css/quotes.html" title="MDN Web Docs Interactive Example" loading="lazy" data-readystate="complete" style="box-sizing: border-box; border: none; max-width: 100%; width: 765.703px; background-color: var(--background-secondary); border-radius: var(--elem-radius); color: var(--text-primary); height: 375px; margin: 1rem 0px; padding: 0px;"></iframe>

## 语法

```css
/* Keyword value */
quotes: none;

/* <string> values */
quotes: "«" "»"; /* Set open-quote and close-quote to the French quotation marks */
quotes: "«" "»" "‹" "›"; /* Set two levels of quotation marks */

/* Global values */
quotes: inherit;
quotes: initial;
quotes: unset;
```

### 值

-   [`none`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/quotes#none)

    [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 属性的值 `open-quote` 和 `close-quote` 将不会展示引号。

-   [`auto`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/quotes#auto)

    用适当的引号，基于在所选元素上设置的任何语言值（例如，通过 [`lang`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#lang) 属性）。

-   [`[ \]+`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/quotes#string_string)

    一组或者多组 [``](https://developer.mozilla.org/zh-CN/docs/Web/CSS/string) 的值对应 `open-quote` and `close-quote`. 第一对表示引号的外层，第二对表示第一个嵌套层，下一对表示第三层，依此类推。

### 形式语法

```
quotes = 
  auto                    |
  none                    |
  match-parent            |
  [ <string> <string> ]+  
```

## 示例

### 基本用法

#### HTML

HTMLPlayCopy to Clipboard

```
<q>To be or not to be. That's the question!</q>
```

#### CSS

CSSPlayCopy to Clipboard

```
q {
  quotes: '"' '"' "'" "'";
}
q::before {
  content: open-quote;
}
q:after {
  content: close-quote;
}
```

#### 结果

![image-20240223123413090](https://qiniucloud.qishilong.space/images/image-20240223123413090.png)

### 自动选择引号

#### HTML

```CSS
<div lang="fr">
  <q>Ceci est une citation française.</q>
  <div>
    <hr />
    <div lang="ru">
      <q>Это русская цитата</q>
      <div>
        <hr />
        <div lang="de">
          <q>Dies ist ein deutsches Zitat</q>
          <div>
            <hr />
            <div lang="en">
              <q>This is an English quote.</q>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### CSS

```CSS
/*q {
  quotes: auto;
}*/
```

#### 结果

![image-20240223123446177](https://qiniucloud.qishilong.space/images/image-20240223123446177.png)

## 备注

-   对于大多数浏览器，引号的默认值始终为 auto（Firefox 70+），否则浏览器具有此默认行为（Chromiums，Safari，Edge），因此上面的示例可以在不显式设置的情况下工作。
-   从 Firefox 3.5 开始，可以使用 `-moz-initial`读取 quotes 属性的初始值，这在 Firefox 的早期版本中是不可能的。