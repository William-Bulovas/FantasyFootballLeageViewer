import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCurrentStandingsIfNeeded } from '../reducers/CurrentStandingsActions';

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

	componentDidMount() {
		this.getStandings();
	}

	getStandings = () => {
		this.props.dispatch(fetchCurrentStandingsIfNeeded());
	}

	render() {    
		const { standings } = this.props;

		if (standings == null) {
			return 	(				
				<div>
					<h1>No standings :(</h1>
					<button
						className="tryagain"
						onClick={this.getStandings}>
						Try Again?
					</button>
				</div>);

		}

		const rows = [];
		if (Object.values(standings).length) {
			standings["standings"].forEach((row) => {
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
	  token: state.access_token,
	  standings: state.currentStandings
	};
}  

export default connect(mapStateToProps)(CurrentStandings);