# Decorator

---
## 类的Decorator
> 一句话

``` javascript
const decorator = (target) => {
  target.lala = 'lala'
}

@decorator
class A {
  constructor() {

  }
}

// 以上代码等价于
class A = decorator(A) || A
```

> 结合在React组件上的话decorator的情况会复杂一点。不过很多东西都封装好了。比如[`connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)和[`asyncConnect`](https://github.com/Rezonans/redux-async-connect)都可以直接传入参数拿返回的函数当装饰器用

---
## 属性的Decorator
> 情况比类复杂一点，用`Object.defineProperty`实现。

``` javascript
const methodDecorator = (target, name, descriptor) => {
  descriptor.writable = false
  return descriptor
}

class B = {
  constructor() {
    super()
  }

  @methodDecorator
  lala() {
    console.log('~~~')
  }

  // 等价于
  let descriptor = {
    value: method,
    enumerable: false,
    configurable: true,
    writable: true
  }

  descriptor = readonly(Class.prototype, 'method', descriptor) || descriptor

  Object.defineProperty(Class.prototype, 'method', descriptor)
```

属性装饰器的装饰器函数有三个参数，第一个是类，第二个是属性名，第三个是一个配置对象，第三个参数里面包含的是这个属性的配置特性，可以用这个来修改这个属性的特性。原理也是通过`Object.defineProperty`来实现的
