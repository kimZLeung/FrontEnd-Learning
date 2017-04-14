import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'

console.log(React)

const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}>123</Link>
    </li>
  )}/>
)

const book = ({history, match, location}) => {
	console.log(history)
	console.log(match.params.q)
	console.log(location)
	return <h1>book</h1>
}

const hehe = () => {
	return (
		<h1>hehe</h1>
		)
}

class Alert extends React.Component {
	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		
	}

	render() {
		const { title, content } = this.props.match.params
		return (
			<div className="alertBox">
				<h2>{ title }</h2>
				<p>{ content }</p>
				<button onClick={this.handleClick}>cancel</button>
			</div>
		)
	}
}

const Lala = () => {
	return (
		<div>
			<h1>Im Lala~</h1>
		</div>
	)
	
}

ReactDOM.render(
	<Router>
		<ul>
		  <ListItemLink to="/"/>
		  <ListItemLink to="/somewhere-else"/>
		  <Link to="/book"/* activeClassName="active" */>Book</Link>
		  <br />
		  <NavLink to="/alert/warning/haha" activeStyle={{color:'black'}}>haha</NavLink>
		  <Route path="/alert" component={Lala} />
		  <Route path="/book" component={book} />
		  <Route path="/alert/:title/:content" component={Alert} />
		  <Route path="/book" component={hehe} />
		</ul>
	</Router>,
	document.getElementById('App')
)



if(module.hot) {
	module.hot.accept()
}