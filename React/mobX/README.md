## mobX

---

一切都起源于`redux`作者的一句

> unhappy with redux? try mobx

---

`mobX`是什么，和`redux`一样，也是一种状态管理工具，不过用法貌似比`redux`要简单上一点点。

要使用`mobX`，需要配合`mobx`和`mobx-react`两个库。

我们并不需要像写`redux`一样，先建一个`constants`文件夹，然后再建一个`actions`文件夹，然后再建一个`reducers`存放`reducer`，最后要建一个`store`文件夹收拢`reducer`，期间通过函数式编程的纯函数形式替换`store`。

但是`mobx`并不需要这样做，它可以分模块。每个模块里面直接写数据(使用`mobx.observable`)和对其的处理的函数(使用`mobx.action`)，使用`mobx-react`的`Provider`把`store`注入根组件，然后使用`inject`将对应的逻辑注入组件，并用`observe`包装组件，然后组件就可以观察到`mobx`的数据变化并进行更新。

example：

一个mobx的小模块

```
import { observable, action } from 'mobx'
import axios from 'axios'

class Test {
	@observable name = 'haha'
	@observable personList = []

	@action async getList () {
		var res

		res = await axios.get('/api/getList')

		return res.data.list
	}
}

var test = new Test()
export default test
```

汇总的store

```
import test from './test'

export default {
	test,
	...
}

```

app.js

```
import { Provider } from 'mobx-react'
import store from './store'

render(
	<Provider {...store}>
		<App />
	</Provider>,
	document.getElementById('app')
)

```

component/test.js

```
import { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject(stores => ({
	list: stores.test.personList
}))
@observer
class Test extends Component {
	consturctor() {
		super()
	}

	render () {
		const { list } = this.props
		let str = ''
		str += list.filter((person) => {
			return person.age > 10
		})
		.toString()

		return (
			<h1>{ str }</h1>
		)
	}
}
```

---

可以看到`mobx`的应用十分简单，起码比`redux`更加容易上手，并且对于状态管理的操作风格更加像是`Vuex`。关于`mobx`更多的还未了解过，可能比较习惯使用`redux`，但是不可否认的是，生产效率或许会是`mobx`更上一层楼。
