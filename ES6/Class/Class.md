# Class

标签（空格分隔）： ES6 Class 面向对象

---

## ES6中实现了Class可以定义类
> Class中有一个constructor函数用来写构造函数，然后再下面写该类的方法。
> 在constructor外面写的方法会定义在这个类的原形上。虽然用对象调用this可以正确绑定。但是如果写的是给事件的回调函数之类（会导致this出现奇怪绑定的情况）就会出现this的奇怪指向。所以可以用以下方法绑定类的方法到对象上 ↓

> constructor中的this指向new出来的对象，所以可以把下面的方法放到上面使用bind来绑定下面方法中的this关键字，当然也可以使用箭头函数。



---

## 关于extends
> 有Class，那就会有extends
继承别的类之后，constructor中必须调用super方法用super()，调用了父类的构造之后才能得到this对象。

- （原话：这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。）

> ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。（所以要先调用super才能用this）

> ES5中的继承是先创造子类的this然后再将父类方法添加到this，Parent.apply(this)

> 如果子类没有定义constructor，这个方法会被默认添加。

    constructor(...args) {
        super(...args);
    }

- 类名的prototype是原型。
- 对象名的____proto____是原型。
- 子类对象的____proto____是父类
- 子类的prototype是父类
- 子类的prototype的____proto____是父类原型

---

- 总之对象的____proto____是指向该类原型
- 类的prototype指向该类原型
- 子类的____proto____指向父类
- 子类的prototype的____proto____是父类原型

> extends后面可以跟多种类型的值，函数，对象甚至null

---
## super

- super作为函数调用时，代表父类构造函数
- super当作对象调用时（super.prop或super.method()）super代表父类。

---
## static
- 用static指定的静态方法可以通过类直接调用
- 子类也可直接调用父类的静态方法
- 由于ES6规定Class内部只能有静态方法，不能有静态属性，所以定义静态属性的方法是

        class Foo {
            //TODO
        }
        
        Foo.prop = 1;  //定义一个prop为Foo的静态属性
        Foo.prop       // 1

---
## ES7静态属性和实例属性的改进写法
- 实例的属性可以直接写在Class里面，也就是可以不再constructor里面定义实例的属性而已
- 静态属性也可以写在Class里面，加个static

        class MyClass {
          static myStaticProp = 42;
          myProp = 33;    
        
          constructor() {
            console.log(MyClass.myProp); // 42
            console.log(this.myProp);    //33
          }
        }


---
## new.target属性

- 这个属性返回new命令作用于的那个构造函数。如果构造函数不是通过new调用的，new.target就会返回undefined。可以用来确定构造函数是如何调用的
- 子类继承父类，使用new调用子类的构造函数，new.target返回的是子类

> 可以利用这个特性写出只能用于继承，不能直接初始化的类（类似抽象类是吧？

    class Super {
        constructor(...args) {
            if(new.target === Super) {
                throw new Error('我不能被初始化');
            }
            // TODO
        }
    }
    
    class Sub extends Super {
        constructor(...args) {
            super(...args);

        }
    }
    
    var Sp = new Super(1);      // Error: '我不能被初始化'
    var Sb = new Sub(1);        // 反正不报错