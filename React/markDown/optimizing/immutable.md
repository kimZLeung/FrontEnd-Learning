# immutable

---

## PureComponent

`React`官方提供的`PureComponent`用作优化不必要的DOM更新，`PureComponent`重写了Component的一个
`shouldComponentUpdate`方法

``` javascript
shouldComponentUpdate(nextProps, nextState) {
	if (this.props.color !== nextProps.color) {
		return true;
	}
	if (this.state.count !== nextState.count) {
		return true;
	}
	return false;
}
```

使用类似的方法对组件的prop和state进行浅比较(具体比较方式不清楚)，如果没有变化则选择不重新渲染。

由于使用浅比较的形式，所以我们可以通过`concat`，扩展运算符`...`，`Object.assign`这些函数来返回新的对象，从而修改之后触发更新。或者说：我们使用`immutable`数据类型来作为组件内的数据


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
- 不用看第二点
- 因为在没有使用`immutable`这种数据结构优化之前，`React`通过使用自己的`diff`算法判断前后两次的虚拟`DOM`是否有发生变化从而更新渲染的。并且，只要`state`有变动，就算数据没变过，也会执行`rerender`，所以这个时候我们就需要使用`shouldComponentUpdate`优化并减少渲染次数。
- 在引入`immutable`之后，可以大大减少不必要的数据变动的渲染，在`state`使用了`immutable`之后，判断只需要这样 ↓

``` JavaScript
shouldComponentUpdate(nextProps, nextState) {
  if (this.state !== nextState) {
    return true
  } else {
    return false
  }
}
```

虽然看起来每次进行修改会出创建出一个新的对象，这样的开销貌似比直接修改原对象会大很多。

但是事实并非如此：上面也提到，虽然是新对象，但是没有被修改到的属性和分支其实仍然是原来的属性，并没有完全创建一个全新的对象。

`immutable`配合`React`进行虚拟`DOM`的优化，会使`React`的组件更新渲染快上一个档次。


> 其实Redux的纯函数返回新的store也跟这个immutable的数据结构有点相似。

