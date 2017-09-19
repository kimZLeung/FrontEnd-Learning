## 关于这个脚手架的一点事情

---

## 静态资源assets和static

`assets`里面存放的文件会通过`webpack`进行依赖打包，而`static`里面的文件并不会进行依赖打包，也就是说不会通过`webpack`的任何修改处理。仅仅是通过`webpackCopyPlugin`把它们复制到`/dist/static`里面

```
// copy custom static assets
new CopyWebpackPlugin([
	{
		from: path.resolve(__dirname, '../static'),
		to: config.build.assetsSubDirectory,
		ignore: ['.*']
	}
])
```

所以总结说`static`里面放不会变动的文件，`assets`里面放可能会变动的文件

官方文档说`static`目录下面的文件需要用根路径去引用。并且不作为依赖被`webpack`打包。

我觉得挺奇怪的。反正就是一个打包进去，一个不打包直接进行资源复制。

---

## 关于单元测试

看到了如下代码

```
// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
```

大概意思就是引入所有`./specs`目录下的以`.spec`结尾的文件，但是`require.context`是什么意思？

> 如果你的 request 含有表达式(expressions)，会创建一个上下文(context)，因为在编译时(compile time)并不清楚具体是哪一个模块被导入。

```
// 例如
require("./template/" + name + ".ejs");
```

> 你还可以使用 `require.context()` 方法来创建自己的（模块）上下文。

```
require.context("./test", false, /\.test\.js$/);
// （创建了）一个包含了 test 文件夹（不包含子目录）下面的、所有文件名以 `.test.js` 结尾的、能被 require 请求到的文件的上下文。
```

所以这段代码里面使用了`webpack`提供的具有上下文的模块，也就是相当于可以动态在运行时载入别的模块，通过指定参数，扫描`./specs`目录下面的`spec`结尾的文件，然后通过`webpack`提供的api实现遍历引入所有符合条件的模块

```
// 通过这个 keys() api
testsContext.keys().forEach(testsContext)
```

`keys()`是一个特殊的API，返回一个数组，由所有可能被上下文模块处理的请求组成（也就是一堆请求的一个数组）

如果想获取所有模块的引用，还可以这样做：

```
var cache = {}

function importAll (r) {
	r.keys().forEach(key => cache[key] = r(key))
}

importAll(require.context('../components/', true, /\.jsx?$/))
```


于是我们可以通过`cache`的键访问引入的模块

---

## iconfont字体引入

通过`npm run build`打包出来可以部署的文件时，我们发现`iconfont`字体无法引入，在控制台查看`network`的时候发现访问到的路径是`/static/css/static/font/...`这样的路径，不知道为什么会多了一层路径。

可能是因为本来CSS文件里面引入的字体，已经通过`url-loader`对URL进行了替换，然后把字体打包输出，但是`ExtractTextPlugin`再把所有的CSS集合独立出一份CSS文件，然后通过这份CSS去访问字体就出现了这种叠加的路径。

后来的解决方法是直接把css和font字体文件移到了`static`直接通过`link`标签引入，这样做不会通过`webpack`进行打包处理，而且在`static`中的文件会直接复制到`dist/static`中，所以直接这样打包，然后在`index.html`中用`link`标签引入，可以正常访问字体

> 在网上看到有一个做法是可以给`ExtractTextPlugin`加`publicPath`

```
if (options.extract) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader',
      publicPath: '../../'    // 加上这句，重写这个插件打包后的css文件中的url
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}
```

但是我的分支并不会出现这样的情况

后来发现是因为配置文件里把`publicPath`设置成了'./'，这样做的话，`url-loader`拼接起来的路径就会成为相对路径，所以在css内引用字体就变成了那种奇怪的路径。
