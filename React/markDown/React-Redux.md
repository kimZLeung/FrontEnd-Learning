# React-Redux

标签（空格分隔）： React

---

## connect方法
- 参数mapStateToProps -> function(state, [ownProps])
    - 如果定义了这个参数，就相当于动态把store和props绑定了，只要store改变了就会调用mapStateToProps
    - 第二个可选参数ownProps，指代传入到组件的Props

---

- 参数mapDispatchToProps(dispatch, [ownProps])
    - 如果传递一个对象，对象上的函数将会被触发为action creator（也就是说这些action creator会自动dispatch），而且这些方法会作为属性名合并到Props中
    - （一般情况）如果传递的是一个函数，组件的Props将会获得其返回的对象的键作为Props的属性。

---

- mergeProps(stateProps, dispatchProps, ownProps)
    - 这个参数是一个函数，这个函数相当于一个把关Props传递过程的东西。如果省略了这个参数，默认就是返回Object.assign({}, ownProps, stateProps, dispatchProps)...也就是默认把传入的Props，和一个从state拿到的Props，和一个从dispatch拿到的Props的actioncreator都合并到Props上去。

---

- 最后还有一个option配置对象的参数，有两个可用的属性
    - 一个是pure，默认为true。简单来说就是当前connect的组件是一个纯组件的话，会执行一个是否重新渲染的判断来避免组件的多次重新渲染。
    - 一个是withRef，默认为false。如果设为true，connector会保存对被包装组件的实例的引用。然后通过实例的方法getWrappedInstance()获得。
    








--- 
## 还有一个bindActionCreators
> 这波比较关键

- 这个方法可以把action creators转化成对象。然后对象的键就是函数名，然后值就是这个action creator，然后被dispatch包起来了

## 参数
 - actionCreators **(fn or obj)**
    - 一个action creator或者是键值对是action creators的对象 
 - dispatch
    - 没啥好说的就是store.dispatch
    
---

### 参考资料：
 1. [bindActionCreators][1]
 2. [阮一峰redux入门（3）][2]
 3. [react-redux API][3]




  [1]: http://cn.redux.js.org/docs/api/bindActionCreators.html
  [2]: http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
  [3]: http://cn.redux.js.org/docs/react-redux/api.html