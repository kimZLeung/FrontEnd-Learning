# 看到一个有趣的东西（immutable）

标签（空格分隔）： immutable

---
## 初步认识一下
---

## What is immutable Data
> immutable的data十分顽固。一旦创建出来就不会再被修改。如果对immutable的数据进行修改，原数据并不会改变。但是对这种数据进行修改的话，会返回一个新的数据。

- 关于新数据：新数据只会修改已被修改的节点（数据）和这个被这个节点（数据）影响的节点（数据）。其他的数据都指向旧数据。

## 也就是说新数据并不是全新的，而是部分指向旧数据的。

---
## 用途

> 在React的diff算法中，（diff算法用于React的shouldComponent()）就是用于判断组件是否应该重新渲染的这个巨厉害的算法里面，Immutable提供了简洁高效的判断数据是否变化的方法

- 不要deepCopy也不需要deepCompare。
- 只需要immutable。厉害了。


> 其实Redux的纯函数返回新的store也跟这个immutable的数据结构有点相似。

