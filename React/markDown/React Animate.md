# React Animate

标签（空格分隔）： 动画 React

---

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;  //或
    var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
    
> 用上面这个ReactCSSTransitionGroup标签来包含带有动画的子元素。

ReactCSSTransitionGroup标签写法：

    <ReactCSSTransitionGroup transitionName="example">
      {items} //  一些子元素
    </ReactCSSTransitionGroup>

> transitionName必要，当一个新的项被添加到ReactCSSTransitionGroup，也就是items子元素增加一个新的项的时候，这个新的项就会自动被添加example-enter类(这个class就是 transitionName + ‘enter’)，然后在下一时刻添加example-enter-active类，通过设置这两个类的属性来实现动画效果。。。如：

    .example-enter {
      opacity: 0.01;
      transition: opacity .5s ease-in;
    }
    
    .example-enter.example-enter-active {
      opacity: 1;
    }


----------
> 动画必须挂载了才能生效。所以不能把动画ReactCSSTransitionGroup标签和新项一起渲染上DOM节点。必须只把新项单独渲染到已有的ReactCSSTransitionGroup标签下。




> 注意：ReactCSSTransitionGroup标签下每一项都必须有单独key属性


----------
####  可通过transitionEnter={false} 和 transitionLeave={false} 来禁用动画效果


----------
> 可以使用底层的ReactTransitionGroup API，该API提供了你自定义过渡效果所需要的函数。
ReactTransitionGroup可以通过React.addons.TransitionGroup得到，当子级被添加或者从其中移除（就像上面的例子）的时候，特殊的生命周期函数就会在它们上面被调用。

---------
### ReactTransitionGroup的函数

- componentWillEnter(callback)   —— 在组件被添加到已有的TransitionGroup中的时候，该函数和componentDidMount()被同时调用。这将会阻塞其它动画触发，直到callback被调用
- componentDidEnter() —— 该函数在传给componentWillEnter的callback函数被调用之后调用。
- componentWillLeave(callback) —— 该函数在子级从ReactTransitionGroup中移除的时候调用。虽然子级被移除了，ReactTransitionGroup将会使它继续在DOM中，直到callback被调用。
- componentDidLeave() —— 该函数在willLeave callback被调用的时候调用（与componentWillUnmount是同一时间）


----------
### 通过修改ReactTransitionGroup 的component属性可以渲染不同的组件，甚至是自己定义的组件

    <ReactTransitionGroup component="ul" className="animated-list">
      ...
    </ReactTransitionGroup>