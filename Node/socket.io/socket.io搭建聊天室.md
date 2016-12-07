# socket.io搭建聊天室

标签（空格分隔）： socket.io

---

## socket.io
> 利用`socket.io`这个接口创建出来的对象，在客户端连接到服务端。然后主要利用`socket`的自定义事件和服务器端`socket`的三个分发事件的方法来实现多个客户端同步数据。

>　在服务端的`connection`事件的回调中,`socket`表示的是当前连接服务器的客户端，所以有了下面三种触发事件的方式

- `socket.emit('connect', res)`
- `socket.broadcast.emit('Msg', res)`给除了这个客户端的所有客户端触发这个事件
- `io.sockets.emit('Msg', res)`给所有客户端触发这个事件




