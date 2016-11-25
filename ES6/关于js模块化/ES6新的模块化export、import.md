# ES6新的模块化export、import

标签（空格分隔）： ES6 炸裂模块化 Module

---

> ES6的import和Node的CommonJS不同
CommonJS模块输出的是一个值的拷贝，而ES6模块输出的是值的引用。

- CommonJS模块输出的是被输出值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值

        // lib.js
        var counter = 3;
        function incCounter() {
          counter++;
        }
        module.exports = {
          counter: counter,
          incCounter: incCounter,
        };             
        //上面这个lib.js Export出来了counter值。下面我们看看main.js中的操作
        
        // main.js
        var mod = require('./lib');
        
        console.log(mod.counter);  // 3
        mod.incCounter();
        console.log(mod.counter); // 3
        //从中可以看出我们调用了require进来的方法对counter进行了自加的操作，却并没有改变他的值
        
> 因为CommonJS的模块输出是被输出值的拷贝。所以它模块内部的变化完全不会对这个输出的值造成影响
除非写成一个函数，才能得到内部变动后的值。比如

        // lib.js
        var counter = 3;
        function incCounter() {
          counter++;
        }
        module.exports = {
          get counter() {
            return counter
          },
          incCounter: incCounter,
        };

> 这样才能通过函数去获得模块内部所变化的值


----------
## 然而！ES6的Module实现了模块引用

> 什么鬼。。。也就是说
它遇到模块加载命令import时，不会去执行模块，而是只生成一个动态的只读引用。等到真的需要用到时，再到模块里面去取值。原始值变了，import输入的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
还是这个例子

        // lib.js
        export var counter = 3;
        export function incCounter() {
          counter++;
        }
        //export 两个东西出去了~
        
        //main.js
        import {counter, incCounter} from './lib';
        console.log(counter);
        incCounter();
        console.log(counter);
        
> 因为ES6比较吊...所以第一次是3，第二次是4
因为import会生成一个动态的只读引用，它所引用的变量是活的！活的...所以可以变化。
这也是ES6的import优于commonJS的require的原因吧。


----------
## ES6 -> Module
- 在ES6之前，社区制定了一些模块加载方案，最主要的有后端Node的CommonJS和前端的AMD。
但是又了ES6之后~ES6新实现的模块化可以取代现有的CommonJS和AMD。

> ES6的模块化
CommonJS会加载整个模块然后生成一个对象(运行时加载)，比如

        // CommonJS模块
        let { stat, exists, readFile } = require('fs');
        
        // 等同于
        let _fs = require('fs');
        let stat = _fs.stat, exists = _fs.exists, readfile = _fs.readfile;
        
ES6的模块化不是对象，而是通过export命令显式指定输出的代码，输入时也采用静态命令的形式。

        // ES6模块
        import { stat, exists, readFile } from 'fs';
这样载入模块只会载入这三个方法，称为"编译时加载"...加载时，效率要比CommonJS模块的加载方式高。


----------
## exports
> exports可以用as关键字重命名抛出去的接口

> export命令规定的是对外的接口

        // 报错
        export 1;
        
        // 报错
        var m = 1;
        export m;
        
        //正确的写法
        // 写法一
        export var m = 1;
        
        // 写法二
        var m = 1;
        export {m};
        
        // 写法三
        var n = 1;
        export {n as m};

- 它们的实质是，在接口名与模块内部变量之间，建立了一一对应的关系


----------
## import 
> import也可以使用as关键字来

> 并且import具有提升效果

> 如果在一个模块之中，先输入后输出同一个模块，import语句可以与export语句写在一起。但是并不建议用这种写法

> 整体加载:除了指定加载某个输出值，还可以使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。


----------
## 默认输出 -> export default

        // import-default.js
        import customName from './export-default';
        customName(); // 'foo'
> 上面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时import命令后面，不使用大括号。因为加载的是默认export的方法
export default命令用在非匿名函数前，也是可以的。

- 正是因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。
- ！！！！一个模块只能有一个默认输出，因此export deault命令只能使用一次。所以，import命令后面才不用加大括号，因为只可能对应一个方法。

----------
## 