import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

class StandingsRow extends Component {
	render() {
		const row = this.props.row;
		return (
			<tr>
				<td>{row["name"]}</td>
				<td>{row["standings"]["outcome_totals"]["wins"]}</td>
				<td>{row["standings"]["outcome_totals"]["losses"]}</td>
			</tr>
		);
	}
}

class CurrentStandings extends Component {
	state = { standingsList: [] }

	componentDidMount() {
		this.getStandings();
	}


	getStandings = () => {
		console.log(this.props.token);
		fetch('api/league/standings/current/' + this.props.token)
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
				{rows.length ? (
					<div>
						<h1>Current Standings</h1>
						<Table striped bordered condensed hover responsive>
							<thead>
								<tr>
									<th>Team</th>
									<th>Wins</th>
									<th>Losses</th>
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

function mapStateToProps(state) {
	return {
	  token: state.access_token
	};
}  

export default connect(mapStateToProps)(CurrentStandings);