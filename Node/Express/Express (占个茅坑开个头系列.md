# Express (占个茅坑开个头系列

标签： Node Express

---

## Express
- 简单来说 Express = 路由 + 中间件

> Express完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

## 中间件

 - 应用级中间件
 - 路由级中间件
 - 错误处理中间件
 - 内置中间件
 - 第三方中间件

---

## res.send

这个方法挺好用的，一般用于写普通的`API`接口完全够用了，可以传入`Object`，`String`，`Buffer`甚至`HTML`字符串。完了之后自动调用`res.end()`。

应该是把原生的`res.write()`和`res.setHeader()`和`res.end()`一起封了起来，反正挺好用的
