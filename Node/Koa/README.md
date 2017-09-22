## 关于Koa的一些总结

---

### ctx上下文对象

`ctx`上有很多对象，比如：

- ctx.req：node原生提供的req对象
- ctx.res：node原生提供的res对象
- ctx:request：经过koa封装的req对象
- ctx.response：经过koa封装的res对象

一般通过`ctx.body`基本可以满足普遍`API`接口返回数据的需求

``` javascript
app.use(async (ctx, next) => {
	ctx.body = {
		haha: 1
	}
	await next()
})
```

设定用途跟`express`的`res.send()`差不多，可以发`String`，`Object`，`HTML`字符串（`HTML`字符串还是需要设置`ctx.type`）。

ctx.type === Content-Type（header）
