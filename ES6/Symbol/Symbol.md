# Symbol

标签（空格分隔）： ES6 Symbol

> `Symbol`为什么存在？因为每一个`Symbol`作为一个属性都是独一无二的存在。ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（`mixin` 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入`Symbol`的原因。

---
    // 创建两个Symbol
    var a = Symbol();
    var b = Symbol();
    
    // Symbol作为属性名
    aa = {
      [a]: 'bi~',
      [b]: 'ai...'
    };

    for(var a of aa) {
        console.log(a)  // 打印不出东西
    }
    
    aa.haha = 'ci..= =';
    
    for(var a of aa) {
        console.log(a)  // 'ci..= ='
    }

> 使用Object.getOwnPropertyNames方法得不到Symbol属性名，需要使用Object.getOwnPropertySymbols方法

> 所以：我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

---
## Symbol.for()

> 我们希望重新使用同一个Symbol值，Symbol.for方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。

        var c = Symbol.for('hehe');
        var d = Symbol.for('hehe');
        
        console.log(c==d)
        
        
- 然而Symbol()写法并没有Symbol.for()的登记作用。所以不会进行Symbol的搜索
- 可以用Symbol.keyFor()搜索已登记的Symbol类型值的key。传入变量，搜索Symbol

        var s1 = Symbol.for("foo");
        Symbol.keyFor(s1) // "foo"
        
        var s2 = Symbol("foo");
        Symbol.keyFor(s2) // undefined
