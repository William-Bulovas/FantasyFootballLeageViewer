import React, { Component } from 'react';

import Standings from './components/Standings';
import CareerTotals from './components/CareerStandings';

import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Throw up the X Fantasy Football League</h1>
				</header>
				<Standings/>
				<CareerTotals/>
			</div>
		);
	}
}

export default App;
