## React Animation

---

## React如何做动画

官方文档说到：

### Can I do animations in React?

> React can be used to power animations. See [React Transition](https://reactcommunity.org/react-transition-group/) Group and [React Motion](https://github.com/chenglou/react-motion), for example.

我去看了一下 `React Transition` 这个库

它为我们提供了几个组件用于实现动画

- [Transition](https://reactcommunity.org/react-transition-group/#Transition)
- [TransitionGroup](https://reactcommunity.org/react-transition-group/#TransitionGroup)：用于包裹Transiton组件或者CSSTransition组件的
- [CSSTransition](https://reactcommunity.org/react-transition-group/#CSSTransition)

跟`Vue`提供的`transition`组件比较类似的是这个`CSSTransition`组件

我们用它来包裹一些我们需要加入动画效果的组件，然后设置它的`Props`，如：

```
/* index.js */
const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
	{/* timeout用于定义entering到entered的时间周期 */}
    timeout={1000}
    classNames="fade"
  >
    {children}
  </CSSTransition>
)

/* style.css */
.fade-enter {
  opacity: 0.01;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 1000ms ease-in;
}

.fade-exit {
  opacity: 1;
}

.fade-exit.fade-exit-active {
  opacity: 0.01;
  transition: opacity 800ms ease-in;
}
```


而通过`Transition`组件实现的动画，我们可以通过使用动态切换类名来实现动画，不过需要手动处理状态切换类名，比较麻烦

```
const defaultStyle = {
  transition: opacity 300ms ease-in-out,
  opacity: 0,
  padding: 20,
  display: 'inline-block',
  backgroundColor: '#8787d8'
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={300}>
  	{/* state是这个Transition的状态，即那个in的Props，有四种，分别为entering entered和exiting exited */}
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm A fade Transition! {state}
      </div>
    )}
  </Transition>
)
```

真实的动画过渡效果还是由css决定，但是组件的`timeout`的`Props`决定了这个动画`entering`到`entered`的时间周期，所以需要到配合使用，简单来说，这个和`CSSTransition`的区别就是需要手动监控`state`状态切换类名，不过这个东西可以`CSS in JS`，在JS中管理了CSS的样式。


---

Summary

感觉可能`CSSTransition`会使用得比较普遍吧。使用也比较方便，通过`webpack`配合`css-loader`可以开启`CSS module`比较轻松地把CSS引入到JS里面，这样的使用可能会比较轻松
