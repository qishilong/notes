# document.createDocumentFragment()

## 例子

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .container {
            overflow: hidden;
            width: 550px;
            margin: 0 auto;
        }

        .container .left {
            float: left;
            margin: 0 30px;
        }

        .container select {
            width: 100%;
            height: 200px;
        }

        .container .mid {
            padding-top: 70px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="left">
            <h2>成哥的现任女友</h2>
            <select id="sel1" multiple>
                <option value="1">幂幂</option>
                <option value="2">花花</option>
                <option value="3">春春</option>
                <option value="4">盈盈</option>
                <option value="5">红红</option>
            </select>
        </div>
        <div class="left mid">
            <p>
                <button title="右移动选中的">&gt;&gt;</button>
            </p>
            <p>
                <button title="右移动全部">&gt;&gt;|</button>
            </p>
            <p>
                <button title="左移动选中的">&lt;&lt;</button>
            </p>
            <p>
                <button title="左移动全部">|&lt;&lt;</button>
            </p>
        </div>
        <div class="left">
            <h2>成哥的前女友</h2>
            <select id="sel2" multiple>
                <option value="6">坤坤</option>
            </select>
        </div>
    </div>

    <script>
        const selectLeft = document.getElementById('sel1');
        const selectRight = document.getElementById('sel2');
        const btnRightMove = document.querySelector('button[title = 右移动选中的]')
        const btnLeftMove = document.querySelector('button[title = 左移动选中的]')
        const btnRightAllMove = document.querySelector('button[title = 右移动全部]')
        const btnLeftAllMove = document.querySelector('button[title = 左移动全部]')

        const fragElement = document.createDocumentFragment();

        const moveFn = (originElement, targetElement) => {
            const children = originElement.children;
            for (let i = 0; i < children.length; i++) {
                if (children[i].selected === true) {
                    children[i].selected = false;
                    fragElement.appendChild(children[i]);
                    i--;
                    // 在 for 循环过程中，每进行一次 fragElement.appendChild(children[i]); children 的长度就会减 1，但此时 i 的值已经加 1，所以为了和 children 中的元素对应上，要进行减 1 操作
                    // 使用 document.getElementById() 方法获取的 Node 元素是实时的
                }
            }

            // 使用 while 循环
            // let i = 0;
            // while (children.length > 0 && i < children.length) {
            //     if (children[i].selected === true) {
            //         children[i].selected = false;
            //         fragElement.appendChild(children[i]);
            //         i--;
            //     }
            //     i++;
            // }
            targetElement.appendChild(fragElement);
        }

        const moveAllFn = (originElement, targetElement) => {
            const children = originElement.children;
            for (let i = 0; i < children.length; i++) {
                fragElement.appendChild(children[i]);
                i--;
            }

            // 使用 while 循环
            // while (children.length > 0) {
            //     fragElement.appendChild(children[0]);
            // }

            targetElement.appendChild(fragElement);
        }

        btnRightMove.onclick = () => moveFn(selectLeft, selectRight);
        btnLeftMove.onclick = () => moveFn(selectRight, selectLeft);

        btnRightAllMove.onclick = () => moveAllFn(selectLeft, selectRight);
        btnLeftAllMove.onclick = () => moveAllFn(selectRight, selectLeft);

    </script>
</body>

</html>
```

