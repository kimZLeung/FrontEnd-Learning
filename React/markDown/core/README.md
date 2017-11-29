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

### setState API

