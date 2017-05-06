import { Lifecycle, Router, Route, hashHistory, Link, IndexRoute } from 'react-router';
import React from 'react';
import { render } from 'react-dom';

import style from './app.css';

var App = React.createClass({
	render: function() {
		return (<div>
			<h1 className={style.title}>Halo! I am React</h1>
			<ul className={style.list}>
				<li><Link to='/'>Login</Link></li>
				<li><Link to='/app'>Home</Link></li>
				<li><Link to='/app/about'>About</Link></li>
				<li><Link to='/app/intro'>Intro</Link></li>
				<li><Link to='/app/todo'>todo</Link></li>
			</ul>
			{this.props.children}
		</div>);
	}
});

var About = React.createClass({
	render: function() {
		return (
			<div>
				<h2>Halo About!</h2>
				<p className={style.para}>this is about my react-router</p>
			</div>
		);
	}
});

var Intro = React.createClass({
	render: function() {
		return (
			<div>
				<h2>Halo Intro!</h2>
				<p className={style.para}>I’ve hardly learn React , But I dont konw what to do </p>
			</div>
		);
	}
});

var Loo = React.createClass({
	render() {
		return <input type='text' className={style.text} size='30' placeholder='哈哈' />
	}
});

class Home extends React.Component {
	// constructor() {
	// 	super(...props);
	// }

	// componentDidMount() {
	// 	alert('hehe')
	// }

	render() {
		return <h1>Halo binzong</h1>
	}
}

class Test extends React.Component {
	constructor() {
		super();
		this.text = 'haha';
		this.state = {
			wa: 666,
			hei: 233
		}
		this.hold = this.state.wa;
	}

	render() {
		return <h1 className={[this.text, this.props.la]}>{ this.state.wa }</h1>
	}
}

// function Vee() {
// 	console.log('das')
// 	return (<div refs></div>)
// }

// class Login extends React.Component {
// 	constructor() {
// 		super();
// 	}
//
// 	render() {
// 		return <div><input size='30' ref = {(text) => {this.input = text}} /><Link to='/app'>login</Link></div>
// 	}
// }

var Login = React.createClass({
	// mixins: [Lifecycle],

	// 设定contextTypes来通过context对象访问router，并通过router在本组件上挂载Leave的Hook
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	componentDidMount() {
		// console.log(this.context.route)
		console.log(this.context.router)
		this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
	},

	routerWillLeave(nextLocation) {
		console.log(nextLocation)
		console.log(this.context.route)
		if(this.input.value != 123) {
			alert('密码错误')
			return false
		} else {
			return '登录成功'
		}
	},

	render() {
		return <div><input size='30' ref = {(text) => {this.input = text}} /><Link to='/app'>login</Link></div>
	}
})

render((
	<div>
		<Test la="ds"></Test>
		<Router history={hashHistory}>
			<Route path='/' component={Login} />
			<Route path='/app' component={App}>
				<IndexRoute component={Home} />
				<Route path='about' component={About} />
				<Route path='intro' component={Intro} />
				<Route path='todo' component={Loo} />
			</Route>
			<Route path='/app' component={About} />
		</Router>
	</div>
), document.getElementById('App'));
