# Symbol

标签（空格分隔）： ES6 Symbol

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