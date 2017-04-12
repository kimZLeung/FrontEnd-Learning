# react-ssr
---

## 关于服务器端渲染
> 我在杰斌大大的github里面找到了一种方式

``` javascript
// server.js

match({ routes, location: req.url }, (err, redirectLocation, props) => {
	// ...
	const markup = renderToString(
	<Provider store={configureStore()} >
	  <RoutingContext { ...props } />
	</Provider>
  );
  res.render('index', {markup});
	// ...
}
```

通过`express`的`view`机制，将`renderToString`封装好的`html`内容传入`ejs`写好的模板直接返回到前端。

### 另一种方式

``` javascript
// server.js

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
	const component = (
	  <Provider store={store} key="provider">
		<ReduxAsyncConnect {...renderProps} />
	  </Provider>
	);

	res.status(200);
	
	res.send('<!doctype html>\n' +
	  ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
	});
  }
```

``` javascript
//html.js

// jsx...
<body>
	<div id="content" dangerouslySetInnerHTML={{__html: content}}/>		{/* 这里的作用是渲染传入的component */}
	<script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>	{/* 这里的作用是把传入的store在前端保存到一个全局的属性__data里 */}
	<script src={assets.javascript.main} charSet="UTF-8"/>		{/* 这里引入入口js */}
</body>
// ...
```

> 两种方式的区别是前者使用了`express`的模板文件渲染机制把整个模板返回到前端，后者是直接使用字符串返回到前端的，两者都在服务端就把`store`加载完毕了。前者貌似是因为使用模板引擎返回渲染，所以返回了活的`store`（猜想）。后者把构造好的`store`通过一些方式保存在前端的全局对象中，当整个字符串返回到前端的时候，会调用在入口文件`Client.js`里面的函数，再对这个首页渲染的组件灌入从`window`拿出来的计算好的`store`再渲染一次。

---
## 异步的情况

> 当存在`store`需要有异步的数据的时候，就无法直接在服务端`renderToString`了，因为这是一个同步方法。并不会等待`store`的计算完毕。

所以我们可以引入一个库`redux-aysnc-connect`。这个库里面封装了一个`loadOnServer`的方法，可以用于服务器端的异步渲染。

---
## 服务端渲染的优势

- 前端和服务端代码同构，服务端也可以引用构造`Store`的方法。代码复用的提升。
- 首页渲染速度的提升。
- 加快首页渲染的速度，配合了搜索引擎SEO，便于搜索引擎爬到页面的信息