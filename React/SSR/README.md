# react-ssr
---

## ���ڷ���������Ⱦ
> ���ڽܱ����github�����ҵ���һ�ַ�ʽ

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

ͨ��`express`��`view`���ƣ���`renderToString`��װ�õ�`html`���ݴ���`ejs`д�õ�ģ��ֱ�ӷ��ص�ǰ�ˡ�

### ��һ�ַ�ʽ

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
	<div id="content" dangerouslySetInnerHTML={{__html: content}}/>		{/* �������������Ⱦ�����component */}
	<script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>	{/* ����������ǰѴ����store��ǰ�˱��浽һ��ȫ�ֵ�����__data�� */}
	<script src={assets.javascript.main} charSet="UTF-8"/>		{/* �����������js */}
</body>
// ...
```

> ���ַ�ʽ��������ǰ��ʹ����`express`��ģ���ļ���Ⱦ���ư�����ģ�巵�ص�ǰ�ˣ�������ֱ��ʹ���ַ������ص�ǰ�˵ģ����߶��ڷ���˾Ͱ�`store`��������ˡ�ǰ��ò������Ϊʹ��ģ�����淵����Ⱦ�����Է����˻��`store`�����룩�����߰ѹ���õ�`store`ͨ��һЩ��ʽ������ǰ�˵�ȫ�ֶ����У��������ַ������ص�ǰ�˵�ʱ�򣬻����������ļ�`Client.js`����ĺ������ٶ������ҳ��Ⱦ����������`window`�ó����ļ���õ�`store`����Ⱦһ�Ρ�

---
## �첽�����

> ������`store`��Ҫ���첽�����ݵ�ʱ�򣬾��޷�ֱ���ڷ����`renderToString`�ˣ���Ϊ����һ��ͬ��������������ȴ�`store`�ļ�����ϡ�

�������ǿ�������һ����`redux-aysnc-connect`������������װ��һ��`loadOnServer`�ķ������������ڷ������˵��첽��Ⱦ��

---
## �������Ⱦ������

- ǰ�˺ͷ���˴���ͬ���������Ҳ�������ù���`Store`�ķ��������븴�õ�������
- ��ҳ��Ⱦ�ٶȵ�������
- �ӿ���ҳ��Ⱦ���ٶȣ��������������SEO������������������ҳ�����Ϣ