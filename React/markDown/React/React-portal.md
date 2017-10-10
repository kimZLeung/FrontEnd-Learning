# ReactDOM.createPortal

---

## Usage

`ReactDOM.createPortal(child, container)`

一般来说，这个方法使用在组件的`render`方法的返回值里面

```
Class PortalExm extends React.Component {
	constructor(props) {
		super(props)
		this.el = document.createElement('div')
	}

	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this.el
		)
	}
}
```

可以看到我们会在把`ReactDOM.createPortal`的返回值作为`render`方法的返回值，这是基本的用法

---

## 特性

当我们使用`ReactDOM.createPortal`作为`render`方法的返回值的时候，我们把这个组件渲染出来，这个组件并不会挂载到我们提供的节点上，所以我们一般的做法是

```
const modalRoot = document.getElementById('modal-root')

Class PortalExm extends React.Component {
	constructor(props) {
		super(props)
		this.el = document.createElement('div')
	}

	componentDidMount() {
		modalRoot.appendChild(this.el)
	}

	 componentWillUnmount() {
	 	modalRoot.removeChild(this.el)
	 }

	render() {
		return ReactDOM.createPortal(
			this.props.children,
			this.el
		)
	}
}
```

我们一般在这个组件的生命周期函数里面通过动态操作DOM来使这个组件插入到我们的DOM树里面

> 值得注意的是：虽然我们挂载到了别的DOM节点上面，但是我们在这个组件里面触发的事件依然可以冒泡到我们的父组件上面。[try it](https://codepen.io/gaearon/pen/jGBWpE)

---

## summary

因为这个`ReactDOM.createPortal`方法可以把组件渲染去别的DOM节点，所以其实常用于实现模态框（Modal）这一类需要覆盖为最高层级的DOM节点的组件实现。

---

## 参考：

[React v16.0.0 - Portals](https://reactjs.org/docs/portals.html)
