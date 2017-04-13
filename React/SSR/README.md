# react-ssr
---

## 关于服务器端渲染
> 我在杰斌大大的github里面找到了一种方式

``` javascript
// server.js

// Router提供的方法，配合Router进行服务器端渲染
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

// Router提供的方法，配合Router进行服务器端渲染
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

> 两种方式的区别是前者使用了`express`的模板文件渲染机制把整个模板返回到前端，后者是直接使用字符串返回到前端的，两者都在服务端就把`store`加载完毕了。

> 前者并没有使用字符串把`store`用字符串形式返回到前端，并且没有保存到全局，不过前者也在`client.js`里面重新构造了属于前端组件的`store`，其实这样的做法应该并不能把服务器端计算好的`store`顺利返回给前端，而且前端使用的也是自己create出来的`store`。可以把`state`保存起来，以另一个参数传入`index.ejs`里面，这样前端就可以访问到服务器端生成好的`state`了。但是反正这里这个`store`也是个空对象。

> 后者把构造好的`store`通过一些方式保存在前端的全局对象中，当整个字符串返回到前端的时候，会调用在入口文件`Client.js`里面的函数，再对这个首页渲染的组件灌入从`window`拿出来的计算好的`store`再渲染一次。

---
## 异步的情况

> 当存在`store`需要有异步的数据的时候，就无法直接在服务端`renderToString`了，因为这是一个同步方法。并不会等待`store`的计算完毕。

所以我们可以引入一个库`redux-aysnc-connect`。这个库里面封装了一个`loadOnServer`的方法，可以用于服务器端的异步渲染。

---
## 服务端渲染的优势

- 前端和服务端代码同构，服务端也可以引用构造`Store`的方法。代码复用的提升。
- 首页渲染速度的提升。
- 加快首页渲染的速度，配合了搜索引擎SEO，便于搜索引擎爬到页面的信息

---
## 好吧其实我有个疑问
> 为什么server端渲染过一次，client里面不是也会渲染一次吗？

原来`React`的`render`方式实现了一些黑魔法，它会检测之前是否已经有服务器端渲染好的模板，如果有，则只会为这份模板添加事件，若有`store`（应用了`Redux`），则为组件注入`store`。

---
## 补充
> 用`webpack-dev-server`做懒人热替换调试的时候，我把`output`的`path`设置成了`path.resolve(__dirname, 'dist')`，生成的`bundle.js`并不在项目的根目录。于是我发现热替换用不了了。

折腾了一轮，原来`output`里面的`publicPath`除了配合`url-loader`可以修改引用文件路径之外，弄热替换的时候将它指向项目的生成的`bundle`的目录那里，通过这个属性来告诉热加载模块去哪加载，才能启动对应的热替换QAQ

还有一点挺可怕的是，我发现`webpack`的`output`里面的`path`里面使用绝对路径时，直接用`/`这样指向的是硬盘的根目录而不是项目的根目录，需要使用`path.resolve(__dirname, 'dist')`这样的方式来指向项目里的dist的目录，而`publicPath`可以直接用`/`指向项目根目录。

---
## 一直无法使用`babel-node`
> 在本地安装了`babel-cli`之后，满心欢喜地给`package.json`的`script`加上一个`babel-node server/server`的命令。然后`npm start`了半天硬是没把server跑起来。心好累QAQ。

为什么如此呢，我`google`找了很久，有安装过`node-jsx`尝试过，不过也没有用。后来我找了找杰斌大大的代码看了下。咦？我貌似为了试一下`webpack2`的`rules`。所以把`babel`的`preset`用`options`的形式写到了`webpack`的配置里面。那我抽出来写个`babelrc`试下。

> 结果果然要在项目根目录下面配置一个`babelrc`才能启动配合`babel-node`启动带有`ES6`语法的服务器。

---
## conclusion

> 其实服务器端渲染说难不难。

> 最初可以说是起源于`react-dom`的`renderToString`方法，使得React的组件可以在服务器端得以渲染为字符串，并整份返回到前端，提高了首屏渲染DOM结构的速度。对哈，使用`express`的模板文件返回也可以哟

> 后来项目会融入`React-Router`，加入router之后，在服务器端就不能渲染了吗？并不是。router的库提供了`match`方法和`<RouterContext>`组件，方便我们在服务器端便渲染好对应路由的DOM结构，并整份返回。

> 再后来项目里面融入了`Redux`，那我们就选择在服务器端计算出初始的`Store`，并且把初始的`State`通过一些方式，在DOM结构里面赋值给window的全局属性，所以前端可以直接拿到初始的`State`进行渲染。记得在服务器端也要用`<Provider>`把要渲染的东西包住啊

### 无论是前面的组件在服务器端进行渲染，还是`Router`的使用`match`配合`<RouterContext>`，甚至是`redux`的预先计算`Store`，都是服务端和客户端代码同构的体现。跑同一份代码，会提高代码复用。这是比首屏渲染更加重要的优势