import React from 'react'
import { Link } from 'react-router'


const App = ({ children }) => (
	<div>
		<h1>Halo</h1>
		<ul>
			<li><Link to='/Infor'>infor</Link></li>
			<li><Link to='/About'>about</Link></li>
		</ul>
		{ children }
	</div>
)

export default App