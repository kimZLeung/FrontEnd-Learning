## React源码笔记

---

## Virtual DOM

> Virtual DOM中的节点分为三种，分别为：ReactElement，ReactFragment，ReactText。ReactElememt又可以分为ReactComponentElement和ReactDOMElement

```
/* 以下为React Virtual DOM的基本数据类型 */
ReactDOMElement = {
	type: string,
	props: {
		children: ReactNodeList,
		className: string,
		etc.
	},
	key: string | boolean | number | null,
	ref: string | null
}

ReactComponentElement = {
	type: ReactClass<TProps>,
	props: TProps,
	key: string | boolean | number | null,
	ref: string | null
}

ReactFragment = Array<ReactNode | ReactEmpty>

ReactNodeList = ReactNode | ReactEmpty

ReactText = string | number

ReactEmpty = null | undefined | boolean
```

---

## 创建上述元素 - createElement

以上的Virtual DOM都是由我们平时写的JSX转化过来的。`React`有一个函数叫`createElement`，它就是负责把JSX转化后的代码生成Virtual DOM的。

`createElement`接受JSX转化过来的参数之后，对其进行一系列处理，最后调用`ReactElement`构造函数构造出React元素

---

## 初始化组件

> Virtual DOM 模型通过`createElement`创建Virtual DOM虚拟元素，创建出虚拟元素之后，就要创建组件了上面也提到了`ReactNode`分为ReactElement，ReactFragment，ReactText。分别说下这几种转化为组件


### 文本组件

在源码中通过`ReactDOMTextComponent`创建文本组件


### DOM标签组件

要创建DOM标签组件，源码中通过使用`createOpenTagMarkupAndPutListeners`来处理DOM节点上的属性和事件，在这个函数中，React会通过

- `enqueuePutListener`添加事件
- `CSSPropertyOperations.createMarkupForStyles`创建样式
- `DOMPropertyOperations.createMarkupForProperty`创建属性
- `DOMPropertyOperations.createMarkupForID`创建唯一标识

然后是关于DOM标签组件的更新

> 更新组件分为两个阶段

- 第一个阶段是删除无用的旧属性
- 第二个阶段是更新新的属性

> 一个更复杂的过程是对子组件的更新，也是两个阶段

- 第一个阶段是删除不需要的子节点和内容
- 第二个阶段是更新子节点和内容


---

### React组件的生命周期

> 无状态组件不存在生命周期

- First Render：getDefaultProps -> getInitialState -> componentWillMount -> redner -> componentDidMount
- Unmont: componentWillUnmount
- Second Render: getInitialState -> componentWillMount -> redner -> componentDidMount
- PropsChange: componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
- State Change: shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

---

### setState 

> setState在一些情况下是异步的，在一些情况下是同步的

```js
componentDidMount () {
  this.setState({
    value: this.state.val + 1
  })
  console.log(this.state.val)
  
  this.setState({
    value: this.state.val + 1
  })
  console.log(this.state.val)
  
  setTimeout(() => {
    this.setState({
      value: this.state.val + 1
    })
    console.log(this.state.val)
    
    this.setState({
      value: this.state.val + 1
    })
    console.log(this.state.val)
  })
}
```

以上这个例子会顺序打印出来0,0,2,3

> 我一开始对这个十分疑惑，因为我之前了解到的关于setState这个方法的解释是：这个方法是异步的，立马在setState方法后面通过this.state访问本组件的state的话，我们访问到的是更新前的state。这符合前两个打印出来的数据，但是为什么第三个和第四个会分别打印2和3？

书本上说的是：`setState`这个方法，实际上是调用`enqueueSetState`，最终调用`enqueueUpdate`来执行state更新。在`enqueueUpdate`中，React通过判断一个自己维护的状态量`batchingStrategy.isBatchingUpdates`来判断是否正在处于更新状态，如果是则不会进行立即更新，而会把组件推进一个`dirtyComponents`的队列里面等待一起更新。如果不是则会立即更新（应该就是所谓的同步刷新组件）

> 之前我尝试过在自定义的方法里面使用`setState`更新state。并把其挂载到一个组件的合成事件上，这个更新也是异步的。可能`setTimout`里面调用`setState`让其成为同步刷新组件是一种特殊情况吧。

---

### diff算法

> 优秀的diff算法让React的Virtual DOM更加快速

React的diff算法通过三个方式简化算法的时空复杂度

- tree diff：对树进行分层比较，两科树只会将同一层级的节点进行比较
- component diff：同一类型的组件，按照原策略继续比较；若是不同类型的组件，则判断为dirty Component，替换这个组件下的所有子节点。
- element diff：当节点处于同一层级时，diff提供三种操作，插入、移动和删除。

