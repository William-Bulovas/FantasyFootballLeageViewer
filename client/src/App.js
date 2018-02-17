import React, { Component } from 'react';

import { Navbar, NavItem, Nav } from 'react-bootstrap';

import Home from './pages/Home';
import History from './pages/History';
import Players from './pages/Players';

import './App.css';

class App extends Component {
	state = { page: 0 }

	render() {
		const { page } = this.state;
		
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Throw up the X Fantasy Football League</h1>

				</header>
				<Navbar collapseOnSelect>
					<Navbar.Header>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav onSelect={(key, e) => {
								this.setState({
									page : key
								})
							}}>
							<NavItem eventKey="0" key="0">Home</NavItem>
							<NavItem eventKey="1" key="1">History</NavItem>
							<NavItem eventKey="2" key="2">Players</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				{ page == 0 ? 
					<Home/>
				: page == 1 ?
					<History/>
				: <Players/>
				}
			</div>
		);
	}
}

export default App;
