# js 阻止事件冒泡

今天我做了一实验，想要实现当一个div嵌套另外一个div的时候，点击外层div的时候触发事件，而点击内层div的时候不进行事件触发，代码如下：

![img](https:////upload-images.jianshu.io/upload_images/3360875-cd8fc41086d59070.png?imageMogr2/auto-orient/strip|imageView2/2/w/415/format/webp)

原本我想着只给容器ct添加一个事件而不给其内的子元素添加事件，就能实现我的效果，结果后来意识到内层的div也属于容器ct的一部分，这样做无论点击容器部分还是内层div都会触发效果：



![img](https:////upload-images.jianshu.io/upload_images/3360875-ecf1fa3ba8a78d6a.png?imageMogr2/auto-orient/strip|imageView2/2/w/716/format/webp)

然后我心想如果能把外层ct容器和内层的div分辨出来不就可以了吗，然后接产生了解决方案一：

### 解决方案一：获取事件触发的实际目标(target)

1. 我给事件处理函数添加了事件参数e，获取到了e.target，然后对e.target的特征(class)进行了判断，判断如果是内层div就不进行事件触发，确实达到了我想要的效果，代码如下：

    ![img](https:////upload-images.jianshu.io/upload_images/3360875-13d8c04cb6b961b2.png?imageMogr2/auto-orient/strip|imageView2/2/w/433/format/webp)

2. 后来发现并没有解决实际的问题，假如有很多个内层div，并且每一个div的class都是不一样的，或者内层div里面又有嵌套元素的话这个方法就不生效了：

    ![img](https:////upload-images.jianshu.io/upload_images/3360875-415adc89d6b7b74c.png?imageMogr2/auto-orient/strip|imageView2/2/w/927/format/webp)

于是我又想到前两天学习了一下关于DOM事件传播的机制，在DOM2级事件流中包含事件捕获和事件冒泡两个阶段，其中触发事件处理程序时，事件传播先是进入事件捕获阶段，事件由外层向内层具体元素传播，然后进入事件冒泡阶段，由内层具体元素再向外层进行传播，事件的处理默认是在冒泡阶段，如下图所示：



![img](https:////upload-images.jianshu.io/upload_images/3360875-fed31c1a22bf231f.png?imageMogr2/auto-orient/strip|imageView2/2/w/236/format/webp)

dom2级事件流

其中event对象中有一个方法是`stopPropagation()`，可以利用这个方法阻止事件的传播，然后我就想着能不能用用这个方法来阻止事件的捕获，在容器ct的点击处理程序上添加`stopPropagation()`，`addEventListener`第三个参数设置为true，让事件处理发生在容器ct的捕获阶段，不向更具体的内层元素进行传播，结果发现我又踩坑了：原因是**事件捕获是不能被阻止的**，否则定位不到具体的元素；

那么只能采用阻止事件冒泡的方法来达成效果，于是出现了解决方案二：

### 解决方案二：阻止事件冒泡

首先理顺一下思路，因为我不想容器ct的子元素触发容器ct的事件，所以当我点击容器ct子元素时，事件进入捕获阶段，传播路径如下：



```css
Document  →   html   →   body   →   div#ct   →   div.a   →   div.c
```

然后是冒泡并且执行处理方法的阶段：



```css
div.c(触发ct事件)  →   div.a(触发ct事件)   →   div#ct(触发ct事件)   →   body   →   html   →   Document
```

理清了这个思路后问题就变得简单了，我们只要获取到了ct子元素div.a，然后给它单独添加`stopPropagation()`阻止事件冒泡，与此同时容器ct本身的事件触发不变动，就能达成效果，代码如下：

![img](https:////upload-images.jianshu.io/upload_images/3360875-9848200582101868.png?imageMogr2/auto-orient/strip|imageView2/2/w/356/format/webp)



这样子就能彻底解决方案一所出现的问题了。



作者：大春春
链接：https://www.jianshu.com/p/e8599da7c69d
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。