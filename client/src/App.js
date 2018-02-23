import React, { Component } from 'react';

import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import History from './pages/History';
import Players from './pages/Players';

import './App.css';

class App extends Component {
	state = { page: 0 }

	render() {
		const { page } = this.state;
		
		return (
			<Router>
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Throw up the X Fantasy Football League</h1>

				</header>
				<Navbar collapseOnSelect>
					<Navbar.Header>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem componentClass={Link} href='/' to='/'>Home</NavItem>
							<NavItem componentClass={Link} href='/history'to='/history'>History</NavItem>
							<NavItem componentClass={Link} href='/players'to='/players'>Players</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Route exact path="/" component={Home}/>
				<Route path="/history" component={History}/>
				<Route path="/players" component={Players}/>
			</div>
			</Router>
		);
	}
}

export default App;
