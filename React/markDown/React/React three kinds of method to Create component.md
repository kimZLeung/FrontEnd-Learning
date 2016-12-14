# React three kinds of method to Create component

标签（空格分隔）： React 初始化组件

---

## 无状态组件 function Cmp() {}
> 它是为了创建纯展示组件，这种组件只负责根据传入的props来展示，不涉及到要state状态的操作。无状态函数式组件形式上表现为一个只带有一个render方法的组件类，通过函数形式或者ES6 arrow function的形式在创建，并且该组件是无state状态的

- 无状态组件是没有那种钩子函数的，比如（`componentDidMount`或者`componentWillMount`）
- 用无状态组件时候不能用this和ref，但是还可以用context


## React.createClass( {} )
> 比较要注意这个东西可以自己绑定自己的`this`...特别厉害


## class Cmp extends React.Component{}
> ES6的写法并不能使方法写出来之后自己绑定好`this`，绑定`this`可以放在`constructor`里面`bind`绑定，也可以用箭头函数绑定this

---
# **to be continued...**



