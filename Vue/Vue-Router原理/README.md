## 总结一下Vue-Router的原理吧

### hash模式

> 就是通过`/#/`来实现路由变化的，主要利用了`#`后面的内容不会实际发请求到服务端这个特点

有两个主要方法，是`push`和`replace`

顾名思义就是改变地址栏上的url，但是一个是会加入浏览器的历史，一个不会

- `push`主要是直接重写了`location.hash`实现url的变化
- 而`replace`是利用`location.replace`来实现的

因为是用`hash`来实现，所以我们的url变化可以通过监听window上的`hashchange`事件来实现动态修改应该渲染出来的组件。



那么还有一个问题，我们现在可以修改url还有监听url的改变，而且同时不会发送请求到服务端，那我们如何来实现组件的渲染变化？



---



主要是通过一个`transitionTo `的方法来实现更新的。

>  这个方法就是执行约定的各种钩子以及处理异步组件问题，会通过`updateRoute`更新一个route来触发Vue的实例渲染。

因为这个route的修改会触发到组件内的`_route`属性的变化，而这个属性的变化会触发Vue实例的更新渲染



```js
  // ...
  // 此处通过 Vue 的工具方法给当前应用实例定义了一个响应式的 _route 属性，值就是获取this._router.history.current，也就是当前 history 实例的当前活动路由对象。给应用实例定义了这么一个响应式的属性值也就意味着如果该属性值发生了变化，就会触发更新机制，继而调用应用实例的 render 重新渲染
  Vue.mixin({
    beforeCreate () {
      // 判断是否有 router
      if (this.$options.router) {
        // 赋值 _router
        this._router = this.$options.router
        // 初始化 init
        this._router.init(this)
        // 定义响应式的 _route 对象
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      }
    }
  })
```

---



### history模式

> 跟hash模式不一样，通过更加正常的url`/`来实现路由变化，主要是利用了HTML5提供的`history`的API，因为`history`的API可以修改url而不会发送请求到服务端

- `push`通过调用`history.pushState(stateObject, title, URL)`来实现的
- `replace`则是通过`history.replaceState(stateObject, title, URL)`来实现

而url上产生的变化（如点击后退按钮）会触发window的`popstate`事件，这样可以利用这个事件来实现后退时的变化。

> 由于history模式使用的是原来的url（不是通过hash来实现的单页面），所以直接在地址栏回车，是会把请求发送到服务端的，所以服务端对应需要配合做一个fallback，也就是这个url没有资源的时候，不直接返回404，而是返回index.html