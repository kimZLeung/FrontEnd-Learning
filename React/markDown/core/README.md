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

## React组件的生命周期

> 无状态组件不存在生命周期

- First Render：getDefaultProps -> getInitialState -> componentWillMount -> redner -> componentDidMount
- Unmont: componentWillUnmount
- Second Render: getInitialState -> componentWillMount -> redner -> componentDidMount
- PropsChange: componentWillReceiveProps -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
- State Change: shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate

---

## set State 

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

## diff算法

> 优秀的diff算法让React的Virtual DOM更加快速

React的diff算法通过三个方式简化算法的时空复杂度

- tree diff：对树进行分层比较，两科树只会将同一层级的节点进行比较
- component diff：组件之间的比较，同一类型的组件，按照原策略继续比较；若是不同类型的组件，则判断为dirty Component，替换这个组件下的所有子节点。
- element diff：当节点处于同一层级时，diff提供三种操作，插入、移动（可复用原来的节点）和删除。



说一下element diff的移动操作以及其做的**顺序优化**

> 之间接触到React的列表渲染常常会加入一个key值，之前听说是为了优化渲染。从深层一点的角度来看，这里涉及到了element diff的移动操作。React的源码会在同一层级的节点里面，认识到每个节点的key值，通过这个唯一的key值来判断新旧DOM树中是否存在相同节点，如果是这样的话，React将会对其保留并复用。在移动之前，React会判断这个节点移动之后的位置`if(child._mountIndex < lastIndex)`，否则就不执行移动，`lastIndex`是访问过并匹配到的节点在旧集合中最右的位置，如果新集合中当前访问的节点在旧集合中曾经的位置`_mountIndex`比`lastIndex`大，就是说当前访问的节点在旧集合中就比上一个节点位置靠后，则该节点不会影响其他节点的位置。就不会执行移动操作。
>
> 而当新集合中所有的节点都进行完差异对比后，React还会遍历一遍旧集合，把判断是否还存在新集合中没有但是旧集合中存在的节点，如果有则把其删除掉。

---

## React Patch

> Patch做到的是：Patch就是补丁，也就是将diff算法计算出来的DOM差异队列更新到真实的DOM上面。React实现了计算出全部差异并放入差异队列之后，Patch方法通过这个队列来实现DOM的更新。

