# YouDontKnowJS (this & prototype)

标签（空格分隔）： JS

---

    (function a(){...})     //这段函数中函数名a只能在它自己的大括号中访问到


----------
## 现代模块机制
> Code

         var MyModules = (function Manager() {
			var modules = {};

			function define(name, deps, impl) {
				for(var i = 0; i < deps.length; i++) {
					// var hold = deps[i];
					// deps[i] = modules[hold];

					deps[i] = modules[deps[i]];

				}
				modules[name] = impl.apply(impl, deps);
			}

			function get(name) {
				return modules[name];
			}

			return {
				define: define,
				get: get
			};
		})();


----------
## JS对象的浅拷贝和深拷贝

> 浅拷贝，只拷贝基本的数据类型，对象是引用，存在子类对象修改同时修改父类对象的情况
(浅拷贝是用 child[i] = parent[i] 这样的方式来复制的)

> 深拷贝，连对象也复制过来，所以不存在修改子类对象同时修改父类对象的情况
(深拷贝可以利用递归,当遇到对象的时候再次遍历对象中的属性,只有遇到基本的数据类型时才会做赋值)

### 一种巧妙的复制方法：

    var	newObj	=	JSON.parse(	JSON.stringify(	someObj	) );
    


----------
## 混入mixin
> 一般在框架中被称为extend。
怎么说呢...因为JS中并不存在类这个概念，只有对象，并不存在可以被实例化的“类”JS中一个对象并不会被复制到其他对象
JavaScript开发者想出了一个方法来模拟类的复制行为，这个方法就是混入(mixin)

### 显式混入

    //	非常简单的mixin(..)例子: 
    function mixin( sourceObj, targetObj ) {
        for( var key in sourceObj ) {
            //只在不存在情况下进行复制
            if( !(key in sourceObj) ) {
                targetObj[key] = sourceObj[key];
            }
        }
    }
    
    var Vehicle = {
        engines: 1,
        ignition: function() {
            console.log('hh');
        },
        drive: function() {
            this.ignition();
            console.log('hahha');
        }
    };
    
    //将Vehicle混入car，重写方法使用了call重写并扩展drive方法(总感觉表达得不好)
    var Car = mixin( Vehicle, {
        wheels: 4,
        
        drive: function() {
            Vehicle.drive.call(this);
            console.log('papa');
        }
    } );

- 如果直接执行Vehicle.drive()，函数调用中的this会被绑定到Vehicle对象而不是Car对象。使用.call(this)来确保car的drive方法中的方法在Car的上下文中
- 显式混入在需要实现JS(伪)多态的地方创建一个函数关联
- 而且显式混入实现(伪)多态的方式使子类和父类引用了同一个函数
- 显式混入引申出了一个变种...“寄生继承”......类似于显式混入，不过寄生式继承通过new出父对象，然后再自己重写父对象中的某个方法，最后return出来子对象来实现多态。


----------
### 隐式混入
- 没看出来和显式有什么不同...

        var Something = {
            cool: function() {
                this.greeting = 'Hello world';
                this.count = this.count? this.count++ : 1;
            }
        };
        
        var Another = {
            cool: function() {
                //隐式混入
                Something.cool.call(this);
            }
        };
        
## 总的来说，JS中的模拟类的伪多态有点不好，因为对应的函数不能复制本身，只复制引用，this改变了指向但却是同一个函数，所以说代码会变得难以维护。混入这种方法显得比较得不偿失


----------
## 原型
> obj.foo = 'haha';   的后果:

- 如果在[[Prototype]]链上层存在名为foo的普通数据访问属性（参见第3章）并且没有被标记为 只读（writable:false），那就会直接在myObject中添加一个名为foo的新属性，它是屏蔽属性。
- 如果在[[Prototype]]链上层存在foo，但是它被标记为只读（writable:false），那么无法修改已 有属性或者在myObject上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条 赋值语句会被忽略。总之，不会发生屏蔽。
- 如果在[[Prototype]]链上层存在foo并且它是一个setter（getter和setter可以拦截内置的访问和写属性的方法并无视writable等属性来调用内置的函数处理对象的属性），那就一定会调用这个 setter。foo不会被添加到（或者说屏蔽于）myObject，也不会重新定义foo这个setter。 

> 只有默认自带的prototype对象的constructor指向这个“构造函数”，如果用对象重写了prototype，这个prototype的constructor就指向Object了。

> 另外constructor也可以被修改，所以对象.constructor并不意味着构造

> 原型继承

    //	ES6之前需要抛弃默认的Bar.prototype 
    Bar.ptototype =	Object.create(	Foo.prototype	);
    
    //	ES6开始可以直接修改现有的Bar.prototype 
    Object.setPrototypeOf(	Bar.prototype,	Foo.prototype	);
    
    //不要使用的方法
    bar.prototype = foo.prototype;
    bar.prototype = new foo();
        
> instanceof：在a的整条[[Prototype]]链中是否有指向Foo.prototype的对象

        a instanceof Foo;
        //不好
        
> isPrototypeOf：：在a的整条[[Prototype]]链中是否出现过Foo.prototype

        Foo.prototype.isPrototypeOf(a);
        //需要两个对象
        //阿西吧它也没有说这个好...qutamade
        
> Object.getPrototypeOf(a)也可以获取一个对象的原型
还有a.__proto_(手动短线) 然鹅这个属性并不存在于a中，它存在于Object.prototype中...这个属性...其实这是一个getter和setter，读这个属性会调用它本来设好的getter函数，而写这个属性也会调用它本来设好的setter函数

------
> 关于Object.create()是个大英雄这个问题：
Object.create(..)会创建一个新对象（bar）并把它关联到我们指定的对象（foo），这样我们就可以 充分发挥[[Prototype]]机制的威力（委托）并且避免不必要的麻烦（比如使用new的构造函数调用 会生成.prototype和.constructor引用）。
------ 简单来说就是不用写构造函数了~

------
> JS面向对象(OO)：
一个写构造函数，然后new操作符调用！
一个用Object.create()..来构造对象！Object.create(..)的第二个参数指定了需要添加到新对象中的属性名以及这些属性的属性描述符 


----------
## 行为委托
> [[Prototype]]机制就是指对象中的一个内部链接引用另一个对象。这个机制的本质就是对象之间的关联关系

### 面向委托的设计(区别于面向类和继承设计)
> 假设我们需要在软件中建模一些类似的任务
用JS的(OLOO)会这样做：

- 先写一个Task对象(并不是类或者构造函数，就是对象)
- 然后用Object.create()来创建出第一个具体任务并且将其和Task关联起来(使这个具体任务委托Task对象)

### 面向委托的特点
- 在面向类的设计中，我们都喜欢在子类和父类中使用相同名字的方法实现多态的优势。但是对于委托来说恰恰相反，我们会尽量避免在不同的级别中使用不同的名字，因为如果使用一样的名字的话我们必须用笨拙的语法去消除歧义


----------
##思路对比

### 面向类的设计

    function Foo(who)	{
        this.me	= who; 
    } 
    Foo.prototype.identify = function()	{
        return	"I	am	" + this.me;	
    };
    function Bar(who)	{
        Foo.call(	this,	who	); 
    }
    Bar.prototype	=	Object.create(	Foo.prototype	);
    
    Bar.prototype.speak	= function()	{
        alert(	"Hello,	"	+	this.identify()	+	"."	); 
    };
    var	b1	=	new	Bar( "b1" ); 
    var	b2	=	new	Bar( "b2" );
    
    b1.speak(); 
    b2.speak();

### 面向委托的设计

    Foo	= {
        init: function(who)	{
            this.me	=	who;					
        },				
        identify: function()	{
            return	"I	am	"	+	this.me;				
        } 
    };
    Bar	= Object.create( Foo );
    Bar.speak = function()	{
        alert(	"Hello,	"	+	this.identify()	+	"."	); 
    };
    
    var	b1	=	Object.create(	Bar	);
    b1.init( "b1" ); 
    var	b2	=	Object.create(	Bar	);	
    b2.init( "b2" );

    b1.speak();
    b2.speak();
    
### 如果对象关联风格的代码能够实现类风格代码的所有功能并且更加简洁易懂，那它 是不是比类风格更好？

### 对象关联风格的代码显然更加简洁，因为这种代码只关注一件事：对象之间的关联关系。(并不存在构造函数，更加简洁与轻松)


----------
## 再来一个YDKJS的例子：
> 详情参照YDKJS this & prototype P178~

> 关于controller的继承
用面向类的设计和面向委托的设计的不同之处


----------
补充：匿名函数的缺点：
- 调试栈更难追踪
- 自我引用（递归、事件（解除）绑定，等等）更难
- 代码（稍微）更难理解。

ES6的简洁方法：

    var obj = {
        name: kimz,
        getName() {
            return this.name;
        }
    };

    //等于下面的写法
    var obj = {
        name: kimz,
        getName: function() {
            return this.name;
        }
    };
> 可以看到这个简写的实际上后面跟着的是一个匿名函数
这种方法无法避免匿名函数的第二个缺点

### 所以使用简洁方法时一定要小心这一点。如果你需要自我引用的话，那最好使用传统的具名函数表达 式来定义对应的函数（·baz:	function	baz(){..}·），不要使用简洁方法。 


----------
