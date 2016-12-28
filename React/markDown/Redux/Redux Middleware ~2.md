# Redux Middleware ~2

标签（空格分隔）： redux middleware

---

## applyMiddleware的两种用法

- 第一种用法

        const store = createStore(
          reducer,
          applyMiddleware(...middleware)
        )
    
- 这是另一种用法

        const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, historyMiddleware, loggerMiddleware)(createStore);
        const store = createStoreWithMiddleware(rootReducer, initialState);

---
## 理解

> 起初我对这两种用法产生了疑惑，通过看applyMiddleware和createStore的源码清楚了这两种用法的意义

- 第一种用法是通过createStore内部的一个判断机制

          if (typeof enhancer !== 'undefined') {
            if (typeof enhancer !== 'function') {
              throw new Error('Expected the enhancer to be a function.')
            }
        
            return enhancer(createStore)(reducer, preloadedState)
          }
这个判断机制使得当调用createStore传入第三个参数的时候会检测第三个参数是否为函数类型，如果是便调用，然后就是通过直接调用`applyMiddleware`返回的函数，通过闭包访问到之前传进去`applyMiddleware`的中间件，然后对返回的store的`dispatch`进行中间件包装处理

- 第二种用法是通过先调用`applyMiddleware`传入中间件，然后直接调用返回的函数，传入`createStore`这个函数，然后还是会返回一个函数...先上代码

        export default function applyMiddleware(...middlewares) {
            return (createStore) => (reducer, preloadedState, enhancer) => {
                // ...
            }
        }

从上面的源码看到的是传入一个`middleware`的数组，再传入一个`createStore`然后返回的是一个类似`createStore`的函数，这个函数传入的参数和`createStore`一个样。但是里面是对`createStore`的一种增强包装，它会先调用`var store = createStore(reducer, preloadedState, enhancer)`来创建一个`store`，然后再通过一些操作，通过闭包访问之前的中间件，用于增强这个`store`的`dispatch`
最后返回的依然是一个

    return {
      ...store,
      dispatch
    }
    
这个东西通过`ES7`的扩展运算符解构了对象然后用新的`dispatch`覆盖了旧的`dispatch`

> 从而返回了一个新的`store`,完成`createStore`的增强

