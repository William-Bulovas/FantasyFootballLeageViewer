import React, { Component } from 'react';
import logo from './logo.svg';
import { Table, DropdownButton, MenuItem } from 'react-bootstrap';
import './App.css';

class StandingsRow extends Component {
	render() {
		const row = this.props.row;
		return (
			<tr>
				<td>{row["name"]}</td>
				<td>{row["standings"]["outcome_totals"]["wins"]}</td>
				<td>{row["standings"]["outcome_totals"]["losses"]}</td>
				<td>{row["standings"]["points_for"]}</td>
				<td>{row["standings"]["points_against"]}</td>

				</tr>
		);
	}
}

class Standings extends Component {
	state = { standingsList: [] }

	componentDidMount() {
		this.getStandings();
	}


	getStandings = () => {
		fetch('api/league/standings/current')
			.then(res => res.json())
			.then(standingsList => this.setState({standingsList}));
	}


	render() {    
		const { standingsList } = this.state;

		const rows = [];
		if (Object.values(standingsList).length) {
			standingsList["standings"].forEach((row) => {
				rows.push(<StandingsRow row={row} key={row["team_id"]}/>);
			});
		}

		return (

			<div className="Standing">
				{Object.values(standingsList).length ? (
					<div>
						<h1>Current Standings</h1>
						<Table striped bordered condensed hover>
							<thead>
								<tr>
										<th>Team</th>
										<th>Wins</th>
										<th>Losses</th>
										<th>Points For</th>
										<th>Points Against</th>
									</tr>
								</thead>
								<tbody>{rows}</tbody>
							</Table>
					</div>
				) : (
					// If we cannot get the standings show a failure
					<div>
					<h1>No standings :(</h1>
					<button
						className="tryagain"
						onClick={this.getStandings}>
						Try Again?
					</button>
				</div>
				)}
			</div>
		);
	}
}

class CareerRow extends Component {
	render() {
		const row = this.props.row;
		const type = this.props.type;

		var first = 0;
		var second = 0;
		var third =0;

		row["results"].forEach((result) => {
			if(result["result"] == "1") {
				first +=1;
			}
			if(result["result"] == "2") {
				second +=1;
			}

			if(result["result"] == "3") {
				third +=1;
			}

		});


		return (
			<tr>
				<td>{row["manager"][0]["nickname"]}</td>
				<td>{first}</td>
				<td>{second}</td>
				<td>{third}</td>
				<td>{row["years_played"]}</td>
				<td>{type == 0 ? row["wins"]
						: (parseInt(row["wins"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["losses"]
						: (parseInt(row["losses"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["pointsFor"]
						: (parseInt(row["pointsFor"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["pointsAgainst"]
						: (parseInt(row["pointsAgainst"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["movesMade"]
						: (parseInt(row["movesMade"]) / parseInt(row["years_played"])).toFixed(2)}</td>
				<td>{type == 0 ? row["tradesMade"]
						: (parseInt(row["tradesMade"]) / parseInt(row["years_played"])).toFixed(2)}</td>

				</tr>
		);
	}
}


class CareerTotals extends Component {
	state = { standingsList: [], typeOfStats: 0 }

	componentDidMount() {
		this.getStandings();
	}


	getStandings = () => {
		fetch('api/league/career')
			.then(res => res.json())
			.then(standingsList => this.setState({standingsList}));
	}


	render() {    
		const { standingsList } = this.state;
		var listOfPlayers = Object.values(standingsList);

		listOfPlayers.sort(function(a,b) {
			if (a["wins"] == b["wins"]){
				return a["pointsFor"] - b["pointsFor"];
			}
			return a["wins"] - b["wins"];
		});
		listOfPlayers.reverse();

		const rows = [];
		if (Object.values(standingsList).length) {
			listOfPlayers.forEach((row) => {
				rows.push(<CareerRow row={row} key={row["manager"]["guid"]} type={this.state.typeOfStats}/>);
			});
		}

		return (

			<div className="Standing">
				{Object.values(standingsList).length ? (
					<div>
						<h1>Career Standings</h1>
						<DropdownButton
							title="DropDown"
						>
							<MenuItem eventKey="1" onSelect={
								this.setState((typeOfStats, props) => 0)}
								>Aggregate</MenuItem>
							<MenuItem eventKey="2" onSelect={
								this.setState((typeOfStats, props) => 1)}
								>Average</MenuItem>

						</DropdownButton>
						<Table striped bordered condensed hover>
							<thead>
							<tr>
									<th>Team</th>
									<th>First</th>
									<th>Secound</th>
									<th>Third</th>
									<th>Years Played</th>
									<th>Total Wins</th>
									<th>Total Loses</th>
									<th>Total Points For</th>
									<th>Total Points Against</th>
									<th>Total Moves</th>
									<th>Total Trades</th>
								</tr>
								</thead>
								<tbody>{rows}</tbody>
							</Table>
					</div>
				) : (
					// If we cannot get the standings show a failure
					<div>
					<h1>No standings :(</h1>
					<button
						className="tryagain"
						onClick={this.getStandings}>
						Try Again?
					</button>
				</div>
				)}
			</div>
		);
	}
}


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
