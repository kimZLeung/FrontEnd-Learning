# BFC（Block formatting context）

---

## 简述

BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

BFC的规则：

- 内部的 Box 会在垂直方向，一个接一个地放置。
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠.
- 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC 的区域不会与 float box 重叠。
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算 BFC 的高度时，浮动元素也参与计算。

---

## 创建BFC

- float：属性不为none
- position：属性为absolute或者fixed
- display：属性为table-cell, table-caption, inline-block, flex, inline-flex
- overflow：属性不为 visible

---

## BFC的应用

- 消除外边距合并：当块级父元素与块级子元素的margin之间没有padding和border隔开的话，他们的margin会进行合并，这个时候把父元素变为一个BFC之后，他就可以不跟子元素合并margin
- 清除浮动：父元素包含一个浮动的元素，那个浮动的元素因为脱离文档流所以会撑不开父元素，然而当我们把父元素设置为BFC之后，因为计算 BFC 的高度时，浮动元素也参与计算。，自然可以清除浮动
- 避免遮挡浮动元素：因为BFC 不会与 float box 元素重叠

