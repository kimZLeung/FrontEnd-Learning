# 关于ReactRouter

标签（空格分隔）： router

---

## ReactRouter
> `React`和`Vue`这两个框架实在有太多太多相似的地方...`Router`也几乎一模一样。对应的功能都能在框架里面利用不同的接口实现。

---
## 再次看了下ReactRouter
### 关于Router的Hook
- 关于`React`路由的`hook`分成两种

    - 一种是挂在Route组件上的判断进出路由的`onEnter`和`onLeave`，有参数`nextLocation`和`replace`。`replace`可以用于`history.replace`做重定向什么的。`nextLocation`是下一个路由的对象
    - 另一种是挂在本身组件上的需要通过`mixins`加进去的`routeWillLeave`的钩子，会在跳转前确认，参数是`nextLocation`（同上），`return false`可以阻止跳转。
    
> 题外话：稍微提一下`VueRouter`的Hook函数。基本也是分这几种情况。挂在路由上或者挂在组件上。但是`Vue`的Hook函数有三个参数，一个是`to`，下一个路由对象，一个是`from`，本身的路由对象，还有一个是`next`，这是一个方法，在函数中需要调用这个`next`方法，不然`Hook`不会执行完毕。直接调用`next()`什么不干，调用`next(false)`会中断跳转，调用`next({path: '/'})`重定向到根路由。也就是说不同的参数会带来不同的后果，`that's all`

### ReactRouter的动态路由
> `ReactRouter`的动态路由和`VueRouter`的懒加载十分相似，都是秉承着大型项目需要对JS进行按需加载，不要一次性加载所有的组件的问题

`ReactRouter`提供了3个方法
- `getChildRoutes`
- `getIndexRoute`
- `getComponents`

这三个方法都是异步执行的，而且都是要等到访问该路由的时候才会执行。函数里面采用了AMD的写法进行异步加载

    // 某个Route组件
    getComponents(location, callback) {
        require.ensure([], function (require) {
          callback(null, require('./components/Course'))
        })
    }

