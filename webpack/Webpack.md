# Webpack

标签（空格分隔）： webpack 模块化 打包工具

---

 1. 打包工具
 2. 模块加载工具
 3. 各种资源可以当做模块处理


----------
## 如今的JS模块化组织的方法。

 1. AMD或者CMD。也就是require和sea (异步加载模块)
 2. common。Node使用commonJS来进行模块化 (同步加载模块)
 3. ES6的模块化，的确好用。 (有生命的模块)
 4. webpack咯~browserify咯


----------
## 优势
- webpack有大量的加载器可以加载不同的文件，加载css和图片还有jsx都可以（jsx...）
- 有丰富的插件。
- 分模块按需加载的能力
- 支持 React 热插拔
- 讲真webpack可以支持AMD和commonJS，browserify只支持commonJS？(听说是...GG)

----------
## webpack和gulp、grunt的比较
- Gulp和Grunt也是在项目中写一个配置文件。指明Gulp和Grunt对项目文件的操作（编译，组合，压缩等操作）然后运行这个工具进行对文件的压缩
- 但是webpack的工作方式并不是这样的。
- webpack会通过loaders来处理文件之间的相互依赖（因为webpack提供了模块化的管理模式）实现按需加载。最后会打包成一个JS文件（Bundled.js）

---
## webpack的externals

- externals对象可以实现不把一些外部库也打包进来时用的（因为JQ之类的库打包一次特久）
- 所以我们可以这样做

        //webpack.config.js
        module.exports = {
            externals: {
              'react': 'React' // 前面的那个键是供别的模块引入的时候用的
            },
            //...
        }
        
        
        // app.html
        // ...
        <script src="react.min.js" />
        <script src="bundle.js" />
        
        
        // 某个被打包的模块
        // commonJS
        var react = require('react');
        // ES6
        import react from 'react';
        
---
## 自动挂载插件 ProvidePlugin
- 上面这个externals配置属性可以不把externals的东西不打包进来bundle.js里面
- 区别于这个，这个插件的作用是这样用的

        // webpack.config.js
        module.exports = {
            plugins:[{
                 $: "jquery",
            }],
            // ...
        }
        
        // a.js (随便一个模块)
        // 不需要 var $ = require('./../../xxoo');  直接用
        
        $('xxoo').html('<h1>Hello 世界</h1>');
        
- jq依旧会打包进去。

---

## 各种loaders

- babel-loader: 用于`webapck`配合`babel`做各种工作，包括转化`JSX`语法，转化`ES6`语法等，可以配合`.babelrc`使用
- css-loader: 用于加载`css`文件
- style-loader: 用于把加载好的`css`代码转化成内联的样式，配合`css-loader`使用
- sass-loader，less-loader: 用于将各种`scss`和`less`文件转化为`css`，可以配合`css-loader`和`style-loader`使用
- vue-loader: `Vue`的loader，用于载入`.vue`的单文件组件
- file-loader: 用于载入文件（图片，字体等）
- url-loader: 和`file-loader`差不多，用于载入文件，但是可以设置limit值，小于limit的话该文件通过base64的格式进行内联
- eslint-loader: 多数用于pre-loader（`enforce: 'pre'`），做为语法和代码格式的预检查。

---

## output的path和publicPath

- path

> 用于配置最后文件的输出目录

- publicPath

> 开发模式下：用于配置打包后的JS和CSS和file在内存中的输出路径。 需要配合`webpack-dev-middleware`服务器做热部署服务，或直接使用`webpack-dev-server`。而且`webpack-dev-middleware`或者`webpack-dev-server`也有一个`publicPath`配置，这个配置是配置输出目录的。因为通过热部署服务器生成的资源是放在内存里的，然后我们可以通过配置这个`publicPath`作为访问这些资源的根路由。这个路径仅仅只是为了提供浏览器访问打包资源的功能。而`webpack`其他的loader和插件使用的`publicPath`仍然是`output`里面配置好的`publicPath`。所以官方推荐两处的`publicPath`配置的保持一致

> 线上模式：用于修改路径，最终修改而成的路径为`publicPath`+自己配置的`filename`

另外：`webpack`的一个生成`html`的插件`HtmlWebpackPlugin`生成`html`的同时会自动插入生成的资源（JS，CSS），他们的补全路径默认是`output.publicPath`，所以官方推荐两处的`publicPath`配置的保持一致

最后打包出来的JS，CSS，图片和字体等文件都是通过`output.path`和它自身的`filename`决定的，`output.publicPath`并不会影响打包构建的文件目录


---

## webpack HMR

今晚再次总结一下`webpack`的HMR启用方式

首先说一下`inline`和`hot`：`inline`本身就是用于整页刷新的，就是文件更新之后整个页面刷新。而`hot`参数是尝试性地进行HMR，就是很爽爽爽爽爽爽爽的无刷新页面更新，如果在`module`里面冒泡的热更新信号没有被处理，一直冒泡到入口文件也没有被处理的话，就会HMR失败。失败了之后，就整页刷新。所以我觉得`hot`其实已经包含了`inline`了，不过怎么用还是见仁见智。

还有一个参数是`--hotOnly`，这个参数只进行HMR，失败了也不会刷新。反正失败了就是不理你。我用了一下感觉有点...hehe


经过多次试验后来发现：

- 最简单的方式就是`webpack-dev-server --inline --hot`加上`--hot`这个参数自动帮你在插件里加入`HotModuleReplacementPlugin`，十分轻松愉快。
- (以前版本可行的做法)不写参数，直接在你的`config`文件里面的`plugins`数组加入棒棒的`HotModuleReplacementPlugin`，直接启用`hot`模式，不使用参数，直接改写入口文件，比如：然后直接`webapck-dev-server`

```
entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080',  // 加入inline配置
    'webpack/hot/only-dev-server',                      // 加入hot配置
    './index.js'
  ],

// 插件写上
plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
```

个人认为第二种方式有点...太过麻烦，而且`webpack-dev-server`现在的版本默认会有`GET "http://localhost:8888/sockjs-node/info?t=1506348178939".`也就是默认开启了`inline`模式。这样加入的话只会开启两个inline模式，也就是每次刷新文件都会有两次xhr请求，这样不好。

而且最麻烦的是不知道为什么这样做无法启用HMR。（不过可能是我的问题）

---

## 使用webpack-dev-middleware和webpack-hot-middleware自己搭建热部署服务器

如果说`webpack-dev-server`是别人封好的轮子，哇好麻烦好多坑，都不知道什么鬼操作。那我们可以自己凑一个热部署服务器。虽然没`webpack-dev-server`这么厉害

之前我还在纠结这个`HotModuleReplacementPlugin`有什么用，感觉完全没用，因为用于`webpack-dev-server`的时候无法开启热部署。但是如果我们想使用这两个中间件来自己搭建热部署服务器的时候，我们同样需要使用这个插件进行配置

```
entry: ['webpack-hot-middleware/client', './index.js'],

// ...

plugins: [
    new webpack.HotModuleReplacementPlugin()
]
```

然后就是配合`express`使用

- `webpack-dev-middleware`：进行打包后文件的托管返回
- `webpack-hot-middleware`：配合上面的设置，开启HMR，尝试无刷新更新页面

```
var compiler = webpack(config)

var app = express()

var hot = hotMiddleware(compiler)

app.use(devMiddleware(compiler, {
    publicPath: '/'
}))

app.use(hot)
```

至于`koa2`如何使用，可以参考[这里](https://www.npmjs.com/package/koa-webpack-middleware)，做法和`express`差不多

