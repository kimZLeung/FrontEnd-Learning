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

> Virtual DOM 模型通过`createElement`创建Virtual DOM虚拟元素，创建出虚拟元素之后，就要创建组件了
