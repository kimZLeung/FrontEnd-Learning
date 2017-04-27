# 简单版MVVM

tag： MVVM

---

## 模板解析
- model
- list
- event
- class
## 数据劫持
- 普通对象
- 嵌套对象
- 数组数据

``` javascript
// 最简单的数据劫持

function observe(obj, key, callback) {
  let old = obj[key]
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return old
    },
    set: function(now) {
      if(now !== old) {
	  
		// put your callback here to reload the DOM
		
        console.log(`${old} ---> ${now}`)
        old = now
      }
    }
  })
}
```

---
## 数据和视图绑定
- 在模板解析的同时给数据对象`data`使用` Object.defineProperty`添加`set`的回调

---
## 例子
> 看过两位大神自己实现的MVVM。两位大神实现的思路有点区别。基本上都是对全局的data对象进行一轮数据劫持。然后渲染的时候，遍历dom节点，根据指令，调用解析函数，解析首次渲染结果。并且每渲染一个带有指令的dom节点，就为这个节点对应的data里面的数据添加一个更新节点的回调函数。最后出来的一个观察者的对象是这样的：会有一堆劫持好的data里面的数据，然后每一个数据对应包含一个队列，这个队列里面的函数，就是dom节点里面对应的所有数据更新函数。




参考：
 - [250行实现一个简单的MVVM][1]
 - [自己实现的mvvm][2]
 
 
 [1]: https://zhuanlan.zhihu.com/p/24475845?refer=mirone
 [2]: https://github.com/DMQ/mvvm

