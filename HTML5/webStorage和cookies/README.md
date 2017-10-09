# WebStorage && Cookies && Session

---

## Cookies 和 Session

Session并不是sessionStorage。简单来说，Session是保存在服务端的，而Cookies是保存在客户端的。

最起初的时候，大佬说想直接在浏览器端弄一个缓存，保存一下这个页面需要经常使用到的数据，为了不每次都请求一遍。所以产生了Cookies，用来保存一些简单的数据。

后来大佬发现把部分信息都保存在客户端的Cookies里面并不是太安全，所以产生了Session。服务端的Session也是用来跟踪保存用户状态，但是每个Session是对应一个用户，也就是对应一个会话的，而这个对应关系，大佬决定用Cookies来实现，于是产生了另一种做法：在Cookies中保存SessionId，然后通过这个SessionId在服务端访问对应的Session来获取用户数据。比较私密的用户数据可以存Session

> Cookies: Cookies的数据始终会在**同源**的HTTP请求中携带，所以它会一直在浏览器和服务器直接来回传递


---

## Cookies 和 WebStorage

WebStorage包含了localStorage 和 sessionStorage

前面提到Cookies有缓存数据和追踪用户状态的作用，而WebStorage的作用大多数缓存数据，那Cookies 和 WebStorage具体有什么不同呢

- 前面也提到，cookie数据始终在**同源**的http请求中携带，而WebStorage的数据**仅仅会在客户端中保存**，并不会自动把数据传过去服务器。
- 因为WebStorage的数据不会传到服务端，所以它和Cookies的存储大小的限制不同。cookie 数据不能超过**4k**，sessionStorage和 localStorage可以达到**5M**左右。
- **数据有效期不同。**cookie在设置的有效期（服务端设置）内有效，不管窗口或者浏览器是否关闭。sessionStroage仅在当前浏览器窗口关闭前有效（也就是说只要这个浏览器窗口没有关闭，即使刷新页面，数据仍然存在。关闭窗口后，sessionStorage即被销毁）；localStroage始终有效，窗口或者浏览器关闭也一直保存
- **作用域不同。**sessionStorage不在不同的浏览器**窗口**中共享，即使是同一个页面（就是说在同一标签页中，就算进行页面跳转，sessionStorage里面的数据也不会被消除，但是如果是不同的两个标签页的话就不会共享sessionStorage里面的数据，即使是同源，即使是同一个页面）；localStorage 在所有同源窗口中都是共享的；cookie 也是在所有同源窗口中都是共享的。
- localStorage支持事件通知机制，可以将数据更新的通知发送给监听者，注意：很容易犯的错误是，在同一个网页修改本地存储，又在同一个网页监听，这样是没有效果的。这个监听是提供给同源的不同页面进行`storage`监听的

```
window.addEventListener('storage', function (e) {
	alert(e.newValue)
})
```

WebStorage的优点

- **临时存储数据**： 对于某些常用数据，或者静态资源数据，可以临时存储。对于当前窗口(tab)的临时数据可以利用 sessionStorage 来保存，如果是长期保存，则使用 localStorage
- **减少网络流量**：数据保存在本地，避免重新向服务器请求数据，从而避免了不必要的数据请求，因此减少网络流量
- **快速显示数据**：由于数据临时保存在本地，从而不用发送请求去服务器端获取，这样可以快速的读取数据，提供了性能

Cookies的注意

> 前面提到同源下Cookies会携带在每一个HTTP请求中，但是如果是跨域状态下，需要在服务器端和浏览器端传输Cookies时，客户端的`xhr`对象的`withCredentials`需要设置为true，服务器端也需要设置响应头表示同意`Access-Control-Allow-Credentials: true`。并且，这个时候`Access-Control-Allow-Origin`就不能设置为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会在每次HTTP请求中上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的`document.cookie`也无法读取服务器域名下的Cookie。
