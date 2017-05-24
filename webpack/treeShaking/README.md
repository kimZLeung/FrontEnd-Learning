
## webpack2的treeShaking
> 其实treeShaking也不是什么新概念，简单来说，treeShaking就是...树抖动的意思，树抖动，就会把落叶抖下来，这些树叶，就是import进来模块却没有使用的模块。

具体来说：treeShaking做到的是，把我们import进来，却没有在此模块使用的模块，不打包进入`bundle`，不过如果使用`CommonJS`来进行引入的话，是无法实现`treeShaking`的，因为`CommonJS`的`require`是引入并执行。与ES6实现的`import`不一样。

---
## So，准备工作
> 因为我们在前端使用ES6的import语法的时候，用得最多的是使用`babel`对ES6进行转码，而最常用的就是`babel-preset-es2015`这个东西来对ES6进行转码，然鹅！这个东西会把`import`转码成`CommonJS`的形式。所以我们换一个方法，下面是我的`.babelrc`

``` javascript
{
  "presets": [["es2015", { "modules": false }], "stage-0"],
}
```


因为只要开启了`module: false`这个选项，`babel`就不会把`import`转码成`CommonJS`的形式。其实`preset-2015`就是由以上一大堆插件，加上一个`transform-es2015-modules-commonjs`插件，所以我们把全部插件用上，唯独不使用这个插件，可以不使用`CommonJS`来引入了。

> 还有一步不要忘记了，treeShaking是配合`UglifyJsPlugin`这个插件启用的，所以

``` javascript
// webpack.config.js
 plugins:[
   new webpack.optimize.UglifyJsPlugin()
 ]
```

---
## treeShaking体验
我简单写了几个JS试了下

``` javascript
// src/sub.js
const sub = () => ('this is sub')

export default sub


// src/oldSub.js
const old = () => ('this is old')

export default old


// src/index.js
import sub from './sub'
import old from './oldSub'

export { sub, old }


// __dirname/index.js
import { sub, old } from './src'

console.log(sub())
```

然后运行`webpack`进行打包之后，可以在打包出来的文件里看到虽然`oldSub`有`export`出去，但是并没有对`old`进行使用，所以并没有打包进去


从以上代码可以看出，`src/index.js`打包完成后在输出文件里面只向外导出了`sub`函数，并没有向外导出`oldSub`

---
## 换一种写法
> 刚刚是并没有把`old`打包进去最后的JS，但是当我把`oldSub`代码改一下

``` javascript
class old {
  render() {
    return 'old'
  }
}

export default old
```
只改这些，然后运行一次，我们会发现，`old`又被打包进去了。

---
## 到底为什么没有shake下来？
> 我们知道，ES6的`Class`语法里面写方法，用`babel`转码，是直接把方法写到这个对象的原型里面的，我在google上查到如果有涉及到对象的原型上的修改的话，`treeShaking`将不会把这个模块`shake`下来，因为它需要确保对原生的`Array`对象这些的原型修改能够起到作用。

所以如果想要这样使用`treeShaking`的话，需要引入`babili-webpack-plugin`插件，这个东西可以不像`babel`那样把`Class`里面的方法转码成对象的原型上的方法

``` javascript
const babili = require('babili-webpack-plugin')
...

  plugins: [
    new babili()
  ]

```
这个插件可以取代`babel`做专义，将`Class`定义转换后无副作用。

> babili内部集成了一个压缩JS的插件，直接使用这个来代替babel可以去除`Class`对`treeShaking`的影响。因为它打包出来的东西并没有为ES6进行完全转码（暂时知道的是会对class和箭头函数保持原样），完成了代码压缩和部分ES6的转码。

这个是通过babili打包出来的代码片段,可以看到箭头函数还存在，如果运行在ES5环境，还需要进一步的转码打包，但是目前这个情况的确是利用了`webpack2`的`treeShaking`把`old`模块不必要的代码去掉了，并没有加入打包之中。
``` javascript
function(a,b){'use strict';b.a=()=>'this is sub'}
```

得到这个`treeShaking`之后的相对优化的JS之后，我们再经历一次从ES6到ES5的打包，利用`babel-loader`，就可以得到`treeShaking`之后的代码了。（感觉这种做法是只适合生产环境。


参考：
- [webpack2的treeShaking好用吗？](http://imweb.io/topic/58666d57b3ce6d8e3f9f99b0)
- [webpack - Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
