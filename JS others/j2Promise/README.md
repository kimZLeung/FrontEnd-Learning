## j2Promise JS的异步实现

---

之前我曾经自己实现过一个模拟Promise的API，叫`jPromise`。但是半年之后的现在，重新看自己以前的代码，觉得自己当初造轮子的时候并没有真正去理解到`Promise`的一些机制和用法。并且自己封装的`then`方法虽然能达到预期效果，可是扩展性和可用性不足。鉴于此，我决定重新造一个`jPromise`的升级版，并且总结一下JS异步编程的一些自己的感悟。

就叫它`J2Promise`吧

---

## JS的异步：队列和回调。

JS作为一门神奇又灵活的语言。其最鲜明的特色之一就是高阶函数，可以把函数当成参数传到别的函数中，并且还可以动态绑定上下文进行调用。

另外还有词法作用域。让JS编程能够做出各种各样的骚操作。

有点扯远了，其实函数能作为参数传入另外的函数，并且调用，我们常常将其称为回调函数，这种灵活的机制可以说是JS异步实现的**幕后最大黑手**。

> 我们可以想象，当我们需要把事先写好的A函数安放在合适的时段进行调用，最简单的方式不就是：把A函数作为一个回调函数传入B函数，B函数将会是一个漫长~~~的操作。然后在适当的时间，我们在B函数内调用A函数，即可。其实我们可以发现，所谓的异步就是我们事先定好的A操作，然后在往后的某一段时间执行这个A操作，并且期间...我们的页面可以自由活动！（当然这是建立在B函数不在我们浏览器线程上工作的前提）


#### 另外一个协助了回调函数的东西就是**队列**

> 与其说队列用于实现异步，倒不如说队列其实是一个异步任务的小基地。我们最常使用队列在存放我们尚未执行的异步任务，有赖于队列先进先出的特点，我们可以**顺序执行多个**未完成的异步任务。

这样结合队列和回调函数来做，JS的异步永远离不开这两个最坚实的基础。包括以下要实现的`j2Promise`，最基础的构成异步的部分，也是通过回调和队列结合实现的。

虽然写出来的API可以实现链式调用，避免了回调过深，但是`Promise`本身也并没有任何神奇的魔法，我们的异步，最终还是要依赖到回调函数，因为回调函数是JS异步最基本的实现方式。

---

## 造Promise

见[j2Promise.js](https://github.com/kimZLeung/FrontEnd-Learning/blob/master/JS%20others/j2Promise/j2Promise.js)



---

## j2Promise修复

修复：

- [x] `then`方法第二个参数修复，传入可catch错误并且返回一个`resolved`的`j2Promise`
- [x] 内部`try/catch`捕获错误，保证代码不会出现执行中断，并且将错误通过`j2Promise` 链传下去
- [x] `then` 中的异步代码加入`try/catch` 操作，并且将错误通过`j2Promise` 链传下去
- [x] 加入`catch` 方法，用于代替`then` 方法第二个参数处理`rejected`的`j2Promise`
- [x] 加入`finally`方法，用于无条件顺序执行操作并且透明传输值。

