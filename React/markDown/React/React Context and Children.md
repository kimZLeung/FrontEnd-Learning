# React Context and Children

标签（空格分隔）： React

---

## Context
> React的组件化很明显，通过`Props`来一层一层传递属性可以让React里面的数据流向十分清晰。但是当有一个属性在上上上层（A层），需要这个属性的组件在下层（D层），如果用`Props`,如果要通过`Props`来传输的话，需要从A层开始，通过`A->B->C->D`这几层，通过`Props`来一层一层传下去。

### 而`context`就像一个通道。在父组件上定义了一些方法之后，就可以在它的所有子组件去通过`context`访问这个属性
    
    // A组件（父）
    class A extends React.Component {
    // 在父组件加入这个方法，指定子组件需要的context的属性
      getChildContext() {
        return {
          user: this.props.user
        }
      }

    // 这个方法限定了context对象限制的属性，也是在父组件使用
      childContextTypes = {
        user: React.PropTypes.object.isRequired
      }
      
      render() {
        <div>{this.props.children}</div>
      }
    }
    
    // D组件（子子子组件）
    class D extends React.Component {
        ContextTypes = {
            user: React.Proptypes.object.isRequired
        }
        
        render() {
            return <div>{ this.context.user.name }</div>
        }
    }
    
> 上面的代码在A组件用了`getChildContext`方法和`childContextTypes`方法来设定了在父组件里面设定了一个`context`对象，这个`context`对象中有一个user属性，是通过传入A组件的`Props`的user传入的。
然后再D组件中使用`ContextTypes`方法可以限定了`users`的格式，同时用了这个方法便可以在D组件中访问`context`对象，从而直接访问到A组件中的`user`属性。`

### 如果一个组件定义了`ContextTypes`方法，接下来除了可以访问`context`对象之外，它的生命周期方法（钩子函数）也会接受到额外的参数，就是`nextContext`

---

## Children
> 当我们使用`this.props.children`来传递使用子组件时，我们应如何来修改children的样式之类的呢。

- 一种方法是可以使用`Children.map()`来遍历并返回自己定义好的节点，但是不能直接修改原来的children组件
- 那返回新的东西？。。。
- 可是这样就不管原来传进去的子组件了？
- 还有一个方法是，`React.cloneElement`

> `React.cloneElement`接受三个参数，第一个就是要拷贝的原对象，第二个是`props`传入之后可以和原对象的`Props`合并（这个`props`参数可传入列表渲染需要的包含**`key`和`ref`**，**`key`和`ref`**，**`key`和`ref`**属性），第三个参数是`children`，传入可成为这个组件的`Props.children`

    render() {
        // 通过子组件组合出真正渲染出来的子组件
        const children = this.props.children.map( (o, i)=>{
            return React.cloneElement(o, { style: {color:'#f00'}, key: i  })
        });
        return (
            <div>
                { children }
            </div>
        )
    }


