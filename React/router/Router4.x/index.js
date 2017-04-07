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

ReactDOM.render(
	<Router>
		<ul>
		  <ListItemLink to="/somewhere"/>
		  <ListItemLink to="/somewhere-else"/>
		  <Link to="/book"/* activeClassName="active" */>Book</Link>
		  <br />
		  <NavLink to="/haha" activeStyle={{color:'black'}}>haha</NavLink>
		  <Route path="/book" component={book} />
		  <Route path="/book" component={hehe} />
		</ul>
	</Router>,
	document.getElementById('App')
)



if(module.hot) {
	module.hot.accept()
}