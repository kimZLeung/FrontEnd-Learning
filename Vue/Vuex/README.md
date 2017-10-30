## Vuex源码理解

---

## 先说Vue的install方法

```
// 使用vuex

Vue.use(vuex)

new Vue({
    el: '#app',
    store
})

```

Vue的`use`方法通过调用vuex（所use的插件的`install`方法）的`install`方法把插件装载入Vue，而`install`方法会把`vuexinit`方法放到我们每一个new出来Vue实例的之前执行（比如`beforeCreate`钩子），而`vuexinit`方法很简单，简单来说就是对我们的Vue组件作一个`$store`的处理

```
function vuexInit () {
	const options = this.$options
	if (options.store) {
		// 如果options里面有store，则证明这个是根节点，直接使用我们传入的vuex实例，或者如果传入的是一个函数，则会执行并取到它的返回值
		this.$store = typeof options.store === 'function'
		? options.store()
		: options.store
	} else if (options.parent && options.parent.$store) {
		// 如果没有，则直接使用父节点的$store
		this.$store = options.parent.$store
	}
}
```

而vuex的构造函数比较简单

```

...

// 绑定dispatch和commit的上下文到store自身
this.dispatch = function boundDispatch (type, payload) {
	return dispatch.call(store, type, payload)
}
this.commit = function boundCommit (type, payload, options) {
	return commit.call(store, type, payload, options)
}

...

// 比较重点的两个方法

// 递归初始化所有module
installModule(this, state, [], this._modules.root)

// 新建Vue对象使用Vue自身的computed实现getter和state的绑定
resetStoreVM(this, state)

...

```


---

## installModule

这里主要注册了vuex所需要的mutation，action，getter，和子module

```

...

// 在这里判断如果不是根module
if (!isRoot && !hot) {
	// 获取父级module的state
	const parentState = getNestedState(rootState, path.slice(0, -1))
	const moduleName = path[path.length - 1]
	store.`_withCommit`(() => {
		// 把子module的state通过moduleName设置到父级的state
		Vue.set(parentState, moduleName, module.state)
	})
}

// 遍历注册mutation
module.forEachMutation((mutation, key) => {
	const namespacedType = namespace + key
	registerMutation(store, namespacedType, mutation, local)
})

// 遍历注册actio
module.forEachAction((action, key) => {
	const namespacedType = namespace + key
	registerAction(store, namespacedType, action, local)
})

// 遍历注册getter
module.forEachGetter((getter, key) => {
	const namespacedType = namespace + key
	registerGetter(store, namespacedType, getter, local)
})

// 递归安装mudule
module.forEachChild((child, key) => {
	installModule(store, rootState, path.concat(key), child, hot)
})

...

```

---

## resetStoreVM

通过新建一个Vue实例，用Vue实现的computed属性令getter和state的数据同步。之前我们registerGetter已经把getter包装好放在了`store._wrappedGetters`里面了，然后我们在这个函数里面把getter取出来。进行封装。

这个函数在resetStore也会调用，用于重设`store._vm`

```
...

const wrappedGetters = store._wrappedGetters

// 把getters的get属性重定义一下，使我们访问这个属性的时候直接去访问store._vm属性上的某个值
forEachValue(wrappedGetters, (fn, key) => {
	// 这里通过把store传入fn，执行封装好的wrappedGetters的高阶函数，通过闭包保存store和local的数据，令后面写Getter的时候能够直接通过参数访问state
	computed[key] = () => fn(store)
	Object.defineProperty(store.getters, key, {
		get: () => store._vm[key],
	})
})

// 将一个Vue对象放到store._vm属性上，可以通过store._vm属性访问到我们设置好的属性
store._vm = new Vue({
	data: {
	  $$state: state
	},
	computed
})

...

```

---


