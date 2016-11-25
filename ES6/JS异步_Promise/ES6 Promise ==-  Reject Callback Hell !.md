# ES6 Promise ==>  Reject Callback Hell !

标签（空格分隔）： ES6 Promise

---

## 关于Promise
- 一个Promise对象可以理解为一次将要执行的操作 (异步、异步、异步) 异步操作！
- 使用了Promise对象之后，可以用一种链式调用的方式来组织代码。比多个回调函数看起来直观。
- Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）
- Promise对象一旦new出来马上开始执行。resolve时执行resolve的回调。


----------
## Resolved 和 和Rejected
- resolve 方法可以使 Promise 对象的状态改变成成功，同时传递一个参数用于后续成功后的操作，在这个例子当中就是 Hello World! 字符串。
- reject 方法则是将 Promise 对象的状态改变为失败，同时将错误的信息传递到后续错误处理的操作。

        function helloWorld (ready) {
            return new Promise(function (resolve, reject) {
                if (ready) {
                    resolve("Hello World!");
                } else {
                    reject("Good bye!");
                }
            });
        }
        
        helloWorld(true).then(function (message) {
            alert(message);
        }, function (error) {
            alert(error);
        });
- helloWorld函数中返回一个Promise对象这个对象判定ready参数，如果为true就resolve这个Promise对象，false则reject，后面在这个对象上调用then方法为resolve和reject设回调函数
- then方法是Promise.prototype.then...是在Promise原型上的方法这个方法可以根据调用它的Promise对象的状态来执行函数...then接受两个参数，都是函数，第一个函数用于resolve之后调用，第二个用于reject之后调用。
- then方法返回一个新的Promise对象，后面还可以直接写这个返回的Promise对象的then方法，这个then方法返回的值就作为下一个then方法调用的函数的参数，所以可以使用链式写法。
- 注意：then里面的回调函数return问题
> 当 resolve 返回一个值，返回一个值会传递到下一个then的resolve方法参数中。
> 当 resolve 返回一个新 Promise，再调用的then就是新Promise中的逻辑了。
就比如：
  
                getJSON("/post/1.json").then(function(post) {
                  return getJSON(post.commentURL);      //返回一个Promise对象
                }).then(function funcA(comments) {      //resolve的回调函数
                  console.log("Resolved: ", comments);
                }, function funcB(err){                 //reject的回调函数
                  console.log("Rejected: ", err);
                });

                //第一个then里的回调返回的是一个Promise对象，这时第二个then方法就会等待这个对象状态发生变化，根据这个对象的状态变化决定要调用funA还是funB
                


----------
## Promise.prototype.catch
- 不过一般来说，Promise对象都是用Pro.then(fnc).catch(fnc)来执行的，
- 最好不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法。

        // bad
        promise
          .then(function(data) {
            // success
          }, function(err) {
            // error
          });
        
        // good
        promise
          .then(function(data) { //cb
            // success
          })
          .catch(function(err) {
            // error
          });


----------
## 多个任务的情况下
- 如果有很多个任务异步执行，但是又不想写很深的回调，用Promise可以链式结构写出，很方便直观
        

        //分别弹出版
        function printHello (ready) {
            return new Promise(function (resolve, reject) {
                if (ready) {
                    resolve("Hello");
                } else {
                    reject("Good bye!");
                }
            });
        }
        
        function printWorld () {
            alert("World");
        }
        
        function printExclamation () {
            alert("!");
        }
        
        printHello(true)
            .then(function(message){
                alert(message);
            })
            .then(printWorld)
            .then(printExclamation);
        
        //一起弹出版
        printHello(true).then(function (message) {
            return message;
        }).then(function (message) {
            return message  + ' World';
        }).then(function (message) {
            return message + '!';
        }).then(function (message) {
            alert(message);
        });



----------
## Promise.prototype.all 、 Promise.prototype.race
> 这两个方法都可以让一数组的Promise对象合并起来，包装成一个新的Promise实例 （参数可以不是数组，但必须具有Iterator接口，且返回的每个成员都是Promise实例）

        // 生成一个Promise对象的数组
        var promises = [2, 3, 5, 7, 11, 13].map(function (id) {
          return getJSON("/post/" + id + ".json");
        });
        
        Promise.all(promises).then(function (posts) {
          // ...
        }).catch(function(reason){
          // ...
        });
        
### 不同的地方是all方法中返回的新实例，只有这6个实例的状态都变成fulfilled（resolve），或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数。
### 而race方法中返回的新实例，只要数组其中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的回调函数。


----------
## Promise人性化地直观地提供了JS异步多任务执行的链式写法。让我们脱离了CCCCCallBack Hell..

> 可以的