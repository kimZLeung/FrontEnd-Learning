# line-height

---

## 概述

`line-height`这个属性之前没有过多去关注。其实它作用在块级元素和内联元素上是不同的。

作用在块级元素上：块级元素靠设置`height`顶开高度，但是如果没有设置`height`，我们依然可以把它顶开，如果一个标签没有定义height属性(包括百分比高度)，那么其最终表现的高度一定是由line-height起作用。所以我们其实也可以直接给这个块级元素设置它的`line-height`，通过`line-height`让下面的文字（inline-level box）撑开块级元素

作用在内联元素上：内联元素在我们设置`line-height`的时候无法帮我们撑开高度，但是我们这一行的 line box 就是使用`line-height`作为高度的，而且line box可以为inline-level box撑开空间（就算看不见），而 line box 也决定了我们很麻烦的一个属性，vertical-align（垂直对齐）的效果
