# IFC（Inline formatting context）

---

## 简述

相对于块格式化上下文，在行内格式化上下文中，框( boxes )一个接一个地水平排列，起点是包含块的顶部。 水平方向上的 margin，border 和 padding 在框之间得到保留。 （垂直方向上的margin和padding也有，但是并不会撑开距离）框在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。 包含那些框的长方形区域，会形成一行，叫做行框。

---

## line box

行框表示IFC内行内元素排列的一行的一个框，所以可以说一个 line box 包含有复数个 inline-level box

我们都知道inline-level box 在垂直方向上的高度不是通过`height`属性来决定的，是通过文字`font-size`来撑开决定的，而 line box 的高度最终是由`line-height`决定的。（也就是说`line-height`并不会影响到这个 inline-level box 的高度）


并且如果行内元素旁边存在浮动元素（float）的话，这一行的line box会避开浮动元素，也就是宽度会被压缩

---

## summary

其实我在网上找了很多资料，也不清楚IFC和BFC的具体区别，只知道BFC的创建方法和一些特性，对于IFC的定义十分模糊。感觉上有行内元素存在就会形成IFC的布局。

而且查到的关于IFC的资料上都是大篇幅讲 line box 的高度和宽度。行内元素的高度怎么决定。行内元素垂直方向的对齐问题（各inline-level box根据vertical-align属性值相对各自的父容器作垂直方向对齐）。行内元素换行分成几个 line box 这些点的理论，感觉跟BFC并不是一个完全并列的概念
