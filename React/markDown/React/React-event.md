# React事件机制

---

React有一套自己实现好的事件机制，与原生的事件机制的并不相同。

```
render () {
	return (
		<div>
			<button onClick={(e) => {console.log(e)}}>Click</button>
		</div>
	)
}
```

我们通常都是通过这样`onClick`在JSX里面实现React的事件绑定。


React底层对事件的处理是这样的：

> React会把props里面注册的事件收集起来，注册到自己实现的`EventPluginHub`里面，也就是把回调函数通过根据事件类型、component对象的_rootNodeID为两个key注册上去，然后其实React会把事件的触发放在`document`上，每当我们在页面上进行交互操作，我们的操作会冒泡到`document`的时候，React才会监听到我们触发的行为，并且去通过`document`回调起一个`handleTopLevelImpl`的函数进行事件的分发。分发事件，根据触发事件的React组件，进行React组件的事件冒泡，也就是子组件把事件冒泡到父组件（虽然所有的事件都是在原生的DOM树冒泡到`document`才触发的，但是这个React组件里面的冒泡是React自行实现的）

---

## 比较坑的地方

当我们同时使用原生的DOM事件和React的合成事件的时候，我们就会遭遇到诸如无法阻止事件冒泡之类的情况，因为React的合成事件都是通过冒泡到`document`才触发的，所以我们在`document`上监听的事件也会触发到。
