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
