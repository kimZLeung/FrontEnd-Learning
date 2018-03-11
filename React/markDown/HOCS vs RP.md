### HOCS VS Render Props

#### HOCS

- 支持ES6
- 复用性强，HOC是纯函数且返回值仍为组件，在使用时可以多层嵌套，在不同情境下使用特定的HOC组合也方便调试。
- 同样由于HOC是纯函数，支持传入多个参数，增强了其适用范围

但是：

- 当有多个HOC一同使用时，无法直接判断子组件的props是哪个HOC负责传递的。
- 重复命名的问题：若父子组件有同样名称的props，或使用的多个HOC中存在相同名称的props，则存在覆盖问题，而且react并不会报错。当然可以通过规范命名空间的方式避免。
- 在react开发者工具中观察HOC返回的结构，可以发现HOC产生了许多无用的组件，加深了组件层级。
- 同时，HOC使用了静态构建，即当AppWithMouse被创建时，调用了一次withMouse中的静态构建。而在render中调用构建方法才是react所倡导的动态构建。与此同时，在render中构建可以更好的利用react的生命周期。



#### Render Props

> 据说所有的HOCS都可以写成Render Props

- 支持ES6，和HOC一样
- 不用担心prop的命名问题，在render函数中只取需要的state
- 相较于HOC，不会产生无用的空组件加深层级
- 最重要的是，这里的构建模型是动态的，所有改变都在render中触发，能更好的利用react的生命周期。