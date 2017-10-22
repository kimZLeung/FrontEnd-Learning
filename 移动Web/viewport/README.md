## 移动端UI适配viewport

---

## 三种viewport

- layout viewport：是默认使用的viewport（也就是不指定meta标签时候使用的）。一般移动设备的浏览器都默认设置了一个viewport 元标签，定义一个虚拟的layout viewport（布局视口），用于解决早期的页面在手机上显示的问题。为了适配显示网页，这个viewport会比手机的屏幕大上许多，用户需要横拉才能浏览到完整的页面内容，而且viewport里面的元素会很小，毕竟是手机显示。这样不会破坏没有针对手机浏览器优化的网页的布局，用户可以通过平移和缩放来看网页的其他部分。
- visual viewport：也就是手机屏幕能看到的那一块视口
- ideal viewport：设置了meta标签后viewport会计算成为ideal viewport。指定了之后view port会自动变得适配手机端，不需要用户进行横拉，而且元素的大小与电脑显示器的差不多，专门为移动端的页面设计一套UI便可适配移动端。

---

## viewport的属性

[参考](http://www.css88.com/archives/5975)

|属性名|取值|描述|
|-----|-----|-----|
|width|	正整数 或 device-width|定义视口的宽度，单位为像素|
|height|正整数 或 device-height|定义视口的高度，单位为像素，一般不用|
|initial-scale|[0.0-10.0]|定义初始缩放值|
|minimum-scale|[0.0-10.0]|定义缩小最小比例，它必须小于或等于maximum-scale设置|
|maximum-scale|[0.0-10.0]|定义放大最大比例，它必须大于或等于minimum-scale设置|
|user-scalable|yes/no|定义是否允许用户手动缩放页面，默认值yes|

---

不过这样使用`ideal viewport`来做适配手机端的页面的话，的确与PC端需要一套不同的UI，因为`viewport`的宽度不同了，所以布局也会完全不一样。
