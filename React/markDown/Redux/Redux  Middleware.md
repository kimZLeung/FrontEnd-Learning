# Redux  Middleware

标签（空格分隔）： React Redux

---

## 上源码:

    import compose from './compose';
    
    export default function applyMiddleware(...middlewares) {            
        return (next)  => 
        (reducer, initialState) => {
        	var store = next(reducer, initialState);
        	var dispatch = store.dispatch;
        	var chain = [];
        	var middlewareAPI = {
        	  getState: store.getState,
        	  dispatch: (action) => dispatch(action)
        	};
        	chain = middlewares.map(middleware =>
        		middleware(middlewareAPI));
        	dispatch = compose(...chain, store.dispatch);
        	return {
        	  ...store,
        	  dispatch
        	};
          };
    }
    
    // compose.js
    export default compose(...funcs) {
        return funcs.reduceRight((composed, f) => f(composed));
    }


----------
## 分析：
> 一开始调用传入的createStore方法创建了store
 在每一个中间件都传进了store的getState方法和dispatch方法
 然后遍历middlewares数组传进参数全部调用一次。获得chain数组
 然后用compose把函数一层一层嵌套起来。最初传入store.dispatch；
 根据redux中间件的链式调用。一直处理action然后最终会发一个正确的action去触发reducer来改变state的状态。
 


----------
## 其实中间件就是一堆扩展dispatch的东西...可以使得store.dispatch的同时来进行很多别的操作，然后获得更多的功能。

---
> 中间件扩展了dispatch。使dispatch可以接受更多的参数。

加入了中间件之后的dispatch过程：

- 用户触发 -> 中间件1 -> 中间件2 -> dispatch action -> reducer -> state change

- 中间件通过next去把改造过或并没有改造的action传到下一个中间件

- 中间件处理过程中再dispatch的话，这个dispatch会从最开始重新调用dispatch，再走一遍中间件