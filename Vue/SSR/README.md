# Vue-SSR

---
## Vue render
> `Vue`的`render`属性和`template`属性的作用是一样的，都是用来创建组件。不过用法有点不同

``` javascript
new Vue({
  render: function(createElement) {

  }
})
```

这里的`render`函数有一个参数叫`createElement`，这是`render`属性的核心，可以用这个方法来创建组件

``` javascript
// example
new Vue({
  render: function(createElement) {
    return createElement('h1', {
      attrs: {
        id: 'haha'
      }
    }, 'Halo World')
  }
})
```

这是一个简单的用`render`属性创建组件的例子，创建出来的效果是`<h1 id="haha">Halo World</h1>`

``` javascript
// createElement的用法
createElement({
  // 第一个参数是组件名或标签名
  'h1',
  // 第二个参数是一对象，用来给这个组件添加属性的（以下示例引用自官方文档）
  {
    // 和`v-bind:class`一样的 API
    'class': {
      foo: true,
      bar: false
    },
    // 和`v-bind:style`一样的 API
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 正常的 HTML 特性
    attrs: {
      id: 'foo'
    },
    // 组件 props
    props: {
      myProp: 'bar'
    },
    // DOM 属性
    domProps: {
      innerHTML: 'baz'
    },
    // 事件监听器基于 "on"
    // 所以不再支持如 v-on:keyup.enter 修饰器
    // 需要手动匹配 keyCode。
    on: {
      click: this.clickHandler
    },
    // 仅对于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件。
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令. 注意事项：不能对绑定的旧值设值
    // Vue 会为您持续追踪
    directives: [
      {
        name: 'my-custom-directive',
        value: '2'
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    // Scoped slots in the form of
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => h('span', props.text)
    },
    // 如果组件是其他组件的子组件，需为slot指定名称
    slot: 'name-of-slot'
    // 其他特殊顶层属性
    key: 'myKey',
    ref: 'myRef'
  },
  // 第三个参数是这个组件的子节点
  'Halo World'
})
```

> 而且`Vue`创建组件可以声明一个`functional`，将这个属性声明为`ture`的时候，可以创建函数式组件

``` javascript
new Vue({
  functional: true,
  render: function(createElement, context) {
    return createElement('h1', {
      context.data,
      context.children
    })
  }
})
```

context提供了上下文的引用

- props: 提供props 的对象
- children: VNode 子节点的数组
- slots: slots 对象
- data: 传递给组件的 data 对象
- parent: 对父组件的引用

> context的data就是为了`createElement`的第二个参数准备的。`children`和`slots`的区别是前者指向是所有的孩子，后者的`defalut`只会返回没有命名的`slot`


---
## Vue和React
> 我们都知道React有做`ssr`技术，也为我们提供了很多做`ssr`的方便的组件。Vue也一样。

我看到的是Vue也像React一样给我们提供了一个叫`renderToString`的方法，而`renderToString`方法是又`renderer`提供的。`renderer`是由Vue-server-render的`createRenderer`返回的，这个`createRenderer`是一个水很深的函数，暂时对其没有过多了解，例子使用的是这个函数的默认配置。

然后尝试了一下`renderToString`

``` javascript
// 整个过程比较顺利，毕竟是模仿别人的代码
renderer.renderToString(
  require('../src/index')(),
  function(err, app) {
    if(err) {
      res.status(500).send('Server Error')
    } else {
      res.send(template.replace('<div id="app"></div>', app))
    }
  }
)
```
这是服务器端渲染的核心代码，使用这个`renderToString`方法轻松把前端的一个Vue对象渲染为html字符串并且直接返回给前端

> 值得注意的是index这个模板

``` javascript
(function() {
  function setComponent() {
    var component = new Vue({
      template: '<div id="app">halo {{ count }} world</div>',
      data: {
        count: 0
      },
      created: function() {
        var vm = this
        setInterval(function() {
          vm.count += 2
        }, 1000)
      }
    })
    return component
  }
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = setComponent
  } else {
    window.app = setComponent()
  }
})()
```

这是一个立即执行函数，并且可以在前后端同构（也就是在前端和后端都可以跑，不过是要把Vue挂载在`global`或者`window`上而已）。在后端直接`require`。在前端直接可以使用`script`标签引用


没什么问题，接着又试了一下`renderToStream`。当我使用这个流式渲染的时候，发生了一些奇怪的事情

``` javascript
// 一开始我通过直接监听这个流的data事件渲染组件
var stream = renderer.renderToStream(require('../src/index')())

stream.on('data', function(chunk) {
  res.write(chunk)
})
```

出现了乱码，这是因为node里面的流，是`Buffer`也就是一堆的16进制的东西，特殊符号或者汉字的话需要几个16进制的代号表示。这样一节一节直接返回回去，一些特殊符号或者汉字可能会被截断，所以就出现了乱码

``` javascript
// 修改后
var stream = renderer.renderToStream(require('../src/index')())
var arr = []
var len = 0

res.write(front)

stream.on('data', function(chunk) {
  arr.push(chunk)
  len += chunk.length
})

stream.on('end', function() {
  var bufData = Buffer.concat(arr, len)
  res.write(bufData)
  res.end(back)
})
```

这样做可以正确把所有Buffer字符串起来再一起返回，不会出现乱码问题。但是，一直到目前为止，我们返回的html字符串都被浏览器当成了文本渲染到了页面上！

``` javascript
// 所以设个响应头
res.writeHead(200, {
  'Content-Type': 'text/html'
})
res.write(front)
```
在最开始返回之前设定响应头，因为node原生提供的write方法默认的`Content-Type`是`text/plain`，所以我们的浏览器才会把返回的html字符串当成是文本渲染上去。

> 但是我们在使用`renderToString`的时候并没有遇到这种情况，这是因为我们使用`renderToString`的时候，我们使用了express提供的`send`方法，这个方法是把返回的响应头设为了`Content-Type: text/html`，所以可以直接渲染。

> 还有一个要注意一下，无论是`React`还是`Vue`，在服务端和客户端可以复用组件的同时，被复用的组件的`life-hook`是不一样的，部分的`life-hook`只会在浏览器里执行，而且服务端的全局变量`global`和客户端的全局变量`window`和`document`等都不一样，需要引用全局变量上的属性的话，需要注意
