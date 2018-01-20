## 简述

---

### 浏览器的渲染过程

> 下载HTML文件，对HTML文件进行解析，构造DOM树，遇到link标签下载CSS文件，进行CSS下载，CSS的下载不会阻塞DOM的解析，但是会阻塞render Tree的合成，也就是会阻塞页面渲染，因为CSS构造出的CSS RULE Tree会与DOM Tree合成为render Tree，也就是会影响到最终排版渲染出来的实际页面。遇到script进行JS的下载，JS的下载会阻塞DOM的解析，因为JS可以通过DOM API来对DOM树进行修改。而且JS下载运行前会触发一次页面的渲染，因为JS除了可以修改DOM之外还可以动态修改DOM上面的style，甚至可以取得DOM上的Class的样式，所以每次遇到JS解析浏览器时会收到一次绘制请求，会渲染一遍页面。

- CSS会阻塞渲染页面，不会阻塞DOM解析
- JS会阻塞DOM的解析
- JS进入下载解析前，浏览器会收到一次绘制请求。会渲染一遍页面
- 当CSS正在阻塞页面渲染的同时，DOM解析到JS，需要渲染一遍页面（即等待CSS RULE Tree构建完成并和DOM Tree结合），同时阻塞住DOM的解析，但是CSS在阻塞页面的渲染，所以这个时候需要等到CSS下载完，触发一遍渲染，然后才可以开始解析JS，解析完JS后才可以继续DOM的解析。
- 现代浏览器还有一个（speculative loading）的功能，这个功能的作用具体就是：JS阻塞DOM解析的时候，浏览器还可以通过一个解析器继续查看后续的DOM结构，并且把后续的资源（link标签，script标签，img标签之类的）下载下来。

---

### script标签的defer和async的比较

```html
<script src="haha.js" defer></script>
<script src="haha.js" async></script>
```

- 相同之处在于，两个属性都可以让JS的下载与DOM的解析同步，即下载JS不会阻塞DOM的解析
- 不同之处在于，`defer`不会让script的执行顺序乱掉，而且JS的执行将会被推到浏览器触发`DOMContentLoaded `事件的时候。而`async`则是会在下载完JS之后马上执行，所以有可能会让script的执行顺序乱掉。



---

- [CSS和JS在网页中的放置顺序](http://www.jianshu.com/p/0291ad9ac8fb)
- [浏览器的渲染：过程与原理](https://zhuanlan.zhihu.com/p/29418126)
- [了解html页面的渲染过程](http://www.cnblogs.com/yuezk/archive/2013/01/11/2855698.html)



