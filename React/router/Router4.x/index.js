import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
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

function dear(Target) {
  // target.dear = '666'
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.dear = '123'
      console.log(this)
    }

    render() {
      return <Target {...this.props} dear={this.dear} />
    }
  }
}

@dear
class Alert extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
    console.log(this)
	}

	handleClick(e) {
    console.log(this.props.dear)
	}

	render() {
		const { title, content } = this.props.match.params
		return (
			<div className="alertBox">
				<h2>{ title }</h2>
				<p>{ content }</p>
				<button onClick={this.handleClick}>cancel</button>
        <Route path="/alert/warning/haha/yiyi" component={book} />
        <Route path="/alert/warning/haha/hehe" component={hehe} />
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
    <div>
      <ListItemLink to="/"/>
      <ListItemLink to="/somewhere-else"/>
      <Link to="/book"/* activeClassName="active" */>Book</Link>
      <br />
      <NavLink to="/alert/warning/haha/yiyi" activeStyle={{color:'black'}}>haha</NavLink>
      <br />
      <NavLink to="/alert/warning/haha/hehe" activeStyle={{color:'black'}}>hehe</NavLink>
  		<Switch>
        <Route path="/alert/warning/haha" component={Alert} />
  		  <Route path="/alert" component={Lala} />
  		  <Route path="/book" component={book} />
  		  <Route path="/book" component={hehe} />
  		</Switch>
    </div>
	</Router>,
	document.getElementById('App')
)



if(module.hot) {
	module.hot.accept()
}
