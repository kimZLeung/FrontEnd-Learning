# Vue

标签（空格分隔）： Vuejs

---

### 最简单的数据绑定（插值）
- {{ msg }}
- {{ * msg }} （This will never change
- {{{ raw_html }}} （三个大括号用于插入html
- {{ n + 1 }} 里面也可以写表达式（只限单个表达式）
- {{ msg | filter }} 过滤器filter是一个函数

> 注意：在 Vue.js 指令和特殊特性内不能用插值

----------
### 指令（v-*）
> 指令是指带有（v-）前缀的一些特性。指令的值限定为绑定表达式

> 一些指令比如v-bind和v-on可以在后面加冒号来加参数
v-on:click="???"

> v-bind和v-on还有缩写———— : 和 @

----------
### 修饰符（.）
> 修饰符用于表示指令以特殊方式绑定


----------
### 计算属性（computed）
> 计算属性可以用在创建Vue对象的时候

    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        }
      }
    })
    
    //只写一个函数时默认是fullName的getter，也可以显示指定它的setter
    var vm = new Vue({
        el: '#demo',
        data: {
            firstName: 'Foo',
            lastName: 'bar',
        },
        computed: {
            fullName: {
                get: function() {
                    return this.firstName + ' ' + this.lastName;
                },
                set: function(newValue) {
                    var names = newValue.split(' ');
                    this.firstName = names[0];
                    this.lastName = names[1];
                }
            }
        }
    });

> 计算属性可以...调用vm.fullName时调用它的getter函数，也就是每次调用都会根据这一次的firstName和lastName来指定fullName。


----------
### v-if和v-show
> if是插不插入，show是显不显示，两个后面都可以加v-else。

> 但是v-show后面接v-else用在组件上会出现警告。（建议替换成两个v-show）


----------
### 列表渲染v-for
- 在li节点上用v-for=“item in items”来引入列表渲染

> 列表渲染的items数组在data属性里面，items数组有包装了变异方法，变异后能触发视图更新
变异的方法：
    push()
    pop()
    shift()
    unshift()
    splice()
    sort()
    reverse()

- 也有非变异方法可以返回新的数组，如filter(), concat() 和 slice()

> 返回的全新数组并不会全数更新DOM节点，不必担心
可以使用 track-by 特性给 Vue.js 一个提示，Vue.js 因而能尽可能地复用已有实例。

    <div v-for="item in items" track-by="_uid">
      <!-- content -->
    </div>
    
    //vue.js
    data: {
      items: [
        { _uid: '88f869d', ... },
        { _uid: '7496c10', ... }
      ]
    }
    
> 也就是给每一个子节点一个标识（与react的key差不多的东西）
如果没有唯一的键供追踪，可以使用 track-by="$index"

### Vue.js 不能检测到下面数组变化：
- 直接用索引设置元素，如 vm.items[0] = {}；
- 修改数据的长度，如 vm.items.length = 0。

对于设置元素，可以用$set方法：

    example1.items.$set(0, { childMsg: 'Changed!'})
    
对于长度，只需要重新用数组代替（有了track-by，数组替换不会过于损耗性能）


----------
### 自定义事件

- 使用 $on() 监听事件

- 使用 $emit() 在它上面触发事件

- 使用 $dispatch() 派发事件，事件沿着父链冒泡

- 使用 $broadcast() 广播事件，事件向下传导给所有的后代


----------
## 信息传递
- 一般来说父组件传递信息到子组件用props。props可以说是一个组件的信息源入口
- 也可以用自定义事件，通过在别的组件上触发这个组件上自定义的事件，然后通过传递参数来传递数据。

