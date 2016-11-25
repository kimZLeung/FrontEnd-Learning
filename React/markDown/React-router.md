# React-router

标签（空格分隔）： React router

---

    import React from 'react'
    import { render } from 'react-dom'
    import { Router, Route, Link } from 'react-router'
    
    const App = React.createClass({
      render() {
        return (
          <div>
            <h1>App</h1>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/inbox">Inbox</Link></li>
            </ul>
            {this.props.children}
          </div>
        )
      }
    })
    
    render((
      <Router>
        <Route path="/" component={App}>
          <Route path="about" component={About} />
          <Route path="inbox" component={Inbox}>
            <Route path="messages/:id" component={Message} />
          </Route>
        </Route>
      </Router>
    ), document.body)


----------
 - Router组件
 - Route组件
 - path属性
 - component属性
 - indexRoute 组件
 - Redirect 组件
 - IndexRedirect 组件（跟路由重定向）
 - 通配符（：Param）
 - （括号，可选）
 - （*任意）
 - （**任意）
 - onLeave()和onEnter() Hook函数
 - link组件 （代替a）**（to属性后面加路由）**
 - IndexLink
 - history属性（hashHistory，browserHistory，createMemoryHistory）
 > hashHistory用于hashange的路由，browserHistory调用History的API，用正常路径来路由。不过需要对服务器改造，

