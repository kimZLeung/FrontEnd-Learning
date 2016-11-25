# 关于JS模块化。CMD -> Sea.js和ADM -> Require.js

标签（空格分隔）： js模块化 虽然ES6 推出了新的模块化 大家一起死 但是还是记录一下

---

- 二者都是异步模块定义（Asynchronuous Module Definition）的一个实现
- CMD和AMD的区别：CMD相当于按需加载，定义一个模块的时候不需要立即制定依赖模块，在需要的时候require就可以了，比较方便；而AMD则相反，定义模块的时候需要制定依赖模块，并以形参的方式引入factory中。


           //AMD方式定义模块
            define(['dep1','dep2'],function(dep1,dep2){
                 //内部只能使用制定的模块
                  return function(){};
            });
            //CMD
            define(function(require,exports,module){
               //此处如果需要某XX模块，可以引入
               var xx=require('XX');
            });
            
            
            作者：giscafer
            链接：http://www.zhihu.com/question/20576942/answer/58094030
            来源：知乎。


----------
## AMD --> RequireJS
- RequireJS优势：
> 声明不同js文件之间的依赖
可以按需、并行、延时载入js库
可以让我们的代码以模块化的方式组织
- 通过define(['ModuleA', 'ModuleB'], function(A, B){ //xx代码； return(//抛出对象) })             实现AMD小模块
- 主模块通过require(['xxx', 'ooo'], function(x, o){
       //xx代码
  });
来引入依赖模块，并实现主模块(主模块是入口文件，相当于主函数)
- 模块的加载
> 利用require.config();来进行路径配置可写在主模块(main.js)的头部

        
        //hello.js(这个js并非AMD格式的js)
        function hello() {
            alert('Hello World');
        }
        
        //main.js
        require.config({
            //默认基路径
            baseUrl: 'js/lib',
            
            //分别给每一个指定路径
            path: {
                'jquery': 'jquery.min',
                'underscore': 'underscore.min',
                'backbone': 'backbone.min'
            },
            
            //加载非AMD的模块
            shim: {
                'underscore': {
                    exports: '_'
                },
                'backbone': {
                    exports: 'Backbone'
                },
                //使用init去同时暴露两个全局变量,因为并没有用AMD的方式去暴露对象变量
                'hello': {
                    init: function() {
                        return {
                            hello: hello,
                            hello2: hello2
                        }
                    }
                }
            }
            //exports 可以把某个非requirejs方式的代码中的某一个全局变量暴露出去，当作该模块以引用。
        });
        
        


----------
### 模块也可命名
> 在依赖数组前加一个字符串可命名这个模块

    define('myName', ['mA', 'mB'], function(a, b){
        //xxoo
    });
    


----------
## require插件~


----------
## 无主和有主的模块

    requirejs.config({
      baseUrl: '/public/js',
      paths: {
        myjquery: 'lib/jquery/jquery'
      }
    });
    
    requirejs(['myjquery'], function(jq) {
      alert(jq);                //Error：jq is undefined！
    });
    
> 这是因为jq中定义了

        define('jquery', [], function() { ... });
        
这也是前面提到了的命名模块。当在require.config去试图用不同的名字去引用它的时候就不行

> 不命名的模块也就是无主的模块，大部分模块都是无主的

### 那为什么有些模块需要命名——变成有主模块？
> 其实命名模块都是那些js库~
有一个说法是出于性能的考虑，因为这些js库都会经常被其他库依赖。如果为无主其他库会起到不同的模块名，导致多次载入这种库
> ### 而把它们声明为有主的，那么所有的模块只能使用同一个名字引用它们，这样系统就只会载入它们一次。